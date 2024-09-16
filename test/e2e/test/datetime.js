module.exports = {
  number: function (browser) {
    browser
      .url('http://localhost:8080/examples/datetime/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('p[data-testid="pastDatetime"]', '過去の日時: 2012/12/20 午後00:00:00')
      .assert.containsText('p[data-testid="pastYear"]', '過去の年: 12年')
      .click('select option[value=en-US]')
      .assert.containsText('p[data-testid="pastDatetime"]', 'past datetime: 12/19/2012, 07:00:00 PM')
      .assert.containsText('p[data-testid="pastYear"]', 'past year: 12')
      .end()
  }
}
