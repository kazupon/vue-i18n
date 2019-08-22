import mixin from '../../src/mixin'

describe('mixin', () => {
  describe('beforeCreate', () => {
    describe('invalid i18n option', () => {
      it('should be warned', () => {
        const spy = sinon.spy(console, 'warn')
        // called from Vue core
        new Vue({ i18n: 1 })

        assert(spy.notCalled === false)
        assert(spy.callCount === 1)

        spy.restore()
      })
    })
  })

  describe('beforeDestroy', () => {
    describe('not assign VueI18n instance', () => {
      it('should be succeeded', () => {
        let nextTickCalled = 0
        const that = {
          beforeDestroy: mixin.beforeDestroy,
          $nextTick: () => nextTickCalled++
        }
        const result = that.beforeDestroy()
        assert.equal(result, undefined)
        assert.equal(nextTickCalled, 1)
      })
    })
    it('this._i18n should still be available after beforeDestroy', () => {
      const that = {
        _i18n: 1,
        beforeDestroy: mixin.beforeDestroy,
        $nextTick: () => {}
      }
      that.beforeDestroy()
      assert.ok(that._i18n)
    })
  })
})
