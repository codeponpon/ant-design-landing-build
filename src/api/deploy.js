const nunjucks = require('nunjucks');
const path = require('path');
const { HttpClient2 } = require('urllib');
const Parameter = require('parameter');

async function deploy(ctx, next) {
  const { now } = ctx.config;
  const { token, url, templateDir, whiteList } = now;
  nunjucks.configure(templateDir);
  const pkgTmp = path.join(templateDir, 'package.json');
  const umiTmp = path.join(templateDir, 'umirc');
  const nowIgnoreTmp = path.join(templateDir, 'nowignore');

  // Apollo Client
  const apolloIndex = path.join(templateDir, 'apollo', 'index.js');

  // Internal Library
  const libFormatIndex = path.join(templateDir, 'libs', 'format', 'index.js');
  const libFormatBalance = path.join(
    templateDir,
    'libs',
    'format',
    'balance.js'
  );
  const libAuthToken = path.join(templateDir, 'libs', 'authToken.js');
  const libCredit = path.join(templateDir, 'libs', 'credit.js');
  const libWaitTime = path.join(templateDir, 'libs', 'waitTime.js');
  const libUseAuth = path.join(templateDir, 'libs', 'useAuth.js');

  // Components
  const accountComp = path.join(templateDir, 'components', 'accountComp.jsx');
  const bankSelector = path.join(templateDir, 'components', 'bankSelector.jsx');
  const gameListComp = path.join(templateDir, 'components', 'gameList.jsx');
  const loginComp = path.join(templateDir, 'components', 'loginComp.jsx');
  const providerListComp = path.join(
    templateDir,
    'components',
    'providerList.jsx'
  );
  const registerComp = path.join(templateDir, 'components', 'registerComp.jsx');

  const parameter = new Parameter({
    validateRoot: true,
  });

  const { name, files } = ctx.request.body;
  // console.log('------ctx.request.body-', ctx.request.body);
  const isIncludeName = whiteList.includes(name);

  if (isIncludeName) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      error: 'Params name error',
    };
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
    };
    return false;
  }

  const pkgContent = nunjucks.render(pkgTmp, {
    name: deployData.name,
  });
  const umiContent = nunjucks.render(umiTmp);
  const nowIgnoreContent = nunjucks.render(nowIgnoreTmp);

  // Apollo
  const apolloIndexContent = nunjucks.render(apolloIndex);

  // Library
  const libFormatIndexContent = nunjucks.render(libFormatIndex);
  const libFormatBalanceContent = nunjucks.render(libFormatBalance);
  const libAuthTokenContent = nunjucks.render(libAuthToken);
  const libCreditContent = nunjucks.render(libCredit);
  const libWaitTimeContent = nunjucks.render(libWaitTime);
  const libUseAuthContent = nunjucks.render(libUseAuth);

  // Components
  const accountCompContent = nunjucks.render(accountComp);
  const bankSelectorContent = nunjucks.render(bankSelector);
  const gameListCompContent = nunjucks.render(gameListComp);
  const loginCompContent = nunjucks.render(loginComp);
  const providerListCompContent = nunjucks.render(providerListComp);
  const registerCompContent = nunjucks.render(registerComp);

  console.log(
    '---deployData.files-',
    deployData.files,
    typeof deployData.files
  );
  const solidFiles = [
    { file: 'src/apollo/index.js', data: apolloIndexContent },
    { file: 'src/libs/format/index.js', data: libFormatIndexContent },
    { file: 'src/libs/format/balance.js', data: libFormatBalanceContent },
    { file: 'src/libs/authToken.js', data: libAuthTokenContent },
    { file: 'src/libs/credit.js', data: libCreditContent },
    { file: 'src/libs/waitTime.js', data: libWaitTimeContent },
    { file: 'src/libs/useAuth.js', data: libUseAuthContent },
    { file: 'src/components/accountComp.jsx', data: accountCompContent },
    { file: 'src/components/bankSelector.jsx', data: bankSelectorContent },
    { file: 'src/components/gameList.jsx', data: gameListCompContent },
    { file: 'src/components/loginComp.jsx', data: loginCompContent },
    { file: 'src/components/providerList.jsx', data: providerListCompContent },
    { file: 'src/components/registerComp.jsx', data: registerCompContent },
    { file: 'package.json', data: pkgContent },
    { file: '.umirc.js', data: umiContent },
    { file: '.nowignore', data: nowIgnoreContent },
  ];
  const filterFiles = deployData.files.filter(
    (file) => !solidFiles.map((item) => item.file).includes(file.file)
  );

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
            distDir: 'dist',
          },
        },
      ],
      env: { name: 'PROJECT_NAME', value: deployData.name },
      target: 'production',
      alias: [`${name}.verce.app`],
    },
  };

  const client = new HttpClient2();
  const res = await client.request(`${url}/deployments`, settings);
  console.log('------res-', res);
  ctx.status = 200;
  ctx.body = res.data;
}

module.exports = deploy;
