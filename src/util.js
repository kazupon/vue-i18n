/**
 * Utilties
 */

// export default for holding the Vue reference
const exports = {}
export default exports


/**
 * warn
 *
 * @param {String} msg
 * @param {Error} [err]
 *
 */

export function warn (msg, err) {
  if (window.console) {
    console.warn('[vue-i18n] ' + msg)
    if (err) {
      console.warn(err.stack)
    }
  }
}

/**
 * getWatcher
 *
 * @param {Vue} vm
 * @return {Watcher}
 */

let Watcher
export function getWatcher (vm) {
  if (!Watcher) {
    const unwatch = vm.$watch('__watcher__', (a) => {})
    Watcher = vm._watchers[0].constructor
    unwatch()
  }
  return Watcher
}

/**
 * getDep
 *
 * @param {Vue} vm
 * @return {Dep}
 */

let Dep
export function getDep (vm) {
  if (!Dep) {
    Dep = vm._data.__ob__.dep.constructor
  }
  return Dep
}
