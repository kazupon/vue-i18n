module.exports = {
  interpolation: function (browser) {
    browser
      .url('http://localhost:8080/examples/interpolation/slots')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('label[for="tos"]', 'I accept xxx Term of Service.')
      .end()
  }
}
