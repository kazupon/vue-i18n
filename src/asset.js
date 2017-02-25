export default function (Vue) {
  const strats = Vue.config.optionMergeStrategies
  if (strats) {
    strats.i18n = (parent, child) => {
      const ret = Object.create(null)
      if (!child) { return parent }
      if (!parent) { return child }
      if (!child & !parent) {
        // TODO: should be warn
        return ret
      }
      Vue.util.extend(ret, parent)
      for (const key in child) {
        ret[key] = child[key]
      }
      return ret
    }
  }
}
