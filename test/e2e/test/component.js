module.exports = {
  component: function (browser) {
    browser
      .url('http://localhost:8080/examples/component/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p:nth-child(1)', 'こんにちは、世界')
      .assert.containsText('div.container p:nth-child(1)', 'Component1 locale messages: こんにちは、component1')
      .assert.containsText('div.container p:nth-child(2)', 'Fallback global locale messages: おはよう、世界！')
      .end()
  }
}
