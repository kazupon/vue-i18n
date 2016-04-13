import { warn } from './util'
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

  setupLangVM(Vue, opts.lang)

  Override(Vue, langVM)
  Config(Vue, langVM)
  Extend(Vue, opts.locales)
}

function setupLangVM (Vue, lang) {
  const silent = Vue.config.silent
  Vue.config.silent = true
  if (!langVM) {
    langVM = new Vue({ data: { lang: lang } })
  }
  Vue.config.silent = silent
}

plugin.version = '2.4.1'

export default plugin
