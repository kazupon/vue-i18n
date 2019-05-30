describe('i18n factory', () => {
  let InstanceBasedComponent, FactoryBasedComponent
  const messages = {
    'en-US': {
      who: 'root',
      fallback: 'fallback'
    },
    'ja-JP': {
      who: 'ルート',
      fallback: 'フォールバック'
    }
  }

  const i18nFactory = () => new VueI18n({
    locale: 'en-US',
    messages
  })

  const i18n = i18nFactory()

  beforeEach(done => {
    InstanceBasedComponent = Vue.extend({
      i18n, // normal i18n instance injection
      render (h) {
        return h('div', {}, [
          h('p', { ref: 'who' }, [this.$t('who')])
        ])
      }
    })
    done()
  })

  beforeEach(done => {
    FactoryBasedComponent = Vue.extend({
      i18n: i18nFactory, // normal i18n instance injection
      render (h) {
        return h('div', {}, [
          h('p', { ref: 'who' }, [this.$t('who')])
        ])
      }
    })
    done()
  })

  it('should initialize a VueI18n factory', () => {
    const vm = new FactoryBasedComponent()
    assert(vm.$i18n instanceof VueI18n)
  })

  it('should have different VueI18n instances on different components instances', () => {
    const vm = new FactoryBasedComponent()
    const vm2 = new FactoryBasedComponent()
    assert.notEqual(vm.$i18n, vm2.$i18n)
  })

  it('should behave normally if factory is not provided', () => {
    const vm = new InstanceBasedComponent()
    const vm2 = new InstanceBasedComponent()
    assert(vm.$i18n instanceof VueI18n)
    assert(vm2.$i18n instanceof VueI18n)
    assert.strictEqual(vm.$i18n, vm2.$i18n)
  })
})
