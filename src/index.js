import warn from './warn'
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
  const version = (Vue.version && Number(Vue.version.split('.')[0])) || -1

  if (process.env.NODE_ENV !== 'production' && plugin.installed) {
    warn('already installed.')
    return
  }

  if (process.env.NODE_ENV !== 'production' && version < 1) {
    warn('vue-i18n (' + plugin.version
      + ') need to use vue version 1.0 or later (vue version: '
      + Vue.version + ').')
    return
  }

  const lang = 'en'

  setupLangVM(Vue, lang)
  Asset(Vue)
  Override(Vue, langVM)
  Config(Vue, langVM, lang)
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

plugin.version = '4.2.2'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
