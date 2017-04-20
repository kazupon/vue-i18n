module.exports = {
  component: function (browser) {
    browser
      .url('http://localhost:8080/examples/number/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p', 'お金: ￥1,000')
      .click('select option[value=en-US]')
      .assert.containsText('p', 'Money: $1,000')
      .end()
  }
}
