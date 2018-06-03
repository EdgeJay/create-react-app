const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand(dotenv.config());

require('babel-register')({
  ignore: /\/(public|node_modules)\//,
  presets: ['env', 'react-app'],
});

require('./server.js');
