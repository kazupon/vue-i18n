import messages from './fixture/index'
import dateTimeFormats from './fixture/datetime'
import numberFormats from './fixture/number'

describe('basic', () => {
  let i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages
    })
  })

  describe('i18n#t', () => {
    describe('en locale', () => {
      it('should translate an english', () => {
        assert.strictEqual(i18n.t('message.hello'), messages.en.message.hello)
      })
    })

    describe('empty string', () => {
      it('should support empty string', () => {
        assert.strictEqual(i18n.t('message.empty'), messages.en.message.empty)
      })
    })

    describe('linked translation', () => {
      it('should translate simple link', () => {
        assert.strictEqual(i18n.t('message.link'), messages.en.message.hello)
      })

      it('should translate link at the end of locale', () => {
        assert.strictEqual(i18n.t('message.linkEnd'), 'This is a linked translation to the world')
      })

      it('should translate link within a locale', () => {
        assert.strictEqual(i18n.t('message.linkWithin'), 'Isn\'t the world we live in great?')
      })

      it('should translate multiple links within a locale', () => {
        assert.strictEqual(i18n.t('message.linkMultiple'), 'Hello hoge!, isn\'t the world great?')
      })

      it('should translate link with braces ', () => {
        assert.strictEqual(i18n.t('message.linkBrackets'), 'Hello hoge. Isn\'t the world great?')
      })

      it('should translate link with lower-case formatting', () => {
        assert.strictEqual(i18n.t('message.linkCaseLower'), 'Please provide home address')
      })

      it('should translate link with upper-case formatting', () => {
        assert.strictEqual(i18n.t('message.linkCaseUpper'), 'HOME ADDRESS')
      })

      it('should translate link without formatting if modifier is not known.', () => {
        assert.strictEqual(i18n.t('message.linkCaseUnknown'), 'Home address')
      })
    })

    describe('ja locale', () => {
      it('should translate a japanese', () => {
        assert.strictEqual(i18n.t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          assert.strictEqual(i18n.t(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          assert.strictEqual(i18n.t(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          assert.strictEqual(i18n.t('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          assert.strictEqual(i18n.t('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          assert.strictEqual(
            i18n.t('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          assert.strictEqual(i18n.t('Hello'), 'Hello')
        })
      })

      describe('object keypath', () => {
        it('should be translated', () => {
          assert.strictEqual(i18n.t('message.format'), messages.en.message.format)
        })
      })

      describe('array keypath', () => {
        describe('basic', () => {
          it('should be translated', () => {
            assert.strictEqual(i18n.t('errors[0]'), messages.en.errors[0])
          })
        })

        describe('object attribute', () => {
          it('should be translated', () => {
            assert.strictEqual(i18n.t('errors[1].internal1'), messages.en.errors[1].internal1)
          })
        })

        describe('object', () => {
          it('should be translated', () => {
            assert.strictEqual(i18n.t('errors[1]'), messages.en.errors[1])
          })
        })

        describe('array', () => {
          it('should be translated', () => {
            assert.strictEqual(i18n.t('errors[2][0]'), messages.en.errors[2][0])
          })
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          assert.strictEqual(
            i18n.t('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          assert.strictEqual(
            i18n.t('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        assert.strictEqual(i18n.t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        assert.strictEqual(
          i18n.t('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        assert.strictEqual(
          i18n.t('message.fallback', 'ja'),
          messages.en.message.fallback
        )
      })
    })
  })

  describe('i18n#tc', () => {
    describe('default choice', () => {
      it('should be choice singluar', () => {
        assert.strictEqual(i18n.tc('plurals.apple'), 'one apple')
      })
    })

    describe('split plural with zero choice', () => {
      it('should allow a zero choice, a one choice and a plural choice', () => {
        const count = 10
        assert.strictEqual(i18n.tc('plurals.apple', 0), 'no apples')
        assert.strictEqual(i18n.tc('plurals.apple', 1), 'one apple')
        assert.strictEqual(i18n.tc('plurals.apple', count, { count }), '10 apples')
      })
    })

    describe('implicit choice exposing', () => {
      describe('en locale', () => {
        it('should expose "count" implicitly to locale message', () => {
          assert.strictEqual(i18n.tc('plurals.apple', 10), '10 apples')
        })

        it('should not expose if given explicitly', () => {
          const explicitArgs = { 'count': 'Many' }
          assert.strictEqual(i18n.tc('plurals.apple', 10, explicitArgs), 'Many apples')
        })
      })

      describe('ja locale', () => {
        it('should expose "count" and "n" implicitly to locale message', () => {
          assert.strictEqual(i18n.tc('plurals.implicitPluralCount', 10, 'ja'), 'count:10, n:10')
        })

        it('should not expose if given explicitly', () => {
          const explicitArgs = { 'count': 'たくさん', 'n': '大量' }
          assert.strictEqual(i18n.tc('plurals.implicitPluralCount', 10, 'ja', explicitArgs), 'count:たくさん, n:大量')
        })
      })
    })

    describe('en locale', () => {
      it('should translate an english', () => {
        assert.strictEqual(i18n.tc('plurals.car', 1), 'car')
      })
    })

    describe('multi plural check', () => {
      it('should fetch pluralized string', () => {
        assert.strictEqual(i18n.tc('plurals.car', 2), 'cars')
      })
    })

    describe('ja locale', () => {
      it('should translate a japanese', () => {
        assert.strictEqual(i18n.tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          assert.strictEqual(i18n.tc(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          assert.strictEqual(i18n.tc(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          assert.strictEqual(i18n.tc('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          assert.strictEqual(i18n.tc('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          assert.strictEqual(
            i18n.tc('Hello {0}', 1, ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          assert.strictEqual(i18n.tc('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          assert.strictEqual(
            i18n.tc('plurals.format.named', 1, { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          assert.strictEqual(
            i18n.tc('plurals.format.list', 1, ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        assert.strictEqual(i18n.tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        assert.strictEqual(
          i18n.tc('plurals.format.list', 1, 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        assert.strictEqual(
          i18n.tc('plurals.fallback', 1, 'ja'),
          'これはフォールバック'
        )
      })
    })
  })

  describe('i18n#te', () => {
    describe('existing key', () => {
      it('should return true', () => {
        assert(i18n.te('message.hello') === true)
      })

      it('should return true with locale', () => {
        assert(i18n.te('message.hello', 'ja') === true)
      })
    })

    describe('not existing key', () => {
      it('should return false', () => {
        assert(i18n.te('message.hallo') === false)
      })

      it('should return false with locale', () => {
        assert(i18n.te('message.hello', 'xx') === false)
      })
    })
  })

  describe('$t', () => {
    describe('en locale', () => {
      it('should translate an english', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(vm.$t('message.hello'), messages.en.message.hello)
      })
    })

    describe('ja locale', () => {
      it('should translate a japanese', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(vm.$t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$t(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$t(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$t('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$t('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(
            vm.$t('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$t('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(
            vm.$t('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(
            vm.$t('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(vm.$t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(
          vm.$t('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(
          vm.$t('message.fallback', 'ja'),
          messages.en.message.fallback
        )
      })
    })
  })

  describe('$tc', () => {
    describe('en locale', () => {
      it('should translate plural english', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(vm.$tc('plurals.car', 1), 'car')
      })
    })

    describe('multi plural check', () => {
      it('should fetch pluralized string', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(vm.$tc('plurals.car', 2), 'cars')
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$tc(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$tc(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$tc('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$tc('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(
            vm.$tc('Hello {0}', 1, ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(vm.$tc('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(
            vm.$tc('plurals.format.named', 1, { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.strictEqual(
            vm.$tc('plurals.format.list', 1, ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(vm.$tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(
          vm.$tc('plurals.format.list', 1, 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        const vm = new Vue({ i18n })
        assert.strictEqual(
          vm.$tc('plurals.fallback', 2, 'ja'),
          'ザ・ワールド'
        )
      })
    })
  })

  describe('$te', () => {
    describe('existing key', () => {
      it('should return true', () => {
        const vm = new Vue({ i18n })
        assert(vm.$te('message.hello') === true)
      })

      it('should return true with locale', () => {
        const vm = new Vue({ i18n })
        assert(vm.$te('message.hello', 'ja') === true)
      })
    })

    describe('not existing key', () => {
      it('should return false', () => {
        const vm = new Vue({ i18n })
        assert(vm.$te('message.hallo') === false)
      })

      it('should return false with locale', () => {
        const vm = new Vue({ i18n })
        assert(vm.$te('message.hello', 'xx') === false)
      })
    })
  })

  describe('i18n#locale', () => {
    let el
    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
    })

    it('should be reactivity translate', done => {
      const vm = new Vue({
        el, i18n,
        render (h) {
          return h('p', {}, [this.$t('message.hello')])
        }
      })
      nextTick(() => {
        assert.strictEqual(vm.$el.textContent, messages.en.message.hello)
        i18n.locale = 'ja' // set japanese
      }).then(() => {
        assert.strictEqual(vm.$el.textContent, messages.ja.message.hello)
      }).then(done)
    })
  })

  describe('i18n#fallbackLocale', () => {
    let el
    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
    })

    it('should be reactivity translate', done => {
      const vm = new Vue({
        el, i18n,
        render (h) {
          return h('p', {}, [this.$t('message.fallback1')])
        }
      })
      nextTick(() => {
        assert.strictEqual(vm.$el.textContent, 'message.fallback1')
        i18n.fallbackLocale = 'ja' // set fallback locale
      }).then(() => {
        assert.strictEqual(vm.$el.textContent, messages.ja.message.fallback1)
      }).then(done)
    })
  })

  describe('i18n#availableLocales', () => {
    it('should return locales defined in messages in lexical order', () => {
      assert.deepStrictEqual(i18n.availableLocales, ['en', 'ja'])
    })
  })

  let desc = VueI18n.availabilities.dateTimeFormat ? describe : describe.skip
  desc('i18n#d', () => {
    let dt
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en-US',
        fallbackLocale: 'ja-JP',
        dateTimeFormats
      })
      dt = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
    })

    describe('arguments nothing', () => {
      it('should be formatted', () => {
        assert.strictEqual(i18n.d(dt), '12/20/2012')
      })
    })

    describe('number value', () => {
      it('should be formatted', () => {
        assert.strictEqual(i18n.d(dt.getTime()), '12/20/2012')
      })
    })

    describe('key argument', () => {
      // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
      isChrome && it('should be formatted', () => {
        assert.strictEqual(i18n.d(dt, 'short'), '12/19/2012, 10:00 PM')
      })
    })

    describe('locale argument', () => {
      describe('with second argument', () => {
        // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
        isChrome && it('should be formatted', () => {
          assert.strictEqual(i18n.d(dt, 'short', 'ja-JP'), '2012/12/20 12:00')
        })
      })

      describe('with object argument', () => {
        // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
        isChrome && it('should be formatted', () => {
          assert.strictEqual(i18n.d(dt, { key: 'short', locale: 'ja-JP' }), '2012/12/20 12:00')
        })
      })
    })

    describe('fallback', () => {
      // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
      isChrome && it('should be formatted', () => {
        assert.strictEqual(i18n.d(dt, 'long'), '2012/12/20 12:00:00')
      })
    })
  })

  desc = VueI18n.availabilities.numberFormat ? describe : describe.skip
  desc('i18n#n', () => {
    let money
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'en-US',
        fallbackLocale: 'ja-JP',
        numberFormats
      })
      money = 10100
    })

    describe('arguments nothing', () => {
      it('should be formatted', () => {
        assert.strictEqual(i18n.n(money), '10,100')
      })
    })

    describe('key argument', () => {
      it('should be formatted', () => {
        assert.strictEqual(i18n.n(money, 'currency'), '$10,100.00')
      })
    })

    describe('locale argument', () => {
      describe('with second argument', () => {
        it('should be formatted', () => {
          assert.strictEqual(i18n.n(money, 'currency', 'ja-JP'), '￥10,100')
        })
      })

      describe('with object argument', () => {
        it('should be formatted', () => {
          assert.strictEqual(i18n.n(money, { key: 'currency', locale: 'ja-JP' }), '￥10,100')
        })
      })
    })

    describe('explicit options argument', () => {
      describe('without key', () => {
        it('should be formatted', () => {
          assert.strictEqual(i18n.n(money, { style: 'currency', currency: 'JPY' }), '¥10,100')
        })

        it('should respect other number options', () => {
          const options = { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' }
          assert.strictEqual(i18n.n(money, options), '€10,100.00')
        })
      })

      describe('with key', () => {
        it('should be formatted', () => {
          assert.strictEqual(i18n.n(money, { key: 'currency', currency: 'JPY' }), '¥10,100')
        })

        it('should respect other number options', () => {
          const options = { key: 'currency', currency: 'EUR', currencyDisplay: 'symbol' }
          assert.strictEqual(i18n.n(money, options), '€10,100.00')
        })
      })
    })

    describe('fallback', () => {
      it('should be formatted', () => {
        assert.strictEqual(i18n.n(0.9, 'percent'), '90%')
      })
    })
  })
})
