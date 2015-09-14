/**
 * Import(s)
 */

import extend from './extend'


/**
 * Export(s)
 */

/**
 * plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

export default function (Vue, opts = { lang: 'en', locales: {} }) {
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
