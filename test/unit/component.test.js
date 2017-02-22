describe('component translation', () => {
  let vm, i18n
  beforeEach(done => {
    i18n = new VueI18n({
      locale: 'ja',
      messages: {
        en: {
          who: 'root',
          fallback: 'fallback'
        },
        ja: {
          who: 'ルート',
          fallback: 'フォールバック'
        }
      }
    })

    const el = document.createElement('div')
    vm = new Vue({
      i18n,
      components: {
        child1: { // translation with component
          i18n: {
            locale: 'en',
            fallbackRoot: true,
            messages: {
              en: { who: 'child1' },
              ja: { who: '子1' }
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
              h('sub-child1', { ref: 'sub-child1' })
            ])
          }
        },
        child2: {
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
    const child2 = vm.$refs.child2.$refs.who
    const subChild1 = vm.$refs.child1.$refs['sub-child1'].$refs.who
    assert.equal(root.textContent, 'ルート')
    assert.equal(child1.textContent, 'child1')
    assert.equal(child1Fallback.textContent, 'フォールバック')
    assert.equal(child2.textContent, 'ルート')
    assert.equal(subChild1.textContent, 'ルート')

    // change locale
    i18n.locale = 'en'
    vm.$refs.child1.$i18n.locale = 'ja'
    waitForUpdate(() => {
      assert.equal(root.textContent, 'root')
      assert.equal(child1.textContent, '子1')
      assert.equal(child1Fallback.textContent, 'fallback')
      assert.equal(child2.textContent, 'root')
      assert.equal(subChild1.textContent, 'root')
    }).then(done)
  })
})
