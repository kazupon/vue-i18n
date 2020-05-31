import messages from './fixture/index'

describe('message', () => {
  let el
  let i18n
  let orgEnLocale
  let orgJaLocaleMessage
  const expectEnLocale = 'the world updated'
  const expectJaLocaleMessage = {
    message: {
      hello: 'ザ・世界 -> メイド・イン・ヘブン'
    }
  }

  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      messages
    })
    orgEnLocale = i18n.getLocaleMessage('en').message.hello
    orgJaLocaleMessage = i18n.getLocaleMessage('ja')

    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    messages.en.message.hello = orgEnLocale
    i18n.setLocaleMessage('en', messages.en)
    i18n.setLocaleMessage('ja', orgJaLocaleMessage)
  })

  describe('messages', () => {
    it('should be workd', () => {
      assert.deepEqual(messages, i18n.messages)
    })
  })

  describe('getLocaleMessage / setLocaleMessage', () => {
    it('should be worked', done => {
      const vm = new Vue({
        i18n,
        render (h) {
          return h('p', { ref: 'text' }, [this.$t('message.hello')])
        }
      }).$mount(el)

      const { text } = vm.$refs
      Vue.nextTick().then(() => {
        assert.strictEqual(text.textContent, messages.en.message.hello)
        // hot reload (set reactivity messages)
        messages.en.message.hello = expectEnLocale
        i18n.setLocaleMessage('en', messages.en)
      }).then(() => {
        assert.strictEqual(text.textContent, expectEnLocale)
        // upade locale
        i18n.setLocaleMessage('ja', expectJaLocaleMessage)
        i18n.locale = 'ja'
      }).then(() => {
        assert.strictEqual(text.textContent, expectJaLocaleMessage.message.hello)
      }).then(done)
    })
  })

  describe('mergeLocaleMessage', () => {
    it('should be merged', () => {
      i18n = new VueI18n({
        locale: 'en',
        messages: {
          en: {
            foo: 'bar'
          },
          ja: {
            foo: 'バー'
          }
        }
      })
      i18n.mergeLocaleMessage('en', { bar: 'foo' })
      assert.deepEqual({ foo: 'bar', bar: 'foo' }, i18n.getLocaleMessage('en'))
    })
  })

  it('Should be merged and notified if the target is empty', (done) => {
    const i18n = new VueI18n({
      locale: 'ru',
      messages: {
        ru: {}
      }
    })
    const uw = i18n._vm.$watch('messages.ru.foo', (newVal, oldVal, o) => {
      assert.equal(newVal, 'бар')
      uw()
      done()
    })
    i18n.mergeLocaleMessage('ru', { foo: 'бар' })
    assert.deepEqual({ foo: 'бар' }, i18n.getLocaleMessage('ru'))
  })
})
