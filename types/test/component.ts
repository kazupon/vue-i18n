import Vue from 'vue'
import VueI18n from '../index'

// setup locale info for root Vue instance
const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: {
      message: {
        hello: 'hello world',
        greeting: 'good morning'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界',
        greeting: 'おはようございます'
      }
    }
  }
})

// Define component
const Component1 = {
  template: `
    <div class="container">
     <p>Component1 locale messages: {{ $t("message.hello") }}</p>
     <p>Fallback global locale messages: {{ $t("message.greeting") }}</p>
   </div>`,
  i18n: { // `i18n` option
    messages: {
      en: { message: { hello: 'hello component1' } },
      ja: { message: { hello: 'こんにちは、component1' } }
    },
    sharedMessages: {
      en: { buttons: { save: 'Save' } },
      ja: { buttons: { save: 'Save' } }
    }
  }
}

new Vue({
  i18n,
  components: {
    Component1
  }
}).$mount('#app')
