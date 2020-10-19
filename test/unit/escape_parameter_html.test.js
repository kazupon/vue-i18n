const messages = {
  en: {
    listformat: '{0}',
    nameformat: '{key}',
  }
}

describe('escapeParameterHtml', () => {
  it('Replacement parameters are escaped when escapeParameterHtml: true.', () => {
    const i18n = new VueI18n({
      locale: 'en',
      messages,
      escapeParameterHtml: true
    })
    // We should not escape the ampersand (&).
    assert(i18n.t('nameformat', { key: '<&"\'>' }) === '&lt;&&quot;&apos;&gt;')
    assert(i18n.t('listformat', ['<&"\'>']) === '&lt;&&quot;&apos;&gt;')
    assert(i18n.tc('nameformat', 1, { key: '<&"\'>' }).toString() === '&lt;&&quot;&apos;&gt;')
    assert(i18n.tc('listformat', 1, ['<&"\'>']).toString() === '&lt;&&quot;&apos;&gt;')
  })
  it('Replacement parameters are not escaped when escapeParameterHtml: undefined.', () => {
    const i18n = new VueI18n({
      locale: 'en',
      messages,
    })
    assert(i18n.t('nameformat', { key: '<"\'>' }) === '<"\'>')
    assert(i18n.t('listformat', ['<"\'>']) === '<"\'>')

  })
})
