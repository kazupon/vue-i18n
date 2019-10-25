import messages from './fixture/index'

describe('icons', () => {
  let i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages,
      icons: true,
      modifiers: {
        custom: str => str.replace(/[aeiou]/g, 'x')
      }
    })
    i18n.locale = 'icon'
  })

  describe('i18n#t', () => {
    describe('icon locale', () => {
      it('should set an ✅ in translated word', () => {
        assert.strictEqual(i18n.t('message.hello'), `✅ ${messages.en.message.hello}`)
      })
    })
  })

  describe('i18n#t', () => {
    describe('icon locale', () => {
      it('should set an 🔥 in a not translated word', () => {
        assert.strictEqual(i18n.t('message.noTranslationFound'), `🔥 message.noTranslationFound`)
      })
    })
  })
})