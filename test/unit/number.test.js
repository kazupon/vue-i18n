import numberFormats from './fixture/number'

function convertToCharCodes (str) {
  const codes = []
  for (let i = 0; i < str.length; i++) {
    codes.push(str.charCodeAt(i))
  }
  return codes
}

const desc = VueI18n.availabilities.numberFormat ? describe : describe.skip
desc('number format', () => {
  describe('numberFormats', () => {
    it('should be worked', done => {
      const i18n = new VueI18n({
        locale: 'en-US',
        numberFormats
      })
      nextTick(() => {
        assert.deepEqual(numberFormats, i18n.numberFormats)
      }).then(done)
    })
  })

  describe('getNumberFormat / setNumberFormat', () => {
    it('should be worked', done => {
      const i18n = new VueI18n({
        locale: 'en-US',
        numberFormats
      })
      const el = document.createElement('div')
      document.body.appendChild(el)

      const money = 101
      const vm = new Vue({
        i18n,
        render (h) {
          return h('p', { ref: 'text' }, [this.$n(money, 'currency')])
        }
      }).$mount(el)

      const { text } = vm.$refs
      const zhFormat = {
        currency: {
          style: 'currency', currency: 'CNY', currencyDisplay: 'name'
        }
      }
      nextTick(() => {
        assert.strictEqual(text.textContent, '$101.00')
        i18n.setNumberFormat('zh-CN', zhFormat)
        assert.deepEqual(i18n.getNumberFormat('zh-CN'), zhFormat)
        i18n.locale = 'zh-CN'
      }).then(() => {
        // NOTE: avoid webkit (safari/phantomjs) & Intl polyfill wired localization...
        if (isChrome) {
          const actual = [49, 48, 49, 46, 48, 48, 20154, 27665, 24065] // 101.00人民币
          const target = convertToCharCodes(text.textContent)
          assert.deepEqual(target, actual)
        }
      }).then(done)
    })
  })

  describe('mergeNumberFormat', () => {
    it('should be merged', () => {
      const i18n = new VueI18n({
        locale: 'ja-JP',
        numberFormats
      })
      const percent = { style: 'percent' }
      i18n.mergeNumberFormat('en-US', { percent })
      assert.deepEqual(percent, i18n.getNumberFormat('en-US').percent)
    })
  })
})
