import Vue from 'vue'
import i18n from './i18n'
import App from './App.vue'

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
