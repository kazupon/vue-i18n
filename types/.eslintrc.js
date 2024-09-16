module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }]
  }
}
