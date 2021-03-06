const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {},
    },
  },
  plugins: ['react', 'promise', '@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    '@typescript-eslint/no-var-requires': OFF,
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'global-require': OFF,
    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [ERROR],
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-empty-interface': OFF,
    'react/jsx-props-no-spreading': OFF,
    'no-shadow': OFF,
    '@typescript-eslint/no-shadow': [OFF],
    '@typescript-eslint/no-explicit-any': OFF,
    'no-console': OFF,
    'react/display-name': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
    'react/prop-types': OFF,
    'no-param-reassign': OFF,
    'react-hooks/exhaustive-deps': WARN,
    'no-restricted-syntax': WARN,
    'guard-for-in': WARN,
  },
};
