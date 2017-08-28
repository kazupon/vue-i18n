import Component from '../../src/component'

const messages = {
  en: {
    text: 'one: {0}',
    primitive: 'one: {0}, two: {1}',
    component: 'element: {0}, component: {1}',
    mixed: 'text: {x}, component: {y}',
    link: '@:primitive',
    term: 'I accept xxx {0}.',
    tos: 'Term of service',
    fallback: 'fallback from {0}'
  },
  ja: {
    text: '一: {0}'
  }
}
const components = {
  comp: {
    props: {
      msg: { type: String, default: '' }
    },
    render (h) {
      return h('p', [this.msg])
    }
  },
  fallback: {
    i18n: {
      locale: 'en'
    },
    render (h) {
      return h('i18n', { props: { path: 'fallback' } }, [
        h('p', ['child'])
      ])
    }
  }
}

describe('component interpolation', () => {
  let i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      messages
    })
  })

  describe('children', () => {
    describe('text nodes', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'text' } }, [this._v('1')])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.textContent, 'one: 1')
        }).then(done)
      })
    })

    describe('primitive nodes', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'primitive' } }, [
              h('p', ['1']),
              h('p', ['2'])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'one: <p>1</p>, two: <p>2</p>')
        }).then(done)
      })
    })

    describe('components', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          components,
          render (h) {
            return h('i18n', { props: { path: 'component' } }, [
              h('p', ['1']),
              h('comp', { props: { msg: 'foo' } })
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'element: <p>1</p>, component: <p>foo</p>')
        }).then(done)
      })
    })

    describe('places prop', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'text', places: [1] } })
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.textContent, 'one: 1')
        }).then(done)
      })
    })

    describe('place prop on all children', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          components,
          render (h) {
            return h('i18n', { props: { path: 'component' } }, [
              h('p', { props: { place: 0 } }, ['1']),
              h('comp', { props: { place: 1, msg: 'foo' } })
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'element: <p>1</p>, component: <p>foo</p>')
        }).then(done)
      })
    })

    describe('place prop on some children', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          components,
          render (h) {
            return h('i18n', { props: { path: 'component' } }, [
              h('p', { props: { place: 1 } }, ['1']),
              h('comp', { props: { msg: 'foo' } })
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'element: <p>1</p>, component: <p>foo</p>')
        }).then(done)
      })
    })

    describe('places and place mixed', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          components,
          render (h) {
            return h('i18n', { props: { path: 'mixed', places: { 'x': 'foo' } } }, [
              h('comp', { props: { msg: 'bar' }, attrs: { place: 'y' } })
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'text: foo, component: <p place="y">bar</p>')
        }).then(done)
      })
    })

    describe('places set, place not set on all children', () => {
      it('should be warned', done => {
        const spy = sinon.spy(console, 'warn')
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          components,
          render (h) {
            return h('i18n', { props: { path: 'mixed', places: { 'x': 'foo' } } }, [
              h('comp', { props: { msg: 'bar' } })
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'text: foo, component: ')
          assert(spy.notCalled === false)
          assert(spy.callCount === 1)
          spy.restore()
        }).then(done)
      })
    })

    describe('fallback', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          components,
          render (h) {
            return h('fallback')
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'fallback from <p>child</p>')
        }).then(done)
      })
    })

    describe('nested components', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          components,
          render (h) {
            return h('i18n', { props: { path: 'component' } }, [
              h('p', ['1']),
              h('div', {}, [
                h('i18n', { class: 'nested', props: { tag: 'div', path: 'component' } }, [
                  h('p', ['2']),
                  h('comp', { props: { msg: 'nested' } })
                ])
              ])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(
            vm.$el.innerHTML,
            'element: <p>1</p>, component: <div><div class="nested">element: <p>2</p>, component: <p>nested</p></div></div>'
          )
        }).then(done)
      })
    })
  })

  describe('linked', () => {
    it('should be interpolated', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'link' } }, [
            h('p', ['1']),
            h('p', ['2'])
          ])
        }
      }).$mount(el)
      nextTick(() => {
        assert.equal(vm.$el.innerHTML, 'one: <p>1</p>, two: <p>2</p>')
      }).then(done)
    })
  })

  describe('locale', () => {
    it('should be interpolated', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'text', locale: 'ja' } }, [
            this._v('1')
          ])
        }
      }).$mount(el)
      nextTick(() => {
        assert.equal(vm.$el.textContent, '一: 1')
      }).then(done)
    })
  })

  describe('included translation locale message', () => {
    it('should be interpolated', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'term' } }, [
            h('a', { domProps: { href: '/term', textContent: this.$t('tos') } })
          ])
        }
      }).$mount(el)
      nextTick(() => {
        assert.equal(
          vm.$el.innerHTML,
          'I accept xxx <a href=\"/term\">Term of service</a>.'
        )
      }).then(done)
    })
  })

  describe('warnning in render', () => {
    it('should be warned', () => {
      const spy = sinon.spy(console, 'warn')

      Component.render(() => {}, { children: [], parent: {} })
      assert(spy.notCalled === false)
      assert(spy.callCount === 1)

      spy.restore()
    })
  })
})
