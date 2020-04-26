---
sidebar: auto
---

# Справочник API

## Расширение прототипа Vue

### Опции конструктора Vue

#### i18n

- **Тип:** `I18nOptions`

Опция локализации на основе компонентов.

- **См. также:** Опции конструктора класса `VueI18n`

### Внедряемые методы

#### \$t

- **Аргументы:**

  - `{Path} key`: обязательный
  - `{Locale} locale`: опционально
  - `{Array | Object} values`: опционально

- **Возвращает:** `TranslateResult`

Получение переведённого сообщения локализации по ключу `key`. Локализация в сообщениях компонента предпочтительнее, чем в глобальных сообщениях локализации. Если не определены сообщения локализации в компоненте, то локализация осуществляется с помощью глобальных сообщений локализации. Если была определена `locale`, то используются сообщения локализации из `locale`. Если был указан `key` именованного формата / формата списков сообщений локализации, то необходимо указывать также `values`. Подробнее про значения `values` можно изучить в разделе [Формат сообщений локализации](../guide/formatting.md).

:::danger Совет
Обратите внимание, что в хуках жизненного цикла контекст должен быть экземпляром компонента (например в опции `data`, `const $t = this.$t.bind(this)`).
:::

#### \$tc

- **Аргументы:**

  - `{Path} key`: обязательный
  - `{number} choice`: опционально, по умолчанию `1`
  - `{Locale} locale`: опционально
  - `{string | Array | Object} values`: опционально

- **Возвращает:** `TranslateResult`

Получение переведённого сообщения локализации по ключу `key` с плюрализацией. Локализация в сообщениях компонента предпочтительнее, чем в глобальных сообщениях локализации. Если не определены сообщения локализации в компоненте, то локализация осуществляется с помощью глобальных сообщений локализации. Если была определена `locale`, то используются сообщения локализации из `locale`. Если укажете строковое значение для `values`, то локализуйте сообщения для этого значения. Если укажете значением Array или Object в `values`, то необходимо указывать с `values` из \$t.

:::danger Совет
Обратите внимание, что в хуках жизненного цикла контекст должен быть экземпляром компонента (например в опции `data`, `const $tc = this.$tc.bind(this)`).
:::

#### \$te

- **Аргументы:**

  - `{Path} key`: обязательный
  - `{Locale} locale`: опционально

- **Возвращает:** `boolean`

Проверяет существует ли ключ в сообщениях локализации. В экземпляре Vue, если не указаны сообщения локализации в компоненте, проверяются в глобальных сообщениях локализации. Если указали `locale`, проверяются сообщения локализации `locale`.

:::danger Совет
Обратите внимание, что в хуках жизненного цикла контекст должен быть экземпляром компонента (например в опции `data`, `const $te = this.$te.bind(this)`).
:::

#### \$d

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{number | Date} value`: обязательный
  - `{Path | Object} key`: опционально
  - `{Locale | Object} locale`: опционально

- **Возвращает:** `DateTimeFormatResult`

Локализация даты из `value` с помощью формата даты из `key`. Формат даты из `key` должен быть зарегистрирован в опции `dateTimeFormats` класса `VueI18n`, и зависит от опции `locale` конструктора `VueI18n`. Если указать аргумент `locale`, то он будет иметь приоритет над опцией `locale` конструктора `VueI18n`.

Если формат даты для `key` не указан в опции `dateTimeFormats`, будет использован запасной формат, основываясь на опции `fallbackLocale` конструктора `VueI18n`.

:::danger Совет
Обратите внимание, что в хуках жизненного цикла контекст должен быть экземпляром компонента (например в опции `data`, `const $d = this.$d.bind(this)`).
:::

#### \$n

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{number} value`: обязательный
  - `{Path | Object} format`: опционально
  - `{Locale} locale`: опционально

- **Возвращает:** `NumberFormatResult`

Локализация числа `value` с помощью формата чисел `format`. Числовой формат из `format` должен быть зарегистрирован в опции `numberFormats` класса `VueI18n`, и зависит от опции `locale` конструктора `VueI18n`. Если указать аргумент `locale`, то он будет иметь приоритет над опцией `locale` конструктора `VueI18n`.

Если формат чисел для `format` не указан в опции `numberFormats`, будет использован запасной формат, основываясь на опции `fallbackLocale` конструктора `VueI18n`.

