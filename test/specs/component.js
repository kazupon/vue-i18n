import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'
import compare from '../../src/compare'


describe('component locales', () => {
  before(done => {
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'
    Vue.nextTick(done)
  })

  let vm
  beforeEach(done => {
    const options = {
      el: document.createElement('div'),
      components: {
        component1: {
          locales: {
            en: {
              foo: {
                bar: {
                  buz: 'hello world'
                }
              }
            }
          }
        }
      }
    }

    if (compare(Vue.version, '2.0.0-alpha') < 0) {
      options.template = '<div><component1></component1></div>'
    } else {
      options.render = function () {
        return this.$createElement('div', {}, [
          this.$createElement('component1', {})
        ])
      }
    }

    vm = new Vue(options)
    vm.$nextTick(done)
  })

  describe('local', () => {
    it('should be translated', () => {
      const comp1 = vm.$children[0] // component1
      assert(comp1.$t('foo.bar.buz') === 'hello world')
    })
  })

  describe('global', () => {
    it('should be translated', () => {
      const comp1 = vm.$children[0] // component1
      assert(comp1.$t('message.hello') === 'the world')
    })
  })
})
