/**
 * Import(s)
 */

var extend = require('./lib/extend')


/**
 * Export(s)
 */

module.exports = plugin


/**
 * plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

function plugin (Vue, opts) {
  opts = opts || {}
  var lang = opts.lang || 'en'
  var locales = opts.locales || {}

  defineConfig(Vue.config, lang)
  extend(Vue, locales)
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
    get: function () { return lang },
    set: function (val) { lang = val }
  })
}
