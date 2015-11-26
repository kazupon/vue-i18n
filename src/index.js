import extend from './extend'


/**
 * install
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

export default function install (Vue, opts = { lang: 'en', locales: {} }) {
  defineConfig(Vue.config, opts.lang)
  extend(Vue, opts.locales)
}


/**
 * defineConfig
 *
 * This function define `lang` property to `Vue.config`.
 *
 * @param {Object} config
 * @param {String} lang
 * @private
 */

function defineConfig (config, lang) {
  Object.defineProperty(config, 'lang', {
    get: () => { return lang },
    set: (val) => { lang = val }
  })
}


/**
 * install automaticlly 
 */

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
