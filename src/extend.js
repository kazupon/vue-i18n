/* @flow */

export default function extend (Vue: any): void {
  Vue.prototype.$t = function (key: Path, ...values: any): TranslateResult {
    const i18n = this.$i18n
    return i18n._t(key, i18n.locale, i18n.messages, this, ...values)
  }

  Vue.prototype.$tc = function (key: Path, choice?: number, ...values: any): TranslateResult {
    const i18n = this.$i18n
    return i18n._tc(key, i18n.locale, i18n.messages, this, choice, ...values)
  }

  Vue.prototype.$te = function (key: Path, locale?: Locale): boolean {
    const i18n = this.$i18n
    return i18n._te(key, i18n.locale, i18n.messages, locale)
  }
}
