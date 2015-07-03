/**
 * Import(s)
 */

var format = require('./format')


/**
 * Export(s)
 */

module.exports = extend


/**
 * extend
 *  
 * @param {Vue} Vue
 * @param {Object} locales
 * @return {Vue}
 */

function extend (Vue, locales) {
  var path = Vue.parsers.path
  var util = Vue.util

  function getVal (path, key, lang, args) {
    var value = key
    try {
      var val = path.get(locales[lang], key) || locales[lang][key]
      value = (args ? format(val, args) : val) || key
    } catch (e) {
      value = key
    }
    return value
  }

  Vue.prototype.$t = function (key) {
    if (!key) { return '' }

    var args = null
    var language = Vue.config.lang
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

    return getVal(path, key, language, args)
  }

  return Vue
}
