import I18nPath from '../../src/path'

describe('path', () => {
  const path = new I18nPath()

  describe('primitive', () => {
    it('should get path value', () => {
      assert.strictEqual(path.getPathValue({ a: { b: 1 } }, 'a.b'), 1)
    })
  })

  describe('object', () => {
    it('should get path value', () => {
      const val = path.getPathValue({ a: { b: 1 } }, 'a')
      assert.strictEqual(val.b, 1)
    })
  })

  describe('number key in object', () => {
    it('should get path value', () => {
      assert.strictEqual(
        path.getPathValue({ errors: { '1': 'error number 1' } }, 'errors[1]'),
        'error number 1'
      )
    })
  })

  describe('array index path', () => {
    it('should get value', () => {
      assert.strictEqual(
        path.getPathValue({ errors: ['error number 0'] }, 'errors[0]'),
        'error number 0'
      )
    })
  })

  describe('array path', () => {
    it('should get path value', () => {
      assert.strictEqual(
        path.getPathValue({ errors: ['error number 0'] }, 'errors')[0],
        'error number 0'
      )
    })
  })

  describe('not found', () => {
    it('should not get null', () => {
      assert.strictEqual(path.getPathValue({}, 'a.b'), null)
    })
  })

  describe('obj: primitive', () => {
    it('should not get null', () => {
      assert.strictEqual(path.getPathValue(10, 'a.b'), null)
    })
  })

  describe('obj: null', () => {
    it('should not get null', () => {
      assert.strictEqual(path.getPathValue(null, 'a.b'), null)
    })
  })
})
