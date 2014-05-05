var Vue = require('vue');
var i18n = require('vue-i18n');

// ready translated resources
var resources = {
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
};

// set plugin
Vue.use(i18n, {
  lang: 'ja',
  resources: resources 
});

// create instance
new Vue({
  el: '#test-i18n'
});
