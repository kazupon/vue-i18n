module.exports = {
  started: function (browser) {
    browser
      .url('http://localhost:8080/examples/directive/')
      .waitForElementVisible('#string-syntax', 1000)
      .waitForElementVisible('#object-syntax', 1000)
      .assert.containsText('#string-syntax p:nth-child(1)', 'hi there!')
      .assert.containsText('#string-syntax p:nth-child(2)', 'hi there!')
      .assert.containsText('#object-syntax p:nth-child(1)', 'こんにちは、kazupon！')
      .assert.containsText('#object-syntax p:nth-child(2)', 'hi kazupon!')
      .end()
  }
}
