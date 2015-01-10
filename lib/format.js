/**
 *  String format template
 *  - Inspired:  
 *    https://github.com/Matt-Esch/string-template/index.js
 */

/**
 * Import(s)
 */

var slice = Array.prototype.slice


/**
 * Constant(s)
 */

var RE_NARGS = /\{([0-9a-zA-Z]+)\}/g


/**
 * Export(s)
 */

module.exports = template 


/**
 * template
 *  
 * @param {String} string
 * @return {String}
 */

function template (string) {
  var args

  if (arguments.length === 2 && typeof arguments[1] === 'object') {
    args = arguments[1]
  } else {
    args = slice.call(arguments, 1)
  }

  if (!args || !args.hasOwnProperty) {
    args = {}
  }

  return string.replace(RE_NARGS, function (match, i, index) {
    var result

    if (string[index - 1] === '{' &&
      string[index + match.length] === '}') {
      return i
    } else {
      result = args.hasOwnProperty(i) ? args[i] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}
