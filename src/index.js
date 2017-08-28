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
  remove,
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
  _dataListeners: Array<any>

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
    this._dataListeners = []

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

  subscribeDataChanging (vm: any): void {
    this._dataListeners.push(vm)
  }

  unsubscribeDataChanging (vm: any): void {
    remove(this._dataListeners, vm)
  }

  watchI18nData (): Function {
    const self = this
    return this._vm.$watch('$data', () => {
      let i = self._dataListeners.length
      while (i--) {
        Vue.nextTick(() => {
          self._dataListeners[i] && self._dataListeners[i].$forceUpdate()
        })
      }
    }, { deep: true })
  }

  watchLocale (): ?Function {
    /* istanbul ignore if */
    if (!this._sync || !this._root) { return null }
    const target: any = this._vm
    return this._root.vm.$watch('locale', (val) => {
      target.$set(target, 'locale', val)
      target.$forceUpdate()
    }, { immediate: true })
  }

  get vm (): any { return this._vm }

  get messages (): LocaleMessages { return looseClone(this._getMessages()) }
  get dateTimeFormats (): DateTimeFormats { return looseClone(this._getDateTimeFormats()) }
  get numberFormats (): NumberFormats { return looseClone(this._getNumberFormats()) }

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

  _getMessages (): LocaleMessages { return this._vm.messages }
  _getDateTimeFormats (): DateTimeFormats { return this._vm.dateTimeFormats }
  _getNumberFormats (): NumberFormats { return this._vm.numberFormats }

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
    locale: Locale,
    message: LocaleMessageObject,
    key: Path,
    host: any,
    interpolateMode: string,
    values: any
  ): any {
    if (!message) { return null }

    const pathRet: PathValue = this._path.getPathValue(message, key)
    if (Array.isArray(pathRet)) { return pathRet }

    let ret: mixed
    if (isNull(pathRet)) {
      /* istanbul ignore else */
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
      /* istanbul ignore else */
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
      ret = this._link(locale, message, ret, host, interpolateMode, values)
    }

    return !values ? ret : this._render(ret, interpolateMode, values)
  }

  _link (
    locale: Locale,
    message: LocaleMessageObject,
    str: string,
    host: any,
    interpolateMode: string,
    values: any
  ): any {
    let ret: string = str

    // Match all the links within the local
    // We are going to replace each of
    // them with its translation
    const matches: any = ret.match(/(@:[\w\-_|.]+)/g)
    for (const idx in matches) {
      // ie compatible: filter custom array
      // prototype method
      if (!matches.hasOwnProperty(idx)) {
        continue
      }
      const link: string = matches[idx]
      // Remove the leading @:
      const linkPlaceholder: string = link.substr(2)
      // Translate the link
      let translated: any = this._interpolate(
        locale, message, linkPlaceholder, host,
        interpolateMode === 'raw' ? 'string' : interpolateMode,
        interpolateMode === 'raw' ? undefined : values
      )

      if (this._isFallbackRoot(translated)) {
        if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
          warn(`Fall back to translate the link placeholder '${linkPlaceholder}' with root locale.`)
        }
        /* istanbul ignore if */
        if (!this._root) { throw Error('unexpected error') }
        const root: any = this._root
        translated = root._translate(
          root._getMessages(), root.locale, root.fallbackLocale,
          linkPlaceholder, host, interpolateMode, values
        )
      }
      translated = this._warnDefault(locale, linkPlaceholder, translated, host)

      // Replace the link with the translated
      ret = !translated ? ret : ret.replace(link, translated)
    }

    return ret
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
    host: any,
    interpolateMode: string,
    args: any
  ): any {
    let res: any =
      this._interpolate(locale, messages[locale], key, host, interpolateMode, args)
    if (!isNull(res)) { return res }

    res = this._interpolate(fallback, messages[fallback], key, host, interpolateMode, args)
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

    const ret: any = this._translate(
      messages, locale, this.fallbackLocale, key,
      host, 'string', parsedArgs.params
    )
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
        warn(`Fall back to translate the keypath '${key}' with root locale.`)
      }
      /* istanbul ignore if */
      if (!this._root) { throw Error('unexpected error') }
      return this._root.t(key, ...values)
    } else {
      return this._warnDefault(locale, key, ret, host)
    }
  }

  t (key: Path, ...values: any): TranslateResult {
    return this._t(key, this.locale, this._getMessages(), null, ...values)
  }

  _i (key: Path, locale: Locale, messages: LocaleMessages, host: any, values: Object): any {
    const ret: any =
      this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values)
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
        warn(`Fall back to interpolate the keypath '${key}' with root locale.`)
      }
      if (!this._root) { throw Error('unexpected error') }
      return this._root.i(key, locale, values)
    } else {
      return this._warnDefault(locale, key, ret, host)
    }
  }

  i (key: Path, locale: Locale, values: Object): TranslateResult {
    /* istanbul ignore if */
    if (!key) { return '' }

    if (typeof locale !== 'string') {
      locale = this.locale
    }

    return this._i(key, locale, this._getMessages(), null, values)
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
    if (choice === undefined) {
      choice = 1
    }
    return fetchChoice(this._t(key, _locale, messages, host, ...values), choice)
  }

  tc (key: Path, choice?: number, ...values: any): TranslateResult {
    return this._tc(key, this.locale, this._getMessages(), null, choice, ...values)
  }

  _te (key: Path, locale: Locale, messages: LocaleMessages, ...args: any): boolean {
    const _locale: Locale = parseArgs(...args).locale || locale
    return this._exist(messages[_locale], key)
  }

  te (key: Path, locale?: Locale): boolean {
    return this._te(key, this.locale, this._getMessages(), locale)
  }

  getLocaleMessage (locale: Locale): LocaleMessageObject {
    return looseClone(this._vm.messages[locale] || {})
  }

  setLocaleMessage (locale: Locale, message: LocaleMessageObject): void {
    this._vm.messages[locale] = message
  }

  mergeLocaleMessage (locale: Locale, message: LocaleMessageObject): void {
    this._vm.messages[locale] = Vue.util.extend(this._vm.messages[locale] || {}, message)
  }

  getDateTimeFormat (locale: Locale): DateTimeFormat {
    return looseClone(this._vm.dateTimeFormats[locale] || {})
  }

  setDateTimeFormat (locale: Locale, format: DateTimeFormat): void {
    this._vm.dateTimeFormats[locale] = format
  }

  mergeDateTimeFormat (locale: Locale, format: DateTimeFormat): void {
    this._vm.dateTimeFormats[locale] = Vue.util.extend(this._vm.dateTimeFormats[locale] || {}, format)
  }

  _localizeDateTime (
    value: number | Date,
    locale: Locale,
    fallback: Locale,
    dateTimeFormats: DateTimeFormats,
    key: string
  ): ?DateTimeFormatResult {
    let _locale: Locale = locale
    let formats: DateTimeFormat = dateTimeFormats[_locale]

    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to '${fallback}' datetime formats from '${locale} datetime formats.`)
      }
      _locale = fallback
      formats = dateTimeFormats[_locale]
    }

    if (isNull(formats) || isNull(formats[key])) {
      return null
    } else {
      const format: ?DateTimeFormatOptions = formats[key]
      const id = `${_locale}__${key}`
      let formatter = this._dateTimeFormatters[id]
      if (!formatter) {
        formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format)
      }
      return formatter.format(value)
    }
  }

  _d (value: number | Date, locale: Locale, key: ?string): DateTimeFormatResult {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && !VueI18n.availabilities.dateTimeFormat) {
      warn('Cannot format a Date value due to not support Intl.DateTimeFormat.')
      return ''
    }

    if (!key) {
      return new Intl.DateTimeFormat(locale).format(value)
    }

    const ret: ?DateTimeFormatResult =
      this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key)
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to datetime localization of root: key '${key}' .`)
      }
      /* istanbul ignore if */
      if (!this._root) { throw Error('unexpected error') }
      return this._root.d(value, key, locale)
    } else {
      return ret || ''
    }
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
    return looseClone(this._vm.numberFormats[locale] || {})
  }

  setNumberFormat (locale: Locale, format: NumberFormat): void {
    this._vm.numberFormats[locale] = format
  }

  mergeNumberFormat (locale: Locale, format: NumberFormat): void {
    this._vm.numberFormats[locale] = Vue.util.extend(this._vm.numberFormats[locale] || {}, format)
  }

  _localizeNumber (
    value: number,
    locale: Locale,
    fallback: Locale,
    numberFormats: NumberFormats,
    key: string
  ): ?NumberFormatResult {
    let _locale: Locale = locale
    let formats: NumberFormat = numberFormats[_locale]

    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to '${fallback}' number formats from '${locale} number formats.`)
      }
      _locale = fallback
      formats = numberFormats[_locale]
    }

    if (isNull(formats) || isNull(formats[key])) {
      return null
    } else {
      const format: ?NumberFormatOptions = formats[key]
      const id = `${_locale}__${key}`
      let formatter = this._numberFormatters[id]
      if (!formatter) {
        formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format)
      }
      return formatter.format(value)
    }
  }

  _n (value: number, locale: Locale, key: ?string): NumberFormatResult {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && !VueI18n.availabilities.numberFormat) {
      warn('Cannot format a Date value due to not support Intl.NumberFormat.')
      return ''
    }

    if (!key) {
      return new Intl.NumberFormat(locale).format(value)
    }

    const ret: ?NumberFormatResult =
      this._localizeNumber(value, locale, this.fallbackLocale, this._getNumberFormats(), key)
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to number localization of root: key '${key}' .`)
      }
      /* istanbul ignore if */
      if (!this._root) { throw Error('unexpected error') }
      return this._root.n(value, key, locale)
    } else {
      return ret || ''
    }
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

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueI18n)
}
