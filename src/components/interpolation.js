/* @flow */

import { warn } from '../util'

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
  render (h: Function, { data, parent, props, slots }: Object) {
    const { $i18n } = parent
    if (!$i18n) {
      if (process.env.NODE_ENV !== 'production') {
        warn('Cannot find VueI18n instance!')
      }
      return
    }
    const params = slots()
    const children = $i18n.i(
      props.path,
      props.locale,
      onlyHasDefaultPlace(params) || props.places
        ? useLegacyPlaces(params.default, props.places)
        : params
    )

    const { tag } = props
    return tag ? h(tag, data, children) : children
  }
}

function onlyHasDefaultPlace (params) {
  var prop
  for (prop in params) if (prop !== 'default') return false
  return Boolean(prop)
}

function useLegacyPlaces (children, places) {
  const params = places ? createParamsFromPlaces(places) : {}
  if (!children) return params
  const everyPlace = children.every(vnodeHasPlaceAttribute)

  if (process.env.NODE_ENV !== 'production' && everyPlace) { warn('`place` attribute is deprecated. Please switch to Vue slots.') }

  return children.reduce(
    everyPlace ? assignChildPlace : assignChildIndex,
    params
  )
}

function createParamsFromPlaces (places) {
  if (process.env.NODE_ENV !== 'production') { warn('`places` prop is deprecated. Please switch to Vue slots.') }
  return Array.isArray(places)
    ? places.reduce(assignChildIndex, {})
    : Object.assign({}, places)
}

function assignChildPlace (params, child) {
  params[child.data.attrs.place] = child
  return params
}

function assignChildIndex (params, child, key) {
  params[key] = child
  return params
}

function vnodeHasPlaceAttribute (vnode) {
  return Boolean(vnode.data && vnode.data.attrs && vnode.data.attrs.place)
}
