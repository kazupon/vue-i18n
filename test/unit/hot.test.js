import messages from './fixture/index'

describe('hot reloading', () => {
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
    orgEnLocale = messages.en.message.hello
    orgJaLocaleMessage = messages.ja
    i18n = new VueI18n({
      locale: 'en',
      messages
    })

    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    messages.en.message.hello = orgEnLocale
    messages.ja = orgJaLocaleMessage
    i18n.messages = messages
  })

  it('should be reload', done => {
    const vm = new Vue({
      i18n,
      render (h) {
        return h('p', { ref: 'text' }, [this.$t('message.hello')])
      }
    }).$mount(el)

    const { text } = vm.$refs
    waitForUpdate(() => {
      assert.equal(text.textContent, messages.en.message.hello)
      // hot reload (set reactivity messages)
      messages.en.message.hello = expectEnLocale
      i18n.messages = messages
    }).then(() => {
      assert.equal(text.textContent, expectEnLocale)
      // upade locale
      i18n.setLocaleMessage('ja', expectJaLocaleMessage)
      i18n.locale = 'ja'
    }).then(() => {
      assert.equal(text.textContent, expectJaLocaleMessage.message.hello)
    }).then(done)
  })
})
