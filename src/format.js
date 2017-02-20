/* @flow */

import { isNil } from './util'

/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

const RE_NARGS: RegExp = /(%|)\{([0-9a-zA-Z_]+)\}/g


export default function (Vue: any): Function {
  const { hasOwn } = Vue.util

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template (str: string, ...args: any): string {
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
        result = hasOwn(args, i) ? args[i] : match
        if (isNil(result)) {
          return ''
        }

        return result
      }
    })
  }

  return template
}
