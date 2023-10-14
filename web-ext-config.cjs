const path = require('node:path');

const manifest = require('./src/manifest.json');

const webExtId = manifest.browser_specific_settings.gecko.id;

module.exports = {
  verbose: true,
  sourceDir: path.join(__dirname, 'dist'),
  artifactsDir: path.join(__dirname, 'build'),
  build: {
    overwriteDest: true,
  },
  run: {
    startUrl: [`about:devtools-toolbox?id=${encodeURIComponent(webExtId)}&type=extension`, 'https://webdeveric.com/'],
  },
  ignoreFiles: ['package-lock.json', 'pnpm-lock.yaml'],
};
