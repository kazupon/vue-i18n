describe('silent', () => {
  let spy
  beforeEach(() => {
    spy = sinon.spy(console, 'warn')
  })
  afterEach(() => {
    spy.restore()
  })

  describe('silentTranslationWarn', () => {
    describe('boolean', () => {
      it('should be suppressed translate warnings', () => {
        const warningRegex = /Cannot translate the value of keypath 'foo.bar.buz'. Use the value of keypath as default./
        const vm = new Vue({
          i18n: new VueI18n({
            locale: 'en',
            silentTranslationWarn: true,
            messages: {
              en: { who: 'root' },
              ja: { who: 'ルート' }
            }
          })
        })

        vm.$t('foo.bar.buz')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

        // change
        vm.$i18n.silentTranslationWarn = false
        vm.$t('foo.bar.buz')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
      })
    })

    describe('Regex', () => {
      it('should be suppressed translate warnings', () => {
        const warningRegex = /Cannot translate the value of keypath .*\. Use the value of keypath as default./
        const vm = new Vue({
          i18n: new VueI18n({
            locale: 'en',
            silentTranslationWarn: true,
            messages: {
              en: { who: 'root' },
              ja: { who: 'ルート' }
            }
          })
        })

        vm.$t('foo.bar.buz')
        vm.$t('who.bar')
        vm.$t('who.bar.buz')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

        // change to boolean
        vm.$i18n.silentTranslationWarn = /^foo\..*|who\.bar$/
        vm.$t('foo.bar.buz')
        vm.$t('who.bar')
        vm.$t('who.bar.buz')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
      })
    })
  })

  describe('silentFallbackWarn', () => {
    let i18n
    beforeEach(() => {
      i18n = new VueI18n({
        locale: 'hu',
        fallbackLocale: 'en',
        silentFallbackWarn: true,
        messages: {
          en: { winner: 'winner' },
          hu: { chickenDinner: 'csirkevacsora' }
        }
      })
    })

    it('should suppress `Fall back to ${fallback} locale` warnings', () => {
      const vm = new Vue({ i18n })
      const warningRegex = /Fall back to .* 'en' locale./
      vm.$t('winner')
      assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

      vm.$i18n.silentFallbackWarn = false
      vm.$t('winner')
      assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
    })

    it('should suppress `Fall back to root locale` warnings.', () => {
      const el = document.createElement('div')
      const root = new Vue({
        i18n,
        components: {
          subComponent: {
            i18n: { messages: { hu: { name: 'Név' } } },
            render (h) { return h('p') }
          }
        },
        render (h) { return h('sub-component') }
      }).$mount(el)
      const vm = root.$children[0]
      const warningRegex = /Fall back to .* root locale./

      vm.$t('chickenDinner')
      assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

      vm.$i18n.silentFallbackWarn = false
      vm.$t('chickenDinner')
      assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
    })

    describe('if first try is null or undefined,', () => {
      it('should suppress `not a string` warnings for fallback to fallbackLocale.', () => {
        const vm = new Vue({ i18n })
        const warningRegex = /Value of .* is not a string./
        vm.$t('winner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

        vm.$i18n.silentFallbackWarn = false
        vm.$t('winner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
      })

      it('should supress `not a string` warnings for fallback to root.', () => {
        const el = document.createElement('div')
        const root = new Vue({
          i18n,
          components: {
            subComponent: {
              i18n: { messages: { hu: { name: 'Név' } } },
              render (h) { return h('p') }
            }
          },
          render (h) { return h('sub-component') }
        }).$mount(el)
        const vm = root.$children[0]
        const warningRegex = /Value of .* is not a string./
        vm.$t('chickenDinner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

        vm.$i18n.silentFallbackWarn = false
        vm.$t('chickenDinner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
      })
    })

    describe('if first try is not null, undefined, array, plain object or string,', () => {
      it('should suppress `not a string` warnings for fallback to fallbackLocale.', () => {
        const vm = new Vue({
          i18n: new VueI18n({
            locale: 'hu',
            fallbackLocale: 'en',
            silentFallbackWarn: true,
            messages: {
              en: { winner: 'winner' },
              hu: { winner: true } // translation value is boolean
            }
          })
        })
        const warningRegex = /Value of .* is not a string./
        vm.$t('winner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

        vm.$i18n.silentFallbackWarn = false
        vm.$t('winner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
      })

      it('should supress `not a string` warnings for fallback to root.', () => {
        const el = document.createElement('div')
        const root = new Vue({
          i18n,
          components: {
            subComponent: {
              i18n: { messages: { hu: { chickenDinner: 11 } } }, // translation value is number
              render (h) { return h('p') }
            }
          },
          render (h) { return h('sub-component') }
        }).$mount(el)
        const vm = root.$children[0]
        const warningRegex = /Value of .* is not a string./
        vm.$t('chickenDinner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === false)

        vm.$i18n.silentFallbackWarn = false
        vm.$t('chickenDinner')
        assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
      })
    })

    it('should not suppress `not a string` warnings when no further fallback is possible.', () => {
      const vm = new Vue({ i18n })
      const warningRegex = /Value of .* is not a string./
      vm.$t('loser')
      assert(spy.getCalls().some(call => call.args[0].match(warningRegex)) === true)
    })
  })
})
