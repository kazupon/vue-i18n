/*
import locales from './fixture/locales'

describe('hot reloading', () => {
  let el
  let orgLocale
  const expectLocale = 'the world updated'
  beforeEach(done => {
    orgLocale = locales.en.message.hello
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'

    el = document.createElement('div')
    document.body.appendChild(el)

    Vue.nextTick(done)
  })

  afterEach(done => {
    locales.en.message.hello = orgLocale
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.nextTick(done)
  })

  it('should be reload', done => {
    const options = {
      el,
      data () { return { lang: 'en' } }
    }
    options.render = function (h) {
      return h('p', {}, [this.$t('message.hello', this.lang)])
    }

    const vm = new Vue(options)
    waitForUpdate(() => {
      assert.equal(vm.$el.textContent, locales.en.message.hello)
      // Update translation
      locales.en.message.hello = expectLocale
      Object.keys(locales).forEach(lang => {
        Vue.locale(lang, locales[lang])
      })
    }).then(() => {
      assert.equal(vm.$el.textContent, expectLocale)
    }).then(done)
  })
})
*/
