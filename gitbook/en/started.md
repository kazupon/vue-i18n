# Getting started

> We will be using [ES2015](https://github.com/lukehoban/es6features) in the code samples in the guide.


### HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>

<div id="app">
  <p>{{ $t("message.hello") }}</p>
</div>
```

### JavaScript

```javascript
// If using a module system (e.g. via vue-cli), import Vue and VueI18n and then call Vue.use(VueI18n).
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
//
// Vue.use(VueI18n)

// Ready translated locale messages
const messages = {
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

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages, // set locale messages
})


// Create a Vue instance with `i18n` option
new Vue({ i18n }).$mount('#app')

// Now the app has started!
```

Output the following:

```html
<div id="#app">
  <p>こんにちは、世界</p>
</div>
```
