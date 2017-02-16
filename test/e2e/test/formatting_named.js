module.exports = {
  'formatting name': function (browser) {
    browser
      .url('http://localhost:8080/examples/formatting/named/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p', 'hello world')
      .end()
  }
}
