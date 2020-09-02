module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    semi: [
      'error',
      'never'
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'no-unused-vars':
    [
      'error',
      { argsIgnorePattern: '_' }
    ],
    'comma-dangle': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    camelcase: 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0
  },
}
