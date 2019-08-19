const Vue = require('vue')
var VueI18n = require('vue-i18n')
const i18nExtensions = require('vue-i18n-extensions')

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: {
      headers: {
        links: 'Essential Links',
        ecosystem: 'Ecosystem'
      },
      items: {
        docs: 'Core Docs',
        forum: 'Forum',
        chat: 'Gitter Chat',
        twitter: 'Twitter',
        routing: 'vue-router',
        store: 'vuex',
        webpack: 'vue-loader',
        curated: 'awesome-vue'
      }
    },
    ja: {
    }
  },
  missing: function (locale, key) {
    console.warn('missing:', locale, key)
  }
})

module.exports = {
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
