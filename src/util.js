/* @flow */

import { Vue } from './install'

/**
 * utilites
 */

export function isNil (val: mixed): boolean {
  return val === null || val === undefined
}

export function parseArgs (...args: any): Object {
  let locale = null
  if (args.length === 1) {
    if (Vue.util.isObject(args[0]) || Array.isArray(args[0])) {
      args = args[0]
    } else if (typeof args[0] === 'string') {
      locale = args[0]
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0]
    }
    if (Vue.util.isObject(args[1]) || Array.isArray(args[1])) {
      args = args[1]
    }
  }

  return { locale, params: args }
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

export function fetchChoice (message: any, choice: number): ?string {
  if (!message && typeof message !== 'string') { return null }
  const choices: Array<string> = message.split('|')

  choice = getChoiceIndex(choice, choices.length)
  if (!choices[choice]) { return message }
  return choices[choice].trim()
}
