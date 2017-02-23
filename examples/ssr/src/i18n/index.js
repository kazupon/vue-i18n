import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en-US.json'
import jp from './ja-JP.json'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en-US',
  messages: {
    'en-US': en,
    'ja-JP': jp
  }
})
