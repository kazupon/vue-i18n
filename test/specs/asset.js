import assert from 'power-assert'
import Vue from 'vue'


describe('asset', () => {
  let locale
  const DELAY = 10

  beforeEach(() => {
    Vue.locale('en', null) // reset
  })

  describe('register sync', () => {
    it('should be registered', () => {
      const locale = {
        message: {
          foo: 'foo'
        }
      }
      Vue.locale('en', locale)
      assert.equal(Vue.locale('en'), locale)
    })
  })


  describe('regsiter async', () => {
    describe('promise like function', () => {
      describe('resolve', () => {
        beforeEach(done => {
          locale = { message: { bar: 'bar' } }
          Vue.locale('en', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                resolve(locale)
              }, DELAY)
            }
          })
          Vue.nextTick(done)
        })

        it('should be registered', done => {
          setTimeout(() => {
            assert.equal(Vue.locale('en'), locale)
            done()
          }, DELAY + 5)
        })
      })

      describe('reject', () => {
        beforeEach(done => {
          Vue.locale('en', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                reject()
              }, DELAY)
            }
          })
          Vue.nextTick(done)
        })

        it('should not be registered', done => {
          setTimeout(() => {
            assert.ok(!Vue.locale('en'))
            done()
          }, DELAY + 5)
        })
      })
    })

    describe('promise ', () => {
      describe('resolve', () => {
        beforeEach(done => {
          locale = { mesasge: { buz: 'buz' } }
          Vue.locale('en', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(locale)
              }, DELAY)
            })
          })
          Vue.nextTick(done)
        })

        it('should be registered', done => {
          setTimeout(() => {
            assert.equal(Vue.locale('en'), locale)
            done()
          }, DELAY + 5)
        })
      })

      describe('reject', () => {
        beforeEach(done => {
          Vue.locale('en', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject()
              }, DELAY)
            })
          })
          Vue.nextTick(done)
        })

        it('should not be registered', done => {
          setTimeout(() => {
            assert.ok(!Vue.locale('en'))
            done()
          }, DELAY + 5)
        })
      })
    })
  })
})
