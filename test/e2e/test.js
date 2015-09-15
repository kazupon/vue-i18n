import assert from 'power-assert'
import Nightmare from 'nightmare'
const url = 'http://localhost:' + (process.env.PORT || 8080)


describe('translation', () => {
  describe('rendered', () => {
    it('should be valid', (done) => {
      new Nightmare()
        .goto(url)
        .evaluate(() => {
          return document.querySelector('#message').innerHTML
        }, (html) => {
          assert(html === 'Hello kazupon !!<br>How are you?')
        })
        .run(done)
    })
  })
})
