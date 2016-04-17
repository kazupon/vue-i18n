import Vue from 'vue'
import VueI18n from 'vue-i18n'
import 'babel-polyfill'
import 'whatwg-fetch'
import App from './App.vue'

Vue.use(VueI18n)

new Vue({
  el: 'body',
  components: { App }
})
