import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'

describe('hot reloading', () => {
  const version = Number(Vue.version.split('.')[0])

  let el
  let orgLocale
  const expectLocale = 'the world updated'
  before(done => {
    orgLocale = locales.en.message.hello
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'
    Vue.nextTick(done)
  })

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  after(done => {
    locales.en.message.hello = orgLocale
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
  })

  it('should be reload', done => {
    const options = {
      el,
      data () { return { lang: 'en' } }
    }

    if (version >= 2) {
      options.render = function (h) {
        return h('p', {}, [this.$t('message.hello', this.lang)])
      }
    } else {
      options.template = '<p>{{ $t("message.hello", lang) }}</p>'
    }

    const vm = new Vue(options)

    Vue.nextTick(() => {
      assert.equal(vm.$el.textContent, locales.en.message.hello)

      // Update translation
      locales.en.message.hello = expectLocale
      Object.keys(locales).forEach(lang => {
        Vue.locale(lang, locales[lang])
      })

      Vue.nextTick(() => {
        assert.equal(vm.$el.textContent, expectLocale)
        done()
      })
    })
  })
})
