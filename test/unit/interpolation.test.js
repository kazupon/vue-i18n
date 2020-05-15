import Component from '../../src/components/interpolation'

const messages = {
  en: {
    text: 'one: {0}',
    primitive: 'one: {0}, two: {1}',
    component: 'element: {0}, component: {1}',
    mixed: 'text: {x}, component: {y}',
    named: 'header: {header}, footer: {footer}',
    link: '@:primitive',
    term: 'I accept xxx {0}.',
    tos: 'Term of service',
    fallback: 'fallback from {0}'
  },
  ja: {
    text: '一: {0}',
    'I am {0}': '一: {0}'
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

  describe('tag', () => {
    it('defaults to span', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'text' } }, [this._v('1')])
        }
      }).$mount(el)
      nextTick(() => {
        assert.strictEqual(vm.$el.outerHTML, '<span>one: 1</span>')
      }).then(done)
    })

    it('of type string should be correctly applied', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'text', tag: 'b' } }, [this._v('1')])
        }
      }).$mount(el)
      nextTick(() => {
        assert.strictEqual(vm.$el.outerHTML, '<b>one: 1</b>')
      }).then(done)
    })

    it('of value true defaults to span', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'text', tag: true } }, [this._v('1')])
        }
      }).$mount(el)
      nextTick(() => {
        assert.strictEqual(vm.$el.outerHTML, '<span>one: 1</span>')
      }).then(done)
    })

    it('of value false does not apply a root container', done => {
      const el = document.createElement('div')
      const vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'text', tag: false } }, [this._v('1')])
        }
      }).$mount(el)
      nextTick(() => {
        assert.strictEqual(vm.$el.nodeType, Node.TEXT_NODE)
        assert.strictEqual(vm.$el.data, 'one: 1')
      }).then(done)
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
          assert.strictEqual(vm.$el.textContent, 'one: 1')
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
          assert.strictEqual(vm.$el.innerHTML, 'one: <p>1</p>, two: <p>2</p>')
        }).then(done)
      })
    })

    describe('empty text node between components', () => {
      it('should NOT be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'primitive' } }, [
              h('p', ['1']),
              this._v(''),
              h('p', ['2'])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.strictEqual(vm.$el.innerHTML, 'one: <p>1</p>, two: <p>2</p>')
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
          assert.strictEqual(vm.$el.innerHTML, 'element: <p>1</p>, component: <p>foo</p>')
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
          assert.strictEqual(vm.$el.textContent, 'one: 1')
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
          assert.strictEqual(vm.$el.innerHTML, 'element: <p>1</p>, component: <p>foo</p>')
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
          assert.strictEqual(vm.$el.innerHTML, 'element: <p>1</p>, component: <p>foo</p>')
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
          assert.strictEqual(vm.$el.innerHTML, 'text: foo, component: <p place="y">bar</p>')
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
          assert.strictEqual(vm.$el.innerHTML, 'text: foo, component: ')
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
          assert.strictEqual(vm.$el.innerHTML, 'fallback from <p>child</p>')
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
          assert.strictEqual(
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
        assert.strictEqual(vm.$el.innerHTML, 'one: <p>1</p>, two: <p>2</p>')
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
        assert.strictEqual(vm.$el.textContent, '一: 1')
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
        assert.strictEqual(
          vm.$el.innerHTML,
          'I accept xxx <a href=\"/term\">Term of service</a>.'
        )
      }).then(done)
    })
  })

  describe('slot', () => {
    describe('with default slot', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'text' }, slot: '' }, [this._v('1')])
          }
        }).$mount(el)
        nextTick(() => {
          assert.strictEqual(vm.$el.textContent, 'one: 1')
        }).then(done)
      })
    })

    describe('with named slots ', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'named' } }, [
              h('template', { slot: 'header' }, [h('p', 'header')]),
              h('template', { slot: 'footer' }, [h('p', 'footer')])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.strictEqual(
            vm.$el.innerHTML,
            'header: <p>header</p>, footer: <p>footer</p>'
          )
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
              h('template', { slot: '0' }, ['1']),
              h('template', { slot: '1' }, ['2'])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.strictEqual(vm.$el.innerHTML, 'one: 1, two: 2')
        }).then(done)
      })
    })

    describe('linked', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'link' } }, [
              h('template', { slot: '0' }, ['1']),
              h('template', { slot: '1' }, ['2'])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.strictEqual(vm.$el.innerHTML, 'one: 1, two: 2')
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
              h('template', { slot: '0' }, [
                h('a', { domProps: { href: '/term', textContent: this.$t('tos') } })
              ])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.strictEqual(
            vm.$el.innerHTML,
            'I accept xxx <a href=\"/term\">Term of service</a>.'
          )
        }).then(done)
      })
    })

    describe('formatFallbackMessages', () => {
      let i18n
      beforeEach(() => {
        i18n = new VueI18n({
          locale: 'en',
          messages,
          formatFallbackMessages: true
        })
      })

      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'I am {0}' } }, [
              h('template', { slot: '0' }, [
                h('a', { domProps: { href: '/term', textContent: this.$t('tos') } })
              ])
            ])
          }
        }).$mount(el)

        nextTick(() => {
          assert.strictEqual(
            vm.$el.innerHTML,
            'I am <a href=\"/term\">Term of service</a>'
          )
        }).then(done)
      })

      it('use ja message', done => {
        i18n.locale = 'ja'
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'I am {0}' } }, [
              h('template', { slot: '0' }, [
                h('a', { domProps: { href: '/term', textContent: this.$t('tos') } })
              ])
            ])
          }
        }).$mount(el)
        nextTick().then(() => {
          assert.strictEqual(
            vm.$el.innerHTML,
            '一: <a href=\"/term\">Term of service</a>'
          )
        }).then(done)
      })

      it('fallbackRoot has higher priority than formatFallbackMessages', done => {
        i18n = new VueI18n({
          locale: 'ja',
          messages,
          fallbackLocale: 'en',
          formatFallbackMessages: true,
          fallbackRoot: true
        })
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('i18n', { props: { path: 'I am {0}' } }, [
              h('template', { slot: '0' }, [
                h('a', { domProps: { href: '/term', textContent: this.$t('tos') } })
              ])
            ])
          }
        }).$mount(el)
        nextTick().then(() => {
          assert.strictEqual(
            vm.$el.innerHTML,
            '一: <a href=\"/term\">Term of service</a>'
          )
        }).then(done)
      })
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
