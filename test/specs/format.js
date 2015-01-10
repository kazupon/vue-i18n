/**
 * Import(s)
 */

var format = require('../../lib/format')


describe('format', function () {
  describe('Object', function () {
    it('should be replace', function () {
      var template = 'name: {name}, email: {email}'
      expect(format(template, {
        name: 'kazupon', email: 'foo@domain.com'
      })).to.be.eql('name: kazupon, email: foo@domain.com')
    })
  })

  describe('Array', function () {
    it('should be replace', function () {
      var template = 'name: {0}, email: {1}'
      expect(format(template, ['kazupon', 'foo@domain.com']))
        .to.be.eql('name: kazupon, email: foo@domain.com')
    })
  })

  describe('null', function () {
    it('should be replace with empty string', function () {
      var template = 'name: {0}, email: {1}'
      expect(format(template, [null, null]))
        .to.be.eql('name: , email: ')
    })
  })

  describe('undefined', function () {
    it('should be replace with empty string', function () {
      var template = 'name: {name}, email: {email}'
      expect(format(template, {
        name: undefined, email: undefined
      })).to.be.eql('name: , email: ')
    })
  })
})
