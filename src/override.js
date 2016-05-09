export default function (Vue, langVM) {
  // override _init
  const init = Vue.prototype._init
  Vue.prototype._init = function (options) {
    options = options || {}
    const root = options._parent || options.parent || this
    const lang = root.$lang

    if (lang) {
      this.$lang = lang
    } else {
      this.$lang = langVM
    }

    this._langUnwatch = this.$lang.$watch('lang', (a, b) => {
      update(this)
    })

    init.call(this, options)
  }

  // override _destroy
  const destroy = Vue.prototype._destroy
  Vue.prototype._destroy = function () {
    if (this._langUnwatch) {
      this._langUnwatch()
      this._langUnwatch = null
    }

    this.$lang = null
    destroy.apply(this, arguments)
  }
}

function update (vm) {
  let i = vm._watchers.length
  while (i--) {
    vm._watchers[i].update(true) // shallow updates
  }
}
