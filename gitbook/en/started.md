# Getting Started

```javascript
var Vue = require('vue')
var VueI18n = require('vue-i18n')

// install plugin
Vue.use(VueI18n)

// ready translated locale messages
var messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// create VueI18n instance with options
var i18n = new Vue18n({
  locale: 'ja', // set locale
  messages: messages, // set locale messages
})


// create a Vue instanc with `i18n` option
new Vue({ i18n: i18n }).$mount('#app')
```

Template the following:

```html
<div id="#app">
  <p>{{ $t("message.hello") }}</p>
</div>
```

Output the following:

```html
<div id="#app">
  <p>こんにちは、世界</p>
</div>
```
