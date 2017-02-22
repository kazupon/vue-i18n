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
})
