import Vue from 'vue'
import plugin from '../../src/index'
import compare from '../../src/compare'

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

const translation = {}

if (compare(Vue.version, '2.0.0-alpha') < 0) {
  translation.template = '<p id="message">{{* $t("message.hello", "en", { name: "kazupon" })}}</br>How are you?</p>'
} else {
  translation.render = function () {
    return this.$createElement('p', { staticAttrs: { id: 'message' } }, [
      this.__toString__(this.$t('message.hello', 'en', { name: 'kazupon' })),
      this.$createElement('br'),
      'How are you?'
    ])
  }
}

new Vue(translation).$mount('#translation')
