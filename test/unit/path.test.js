import I18nPath from '../../src/path'

describe('path', () => {
  const path = new I18nPath()

  describe('primitive', () => {
    it('should get path value', () => {
      assert.strictEqual(path.getPathValue({ a: { b: 1 } }, 'a.b'), 1)
    })
  })

  describe('whitespace', () => {
    it('should get value if it contains space 0x20', () => {
      const val = path.getPathValue({ 'a c': 1 }, 'a c')
      assert.strictEqual(val, 1)
    })

    it('should return null if it contains whitespace chars except space 0x20', () => {
      const val = path.getPathValue({ 'a\tc': 1 }, 'a\tc')
      assert.strictEqual(val, null)
    })
  })

  describe('object', () => {
    it('should get path value', () => {
      const val = path.getPathValue({ a: { b: 1 } }, 'a')
      assert.strictEqual(val.b, 1)
    })

    it('should accept space 0x20 as keypath', () => {
      const val = path.getPathValue({ a: { 'b c d': 1 } }, 'a.b c d')
      assert.strictEqual(val, 1)
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

  describe('Blanket: term', () => {
    it('should not get null', () => {
      assert.strictEqual(path.getPathValue({}, 'a.b.c[]'), null)
    })
  })

  describe('Blanket: middle', () => {
    it('should not get null', () => {
      assert.strictEqual(path.getPathValue({}, 'a.b.c[]d'), null)
    })
  })
  
  describe('obj: null child', () => {
    it('should return null if parent is null', () => {
      assert.strictEqual(path.getPathValue({ a: null }, 'a.b'), null)
    })
  })
})
