module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['flowtype', 'ie11', 'no-autofix'],
  extends: [
    'plugin:flowtype/recommended'
  ],
  rules: {
    'ie11/no-collection-args': [ 'error' ],
    'ie11/no-for-in-const': [ 'error' ],
    'ie11/no-loop-func': [ 'warn' ],
    'ie11/no-weak-collections': [ 'error' ],
    'prefer-const': 'off',
    'no-autofix/prefer-const': 'warn',
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }]
  }
}
