---
sidebar: auto
---

# Справочник API

## Расширение Vue

### Опции конструктора Vue

#### i18n

  * **Тип:** `I18nOptions`

Component based localization option.

  * **См. также:** `VueI18n` class constructor options

### Внедряемые методы

#### $t

  * **Аргументы:**

    * `{Path} key`: обязательный
    * `{Locale} locale`: опционально
    * `{Array | Object} values`: опционально
  * **Возвращает:** `TranslateResult`

Localize the locale message of `key`. Localize in preferentially component locale messages than global locale messages. If not specified component locale messages, localize with global locale messages. If you specified `locale`, localize the locale messages of `locale`. If you specified `key` of list / named formatting local messages, you must specify `values` too. For `values` more details see [Formatting](../guide/formatting.md).

:::danger Совет
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $t = this.$t.bind(this)`).
:::

#### $tc

  * **Аргументы:**

    * `{Path} key`: обязательный
    * `{number} choice`: опционально, по умолчанию 1
    * `{Locale} locale`: опционально
    * `{string | Array | Object} values`: опционально
  * **Возвращает:** `TranslateResult`

Localize the locale message of `key` with pluralization. Localize in preferentially component locale messages than global locale messages. If not specified component locale messages, localize with global locale messages. If you specified `locale`, localize the locale messages of `locale`. If you will specify string value to `values`, localize the locale messages of value. If you will specify Array or Object value to `values`, you must specify with `values` of $t.

:::danger Совет
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $tc = this.$tc.bind(this)`).
:::

#### $te

  * **Аргументы:**

    * `{Path} key`: обязательный
    * `{Locale} locale`: опционально
  * **Возвращает:** `boolean`

Check whether key exists. In Vue instance, If not specified component locale messages, check with global locale messages. If you specified `locale`, check the locale messages of `locale`.

:::danger Совет
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $te = this.$te.bind(this)`).
:::

#### $d

> :new: 7.0+

  * **Аргументы:**

    * `{number | Date} value`: обязательный
    * `{Path | Object} key`: опционально
    * `{Locale | Object} locale`: опционально
  * **Возвращает:** `DateTimeFormatResult`

Localize the datetime of `value` with datetime format of `key`. The datetime format of `key` need to register to `dateTimeFormats` option of `VueI18n` class, and depend on `locale` option of `VueI18n` constructor. If you will specify `locale` argument, it will have priority over `locale` option of `VueI18n` constructor.

If the datetime format of `key` not exist in `dateTimeFormats` option, fallback to depend on `fallbackLocale` option of `VueI18n` constructor.

:::danger Совет
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $n = this.$n.bind(this)`).
:::

#### $n

> :new: 7.0+

  * **Аргументы:**

    * `{number} value`: обязательный
    * `{Path | Object} format`: опционально
    * `{Locale} locale`: опционально
  * **Возвращает:** `NumberFormatResult`

Localize the number of `value` with number format of `format`. The number format of `format` need to register to `numberFormats` option of `VueI18n` class, and depend on `locale` option of `VueI18n` constructor. If you will specify `locale` argument, it will have priority over `locale` option of `VueI18n` constructor.

If the number format of `format` not exist in `numberFormats` option, fallback to depend on `fallbackLocale` option of `VueI18n` constructor.

If the second `format` argument specified as an object, it should have the following properties:

* `key {Path}`: опционально, number format
* `locale {Locale}`: опционально, locale
* `style {string}`: опционально, number format option
* `currency {string}`: опционально, number format option
* `currencyDisplay {string}`: опционально, number format option
* `useGrouping {string}`: опционально, number format option
* `minimumIntegerDigits {string}`: опционально, number format option
* `minimumFractionDigits {string}`: опционально, number format option
* `maximumFractionDigits {string}`: опционально, number format option
* `minimumSignificantDigits {string}`: опционально, number format option
* `maximumSignificantDigits {string}`: опционально, number format option
* `localeMatcher {string}`: опционально, number format option
* `formatMatcher {string}`: опционально, number format option

Any specified number format options will have priority over `numberFormats` of `VueI18n` constructor.

