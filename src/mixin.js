/* @flow */

import VueI18n from './index'
import { isPlainObject, warn } from './util'

export default {
  beforeCreate (): void {
    const options: any = this.$options
    options.i18n = options.i18n || (options.__i18n ? {} : null)

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        this._i18n = options.i18n
        this._i18nWatcher = this._i18n.watchI18nData(() => this.$forceUpdate())
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root.$i18n
          options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn
        }

        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            options.i18n.messages = JSON.parse(options.__i18n)
          } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
              warn(`Cannot parse locale messages via custom blocks.`)
            }
          }
        }

        this._i18n = new VueI18n(options.i18n)
        this._i18nWatcher = this._i18n.watchI18nData(() => this.$forceUpdate())

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale(() => this.$forceUpdate())
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(`Cannot be interpreted 'i18n' option.`)
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n
      this._i18nWatcher = this._i18n.watchI18nData(() => this.$forceUpdate())
    }
  },

  beforeDestroy (): void {
    if (!this._i18n) { return }

    if (this._i18nWatcher) {
      this._i18n.unwatchI18nData()
      delete this._i18nWatcher
    }

    if (this._localeWatcher) {
      this._i18n.unwatchLocale()
      delete this._localeWatcher
    }

    this._i18n = null
  }
}
