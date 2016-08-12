/**
 * Utilties
 */

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

let Watcher
/**
 * getWatcher
 *
 * @param {Vue} vm
 * @return {Watcher}
 */

export function getWatcher (vm) {
  if (!Watcher) {
    const unwatch = vm.$watch('__watcher__', a => {})
    Watcher = vm._watchers[0].constructor
    unwatch()
  }
  return Watcher
}

let Dep
/**
 * getDep
 *
 * @param {Vue} vm
 * @return {Dep}
 */

export function getDep (vm) {
  if (!Dep) {
    Dep = vm._data.__ob__.dep.constructor
  }
  return Dep
}