Если второй аргумент `format` указан объектом, то в нём должны быть следующие свойства:

- `key {Path}`: опционально, форматируемое число
- `locale {Locale}`: опционально, локализация
- `style {string}`: опционально, опция форматирования чисел
- `currency {string}`: опционально, опция форматирования чисел
- `currencyDisplay {string}`: опционально, опция форматирования чисел
- `useGrouping {string}`: опционально, опция форматирования чисел
- `minimumIntegerDigits {string}`: опционально, опция форматирования чисел
- `minimumFractionDigits {string}`: опционально, опция форматирования чисел
- `maximumFractionDigits {string}`: опционально, опция форматирования чисел
- `minimumSignificantDigits {string}`: опционально, опция форматирования чисел
- `maximumSignificantDigits {string}`: опционально, опция форматирования чисел
- `localeMatcher {string}`: опционально, опция форматирования чисел
- `formatMatcher {string}`: опционально, опция форматирования чисел

Любые указанные опции форматирования числа будут иметь приоритет над значениями `numberFormats` из конструктора `VueI18n`.

:::danger Совет
Обратите внимание, что в хуках жизненного цикла контекст должен быть экземпляром компонента (например в опции `data`, `const $n = this.$n.bind(this)`).
:::

### Внедряемые свойства

#### \$i18n

- **Тип:** `I18n`

- **Только для чтения**

Получение экземпляра `VueI18n`, если был определён.

При указании в компоненте опции `i18n`  будет возможность получить экземпляр `VueI18n` в компоненте. В противном случае, можно получить корневой экземпляр `VueI18n`.

## Класс `VueI18n`

