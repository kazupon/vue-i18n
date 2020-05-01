# Запасная локализация

_Вкратце: Используйте `fallbackLocale: '<lang>'` для определения языка, который будет использоваться, если нет перевода в выбранной локализации._

## Неявное использование запасных локализации при использовании локалей

Если `locale` содержит территорию и опционально диалект, неявные запасные локали активируются автоматически.

Например для `de-DE-bavarian` в качестве запасных будут использованы следующие:

1. `de-DE-bavarian`
2. `de-DE`
3. `de`

Для отключения автоматического использования запасных локализаций, добавьте символ `!`, например `de-DE!`

## Явное использование запасной локализации при одной локали

Иногда не все элементы переведены на некоторые языки. В этом примере, пункт `hello` доступен в английской локализации, но отсутствует в русской:

```js
const messages = {
  en: {
    hello: 'Hello, world!'
  },
  ru: {
    // упс, не все переведено
  }
}
```

Если вы хотите использовать (скажем) строки локализации из `en`, когда перевод отсутствует в нужной вам локализации, установите опцию `fallbackLocale` в конструкторе VueI18n:

```js
const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages
})
```

Шаблон:

```html
<p>{{ $t('hello') }}</p>
```

Результат:

```html
<p>Hello, world!</p>
```

По умолчанию, при использовании строк переводов из запасной локализации `fallbackLocale` будут генерироваться два предупреждения в консоли:

```console
[vue-i18n] Value of key 'hello' is not a string!
[vue-i18n] Fall back to translate the keypath 'hello' with 'en' locale.
```

To suppress these warnings (while keeping those which warn of the total absence of translation for the given key) set `silentFallbackWarn: true` when initializing the `VueI18n` instance.

## Explicit fallback with an array of locales

It is possible to set more than one fallback locale by using an array of locales. For example

```js
fallbackLocale: [ 'fr', en' ],
```

## Explicit fallback with decision maps

If more complex decision maps for fallback locales are required, it is possible to define decision maps with according fallback locales.

Using the following decision map

```js
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

| locale      | fallback chains                           |
| ----------- | ----------------------------------------- |
| `'de-CH'`   | de-CH > fr > it > en > da                 |
| `'de'`      | de > en > da                              |
| `'zh-Hant'` | zh-Hant > zh-Hans > zh > en > da          |
| `'es-SP'`   | es-SP > es > en-GB > en > da              |
| `'es-SP!'`  | es-SP > en > da                           |
| `'fr'`      | fr > en > da                              |
| `'pt-BR'`   | pt-BR > pt > es-AR > es > en-GB > en > da |
| `'es-CL'`   | es-CL > es-AR > es > en-GB > en > da      |

## Fallback interpolation

_Summary: Set `formatFallbackMessages: true` to do template interpolation on translation keys when your language lacks a translation for a key._

Since the keys to the translations are strings, you can use a user-readable message (for a particular language) as a key.
E.g.

```js
const messages = {
  ru: {
    'Hello, world!': 'Привет мир!'
  }
}
```

This is useful because you don't have to specify a translation for the string "Hello, world!" into English.

In fact, you can even include template parameters in a key. Together with `formatFallbackMessages: true`, this lets you skip writing templates for your "base" language; the keys _are_ your templates.

```js
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

Шаблон:

```html
<p>{{ $t('Hello {name}', { name: 'John' }}) }}</p>
<p>{{ $t('The weather today is {condition}!', { condition: 'sunny' }) }}</p>
```

Результат:

```html
<p>Здравствуйте, John</p>
<p>The weather today is sunny!</p>
```
