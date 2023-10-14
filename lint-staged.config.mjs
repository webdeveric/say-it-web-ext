import { relative } from 'node:path';
import { cwd } from 'node:process';

/**
 * @type {(filenames: string[]) => string[]}
 */
const relativeFilenames = filenames => {
  const root = cwd();

  return filenames.map(file => relative(root, file));
};

/**
 * @type {Record<string, string | (filenames: string[]) => string | string[] | Promise<string | string[]>}
 */
export default {
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}': ['eslint --cache --fix'],
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,css,yml,yaml}': ['vitest related --run'],
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,css,yml,yaml,md}': [
    'cspell lint --no-progress --no-summary --no-must-find-files',
    'prettier --write',
  ],
  '*': filenames => {
    const files = relativeFilenames(filenames);

    return [
      // Spell check file names
      `sh -c 'echo "${files.join('\n')}" | cspell --show-context stdin'`,
    ];
  },
};
