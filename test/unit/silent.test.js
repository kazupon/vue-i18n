describe('silent', () => {
  it('should be suppressed translate warnings', done => {
    const el = document.createElement('div')
    const vm = new Vue({
      i18n: new VueI18n({
        locale: 'en',
        silentTranslationWarn: true
      }),
      components: {
        child1: { // translation with component
          i18n: {
            locale: 'en',
            messages: {
              en: { who: 'child1' },
              ja: { who: '子1' }
            }
          },
          render (h) { return h('div', {}, []) }
        }
      },
      render (h) {
        return h('div', {}, [
          h('p', { ref: 'who' }, [this.$t('who')]),
          h('child1', { ref: 'child1' })
        ])
      }
    }).$mount(el)

    const child1 = vm.$refs.child1
    nextTick(() => {
      vm.$t('foo.bar.buz')
      child1.$t('foo.bar.buz')
    }).then(done)
  })
})
