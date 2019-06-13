const Vue = require('vue')
const VueI18n = require('vue-i18n')
const i18nExtensions = require('vue-i18n-extensions')

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: require('./locales/en.json'),
    ja: require('./locales/ja.json')
  }
})

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // inject `compilerOptions` to vue-loader options
      config.module.rules.forEach(rule => {
        if (rule.loader === 'vue-loader') {
          rule.options.compilerOptions = rule.options.compilerOptions || {}
          rule.options.compilerOptions.modules = [i18nExtensions.module(i18n)]
        }
      })
    }
  }
}
