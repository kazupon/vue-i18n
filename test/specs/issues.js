import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'


describe('issues', () => {
  let vm
  beforeEach(() => {
    vm = new Vue()
  })


  describe('#24', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('continue-with-new-account'),
        locales[Vue.config.lang]['continue-with-new-account']
      )
    })
  })

  describe('#35', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('underscore', { hello_msg: 'hello' }),
        'hello world'
      )
    })
  })

  describe('#42, #43', () => {
    it('should not be occured error', () => {
      assert.equal(
        vm.$t('message[\'hello\']'),
        locales[Vue.config.lang]['message']['hello']
      )
    })
  })

  describe('#51', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('message.hyphen-locale'),
        'hello hyphen'
      )
    })
  })

  describe('#91, #51', () => {
    it('should be translated', () => {
      const arrayLocales = locales[Vue.config.lang].issues.array_bugs
      for (let i = 0; i < arrayLocales.length; i++) {
        const item = vm.$t('issues.array_bugs')[i]
        assert.equal(item, arrayLocales[i])
      }
    })
  })
})
