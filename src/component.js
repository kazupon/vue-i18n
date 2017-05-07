/* @flow */

import { warn } from './util'

export default {
  name: 'i18n',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    path: {
      type: String,
      required: true
    },
    locale: {
      type: String
    }
  },
  render (h: Function, { props, data, children, parent }: Object) {
    const i18n = parent.$i18n
    if (!i18n) {
      if (process.env.NODE_ENV !== 'production') {
        warn('Cannot find VueI18n instance!')
      }
      return children
    }

    const path: Path = props.path
    const locale: ?Locale = props.locale

    const params: Array<any> = []
    locale && params.push(locale)
    children.forEach(child => params.push(child))

    return h(props.tag, data, i18n.i(path, ...params))
  }
}
