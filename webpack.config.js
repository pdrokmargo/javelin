// Look in ./config folder for webpack.dev.js

const ENV = process.env.NODE_ENV? process.env.NODE_ENV : 'dev';

switch (ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'});
}
