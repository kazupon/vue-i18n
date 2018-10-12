const assert = require('assert')
const Vue = require('vue')
const VueI18n = require('../../dist/vue-i18n.js')
const { createRenderer } = require('vue-server-renderer')

describe('basic', () => {
  describe('i18n', () => {
    it('will fail to instantiate under NodeJS', () => {
      let i18n

      try {
        i18n = new VueI18n({
          locale: 'en',
          fallbackLocale: 'en',
          messages: {}
        })
      } catch (e) {
        return assert.ok(true)
      }

      if (i18n) assert.fail('i18n was not expected to initialize under Node')
    })
    describe('when passing Vue as an argument', () => {
      it('instantiates', () => {
        const i18n = new VueI18n({
          locale: 'en',
          fallbackLocale: 'en',
          messages: {},
          Vue
        })
        return new Vue({ i18n })
      })

      it('instantiates & renders', (done) => {
        const i18n = new VueI18n({
          locale: 'en',
          fallbackLocale: 'en',
          messages: {},
          Vue
        })
        const app = new Vue({
          i18n,
          render: () => ''
        })
        const renderer = createRenderer({})
        renderer.renderToString(app, (error, html) => {
          assert.ifError(error)
          assert.equal(html, '<!---->')
          done()
        })
      })
    })
  })
})
