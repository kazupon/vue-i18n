import Vue from 'vue'
import plugin from '../../src/index'

const version = Number(Vue.version.split('.')[0])

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

if (version >= 2) {
  translation.render = function (h) {
    return h('p', { staticAttrs: { id: 'message' } }, [
      this.$t('message.hello', 'en', { name: 'kazupon' }),
      h('br'),
      'How are you?'
    ])
  }
} else {
  translation.template = '<p id="message">{{* $t("message.hello", "en", { name: "kazupon" })}}</br>How are you?</p>'
}

new Vue(translation).$mount('#translation')
