const Vue = require('vue')
const VueI18n = require('vue-i18n')
const i18nExtensions = require('vue-i18n-extensions')

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: require('./locales/en.json'),
    ja: require('./locales/ja.json')
  }
})

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      // inject `compilerModules` to vue-loader options
      config.module.rules.forEach(rule => {
        if (rule.loader === 'vue-loader') {
          rule.options.compilerModules = [i18nExtensions.module(i18n)]
        }
      })
    }
  }
}
