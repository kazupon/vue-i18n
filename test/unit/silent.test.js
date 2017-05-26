describe('silent', () => {
  it('should be suppressed translate warnings', () => {
    const vm = new Vue({
      i18n: new VueI18n({
        locale: 'en',
        silentTranslationWarn: true,
        messages: {
          en: { who: 'root' },
          ja: { who: 'ルート' }
        }
      })
    })

    const spy = sinon.spy(console, 'warn')
    vm.$t('foo.bar.buz')
    assert(spy.notCalled === true)

    // change
    vm.$i18n.silentTranslationWarn = false
    vm.$t('foo.bar.buz')
    assert(spy.callCount === 2)

    spy.restore()
  })
})
