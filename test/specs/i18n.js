import assert from 'power-assert'
import Vue from 'vue'
import locales from './fixture/locales'
import updatedLocales from './fixture/locales-updated'


describe('i18n', () => {
  const version = Number(Vue.version.split('.')[0])

  before(done => {
    Object.keys(locales).forEach(lang => {
      Vue.locale(lang, locales[lang])
    })
    Vue.config.lang = 'en'
    Vue.nextTick(done)
  })

  describe('Vue.t', () => {
    describe('en language locale', () => {
      it('should translate an english', () => {
        assert.equal(Vue.t('message.hello'), locales.en.message.hello)
      })
    })

    describe('linked translation', () => {
      it('should translate simple link', () => {
        assert.equal(Vue.t('message.link'), locales.en.message.hello)
      })
    })

    describe('linked translation', () => {
      it('should translate link at the end of locale', () => {
        assert.equal(Vue.t('message.link_end'), 'This is a linked translation to the world')
      })
    })

    describe('linked translation', () => {
      it('should translate link within a locale', () => {
        assert.equal(Vue.t('message.link_within'), 'Isn\'t the world we live in great?')
      })
    })

    describe('linked translation', () => {
      it('should translate multiple links within a locale', () => {
        assert.equal(Vue.t('message.link_multiple'), 'Hello hoge!, isn\'t the world great?')
      })
    })

    describe('ja language locale', () => {
      it('should translate a japanese', () => {
        assert.equal(Vue.t('message.hello', 'ja'), locales.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          assert.equal(Vue.t(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          assert.equal(Vue.t(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          assert.equal(Vue.t('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          assert.equal(Vue.t('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          assert.equal(
            Vue.t('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          assert.equal(Vue.t('Hello'), 'Hello')
        })
      })

      describe('array keypath', () => {
        context('basic', () => {
          it('should be translated', () => {
            assert.equal(Vue.t('errors[0]'), locales.en.errors[0])
          })
        })

        context('object', () => {
          it('should be translated', () => {
            assert.equal(Vue.t('errors[1].internal1'), locales.en.errors[1].internal1)
          })
        })

        context('array', () => {
          it('should be translated', () => {
            assert.equal(Vue.t('errors[2][0]'), locales.en.errors[2][0])
          })
        })
      })
    })

    describe('format arguments', () => {
      context('named', () => {
        it('should return replaced string', () => {
          assert.equal(
            Vue.t('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      context('list', () => {
        it('should return replaced string', () => {
          assert.equal(
            Vue.t('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('language argument', () => {
      it('should return empty string', () => {
        assert.equal(Vue.t('message.hello', 'ja'), locales.ja.message.hello)
      })
    })

    describe('format & language arguments', () => {
      it('should return replaced string', () => {
        assert.equal(
          Vue.t('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        assert.equal(
          Vue.t('message.fallback', 'ja'),
          locales.en.message.fallback
        )
      })
    })
  })

  describe('Vue.tc', () => {
    describe('split plural with zero choice', () => {
      it('should allow a zero choice, a one choice and a plural choice', () => {
        const count = 10

        assert.equal(Vue.tc('plurals.apple', 0), 'no apples')
        assert.equal(Vue.tc('plurals.apple', 1), 'one apple')
        assert.equal(Vue.tc('plurals.apple', count, { count }), '10 apples')
      })
    })

    describe('en language locale', () => {
      it('should translate an english', () => {
        assert.equal(Vue.tc('plurals.car', 1), 'car')
      })
    })

    describe('multi plural check', () => {
      it('should fetch pluralized string', () => {
        assert.equal(Vue.tc('plurals.car', 2), 'cars')
      })
    })

    describe('ja language locale', () => {
      it('should translate a japanese', () => {
        assert.equal(Vue.tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          assert.equal(Vue.tc(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          assert.equal(Vue.tc(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          assert.equal(Vue.tc('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          assert.equal(Vue.tc('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          assert.equal(
            Vue.tc('Hello {0}', 1, ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          assert.equal(Vue.tc('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      context('named', () => {
        it('should return replaced string', () => {
          assert.equal(
            Vue.tc('plurals.format.named', 1, { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      context('list', () => {
        it('should return replaced string', () => {
          assert.equal(
            Vue.tc('plurals.format.list', 1, ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('language argument', () => {
      it('should return empty string', () => {
        assert.equal(Vue.tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('format & language arguments', () => {
      it('should return replaced string', () => {
        assert.equal(
          Vue.tc('plurals.format.list', 1, 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        assert.equal(
          Vue.tc('plurals.fallback', 1, 'ja'),
          'これはフォールバック'
        )
      })
    })
  })

  describe('$t', () => {
    describe('en language locale', () => {
      it('should translate an english', () => {
        const vm = new Vue()
        assert.equal(vm.$t('message.hello'), locales.en.message.hello)
      })
    })

    describe('ja language locale', () => {
      it('should translate a japanese', () => {
        const vm = new Vue()
        assert.equal(vm.$t('message.hello', 'ja'), locales.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          const vm = new Vue()
          assert.equal(vm.$t(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          const vm = new Vue()
          assert.equal(vm.$t(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          const vm = new Vue()
          assert.equal(vm.$t('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          const vm = new Vue()
          assert.equal(vm.$t('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          const vm = new Vue()
          assert.equal(
            vm.$t('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          const vm = new Vue()
          assert.equal(vm.$t('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      context('named', () => {
        it('should return replaced string', () => {
          const vm = new Vue()
          assert.equal(
            vm.$t('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      context('list', () => {
        it('should return replaced string', () => {
          const vm = new Vue()
          assert.equal(
            vm.$t('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('language argument', () => {
      it('should return empty string', () => {
        const vm = new Vue()
        assert.equal(vm.$t('message.hello', 'ja'), locales.ja.message.hello)
      })
    })

    describe('format & language arguments', () => {
      it('should return replaced string', () => {
        const vm = new Vue()
        assert.equal(
          vm.$t('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        const vm = new Vue()
        assert.equal(
          vm.$t('message.fallback', 'ja'),
          locales.en.message.fallback
        )
      })
    })
  })


  describe('$tc', () => {
    describe('en language locale', () => {
      it('should translate plural english', () => {
        const vm = new Vue()
        assert.equal(vm.$tc('plurals.car', 1), 'car')
      })
    })

    describe('multi plural check', () => {
      it('should fetch pluralized string', () => {
        const vm = new Vue()
        assert.equal(vm.$tc('plurals.car', 2), 'cars')
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          const vm = new Vue()
          assert.equal(vm.$tc(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          const vm = new Vue()
          assert.equal(vm.$tc(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          const vm = new Vue()
          assert.equal(vm.$tc('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          const vm = new Vue()
          assert.equal(vm.$tc('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          const vm = new Vue()
          assert.equal(
            vm.$tc('Hello {0}', 1, ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          const vm = new Vue()
          assert.equal(vm.$tc('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      context('named', () => {
        it('should return replaced string', () => {
          const vm = new Vue()
          assert.equal(
            vm.$tc('plurals.format.named', 1, { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      context('list', () => {
        it('should return replaced string', () => {
          const vm = new Vue()
          assert.equal(
            vm.$tc('plurals.format.list', 1, ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('language argument', () => {
      it('should return empty string', () => {
        const vm = new Vue()
        assert.equal(vm.$tc('plurals.car', 1, 'ja'), 'ザ・ワールド')
      })
    })

    describe('format & language arguments', () => {
      it('should return replaced string', () => {
        const vm = new Vue()
        assert.equal(
          vm.$tc('plurals.format.list', 1, 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        const vm = new Vue()
        assert.equal(
          vm.$tc('plurals.fallback', 2, 'ja'),
          'ザ・ワールド'
        )
      })
    })
  })


  describe('reactive translation', () => {
    let el
    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
    })

    it('should translate', done => {
      const options = {
        el,
        data () {
          return { lang: 'en' }
        }
      }

      if (version >= 2) {
        options.render = function (h) {
          return h('p', {}, [this.$t('message.hello', this.lang)])
        }
      } else {
        options.template = '<p>{{ $t("message.hello", lang) }}</p>'
      }

      const vm = new Vue(options)
      Vue.nextTick(() => {
        assert.equal(vm.$el.textContent, locales.en.message.hello)

        vm.lang = 'ja' // set japanese
        Vue.nextTick(() => {
          assert.equal(vm.$el.textContent, locales.ja.message.hello)
          done()
        })
      })
    })
  })


  describe('hot reload', () => {
    let el
    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
    })

    it('should translate', done => {
      const options = {
        el,
        data () {
          return { lang: 'en' }
        }
      }

      if (version >= 2) {
        options.render = function (h) {
          return h('p', {}, [this.$t('message.hello', this.lang)])
        }
      } else {
        options.template = '<p>{{ $t("message.hello", lang) }}</p>'
      }

      const vm = new Vue(options)

      Vue.nextTick(() => {
        assert.equal(vm.$el.textContent, locales.en.message.hello)

        // Update translation
        Object.keys(updatedLocales).forEach(lang => {
          Vue.locale(lang, updatedLocales[lang])
        })

        Vue.nextTick(() => {
          assert.equal(vm.$el.textContent, updatedLocales.en.message.hello)
          done()
        })
      })
    })
  })


  describe('translate component', () => {
    let el
    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
    })

    it('should translate', done => {
      const compOptions = {}
      if (version >= 2) {
        compOptions.render = function (h) {
          return h('p', {}, [this.$t('message.hoge')])
        }
      } else {
        compOptions.template = '<p>{{* $t("message.hoge") }}</p>'
      }

      const options = {
        el,
        components: { hoge: compOptions }
      }

      if (version >= 2) {
        options.render = function (h) {
          return h('div', {}, [
            h('p', {}, [this.$t('message.hello')]),
            h('hoge', {})
          ])
        }
      } else {
        options.template = '<div><p>{{ $t("message.hello") }}</p><hoge></hoge></div>'
      }

      const vm = new Vue(options)
      Vue.nextTick(() => {
        const children = vm.$el.querySelectorAll('p')
        assert.equal(children[0].innerText, locales.en.message.hello)
        assert.equal(children[1].innerText, locales.en.message.hoge)

        done()
      })
    })
  })


  describe('extend Vue.config', () => {
    describe('lang', () => {
      let vm
      beforeEach(done => {
        vm = new Vue()
        vm.$nextTick(done)
      })

      afterEach(done => {
        vm.$destroy()
        vm = null
        Vue.nextTick(done)
      })

      context('ja', () => {
        it('should translate with japanese', done => {
          Vue.config.lang = 'ja'
          Vue.nextTick(() => {
            assert.equal(vm.$t('message.hello'), locales.ja.message.hello)
            done()
          })
        })

        context('en', () => {
          it('should translate with english', done => {
            Vue.config.lang = 'en'
            Vue.nextTick(() => {
              assert.equal(vm.$t('message.hello'), locales.en.message.hello)
              done()
            })
          })
        })
      })
    })

    describe('component tree', () => {
      let el
      beforeEach(() => {
        el = document.createElement('div')
        document.body.appendChild(el)
      })

      it('should translate', done => {
        let vm
        const parentLocales = {
          en: { foo: { bar: 'hello parent' } },
          ja: { foo: { bar: 'こんにちは、親' } }
        }
        const child1Locales = {
          en: { foo: { bar: 'hello child1' } },
          ja: { foo: { bar: 'こんにちは、子1' } }
        }
        const child2Locales = {
          en: { foo: { bar: 'hello child2' } },
          ja: { foo: { bar: 'こんにちは、子2' } }
        }
        const child3Locales = {
          en: { foo: { bar: 'hello child3' } },
          ja: { foo: { bar: 'こんにちは、子3' } }
        }

        if (version >= 2) {
          vm = new Vue({
            render (h) {
              return h('div', [
                h('p', { attrs: { id: 'parent' } }, [this.$t('foo.bar')]),
                h('child1'),
                h('child2')
              ])
            },
            locales: parentLocales,
            components: {
              child1: {
                render (h) {
                  return h('div', [
                    h('p', { attrs: { id: 'child1' } }, [this.$t('foo.bar')]),
                    h('child3')
                  ])
                },
                locales: child1Locales,
                components: {
                  child3: {
                    render (h) {
                      return h('div', [
                        h('p', { attrs: { id: 'child3' } }, [this.$t('foo.bar')])
                      ])
                    },
                    locales: child3Locales
                  }
                }
              },
              child2: {
                render (h) {
                  return h('div', [
                    h('p', { attrs: { id: 'child2' } }, [this.$t('foo.bar')])
                  ])
                },
                locales: child2Locales
              }
            }
          })
        } else {
          vm = new Vue({
            template: `<div>
              <p id="parent">{{ $t("foo.bar") }}</p>
              <child1></child1>
              <child2></child2>
            </div>`,
            locales: parentLocales,
            components: {
              child1: {
                template: `<div>
                  <p id="child1">{{ $t("foo.bar") }}</p>
                  <child3></child3>
                </div>`,
                locales: child1Locales,
                components: {
                  child3: {
                    template: `<div>
                      <p id="child3">{{ $t("foo.bar") }}</p>
                    </div>`,
                    locales: child3Locales
                  }
                }
              },
              child2: {
                template: `<div>
                  <p id="child2">{{ $t("foo.bar") }}</p>
                </div>`,
                locales: child2Locales
              }
            }
          })
        }
        vm.$mount(el)

        const parent = vm.$el.querySelector('#parent')
        const child1 = vm.$el.querySelector('#child1')
        const child2 = vm.$el.querySelector('#child2')
        const child3 = vm.$el.querySelector('#child3')
        assert.equal(parent.textContent, 'hello parent')
        assert.equal(child1.textContent, 'hello child1')
        assert.equal(child2.textContent, 'hello child2')
        assert.equal(child3.textContent, 'hello child3')
        Vue.config.lang = 'ja'
        Vue.nextTick(() => {
          assert.equal(parent.textContent, 'こんにちは、親')
          assert.equal(child1.textContent, 'こんにちは、子1')
          assert.equal(child2.textContent, 'こんにちは、子2')
          assert.equal(child3.textContent, 'こんにちは、子3')
          done()
        })
      })
    })

    describe('fallbackLang', () => {
      let orgLang, orgFallbackLang
      beforeEach(done => {
        orgLang = Vue.config.lang
        orgFallbackLang = Vue.config.fallbackLang
        Vue.nextTick(done)
      })

      afterEach(done => {
        Vue.config.fallbackLang = orgFallbackLang
        Vue.config.lang = orgLang
        Vue.nextTick(done)
      })

      it('should be changed', done => {
        Vue.config.lang = 'ja'
        Vue.nextTick(() => {
          Vue.config.fallbackLang = 'ja'
          assert.equal(Vue.t('message.fallback1'), locales.ja.message.fallback1)
          done()
        })
      })
    })
  })
})
