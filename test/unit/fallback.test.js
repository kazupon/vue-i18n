import messages from './fixture/index'

describe('kazupon#138 mmokross#2 - Fallback Locale as array for cascading fallbacks ...', () => {
  var types = [
    {
      description: '... none',
      fallbackLocale: false,
      tests: [
        { description: 'English', locale: 'en', expected: ['en'] },
        { description: 'English (Great Britain)', locale: 'en-GB', expected: ['en-GB', 'en'] },
        { description: 'German', locale: 'de', expected: ['de'] },
        { description: 'German (Switzerland)', locale: 'de-CH', expected: ['de-CH', 'de'] }
      ]
    },
    {
      description: '... simple',
      fallbackLocale: 'en',
      tests: [
        { description: 'English', locale: 'en', expected: ['en'] },
        { description: 'English (Great Britain)', locale: 'en-GB', expected: ['en-GB', 'en'] },
        { description: 'German', locale: 'de', expected: ['de', 'en'] },
        { description: 'German (Switzerland)', locale: 'de-CH', expected: ['de-CH', 'de', 'en'] }
      ]
    },
    {
      description: '... array',
      fallbackLocale: ['en', 'ja'],
      tests: [
        { description: 'English', locale: 'en', expected: ['en', 'ja'] },
        { description: 'English (Great Britain)', locale: 'en-GB', expected: ['en-GB', 'en', 'ja'] },
        { description: 'German', locale: 'de', expected: ['de', 'en', 'ja'] },
        { description: 'German (Switzerland)', locale: 'de-CH', expected: ['de-CH', 'de', 'en', 'ja'] },
        { description: 'Japanese', locale: 'ja', expected: ['ja', 'en'] }
      ]
    },
    {
      description: '... complex',
      fallbackLocale: {
        'de-CH': ['fr', 'it'],
        'zh-Hant': ['zh-Hans'],
        'es-CL': ['es-AR'],
        'es': ['en-GB'],
        'pt': ['es-AR'],
        'default': ['en', 'da']
      },
      tests: [
        { description: 'German (Switzerland)', locale: 'de-CH', expected: ['de-CH', 'fr', 'it', 'en', 'da'] },
        { description: 'German (Switzerland) EXACT', locale: 'de-CH!', expected: ['de-CH', 'fr', 'it', 'en', 'da'] },
        { description: 'German', locale: 'de', expected: ['de', 'en', 'da'] },
        { description: 'Traditional Chinese', locale: 'zh-Hant', expected: ['zh-Hant', 'zh-Hans', 'zh', 'en', 'da'] },
        { description: 'Spanish (Spain)', locale: 'es-SP', expected: ['es-SP', 'es', 'en-GB', 'en', 'da'] },
        { description: 'Spanish (Spain) EXACT', locale: 'es-SP!', expected: ['es-SP', 'en', 'da'] },
        { description: 'French', locale: 'fr', expected: ['fr', 'en', 'da'] },
        { description: 'Portuguese (Brazil)', locale: 'pt-BR', expected: ['pt-BR', 'pt', 'es-AR', 'es', 'en-GB', 'en', 'da'] },
        { description: 'Spanish (Chile)', locale: 'es-CL', expected: ['es-CL', 'es-AR', 'es', 'en-GB', 'en', 'da'] }
      ]
    }
  ]
  types.forEach(function (type) {
    describe(type.description, () => {
      let i18n
      beforeEach(() => {
        i18n = new VueI18n({
          locale: 'en',
          fallbackLocale: type.fallbackLocale,
          messages,
          modifiers: {
            custom: str => str.replace(/[aeiou]/g, 'x')
          }
        })
      })
      type.tests.forEach(function (test) {
        it(test.description + ': ' + test.locale + ' should fallback to ' + test.expected, () => {
          // console.log(test.locale + ': --> ' + i18n.getLocaleChain(test.locale))
          assert.deepEqual(i18n.getLocaleChain(test.locale), test.expected)
        })
      })
    })
  })
})
