module.exports = {
  component: function (browser) {
    browser
      .url('http://localhost:8080/examples/component/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p:nth-child(1)', 'こんにちは、世界')
      .assert.containsText('p:nth-child(2)', 'component1 local: hello component1')
      .end()
  }
}
