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
    const child2 = vm.$refs.child2.$refs.who
    const subChild1 = vm.$refs.child1.$refs['sub-child1'].$refs.who
    const subChild2 = vm.$refs.child2.$refs['sub-child2'].$refs.who
    assert.equal(root.textContent, 'ルート')
    assert.equal(child1.textContent, 'child1')
    assert.equal(child1Fallback.textContent, 'フォールバック')

    // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
    isChrome && assert.equal(child1DateTime.textContent, '12/19/2012, 10:00 PM')
    isChrome && assert.equal(child1Number.textContent, '$101.00')
    assert.equal(child2.textContent, 'ルート')
    assert.equal(subChild1.textContent, 'ルート')
    assert.equal(subChild2.textContent, 'サブの子2')

    // change locale
    i18n.locale = 'en-US'
    vm.$refs.child1.$i18n.locale = 'ja-JP'
    nextTick(() => {
      assert.equal(root.textContent, 'root')
      assert.equal(child1.textContent, '子1')
      assert.equal(child1Fallback.textContent, 'fallback')

      // NOTE: avoid webkit(phatomjs/safari) & Intl polyfill wired localization...
      isChrome && assert.equal(child1DateTime.textContent, '2012/12/20 12:00')
      isChrome && assert.equal(child1Number.textContent, '￥101')
      assert.equal(child2.textContent, 'root')
      assert.equal(subChild1.textContent, 'root')
      assert.equal(subChild2.textContent, 'sub-child2')

      vm.$destroy()
    }).then(() => {
      assert(vm.$i18n === null)
    }).then(done)
  })
})
