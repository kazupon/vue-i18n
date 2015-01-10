/**
 * Import(s)
 */

var format = require('./lib/format')


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
  var locales = opts.locales || opts.resources || {}

  // `$t` method (for Vue 0.11.4 later)
  try {
    var path = Vue.parsers.path
    var util = Vue.util

    Vue.prototype.$t = function (key) {
      if (!key) { return '' }

      var args = null
      var language = lang
      if (arguments.length === 2) {
        if (util.isObject(arguments[1]) || util.isArray(arguments[1])) {
          args = arguments[1]
        } else if (typeof arguments[1] === 'string') {
          language = arguments[1]
        }
      } else if (arguments.length === 3) {
        if (typeof arguments[1] === 'string') {
          language = arguments[1]
        }
        if (util.isObject(arguments[2]) || util.isArray(arguments[2])) {
          args = arguments[2]
        }
      }

      var val = path.get(locales[language], key)
      return (args ? format(val, args) : val) || key
    }
  } catch (e) {
    Vue.utils.warn('not support $t in this Vue version')
  }

  // 't' function
  Vue.t = function (key) {
    var ret = key || ''
    var locale = locales[lang]
    if (key && locale) {
      var namespaces = key.split('.')
      for (var i = 0; i < namespaces.length; i++) {
        locale = locale[namespaces[i]]
        if (!locale) {
          ret = key
          break
        } else {
          ret = locale
        }
      }
    }
    return ret
  }

  // 'v-t' directive
  Vue.directive('t', {
    isLiteral: true,
    bind: function () {
      if (this.el.nodeType !== 1) { return }

      this.el.textContent = Vue.t(this.expression)
    }
  })
}
