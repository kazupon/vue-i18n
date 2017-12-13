import messages from './fixture/index'
import { parse } from '../../src/format'

describe('issues', () => {
  let vm, i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      messages
    })
    vm = new Vue({ i18n })
  })


  describe('#24', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('continue-with-new-account'),
        messages[vm.$i18n.locale]['continue-with-new-account']
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
        messages[vm.$i18n.locale]['message']['hello']
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
      const arrayMessages = messages[vm.$i18n.locale].issues.arrayBugs
      for (let i = 0; i < arrayMessages.length; i++) {
        const item = vm.$t('issues.arrayBugs')[i]
        assert.equal(item, arrayMessages[i])
      }
    })
  })

  describe('#97', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('message.1234'),
        messages[vm.$i18n.locale]['message']['1234']
      )
      assert.equal(
        vm.$t('message.1mixedKey'),
        messages[vm.$i18n.locale]['message']['1mixedKey']
      )
    })
  })

  describe('#169', () => {
    it('should be translated', done => {
      const Component = Vue.extend({
        __i18n: [JSON.stringify({
          en: { custom: 'custom block!' }
        })],
        render (h) {
          return h('p', { ref: 'custom' }, [this.$t('custom')])
        }
      })
      const vm = new Component({ i18n }).$mount()
      nextTick(() => {
        assert.equal(vm.$refs.custom.textContent, 'custom block!')
      }).then(done)
    })
  })

  describe('#170', () => {
    it('should be translated', () => {
      assert.equal(vm.$i18n.t('message.linkHyphen'), messages.en['hyphen-hello'])
      assert.equal(vm.$i18n.t('message.linkUnderscore'), messages.en.underscore_hello)
    })
  })

  describe('#171', () => {
    it('should be translated', done => {
      vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'message.linkList' } }, [
            h('strong', [this.$t('underscore_hello')]),
            h('strong', [this.$t('message.link')])
          ])
        }
      }).$mount()
      nextTick(() => {
        assert.equal(
          vm.$el.innerHTML,
          'the world: <strong>underscore the wolrd</strong> <strong>the world</strong>'
        )
      }).then(done)
    })
  })

  describe('#172', () => {
    it('should be translated', done => {
      vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          messages: {
            en: { 'company-name': 'billy-bob\'s fine steaks.' }
          }
        }),
        components: {
          comp: {
            __i18n: [JSON.stringify({
              en: { title: '@:company-name - yeee hawwww!!!' }
            })],
            render (h) {
              return h('p', { ref: 'title' }, [this.$t('title')])
            }
          }
        },
        render (h) {
          return h('div', [h('comp', { ref: 'comp' })])
        }
      }).$mount()
      nextTick(() => {
        assert.equal(
          vm.$refs.comp.$refs.title.textContent,
          'billy-bob\'s fine steaks. - yeee hawwww!!!'
        )
      }).then(done)
    })
  })

  describe('#173', () => {
    it('should be translated', done => {
      const Component = Vue.extend({
        __i18n: [JSON.stringify({
          en: { custom: 'custom block!' }
        })],
        render (h) {
          return h('p', { ref: 'custom' }, [this.$t('custom')])
        }
      })
      const vm = new Component({
        i18n: new VueI18n({ locale: 'en' })
      }).$mount()
      nextTick(() => {
        assert.equal(vm.$refs.custom.textContent, 'custom block!')
      }).then(done)
    })
  })

  describe('#174', () => {
    it('should be fallback', done => {
      vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          fallbackLocale: 'ja',
          messages: {
            en: {},
            ja: { msg: 'メッセージ' }
          }
        }),
        components: {
          comp: {
            i18n: {
              messages: {
                en: {},
                ja: { hello: 'こんにちは' }
              }
            },
            render (h) {
              return h('div', [
                h('p', { ref: 'el1' }, [this.$t('hello')]),
                h('p', { ref: 'el2' }, [this.$t('msg')])
              ])
            }
          }
        },
        render (h) {
          return h('div', [h('comp', { ref: 'comp' })])
        }
      }).$mount()
      const el1 = vm.$refs.comp.$refs.el1
      const el2 = vm.$refs.comp.$refs.el2
      nextTick(() => {
        assert.equal(el1.textContent, 'こんにちは')
        assert.equal(el2.textContent, 'メッセージ')
      }).then(done)
    })
  })

  describe('#176', () => {
    it('should be translated', done => {
      vm = new Vue({
        i18n: new VueI18n({
          locale: 'xx',
          fallbackLocale: 'en',
          messages: {
            en: {
              'alpha': '[EN] alpha {gustav} value',
              'bravo': '[EN] bravo {gustav} value',
              'charlie': '[EN] charlie {0} value',
              'delta': '[EN] delta {0} value'
            },
            xx: {
              'bravo': '[XX] bravo {gustav} value',
              'delta': '[XX] delta {0} value'
            }
          }
        }),
        render (h) {
          return h('div', [
            h('p', { ref: 'el1' }, [this.$t('alpha', { gustav: 'injected' })]),
            h('p', { ref: 'el2' }, [this.$t('bravo', { gustav: 'injected' })]),
            h('p', { ref: 'el3' }, [this.$t('charlie', ['injected'])]),
            h('p', { ref: 'el4' }, [this.$t('delta', ['injected'])])
          ])
        }
      }).$mount()
      nextTick(() => {
        assert.equal(vm.$refs.el1.textContent, '[EN] alpha injected value')
        assert.equal(vm.$refs.el2.textContent, '[XX] bravo injected value')
        assert.equal(vm.$refs.el3.textContent, '[EN] charlie injected value')
        assert.equal(vm.$refs.el4.textContent, '[XX] delta injected value')
      }).then(done)
    })
  })

  describe('#191', () => {
    it('should be parsed', () => {
      const tokens = parse('{deposit}% PREPAYMENT')
      assert(tokens.length === 2)
      assert.equal(tokens[0].type, 'named')
      assert.equal(tokens[0].value, 'deposit')
      assert.equal(tokens[1].type, 'text')
      assert.equal(tokens[1].value, '% PREPAYMENT')
    })
  })

  describe('#203', () => {
    it('should be translated', done => {
      const App = {
        render (h) {
          return h('p', { ref: 'app' }, [this.$t('hello')])
        }
      }
      vm = new Vue({
        render (h) {
          return h({
            components: { App },
            render (h) { return h('app') },
            i18n: new VueI18n({
              locale: 'en',
              messages: {
                en: {
                  'hello': 'hello 203'
                },
                ja: {
                  'hello': 'こんにちは 203'
                }
              }
            })
          })
        }
      }).$mount()
      nextTick(() => {
        assert.equal(vm.$el.innerHTML, 'hello 203')
      }).then(done)
    })
  })

  describe('#259', () => {
    it('this points to the right', (done) => {
      const vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          messages: {
            en: {
              'hello': 'hello #259'
            },
            ja: {
              'hello': 'こんにちは #259'
            }
          }
        })
      })
      const $t = vm.$t
      const $tc = vm.$t
      const $te = vm.$t
      const $d = vm.$t
      const $n = vm.$t
      assert.equal($t('hello'), 'hello #259')
      assert.equal($tc('hello'), 'hello #259')
      assert.equal($te('hello'), 'hello #259')
      assert.equal($d('hello'), 'hello #259')
      assert.equal($n('hello'), 'hello #259')
      done()
    })
  })
})
