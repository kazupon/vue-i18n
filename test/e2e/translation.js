/**
 * Import(s)
 */

var Nightmare = require('nightmare')
var expect = require('expect.js')
var resolve = require('./helper').resolve


/**
 * Test(s)
 */

describe('translation', function () {
  describe('rendered', function () {
    this.timeout(20000)

    it('should be valid', function (done) {
      new Nightmare()
        .goto(resolve('./translation.html'))
        .evaluate(function () {
          return document.querySelector('#translation p.directive').innerText
        }, function (text) {
          expect(text).to.be.eql('hello')
        })
        .evaluate(function () {
          return document.querySelector('#translation p.class-method').innerText
        }, function (text) {
          expect(text).to.be.eql('world')
        })
        .run(done)
    })
  })
})
