import format from './format'
import compare from './compare'


/**
 * extend
 * 
 * @param {Vue} Vue
 * @return {Vue}
 */

export default function (Vue) {
  const getPath = (Vue.version && compare('1.0.8', Vue.version) === -1) 
      ? Vue.parsers.path.getPath
      : Vue.parsers.path.get
  const util = Vue.util

  function getVal (key, lang, args) {
    let value = key
    try {
      let locale = Vue.locale(lang)
      let val = getPath(locale, key) || locale[key]
      value = (args ? format(val, args) : val) || key
    } catch (e) {
      value = key
    }
    return value
  }


  /**
   * Vue.t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.t = (key, ...args) => {
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

    return getVal(key, language, args)
  }


  /**
   * $t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$t = (key, ...args) => {
    return Vue.t(key, ...args)
  }

  return Vue
}
