/* @flow */

import { warn } from './util'

export default {
  name: 'i18n',
  functional: true,
  props: {
    path: {
      type: String,
      required: true
    },
    locale: {
      type: String
    }
  },
  render (h: Function, { props, children, parent }: Object) {
    const i18n = parent.$i18n
    if (!i18n) {
      warn('Cannot find VueI18n instance!')
      return children
    }

    const path: Path = props.path
    const locale: ?Locale = props.locale

    const params: Array<any> = []
    locale && params.push(locale)
    children.forEach(child => params.push(child))

    return i18n.i(path, ...params)
  }
}
