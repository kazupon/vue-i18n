import messages from './fixture/index'

describe('filter translation', () => {
  let i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      messages
    })
  })

  function createVM (options) {
    const el = document.createElement('div')
    return new Vue(options).$mount(el)
  }

  describe('filter', () => {
    describe('t', () => {
      it('should be translated', done => {
        const vm = createVM({
          i18n,
          render (h) {
            // <p ref="text">{ 'message.hello' | t }</p>
            return h('p', { ref: 'text' }, [this.$options.filters.t('message.hello')])
          }
        })
        nextTick(() => {
          assert.strictEqual(vm.$refs.text.textContent, messages.en.message.hello)
          vm.$forceUpdate()
        }).then(() => {
          assert.strictEqual(vm.$refs.text.textContent, messages.en.message.hello)
        }).then(done)
      })
    })

    describe('te', () => {
      it('should be translated', done => {
        const vm = createVM({
          i18n,
          render (h) {
            // <p ref="text">{ 'message.hello' | te }</p>
            return h('p', { ref: 'text' }, [JSON.stringify(this.$options.filters.te('message.hello'))])
          }
        })
        nextTick(() => {
          assert.strictEqual(vm.$refs.text.textContent, 'true')
          vm.$forceUpdate()
        }).then(() => {
          assert.strictEqual(vm.$refs.text.textContent, 'true')
        }).then(done)
      })
    })

    describe('tc', () => {
      it('should be translated', done => {
        const vm = createVM({
          i18n,
          render (h) {
            // <p ref="text">{ 'plurals.car' | tc(1) }</p>
            return h('p', { ref: 'text' }, [this.$options.filters.tc('plurals.car', 1)])
          }
        })
        nextTick(() => {
          assert.strictEqual(vm.$refs.text.textContent, 'car')
          vm.$forceUpdate()
        }).then(() => {
          assert.strictEqual(vm.$refs.text.textContent, 'car')
        }).then(done)
      })
    })
  })
})
