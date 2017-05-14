/* @flow */

import { install, Vue } from './install'
import {
  warn,
  isNull,
  parseArgs,
  fetchChoice,
  isPlainObject,
  isObject,
  looseClone,
  canUseDateTimeFormat,
  canUseNumberFormat
} from './util'
import BaseFormatter from './format'
import I18nPath from './path'

import type { PathValue } from './path'

export default class VueI18n {
  static install: () => void
  static version: string
  static availabilities: IntlAvailability

  _vm: any
  _formatter: Formatter
  _root: ?I18n
  _sync: boolean
  _fallbackRoot: boolean
  _missing: ?MissingHandler
  _exist: Function
  _watcher: any
  _i18nWatcher: Function
  _silentTranslationWarn: boolean
  _dateTimeFormatters: Object
  _numberFormatters: Object
  _path: I18nPath

  constructor (options: I18nOptions = {}) {
    const locale: Locale = options.locale || 'en-US'
    const fallbackLocale: Locale = options.fallbackLocale || 'en-US'
    const messages: LocaleMessages = options.messages || {}
    const dateTimeFormats = options.dateTimeFormats || {}
    const numberFormats = options.numberFormats || {}

    this._vm = null
    this._formatter = options.formatter || new BaseFormatter()
    this._missing = options.missing || null
    this._root = options.root || null
    this._sync = options.sync === undefined ? true : !!options.sync
    this._fallbackRoot = options.fallbackRoot === undefined
      ? true
      : !!options.fallbackRoot
    this._silentTranslationWarn = options.silentTranslationWarn === undefined
      ? false
      : !!options.silentTranslationWarn
    this._dateTimeFormatters = {}
    this._numberFormatters = {}
    this._path = new I18nPath()

    this._exist = (message: Object, key: Path): boolean => {
      if (!message || !key) { return false }
      return !isNull(this._path.getPathValue(message, key))
    }

    this._initVM({
      locale,
      fallbackLocale,
      messages,
      dateTimeFormats,
      numberFormats
    })
  }

  _initVM (data: {
    locale: Locale,
    fallbackLocale: Locale,
    messages: LocaleMessages,
    dateTimeFormats: DateTimeFormats,
    numberFormats: NumberFormats
  }): void {
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({ data })
    Vue.config.silent = silent
  }

  watchI18nData (fn: Function): Function {
    this._i18nWatcher = this._vm.$watch('$data', () => {
      fn && fn()
    }, { deep: true })
    return this._i18nWatcher
  }

  unwatchI18nData (): boolean {
    if (this._i18nWatcher) {
      this._i18nWatcher()
      delete this._i18nWatcher
    }
    return true
  }

  watchLocale (fn: Function): ?Function {
    if (!this._sync || !this._root) { return null }
    const target: any = this._vm
    this._watcher = this._root.vm.$watch('locale', (val) => {
      target.$set(target, 'locale', val)
      fn && fn()
    }, { immediate: true })
    return this._watcher
  }

  unwatchLocale (): boolean {
    if (!this._sync || !this._watcher) { return false }
    if (this._watcher) {
      this._watcher()
      delete this._watcher
    }
    return true
  }

  get vm (): any { return this._vm }

  get messages (): LocaleMessages { return looseClone(this._vm.messages) }
  get dateTimeFormats (): DateTimeFormats { return looseClone(this._vm.dateTimeFormats) }
  get numberFormats (): NumberFormats { return looseClone(this._vm.numberFormats) }

  get locale (): Locale { return this._vm.locale }
  set locale (locale: Locale): void {
    this._vm.$set(this._vm, 'locale', locale)
  }

  get fallbackLocale (): Locale { return this._vm.fallbackLocale }
  set fallbackLocale (locale: Locale): void {
    this._vm.$set(this._vm, 'fallbackLocale', locale)
  }

  get missing (): ?MissingHandler { return this._missing }
  set missing (handler: MissingHandler): void { this._missing = handler }

  get formatter (): Formatter { return this._formatter }
  set formatter (formatter: Formatter): void { this._formatter = formatter }

  get silentTranslationWarn (): boolean { return this._silentTranslationWarn }
  set silentTranslationWarn (silent: boolean): void { this._silentTranslationWarn = silent }

