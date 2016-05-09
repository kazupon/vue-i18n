import assert from 'power-assert'
import format from '../../src/format'


describe('format', () => {
  describe('argument', () => {
    context('Object', () => {
      it('should be replace with object value', () => {
        const template = 'name: {name}, email: {email}'
        assert(format(template, {
          name: 'kazupon', email: 'foo@domain.com'
        }), 'name: kazupon, email: foo@domain.com')
      })

      it('should be replace with object value', () => {
        const template = 'name: %{name}, email: %{email}'
        assert(format(template, {
          name: 'kazupon', email: 'foo@domain.com'
        }), 'name: kazupon, email: foo@domain.com')
      })
    })

    context('Array', () => {
      it('should be replace with array value', () => {
        const template = 'name: {0}, email: {1}'
        assert(
          format(template, ['kazupon', 'foo@domain.com']),
          'name: kazupon, email: foo@domain.com'
        )
      })
    })

    context('null', () => {
      it('should be replace with empty', () => {
        const template = 'name: {0}, email: {1}'
        assert(format(template, null) === 'name: , email: ')
      })
    })

    context('undefined', () => {
      it('should be replace with empty', () => {
        const template = 'name: {0}, email: {1}'
        assert(format(template, undefined) === 'name: , email: ')
      })
    })

    context('not specify', () => {
      it('should be replace with empty', () => {
        const template = 'name: {0}, email: {1}'
        assert(format(template) === 'name: , email: ')
      })
    })
  })


  describe('argument data', () => {
    context('primivive', () => {
      it('should be replace with primivive value', () => {
        const template = 'a: {0}, b: {1}'
        assert(format(template, [1, 2]) === 'a: 1, b: 2')
      })
    })

    context('null', () => {
      it('should be replace with empty string', () => {
        const template = 'name: {0}, email: {1}'
        assert(format(template, [null, null]) === 'name: , email: ')
      })
    })

    context('undefined', () => {
      it('should be replace with empty string', () => {
        const template = 'name: {name}, email: {email}'
        assert(format(template, {
          name: undefined, email: undefined
        }), 'name: , email: ')
      })
    })
  })
})
