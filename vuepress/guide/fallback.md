# Fallback localization

The following locale messages that not exist `message` key in `ja` locale:

```js
const messages = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
```

When specify the `fallbackLocale` option to VueI18n constructor option, `message` key is localized with `en` locale key:

```js
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

Note, that by default falling back to `fallbackLocale` generates two console warnings:

```console
[vue-i18n] Value of key 'message' is not a string!
[vue-i18n] Fall back to translate the keypath 'message' with 'en' locale.
```

To suppress these warnings (while keeping those which warn of the total absence of translation for the given key) set `silentFallbackWarn: true` when initializing the `VueI18n` instance.
