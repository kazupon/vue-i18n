import util, { warn } from './util'
import path from './path'
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

  let lang = 'en'

  path.Vue = util.Vue = Vue
  setupLangVM(Vue, lang)

  Asset(Vue)

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

plugin.version = '3.1.0'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
