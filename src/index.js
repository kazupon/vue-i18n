/* @flow */

import { install, Vue } from './install'
import { isNull, parseArgs, fetchChoice } from './util'
import warn from './warn'
import BaseFormatter from './format'
import Path from './path'
import type { PathValue } from './path'

export default class VueI18n {
  static install: () => void
  static version: string

  _vm: any
  _formatter: Formatter
  _root: ?I18n
  _fallbackRoot: boolean
  _fallbackLocale: string
  _missing: ?MissingHandler
  _getPathValue: Function
  _exist: Function

  constructor (options: I18nOptions = {}) {
    const locale: string = options.locale || 'en-US'
    const messages: Messages = options.messages || {}
    this._vm = null
    this._fallbackLocale = options.fallbackLocale || 'en-US'
    this._formatter = options.formatter || new BaseFormatter()
    this._missing = options.missing
    this._root = options.root || null
    this._fallbackRoot = options.fallbackRoot || false

    const getPathValue: Function = Path(Vue)
    this._getPathValue = getPathValue
    this._exist = (message: Object, key: string): boolean => {
      if (!message || !key) { return false }
      return !isNull(getPathValue(message, key))
    }

    this._resetVM({ locale, messages })
  }

  _resetVM (data: { locale: string, messages: Messages }): void {
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({ data })
    Vue.config.silent = silent
  }

  get messages (): Messages { return this._vm.$data.messages }
  set messages (messages: Messages): void { this._vm.$set(this._vm, 'messages', messages) }

  get locale (): string { return this._vm.$data.locale }
  set locale (locale: string): void { this._vm.$set(this._vm, 'locale', locale) }

  get fallbackLocale (): string { return this._fallbackLocale }
  set fallbackLocale (locale: string): void { this._fallbackLocale = locale }

  get missing (): ?MissingHandler { return this._missing }
  set missing (handler: MissingHandler): void { this._missing = handler }

  get formatter (): Formatter { return this._formatter }
  set formatter (formatter: Formatter): void { this._formatter = formatter }

  _warnDefault (locale: string, key: string, result: ?any, vm: ?any): ?string {
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

  _interpolate (message: Messages, key: string, args: any): any {
    if (!message) { return null }

    let val: PathValue = this._getPathValue(message, key)
    if (Array.isArray(val)) { return val }
    if (isNull(val)) { val = message[key] }
    if (isNull(val)) { return null }
    if (typeof val !== 'string') {
      warn(`Value of key '${key}' is not a string!`)
      return null
    }

    // Check for the existance of links within the translated string
    if (val.indexOf('@:') >= 0) {
      // Match all the links within the local
      // We are going to replace each of
      // them with its translation
      const matches: any = val.match(/(@:[\w|.]+)/g)
      for (const idx in matches) {
        const link = matches[idx]
        // Remove the leading @:
        const linkPlaceholder = link.substr(2)
        // Translate the link
        const translatedstring = this._interpolate(message, linkPlaceholder, args)
        // Replace the link with the translated string
        val = val.replace(link, translatedstring)
      }
    }

    return !args ? val : this._format(val, args)
  }

  _format (val: any, ...args: any): any {
    return this._formatter.format(val, ...args)
  }

  _translate (messages: Messages, locale: string, fallback: string, key: string, args: any): any {
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

  _t (key: string, _locale: string, messages: Messages, host: any, ...args: any): any {
    if (!key) { return '' }

    const parsedArgs = parseArgs(...args)
    const locale = parsedArgs.locale || _locale

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

  t (key: string, ...args: any): string {
    return this._t(key, this.locale, this.messages, null, ...args)
  }

  _tc (key: string, _locale: string, messages: Messages, host: any, choice?: number, ...args: any): any {
    if (!key) { return '' }
    if (choice !== undefined) {
      return fetchChoice(this._t(key, _locale, messages, host, ...args), choice)
    } else {
      return this._t(key, _locale, messages, host, ...args)
    }
  }

  tc (key: string, choice?: number, ...args: any): any {
    return this._tc(key, this.locale, this.messages, null, choice, ...args)
  }

  _te (key: string, _locale: string, messages: Messages, ...args: any): boolean {
    const locale = parseArgs(...args).locale || _locale
    return this._exist(messages[locale], key)
  }

  te (key: string, ...args: any): boolean {
    return this._te(key, this.locale, this.messages, ...args)
  }
}

VueI18n.install = install
VueI18n.version = '__VERSION__'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueI18n)
}
