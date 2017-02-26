/**
 * utilites
 */

/**
 * isNil
 *
 * @param {*} val
 * @return Boolean
 */
export function isNil (val) {
  return val === null || val === undefined
}

/**
 * bind
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return Function
 */
export function bind (fn, ctx) {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length
  return boundFn
}

/**
 * isObject
 *
 * @param {*} obj
 * @return Boolean
 */
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}


const toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'

/**
 * isPlainObject
 *
 * @param {*} obj
 * @return Boolean
 */
export function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}


const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * hasOwn
 *
 * @param {*} obj
 * @param {String} key
 * @return Boolean
 */
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
