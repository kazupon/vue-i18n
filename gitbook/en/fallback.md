# Fallback localization

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

When specify the `fallbackLocale` option to VueI18n constructor option, `message` key is localized with `en` locale key:

```javascript
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages
})
```

Template the below:

```html
<p>{{ $t('message') }}</p>
```

Output the below:

```html
<p>hello world</p>
```
