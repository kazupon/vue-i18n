/* @flow */

import { isNull, hasOwn } from './util'

export default class BaseFormatter {
  _options: FormatterOptions

  constructor (options: FormatterOptions = {}) {
    this._options = options
  }

  get options (): FormatterOptions { return this._options }

  format (message: string, ...values: any): string {
    return template(message, ...values)
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
 * @param {Array} ...values
 * @return {String}
 */

export function template (str: string, ...values: any): string {
  if (values.length === 1 && typeof values[0] === 'object') {
    values = values[0]
  } else {
    values = {}
  }

  if (!values || !values.hasOwnProperty) {
    values = {}
  }

  return str.replace(RE_NARGS, (match, prefix, i, index) => {
    let result: string

    if (str[index - 1] === '{' &&
      str[index + match.length] === '}') {
      return i
    } else {
      result = hasOwn(values, i) ? values[i] : match
      if (isNull(result)) {
        return ''
      }

      return result
    }
  })
}
