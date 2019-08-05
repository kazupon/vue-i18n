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

When you template the below:

```html
<p>{{ $t('Hello {name}', { name: 'John' }}) }}</p>
<p>{{ $t('The weather today is {condition}!', { condition: 'sunny' }) }}</p>
```

The following will be the output:

```html
<p>Здравствуйте John</p>
<p>The weather today is sunny!</p>
```
