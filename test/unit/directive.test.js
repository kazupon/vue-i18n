import messages from './fixture/index'

describe('custom directive', () => {
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

  describe('v-t', () => {
    describe('string literal', () => {
      it('should be translated', done => {
        const vm = createVM({
          i18n,
          render (h) {
            // <p ref="text" v-t="'message.hello'"></p>
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t', value: ('message.hello'), expression: "'message.hello'"
            }] })
          }
        })
        nextTick(() => {
          assert.equal(vm.$refs.text.textContent, messages.en.message.hello)
          assert.equal(vm.$refs.text._vt, messages.en.message.hello)
          vm.$forceUpdate()
        }).then(() => {
          assert.equal(vm.$refs.text.textContent, messages.en.message.hello)
          assert.equal(vm.$refs.text._vt, messages.en.message.hello)
        }).then(done)
      })
    })

    describe('object', () => {
      it('should be translated', done => {
        const vm = createVM({
          i18n,
          data: {
            msgPath: 'message.format.named'
          },
          render (h) {
            // <p ref="text" v-t="{ path: msgPath, locale: 'ja', args: { name: 'kazupon' } }"></p>
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t',
              value: ({ path: this.msgPath, locale: 'ja', args: { name: 'kazupon' } }),
              expression: "{ path: msgPath, locale: 'ja', args: { name: 'kazupon' } }"
            }] })
          }
        })
        const expected = 'こんにちは kazupon, ごきげんいかが？'
        nextTick(() => {
          assert.equal(vm.$refs.text.textContent, expected)
          assert.equal(vm.$refs.text._vt, expected)
          vm.$forceUpdate()
        }).then(() => {
          assert.equal(vm.$refs.text.textContent, expected)
          assert.equal(vm.$refs.text._vt, expected)
        }).then(done)
      })
    })

    describe('locale reactivity', () => {
      it('should be translated', done => {
        let expected = ''
        const vm = createVM({
          i18n,
          data: {
            msgPath: 'message.format.named'
          },
          render (h) {
            // <p ref="text" v-t="{ path: msgPath, args: { name: 'kazupon' } }"></p>
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t',
              value: ({ path: this.msgPath, args: { name: 'kazupon' } }),
              expression: "{ path: msgPath, args: { name: 'kazupon' } }"
            }] })
          }
        })
        nextTick(() => {
          expected = 'Hello kazupon, how are you?'
          assert.equal(vm.$refs.text.textContent, expected)
          assert.equal(vm.$refs.text._vt, expected)
          assert.equal(vm.$refs.text._locale, 'en')
          vm.$i18n.locale = 'ja' // change locale
          vm.$forceUpdate()
        }).then(() => {
          expected = 'こんにちは kazupon, ごきげんいかが？'
          assert.equal(vm.$refs.text.textContent, expected)
          assert.equal(vm.$refs.text._vt, expected)
          assert.equal(vm.$refs.text._locale, 'ja')
        }).then(done)
      })
    })

    describe('not support warning', () => {
      it('should be warned', done => {
        const spy = sinon.spy(console, 'warn')
        createVM({
          i18n,
          render (h) {
            // <p ref="text" v-t="[1]"></p>
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t', value: ([1]), expression: '[1]'
            }] })
          }
        })
        nextTick(() => {
          assert(spy.notCalled === false)
          assert(spy.callCount === 1)
          spy.restore()
        }).then(done)
      })
    })

    describe('path required warning', () => {
      it('should be warned', done => {
        const spy = sinon.spy(console, 'warn')
        createVM({
          i18n,
          render (h) {
            // <p ref="text" v-t="{ locale: 'ja', args: { name: 'kazupon' } }"></p>
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t',
              value: ({ locale: 'ja', args: { name: 'kazupon' } }),
              expression: "{ locale: 'ja', args: { name: 'kazupon' } }"
            }] })
          }
        })
        nextTick(() => {
          assert(spy.notCalled === false)
          assert(spy.callCount === 1)
          spy.restore()
        }).then(done)
      })
    })

    describe('VueI18n instance warning', () => {
      it('should be warned', done => {
        const spy = sinon.spy(console, 'warn')
        createVM({
          render (h) {
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t', value: ('message.hello'), expression: "'message.hello'"
            }] })
          }
        })
        nextTick(() => {
          assert(spy.notCalled === false)
          assert(spy.callCount === 1)
          spy.restore()
        }).then(done)
      })
    })

    describe('pluralize', () => {
      it('should be singular', done => {
        const vm = createVM({
          i18n,
          render (h) {
            // <p ref="text" v-t="{path: 'plurals.car', choice: 1}"></p>
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t', value: ({ path: 'plurals.car', choice: 1 }), expression: { path: 'plurals.car', choice: 1 }
            }] })
          }
        })
        nextTick(() => {
          assert.equal(vm.$refs.text.textContent, 'car')
          assert.equal(vm.$refs.text._vt, 'car')
          vm.$forceUpdate()
        }).then(() => {
          assert.equal(vm.$refs.text.textContent, 'car')
          assert.equal(vm.$refs.text._vt, 'car')
        }).then(done)
      })

      it('should be plural', done => {
        const vm = createVM({
          i18n,
          render (h) {
            // <p ref="text" v-t="{path: 'plurals.car', choice: 2}"></p>
            return h('p', { ref: 'text', directives: [{
              name: 't', rawName: 'v-t', value: ({ path: 'plurals.car', choice: 2 }), expression: { path: 'plurals.car', choice: 2 }
            }] })
          }
        })
        nextTick(() => {
          assert.equal(vm.$refs.text.textContent, 'cars')
          assert.equal(vm.$refs.text._vt, 'cars')
          vm.$forceUpdate()
        }).then(() => {
          assert.equal(vm.$refs.text.textContent, 'cars')
          assert.equal(vm.$refs.text._vt, 'cars')
        }).then(done)
      })
    })
  })
})
