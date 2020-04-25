/* @flow */

/**
 * constants
 */

export const numberFormatKeys = [
  'style',
  'currency',
  'currencyDisplay',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'localeMatcher',
  'formatMatcher',
  'unit'
]

/**
 * utilities
 */

export function warn (msg: string, err: ?Error): void {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg)
    /* istanbul ignore if */
    if (err) {
      console.warn(err.stack)
    }
  }
}

export function error (msg: string, err: ?Error): void {
  if (typeof console !== 'undefined') {
    console.error('[vue-i18n] ' + msg)
    /* istanbul ignore if */
    if (err) {
      console.error(err.stack)
    }
  }
}

export function isObject (obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}

const toString: Function = Object.prototype.toString
const OBJECT_STRING: string = '[object Object]'
export function isPlainObject (obj: any): boolean {
  return toString.call(obj) === OBJECT_STRING
}

export function isNull (val: mixed): boolean {
  return val === null || val === undefined
}

export function parseArgs (...args: Array<mixed>): Object {
  let locale: ?string = null
  let params: mixed = null
  if (args.length === 1) {
    if (isObject(args[0]) || Array.isArray(args[0])) {
      params = args[0]
    } else if (typeof args[0] === 'string') {
      locale = args[0]
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0]
    }
    /* istanbul ignore if */
    if (isObject(args[1]) || Array.isArray(args[1])) {
      params = args[1]
    }
  }

  return { locale, params }
}

export function looseClone (obj: Object): Object {
  return JSON.parse(JSON.stringify(obj))
}

export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function includes (arr: Array<any>, item: any): boolean {
  return !!~arr.indexOf(item)
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

export function merge (target: Object): Object {
  const output = Object(target)
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i]
    if (source !== undefined && source !== null) {
      let key
      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            output[key] = merge(output[key], source[key])
          } else {
            output[key] = source[key]
          }
        }
      }
    }
  }
  return output
}

export function looseEqual (a: any, b: any): boolean {
  if (a === b) { return true }
  const isObjectA: boolean = isObject(a)
  const isObjectB: boolean = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA: boolean = Array.isArray(a)
      const isArrayB: boolean = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e: any, i: number): boolean => {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        const keysA: Array<string> = Object.keys(a)
        const keysB: Array<string> = Object.keys(b)
        return keysA.length === keysB.length && keysA.every((key: string): boolean => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
