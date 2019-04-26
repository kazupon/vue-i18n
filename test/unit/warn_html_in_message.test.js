describe('warnHtmlInMessage', () => {
  let spyWarn
  let spyError
  beforeEach(() => {
    spyWarn = sinon.spy(console, 'warn')
    spyError = sinon.spy(console, 'error')
  })
  afterEach(() => {
    spyWarn.restore()
    spyError.restore()
  })

  describe('constructor option', () => {
    it('should be worked', () => {
      const messages = {
        en: {
          message: {
            foo: {
              buz: '<p>buz</p>',
              hello: 'hello'
            },
            bar: [1, { buz: '<p>buz</p>' }],
            buz: 22
          }
        },
        ja: { message: '<p>こんにちは</p>' }
      }

      // `off`
      new VueI18n({
        warnHtmlInMessage: 'off',
        messages
      })
      assert(spyWarn.callCount === 0)
      assert(spyError.callCount === 0)

      // `warn`
      new VueI18n({
        warnHtmlInMessage: 'warn',
        messages
      })
      assert(spyWarn.callCount === 3)
      assert(spyError.callCount === 0)

      // `error`
      new VueI18n({
        warnHtmlInMessage: 'error',
        messages
      })
      assert(spyWarn.callCount === 3)
      assert(spyError.callCount === 3)
    })
  })

  describe('property', () => {
    it('should be worked', () => {
      const messages = {
        en: {
          message: {
            foo: {
              buz: '<p>buz</p>'
            },
            bar: [1, '<p>bar</p>'],
            buz: 22
          }
        },
        ja: { message: '<p>こんにちは</p>' }
      }

      const i18n = new VueI18n({
        warnHtmlInMessage: 'off',
        messages
      })

      // `warn`
      i18n.warnHtmlInMessage = 'warn'
      assert(spyWarn.callCount === 3)
      assert(spyError.callCount === 0)

      // `error`
      i18n.warnHtmlInMessage = 'error'
      assert(spyWarn.callCount === 3)
      assert(spyError.callCount === 3)

      // `off`
      i18n.warnHtmlInMessage = 'off'
      assert(spyWarn.callCount === 3)
      assert(spyError.callCount === 3)
    })
  })

  describe('setLocaleMessage', () => {
    it('should be worked', () => {
      const i18n = new VueI18n({
        warnHtmlInMessage: 'warn',
        messages: {
          en: {},
          ja: {}
        }
      })

      i18n.setLocaleMessage('en', {
        hello: '<p>hello</p>'
      })
      assert(spyWarn.callCount === 1)
      assert(spyError.callCount === 0)

      i18n.warnHtmlInMessage = 'error'
      i18n.setLocaleMessage('ja', {
        hello: '<p>こんにちは</p>'
      })
      assert(spyWarn.callCount === 1)
      assert(spyError.callCount === 2)

      i18n.warnHtmlInMessage = 'off'
      assert(spyWarn.callCount === 1)
      assert(spyError.callCount === 2)
    })
  })

  describe('mergeLocaleMessage', () => {
    it('should be worked', () => {
      const i18n = new VueI18n({
        warnHtmlInMessage: 'warn',
        messages: {
          en: {},
          ja: {}
        }
      })

      i18n.mergeLocaleMessage('en', {
        hello: '<p>hello</p>'
      })
      assert(spyWarn.callCount === 1)
      assert(spyError.callCount === 0)

      i18n.warnHtmlInMessage = 'error'
      i18n.mergeLocaleMessage('ja', {
        hello: '<p>こんにちは</p>'
      })
      assert(spyWarn.callCount === 1)
      assert(spyError.callCount === 2)

      i18n.warnHtmlInMessage = 'off'
      assert(spyWarn.callCount === 1)
      assert(spyError.callCount === 2)
    })
  })
})
