import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Formatter from './formatter'

Vue.use(VueI18n)

const locale = 'en-US' // default locale
const formatter = new Formatter({ locale })

export default new VueI18n({
  locale,
  formatter,
  messages: {
    'en-US': {
      message: {
        hello: 'hello!!',
        plural: 'You have {n, plural, =0{no messages} one{1 message} other{# messages}}.',
        select: '{gender, select, male{He} female{She} other{They}} liked this.',
        number: 'Current Percent: {current, number, percent}',
        time: 'Current Time: {current, time, short}'
      }
    },
    'ja-JP': {
      message: {
        hello: 'こんにちは！！',
        select: '{gender, select, male{彼} female{彼女} other{彼ら}} はこれを好きです。',
        number: '現在パーセンテージ {current, number, percent}',
        time: '現在時刻: {current, time, medium}',
      }
    }
  }
})
