module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['flowtype'],
  extends: [
    'plugin:vue-libs/recommended',
    'plugin:flowtype/recommended'
  ],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }]
  }
}