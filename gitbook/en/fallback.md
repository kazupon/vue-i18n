# Fallback localization

## Implicit fallback using locales

If a `locale` is given containing a territory and an optional dialect, the implicit fallback is activated automatically.

For example `de-DE-bavarian` would fallback
1. `de-DE-bavarian`
1. `de-DE`
1. `de`

To supress the automatic fallback, add the postfix exclamation mark `!`, for example `de-DE!`


## Explicit fallback with one locale

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


## Explicit fallback with an array of locales

It is possible to set more than one fallback locale by using an array of locales. For example

```javascript
fallbackLocale: [ 'fr', 'en' ],
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
