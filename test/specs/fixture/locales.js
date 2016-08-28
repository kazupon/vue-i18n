export default {
  en: {
    message: {
      hello: 'the world',
      hoge: 'hoge',
      format: {
        named: 'Hello {name}, how are you?',
        list: 'Hello {0}, how are you?'
      },
      fallback: 'this is fallback',
      link: '@:message.hello',
      link_end: 'This is a linked translation to @:message.hello',
      link_within: 'Isn\'t @:message.hello we live in great?',
      link_multiple: 'Hello @:message.hoge!, isn\'t @:message.hello great?'
    },
    'hello world': 'Hello World',
    'Hello {0}': 'Hello {0}',
    'continue-with-new-account': 'continue with new account',
    underscore: '{hello_msg} world',
    plurals: {
      car: 'car | cars',
      format: {
        named: 'Hello {name}, how are you? | Hi {name}, you look fine',
        list: 'Hello {0}, how are you? | Hi {0}, you look fine'
      },
      fallback: 'this is fallback | this is a plural fallback'
    }
  },
  ja: {
    message: {
      hello: 'ザ・ワールド',
      hoge: 'ほげ',
      format: {
        named: 'こんにちは {name}, ごきげんいかが？',
        list: 'こんにちは {0}, ごきげんいかが？'
      },
      fallback1: 'これはフォールバック'
    },
    plurals: {
      car: 'ザ・ワールド | これはフォールバック',
      format: {
        named: 'こんにちは {name}, ごきげんいかが？ | こんにちは {name}, ごきげんいかが？',
        list: 'こんにちは {0}, ごきげんいかが？| こんにちは {0}, ごきげんいかが？'
      },
      fallback: 'これはフォールバック | ザ・ワールド'
    }
  }
}
