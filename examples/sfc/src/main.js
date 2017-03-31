import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
    }
  }
})

new Vue({
  i18n,
  el: '#app',
  render: h => h(App)
})
