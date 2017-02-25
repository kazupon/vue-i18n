/* @flow */

import { isNull } from './util'
import { Vue } from './install'

export default class BaseFormatter {
  _options: FormatterOptions

  constructor (options: FormatterOptions = {}) {
    this._options = options
  }

  get options (): FormatterOptions { return this._options }
  set options (options: FormatterOptions): void { this._options = options }

  format (message: string, ...args: any): any {
    return template(message, ...args)
  }
}

/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

const RE_NARGS: RegExp = /(%|)\{([0-9a-zA-Z_]+)\}/g

/**
 * template
 *
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */

export function template (str: string, ...args: any): string {
  if (args.length === 1 && typeof args[0] === 'object') {
    args = args[0]
  } else {
    args = {}
  }

  if (!args || !args.hasOwnProperty) {
    args = {}
  }

  return str.replace(RE_NARGS, (match, prefix, i, index) => {
    let result: string

    if (str[index - 1] === '{' &&
      str[index + match.length] === '}') {
      return i
    } else {
      result = Vue.util.hasOwn(args, i) ? args[i] : match
      if (isNull(result)) {
        return ''
      }

      return result
    }
  })
}
