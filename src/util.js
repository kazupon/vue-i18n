/* @flow */

import { Vue } from './install'

/**
 * utilites
 */

export function warn (msg: string, err: ?Error): void {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg)
    if (err) {
      console.warn(err.stack)
    }
  }
}

export function isNull (val: mixed): boolean {
  return val === null || val === undefined
}

export function parseArgs (...args: Array<mixed>): Object {
  let locale: ?string = null
  let params: mixed = null
  if (args.length === 1) {
    if (Vue.util.isObject(args[0]) || Array.isArray(args[0])) {
      params = args[0]
    } else if (typeof args[0] === 'string') {
      locale = args[0]
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0]
    }
    if (Vue.util.isObject(args[1]) || Array.isArray(args[1])) {
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
  if (!message && typeof message !== 'string') { return null }
  const choices: Array<string> = message.split('|')

  choice = getChoiceIndex(choice, choices.length)
  if (!choices[choice]) { return message }
  return choices[choice].trim()
}
