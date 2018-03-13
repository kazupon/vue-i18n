describe('missing', () => {
  describe('via i18n instance API', () => {
    it('should be handled translate missing', done => {
      const i18n = new VueI18n({
        locale: 'en',
        missing: (locale, key, vm) => {
          assert.equal('en', locale)
          assert.equal('foo.bar.buz', key)
          assert(vm === null)
          done()
        }
      })

      i18n.t('foo.bar.buz')
    })
  })

  describe('via vue instance', () => {
    it('should be handled translate missing', done => {
      const vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          missing: (locale, key, instance) => {
            assert.equal('en', locale)
            assert.equal('foo.bar.buz', key)
            assert(vm === instance)
            done()
          }
        })
      })
      vm.$t('foo.bar.buz')
    })
  })

  describe('i18n missing getter/setter', () => {
    it('should be worked', done => {
      const missing = (locale, key) => {
        assert(false)
      }
      const i18n = new VueI18n({
        locale: 'en',
        missing
      })

      assert.equal(missing, i18n.missing)

      i18n.missing = (locale, key, vm) => {
        done()
      }
      i18n.t('foo.bar.buz')
    })
  })

  describe('i18n missing values', () => {
    it('should receive the values for interpolation', done => {
      const testValues = {
        foo: 'bar',
        num: 1234
      }

      const missing = (locale, key, vm, values) => {
        assert.equal('en', locale)
        assert.equal('cannot.find', key)
        // `values` is normalized to be an array.
        assert.equal('bar', values[0].foo)
        assert.equal(1234, values[0].num)
        done()
      }

      const i18n = new VueI18n({
        locale: 'en',
        missing
      })

      i18n.t('cannot.find', testValues)
    })
  })

  describe('missing handler return', () => {
    it('should be returned missing handler', done => {
      const i18n = new VueI18n({
        locale: 'en',
        missing: (locale, key, vm) => {
          return key
        }
      })

      assert.equal(i18n.t('foo.bar.buz'), 'foo.bar.buz')
      done()
    })
  })
})
