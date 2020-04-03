import messages from './fixture/index'

describe('=== #2 Fallback Locale as array for cascading fallbacks ...', () => {
  describe('... none', () => {
    let i18n
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: false,
        messages,
        modifiers: {
          custom: str => str.replace(/[aeiou]/g, 'x')
        }
      })
    })

    describe('English', () => {
      const locale = 'en'
      const expected = ['en']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('English (Great Britain)', () => {
      var locale = 'en-GB'
      var expected = ['en-GB', 'en']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German', () => {
      var locale = 'de'
      var expected = ['de']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German (Switzerland)', () => {
      var locale = 'de-CH'
      var expected = ['de-CH', 'de']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })
  })

  describe('... simple', () => {
    let i18n
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages,
        modifiers: {
          custom: str => str.replace(/[aeiou]/g, 'x')
        }
      })
    })

    describe('English', () => {
      var locale = 'en'
      var expected = ['en']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('English (Great Britain)', () => {
      var locale = 'en-GB'
      var expected = ['en-GB', 'en']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German', () => {
      var locale = 'de'
      var expected = ['de', 'en']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German (Switzerland)', () => {
      var locale = 'de-CH'
      var expected = ['de-CH', 'de', 'en']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })
  })

  describe('... array', () => {
    let i18n
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: ['en', 'ja'],
        messages,
        modifiers: {
          custom: str => str.replace(/[aeiou]/g, 'x')
        }
      })
    })

    describe('English', () => {
      var locale = 'en'
      var expected = ['en', 'ja']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('English (Great Britain)', () => {
      var locale = 'en-GB'
      var expected = ['en-GB', 'en', 'ja']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German', () => {
      var locale = 'de'
      var expected = ['de', 'en', 'ja']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German (Switzerland)', () => {
      var locale = 'de-CH'
      var expected = ['de-CH', 'de', 'en', 'ja']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('Japanese', () => {
      var locale = 'ja'
      var expected = ['ja', 'en']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })
  })

  describe('... complex', () => {
    let i18n
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: {
          'de-CH': ['fr', 'it'],
          'zh-Hant': ['zh-Hans'],
          'es-CL': ['es-AR'],
          'es': ['en-GB'],
          'pt': ['es-AR'],
          'default': ['en', 'da']
        },
        messages,
        modifiers: {
          custom: str => str.replace(/[aeiou]/g, 'x')
        }
      })
    })

    describe('German (Switzerland)', () => {
      var locale = 'de-CH'
      var expected = ['de-CH', 'fr', 'it', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German (Switzerland) EXACT', () => {
      var locale = 'de-CH!'
      var expected = ['de-CH', 'fr', 'it', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('German', () => {
      var locale = 'de'
      var expected = ['de', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('Traditional Chinese', () => {
      var locale = 'zh-Hant'
      var expected = ['zh-Hant', 'zh-Hans', 'zh', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('Spanish (Spain)', () => {
      var locale = 'es-SP'
      var expected = ['es-SP', 'es', 'en-GB', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('Spanish (Spain) EXACT', () => {
      var locale = 'es-SP!'
      var expected = ['es-SP', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('French', () => {
      var locale = 'fr'
      var expected = ['fr', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('Portuguese (Brazil)', () => {
      var locale = 'pt-BR'
      var expected = ['pt-BR', 'pt', 'es-AR', 'es', 'en-GB', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })

    describe('Spanish (Chile)', () => {
      var locale = 'es-CL'
      var expected = ['es-CL', 'es-AR', 'es', 'en-GB', 'en', 'da']
      it(locale + ' should fallback to ' + expected, () => {
        assert.deepEqual(i18n.getLocaleChain(locale), expected)
      })
    })
  })
})
