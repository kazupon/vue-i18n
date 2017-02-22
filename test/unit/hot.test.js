import messages from './fixture/index'

describe('hot reloading', () => {
  let el
  let i18n
  let orgLocale
  const expectLocale = 'the world updated'

  beforeEach(() => {
    orgLocale = messages.en.message.hello
    i18n = new VueI18n({
      locale: 'en',
      messages
    })

    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    messages.en.message.hello = orgLocale
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
      messages.en.message.hello = expectLocale
      i18n.messages = messages
    }).then(() => {
      assert.equal(text.textContent, expectLocale)
    }).then(done)
  })
})
