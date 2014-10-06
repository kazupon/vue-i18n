/**
 * Expose internationalization plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

module.exports = function (Vue, opts) {
  opts = opts || {}
  var lang = opts.lang || 'en'
  var locales = opts.locales || opts.resources || {}

  Vue.t = function (key) {
    var ret = key || ''
    var locale = locales[lang]
    if (key && locale) {
      var namespaces = key.split('.')
      for (var i = 0; i < namespaces.length; i++) {
        locale = locale[namespaces[i]]
        if (!locale) {
          ret = key;
          break
        } else {
          ret = locale
        }
      }
    }
    return ret
  }

  Vue.directive('t', {
    isLiteral: true,
    bind: function () {
      if (this.el.nodeType !== 1) { return }

      this.el.textContent = Vue.t(this.expression)
    }
  })
}
