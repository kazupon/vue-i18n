const messages = {
  en: {
    text: 'one: {0}',
    premitive: 'one: {0}, two: {1}',
    component: 'root: {0}, component: {1}',
    link: '@:premitive'
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
            return h('p', {}, [
              h('i18n', { props: { path: 'text' } }, [
                this._v('1')
              ])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.textContent, 'one: 1')
        }).then(done)
      })
    })

    describe('premitive nodes', () => {
      it('should be interpolated', done => {
        const el = document.createElement('div')
        const vm = new Vue({
          i18n,
          render (h) {
            return h('div', {}, [
              h('i18n', { props: { path: 'premitive' } }, [
                h('p', ['1']),
                h('p', ['2'])
              ])
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
            return h('div', {}, [
              h('i18n', { props: { path: 'component' } }, [
                h('p', ['1']),
                h('comp', { props: { msg: 'foo' } })
              ])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(vm.$el.innerHTML, 'root: <p>1</p>, component: <p>foo</p>')
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
            return h('div', {}, [
              h('i18n', { props: { path: 'component' } }, [
                h('p', ['1']),
                h('div', {}, [
                  h('i18n', { props: { path: 'component' } }, [
                    h('p', ['2']),
                    h('comp', { props: { msg: 'nested' } })
                  ])
                ])
              ])
            ])
          }
        }).$mount(el)
        nextTick(() => {
          assert.equal(
            vm.$el.innerHTML,
            'root: <p>1</p>, component: <div>root: <p>2</p>, component: <p>nested</p></div>'
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
          return h('p', {}, [
            h('i18n', { props: { path: 'link' } }, [
              h('p', ['1']),
              h('p', ['2'])
            ])
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
          return h('p', {}, [
            h('i18n', { props: { path: 'text', locale: 'ja' } }, [
              this._v('1')
            ])
          ])
        }
      }).$mount(el)
      nextTick(() => {
        assert.equal(vm.$el.textContent, '一: 1')
      }).then(done)
    })
  })
})
