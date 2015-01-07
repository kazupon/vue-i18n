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
        hoge: 'hoge'
      }
    },
    ja: {
      message: {
        hello: 'ザ・ワールド',
        hoge: 'ほげ'
      }
    }
  }


  describe('Vue.t', function () {
    describe('en', function () {
      it('should translate an english', function () {
        Vue.use(i18n, {
          lang: 'en',
          locales: locales
        })

        expect(Vue.t('message.hello')).to.be.eql(locales.en.message.hello)
      })
    })

    describe('ja', function () {
      it('should translate a japanese', function () {
        Vue.use(i18n, {
          lang: 'ja',
          resources: locales
        })

        expect(Vue.t('message.hello')).to.be.eql(locales.ja.message.hello)
      })
    })
  })


  describe('v-t', function () {
    var vm, targetVM

    before(function () {
      Vue.config.async = false
    })

    after(function () {
      Vue.config.async = true
    })

    describe('basic', function () {
      describe('en', function () {
        it('should translate an english', function () {
          Vue.use(i18n, {
            lang: 'en',
            locales: locales
          })
          
          var ViewModel = Vue.extend({
            template: '<p v-t="message.hello"></p>',
            el: function () {
              var el = document.createElement('div')
              el.id = 'translate-en'
              document.body.appendChild(el)
              return el
            }
          })
          new ViewModel()

          expect(document.querySelector('#translate-en p').textContent)
            .to.be.eql(locales.en.message.hello)
        })
      })

      describe('ja', function () {
        it('should translate a japanese', function () {
          Vue.use(i18n, {
            lang: 'ja',
            resources: locales
          })

          var ViewModel = Vue.extend({
            template: '<p v-t="message.hello"></p>',
            el: function () {
              var el = document.createElement('div')
              el.id = 'translate-ja'
              document.body.appendChild(el)
              return el
            }
          })
          new ViewModel()

          expect(document.querySelector('#translate-ja p').textContent)
            .to.be.eql(locales.ja.message.hello)
        })
      })
    })

    describe('lang resource not found', function () {
      it('should not translate', function () {
        Vue.use(i18n, {
          lang: 'it',
          locales: locales
        })

        var ViewModel = Vue.extend({
          template: '<p v-t="message.hello"></p>',
          el: function () {
            var el = document.createElement('div')
            el.id = 'translate-it'
            document.body.appendChild(el)
            return el
          }
        })
        new ViewModel()

        expect(document.querySelector('#translate-it p').textContent)
          .to.be.eql('message.hello')
      })
    })

    describe('resource key not found', function () {
      it('should not translate', function () {
        Vue.use(i18n, {
          lang: 'en',
          locales: locales
        })

        var ViewModel = Vue.extend({
          template: '<p v-t="message.foo"></p>',
          el: function () {
            var el = document.createElement('div')
            el.id = 'translate-en-key-nothing'
            document.body.appendChild(el)
            return el
          }
        })
        new ViewModel()

        expect(document.querySelector('#translate-en-key-nothing p').textContent)
          .to.be.eql('message.foo')
      })
    })

    describe('resource key empty', function () {
      it('should not translate', function () {
        Vue.use(i18n, {
          lang: 'en',
          locales: locales
        })

        var ViewModel = Vue.extend({
          template: '<p v-t=""></p>',
          el: function () {
            var el = document.createElement('div')
            el.id = 'translate-key-empty'
            document.body.appendChild(el)
            return el
          }
        })
        new ViewModel()

        expect(document.querySelector('#translate-key-empty p').
          textContent).to.be.eql('')
      })
    })

    describe('translate component module', function () {
      it('should translate', function () {
        Vue.use(i18n, {
          lang: 'en',
          locales: locales
        })

        var ViewModel = Vue.extend({
          template: '<div><p v-t="message.hello"></p><div v-component="hoge"></div></div>',
          el: function () {
            var el = document.createElement('div')
            el.id = 'translate-parent'
            document.body.appendChild(el)
            return el
          },
          components: {
            hoge: Vue.extend({
              template: '<p id="translate-child" v-t="message.hoge"></p>'
            })
          }
        })
        new ViewModel()

        var child_el = document.querySelector('#translate-child')
        expect(child_el.textContent).to.be.eql(locales.en.message.hoge)

        var parent_el = document.querySelector('#translate-parent p')
        expect(parent_el.textContent).to.be.eql(locales.en.message.hello)
      })
    })
  })
})
