import messages from './fixture/index'

describe('custom formatter', () => {
  describe('via i18n instance API calling', () => {
    it('should allows for specifying a custom formatter', done => {
      class CustomFormatter {
        format (message, ...args) {
          assert.deepEqual({ name: 'joe' }, args[0])
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
  })

  describe('via vue instance calling', () => {
    it('should allows for specifying a custom formatter', done => {
      class CustomFormatter {
        format (message, ...args) {
          assert.deepEqual([1, 2, 3], args[0])
          done()
        }
      }
      const formatter = new CustomFormatter()
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
})
