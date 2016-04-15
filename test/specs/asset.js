import assert from 'power-assert'
import Vue from 'vue'


describe('asset', () => {
  const DELAY = 10

  describe('sync', () => {
    it('should be translated', () => {
      Vue.locale('en', {
        message: {
          foo: 'foo'
        }
      })
      assert(Vue.t('message.foo') === 'foo')
    })
  })


  describe('async', () => {
    describe('promise like function', () => {
      beforeEach((done) => {
        Vue.locale('en', () => {
          return (resolve, reject) => {
            setTimeout(() => {
              resolve({ message: { bar: 'bar' } })
            }, DELAY)
          }
        })
        Vue.nextTick(done)
      })

      it('should be translated', (done) => {
        setTimeout(() => {
          assert(Vue.t('message.bar') === 'bar')
          done()
        }, DELAY + 5)
      })
    })

    describe('promise ', () => {
      beforeEach((done) => {
        Vue.locale('en', () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ message: { buz: 'buz' } })
            }, DELAY)
          })
        })
        Vue.nextTick(done)
      })

      it('should be translated', (done) => {
        setTimeout(() => {
          assert(Vue.t('message.buz') === 'buz')
          done()
        }, DELAY + 5)
      })
    })
  })
})
