import util, { warn, empty, each } from './util'
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

function plugin (Vue, opts = { lang: 'en', locales: {} }) {
  if (plugin.installed) {
    warn('already installed.')
    return
  }

  util.Vue = Vue
  setupLangVM(Vue, opts.lang)

  Asset(Vue)
  setupLocale(Vue, opts.locales)

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

plugin.version = '2.4.1'

export default plugin
