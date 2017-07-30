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
      nextTick(() => {
        assert.equal(vm.$refs.child.$refs.who.textContent, '子')
        i18n.locale = 'en'
      }).then(() => {
        assert.equal(vm.$refs.child.$refs.who.textContent, 'child')
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
      nextTick(() => {
        assert.equal(vm.$refs.child.$refs.who.textContent, 'ルート')
        i18n.locale = 'en'
      }).then(() => {
        assert.equal(vm.$refs.child.$refs.who.textContent, 'root')
        spy.restore()
      }).then(done)
    })
  })
})
