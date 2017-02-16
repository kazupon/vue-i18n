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
        vm.$t('underscore', { helloMsg: 'hello' }),
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
      const arrayLocales = locales[Vue.config.lang].issues.arrayBugs
      for (let i = 0; i < arrayLocales.length; i++) {
        const item = vm.$t('issues.arrayBugs')[i]
        assert.equal(item, arrayLocales[i])
      }
    })
  })

  describe('#97', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('message.1234'),
        locales[Vue.config.lang]['message']['1234']
      )
      assert.equal(
        vm.$t('message.1mixedKey'),
        locales[Vue.config.lang]['message']['1mixedKey']
      )
    })
  })
})
