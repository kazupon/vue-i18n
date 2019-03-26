module.exports = {
  'number_formatting': function (browser) {
    browser
      .url('http://localhost:8080/examples/number-formatting/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p.money', '￥1,000')
      .click('select option[value=en-US]')
      .assert.attributeContains('p.money', 'innerHTML', '$1,000<span style="vertical-align: super;">00</span>')
      .end()
  }
}
