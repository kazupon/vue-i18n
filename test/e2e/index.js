import Vue from 'vue'
import plugin from '../../src/index'

Vue.use(plugin, {
  lang: 'en',
  locales: {
    en: {
      hello: 'hello',
      world: 'world',
      message: {
        hello: 'Hello {name} !!'
      }
    },
    ja: {
      hello: 'こんにちは',
      world: '世界',
      message: {
        hello: 'こんにちは {name} !!'
      }
    }
  }
})

const translation = {
  template: '<p id="message">{{* $t("message.hello", "en", { name: "kazupon" })}}</br>How are you?</p>'
}

new Vue(translation).$mount('#translation')
