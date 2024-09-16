describe('message function', () => {
  describe('simple', () => {
    it('should be worked', () => {
      i18n = new VueI18n({
        locale: 'ja',
        fallbackLocale: 'en',
        messages: {
          en: {
            hello: (ctx) => 'hello'
          },
          ja: {
            hello: (ctx) => 'こんにちは！'
          }
        }
      })
      assert.strictEqual(i18n.t('hello'), 'こんにちは！')
    })
  })

  describe('list argument', () => {
    it('should be worked', () => {
      i18n = new VueI18n({
        locale: 'ja',
        fallbackLocale: 'en',
        messages: {
          en: {
            hello: (ctx) => `hello, ${ctx.list(0)}!`
          },
          ja: {
            hello: (ctx) => `こんにちは、${ctx.list(0)}！`
          }
        }
      })
      assert.strictEqual(i18n.t('hello', ['kazupon']), 'こんにちは、kazupon！')
    })
  })

  describe('named argument', () => {
    it('should be worked', () => {
      i18n = new VueI18n({
        locale: 'ja',
        fallbackLocale: 'en',
        messages: {
          en: {
            hello: (ctx) => `hello, ${ctx.named('name')}!`
          },
          ja: {
            hello: (ctx) => `こんにちは、${ctx.named('name')}！`
          }
        }
      })
      assert.strictEqual(i18n.t('hello', { name: 'kazupon' }), 'こんにちは、kazupon！')
    })
  })

  it('receives formatter, values, path, messages, locale', () => {
    i18n = new VueI18n({
      locale: 'ja',
      fallbackLocale: 'en',
      messages: {
        en: {
          hello: (ctx) => ctx.formatter.interpolate(`hey {x} {y}`, ctx.values, ctx.path).join(''),
        },
        ja: {
          hello: (ctx) => ctx.formatter.interpolate(`hey {x} {y}`, ctx.values, ctx.path).join('') + ` ${ctx.messages[ctx.locale].world}`,
          world: 'w0r1d'
        }
      }
    })
    assert.strictEqual(i18n.t('hello', { x: 'foo', y: 'bar' }), 'hey foo bar w0r1d')
  })

  it('receives linked function for resolving linked messages', () => {
    i18n = new VueI18n({
      locale: 'en',
      messages: {
        en: {
          hello: (ctx) => `hello ${ctx.linked('foo')}`,
          foo: 'world'
        }
      }
    })
    assert.strictEqual(i18n.t('hello'), 'hello world')
  })
})
