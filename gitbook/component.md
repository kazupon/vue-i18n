# Component locale

You can translate component based.

The below locale setting example:

```javascript
var locales = {
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
      
Vue.config.lang = 'ja'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

new Vue({
  el: '#app',
  components: {
    component1: {
      template: '<p>component1 local: {{ $t("hello") }}</p>'
        + '<p>component1 global: {{ $t("message.hello") }}</p>',
      locales: {
        en: { hello: 'hello component1' },
        ja: { hello: 'こんにちは、component1' }
      }
    }
  }
})
```

Template the following:

```html
<div id="app">
  <p>{{ $t('message.hello') }}</p>
  <component1></component1>
</div>
```

Output the following:

```html
<div id="app">
  <p>こんにちは、世界</p>
  <p>component1 local: こんにちは、component1</p>
  <p>component1 global: こんにちは、世界</p>
</div>
```

> :pencil: If you set the locale of same keypath as global locale (`Vue.locale()`), in its component, `$t` is translate with component locale.
