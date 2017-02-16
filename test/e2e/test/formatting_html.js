module.exports = {
  'formatting html': function (browser) {
    browser
      .url('http://localhost:8080/examples/formatting/html/')
      .waitForElementVisible('#app', 1000)
      .assert.attributeContains('p', 'innerHTML', '')
      .end()
  }
}