:::danger Совет
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $d = this.$d.bind(this)`).
:::

### Внедряемые свойства

#### $i18n

  * **Тип:** `I18n`

  * **Только для чтения**

Get a `VueI18n` instance. If you are specify.

If you have specified an `i18n` option at component options, you will be able to get a `VueI18n` instance at the component, Otherwise, you will be able get root `VueI18n` instance.

## Класс `VueI18n`

`Vuei18n` class implement `I18n` interface of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

### Статические свойства

#### version

  * **Тип:** `string`

vue-i18n version.

#### availabilities

> :new: 7.0+

  * **Тип:** `IntlAvailability`

Whether the following internationalization features are available:

  * `{boolean} dateTimeFormat`: locale sensitive datetime formatting

  * `{boolean} numberFormat`: locale sensitive number formatting

The above internationalization features are depends on [the browser environments](http://kangax.github.io/compat-table/esintl/), due to implement with ECMAScript Internationalization API (ECMA-402).

### Опции конструктора

You can specify the below some options of `I18nOptions` constructor options of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### locale

  * **Тип:** `Locale`

  * **По умолчанию:** `'en-US'`

The locale of localization.

#### fallbackLocale

  * **Тип:** `Locale`

  * **По умолчанию:** `'en-US'`

The locale of fallback localization.

#### messages

  * **Тип:** `LocaleMessages`

  * **По умолчанию:** `{}`

The locale messages of localization.

#### dateTimeFormats

> :new: 7.0+

  * **Тип:** `DateTimeFormats`

  * **По умолчанию:** `{}`

The datetime formats of localization.

  * **См. также:** `DateTimeFormats` type of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### numberFormats

> :new: 7.0+

  * **Тип:** `NumberFormats`

  * **По умолчанию:** `{}`

The number formats of localization.

  * **См. также:** `NumberFormats` type of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### availableLocales

> :new: 8.9.0+

  * **Тип:** `Locale[]`

  * **По умолчанию:** `[]`

  * **Примеры:** `["en", "ru"]`

The list of available locales in `messages` in lexical order.

#### formatter

  * **Тип:** `Formatter`

  * **По умолчанию:** Built in formatter

The formatter that implemented with `Formatter` interface.

#### modifiers

> :new: 8.15.0+

  * **Тип:** `Modifier`

  * **По умолчанию:** `lower` and `upper` modifiers

Modifiers functions for linked messages

#### missing

  * **Тип:** `MissingHandler`

  * **По умолчанию:** `null`

A handler for localization missing. The handler gets called with the localization target locale, localization path key, the Vue instance and values.

If missing handler is assigned, and occurred localization missing, it's not warned.

#### fallbackRoot

  * **Тип:** `Boolean`

  * **По умолчанию:** `true`

In the component localization, whether to fall back to root level (global) localization when localization fails.

If `false`, it's warned, and is returned the key.

#### sync

  * **Тип:** `Boolean`

  * **По умолчанию:** `true`

Whether synchronize the root level locale to the component localization locale.

If `false`, regardless of the root level locale, localize for each component locale.

#### silentTranslationWarn

> 6.1+, :up: 8.13

  * **Тип:** `Boolean | RegExp`

  * **По умолчанию:** `false`

Whether suppress warnings outputted when localization fails.

If `true`, suppress localization fail warnings.
If you use regular expression, you can suppress localization fail warnings that it match with translation `key` (e.g. `$t`).

#### silentFallbackWarn

> :new: 8.8+, :up: 8.13

  * **Тип:** `Boolean | RegExp`

  * **По умолчанию:** `false`

Whether suppress warnings when falling back to either `fallbackLocale` or `root`.

If `true`, warnings will be generated only when no translation is available at all, and not for fallbacks.
If you use regular expression, you can suppress the fallback warnings that it match `key` (e.g. `$t`).

#### preserveDirectiveContent

> 8.7+

  * **Тип:** `Boolean`

  * **По умолчанию:** `false`

Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.

#### warnHtmlInMessage

> 8.11+

  * **Тип:** `WarnHtmlInMessageLevel`

  * **По умолчанию:** `off`

Whether to allow the use locale messages of HTML formatting. See the `warnHtmlInMessage` property.

:::danger Внимание!
In next major version, `warnHtmlInMessage` option is `warn` as default.
:::

#### sharedMessages

> 8.12+

  * **Тип:** `LocaleMessages`

  * **По умолчанию:** `undefined`

The shared locale messages of localization for components. More detail see [Component based localizatrion](../guide/component.md#shared-locale-messages-for-components).

#### postTranslation

> 8.16+

  * **Тип:** `PostTranslationHandler`

  * **По умолчанию:** `null`

A handler for post processing of translation. The handler gets after being called with the `$t`, `t`, $tc, and `tc`.

This handler is useful if you want to filter on translated text such as space trimming.

### Свойства

#### locale

  * **Тип:** `Locale`

  * **Чтение/Запись**

The locale of localization.

#### fallbackLocale

  * **Тип:** `Locale`

  * **Чтение/Запись**

The locale of fallback localization.

#### messages

  * **Тип:** `LocaleMessages`

  * **Только для чтения**

The locale messages of localization.

#### dateTimeFormats

> :new: 7.0+

  * **Тип:** `DateTimeFormats`

  * **Только для чтения**

The datetime formats of localization.

#### numberFormats

> :new: 7.0+

  * **Тип:** `NumberFormats`

  * **Только для чтения**

The number formats of localization.

#### missing

  * **Тип:** `MissingHandler`

  * **Чтение/Запись**

A handler for localization missing.

#### formatter

  * **Тип:** `Formatter`

  * **Чтение/Запись**

The formatter that implemented with `Formatter` interface.

#### silentTranslationWarn

> 6.1+, :up: 8.13

  * **Тип:** `Boolean | RegExp`

  * **Чтение/Запись**

Whether suppress warnings outputted when localization fails.

#### silentFallbackWarn

> :new: 8.8+, :up: 8.13

  * **Тип:** `Boolean | RegExp`

  * **Чтение/Запись**

Whether suppress fallback warnings when localization fails.

#### preserveDirectiveContent

> 8.7+

  * **Тип:** `Boolean`

  * **Чтение/Запись**

Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.

#### warnHtmlInMessage

> 8.11+

  * **Тип:** `WarnHtmlInMessageLevel`

  * **Чтение/Запись**

Whether to allow the use locale messages of HTML formatting.

If you set `warn` or` error`, will check the locale messages on the VueI18n instance.

If you are specified `warn`, a warning will be output at console.
If you are specified `error` will occured an Error.

In VueI18n instance, set the `off` as default.

#### postTranslation

> 8.16+

  * **Тип:** `PostTranslationHandler`

  * **Чтение/Запись**

A handler for post processing of translation.

### Методы

#### getChoiceIndex

  * **Аргументы:**
    * `{number} choice`
    * `{number} choicesLength`

  * **Возвращает:** `finalChoice {number}`

Get pluralization index for current pluralizing number and a given amount of choices. Can be overridden through prototype mutation:

```js
VueI18n.prototype.getChoiceIndex = /* custom implementation */
```

#### getLocaleMessage( locale )

  * **Аргументы:**

    * `{Locale} locale`
  * **Возвращает:** `LocaleMessageObject`

Get the locale message of locale.

#### setLocaleMessage( locale, message )

  * **Аргументы:**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

Set the locale message of locale.

:::tip ПРИМЕЧАНИЕ
> 8.11+

If you set `warn` or` error` in the `warnHtmlInMessage` property, when this method is executed, it will check if HTML formatting is used for locale message.
:::

#### mergeLocaleMessage( locale, message )

> 6.1+

  * **Аргументы:**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

Merge the registered locale messages with the locale message of locale.

:::tip ПРИМЕЧАНИЕ
> 8.11+

If you set `warn` or` error` in the `warnHtmlInMessage` property, when this method is executed, it will check if HTML formatting is used for locale message.
:::

#### t( key, [locale], [values] )

  * **Аргументы:**

    * `{Path} key`: обязательный
    * `{Locale} locale`: опционально
    * `{Array | Object} values`: опционально
  * **Возвращает:** : `TranslateResult`

This is the same as the `Function` returned with `$t` method. More detail see [$t](#t).

#### i( key, [locale], [values] )

> :new: 7.0+

  * **Аргументы:**

    * `{Path} key`: обязательный
    * `{Locale} locale`: опционально
    * `{Array} values`: опционально
  * **Возвращает:** : `TranslateResult`

#### tc( key, [choice], [values] )

  * **Аргументы:**

    * `{Path} key`: обязательный
    * `{number} choice`: опционально, по умолчанию `1`
    * `{string | Array | Object} values`: опционально
  * **Возвращает:** `TranslateResult`

This is the same as the `Function` returned `$tc` method. More detail see [$tc](#tc).

#### te( key, [locale] )

  * **Аргументы:**

    * `{string} key`: обязательный
    * `{Locale} locale`: опционально
  * **Возвращает:** `boolean`

Check whether key path exists in global locale message. If you specified `locale`, check the locale message of `locale`.

#### getDateTimeFormat ( locale )

> :new: 7.0+

  * **Аргументы:**

    * `{Locale} locale`
  * **Возвращает:** `DateTimeFormat`

Get the datetime format of locale.

#### setDateTimeFormat ( locale, format )

> :new: 7.0+

  * **Аргументы:**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

Set the datetime format of locale.

#### mergeDateTimeFormat ( locale, format )

> :new: 7.0+

  * **Аргументы:**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

Merge the registered datetime formats with the datetime format of locale.

#### d( value, [key], [locale] )

> :new: 7.0+

  * **Аргументы:**

    * `{number | Date} value`: обязательный
    * `{Path | Object} key`: опционально
    * `{Locale | Object} locale`: опционально
  * **Возвращает:** `DateTimeFormatResult`

This is the same as `$d` method of Vue instance method. More detail see [$d](#d).

#### getNumberFormat ( locale )

> :new: 7.0+

  * **Аргументы:**

    * `{Locale} locale`
  * **Возвращает:** `NumberFormat`

Get the number format of locale.

#### setNumberFormat ( locale, format )

> :new: 7.0+

  * **Аргументы:**

    * `{Locale} locale`
    * `{NumberFormat} format`

Set the number format of locale.

#### mergeNumberFormat ( locale, format )

> :new: 7.0+

  * **Аргументы:**

    * `{Locale} locale`
    * `{NumberFormat} format`

Merge the registered number formats with the number format of locale.

#### n( value, [format], [locale] )

> :new: 7.0+

  * **Аргументы:**

    * `{number} value`: обязательный
    * `{Path | Object} format`: опционально
    * `{Locale} locale`: опционально
  * **Возвращает:** `NumberFormatResult`

This is the same as `$n` method of Vue instance method. More detail see [$n](#n).

## Директивы

> :new: 7.3+

### v-t

  * **Ожидает:** `string | Object`

  * **Модификаторы:**

    * `.preserve`: (8.7.0+) preserves element `textContent` when directive is unbinded.

  * **Подробности:**

Update the element `textContent` that localized with locale messages. You can use string syntax or object syntax. string syntax can be specified as a keypath of locale messages. If you can be used object syntax, you need to specify as the object key the following params:

    * path: обязательный, key of locale messages
    * locale: опционально, locale
    * args: опционально, for list or named formatting

:::tip ПРИМЕЧАНИЕ
The element `textContent` will be cleared by default when `v-t` directive is unbinded. This might be undesirable situation when used inside [transitions](https://vuejs.org/v2/guide/transitions.html). To preserve `textContent` data after directive unbind use `.preserve` modifier or global [`preserveDirectiveContent` option](#preservedirectivecontent).
:::
  * **Примеры:**
```html
<!-- string syntax: literal -->
<p v-t="'foo.bar'"></p>

