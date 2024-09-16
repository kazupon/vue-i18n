describe('postTranslation option', () => {
  let i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      postTranslation: str => str.trim(),
      messages: {
        en: {
          hello: ' hello world! ',
          apple: ' no apples | one apple | {count} apples '
        }
      }
    })
  })

  describe('t', () => {
    it('should be hooked', () => {
      assert.strictEqual(i18n.t('hello'), 'hello world!')
    })
  })

  describe('$t', () => {
    it('should be hooked', () => {
      const vm = new Vue({ i18n })
      assert.strictEqual(vm.$t('hello'), 'hello world!')
    })
  })

  describe('tc', () => {
    it('should be hooked', () => {
      assert.strictEqual(i18n.tc('apple', 0), 'no apples')
    })
  })

  describe('$tc', () => {
    it('should be hooked', () => {
      const vm = new Vue({ i18n })
      assert.strictEqual(vm.$tc('apple', 0), 'no apples')
    })
  })

  describe('postTranslation option', () => {
    describe('default', () => {
      it('should be undefined', () => {
        i18n = new VueI18n({ locale: 'en' })
        assert.strictEqual(i18n.postTranslation, null)
      })
    })

    describe('set hook', () => {
      it('should be hooked', () => {
        i18n = new VueI18n({
          locale: 'en',
          messages: {
            en: {
              hello: ' hello world! '
            }
          }
        })
        const vm = new Vue({ i18n })
        assert.strictEqual(vm.$t('hello'), ' hello world! ')
        // set!
        i18n.postTranslation = str => str.trim()
        assert.strictEqual(vm.$t('hello'), 'hello world!')
      })
    })
  })
})
