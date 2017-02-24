/* @flow */

import VueI18n from './index'

export default {
  computed: {
    $t () {
      // HACK: add dependency tracking !!
      const locale: string = this.$i18n.locale
      const messages: Messages = this.$i18n.messages
      return (key: string, ...args: any): string => {
        return this.$i18n._t(key, locale, messages, this, ...args)
      }
    },

    $tc () {
      // HACK: add dependency tracking !!
      const locale: string = this.$i18n.locale
      const messages: Messages = this.$i18n.messages
      return (key: string, choice?: number, ...args: any): string => {
        return this.$i18n._tc(key, locale, messages, this, choice, ...args)
      }
    },

    $te () {
      // HACK: add dependency tracking !!
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
      if (options.i18n instanceof VueI18n) {
        this.$i18n = options.i18n
      } else {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root.$i18n
        }
        this.$i18n = new VueI18n(options.i18n)
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this.$i18n = this.$root.$i18n
    }
  },

  beforeDestroy () {
    this.$i18n = null
  }
}
