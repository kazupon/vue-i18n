/* @flow */

import VueI18n from './index'
import { isPlainObject, warn, error, merge } from './util'

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
              error(`Cannot parse locale messages via custom blocks.`, e)
            }
          }
        }
        this._i18n = options.i18n
        this._i18nWatcher = this._i18n.watchI18nData()
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root
          options.i18n.formatter = this.$root.$i18n.formatter
          options.i18n.fallbackLocale = this.$root.$i18n.fallbackLocale
          options.i18n.formatFallbackMessages = this.$root.$i18n.formatFallbackMessages
          options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn
          options.i18n.silentFallbackWarn = this.$root.$i18n.silentFallbackWarn
          options.i18n.pluralizationRules = this.$root.$i18n.pluralizationRules
          options.i18n.preserveDirectiveContent = this.$root.$i18n.preserveDirectiveContent
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

        const { sharedMessages } = options.i18n
        if (sharedMessages && isPlainObject(sharedMessages)) {
          options.i18n.messages = merge(options.i18n.messages, sharedMessages)
        }

        this._i18n = new VueI18n(options.i18n)
        this._i18nWatcher = this._i18n.watchI18nData()

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
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n
    }
  },

  beforeMount (): void {
    const options: any = this.$options
    options.i18n = options.i18n || (options.__i18n ? {} : null)

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        this._i18n.subscribeDataChanging(this)
        this._subscribing = true
      } else if (isPlainObject(options.i18n)) {
        this._i18n.subscribeDataChanging(this)
        this._subscribing = true
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(`Cannot be interpreted 'i18n' option.`)
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this)
      this._subscribing = true
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this)
      this._subscribing = true
    }
  },

  beforeDestroy (): void {
    if (!this._i18n) { return }

    const self = this
    this.$nextTick(() => {
      if (self._subscribing) {
        self._i18n.unsubscribeDataChanging(self)
        delete self._subscribing
      }

      if (self._i18nWatcher) {
        self._i18nWatcher()
        self._i18n.destroyVM()
        delete self._i18nWatcher
      }

      if (self._localeWatcher) {
        self._localeWatcher()
        delete self._localeWatcher
      }

      self._i18n = null
    })
  }
}
