import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import manifest from './src/manifest.json' assert { type: 'json' };

const webExtId = manifest.browser_specific_settings.gecko.id;

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const verbose = true;

export const sourceDir = join(__dirname, 'dist');

export const artifactsDir = join(__dirname, 'build');

export const build = {
  overwriteDest: true,
};

export const run = {
  startUrl: [`about:devtools-toolbox?id=${encodeURIComponent(webExtId)}&type=extension`, 'https://webdeveric.com/'],
};

export const ignoreFiles = ['package-lock.json'];
