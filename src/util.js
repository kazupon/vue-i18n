/* @flow */

/**
 * utilites
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

export function isObject (obj: mixed): boolean {
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

function getOldChoiceIndexFixed (choice: number): number {
  return choice
    ? choice > 1
      ? 1
      : 0
    : 1
}

function getChoiceIndex (choice: number, choicesLength: number): number {
  choice = Math.abs(choice)

  if (choicesLength === 2) { return getOldChoiceIndexFixed(choice) }

  return choice ? Math.min(choice, 2) : 0
}

export function fetchChoice (message: string, choice: number): ?string {
  /* istanbul ignore if */
  if (!message && typeof message !== 'string') { return null }
  const choices: Array<string> = message.split('|')

  choice = getChoiceIndex(choice, choices.length)
  if (!choices[choice]) { return message }
  return choices[choice].trim()
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

export const canUseDateTimeFormat: boolean =
  typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined'

export const canUseNumberFormat: boolean =
  typeof Intl !== 'undefined' && typeof Intl.NumberFormat !== 'undefined'
