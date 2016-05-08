import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'


describe('component locales', () => {
  before((done) => {
    Object.keys(locales).forEach((lang) => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'
    Vue.nextTick(done)
  })

  let vm
  beforeEach((done) => {
    vm = new Vue({
      el: document.createElement('div'),
      template: '<div><component1></component1></div>',
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
    })
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
