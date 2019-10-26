import messages from './fixture/index'

describe('prefix', () => {
  let i18n
  const defaultTranslated = '✅'
  const defaultUntranslated = '🔥'
  const translated = 'translated'
  const untranslated = 'untranslated'
  describe('Object constructor active', () => {
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages,
        prefix: {
          active: true,
          translated,
          untranslated
        }
      })
    })
    describe('i18n#t', () => {
      it(`should set an ${translated} in translated word`, () => {
        assert.strictEqual(i18n.t('message.hello'), `${translated} ${messages.en.message.hello}`)
      })

      it(`should set an ${untranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.t('message.noTranslationFound'), `${untranslated} message.noTranslationFound`)
      })
    })
    describe('i18n#tc', () => {
      it(`should set an ${translated} in translated word`, () => {
        assert.strictEqual(i18n.tc('message.hello'), `${translated} ${messages.en.message.hello}`)
      })
      it(`should set an ${untranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.tc('message.noTranslationFound'), `${untranslated} message.noTranslationFound`)
      })
    })
  })

  describe('Object constructor disabled', () => {
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages,
        prefix: {
          active: false,
          translated,
          untranslated
        }
      })
    })
    describe('i18n#t', () => {
      it(`should NOT set an ${translated} in translated word`, () => {
        assert.strictEqual(i18n.t('message.hello'), `${messages.en.message.hello}`)
      })

      it(`should NOT set an ${untranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.t('message.noTranslationFound'), `message.noTranslationFound`)
      })
    })
    describe('i18n#tc', () => {
      it(`should NOT set an ${translated} in translated word`, () => {
        assert.strictEqual(i18n.tc('message.hello'), `${messages.en.message.hello}`)
      })
      it(`should NOT set an ${untranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.tc('message.noTranslationFound'), `message.noTranslationFound`)
      })
    })
  })

  describe('Boolean constructor active', () => {
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages,
        prefix: true
      })
    })

    describe('i18n#t', () => {
      it(`should set an ${defaultTranslated} in translated word`, () => {
        assert.strictEqual(i18n.t('message.hello'), `${defaultTranslated} ${messages.en.message.hello}`)
      })
      it(`should set an ${defaultUntranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.t('message.noTranslationFound'), `${defaultUntranslated} message.noTranslationFound`)
      })
    })
    describe('i18n#tc', () => {
      it(`should set an ${defaultTranslated} in translated word`, () => {
        assert.strictEqual(i18n.tc('message.hello'), `${defaultTranslated} ${messages.en.message.hello}`)
      })
      it(`should set an ${defaultUntranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.tc('message.noTranslationFound'), `${defaultUntranslated} message.noTranslationFound`)
      })
    })
  })

  describe('Boolean constructor disabled', () => {
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages,
        prefix: false
      })
    })

    describe('i18n#t', () => {
      it(`should NOT set an ${defaultTranslated} in translated word`, () => {
        assert.strictEqual(i18n.t('message.hello'), `${messages.en.message.hello}`)
      })
      it(`should NOT set an ${defaultUntranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.t('message.noTranslationFound'), `message.noTranslationFound`)
      })
    })
    describe('i18n#tc', () => {
      it(`should NOT set an ${defaultTranslated} in translated word`, () => {
        assert.strictEqual(i18n.tc('message.hello'), `${messages.en.message.hello}`)
      })
      it(`should NOT set an ${defaultUntranslated} in a not translated word`, () => {
        assert.strictEqual(i18n.tc('message.noTranslationFound'), `message.noTranslationFound`)
      })
    })
  })

  describe('Missing handler and prefix', () => {
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages,
        prefix: true,
        missing: (locale, key, vm) => {
          return 'fixed text'
        }
      })
    })

    describe('i18n#t', () => {
      it(`should set an ${defaultUntranslated} static missing word`, () => {
        assert.strictEqual(i18n.t('message.noTranslationFound'), `${defaultUntranslated} fixed text`)
      })
    })
  })
})