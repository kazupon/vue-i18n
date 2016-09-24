import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'

describe('custom formatter', () => {
  before(done => {
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'
    Vue.nextTick(done)
  })

  after(done => {
    Vue.config.i18nFormatter = null
    Vue.nextTick(done)
  })

  describe('global', () => {
    it('allows for specifying a custom formatter', done => {
      Vue.config.i18nFormatter = (string, ...args) => {
        assert.equal('the world', string)
        assert.equal(1, args[0])
        assert.equal('two', args[1])
        assert.deepEqual({ name: 'joe' }, args[2])
        done()
      }

      Vue.t('message.hello', 1, 'two', { name: 'joe' })
    })
  })

  describe('instance', () => {
    it('allows for specifying a custom formatter', done => {
      const vm = new Vue()
      Vue.config.i18nFormatter = (string, ...args) => {
        assert.equal('the world', string)
        assert.equal(1, args[0])
        assert.equal(2, args[1])
        assert.equal(3, args[2])
        done()
      }

      vm.$t('message.hello', [1, 2, 3])
    })
  })
})
