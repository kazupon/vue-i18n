/* @flow */

import VueI18n from './index'
import { isPlainObject, warn, merge } from './util'

export default {
  beforeCreate (): void {
    const options: any = this.$options
    options.i18n = options.i18n || (options.__i18n ? {} : null)

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            let localeMessages = {}
            options.__i18n.forEach(resource => {
              localeMessages = merge(localeMessages, JSON.parse(resource))
            })
            Object.keys(localeMessages).forEach((locale: Locale) => {
              options.i18n.mergeLocaleMessage(locale, localeMessages[locale])
            })
          } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
              warn(`Cannot parse locale messages via custom blocks.`, e)
            }
          }
        }
        this._i18n = options.i18n
        this._i18nWatcher = this._i18n.watchI18nData()
        this._i18n.subscribeDataChanging(this)
        this._subscribing = true
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root.$i18n
          options.i18n.fallbackLocale = this.$root.$i18n.fallbackLocale
          options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn
        }

        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            let localeMessages = {}
            options.__i18n.forEach(resource => {
              localeMessages = merge(localeMessages, JSON.parse(resource))
            })
            options.i18n.messages = localeMessages
          } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
              warn(`Cannot parse locale messages via custom blocks.`, e)
            }
          }
        }

        this._i18n = new VueI18n(options.i18n)
        this._i18nWatcher = this._i18n.watchI18nData()
        this._i18n.subscribeDataChanging(this)
        this._subscribing = true

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale()
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(`Cannot be interpreted 'i18n' option.`)
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n
      this._i18n.subscribeDataChanging(this)
      this._subscribing = true
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n
      this._i18n.subscribeDataChanging(this)
      this._subscribing = true
    }
  },

  beforeDestroy (): void {
    if (!this._i18n) { return }

    if (this._subscribing) {
      this._i18n.unsubscribeDataChanging(this)
      delete this._subscribing
    }

    if (this._i18nWatcher) {
      this._i18nWatcher()
      delete this._i18nWatcher
    }

    if (this._localeWatcher) {
      this._localeWatcher()
      delete this._localeWatcher
    }

    this._i18n = null
  }
}
