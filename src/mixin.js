/* @flow */

import VueI18n from './index'
import { isPlainObject, warn } from './util'

const $t = (vm: any): Function => {
  if (vm.$i18n) {
    // add dependency tracking !!
    const locale: Locale = vm.$i18n.locale
    /* eslint-disable no-unused-vars */
    const fallback: Locale = vm.$i18n.fallbackLocal
    /* eslint-enable no-unused-vars */
    const messages: LocaleMessages = vm.$i18n.vm.messages
    return (key: string, ...values: any): TranslateResult => {
      return vm.$i18n._t(key, locale, messages, vm, ...values)
    }
  }
}
const $tc = (vm: any): Function => {
  if (vm.$i18n) {
    // add dependency tracking !!
    const locale: Locale = vm.$i18n.locale
    /* eslint-disable no-unused-vars */
    const fallback: Locale = vm.$i18n.fallbackLocal
    /* eslint-enable no-unused-vars */
    const messages: LocaleMessages = vm.$i18n.vm.messages
    return (key: string, choice?: number, ...values: any): TranslateResult => {
      return vm.$i18n._tc(key, locale, messages, vm, choice, ...values)
    }
  }
}
const $te = (vm: any): Function => {
  if (vm.$i18n) {
    // add dependency tracking !!
    const locale: Locale = vm.$i18n.locale
    const messages: LocaleMessages = vm.$i18n.vm.messages
    return (key: string, ...args: any): boolean => {
      return vm.$i18n._te(key, locale, messages, ...args)
    }
  }
}

function defineComputed (vm: any, options: any): void {
  options.computed = options.computed || {}
  options.computed.$t = () => $t(vm)
  options.computed.$tc = () => $tc(vm)
  options.computed.$te = () => $te(vm)
}

export default {
  beforeCreate (): void {
    const options: any = this.$options
    options.i18n = options.i18n || (options.__i18n ? {} : null)

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        this._i18n = options.i18n
        defineComputed(this, options)
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root.$i18n
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
        defineComputed(this, options)

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
      defineComputed(this, options)
    }
  },

  beforeDestroy (): void {
    if (!this._i18n) { return }

    if (this._localeWatcher) {
      this.$i18n.unwatchLocale()
      delete this._localeWatcher
    }

    this._i18n = null
  }
}
