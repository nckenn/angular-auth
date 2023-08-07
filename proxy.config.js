// https://angular.io/guide/build#proxying-to-a-backend-server

const PROXY_CONFIG = {
  '/Account/*': {
    target: 'https://netzwelt-devtest.azurewebsites.net',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
  },
  '/Territories/*': {
    target: 'https://netzwelt-devtest.azurewebsites.net',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
  }
};

module.exports = PROXY_CONFIG;
