import util, { warn, empty, each } from './util'
import compare from './compare'
import Asset from './asset'
import Override from './override'
import Config from './config'
import Extend from './extend'

let langVM // singleton


/**
 * plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

function plugin (Vue, opts = {}) {
  if (process.env.NODE_ENV !== 'production' && plugin.installed) {
    warn('already installed.')
    return
  }

  if (process.env.NODE_ENV !== 'production'
    && (!Vue.version || compare(Vue.version, '1.0') < 0)) {
    warn('vue-i18n (' + plugin.version
      + ') need to use vue version 1.0 or later (vue version: '
      + Vue.version + ').')
    return
  }

  if (process.env.NODE_ENV !== 'production' && opts.lang) {
    warn('`options.lang` will be deprecated in vue-i18n 3.1 later.')
  }
  let lang = opts.lang || 'en'

  if (process.env.NODE_ENV !== 'production' && opts.locales) {
    warn('`options.locales` will be deprecated in vue-i18n 3.1 later.')
  }
  let locales = opts.locales || {}

  util.Vue = Vue
  setupLangVM(Vue, lang)

  Asset(Vue)
  setupLocale(Vue, locales)

  Override(Vue, langVM)
  Config(Vue, langVM)
  Extend(Vue)
}

function setupLangVM (Vue, lang) {
  const silent = Vue.config.silent
  Vue.config.silent = true
  if (!langVM) {
    langVM = new Vue({ data: { lang: lang } })
  }
  Vue.config.silent = silent
}

function setupLocale (Vue, locales) {
  if (!empty(locales)) {
    each(locales, (locale, lang) => {
      Vue.locale(lang, locale)
    })
  }
}

plugin.version = '3.0.0'

export default plugin