Класс `VueI18n` реализует интерфейс `I18n` из [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

### Статические свойства

#### version

- **Тип:** `string`

Версия `vue-i18n`.

#### availabilities

> :new: Добавлено в версии 7.0+

- **Тип:** `IntlAvailability`

Проверка доступности следующих возможностей интернационализации:

- `{boolean} dateTimeFormat`: форматирование дат для локалей

- `{boolean} numberFormat`: форматирование чисел для локалей

Указанные выше возможности интернационализации зависят от [окружения браузера](http://kangax.github.io/compat-table/esintl/), в котором реализован ECMAScript Internationalization API (ECMA-402).

### Опции конструктора

Можно указывать некоторые опции конструктора `I18nOptions`, основываясь на [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### locale

- **Тип:** `Locale`

- **По умолчанию:** `'en-US'`

Локаль используемая для локализации. Если локаль содержит территорию и диалект, то эта локаль явно указывает на запасную локализацию.

#### fallbackLocale

- **Тип:** `FallbackLocale`

- **По умолчанию:** `false`

Запасная локаль для локализации. Подробнее можно изучить в разделе [Запасная локализация](../guide/fallback.md).

#### messages

- **Тип:** `LocaleMessages`

- **По умолчанию:** `{}`

Сообщения локализации для локали.

#### dateTimeFormats

> :new: Добавлено в версии 7.0+

- **Тип:** `DateTimeFormats`

- **По умолчанию:** `{}`

Форматы дат для локализации.

- **См. также:** тип `DateTimeFormats` в [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### numberFormats

> :new: Добавлено в версии 7.0+

- **Тип:** `NumberFormats`

- **По умолчанию:** `{}`

Форматы чисел для локализации.

- **См. также:** тип `NumberFormats` в [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### availableLocales

> :new: Добавлено в версии 8.9.0+

- **Тип:** `Locale[]`

- **По умолчанию:** `[]`

- **Примеры:** `["en", "ru"]`

Список доступных локалей в `messages` в лексическом порядке.

#### formatter

- **Тип:** `Formatter`

- **По умолчанию:** Встроенный formatter

Форматтер, реализующий интерфейс `Formatter`.

#### modifiers

> :new: Добавлено в версии 8.15.0+

- **Тип:** `Modifier`

- **По умолчанию:** модификаторы `lower` и `upper`

Функции модификаторов для связанных сообщений

#### missing

- **Тип:** `MissingHandler`

- **По умолчанию:** `null`

Обработчик для отсутствующих сообщений локализации. Обработчик будет вызван с локалью, ключом для сообщений локализаций и значениями values.

Если указан этот обработчик и произойдёт попытка доступа к отсутствующему сообщению локализации, то предупреждения в консоли не будет.

#### fallbackRoot

- **Тип:** `Boolean`

- **По умолчанию:** `true`

In the component localization, whether to fall back to root level (global) localization when localization fails.

If `false`, it's warned, and is returned the key.

#### sync

- **Тип:** `Boolean`

- **По умолчанию:** `true`

Whether synchronize the root level locale to the component localization locale.

If `false`, regardless of the root level locale, localize for each component locale.

#### silentTranslationWarn

> 6.1+, :up: 8.13

- **Тип:** `Boolean | RegExp`

- **По умолчанию:** `false`

Whether suppress warnings outputted when localization fails.

If `true`, suppress localization fail warnings.
If you use regular expression, you can suppress localization fail warnings that it match with translation `key` (e.g. `$t`).

#### silentFallbackWarn

> :new: Добавлено в версии 8.8+, :up: 8.13

- **Тип:** `Boolean | RegExp`

- **По умолчанию:** `false`

Whether suppress warnings when falling back to either `fallbackLocale` or `root`.

If `true`, warnings will be generated only when no translation is available at all, and not for fallbacks.
If you use regular expression, you can suppress the fallback warnings that it match `key` (e.g. `$t`).

#### preserveDirectiveContent

> 8.7+

- **Тип:** `Boolean`

- **По умолчанию:** `false`

Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.

#### warnHtmlInMessage

> 8.11+

- **Тип:** `WarnHtmlInMessageLevel`

- **По умолчанию:** `off`

Whether to allow the use locale messages of HTML formatting. See the `warnHtmlInMessage` property.

:::danger Внимание!
In next major version, `warnHtmlInMessage` option is `warn` as default.
:::

#### sharedMessages

> 8.12+

- **Тип:** `LocaleMessages`

- **По умолчанию:** `undefined`

The shared locale messages of localization for components. More detail see [Component based localizatrion](../guide/component.md#shared-locale-messages-for-components).

#### postTranslation

> 8.16+

- **Тип:** `PostTranslationHandler`

- **По умолчанию:** `null`

Пост-обработчик локализации. Выполняется после вызова `$t`, `t`, `$tc` и `tc`.

Это может пригодиться, если необходимо дополнительно обработать текст перевода, например избавиться от висящих пробелов.

### Свойства

#### locale

- **Тип:** `Locale`

- **Чтение/Запись**

The locale of localization. If the locale contains a territory and a dialect, this locale contains an implicit fallback.

#### fallbackLocale

- **Тип:** `FallbackLocale`

- **Чтение/Запись**

The locale of fallback localization. For more complex fallback definitions see [fallback](../guide/fallback.md).

#### messages

- **Тип:** `LocaleMessages`

- **Только для чтения**

The locale messages of localization.

#### dateTimeFormats

> :new: Добавлено в версии 7.0+

- **Тип:** `DateTimeFormats`

- **Только для чтения**

The datetime formats of localization.

#### numberFormats

> :new: Добавлено в версии 7.0+

- **Тип:** `NumberFormats`

- **Только для чтения**

The number formats of localization.

#### missing

- **Тип:** `MissingHandler`

- **Чтение/Запись**

A handler for localization missing.

#### formatter

- **Тип:** `Formatter`

- **Чтение/Запись**

The formatter that implemented with `Formatter` interface.

#### silentTranslationWarn

> 6.1+, :up: 8.13

- **Тип:** `Boolean | RegExp`

- **Чтение/Запись**

Whether suppress warnings outputted when localization fails.

#### silentFallbackWarn

> :new: Добавлено в версии 8.8+, :up: 8.13

- **Тип:** `Boolean | RegExp`

- **Чтение/Запись**

Whether suppress fallback warnings when localization fails.

#### preserveDirectiveContent

> 8.7+

- **Тип:** `Boolean`

- **Чтение/Запись**

Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.

#### warnHtmlInMessage

> 8.11+

- **Тип:** `WarnHtmlInMessageLevel`

- **Чтение/Запись**

Whether to allow the use locale messages of HTML formatting.

If you set `warn` or`error`, will check the locale messages on the VueI18n instance.
If you are specified `warn`, a warning will be output at console.
If you are specified `error` will occured an Error.

In VueI18n instance, set the `off` as default.

#### postTranslation

> 8.16+

- **Тип:** `PostTranslationHandler`

- **Чтение/Запись**

A handler for post processing of translation.

### Методы

#### getChoiceIndex

- **Аргументы:**

  - `{number} choice`
  - `{number} choicesLength`

- **Возвращает:** `finalChoice {number}`

Get pluralization index for current pluralizing number and a given amount of choices. Can be overridden through prototype mutation:

```js
VueI18n.prototype.getChoiceIndex = /* пользовательская реализация */
```

#### getLocaleMessage( locale )

- **Аргументы:**

  - `{Locale} locale`

- **Возвращает:** `LocaleMessageObject`

Get the locale message of locale.

#### setLocaleMessage( locale, message )

- **Аргументы:**

  - `{Locale} locale`
  - `{LocaleMessageObject} message`

Set the locale message of locale.

:::tip ПРИМЕЧАНИЕ

> 8.11+

If you set `warn` or`error` in the `warnHtmlInMessage` property, when this method is executed, it will check if HTML formatting is used for locale message.
:::

#### mergeLocaleMessage( locale, message )

> 6.1+

- **Аргументы:**

  - `{Locale} locale`
  - `{LocaleMessageObject} message`

Merge the registered locale messages with the locale message of locale.

:::tip ПРИМЕЧАНИЕ

> 8.11+

If you set `warn` or`error` in the `warnHtmlInMessage` property, when this method is executed, it will check if HTML formatting is used for locale message.
:::

#### t( key, [locale], [values] )

- **Аргументы:**

  - `{Path} key`: обязательный
  - `{Locale} locale`: опционально
  - `{Array | Object} values`: опционально

- **Возвращает:** : `TranslateResult`

This is the same as the `Function` returned with `$t` method. More detail see [\$t](#t).

#### i( key, [locale], [values] )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{Path} key`: обязательный
  - `{Locale} locale`: опционально
  - `{Array} values`: опционально

- **Возвращает:** : `TranslateResult`

#### tc( key, [choice], [values] )

- **Аргументы:**

  - `{Path} key`: обязательный
  - `{number} choice`: опционально, по умолчанию `1`
  - `{string | Array | Object} values`: опционально

- **Возвращает:** `TranslateResult`

This is the same as the `Function` returned `$tc` method. More detail see [\$tc](#tc).

#### te( key, [locale] )

- **Аргументы:**

  - `{string} key`: обязательный
  - `{Locale} locale`: опционально

- **Возвращает:** `boolean`

Check whether key path exists in global locale message. If you specified `locale`, check the locale message of `locale`.

#### getDateTimeFormat ( locale )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{Locale} locale`

- **Возвращает:** `DateTimeFormat`

Get the datetime format of locale.

#### setDateTimeFormat ( locale, format )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{Locale} locale`
  - `{DateTimeFormat} format`

Set the datetime format of locale.

#### mergeDateTimeFormat ( locale, format )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{Locale} locale`
  - `{DateTimeFormat} format`

Merge the registered datetime formats with the datetime format of locale.

#### d( value, [key], [locale] )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{number | Date} value`: обязательный
  - `{Path | Object} key`: опционально
  - `{Locale | Object} locale`: опционально

- **Возвращает:** `DateTimeFormatResult`

This is the same as `$d` method of Vue instance method. More detail see [\$d](#d).

#### getNumberFormat ( locale )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{Locale} locale`

- **Возвращает:** `NumberFormat`

Get the number format of locale.

#### setNumberFormat ( locale, format )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{Locale} locale`
  - `{NumberFormat} format`

Set the number format of locale.

#### mergeNumberFormat ( locale, format )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{Locale} locale`
  - `{NumberFormat} format`

Merge the registered number formats with the number format of locale.

#### n( value, [format], [locale] )

> :new: Добавлено в версии 7.0+

- **Аргументы:**

  - `{number} value`: обязательный
  - `{Path | Object} format`: опционально
  - `{Locale} locale`: опционально

- **Возвращает:** `NumberFormatResult`

This is the same as `$n` method of Vue instance method. More detail see [\$n](#n).

## Директивы

> :new: Добавлено в версии 7.3+

### v-t

- **Ожидает:** `string | Object`

- **Модификаторы:**

  - `.preserve`: (8.7.0+) preserves element `textContent` when directive is unbinded.

- **Подробности:**

Update the element `textContent` that localized with locale messages. You can use string syntax or object syntax. string syntax can be specified as a keypath of locale messages. If you can be used object syntax, you need to specify as the object key the following params:

    * path: обязательный, key of locale messages
    * locale: опционально, локализация
    * args: опционально, for list or named formatting

:::tip ПРИМЕЧАНИЕ
The element `textContent` will be cleared by default when `v-t` directive is unbinded. This might be undesirable situation when used inside [transitions](https://ru.vuejs.org/v2/guide/transitions.html). To preserve `textContent` data after directive unbind use `.preserve` modifier or global [`preserveDirectiveContent` option](#preservedirectivecontent).
:::

- **Примеры:**

```html
<!-- string syntax: literal -->
<p v-t="'foo.bar'"></p>

<!-- string syntax: binding via data or computed props -->
<p v-t="msg"></p>

<!-- object syntax: literal -->
<p v-t="{ path: 'hi', локализация: 'ru', args: { name: 'kazupon' } }"></p>

<!-- object syntax: binding via data or computed props -->
<p v-t="{ path: greeting, args: { name: fullName } }"></p>

<!-- with preserve modifier -->
<p v-t.preserve="'foo.bar'"></p>
```

- **См. также:** [Custom directive localization](../guide/directive.md)

## Компоненты

### Функциональный компонент i18n

> :new: Добавлено в версии 7.0+

#### Входные параметры:

- `path {Path}`: обязательный, путь к сообщению локализации
- `locale {Locale}`: опционально, локализация
- `tag {string}`: опционально, по умолчанию `span`
- `places {Array | Object}`: опционально (7.2+)

:::danger Внимание!
In next major version, `places` prop is deprecated. Please switch to slots syntax.
:::

#### Использование:

```html
<div id="app">
  <!-- ... -->
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

```js
const messages = {
  en: {
    tos: 'Term of Service',
    term: 'I accept xxx {0}.'
  },
  ru: {
    tos: 'Условия обслуживания',
    term: 'Я соглашаюсь с xxx {0}.'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

#### См. также:

[Component interpolation](../guide/interpolation.md)

### Функциональный компонент i18n-n

> :new: Добавлено в версии 8.10+

#### Входные параметры:

- `value {number}`: обязательный, число для форматирования
- `format {string | NumberFormatOptions}`: опционально, форматируемое число name or object with explicit format options
- `locale {Locale}`: опционально, локализация
- `tag {string}`: опционально, по умолчанию `span`

#### Использование:

```html
<div id="app">
  <!-- ... -->
  <i18n-n :value="money" format="currency" tag="label">
    <span v-slot:currency="slotProps" class="font-weight: bold">{{ slotProps.currency }}<span>
  </i18n-n>
  <!-- ... -->
</div>
```

```js
var numberFormats = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'ru-RU': {
    currency: {
      style: 'currency',
      currency: 'RUB'
    }
  }
}

const i18n = new VueI18n({
  locale: 'en-US',
  numberFormats
})

new Vue({
  i18n,
  data: {
    money: 10234
  }
}).$mount('#app')
```

#### Scoped slots

`<i18n-n>` functional component can accept a number of named scoped slots. List of supported slot names is based on [`Intl.NumberFormat.formatToParts()` output types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/formatToParts):

- `currency`
- `decimal`
- `fraction`
- `group`
- `infinity`
- `integer`
- `literal`
- `minusSign`
- `nan`
- `plusSign`
- `percentSign`

Each of these named scoped slots will accept three scope parameters:

- `[slotName] {FormattedNumberPartType}`: parameter of the same name as actual slot name (like `integer`)
- `index {Number}`: index of the specific part in the array of number parts
- `parts {Array}`: array of all formatted number parts

#### См. также:

[Number custom formatting](../guide/number.md#custom-formatting)

## Специальный атрибуты

### place

> :new: Добавлено в версии 7.2+

#### Ожидает: `{number | string}`

Used on component interpolation to indicate which index of list formatting or key of named formatting.

For detailed usage, see the guide section linked below.

#### См. также:

[Component interpolation](../guide/interpolation.md)
