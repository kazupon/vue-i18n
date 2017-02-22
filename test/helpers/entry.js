import Vue from 'vue'
import VueI18n from '../../src/index'
import 'babel-polyfill' // promise and etc ...

Vue.use(VueI18n)

window.VueI18n = VueI18n
window.Vue = Vue
