
const nunjucks = require('nunjucks');
const path = require('path');
const { HttpClient2 } = require('urllib');
const Parameter = require('parameter');
const app_url = "https://nextetor.vercel.app/";

async function deploy(ctx, next) {
  const { now } = ctx.config;
  const { token, url, templateDirNext, whiteList } = now;

  nunjucks.configure(templateDirNext);
  const pkgTmp = path.join(templateDirNext, 'package.json');
  const nextTmp = path.join(templateDirNext, 'next.config.js');
  const nowIgnoreTmp = path.join(templateDirNext, 'vercelignore');

  const parameter = new Parameter({
    validateRoot: true,
  });

  const {
    id,
    name,
    files,
  } = ctx.request.body;
  // console.log('------ctx.request.body-', ctx.request.body);
  const isIncludeName = whiteList.includes(name);

  if (isIncludeName) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      error: 'Params name error',
    }
    return false;
  }
  const deployData = {
    name,
    files,
  };

  const schema = {
    name: {
      type: 'string',
      required: true,
      max: 52,
    },
    files: {
      type: 'array',
      itemType: 'object',
      min: 1,
      required: true,
    },
  };
  try {
    // console.log('-validate-', schema, deployData);
    const errors = parameter.validate(schema, deployData);
    // console.log('---errors-', errors);
    if (errors) {
      // console.log('---new Error-');
      throw new Error(errors);
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      error: 'Params error',
    }
    return false;
  }

  const pkgContent = nunjucks.render(pkgTmp, {
    name: deployData.name,
  });
  const nextContent = nunjucks.render(nextTmp, {
    app_url: app_url,
    game_id: id
  });
  const nowIgnoreContent = nunjucks.render(nowIgnoreTmp);

  console.log('---deployData.files-', deployData.files, typeof deployData.files);
  const solidFiles = [
    {
      file: 'package.json',
      data: pkgContent,
    },
    {
      file: "next.config.js",
      data: nextContent,
    },
    // {
    //   file: '.vercelignore',
    //   data: nowIgnoreContent,
    // },
  ];
  const filterFiles = deployData.files.filter((file) => !solidFiles.map(item => item.file).includes(file.file));

  const concatFiles = solidFiles.concat(filterFiles);
  console.log('---concatFiles-', concatFiles);
  const settings = {
    method: 'POST',
    dataType: 'json',
    contentType: 'json',
    timeout: 50000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      // 一个站点一个 name
      name: deployData.name,
      public: true,
      version: 2,
      files: concatFiles,
      builds: [
        {
          src: 'package.json',
          use: '@vercel/static-build',
          config: {
            distDir: './out',
          },
        },
      ],
      env: {
        name: "PROJECT_NAME",
        value: deployData.name
      },
      target: "production",
      alias: [
        `${name}.verce.app`
      ]
    },
  };

  const client = new HttpClient2();
  const res = await client.request(`${url}/deployments`, settings);
  console.log('------res-', res);
  ctx.status = 200;
  ctx.body = res.data;
}

module.exports = deploy;
