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
    },
    places: {
      type: [Array, Object]
    }
  },
  render (h: Function, { props, data, children, parent }: Object) {
    const i18n = parent.$i18n

    children = (children || []).filter(child => {
      return child.tag || (child.text = child.text.trim())
    })

    if (!i18n) {
      if (process.env.NODE_ENV !== 'production') {
        warn('Cannot find VueI18n instance!')
      }
      return children
    }

    const path: Path = props.path
    const locale: ?Locale = props.locale

    const params: Object = {}
    const places: Array<any> | Object = props.places || {}

    const hasPlaces: boolean = Array.isArray(places)
      ? places.length > 0
      : Object.keys(places).length > 0

    const everyPlace: boolean = children.every(child => {
      if (child.data && child.data.attrs) {
        const place = child.data.attrs.place
        return (typeof place !== 'undefined') && place !== ''
      }
    })

    if (hasPlaces && children.length > 0 && !everyPlace) {
      warn('If places prop is set, all child elements must have place prop set.')
    }

    if (Array.isArray(places)) {
      places.forEach((el, i) => {
        params[i] = el
      })
    } else {
      Object.keys(places).forEach(key => {
        params[key] = places[key]
      })
    }

    children.forEach((child, i: number) => {
      const key: string = everyPlace
        ? `${child.data.attrs.place}`
        : `${i}`
      params[key] = child
    })

    return h(props.tag, data, i18n.i(path, locale, params))
  }
}
