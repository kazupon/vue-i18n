# Component based localization

In general, locale info (e.g. `locale`,`messages`, etc) is set as constructor option of `VueI18n` instance and it sets `i18n` option as root Vue instance.

Therefore you can globally translate with using `$t` or `$tc` in the root Vue instance and any composed component. You can also manage locale info for each component separately, which might be more convenient due to Vue components oriented design.

Component based localization example:

```js
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
  i18n: { // `i18n` option, setup locale info for component
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

Template:

    
```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

Outputs the following:

```html
<div id="app">
  <p>こんにちは、世界</p>
  <div class="container">
    <p>Component1 locale messages: こんにちは、component1</p>
    <p>Fallback global locale messages: おはよう、世界！</p>
  </div>
</div>
```

As in the example above, if the component doesn't have the locale message, it falls back to globally defined localization info. The component uses the language set in the root instance (in the above example: `locale: 'ja'`).

If you hope localize in the component locale, you can realize with `sync: false` and `locale` in `i18n` option.

## Translation in functional component

When using a functional component, all the data (including props, children, slots, parent, etc.) is passed through `context` containing the attributes, and it doesn't recognize the `this` scope, so when using the vue-i18n on functional components, you must refer to `$t` as `parent.$t`, check the example below:

```html
...
<div>
  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer">
    <img src="" :alt="parent.$t('message.hello')">
  </a>
</div>
...
```
