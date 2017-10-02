/* @flow */

import { warn, isPlainObject, looseEqual } from './util'

export function bind (el: any, binding: Object, vnode: any): void {
  if (!assert(el, vnode)) { return }

  t(el, binding, vnode)
}

export function update (el: any, binding: Object, vnode: any, oldVNode: any): void {
  if (!assert(el, vnode)) { return }

  if (localeEqual(el, vnode) && looseEqual(binding.value, binding.oldValue)) { return }

  t(el, binding, vnode)
}

function assert (el: any, vnode: any): boolean {
  const vm: any = vnode.context
  if (!vm) {
    warn('not exist Vue instance in VNode context')
    return false
  }

  if (!vm.$i18n) {
    warn('not exist VueI18n instance in Vue instance')
    return false
  }

  return true
}

function localeEqual (el: any, vnode: any): boolean {
  const vm: any = vnode.context
  return el._locale === vm.$i18n.locale
}

function t (el: any, binding: Object, vnode: any): void {
  const value: any = binding.value

  const { path, locale, args } = parseValue(value)
  if (!path && !locale && !args) {
    warn('not support value type')
    return
  }

  if (!path) {
    warn('required `path` in v-t directive')
    return
  }

  const vm: any = vnode.context
  el._vt = el.textContent = vm.$i18n.t(path, ...makeParams(locale, args))
  el._locale = vm.$i18n.locale
}

function parseValue (value: any): Object {
  let path: ?string
  let locale: ?Locale
  let args: any

  if (typeof value === 'string') {
    path = value
  } else if (isPlainObject(value)) {
    path = value.path
    locale = value.locale
    args = value.args
  }

  return { path, locale, args }
}

function makeParams (locale: Locale, args: any): Array<any> {
  const params: Array<any> = []

  locale && params.push(locale)
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args)
  }

  return params
}