  _warnDefault (locale: Locale, key: Path, result: ?any, vm: ?any): ?string {
    if (!isNull(result)) { return result }
    if (this.missing) {
      this.missing.apply(null, [locale, key, vm])
    } else {
      if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
        warn(
          `Cannot translate the value of keypath '${key}'. ` +
          'Use the value of keypath as default.'
        )
      }
    }
    return key
  }

  _isFallbackRoot (val: any): boolean {
    return !val && !isNull(this._root) && this._fallbackRoot
  }

  _interpolate (
    message: LocaleMessageObject,
    key: Path,
    interpolateMode: string,
    values: any
  ): any {
    if (!message) { return null }

    const pathRet: PathValue = this._path.getPathValue(message, key)
    if (Array.isArray(pathRet)) { return pathRet }

    let ret: mixed
    if (isNull(pathRet)) {
      if (isPlainObject(message)) {
        ret = message[key]
        if (typeof ret !== 'string') {
          if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
            warn(`Value of key '${key}' is not a string!`)
          }
          return null
        }
      } else {
        return null
      }
    } else {
      if (typeof pathRet === 'string') {
        ret = pathRet
      } else {
        if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
          warn(`Value of key '${key}' is not a string!`)
        }
        return null
      }
    }

    // Check for the existance of links within the translated string
    if (ret.indexOf('@:') >= 0) {
      // Match all the links within the local
      // We are going to replace each of
      // them with its translation
      const matches: any = ret.match(/(@:[\w|.]+)/g)
      for (const idx in matches) {
        const link: string = matches[idx]
        // Remove the leading @:
        const linkPlaceholder: string = link.substr(2)
        // Translate the link
        const translated: any = this._interpolate(message, linkPlaceholder, interpolateMode, values)
        if (interpolateMode === 'raw') {
          return translated
        }
        // Replace the link with the translated
        ret = ret.replace(link, translated)
      }
    }

    return !values ? ret : this._render(ret, interpolateMode, values)
  }

  _render (message: string, interpolateMode: string, values: any): any {
    const ret = this._formatter.interpolate(message, values)
    // if interpolateMode is **not** 'string' ('row'),
    // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
    return interpolateMode === 'string' ? ret.join('') : ret
  }

  _translate (
    messages: LocaleMessages,
    locale: Locale,
    fallback: Locale,
    key: Path,
    interpolateMode: string,
    args: any
  ): any {
    let res: any = this._interpolate(messages[locale], key, interpolateMode, args)
    if (!isNull(res)) { return res }

    res = this._interpolate(messages[fallback], key, args)
    if (!isNull(res)) {
      if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
        warn(`Fall back to translate the keypath '${key}' with '${fallback}' locale.`)
      }
      return res
    } else {
      return null
    }
  }

  _t (key: Path, _locale: Locale, messages: LocaleMessages, host: any, ...values: any): any {
    if (!key) { return '' }

    const parsedArgs = parseArgs(...values)
    const locale: Locale = parsedArgs.locale || _locale

    const ret: any = this._translate(messages, locale, this.fallbackLocale, key, 'string', parsedArgs.params)
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
        warn(`Fall back to translate the keypath '${key}' with root locale.`)
      }
      if (!this._root) { throw Error('unexpected error') }
      return this._root.t(key, ...values)
    } else {
      return this._warnDefault(locale, key, ret, host)
    }
  }

  t (key: Path, ...values: any): TranslateResult {
    return this._t(key, this.locale, this.messages, null, ...values)
  }

  _i (key: Path, locale: Locale, messages: LocaleMessages, host: any, ...values: any): any {
    const ret: any =
      this._translate(messages, locale, this.fallbackLocale, key, 'raw', values)
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
        warn(`Fall back to interpolate the keypath '${key}' with root locale.`)
      }
      if (!this._root) { throw Error('unexpected error') }
      return this._root.i(key, ...values)
    } else {
      return this._warnDefault(locale, key, ret, host)
    }
  }

  i (key: Path, ...values: any): TranslateResult {
    if (!key) { return '' }

    let locale: Locale = this.locale
    let index: number = 0
    if (typeof values[0] === 'string') {
      locale = values[0]
      index = 1
    }

    const params: Array<any> = []
    for (let i = index; i < values.length; i++) {
      params.push(values[i])
    }

    return this._i(key, locale, this.messages, null, ...params)
  }

  _tc (
    key: Path,
    _locale: Locale,
    messages: LocaleMessages,
    host: any,
    choice?: number,
    ...values: any
  ): any {
    if (!key) { return '' }
    if (choice !== undefined) {
      return fetchChoice(this._t(key, _locale, messages, host, ...values), choice)
    } else {
      return this._t(key, _locale, messages, host, ...values)
    }
  }

  tc (key: Path, choice?: number, ...values: any): TranslateResult {
    return this._tc(key, this.locale, this.messages, null, choice, ...values)
  }

  _te (key: Path, locale: Locale, messages: LocaleMessages, ...args: any): boolean {
    const _locale: Locale = parseArgs(...args).locale || locale
    return this._exist(messages[_locale], key)
  }

  te (key: Path, locale?: Locale): boolean {
    return this._te(key, this.locale, this.messages, locale)
  }

  getLocaleMessage (locale: Locale): LocaleMessageObject {
    return looseClone(this._vm.messages[locale])
  }

  setLocaleMessage (locale: Locale, message: LocaleMessageObject): void {
    this._vm.messages[locale] = message
  }

  mergeLocaleMessage (locale: Locale, message: LocaleMessageObject): void {
    this._vm.messages[locale] = Vue.util.extend(this.getLocaleMessage(locale), message)
  }

  getDateTimeFormat (locale: Locale): DateTimeFormat {
    return looseClone(this._vm.dateTimeFormats[locale])
  }

  setDateTimeFormat (locale: Locale, format: DateTimeFormat): void {
    this._vm.dateTimeFormats[locale] = format
  }

  mergeDateTimeFormat (locale: Locale, format: DateTimeFormat): void {
    this._vm.dateTimeFormats[locale] = Vue.util.extend(this.getDateTimeFormat(locale), format)
  }

  _d (value: number | Date, _locale: Locale, key: ?string): DateTimeFormatResult {
    if (process.env.NODE_ENV !== 'production' && !VueI18n.availabilities.dateTimeFormat) {
      warn('Cannot format a Date value due to not support Intl.DateTimeFormat.')
      return ''
    }

    let ret = ''
    const dateTimeFormats = this.dateTimeFormats
    if (key) {
      let locale: Locale = _locale
      if (isNull(dateTimeFormats[_locale][key])) {
        if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
          warn(`Fall back to the dateTimeFormat of key '${key}' with '${this.fallbackLocale}' locale.`)
        }
        locale = this.fallbackLocale
      }
      const id = `${locale}__${key}`
      let formatter = this._dateTimeFormatters[id]
      const format = dateTimeFormats[locale][key]
      if (!formatter) {
        formatter = this._dateTimeFormatters[id] = Intl.DateTimeFormat(locale, format)
      }
      ret = formatter.format(value)
    } else {
      ret = Intl.DateTimeFormat(_locale).format(value)
    }

    return ret
  }

  d (value: number | Date, ...args: any): DateTimeFormatResult {
    let locale: Locale = this.locale
    let key: ?string = null

    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        key = args[0]
      } else if (isObject(args[0])) {
        if (args[0].locale) {
          locale = args[0].locale
        }
        if (args[0].key) {
          key = args[0].key
        }
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        key = args[0]
      }
      if (typeof args[1] === 'string') {
        locale = args[1]
      }
    }

    return this._d(value, locale, key)
  }

  getNumberFormat (locale: Locale): NumberFormat {
    return looseClone(this._vm.numberFormats[locale])
  }

  setNumberFormat (locale: Locale, format: NumberFormat): void {
    this._vm.numberFormats[locale] = format
  }

  mergeNumberFormat (locale: Locale, format: NumberFormat): void {
    this._vm.numberFormats[locale] = Vue.util.extend(this.getNumberFormat(locale), format)
  }

  _n (value: number, _locale: Locale, key: ?string): NumberFormatResult {
    if (process.env.NODE_ENV !== 'production' && !VueI18n.availabilities.numberFormat) {
      warn('Cannot format a Date value due to not support Intl.NumberFormat.')
      return ''
    }

    let ret = ''
    const numberFormats = this.numberFormats
    if (key) {
      let locale: Locale = _locale
      if (isNull(numberFormats[_locale][key])) {
        if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
          warn(`Fall back to the numberFormat of key '${key}' with '${this.fallbackLocale}' locale.`)
        }
        locale = this.fallbackLocale
      }
      const id = `${locale}__${key}`
      let formatter = this._numberFormatters[id]
      const format = numberFormats[locale][key]
      if (!formatter) {
        formatter = this._numberFormatters[id] = Intl.NumberFormat(locale, format)
      }
      ret = formatter.format(value)
    } else {
      ret = Intl.NumberFormat(_locale).format(value)
    }

    return ret
  }

  n (value: number, ...args: any): NumberFormatResult {
    let locale: Locale = this.locale
    let key: ?string = null

    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        key = args[0]
      } else if (isObject(args[0])) {
        if (args[0].locale) {
          locale = args[0].locale
        }
        if (args[0].key) {
          key = args[0].key
        }
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        key = args[0]
      }
      if (typeof args[1] === 'string') {
        locale = args[1]
      }
    }

    return this._n(value, locale, key)
  }
}

VueI18n.availabilities = {
  dateTimeFormat: canUseDateTimeFormat,
  numberFormat: canUseNumberFormat
}
VueI18n.install = install
VueI18n.version = '__VERSION__'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueI18n)
}
