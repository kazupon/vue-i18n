/**
 *  Path paerser
 *  - Inspired:  
 *    Vue.js Path parser
 */

import { empty } from './util'


// export default for holding the Vue reference
const exports = {}
export default exports

// cache
let pathCache = Object.create(null)

// actions
const APPEND = 0
const PUSH = 1
const INC_SUB_PATH_DEPTH = 2
const PUSH_SUB_PATH = 3

// states
const BEFORE_PATH = 0
const IN_PATH = 1
const BEFORE_IDENT = 2
const IN_IDENT = 3
const IN_SUB_PATH = 4
const IN_SINGLE_QUOTE = 5
const IN_DOUBLE_QUOTE = 6
const AFTER_PATH = 7
const ERROR = 8

let pathStateMachine = []

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
}

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
}

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND]
}

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
}

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
}

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
}

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
}

/**
 * Determine the type of a character in a keypath.
 *
 * @param {Char} ch
 * @return {String} type
 */

function getPathCharType (ch) {
  if (ch === undefined) { return 'eof' }

  let code = ch.charCodeAt(0)

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30: // 0
      return ch

    case 0x5F: // _
    case 0x24: // $
      return 'ident'

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0:  // No-break space
    case 0xFEFF:  // Byte Order Mark
    case 0x2028:  // Line Separator
    case 0x2029:  // Paragraph Separator
      return 'ws'
  }

  // a-z, A-Z
  if ((code >= 0x61 && code <= 0x7A) || (code >= 0x41 && code <= 0x5A)) {
    return 'ident'
  }

  // 1-9
  if (code >= 0x31 && code <= 0x39) { return 'number' }

  return 'else'
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 *
 * @param {String} path
 * @return {String}
 */

function formatSubPath (path) {
  const { isLiteral, stripQuotes } = exports.Vue.util

  let trimmed = path.trim()
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) { return false }

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed
}

/**
 * Parse a string path into an array of segments
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parse (path) {
  let keys = []
  let index = -1
  let mode = BEFORE_PATH
  let subPathDepth = 0
  let c, newChar, key, type, transition, action, typeMap

  let actions = []

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key)
      key = undefined
    }
  }

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar
    } else {
      key += newChar
    }
  }

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]()
    subPathDepth++
  }

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--
      mode = IN_SUB_PATH
      actions[APPEND]()
    } else {
      subPathDepth = 0
      key = formatSubPath(key)
      if (key === false) {
        return false
      } else {
        actions[PUSH]()
      }
    }
  }

  function maybeUnescapeQuote () {
    let nextChar = path[index + 1]
    if ((mode === IN_SINGLE_QUOTE && nextChar === "'")
      || (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
      index++
      newChar = '\\' + nextChar
      actions[APPEND]()
      return true
    }
  }

  while (mode != null) {
    index++
    c = path[index]

    if (c === '\\' && maybeUnescapeQuote()) {
      continue
    }

    type = getPathCharType(c)
    typeMap = pathStateMachine[mode]
    transition = typeMap[type] || typeMap['else'] || ERROR

    if (transition === ERROR) {
      return // parse error
    }

    mode = transition[0]
    action = actions[transition[1]]
    if (action) {
      newChar = transition[2]
      newChar = newChar === undefined
        ? c
        : newChar
      if (action() === false) {
        return
      }
    }

    if (mode === AFTER_PATH) {
      keys.raw = path
      return keys
    }
  }
}

/**
 * External parse that check for a cache hit first
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parsePath (path) {
  let hit = pathCache[path]
  if (!hit) {
    hit = parse(path)
    if (hit) {
      pathCache[path] = hit
    }
  }
  return hit
}

/**
 * Get value from path string
 *
 * @param {Object} obj
 * @param {String} path
 * @return value
 */

export function getValue (obj, path) {
  const { isObject } = exports.Vue.util

  if (!isObject(obj)) { return null }

  let paths = parsePath(path)
  if (empty(paths)) { return null }

  let ret = null
  let last = obj
  let length = paths.length
  let i = 0
  while (i < length) {
    let value = last[paths[i]]
    if (value === undefined) {
      last = null
      break
    }
    last = value
    i++
  }
  
  ret = last
  return ret
}
