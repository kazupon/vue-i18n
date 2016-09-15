import assert from 'power-assert'
import Vue from 'vue'


describe('missing', () => {
  let lang
  beforeEach(() => {
    lang = Vue.config.lang
    Vue.config.lang = 'en'
  })

  afterEach(done => {
    Vue.config.lang = lang
    Vue.config.missingHandler = null
    Vue.nextTick(done)
  })

  describe('global', () => {
    it('should be handled translate missing', done => {
      Vue.config.missingHandler = (lang, key, vm) => {
        assert.equal('en', lang)
        assert.equal('foo.bar.buz', key)
        assert(vm === null)
        done()
      }

      Vue.t('foo.bar.buz')
    })
  })

  describe('instance', () => {
    it('should be handled translate missing', done => {
      const vm = new Vue()
      Vue.config.missingHandler = (lang, key, instance) => {
        assert.equal('en', lang)
        assert.equal('foo.bar.buz', key)
        assert(vm === instance)
        done()
      }

      vm.$t('foo.bar.buz')
    })
  })
})
