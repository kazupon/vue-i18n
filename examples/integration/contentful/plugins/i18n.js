import Vue from 'vue'
import VueI18n from 'vue-i18n'

const DEFAULT_LOCALE = 'en-US'

Vue.use(VueI18n)

export default ({ app, req }) => {
  let locale = DEFAULT_LOCALE

  if (process.client) {
    const navigator = window.navigator
    const languages = navigator.languages || navigator.language || navigator.browserLanguage || navigator.userLanguage
    locale = languages[0]
  } else if (req) {
    locale = req.headers['accept-language'].split(',')[0]
  }

  console.log(`plugins: locale=${locale}`)
  app.i18n = new VueI18n({
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      'en-US': require('~/locales/en-US.json'),
      'ja': require('~/locales/ja.json')
    },
    dateTimeFormats: {
      'en-US': {
        short: { year: 'numeric', month: 'short', day: 'numeric' }
      },
      'ja': {
        short: { year: 'numeric', month: 'short', day: 'numeric' }
      }
    }
  })
}
