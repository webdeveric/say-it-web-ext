const tsconfig = require('./tsconfig.json');

const internalPathAliases = Object.keys(tsconfig.compilerOptions.paths)
  .map(path => path.replaceAll(/^@|\/\*$/g, ''))
  .join(',');

module.exports = {
  root: true,
  extends: [
    '@webdeveric/eslint-config-ts',
    'eslint-config-prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:no-unsanitized/DOM',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    webextensions: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/extensions': ['.ts', '.tsx', '.json'],
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          markers: ['!'],
          balanced: true,
        },
      },
    ],
    'import/first': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['./*.js', './*.mjs', './*.cjs', './*.ts', './*.mts', './*.cts', '**/*.test.ts'],
      },
    ],
    'import/no-relative-packages': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: false,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },
        distinctGroup: false,
        groups: ['builtin', 'external', 'internal', 'parent', ['sibling', 'index'], 'type', 'object'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: `@{${internalPathAliases}}/**`,
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        warnOnUnassignedImports: true,
      },
    ],
    'sort-imports': 'off',
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['./*.js', './*.cjs', './*.mjs', './*.ts', './*.cts', './*.mts'],
      parserOptions: {
        project: ['./tsconfig.project-files.json'],
      },
      rules: {
        'import/no-default-export': 'off',
        'import/no-named-as-default': 'off',
      },
    },
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': ['off'],
      },
    },
  ],
};
