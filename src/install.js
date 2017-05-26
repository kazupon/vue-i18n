import { warn } from './util'
import extend from './extend'
import mixin from './mixin'
import component from './component'

export let Vue

export function install (_Vue) {
  Vue = _Vue

  const version = (Vue.version && Number(Vue.version.split('.')[0])) || -1
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && install.installed) {
    warn('already installed.')
    return
  }
  install.installed = true

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && version < 2) {
    warn(`vue-i18n (${install.version}) need to use Vue 2.0 or later (Vue: ${Vue.version}).`)
    return
  }

  Object.defineProperty(Vue.prototype, '$i18n', {
    get () { return this._i18n }
  })

  extend(Vue)
  Vue.mixin(mixin)
  Vue.component(component.name, component)

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.i18n = strats.methods
}
