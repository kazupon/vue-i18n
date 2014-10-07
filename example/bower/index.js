var i18n = window['vue-i18n']

// ready translated locales
var locales = {
  en: {
    message: {
      hello: 'the world'
    }
  },
  ja: {
    message: {
      hello: 'ザ・ワールド'
    }
  }
}

// set plugin
Vue.use(i18n, {
  lang: 'ja',
  locales: locales
})

// create instance
new Vue({
  el: '#test-i18n'
})
