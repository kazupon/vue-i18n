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
 * empty
 *
 * @param {Array|Object} target
 * @return {Boolean}
 */

export function empty (target) {
  if (target === null || target === undefined) { return true }

  if (Array.isArray(target)) {
    if (target.length > 0) { return false }
    if (target.length === 0) { return true }
  } else if (exports.Vue.util.isPlainObject(target)) {
    for (let key in target) {
      if (exports.Vue.util.hasOwn(target, key)) { return false }
    }
  }

  return true
}

/**
 * each
 *
 * @param {Array|Object} target
 * @param {Function} iterator
 * @param {Object} [context]
 */

export function each (target, iterator, context) {
  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      iterator.call(context || target[i], target[i], i)
    }
  } else if (exports.Vue.util.isPlainObject(target)) {
    const hasOwn = exports.Vue.util.hasOwn
    for (let key in target) {
      if (hasOwn(target, key)) {
        iterator.call(context || target[key], target[key], key)
      }
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

/**
 * Forgiving check for a promise
 *
 * @param {Object} p
 * @return {Boolean}
 */

export function isPromise (p) {
  return p && typeof p.then === 'function'
}
