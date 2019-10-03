# Fallback localization

The following locale messages with a `message` key that doesn't exist in the `ja` locale:

```js
const messages = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
```

When specifying the `fallbackLocale` option in the VueI18n constructor option, `message` key is localized with `en` locale key:

```js
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages
})
```

Template:

```html
<p>{{ $t('message') }}</p>
```

Output:

```html
<p>hello world</p>
```

Note that, by default, falling back to `fallbackLocale` generates two console warnings:

```console
[vue-i18n] Value of key 'message' is not a string!
[vue-i18n] Fall back to translate the keypath 'message' with 'en' locale.
```

To suppress these warnings (while keeping those which warn of the total absence of translation for the given key) set `silentFallbackWarn: true` when initializing the `VueI18n` instance.

## Fallback interpolation

Since the keys to the translations are strings, the original message can be used as a key instead of the path.
E.g.

```javascript
const messages = {
  ja: {
    'Hello world': 'こんにちは、世界'
  }
}
```

This way the translations can be used in a very natural way, automatically falling back to the source language if the translated string cannot be found:

```html
<p>{{ $t('Hello world') }}</p>
```

To enrich this feature, interpolation of fallback messages can be turned on by setting `formatFallbackMessages` to `true`:

```javascript
const messages = {
  ru: {
    'Hello {name}': 'Здравствуйте {name}'
  }
}

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  messages
})
```

When the template is as below:

```html
<p>{{ $t('Hello {name}', { name: 'John' }}) }}</p>
<p>{{ $t('The weather today is {condition}!', { condition: 'sunny' }) }}</p>
```

The following will be output:

```html
<p>Здравствуйте John</p>
<p>The weather today is sunny!</p>
```
