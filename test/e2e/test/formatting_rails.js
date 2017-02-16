module.exports = {
  'formatting rails': function (browser) {
    browser
      .url('http://localhost:8080/examples/formatting/rails/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p', 'hello world')
      .end()
  }
}
