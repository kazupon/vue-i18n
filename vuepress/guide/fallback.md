# Fallback localization

*Summary: Use `fallbackLocale: '<lang>'` to choose which language to use when your preferred language lacks a translation.*

## Implicit fallback using locales

If a `locale` is given containing a territory and an optional dialect, the implicit fallback is activated automatically.

For example `de-DE-bavarian` would fallback
1. `de-DE-bavarian`
1. `de-DE`
1. `de`

To suppress the automatic fallback, add the postfix exclamation mark `!`, for example `de-DE!`

## Explicit fallback with one locale

Sometimes some items will not be translated into some languages. In this example, the item `hello` is available in English but not Japanese:

```js
const messages = {
  en: {
    hello: 'Hello, world!'
  },
  ja: {
  }
}
```

If you want to use (say) `en` items when an item is not available in your desired locale, set the `fallbackLocale` option in the VueI18n constructor:

```js
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages
})
```

Template:

```html
<p>{{ $t('hello') }}</p>
```

Output:

```html
<p>Hello, world!</p>
```

By default, falling back to `fallbackLocale` generates two console warnings:

```console
[vue-i18n] Value of key 'hello' is not a string!
[vue-i18n] Fall back to translate the keypath 'hello' with 'en' locale.
```

To suppress these warnings (while keeping those which warn of the total absence of translation for the given key) set `silentFallbackWarn: true` when initializing the `VueI18n` instance.

## Explicit fallback with an array of locales

It is possible to set more than one fallback locale by using an array of locales. For example

```javascript
fallbackLocale: [ 'fr', en' ],
```

## Explicit fallback with decision maps
If more complex decision maps for fallback locales are required, it is possible to define decision maps with according fallback locales.
Using the following decision map
```javascript
fallbackLocale: {
  /* 1 */ 'de-CH':   ['fr', 'it'],
  /* 2 */ 'zh-Hant': ['zh-Hans'],
  /* 3 */ 'es-CL':   ['es-AR'],
  /* 4 */ 'es':      ['en-GB'],
  /* 5 */ 'pt':      ['es-AR'],
  /* 6 */ 'default': ['en', 'da']
},
```
will result in the following fallback chains
| locale | fallback chains |
|--------|-----------------|
| `'de-CH'`   | de-CH > fr > it > en > da |
| `'de'`      | de > en > da |
| `'zh-Hant'` | zh-Hant > zh-Hans > zh > en > da |
| `'es-SP'`   | es-SP > es > en-GB > en > da |
| `'es-SP!'`  | es-SP > en > da |
| `'fr'`      | fr > en > da |
| `'pt-BR'`   | pt-BR > pt > es-AR > es > en-GB > en > da |
| `'es-CL'`   | es-CL > es-AR > es > en-GB > en > da |

## Fallback interpolation

*Summary: Set `formatFallbackMessages: true` to do template interpolation on translation keys when your language lacks a translation for a key.*

Since the keys to the translations are strings, you can use a user-readable message (for a particular language) as a key.
E.g.

```javascript
const messages = {
  ja: {
    'Hello, world!': 'こんにちは、世界!'
  }
}
```

This is useful because you don't have to specify a translation for the string "Hello, world!" into English.

In fact, you can even include template parameters in a key. Together with `formatFallbackMessages: true`, this lets you skip writing templates for your "base" language; the keys *are* your templates.

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
<p>Здравствуйте, John</p>
<p>The weather today is sunny!</p>
```
