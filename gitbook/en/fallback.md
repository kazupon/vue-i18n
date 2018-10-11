# Fallback localization

When the `message` key does not exist in the `ja` locale:

```javascript
const messages = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
```

And you have specified a `fallbackLocale` in the VueI18n constructor option, the `message` key uses the corresponding `en` locale key as a fallback:

```javascript
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages
})
```

When you template the below:

```html
<p>{{ $t('message') }}</p>
```

The following will be the output:

```html
<p>hello world</p>
```
