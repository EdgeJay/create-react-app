const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand(dotenv.config());

require('babel-register')({
  ignore: /\/(public|node_modules)\//,
  presets: ['env', 'react-app'],
  plugins: [
    [
      'transform-assets-import-to-string',
      {
        extensions: [
          '.html',
          '.css',
          '.ico',
          '.png',
          '.jpg',
          '.jpeg',
          '.svg',
          '.gif',
          '.otf',
          '.ttf',
          '.webm',
        ],
        baseDir: '/',
        baseUri: '',
      },
    ],
  ],
});

require('./server.js');
