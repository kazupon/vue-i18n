export default {
  en: {
    message: {
      hello: 'the world',
      hoge: 'hoge',
      empty: '',
      format: {
        named: 'Hello {name}, how are you?',
        list: 'Hello {0}, how are you?'
      },
      fallback: 'this is fallback',
      link: '@:message.hello',
      linkEnd: 'This is a linked translation to @:message.hello',
      linkWithin: 'Isn\'t @:message.hello we live in great?',
      linkMultiple: 'Hello @:message.hoge!, isn\'t @:message.hello great?',
      linkBrackets: 'Hello @:(message.hoge). Isn\'t @:(message.hello) great?',
      linkHyphen: '@:hyphen-hello',
      linkUnderscore: '@:underscore_hello',
      linkList: '@:message.hello: {0} {1}',
      circular1: 'Foo @:message.circular2',
      circular2: 'Bar @:message.circular3',
      circular3: 'Buz @:message.circular1',
      linkTwice: '@:message.hello: @:message.hello',
      'hyphen-locale': 'hello hyphen',
      '1234': 'Number-based keys are found',
      '1mixedKey': 'Mixed keys are not found.',
      'sálvame': 'save me'
    },
    '0123a': 'Starts with number and contains non-number',
    '01234': 'Numeric only',
    '日本語': 'Japanese',
    'hello world': 'Hello World',
    'Hello {0}': 'Hello {0}',
    'continue-with-new-account': 'continue with new account',
    'hyphen-hello': 'hyphen the wolrd',
    /* eslint-disable */
    underscore_hello: 'underscore the wolrd',
    /* eslint-enable */
    underscore: '{helloMsg} world',
    plurals: {
      car: 'car | cars',
      apple: 'no apples | one apple | {count} apples',
      format: {
        named: 'Hello {name}, how are you? | Hi {name}, you look fine',
        list: 'Hello {0}, how are you? | Hi {0}, you look fine'
      },
      fallback: 'this is fallback | this is a plural fallback'
    },
    errors: [
      'this is 0 error code message',
      {
        internal1: 'this is internal 1 error message'
      },
      [
        'this is nested array error 1'
      ]
    ],
    issues: {
      arrayBugs: ['bug1', 'bug2']
    }
  },
  ja: {
    message: {
      hello: 'ザ・ワールド',
      hoge: 'ほげ',
      empty: '',
      format: {
        named: 'こんにちは {name}, ごきげんいかが？',
        list: 'こんにちは {0}, ごきげんいかが？'
      },
      fallback1: 'これはフォールバック',
      'hyphen-locale': 'こんにちは、ハイフン',
      '1234': '数字ベースのキーは見つかりませんでした。',
      '1mixedKey': 'ミックスされたキーは見つかりませんでした。',
      'sálvame': '私を助けて'
    },
    '01234': '数字のみ',
    '12345a': '数字で始まり、数字以外を含む',
    '日本語': '日本語',
    plurals: {
      car: 'ザ・ワールド | これはフォールバック',
      implicitPluralCount: 'こっちには来ない | count:{count}, n:{n}',
      format: {
        named: 'こんにちは {name}, ごきげんいかが？ | こんにちは {name}, ごきげんいかが？',
        list: 'こんにちは {0}, ごきげんいかが？| こんにちは {0}, ごきげんいかが？'
      },
      fallback: 'これはフォールバック | ザ・ワールド'
    },
    errors: [
      'これはエラーコード0のエラーメッセージです。',
      {
        internal1: 'これは内部エラーコード1のエラーメッセージです。'
      },
      [
        'これはネストされた配列のエラー1です。'
      ]
    ],
    issues: {
      arrayBugs: ['バグ1', 'バグ2']
    }
  }
}
