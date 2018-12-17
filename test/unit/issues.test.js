import messages from './fixture/index'
import { parse } from '../../src/format'
import VueI18n from '../../src'
const compiler = require('vue-template-compiler')

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
      assert.strictEqual(
        vm.$t('continue-with-new-account'),
        messages[vm.$i18n.locale]['continue-with-new-account']
      )
    })
  })

  describe('#35', () => {
    it('should be translated', () => {
      assert.strictEqual(
        vm.$t('underscore', { helloMsg: 'hello' }),
        'hello world'
      )
    })
  })

  describe('#42, #43', () => {
    it('should not be occurred error', () => {
      assert.strictEqual(
        vm.$t('message[\'hello\']'),
        messages[vm.$i18n.locale]['message']['hello']
      )
    })
  })

  describe('#51', () => {
    it('should be translated', () => {
      assert.strictEqual(
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
        assert.strictEqual(item, arrayMessages[i])
      }
    })
  })

  describe('#97', () => {
    it('should be translated', () => {
      assert.strictEqual(
        vm.$t('message.1234'),
        messages[vm.$i18n.locale]['message']['1234']
      )
      assert.strictEqual(
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
        assert.strictEqual(vm.$refs.custom.textContent, 'custom block!')
      }).then(done)
    })
  })

  describe('#170', () => {
    it('should be translated', () => {
      assert.strictEqual(vm.$i18n.t('message.linkHyphen'), messages.en['hyphen-hello'])
      assert.strictEqual(vm.$i18n.t('message.linkUnderscore'), messages.en.underscore_hello)
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
        assert.strictEqual(
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
        assert.strictEqual(
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
        assert.strictEqual(vm.$refs.custom.textContent, 'custom block!')
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
        assert.strictEqual(el1.textContent, 'こんにちは')
        assert.strictEqual(el2.textContent, 'メッセージ')
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
        assert.strictEqual(vm.$refs.el1.textContent, '[EN] alpha injected value')
        assert.strictEqual(vm.$refs.el2.textContent, '[XX] bravo injected value')
        assert.strictEqual(vm.$refs.el3.textContent, '[EN] charlie injected value')
        assert.strictEqual(vm.$refs.el4.textContent, '[XX] delta injected value')
      }).then(done)
    })
  })

  describe('#191', () => {
    it('should be parsed', () => {
      const tokens = parse('{deposit}% PREPAYMENT')
      assert(tokens.length === 2)
      assert.strictEqual(tokens[0].type, 'named')
      assert.strictEqual(tokens[0].value, 'deposit')
      assert.strictEqual(tokens[1].type, 'text')
      assert.strictEqual(tokens[1].value, '% PREPAYMENT')
    })
  })

  describe('#200', () => {
    it('should be translated', () => {
      const el = document.createElement('div')
      const Constructor = Vue.extend({ i18n })
      const vm = new Constructor({
        render (h) {
          return h('p', { ref: 'text' }, [this.$t('message.hello')])
        }
      }).$mount(el)
      assert.strictEqual(vm.$refs.text.textContent, messages.en.message.hello)
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
        assert.strictEqual(vm.$el.innerHTML, 'hello 203')
      }).then(done)
    })
  })

  describe('#247', () => {
    it('should be warned if circular reference in linked locale message', () => {
      const spy = sinon.spy(console, 'warn')
      assert.strictEqual(vm.$i18n.t('message.circular1'), 'Foo Bar Buz @:message.circular1')
      assert(spy.notCalled === false)
      assert(spy.callCount === 1)
      spy.restore()
    })

    it('should not be warned if same non-circular link used repeatedly', () => {
      const spy = sinon.spy(console, 'warn')
      assert.strictEqual(vm.$i18n.t('message.linkTwice'), 'the world: the world')
      assert(spy.notCalled === true)
      assert(spy.callCount === 0)
      spy.restore()
    })
  })

  describe('#377', () => {
    it('should be destroyed', done => {
      const el = document.createElement('div')
      const template = `<div id="app">
        <p>TIMEOUT : {{ timeout }}</p>
        <div ref="el1" v-if="!timeout">
          <span v-t="'SHOULD_NOT_DISPLAY_WHEN_TIMEOUT_EQUAL_TRUE'"></span>
        </div>
        <div ref="el2" v-if="timeout">
          <span class="">{{ $t('CANNOT_REPRODUCE_WITHOUT_THIS') }}</span>
        </div>
      </div>`
      const { render, staticRenderFns } = compiler.compileToFunctions(template)
      const vm = new Vue({
        i18n: new VueI18n({ locale: 'id' }),
        data () {
          return { timeout: false }
        },
        methods: {
          startLoading: function () {
            this.timeout = true
            setTimeout(() => {
              this.timeout = false
            }, 100)
          }
        },
        render,
        staticRenderFns
      }).$mount(el)

      Vue.nextTick(() => {
        assert.strictEqual(vm.$refs.el1.outerHTML, '<div><span>SHOULD_NOT_DISPLAY_WHEN_TIMEOUT_EQUAL_TRUE</span></div>')
        vm.startLoading()
        delay(50).then(() => {
          assert.strictEqual(vm.$refs.el2.outerHTML, '<div><span>CANNOT_REPRODUCE_WITHOUT_THIS</span></div>')
          delay(60).then(() => {
            assert.strictEqual(vm.$refs.el1.outerHTML, '<div><span>SHOULD_NOT_DISPLAY_WHEN_TIMEOUT_EQUAL_TRUE</span></div>')
            done()
          })
        })
      })
    })
  })

  describe('#398', () => {
    it('should return true', () => {
      assert.strictEqual(vm.$te('0123a'), true)
      assert.strictEqual(vm.$te('01234'), true)
      assert.strictEqual(vm.$te('message.1234'), true)
    })
  })

  describe('#430', () => {
    it('should be translated', () => {
      assert.strictEqual(
        vm.$t('日本語'),
        messages[vm.$i18n.locale]['日本語']
      )
      assert.strictEqual(
        vm.$t('message.sálvame'),
        messages[vm.$i18n.locale]['message']['sálvame']
      )
    })
  })

  describe('#450', () => {
    it('shoulbe be translated with v-t', done => {
      const vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          messages: {
            en: {
              hello: 'hi there!'
            }
          }
        }),
        render (h) {
          // <p ref="text" v-t="'hello'"></p>
          return h('p', { ref: 'text', directives: [{
            name: 't', rawName: 'v-t', value: ('hello'), expression: "'hello'"
          }] })
        }
      }).$mount(document.createElement('div'))

      nextTick(() => {
        assert.strictEqual(vm.$refs.text.textContent, 'hi there!')
      }).then(() => {
        vm.$i18n.setLocaleMessage('en', {
          hello: 'hello there!'
        })
        vm.$forceUpdate()
      }).then(() => {
        assert.strictEqual(vm.$refs.text.textContent, 'hello there!')
      }).then(done)
    })
  })

  describe('#453', () => {
    it('should be handled root vm instance', done => {
      const vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          missing: (locale, key, instance) => {
            assert.strictEqual('ja', locale)
            assert.strictEqual('foo.bar', key)
            assert(vm === instance)
            done()
          }
        }),
        components: {
          child: {
            i18n: {
              locale: 'ja'
            },
            render (h) {
              return h('p', ['hello child'])
            }
          }
        },
        render (h) {
          return h('div', [
            h('child', { ref: 'child' })
          ])
        }
      }).$mount()
      vm.$nextTick(() => {
        vm.$refs.child.$i18n.t('foo.bar', 'ja')
      })
    })
  })

  describe('#458', () => {
    it('should be merged locale message', done => {
      const vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          messages: {
            hello: 'hello world!'
          }
        }),
        render (h) {
          return h('div', [
            h('p', { ref: 'text1' }, [this.$t('key1')]),
            h('p', { ref: 'text2' }, [this.$t('shared.key1')]),
            h('p', { ref: 'text3' }, [this.$t('key2')]),
            h('p', { ref: 'text4' }, [this.$t('shared.key2')])
          ])
        }
      }).$mount()
      nextTick(() => {
        vm.$i18n.mergeLocaleMessage('en', {
          key1: 'Hello Module 1',
          shared: {
            key1: 'Hello Module 1 shared key 1'
          }
        })
        vm.$i18n.mergeLocaleMessage('en', {
          key2: 'Hello Module 2',
          shared: {
            key2: 'Hello Module 2 shared key 2'
          }
        })
      }).then(() => {
        assert.strictEqual(vm.$refs.text1.textContent, 'Hello Module 1')
        assert.strictEqual(vm.$refs.text2.textContent, 'Hello Module 1 shared key 1')
        assert.strictEqual(vm.$refs.text3.textContent, 'Hello Module 2')
        assert.strictEqual(vm.$refs.text4.textContent, 'Hello Module 2 shared key 2')
      }).then(done)
    })
  })

  describe('#78, #464', () => {
    it('should fallback to default pluralization', () => {
      // / Test default pluralization rule (english)
      const i18n = new VueI18n({
        locale: 'en',
        messages: {
          'en': {
            test: 'no tests | 1 test | {n} tests'
          }
        }
      })

      assert.strictEqual(i18n.tc('test', 1), '1 test')
      assert.strictEqual(i18n.tc('test', 0), 'no tests')
      assert.strictEqual(i18n.tc('test', 10), '10 tests')
    })

    it('should use custom pluralization if available', () => {
      // Test custom pluralization rule (slavic languages)
      function slavicPluralization (choice, choicesLength) {
        if (choice === 0) {
          return 0
        }

        const teen = choice > 10 && choice < 20
        const endsWithOne = choice % 10 === 1

        if (choicesLength < 4) {
          return (!teen && endsWithOne) ? 1 : 2
        }

        if (!teen && endsWithOne) {
          return 1
        }

        if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
          return 2
        }

        return (choicesLength < 4) ? 2 : 3
      }

      let i18n = new VueI18n({
        locale: 'en',
        messages: {
          'en': {
            test: 'no tests | 1 test | {n} tests'
          },
          'ru': {
            test: 'нет тестов | 1 тест | {n} теста | {n} тестов'
          }
        },
        pluralizationRules: {
          'ru': slavicPluralization
        }
      })

      assert.strictEqual(i18n.tc('test', 1), '1 test')
      assert.strictEqual(i18n.tc('test', 0), 'no tests')
      assert.strictEqual(i18n.tc('test', 10), '10 tests')

      i18n.locale = 'ru'

      assert.strictEqual(i18n.tc('test', 1), '1 тест')
      assert.strictEqual(i18n.tc('test', 3), '3 теста')
      assert.strictEqual(i18n.tc('test', 0), 'нет тестов')
      assert.strictEqual(i18n.tc('test', 10), '10 тестов')

      i18n = new VueI18n({
        locale: 'ru',
        messages: {
          ru: {
            car: '0 машин | 1 машина | {n} машины | {n} машин'
          }
        },
        pluralizationRules: {
          ru: slavicPluralization
        }
      })
      vm = new Vue({ i18n })

      assert(vm.$tc('car', 0), '0 машин')
      assert(vm.$tc('car', 1), '1 машина')
      assert(vm.$tc('car', 2), '2 машины')
      assert(vm.$tc('car', 4), '4 машины')
      assert(vm.$tc('car', 12), '12 машин')
      assert(vm.$tc('car', 21), '21 машина')
    })

    it('ensures backward-compatibility with #451', () => {
      const defaultImpl = VueI18n.prototype.getChoiceIndex
      VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
        if (this.locale !== 'ru') {
          return defaultImpl.apply(this, arguments)
        }

        if (choice === 0) {
          return 0
        }

        const teen = choice > 10 && choice < 20
        const endsWithOne = choice % 10 === 1

        if (choicesLength < 4) {
          return (!teen && endsWithOne) ? 1 : 2
        }

        if (!teen && endsWithOne) {
          return 1
        }

        if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
          return 2
        }

        return (choicesLength < 4) ? 2 : 3
      }


      i18n = new VueI18n({
        locale: 'en',
        messages: {
          ru: {
            car: '0 машин | 1 машина | {n} машины | {n} машин'
          }
        }
      })
      vm = new Vue({ i18n })

      assert(vm.$tc('car', 0), '0 машин')
      assert(vm.$tc('car', 1), '1 машина')
      assert(vm.$tc('car', 2), '2 машины')
      assert(vm.$tc('car', 4), '4 машины')
      assert(vm.$tc('car', 12), '12 машин')
      assert(vm.$tc('car', 21), '21 машина')

      // Set the default implementation back
      VueI18n.prototype.getChoiceIndex = defaultImpl
    })
  })
})
