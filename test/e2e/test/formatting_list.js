module.exports = {
  'formatting list': function (browser) {
    browser
      .url('http://localhost:8080/examples/formatting/list/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p', 'hello world')
      .end()
  }
}
