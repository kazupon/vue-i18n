import dateTimeFormats from './fixture/datetime'
import numberFormats from './fixture/number'

describe('component translation', () => {
  let vm, i18n
  const dt = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
  const money = 101
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

  beforeEach(done => {
    i18n = new VueI18n({
      locale: 'ja-JP',
      messages,
      dateTimeFormats,
      numberFormats
    })

    const el = document.createElement('div')
    vm = new Vue({
      i18n,
      components: {
        child1: { // translation with component
          i18n: {
            locale: 'en-US',
            sync: false,
            messages: {
              'en-US': { who: 'child1' },
              'ja-JP': { who: '子1' }
            },
            sharedMessages: { // shared messages for child1 component
              'en-US': { foo: { bar: 'bar' } },
              'ja-JP': { foo: { bar: 'バー' } }
            }
          },
          components: {
            'sub-child1': { // translation with root
              render (h) {
                return h('div', {}, [
                  h('p', { ref: 'who' }, [this.$t('who')])
                ])
              }
            }
          },
          render (h) {
            return h('div', {}, [
              h('p', { ref: 'who' }, [this.$t('who')]),
              h('p', { ref: 'fallback' }, [this.$t('fallback')]),
              h('p', { ref: 'datetime' }, [this.$d(dt, 'short')]),
              h('p', { ref: 'number' }, [this.$n(money, 'currency')]),
              h('p', { ref: 'shared' }, [this.$t('foo.bar')]),
              h('sub-child1', { ref: 'sub-child1' })
            ])
          }
        },
        child2: {
          components: {
            'sub-child2': {
              i18n: {
                messages: {
                  'en-US': { who: 'sub-child2' },
                  'ja-JP': { who: 'サブの子2' }
                }
              },
              render (h) {
                return h('div', {}, [
                  h('p', { ref: 'who' }, [this.$t('who')])
                ])
              }
            }
          },
          render (h) {
            return h('div', {}, [
              h('p', { ref: 'who' }, [this.$t('who')]),
              h('sub-child2', { ref: 'sub-child2' })
            ])
          }
        }
      },
      render (h) {
        return h('div', {}, [
          h('p', { ref: 'who' }, [this.$t('who')]),
          h('child1', { ref: 'child1' }),
          h('child2', { ref: 'child2' })
        ])
      }
    }).$mount(el)
    vm.$nextTick(done)
  })

  it('should be translated', done => {
    const root = vm.$refs.who
    const child1 = vm.$refs.child1.$refs.who
    const child1Fallback = vm.$refs.child1.$refs.fallback
    const child1DateTime = vm.$refs.child1.$refs.datetime
    const child1Number = vm.$refs.child1.$refs.number
    const child1Shared = vm.$refs.child1.$refs.shared
    const child2 = vm.$refs.child2.$refs.who
    const subChild1 = vm.$refs.child1.$refs['sub-child1'].$refs.who
    const subChild2 = vm.$refs.child2.$refs['sub-child2'].$refs.who
    assert.strictEqual(root.textContent, 'ルート')
    assert.strictEqual(child1.textContent, 'child1')
    assert.strictEqual(child1Fallback.textContent, 'フォールバック')

    // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
    isChrome && assert.strictEqual(child1DateTime.textContent, '12/19/2012, 10:00 PM')
    isChrome && assert.strictEqual(child1Number.textContent, '$101.00')
    assert.strictEqual(child1Shared.textContent, 'bar')

    assert.strictEqual(child2.textContent, 'ルート')
    assert.strictEqual(subChild1.textContent, 'ルート')
    assert.strictEqual(subChild2.textContent, 'サブの子2')

    // change locale
    i18n.locale = 'en-US'
    vm.$refs.child1.$i18n.locale = 'ja-JP'
    Vue.nextTick().then(() => {
      assert.strictEqual(root.textContent, 'root')
      assert.strictEqual(child1.textContent, '子1')
      assert.strictEqual(child1Fallback.textContent, 'fallback')

      // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
      isChrome && assert.strictEqual(child1DateTime.textContent, '2012/12/20 12:00')
      isChrome && assert.strictEqual(child1Number.textContent, '￥101')
      assert.strictEqual(child2.textContent, 'root')
      assert.strictEqual(subChild1.textContent, 'root')
      assert.strictEqual(subChild2.textContent, 'sub-child2')

      vm.$destroy()
    }).then(done)
  })

  it('fallbackRootWithEmptyString default to be true', done => {
    const el = document.createElement('div')
    let vm = new Vue({
      i18n,
      components: {
        child: { // translation with component
          i18n: {
            locale: 'en-US',
            sync: false,
            messages: {
              'en-US': {
                who: 'child'
              },
              'ja-JP': {
                who: '子',
              }
            },
          },
          components: {
            'sub-child': { // translation with root
              i18n: {
                locale: 'ja-JP',
                sync: false,
                messages: {
                  'en-US': {
                    who: 'sub-child'
                  },
                  'ja-JP': {
                    who: ''
                  }
                },
                sharedMessages: { // shared messages for child1 component
                  'en-US': { foo: { bar: 'bar' } },
                  'ja-JP': { foo: { bar: 'バー' } }
                }
              },
              render (h) {
                return h('div', {}, [
                  h('p', { ref: 'who' }, [this.$t('who')])
                ])
              }
            }
          },
          render (h) {
            return h('div', {}, [
              h('p', { ref: 'who' }, [this.$t('who')]),
              h('sub-child', { ref: 'sub-child' })
            ])
          }
        },
      },
      render (h) {
        return h('div', {}, [
          h('p', { ref: 'who' }, [this.$t('who')]),
          h('child', { ref: 'child' }),
        ])
      }
    }).$mount(el)
    Vue.nextTick().then(() => {
      assert.strictEqual(vm.$refs.child.$refs['sub-child'].$refs.who.textContent, 'ルート')
    }).then(done)
  })

  it('fallbackRootWithEmptyString should work when set to false', done => {
    const el = document.createElement('div')
    let vm = new Vue({
      i18n,
      components: {
        child: { // translation with component
          i18n: {
            locale: 'en-US',
            sync: false,
            messages: {
              'en-US': {
                who: 'child'
              },
              'ja-JP': {
                who: '子',
              }
            },
          },
          components: {
            'sub-child': { // translation with root
              i18n: {
                locale: 'ja-JP',
                sync: false,
                fallbackRootWithEmptyString: false,
                messages: {
                  'en-US': {
                    who: 'sub-child'
                  },
                  'ja-JP': {
                    who: ''
                  }
                },
                sharedMessages: { // shared messages for child1 component
                  'en-US': { foo: { bar: 'bar' } },
                  'ja-JP': { foo: { bar: 'バー' } }
                }
              },
              render (h) {
                return h('div', {}, [
                  h('p', { ref: 'who' }, [this.$t('who')])
                ])
              }
            }
          },
          render (h) {
            return h('div', {}, [
              h('p', { ref: 'who' }, [this.$t('who')]),
              h('sub-child', { ref: 'sub-child' })
            ])
          }
        },
      },
      render (h) {
        return h('div', {}, [
          h('p', { ref: 'who' }, [this.$t('who')]),
          h('child', { ref: 'child' }),
        ])
      }
    }).$mount(el)
    Vue.nextTick().then(() => {
      assert.strictEqual(vm.$refs.child.$refs['sub-child'].$refs.who.textContent, '')
    }).then(done)
  })
})
