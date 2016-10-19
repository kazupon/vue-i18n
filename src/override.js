export default function (Vue, langVM, version) {
  function update (vm) {
    if (version > 1) {
      vm.$forceUpdate()
    } else {
      let i = vm._watchers.length
      while (i--) {
        vm._watchers[i].update(true) // shallow updates
      }
    }
  }

  // override _init
  const init = Vue.prototype._init
  Vue.prototype._init = function (options) {
    init.call(this, options)

    if (!this.$parent) { // root
      this.$lang = langVM
      this._langUnwatch = this.$lang.$watch('$data', (a, b) => {
        update(this)
      }, {
        deep: true
      })
    }
  }

  // override _destroy
  const destroy = Vue.prototype._destroy
  Vue.prototype._destroy = function () {
    if (!this.$parent && this._langUnwatch) {
      this._langUnwatch()
      this._langUnwatch = null
      this.$lang = null
    }

    destroy.apply(this, arguments)
  }
}
