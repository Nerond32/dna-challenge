module.exports = {
    env: {
      commonjs: true,
      es6: true,
      node: true
    },
    plugins:[
      'prettier'
    ],
    extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
      ecmaVersion: 2019
    },
    rules: {
      quotes: ['error', 'single'],
      'prettier/prettier': ['error', { 'singleQuote': true }]
    }
  };
  