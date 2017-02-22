import { template as format } from '../../src/format'

describe('format', () => {
  describe('argument', () => {
    describe('Object', () => {
      describe('default delimiter', () => {
        it('should be replace with object value', () => {
          const template = 'name: {name}, email: {email}'
          assert.equal(format(template, {
            name: 'kazupon', email: 'foo@domain.com'
          }), 'name: kazupon, email: foo@domain.com')
        })
      })

      describe('RoR delimiter', () => {
        it('should be replace with object value', () => {
          const template = 'name: %{name}, email: %{email}'
          assert.equal(format(template, {
            name: 'kazupon', email: 'foo@domain.com'
          }), 'name: kazupon, email: foo@domain.com')
        })
      })

      describe('missing', () => {
        it('should be replace with as is', () => {
          const template = 'name: {name}, email: {email}'
          assert.equal(format(template, {
            name: 'kazupon'
          }), 'name: kazupon, email: {email}')
        })
      })
    })

    describe('Array', () => {
      it('should be replace with array value', () => {
        const template = 'name: {0}, email: {1}'
        assert.equal(
          format(template, ['kazupon', 'foo@domain.com']),
          'name: kazupon, email: foo@domain.com'
        )
      })
    })

    describe('null', () => {
      it('should be replace with empty', () => {
        const template = 'name: {0}, email: {1}'
        assert.equal(format(template, null), 'name: {0}, email: {1}')
      })
    })

    describe('undefined', () => {
      it('should be replace with empty', () => {
        const template = 'name: {0}, email: {1}'
        assert.equal(format(template, undefined), 'name: {0}, email: {1}')
      })
    })

    describe('not specify', () => {
      it('should be replace with empty', () => {
        const template = 'name: {0}, email: {1}'
        assert.equal(format(template), 'name: {0}, email: {1}')
      })
    })
  })


  describe('argument data', () => {
    describe('primivive', () => {
      it('should be replace with primivive value', () => {
        const template = 'a: {0}, b: {1}'
        assert.equal(format(template, [1, 2]), 'a: 1, b: 2')
      })
    })

    describe('null', () => {
      it('should be replace with empty string', () => {
        const template = 'name: {0}, email: {1}'
        assert.equal(format(template, [null, null]), 'name: , email: ')
      })
    })

    describe('undefined', () => {
      it('should be replace with empty string', () => {
        const template = 'name: {name}, email: {email}'
        assert.equal(format(template, {
          name: undefined, email: undefined
        }), 'name: , email: ')
      })
    })
  })
})
