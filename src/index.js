/* @flow */

import { install, Vue } from './install'
import { warn, isNull, parseArgs, fetchChoice, isPlainObject, looseClone } from './util'
import BaseFormatter from './format'
import getPathValue from './path'

import type { PathValue } from './path'

export default class VueI18n {
  static install: () => void
  static version: string

  _vm: any
  _formatter: Formatter
  _root: ?I18n
  _sync: boolean
  _fallbackRoot: boolean
  _missing: ?MissingHandler
  _exist: Function
  _watcher: any
  _silentTranslationWarn: boolean

  constructor (options: I18nOptions = {}) {
    const locale: Locale = options.locale || 'en-US'
    const fallbackLocale: Locale = options.fallbackLocale || 'en-US'
    const messages: LocaleMessages = options.messages || {}
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

    this._exist = (message: Object, key: Path): boolean => {
      if (!message || !key) { return false }
      return !isNull(getPathValue(message, key))
    }

    this._initVM({ locale, fallbackLocale, messages })
  }

  _initVM (data: {
    locale: Locale, fallbackLocale: Locale, messages: LocaleMessages
  }): void {
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({ data })
    Vue.config.silent = silent
  }

  watchLocale (): any {
    if (!this._sync || !this._root) { return null }
    const target: any = this._vm
    this._watcher = this._root.vm.$watch('locale', (val) => {
      target.$set(target, 'locale', val)
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

  _interpolate (message: LocaleMessageObject, key: Path, values: any): any {
    if (!message) { return null }

    const pathRet: PathValue = getPathValue(message, key)
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
        const link = matches[idx]
        // Remove the leading @:
        const linkPlaceholder = link.substr(2)
        // Translate the link
        const translatedstring = this._interpolate(message, linkPlaceholder, values)
        // Replace the link with the translated string
        ret = ret.replace(link, translatedstring)
      }
    }

    return !values ? ret : this._format(ret, values)
  }

  _format (message: string, ...values: any): string {
    return this._formatter.format(message, ...values)
  }

  _translate (messages: LocaleMessages, locale: Locale, fallback: Locale, key: Path, args: any): any {
    let res: any = null
    res = this._interpolate(messages[locale], key, args)
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

    const ret: any = this._translate(messages, locale, this.fallbackLocale, key, parsedArgs.params)
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

  _tc (key: Path, _locale: Locale, messages: LocaleMessages, host: any, choice?: number, ...values: any): any {
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
    return this._te(key, this.locale, this.messages, [locale])
  }

  getLocaleMessage (locale: Locale): LocaleMessage {
    return looseClone(this._vm.messages[locale])
  }

  setLocaleMessage (locale: Locale, message: LocaleMessage): void {
    this._vm.messages[locale] = message
  }
}

VueI18n.install = install
VueI18n.version = '__VERSION__'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueI18n)
}
