# Fallback translation

Locale the following:

```javascript
var locales = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
Vue.config.lang = 'ja'
```

Template the following:

```html
<p>{{ $t('message') }}</p>
```

Output the following:

```html
<p>hello world</p>
```
