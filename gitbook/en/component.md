# Component Based Translation

In general, Locale info (e.g. `locale`,`messages`, etc) is set as constructor option of `VueI18n` instance, and it set  `i18n` option as root Vue instance. Thereby you globally can translate with using `$t` or `$tc` in the root Vue instance are composed some component. you manage  locale info for each component and it translate, it was better is convenient due to Vue is component oriented.

The below component based translation example:

```javascript
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
    }
  }
}
      
new Vue({
  i18n,
  components: {
    Component1
  }
}).$mount('#app')
```

Template the following:

```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

Output the following:

```html
<div id="app">
  <p>こんにちは、世界</p>
  <div class="container">
    <p>Component1 locale messages: こんにちは、component1</p>
    <p>Fallback global locale messages: おはよう、世界！</p>
  </div>
</div>
```

As in the example above, if the component doesn't have the locale message, it  fallbacks and translates global locale message. Also translate it using global locale (in the above example, `locale: 'ja'`). 

If you hope translate in the component locale, you can realize with `sync: false` and `locale` in `i18n` option.
