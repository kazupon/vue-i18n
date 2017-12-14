/* @flow */

export default function extend (Vue: any): void {
  // $FlowFixMe
  Object.defineProperty(Vue.prototype, '$t', {
    get () {
      return (key: Path, ...values: any): TranslateResult => {
        const i18n = this.$i18n
        return i18n._t(key, i18n.locale, i18n._getMessages(), this, ...values)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Vue.prototype, '$tc', {
    get () {
      return (key: Path, choice?: number, ...values: any): TranslateResult => {
        const i18n = this.$i18n
        return i18n._tc(key, i18n.locale, i18n._getMessages(), this, choice, ...values)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Vue.prototype, '$te', {
    get () {
      return (key: Path, locale?: Locale): boolean => {
        const i18n = this.$i18n
        return i18n._te(key, i18n.locale, i18n._getMessages(), locale)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Vue.prototype, '$d', {
    get () {
      return (value: number | Date, ...args: any): DateTimeFormatResult => {
        return this.$i18n.d(value, ...args)
      }
    }
  })
  // $FlowFixMe
  Object.defineProperty(Vue.prototype, '$n', {
    get () {
      return (value: number, ...args: any): NumberFormatResult => {
        return this.$i18n.n(value, ...args)
      }
    }
  })
}
