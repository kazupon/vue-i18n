import { getWatcher, getDep } from './observer'

export default function (Vue, langVM) {
  const { bind } = Vue.util
  const Watcher = getWatcher(langVM)
  const Dep = getDep(langVM)

  function makeComputedGetter (getter, owner) {
    const watcher = new Watcher(owner, getter, null, {
      lazy: true
    })

    return function computedGetter () {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }

  // define Vue.config.lang configration
  Object.defineProperty(Vue.config, 'lang', {
    enumerable: true,
    configurable: true,
    get: makeComputedGetter(() => { return langVM.lang }, langVM),
    set: bind(val => { langVM.lang = val }, langVM)
  })
}
