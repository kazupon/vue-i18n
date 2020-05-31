module.exports = {
  env: {
    browser: true,
    mocha: true
  },
  globals: {
    isChrome: true,
    assert: true,
    sinon: true,
    Vue: true,
    VueI18n: true
  },
  extends: [
    "plugin:vue/recommended"
  ]
}
