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
          return document.querySelector('#translation p.static').innerText
        }, function (text) {
          expect(text).to.be.eql('world')
        })
        .evaluate(function () {
          return document.querySelector('#translation div.instance').innerHTML
        }, function (html) {
          expect(html).to.be.eql('Hello kazupon !!<br>How are you?')
        })
        .run(done)
    })
  })
})
