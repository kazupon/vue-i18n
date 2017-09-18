import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'

Vue.config.performance = true
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'jp',
  messages: {
    en: {
      label: 'x'
    },
    jp: {
      label: '☓'
    }
  }
})

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
