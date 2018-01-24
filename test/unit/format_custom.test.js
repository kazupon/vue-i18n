import messages from './fixture/index'

describe('custom formatter', () => {
  describe('via i18n instance API calling', () => {
    it('should allows for specifying a custom formatter', done => {
      class CustomFormatter {
        interpolate (message, values) {
          assert.deepEqual({ name: 'joe' }, values)
          done()
        }
      }
      const formatter = new CustomFormatter()
      const i18n = new VueI18n({
        locale: 'en',
        messages,
        formatter
      })
      i18n.t('message.hello', 'ja', { name: 'joe' })
    })

    it('should interpolate messages without values', done => {
      class CustomFormatter {
        interpolate (message, values) {
          assert(values === null)
          done()
        }
      }
      const formatter = new CustomFormatter()
      const i18n = new VueI18n({
        locale: 'en',
        messages,
        formatter
      })
      i18n.t('message.hello')
    })
  })

  describe('via vue instance calling', () => {
    it('should allows for specifying a custom formatter', done => {
      const formatter = {
        interpolate: (message, values) => {
          assert.deepEqual([1, 2, 3], values)
          done()
        }
      }
      const vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          messages,
          formatter
        })
      })
      vm.$t('message.hello', [1, 2, 3])
    })
  })

  describe('via vue instance calling (mounted)', () => {
    let el

    beforeEach(done => {
      el = document.createElement('div')
      done()
    })

    it('should be inherited by components', done => {
      new Vue({
        i18n: new VueI18n({
          locale: 'en',
          formatter: {
            interpolate: (message, values) => {
              assert.deepEqual({ name: 'user' }, values)
              done()
              return ['pass']
            }
          }
        }),
        components: {
          'child-1': {
            render (h) {
              return h('div', {}, [
                h('p', {}, [this.$t('message', { name: 'user' })])
              ])
            },
            i18n: {
              messages: {
                en: { message: 'hello {name}' }
              }
            }
          }
        },
        render (h) {
          return h('div', {}, [
            h('child-1')
          ])
        }
      }).$mount(el)
    })
  })

  describe('i18n format getter/settter', () => {
    it('should be worked', done => {
      const i18n = new VueI18n({
        locale: 'en',
        messages
      })

      assert(i18n.formatter.constructor.name === 'BaseFormatter')
      const formatter = {
        interpolate: (message, values) => {
          assert.deepEqual([1, 2, 3], values)
          done()
        }
      }
      i18n.formatter = formatter
      i18n.t('message.hello', [1, 2, 3])
    })
  })
})
