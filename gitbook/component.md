# Component locale

You can translate component based.

The below locale setting example:

```javascript
var locales = {
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
      
Vue.config.lang = 'ja'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

new Vue({
  el: 'body',
  components: {
    component1: {
      template: '<p>orverride message.hello locale in component1: {{ $t("message.hello") }}</p>'
        + '<p>global message.greeting locale in component1: {{ $t("message.greeting") }}</p>',
      locales: {
        en: { message: { hello: 'hello component1' } },
        ja: { message: { hello: 'こんにちは、component1' } }
      }
    }
  }
})
```

Template the following:

```html
<div id="app">
  <p>global message.hello locale: {{ $t('message.hello') }}</p>
  <component1></component1>
</div>
```

Output the following:

```html
<div id="app">
  <p>global message.hello locale: こんにちは、世界</p>
  <p>orverride message.hello locale in component1: こんにちは、component1</p>
  <p>global message.greeting locale in component1: おはようございます</p>
</div>
```

> :pencil: If you set the locale of same keypath as global locale (`Vue.locale()`), in its component, `$t` is translate with component locale.
