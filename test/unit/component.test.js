/*
import locales from './fixture/locales'

describe('component locales', () => {
  let vm
  beforeEach(done => {
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'

    const el = document.createElement('div')
    const compOptions = {
      locales: {
        en: {
          foo: {
            bar: {
              buz: 'hello world'
            }
          },
          fallback: 'this is fallback on component'
        },
        ja: {
        }
      }
    }
    compOptions.render = function (h) {
      return h('p', {}, [this.$t('foo.bar.buz')])
    }

    const options = {
      el,
      components: { component1: compOptions }
    }

    options.render = function (h) {
      return h('div', {}, [h('component1', {})])
    }

    vm = new Vue(options)
    vm.$nextTick(done)
  })

  describe('local', () => {
    it('should be translated', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$t('foo.bar.buz'), 'hello world')
      assert.equal(comp1.$el.innerText, 'hello world')
    })
  })

  describe('global', () => {
    it('should be translated', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$t('message.hello'), 'the world')
    })
  })

  describe('fallback', () => {
    it('should be work', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$t('fallback', 'ja'), 'this is fallback on component')
    })
  })

  describe('$lang', () => {
    it('should be work', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$lang, 'en')
    })
  })
})
*/
