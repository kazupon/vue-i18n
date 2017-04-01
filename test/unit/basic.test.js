import messages from './fixture/index'

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
        assert.equal(i18n.t('message.hello'), messages.en.message.hello)
      })
    })

    describe('empty string', () => {
      it('should support empty string', () => {
        assert.equal(i18n.t('message.empty'), messages.en.message.empty)
      })
    })

    describe('linked translation', () => {
      it('should translate simple link', () => {
        assert.equal(i18n.t('message.link'), messages.en.message.hello)
      })
    })

    describe('linked translation', () => {
      it('should translate link at the end of locale', () => {
        assert.equal(i18n.t('message.linkEnd'), 'This is a linked translation to the world')
      })
    })

    describe('linked translation', () => {
      it('should translate link within a locale', () => {
        assert.equal(i18n.t('message.linkWithin'), 'Isn\'t the world we live in great?')
      })
    })

    describe('linked translation', () => {
      it('should translate multiple links within a locale', () => {
        assert.equal(i18n.t('message.linkMultiple'), 'Hello hoge!, isn\'t the world great?')
      })
    })

    describe('ja locale', () => {
      it('should translate a japanese', () => {
        assert.equal(i18n.t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          assert.equal(i18n.t(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          assert.equal(i18n.t(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          assert.equal(i18n.t('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          assert.equal(i18n.t('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          assert.equal(
            i18n.t('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          assert.equal(i18n.t('Hello'), 'Hello')
        })
      })

      describe('array keypath', () => {
        describe('basic', () => {
          it('should be translated', () => {
            assert.equal(i18n.t('errors[0]'), messages.en.errors[0])
          })
        })

        describe('object', () => {
          it('should be translated', () => {
            assert.equal(i18n.t('errors[1].internal1'), messages.en.errors[1].internal1)
          })
        })

        describe('array', () => {
          it('should be translated', () => {
            assert.equal(i18n.t('errors[2][0]'), messages.en.errors[2][0])
          })
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          assert.equal(
            i18n.t('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          assert.equal(
            i18n.t('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        assert.equal(i18n.t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        assert.equal(
          i18n.t('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        assert.equal(
          i18n.t('message.fallback', 'ja'),
          messages.en.message.fallback
        )
      })
    })
  })

  describe('i18n#tc', () => {
    describe('split plural with zero choice', () => {
      it('should allow a zero choice, a one choice and a plural choice', () => {
        const count = 10
        assert.equal(i18n.tc('plurals.apple', 0), 'no apples')
        assert.equal(i18n.tc('plurals.apple', 1), 'one apple')
        assert.equal(i18n.tc('plurals.apple', count, { count }), '10 apples')
      })
    })

    describe('en locale', () => {
      it('should translate an english', () => {
        assert.equal(i18n.tc('plurals.car', 1), 'car')
      })
    })

    describe('multi plural check', () => {
      it('should fetch pluralized string', () => {
        assert.equal(i18n.tc('plurals.car', 2), 'cars')
      })
    })

    describe('ja locale', () => {
      it('should translate a japanese', () => {
        assert.equal(i18n.tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          assert.equal(i18n.tc(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          assert.equal(i18n.tc(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          assert.equal(i18n.tc('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          assert.equal(i18n.tc('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          assert.equal(
            i18n.tc('Hello {0}', 1, ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          assert.equal(i18n.tc('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          assert.equal(
            i18n.tc('plurals.format.named', 1, { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          assert.equal(
            i18n.tc('plurals.format.list', 1, ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        assert.equal(i18n.tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        assert.equal(
          i18n.tc('plurals.format.list', 1, 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        assert.equal(
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
    })
  })

  describe('$t', () => {
    describe('en locale', () => {
      it('should translate an english', () => {
        const vm = new Vue({ i18n })
        assert.equal(vm.$t('message.hello'), messages.en.message.hello)
      })
    })

    describe('ja locale', () => {
      it('should translate a japanese', () => {
        const vm = new Vue({ i18n })
        assert.equal(vm.$t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$t(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$t(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$t('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$t('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          const vm = new Vue({ i18n })
          assert.equal(
            vm.$t('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$t('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.equal(
            vm.$t('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.equal(
            vm.$t('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        const vm = new Vue({ i18n })
        assert.equal(vm.$t('message.hello', 'ja'), messages.ja.message.hello)
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        const vm = new Vue({ i18n })
        assert.equal(
          vm.$t('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        const vm = new Vue({ i18n })
        assert.equal(
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
        assert.equal(vm.$tc('plurals.car', 1), 'car')
      })
    })

    describe('multi plural check', () => {
      it('should fetch pluralized string', () => {
        const vm = new Vue({ i18n })
        assert.equal(vm.$tc('plurals.car', 2), 'cars')
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$tc(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$tc(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$tc('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$tc('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          const vm = new Vue({ i18n })
          assert.equal(
            vm.$tc('Hello {0}', 1, ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          const vm = new Vue({ i18n })
          assert.equal(vm.$tc('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.equal(
            vm.$tc('plurals.format.named', 1, { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          const vm = new Vue({ i18n })
          assert.equal(
            vm.$tc('plurals.format.list', 1, ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('locale argument', () => {
      it('should return empty string', () => {
        const vm = new Vue({ i18n })
        assert.equal(vm.$tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('format & locale arguments', () => {
      it('should return replaced string', () => {
        const vm = new Vue({ i18n })
        assert.equal(
          vm.$tc('plurals.format.list', 1, 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        const vm = new Vue({ i18n })
        assert.equal(
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
        assert.equal(vm.$el.textContent, messages.en.message.hello)
        i18n.locale = 'ja' // set japanese
      }).then(() => {
        assert.equal(vm.$el.textContent, messages.ja.message.hello)
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
        assert.equal(vm.$el.textContent, 'message.fallback1')
        i18n.fallbackLocale = 'ja' // set fallback locale
      }).then(() => {
        assert.equal(vm.$el.textContent, messages.ja.message.fallback1)
      }).then(done)
    })
  })
})
