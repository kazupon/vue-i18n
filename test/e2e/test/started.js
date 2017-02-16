module.exports = {
  started: function (browser) {
    browser
      .url('http://localhost:8080/examples/started/')
      .waitForElementVisible('p', 1000)
      .assert.containsText('p', 'こんにちは、世界')
      .end()
  }
}
