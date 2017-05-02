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
})
