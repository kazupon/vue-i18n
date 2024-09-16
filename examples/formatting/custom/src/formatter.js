import MessageFormat from 'messageformat'

export default class CustomFormatter {
  constructor (options = {}) {
    this._locale = options.locale || 'en-US'
    this._formatter = new MessageFormat(this._locale, {returnType: 'values'})
    this._caches = Object.create(null)
  }

  interpolate (message, values) {
    let fn = this._caches[message]
    if (!fn) {
      fn = this._formatter.compile(message, this._locale)
      this._caches[message] = fn
    }

    if (values !== null && values !== undefined) {
      /**
       * Component interpolation in the following format passes `values` as an Array-like `Object`
       *
       * ```vue
       * <i18n path="terms" for="tos">
       *   I agree with the <a href="/terms">{{ $t('tos') }}</a>
       * </i18n>
       * ```
       *
       * VNodes _may_ be found when using interpolated values with either the deprecated `places` **or** the new slot
       * syntax
       */
      const valuesEntries = Object.entries(values)
      const isNonSlotInterpolation = valuesEntries.some(entry => {
        const [key, value] = entry
        return value.hasOwnProperty('componentOptions') && isNaN(Number.parseFloat(key)) === false
      })

      if (isNonSlotInterpolation) {
        /**
         * In this case, we iterate over the VNode list and preserve **only** VNodes with tags and return them, wrapped
         * in a list.
         *
         * Rationale: If text nodes are kept, the positional lookup from vue-i18n will fail, rendering the first
         * child again (i.e `I agree with the, I agree with the`)
         */
        values = valuesEntries.map(entry => {
          const [, vnode] = entry
          if (vnode.tag !== undefined) {
            return [vnode]
          }
        }).filter(Boolean)
      }
    }
    const result = fn(values).map(piece => {
      if (!Array.isArray(piece)) {
        return piece
      }

      const hasVNodes = piece.some(part => part.hasOwnProperty('componentOptions'))
      if (hasVNodes === false) {
        return piece.join('')
      }
      return piece
    })

    return result
  }
}
