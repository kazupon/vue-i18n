import { warn } from './util'
import Format from './format'
import Path from './path'


/**
 * extend
 * 
 * @param {Vue} Vue
 * @return {Vue}
 */

export default function (Vue) {
  const { isObject } = Vue.util
  const format = Format(Vue)
  const getValue = Path(Vue)

  function parseArgs (...args) {
    let lang = Vue.config.lang
    if (args.length === 1) {
      if (isObject(args[0]) || Array.isArray(args[0])) {
        args = args[0]
      } else if (typeof args[0] === 'string') {
        lang = args[0]
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        lang = args[0]
      }
      if (isObject(args[1]) || Array.isArray(args[1])) {
        args = args[1]
      }
    }

    return { lang, params: args }
  }

  function translate (locale, key, args) {
    if (!locale) { return null }

    const val = getValue(locale, key) || locale[key]
    if (!val) { return null }

    return args ? format(val, args) : val
  }

  function warnDefault (key) {
    if (process.env.NODE_ENV !== 'production') {
      warn('Cannot translate the value of keypath "' + key + '". '
        + 'Use the value of keypath as default')
    }
    return key
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

    const { lang, params } = parseArgs(...args)
    return translate(Vue.locale(lang), key, params) || warnDefault(key)
  }


  /**
   * $t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$t = function (key, ...args) {
    if (!key) { return '' }

    const { lang, params } = parseArgs(...args)
    return translate(this.$options.locales && this.$options.locales[lang], key, params) 
      || translate(Vue.locale(lang), key, params)
      || warnDefault(key)
  }

  return Vue
}
