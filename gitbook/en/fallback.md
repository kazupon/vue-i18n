# Fallback translation

The following locale messages that not exist `message` key in `ja` locale:

```javascript
const messages = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
```

When specify the `fallbackLocale` option to VueI18n constructor option, `message` key is traslated with `en` locale key:

```javascript
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages: messages
})
```

Template the following:

```html
<p>{{ $t('message') }}</p>
```

Output the following:

```html
<p>hello world</p>
```
