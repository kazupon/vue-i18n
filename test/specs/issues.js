import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'


describe('issues', () => {
  let vm

  describe('#24', () => {
    beforeEach(() => {
      vm = new Vue()
    })

    it('should be translated', () => {
      assert(vm.$t('continue-with-new-account') === locales[Vue.config.lang]['continue-with-new-account'])
    })
  })
})