<!-- string syntax: binding via data or computed props -->
<p v-t="msg"></p>

<!-- object syntax: literal -->
<p v-t="{ path: 'hi', locale: 'ru', args: { name: 'kazupon' } }"></p>

<!-- object syntax: binding via data or computed props -->
<p v-t="{ path: greeting, args: { name: fullName } }"></p>

<!-- with preserve modifier -->
<p v-t.preserve="'foo.bar'"></p>
```

  * **См. также:** [Custom directive localization](../guide/directive.md)

## Компоненты

### Функциональный компонент i18n

> :new: 7.0+

#### Входные параметры:

  * `path {Path}`: обязательный, путь к сообщению локализации
  * `locale {Locale}`: опционально, locale
  * `tag {string}`: опционально, по умолчанию `span`
  * `places {Array | Object}`: опционально (7.2+)

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

### Функциональный компоненты i18n-n

> :new: 8.10+

#### Входные параметры:

  * `value {number}`: обязательный, number to format
  * `format {string | NumberFormatOptions}`: опционально, number format name or object with explicit format options
  * `locale {Locale}`: опционально, locale
  * `tag {string}`: опционально, по умолчанию `span`

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
      style: 'currency', currency: 'USD'
    }
  },
  'ru-RU': {
    currency: {
      style: 'currency', currency: 'RUB'
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
    money: 10234,
  }
}).$mount('#app')
```

#### Scoped slots

`<i18n-n>` functional component can accept a number of named scoped slots. List of supported slot names is based on [`Intl.NumberFormat.formatToParts()` output types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/formatToParts):

* `currency`
* `decimal`
* `fraction`
* `group`
* `infinity`
* `integer`
* `literal`
* `minusSign`
* `nan`
* `plusSign`
* `percentSign`

Each of these named scoped slots will accept three scope parameters:

* `[slotName] {FormattedNumberPartType}`: parameter of the same name as actual slot name (like `integer`)
* `index {Number}`: index of the specific part in the array of number parts
* `parts {Array}`: array of all formatted number parts

#### См. также:

[Number custom formatting](../guide/number.md#custom-formatting)

## Специальный атрибуты

### place

> :new: 7.2+

#### Ожидает: `{number | string}`

Used on component interpolation to indicate which index of list formatting or key of named formatting.

For detailed usage, see the guide section linked below.

#### См. также:

[Component interpolation](../guide/interpolation.md)
