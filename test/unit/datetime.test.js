import dateTimeFormats from './fixture/datetime'

const desc = VueI18n.availabilities.dateTimeFormat ? describe : describe.skip
desc('datetime format', () => {
  describe('dateTimeFormats', () => {
    it('should be worked', done => {
      const i18n = new VueI18n({
        locale: 'en-US',
        dateTimeFormats
      })
      nextTick(() => {
        assert.deepEqual(dateTimeFormats, i18n.dateTimeFormats)
      }).then(done)
    })
  })

  describe('getDateTimeFormat / setDateTimeFormat', () => {
    it('should be worked', done => {
      const i18n = new VueI18n({
        locale: 'en-US',
        dateTimeFormats
      })
      const el = document.createElement('div')
      document.body.appendChild(el)

      const dt = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
      const vm = new Vue({
        i18n,
        render (h) {
          return h('p', { ref: 'text' }, [this.$d(dt, 'short')])
        }
      }).$mount(el)

      const { text } = vm.$refs
      const zhFormat = {
        short: {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        }
      }

      nextTick(() => {
        // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
        isChrome && assert.equal(text.textContent, '12/19/2012, 10:00 PM')
        i18n.setDateTimeFormat('zh-CN', zhFormat)
        assert.deepEqual(i18n.getDateTimeFormat('zh-CN'), zhFormat)
        i18n.locale = 'zh-CN'
      }).then(() => {
        // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
        isChrome && assert.equal(text.textContent, '2012/12/20 下午12:00')
      }).then(done)
    })
  })

  describe('mergeDateTimeFormat', () => {
    it('should be merged', () => {
      const i18n = new VueI18n({
        locale: 'ja-JP',
        dateTimeFormats
      })
      const short = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      }
      i18n.mergeDateTimeFormat('en-US', { short })
      assert.deepEqual(short, i18n.getDateTimeFormat('en-US').short)
    })
  })
})
