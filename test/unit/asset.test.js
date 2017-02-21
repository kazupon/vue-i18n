/*
describe('asset', () => {
  let locale

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
        it('should be registered', done => {
          locale = { message: { bar: 'bar' } }
          Vue.locale('en', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                resolve(locale)
              }, 0)
            }
          }, () => {
            assert.equal(Vue.locale('en'), locale)
            done()
          })
        })
      })

      describe('reject', () => {
        it('should not be registered', done => {
          Vue.locale('en', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                reject()
              }, 0)
            }
          }, () => {
            assert.ok(!Vue.locale('en'))
            done()
          })
        })
      })
    })

    describe('promise ', () => {
      describe('resolve', () => {
        it('should be registered', done => {
          locale = { mesasge: { buz: 'buz' } }
          Vue.locale('en', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(locale)
              }, 0)
            })
          }, () => {
            assert.equal(Vue.locale('en'), locale)
            done()
          })
        })
      })

      describe('reject', () => {
        it('should not be registered', done => {
          Vue.locale('en', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject()
              }, 0)
            })
          }, () => {
            assert.ok(!Vue.locale('en'))
            done()
          })
        })
      })
    })
  })
})
*/
