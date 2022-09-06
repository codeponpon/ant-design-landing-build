const nunjucks = require('nunjucks');
const path = require('path');
const { HttpClient2 } = require('urllib');
const Parameter = require('parameter');
const fs = require('fs');

async function deploy(ctx, next) {
  const { now } = ctx.config;
  const { token, url, templateDir, whiteList } = now;
  nunjucks.configure(templateDir);
  const pkgTmp = path.join(templateDir, 'package.json');
  const umiTmp = path.join(templateDir, 'umirc');
  const nowIgnoreTmp = path.join(templateDir, 'nowignore');

  // Stylesheet
  const providerPageStyle = path.join(
    templateDir,
    'components',
    'less',
    'providerPage.less'
  );

  // Data Source
  const providerDataSource = path.join(
    templateDir,
    'components',
    'providerDataSource.js'
  );

  // Wrappers
  const wrapAuth = path.join(templateDir, 'wrappers', 'auth.jsx');

  // Apollo Client
  const apolloIndex = path.join(templateDir, 'apollo', 'index.js');

  // API
  const gameProvidersAPI = path.join(templateDir, 'api', 'gameProviders.js');
  const gameListAPI = path.join(templateDir, 'api', 'gameList.js');

  // Internal Library
  const getMobileDetect = path.join(
    templateDir,
    'libs',
    'getMobileDetect',
    'index.js'
  );
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
  const libTracking = path.join(templateDir, 'libs', 'tracking.js');
  const libGenerateUsername = path.join(
    templateDir,
    'libs',
    'generateUsername.js'
  );

  // Components
  const utilsComp = path.join(templateDir, 'components', 'utils.js');
  const GameProviderComp = path.join(
    templateDir,
    'components',
    'GameProvider.jsx'
  );
  const lobbyProviderComp = path.join(
    templateDir,
    'components',
    'lobbyProvider.jsx'
  );
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
  const GamblingCategoryComp = path.join(
    templateDir,
    'components',
    'GamblingCategory.jsx'
  );
  const ProvidersComp = path.join(templateDir, 'components', 'Providers.jsx');
  const lobbyComp = path.join(templateDir, 'components', 'lobby.jsx');

  const loadingComp = path.join(
    templateDir,
    'components',
    'launchGame',
    'loading.jsx'
  );
  const footerComp = path.join(
    templateDir,
    'components',
    'launchGame',
    'footer.jsx'
  );
  const displayComp = path.join(
    templateDir,
    'components',
    'launchGame',
    'display.jsx'
  );
  const launchGameIndexComp = path.join(
    templateDir,
    'components',
    'launchGame',
    'index.jsx'
  );

  // Pages
  const providersPageComp = path.join(templateDir, 'pages', 'providers.jsx');
  const lobbyPageComp = path.join(
    templateDir,
    'pages',
    'lobby',
    '[shortName].js'
  );
  const providerPageComp = path.join(
    templateDir,
    'pages',
    'lobby',
    'provider.js'
  );
  const launchGamePageComp = path.join(
    templateDir,
    'pages',
    'lobby',
    'launchGame.js'
  );

  // GQL
  const banksGql = path.join(templateDir, 'gql', 'banks.js');
  const gameProvidersGql = path.join(templateDir, 'gql', 'gameProviders.js');
  const getPromotionListGql = path.join(
    templateDir,
    'gql',
    'getPromotionLists.js'
  );
  const launchGamesGql = path.join(templateDir, 'gql', 'launchGames.js');
  const signInGql = path.join(templateDir, 'gql', 'signIn.js');
  const userMeGql = path.join(templateDir, 'gql', 'userMe.js');
  const walletGql = path.join(templateDir, 'gql', 'wallet.js');
  const addContactGql = path.join(templateDir, 'gql', 'addContact.js');
  const addTrackingGql = path.join(templateDir, 'gql', 'addTracking.js');
  const addUserGql = path.join(templateDir, 'gql', 'addUser.js');

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

  // Wrapper
  const wrapAuthContent = fs.readFileSync(wrapAuth, 'utf-8');

  // Stylescheet
  const providerPageStyleContent = fs.readFileSync(providerPageStyle, 'utf-8');

  // Apollo
  const apolloIndexContent = fs.readFileSync(apolloIndex, 'utf-8');

  // API
  const gameProvidersAPIContent = fs.readFileSync(gameProvidersAPI, 'utf-8');
  const gameListAPIContent = fs.readFileSync(gameListAPI, 'utf-8');

  // GQL
  const banksContent = fs.readFileSync(banksGql, 'utf-8');
  const gameProvidersContent = fs.readFileSync(gameProvidersGql, 'utf-8');
  const getPromotionListContent = fs.readFileSync(getPromotionListGql, 'utf-8');
  const launchGamesContent = fs.readFileSync(launchGamesGql, 'utf-8');
  const signInContent = fs.readFileSync(signInGql, 'utf-8');
  const userMeContent = fs.readFileSync(userMeGql, 'utf-8');
  const walletContent = fs.readFileSync(walletGql, 'utf-8');
  const addContactContent = fs.readFileSync(addContactGql, 'utf-8');
  const addTrackingContent = fs.readFileSync(addTrackingGql, 'utf-8');
  const addUserContent = fs.readFileSync(addUserGql, 'utf-8');

  // Library
  const getMobileDetectContent = fs.readFileSync(getMobileDetect, 'utf-8');
  const libFormatIndexContent = fs.readFileSync(libFormatIndex, 'utf-8');
  const libFormatBalanceContent = fs.readFileSync(libFormatBalance, 'utf-8');
  const libAuthTokenContent = fs.readFileSync(libAuthToken, 'utf-8');
  const libCreditContent = fs.readFileSync(libCredit, 'utf-8');
  const libWaitTimeContent = fs.readFileSync(libWaitTime, 'utf-8');
  const libUseAuthContent = fs.readFileSync(libUseAuth, 'utf-8');
  const libTrackingContent = fs.readFileSync(libTracking, 'utf-8');
  const libGenerateUsernameContent = fs.readFileSync(
    libGenerateUsername,
    'utf-8'
  );

  // Components
  const utilsCompContent = fs.readFileSync(utilsComp, 'utf-8');
  const accountCompContent = fs.readFileSync(accountComp, 'utf-8');
  const bankSelectorContent = fs.readFileSync(bankSelector, 'utf-8');
  const gameListCompContent = fs.readFileSync(gameListComp, 'utf-8');
  const loginCompContent = fs.readFileSync(loginComp, 'utf-8');
  const providerListCompContent = fs.readFileSync(providerListComp, 'utf-8');
  const registerCompContent = fs.readFileSync(registerComp, 'utf-8');
  const GamblingCategoryCompContent = fs.readFileSync(
    GamblingCategoryComp,
    'utf-8'
  );
  const ProvidersCompContent = fs.readFileSync(ProvidersComp, 'utf-8');
  const lobbyCompContent = fs.readFileSync(lobbyComp, 'utf-8');
  const loadingCompContent = fs.readFileSync(loadingComp, 'utf-8');
  const footerCompContent = fs.readFileSync(footerComp, 'utf-8');
  const displayCompContent = fs.readFileSync(displayComp, 'utf-8');
  const launchGameIndexCompContent = fs.readFileSync(
    launchGameIndexComp,
    'utf-8'
  );
  const lobbyProviderCompContent = fs.readFileSync(lobbyProviderComp, 'utf-8');
  const GameProviderCompContent = fs.readFileSync(GameProviderComp, 'utf-8');

  // Pages
  const providersPageCompContent = fs.readFileSync(providersPageComp, 'utf-8');
  const lobbyPageCompContent = fs.readFileSync(lobbyPageComp, 'utf-8');
  const providerPageCompContent = fs.readFileSync(providerPageComp, 'utf-8');
  const launchGamePageCompContent = fs.readFileSync(
    launchGamePageComp,
    'utf-8'
  );

  // Data Source
  const providerDataSourceContent = fs.readFileSync(
    providerDataSource,
    'utf-8'
  );

  console.log(
    '---deployData.files-',
    deployData.files,
    typeof deployData.files
  );

  const solidFiles = [
    { file: 'src/wrappers/auth.jsx', data: wrapAuthContent },
    { file: 'src/api/gameProviders.js', data: gameProvidersAPIContent },
    { file: 'src/api/gameList.js', data: gameListAPIContent },
    { file: 'src/gql/addContact.js', data: addContactContent },
    { file: 'src/gql/addTracking.js', data: addTrackingContent },
    { file: 'src/gql/addUser.js', data: addUserContent },
    { file: 'src/gql/banks.js', data: banksContent },
    { file: 'src/gql/gameProviders.js', data: gameProvidersContent },
    { file: 'src/gql/getPromotionLists.js', data: getPromotionListContent },
    { file: 'src/gql/launchGames.js', data: launchGamesContent },
    { file: 'src/gql/signIn.js', data: signInContent },
    { file: 'src/gql/userMe.js', data: userMeContent },
    { file: 'src/gql/wallet.js', data: walletContent },
    { file: 'src/apollo/index.js', data: apolloIndexContent },
    { file: 'src/libs/getMobileDetect/index.js', data: getMobileDetectContent },
    { file: 'src/libs/format/index.js', data: libFormatIndexContent },
    { file: 'src/libs/format/balance.js', data: libFormatBalanceContent },
    { file: 'src/libs/authToken.js', data: libAuthTokenContent },
    { file: 'src/libs/credit.js', data: libCreditContent },
    { file: 'src/libs/waitTime.js', data: libWaitTimeContent },
    { file: 'src/libs/useAuth.js', data: libUseAuthContent },
    { file: 'src/libs/tracking.js', data: libTrackingContent },
    { file: 'src/libs/generateUsername.js', data: libGenerateUsernameContent },
    { file: 'src/components/utils.js', data: utilsCompContent },
    {
      file: 'src/components/less/providerPage.less',
      data: providerPageStyleContent,
    },
    { file: 'src/components/accountComp.jsx', data: accountCompContent },
    { file: 'src/components/bankSelector.jsx', data: bankSelectorContent },
    { file: 'src/components/gameList.jsx', data: gameListCompContent },
    { file: 'src/components/loginComp.jsx', data: loginCompContent },
    { file: 'src/components/providerList.jsx', data: providerListCompContent },
    { file: 'src/components/registerComp.jsx', data: registerCompContent },
    {
      file: 'src/components/GamblingCategory.jsx',
      data: GamblingCategoryCompContent,
    },
    { file: 'src/components/Providers.jsx', data: ProvidersCompContent },
    { file: 'src/components/lobby.jsx', data: lobbyCompContent },
    {
      file: 'src/components/GameProvider.jsx',
      data: GameProviderCompContent,
    },
    {
      file: 'src/components/lobbyProvider.jsx',
      data: lobbyProviderCompContent,
    },
    {
      file: 'src/components/providerDataSource.jsx',
      data: providerDataSourceContent,
    },
    {
      file: 'src/components/launchGame/loading.jsx',
      data: loadingCompContent,
    },
    {
      file: 'src/components/launchGame/footer.jsx',
      data: footerCompContent,
    },
    {
      file: 'src/components/launchGame/display.jsx',
      data: displayCompContent,
    },
    {
      file: 'src/components/launchGame/index.jsx',
      data: launchGameIndexCompContent,
    },
    { file: 'src/pages/lobby/launchGame.jsx', data: launchGamePageCompContent },
    { file: 'src/pages/lobby/provider.js', data: providerPageCompContent },
    { file: 'src/pages/lobby/[shortName].js', data: lobbyPageCompContent },
    { file: 'src/pages/providers.jsx', data: providersPageCompContent },
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
      // one name per site
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
