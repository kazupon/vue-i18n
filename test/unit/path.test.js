import Path from '../../src/path'

const getPathValue = Path(Vue)

describe('path', () => {
  describe('primivite', () => {
    it('should get path value', () => {
      assert.equal(getPathValue({ a: { b: 1 } }, 'a.b'), 1)
    })
  })

  describe('object', () => {
    it('should get path value', () => {
      const val = getPathValue({ a: { b: 1 } }, 'a')
      assert.equal(val.b, 1)
    })
  })

  describe('number key in object', () => {
    it('should get path value', () => {
      assert.equal(
        getPathValue({ errors: { '1': 'error number 1' } }, 'errors[1]'),
        'error number 1'
      )
    })
  })

  describe('array index path', () => {
    it('should get value', () => {
      assert.equal(
        getPathValue({ errors: ['error number 0'] }, 'errors[0]'),
        'error number 0'
      )
    })
  })

  describe('array path', () => {
    it('should get path value', () => {
      assert.equal(
        getPathValue({ errors: ['error number 0'] }, 'errors')[0],
        'error number 0'
      )
    })
  })

  describe('not found', () => {
    it('should not get null', () => {
      assert.equal(getPathValue({}, 'a.b'), null)
    })
  })

  describe('obj: primitive', () => {
    it('should not get null', () => {
      assert.equal(getPathValue(10, 'a.b'), null)
    })
  })

  describe('obj: null', () => {
    it('should not get null', () => {
      assert.equal(getPathValue(null, 'a.b'), null)
    })
  })
})
