import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, type UserConfig } from 'vitest/config';

import tsconfig from './tsconfig.json' assert { type: 'json' };

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArrayTypes<T> = T extends any ? (T extends readonly any[] ? T : never) : never;

type TestConfig = NonNullable<UserConfig['test']>;
type AliasObject = ArrayTypes<NonNullable<TestConfig['alias']>>[number];

const alias = Object.entries(tsconfig.compilerOptions.paths).map<AliasObject>(([key, value]) => {
  const find = key.replace(/\*$/, '');
  const replacement = value.at(0)?.replace(/\*$/, '');

  assert(typeof replacement === 'string');

  return {
    find,
    replacement,
    customResolver: source => path.resolve(__dirname, source.replace(/\.js$/, '.ts').replace(/\.jsx$/, '.tsx')),
  };
});

const config = defineConfig({
  test: {
    include: ['./src/**/*.test.{ts,tsx,cts,mts}'],
    alias,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
    },
  },
});

export default config;
