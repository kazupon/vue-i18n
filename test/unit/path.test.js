import Path from '../../src/path'

const getValue = Path(Vue)

describe('path', () => {
  describe('primivite', () => {
    it('should get value', () => {
      assert.equal(getValue({ a: { b: 1 } }, 'a.b'), 1)
    })
  })

  describe('object', () => {
    it('should get value', () => {
      const val = getValue({ a: { b: 1 } }, 'a')
      assert.equal(val.b, 1)
    })
  })

  describe('number key in object', () => {
    it('should get value', () => {
      assert.equal(
        getValue({ errors: { '1': 'error number 1' } }, 'errors[1]'),
        'error number 1'
      )
    })
  })

  describe('array', () => {
    it('should get value', () => {
      assert.equal(
        getValue({ errors: ['error number 0'] }, 'errors[0]'),
        'error number 0'
      )
    })
  })

  describe('not found', () => {
    it('should not get null', () => {
      assert.equal(getValue({}, 'a.b'), null)
    })
  })

  describe('obj: primitive', () => {
    it('should not get null', () => {
      assert.equal(getValue(10, 'a.b'), null)
    })
  })

  describe('obj: null', () => {
    it('should not get null', () => {
      assert.equal(getValue(null, 'a.b'), null)
    })
  })
})
