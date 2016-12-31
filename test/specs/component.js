import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'


describe('component locales', () => {
  const version = Number(Vue.version.split('.')[0])

  before(done => {
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'
    Vue.nextTick(done)
  })

  let vm
  beforeEach(done => {
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
    if (version >= 2) {
      compOptions.render = function (h) {
        return h('p', {}, [this.$t('foo.bar.buz')])
      }
    } else {
      compOptions.template = '<p>{{* $t("foo.bar.buz") }}</p>'
    }

    const options = {
      el,
      components: { component1: compOptions }
    }

    if (version >= 2) {
      options.render = function (h) {
        return h('div', {}, [h('component1', {})])
      }
    } else {
      options.template = '<div><component1></component1></div>'
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
