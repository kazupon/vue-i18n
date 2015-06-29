/**
 * Import(s)
 */

var Vue = require('../../node_modules/vue/dist/vue')
var i18n = require('../../index')


describe('i18n', function () {
  var locales = {
    en: {
      message: {
        hello: 'the world',
        hoge: 'hoge',
        format: {
          named: 'Hello {name}, how are you?',
          list: 'Hello {0}, how are you?'
        }
      },
      'hello world': 'Hello World',
      'Hello {0}': 'Hello {0}'
    },
    ja: {
      message: {
        hello: 'ザ・ワールド',
        hoge: 'ほげ',
        format: {
          named: 'こんにちは {name}, ごきげんいかが？',
          list: 'こんにちは {0}, ごきげんいかが？'
        }
      }
    }
  }

  before(function () {
    Vue.use(i18n, {
      lang: 'en',
      locales: locales
    })
  })


  describe('$t', function () {
    describe('en language locale', function () {
      it('should translate an english', function () {
        var vm = new Vue()
        expect(vm.$t('message.hello')).to.be.eql(locales.en.message.hello)
      })
    })

    describe('ja language locale', function () {
      it('should translate a japanese', function () {
        var vm = new Vue()
        expect(vm.$t('message.hello', 'ja')).to.be.eql(locales.ja.message.hello)
      })
    })

    describe('key argument', function () {
      describe('not specify', function () {
        it('should return empty string', function () {
          var vm = new Vue()
          expect(vm.$t()).to.be.eql('')
        })
      })

      describe('empty string', function () {
        it('should return empty string', function () {
          var vm = new Vue()
          expect(vm.$t('')).to.be.eql('')
        })
      })

      describe('not regist key', function () {
        it('should return key string', function () {
          var vm = new Vue()
          expect(vm.$t('foo.bar')).to.be.eql('foo.bar')
        })
      })

      describe('sentence fragment', function () {
        it('should translate fragment', function () {
          var vm = new Vue()
          expect(vm.$t('hello world')).to.be.eql('Hello World')
        })

        it('should return replaced string if available', function () {
          var vm = new Vue()
          expect(vm.$t('Hello {0}', ['kazupon']))
            .to.be.eql('Hello kazupon')
        })

        it('should return key if unavailable', function () {
          var vm = new Vue()
          expect(vm.$t('Hello')).to.be.eql('Hello')
        })
      })
    })

    describe('format arguments', function () {
      describe('named', function () {
        it('should return replaced string', function () {
          var vm = new Vue()
          expect(vm.$t('message.format.named', { name: 'kazupon' }))
            .to.be.eql('Hello kazupon, how are you?')
        })
      })

      describe('list', function () {
        it('should return replaced string', function () {
          var vm = new Vue()
          expect(vm.$t('message.format.list', ['kazupon']))
            .to.be.eql('Hello kazupon, how are you?')
        })
      })
    })

    describe('language argument', function () {
      it('should return empty string', function () {
        var vm = new Vue()
        expect(vm.$t('message.hello', 'ja')).to.be.eql(locales.ja.message.hello)
      })
    })

    describe('format & language arguments', function () {
      it('should return replaced string', function () {
        var vm = new Vue()
        expect(vm.$t('message.format.list', 'ja', ['kazupon']))
          .to.be.eql('こんにちは kazupon, ごきげんいかが？')
      })
    })
  })


  describe('reactive translation', function () {
    it('should translate', function (done) {
      var ViewModel = Vue.extend({
        template: '<div><p>{{ $t("message.hello", lang) }}</p></div>',
        data: function () {
          return { lang: 'en' }
        },
        el: function () {
          var el = document.createElement('div')
          el.id = 'translate-reactive'
          document.body.appendChild(el)
          return el
        }
      })

      var vm = new ViewModel()
      var el = document.querySelector('#translate-reactive')
      Vue.nextTick(function () {
        expect(el.textContent).to.be.eql(locales.en.message.hello)

        vm.$set('lang', 'ja') // set japanese
        Vue.nextTick(function () {
          expect(el.textContent).to.be.eql(locales.ja.message.hello)
          done()
        })
      })
    })
  })


  describe('translate component', function () {
    it('should translate', function (done) {
      var ViewModel = Vue.extend({
        template: '<div><p>{{ $t("message.hello") }}</p><hoge></hoge></div>',
        el: function () {
          var el = document.createElement('div')
          el.id = 'translate-parent'
          document.body.appendChild(el)
          return el
        },
        components: {
          hoge: {
            template: '<p id="translate-child">{{* $t("message.hoge") }}</p>'
          }
        }
      })
      new ViewModel()

      Vue.nextTick(function () {
        var child_el = document.querySelector('#translate-child')
        expect(child_el.textContent).to.be.eql(locales.en.message.hoge)

        var parent_el = document.querySelector('#translate-parent p')
        expect(parent_el.textContent).to.be.eql(locales.en.message.hello)

        done()
      })
    })
  })
})
