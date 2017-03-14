/* @flow */

import { install, Vue } from './install'
import { warn, isNull, parseArgs, fetchChoice, isPlainObject } from './util'
import BaseFormatter from './format'
import getPathValue from './path'

import type { PathValue } from './path'

export default class VueI18n {
  static install: () => void
  static version: string

  _vm: any
  _formatter: Formatter
  _root: ?I18n
  _sync: ?boolean
  _fallbackRoot: boolean
  _fallbackLocale: Locale
  _missing: ?MissingHandler
  _exist: Function
  _watcher: any

  constructor (options: I18nOptions = {}) {
    const locale: Locale = options.locale || 'en-US'
    const messages: Messages = options.messages || {}
    this._vm = null
    this._fallbackLocale = options.fallbackLocale || 'en-US'
    this._formatter = options.formatter || new BaseFormatter()
    this._missing = options.missing
    this._root = options.root || null
    this._sync = options.sync || false
    this._fallbackRoot = options.fallbackRoot || false

    this._exist = (message: Object, key: Path): boolean => {
      if (!message || !key) { return false }
      return !isNull(getPathValue(message, key))
    }

    this._resetVM({ locale, messages })
  }

  _resetVM (data: { locale: Locale, messages: Messages }): void {
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

  get messages (): Messages { return this._vm.$data.messages }
  set messages (messages: Messages): void { this._vm.$set(this._vm, 'messages', messages) }

  get locale (): Locale { return this._vm.$data.locale }
  set locale (locale: Locale): void { this._vm.$set(this._vm, 'locale', locale) }

  get fallbackLocale (): Locale { return this._fallbackLocale }
  set fallbackLocale (locale: Locale): void { this._fallbackLocale = locale }

  get missing (): ?MissingHandler { return this._missing }
  set missing (handler: MissingHandler): void { this._missing = handler }

  get formatter (): Formatter { return this._formatter }
  set formatter (formatter: Formatter): void { this._formatter = formatter }

  _warnDefault (locale: Locale, key: Path, result: ?any, vm: ?any): ?string {
    if (!isNull(result)) { return result }
    if (this.missing) {
      this.missing.apply(null, [locale, key, vm])
    } else {
      if (process.env.NODE_ENV !== 'production') {
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

  _interpolate (message: MessageObject, key: Path, args: any): any {
    if (!message) { return null }

    const pathRet: PathValue = getPathValue(message, key)
    if (Array.isArray(pathRet)) { return pathRet }

    let ret: mixed
    if (isNull(pathRet)) {
      if (isPlainObject(message)) {
        ret = message[key]
        if (typeof ret !== 'string') {
          warn(`Value of key '${key}' is not a string!`)
          return null
        }
      } else {
        return null
      }
    } else {
      if (typeof pathRet === 'string') {
        ret = pathRet
      } else {
        warn(`Value of key '${key}' is not a string!`)
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
        const translatedstring = this._interpolate(message, linkPlaceholder, args)
        // Replace the link with the translated string
        ret = ret.replace(link, translatedstring)
      }
    }

    return !args ? ret : this._format(ret, args)
  }

  _format (message: string, ...args: any): string {
    return this._formatter.format(message, ...args)
  }

  _translate (messages: Messages, locale: Locale, fallback: Locale, key: Path, args: any): any {
    let res: any = null
    res = this._interpolate(messages[locale], key, args)
    if (!isNull(res)) { return res }

    res = this._interpolate(messages[fallback], key, args)
    if (!isNull(res)) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to translate the keypath '${key}' with '${fallback}' locale.`)
      }
      return res
    } else {
      return null
    }
  }

  _t (key: Path, _locale: Locale, messages: Messages, host: any, ...args: any): any {
    if (!key) { return '' }

    const parsedArgs = parseArgs(...args)
    const locale: Locale = parsedArgs.locale || _locale

    const ret: any = this._translate(messages, locale, this.fallbackLocale, key, parsedArgs.params)
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to translate the keypath '${key}' with root locale.`)
      }
      if (!this._root) { throw Error('unexpected error') }
      return this._root.t(key, ...args)
    } else {
      return this._warnDefault(locale, key, ret, host)
    }
  }

  t (key: Path, ...args: any): TranslateResult {
    return this._t(key, this.locale, this.messages, null, ...args)
  }

  _tc (key: Path, _locale: Locale, messages: Messages, host: any, choice?: number, ...args: any): any {
    if (!key) { return '' }
    if (choice !== undefined) {
      return fetchChoice(this._t(key, _locale, messages, host, ...args), choice)
    } else {
      return this._t(key, _locale, messages, host, ...args)
    }
  }

  tc (key: Path, choice?: number, ...args: any): TranslateResult {
    return this._tc(key, this.locale, this.messages, null, choice, ...args)
  }

  _te (key: Path, _locale: Locale, messages: Messages, ...args: any): boolean {
    const locale: Locale = parseArgs(...args).locale || _locale
    return this._exist(messages[locale], key)
  }

  te (key: Path, ...args: any): boolean {
    return this._te(key, this.locale, this.messages, ...args)
  }
}

VueI18n.install = install
VueI18n.version = '__VERSION__'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueI18n)
}
