/* @flow */

export function initFilter (): void {
  const { filters } = this.$options
  const bind = (name: string): void => {
    if (typeof filters[name] === 'undefined') {
      filters[name] = (...argv): TranslateResult =>
        this.$i18n && this[`$${name}`]
          ? this[`$${name}`].apply(this, argv)
          : argv[0]
    }
  }
  bind('t')
  bind('tc')
  bind('te')
}

export function destroyFilter (): void {
  const { filters } = this.$options
  if (filters.t) {
    delete filters.t
  }

  if (filters.te) {
    delete filters.te
  }

  if (filters.tc) {
    delete filters.tc
  }
}
