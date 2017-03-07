/* @flow */

import VueI18n from './index'
import { typeName, isPlainObject, warn } from './util'

export default {
  computed: {
    $t () {
      if (!this.$i18n) {
        throw Error(`Failed in $t due to not find VueI18n instance`)
      }
      // add dependency tracking !!
      const locale: string = this.$i18n.locale
      const messages: Messages = this.$i18n.messages
      return (key: string, ...args: any): string => {
        return this.$i18n._t(key, locale, messages, this, ...args)
      }
    },

    $tc () {
      if (!this.$i18n) {
        throw Error(`Failed in $tc due to not find VueI18n instance`)
      }
      // add dependency tracking !!
      const locale: string = this.$i18n.locale
      const messages: Messages = this.$i18n.messages
      return (key: string, choice?: number, ...args: any): string => {
        return this.$i18n._tc(key, locale, messages, this, choice, ...args)
      }
    },

    $te () {
      if (!this.$i18n) {
        throw Error(`Failed in $te due to not find VueI18n instance`)
      }
      // add dependency tracking !!
      const locale: string = this.$i18n.locale
      const messages: Messages = this.$i18n.messages
      return (key: string, ...args: any): boolean => {
        return this.$i18n._te(key, locale, messages, ...args)
      }
    }
  },

  beforeCreate () {
    const options: any = this.$options
    if (options.i18n) {
      if (typeName(options.i18n) === 'VueI18n') {
        this.$i18n = options.i18n
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && typeName(this.$root.$i18n) === 'VueI18n') {
          options.i18n.root = this.$root.$i18n
        }
        this.$i18n = new VueI18n(options.i18n)
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(`Cannot be interpreted 'i18n' options.`)
        }
      }
    } else if (this.$root && this.$root.$i18n && typeName(this.$root.$i18n) === 'VueI18n') {
      // root i18n
      this.$i18n = this.$root.$i18n
    }
  },

  destroyed () {
    this.$i18n = null
  }
}
