describe('custom blocks', () => {
  let i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'ja',
      messages: {
        en: { who: 'root' },
        ja: { who: 'ルート' }
      }
    })
  })

  describe('json string', () => {
    it('should be translated', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        components: {
          child: {
            __i18n: [JSON.stringify({
              en: { who: 'child' },
              ja: { who: '子' }
            })],
            render (h) {
              return h('div', {}, [
                h('p', { ref: 'who' }, [this.$t('who')])
              ])
            }
          }
        },
        render (h) {
          return h('div', {}, [h('child', { ref: 'child' })])
        }
      }).$mount(el)
      Vue.nextTick().then(() => {
        assert.strictEqual(vm.$refs.child.$refs.who.textContent, '子')
        i18n.locale = 'en'
      }).then(() => {
        assert.strictEqual(vm.$refs.child.$refs.who.textContent, 'child')
      }).then(done)
    })
  })

  describe('invalid json string', () => {
    it('should be fallbacked translation', done => {
      const spy = sinon.spy(console, 'warn')
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        components: {
          child: {
            __i18n: 'foo',
            render (h) {
              return h('div', {}, [
                h('p', { ref: 'who' }, [this.$t('who')])
              ])
            }
          }
        },
        render (h) {
          return h('div', {}, [h('child', { ref: 'child' })])
        }
      }).$mount(el)
      Vue.nextTick().then(() => {
        assert.strictEqual(vm.$refs.child.$refs.who.textContent, 'ルート')
        i18n.locale = 'en'
      }).then(() => {
        assert.strictEqual(vm.$refs.child.$refs.who.textContent, 'root')
        spy.restore()
      }).then(done)
    })
  })

  describe('sharedMessages option', () => {
    it('should be translated', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        components: {
          child: {
            __i18n: [JSON.stringify({
              en: { who: 'child' },
              ja: { who: '子' }
            })],
            i18n: {
              sharedMessages: {
                en: { foo: 'foo' },
                ja: { foo: 'フー' }
              }
            },
            render (h) {
              return h('div', {}, [
                h('p', { ref: 'foo' }, [this.$t('foo')])
              ])
            }
          }
        },
        render (h) {
          return h('div', {}, [h('child', { ref: 'child' })])
        }
      }).$mount(el)
      Vue.nextTick().then(() => {
        assert.strictEqual(vm.$refs.child.$refs.foo.textContent, 'フー')
        i18n.locale = 'en'
      }).then(() => {
        assert.strictEqual(vm.$refs.child.$refs.foo.textContent, 'foo')
      }).then(done)
    })
  })

  describe('bridge mode', () => {
    it('should be translated', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        components: {
          child: {
            __i18nBridge: [JSON.stringify({
              en: { who: 'child' },
              ja: { who: '子' }
            })],
            render (h) {
              return h('div', {}, [
                h('p', { ref: 'who' }, [this.$t('who')])
              ])
            }
          }
        },
        render (h) {
          return h('div', {}, [h('child', { ref: 'child' })])
        }
      }).$mount(el)
      Vue.nextTick().then(() => {
        assert.strictEqual(vm.$refs.child.$refs.who.textContent, '子')
        i18n.locale = 'en'
      }).then(() => {
        assert.strictEqual(vm.$refs.child.$refs.who.textContent, 'child')
      }).then(done)
    })
  })
})
