const Vue = require('vue')
var VueI18n = require('vue-i18n')
const i18nExtensions = require('vue-i18n-extensions')

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'jp',
  messages: {
    en: {
      label: 'x'
    },
    jp: {
      label: '☓'
    }
  }
})

module.exports = {
  publicPath: '/compiler/dist',
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.modules = [i18nExtensions.module(i18n)]
        return options
      })
  }
}
