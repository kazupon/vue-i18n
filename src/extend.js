import format from './format'


/**
 * extend
 * 
 * @param {Vue} Vue
 * @param {Object} locales
 * @return {Vue}
 */

export default function (Vue, locales) {
  const path = Vue.parsers.path
  const util = Vue.util

  function getVal (path, key, lang, args) {
    let value = key
    try {
      let val = path.get(locales[lang], key) || locales[lang][key]
      value = (args ? format(val, args) : val) || key
    } catch (e) {
      value = key
    }
    return value
  }

  /**
   * $t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$t = (key, ...args) => {
    if (!key) { return '' }

    let language = Vue.config.lang
    if (args.length === 1) {
      if (util.isObject(args[0]) || util.isArray(args[0])) {
        args = args[0]
      } else if (typeof args[0] === 'string') {
        language = args[0]
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        language = args[0]
      }
      if (util.isObject(args[1]) || util.isArray(args[1])) {
        args = args[1]
      }
    }

    return getVal(path, key, language, args)
  }

  return Vue
}
