import assert from 'power-assert'
import Nightmare from 'nightmare'
import {resolve} from './helper'


describe('translation', () => {
  describe('rendered', () => {
    it('should be valid', (done) => {
      new Nightmare()
        .goto(resolve('./translation.html'))
        .evaluate(() => {
          return document.querySelector('#message').innerHTML
        }, (html) => {
          assert(html === 'Hello kazupon !!<br>How are you?')
        })
        .run(done)
    })
  })
})
