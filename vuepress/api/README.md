---
sidebar: auto
---

# API references

## Extension of Vue

### Vue constructor options

#### i18n

  * **Type:** `I18nOptions`

Component based localization option.

  * **See also:** `VueI18n` class constructor options

### Vue injected methods

#### $t

  * **Arguments:**

    * `{Path} key`: required
    * `{Locale} locale`: optional
    * `{Array | Object} values`: optional
  * **Return:** `TranslateResult`

Localize the locale message of `key`. Localize in preferentially component locale messages than global locale messages. If not specified component locale messages, localize with global locale messages. If you specified `locale`, localize the locale messages of `locale`. If you specified `key` of list / named formatting local messages, you must specify `values` too. For `values` more details see [Formatting](../guide/formatting.md).

:::danger Tip
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $t = this.$t.bind(this)`).
:::

#### $tc

  * **Arguments:**

    * `{Path} key`: required
    * `{number} choice`: optional, default 1
    * `{Locale} locale`: optional
    * `{string | Array | Object} values`: optional
  * **Return:** `TranslateResult`

Localize the locale message of `key` with pluralization. Localize in preferentially component locale messages than global locale messages. If not specified component locale messages, localize with global locale messages. If you specified `locale`, localize the locale messages of `locale`. If you will specify string value to `values`, localize the locale messages of value. If you will specify Array or Object value to `values`, you must specify with `values` of $t.

:::danger Tip
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $tc = this.$tc.bind(this)`).
:::

#### $te

  * **Arguments:**

    * `{Path} key`: required
    * `{Locale} locale`: optional
  * **Return:** `boolean`

Check whether key exists. In Vue instance, If not specified component locale messages, check with global locale messages. If you specified `locale`, check the locale messages of `locale`.

:::danger Tip
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $te = this.$te.bind(this)`).
:::

#### $d

> :new: 7.0+

  * **Arguments:**

    * `{number | Date} value`: required
    * `{Path | Object} key`: optional
    * `{Locale | Object} locale`: optional
  * **Return:** `DateTimeFormatResult`

Localize the datetime of `value` with datetime format of `key`. The datetime format of `key` need to register to `dateTimeFormats` option of `VueI18n` class, and depend on `locale` option of `VueI18n` constructor. If you will specify `locale` argument, it will have priority over `locale` option of `VueI18n` constructor.

If the datetime format of `key` not exist in `dateTimeFormats` option, fallback to depend on `fallbackLocale` option of `VueI18n` constructor.

:::danger Tip
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $n = this.$n.bind(this)`).
:::

#### $n

> :new: 7.0+

  * **Arguments:**

    * `{number} value`: required
    * `{Path | Object} format`: optional
    * `{Locale} locale`: optional
  * **Return:** `NumberFormatResult`

Localize the number of `value` with number format of `format`. The number format of `format` need to register to `numberFormats` option of `VueI18n` class, and depend on `locale` option of `VueI18n` constructor. If you will specify `locale` argument, it will have priority over `locale` option of `VueI18n` constructor.

If the number format of `format` not exist in `numberFormats` option, fallback to depend on `fallbackLocale` option of `VueI18n` constructor.

If the second `format` argument specified as an object, it should have the following properties:

* `key {Path}`: optional, number format
* `locale {Locale}`: optional, locale
* `style {string}`: optional, number format option
* `currency {string}`: optional, number format option
* `currencyDisplay {string}`: optional, number format option
* `useGrouping {string}`: optional, number format option
* `minimumIntegerDigits {string}`: optional, number format option
* `minimumFractionDigits {string}`: optional, number format option
* `maximumFractionDigits {string}`: optional, number format option
* `minimumSignificantDigits {string}`: optional, number format option
* `maximumSignificantDigits {string}`: optional, number format option
* `localeMatcher {string}`: optional, number format option
* `formatMatcher {string}`: optional, number format option

Any specified number format options will have priority over `numberFormats` of `VueI18n` constructor.

:::danger Tip
Note that you need to guarantee this context equal to component instance in lifecycle methods (e.g. in `data` options, `const $d = this.$d.bind(this)`).
:::

### Injected properties

#### $i18n

  * **Type:** `I18n`

  * **Read only**

Get a `VueI18n` instance. If you are specify.

If you have specified an `i18n` option at component options, you will be able to get a `VueI18n` instance at the component, Otherwise, you will be able get root `VueI18n` instance.

## `VueI18n` class

`Vuei18n` class implement `I18n` interface of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

### Static properties

#### version

  * **Type:** `string`

vue-i18n version.

#### availabilities

> :new: 7.0+

  * **Type:** `IntlAvailability`

Whether the following internationalization features are available:

  * `{boolean} dateTimeFormat`: locale sensitive datetime formatting

  * `{boolean} numberFormat`: locale sensitive number formatting

The above internationalization features are depends on [the browser environments](http://kangax.github.io/compat-table/esintl/), due to implement with ECMAScript Internationalization API (ECMA-402).

### Constructor options

You can specify the below some options of `I18nOptions` constructor options of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### locale

  * **Type:** `Locale`

  * **Default:** `'en-US'`

The locale of localization.

#### fallbackLocale

  * **Type:** `Locale`

  * **Default:** `'en-US'`

The locale of fallback localization.

#### messages

  * **Type:** `LocaleMessages`

  * **Default:** `{}`

The locale messages of localization.

#### dateTimeFormats

> :new: 7.0+

  * **Type:** `DateTimeFormats`

  * **Default:** `{}`

The datetime formats of localization.

  * **See also:** `DateTimeFormats` type of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### numberFormats

> :new: 7.0+

  * **Type:** `NumberFormats`

  * **Default:** `{}`

The number formats of localization.

  * **See also:** `NumberFormats` type of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### availableLocales

> :new: 8.9.0+

  * **Type:** `Locale[]`

  * **Default:** `[]`

  * **Examples:** `["en", "ja"]`

The list of available locales in `messages` in lexical order.

#### formatter

  * **Type:** `Formatter`

  * **Default:** Built in formatter

The formatter that implemented with `Formatter` interface.

#### missing

  * **Type:** `MissingHandler`

  * **Default:** `null`

A handler for localization missing. The handler gets called with the localization target locale, localization path key and the Vue instance.

If missing handler is assigned, and occurred localization missing, it's not warned.

#### fallbackRoot

  * **Type:** `Boolean`

  * **Default:** `true`

In the component localization, whether to fall back to root level (global) localization when localization fails.

If `false`, it's warned, and is returned the key.

#### sync

  * **Type:** `Boolean`

  * **Default:** `true`

Whether synchronize the root level locale to the component localization locale.

If `false`, regardless of the root level locale, localize for each component locale.

#### silentTranslationWarn

> 6.1+, :up: 8.13

  * **Type:** `Boolean | RegExp`

  * **Default:** `false`

Whether suppress warnings outputted when localization fails.

If `true`, suppress localization fail warnings.
If you use regular expression, you can suppress localization fail warnings that it match with translation `key` (e.g. `$t`).

#### silentFallbackWarn

> :new: 8.8+, :up: 8.13

  * **Type:** `Boolean | RegExp`
  * **Default:** `false`

Whether suppress warnings when falling back to either `fallbackLocale` or `root`.

If `true`, warnings will be generated only when no translation is available at all, and not for fallbacks.
If you use regular expression, you can suppress the fallback warnings that it match `key` (e.g. `$t`).

#### preserveDirectiveContent

> 8.7+

  * **Type:** `Boolean`

  * **Default:** `false`

Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.

#### warnHtmlInMessage

> 8.11+

  * **Type:** `WarnHtmlInMessageLevel`

  * **Default:** `off`

Whether to allow the use locale messages of HTML formatting. See the `warnHtmlInMessage` property.

:::danger Important!!
In next major version, `warnHtmlInMessage` option is `warn` as default.
:::

#### sharedMessages

> 8.12+

  * **Type:** `LocaleMessages`

  * **Default:** `undefined`

The shared locale messages of localization for components. More detail see [Component based localizatrion](../guide/component.md#shared-locale-messages-for-components).


### Properties

#### locale

  * **Type:** `Locale`

  * **Read/Write**

The locale of localization.

#### fallbackLocale

  * **Type:** `Locale`

  * **Read/Write**

The locale of fallback localization.

#### messages

  * **Type:** `LocaleMessages`

  * **Read only**

The locale messages of localization.

#### dateTimeFormats

> :new: 7.0+

  * **Type:** `DateTimeFormats`

  * **Read only**

The datetime formats of localization.

#### numberFormats

> :new: 7.0+

  * **Type:** `NumberFormats`

  * **Read only**

The number formats of localization.

#### missing

  * **Type:** `MissingHandler`

  * **Read/Write**

A handler for localization missing.

#### formatter

  * **Type:** `Formatter`

  * **Read/Write**

The formatter that implemented with `Formatter` interface.

#### silentTranslationWarn

> 6.1+, :up: 8.13

  * **Type:** `Boolean | RegExp`

  * **Read/Write**

Whether suppress warnings outputted when localization fails.

#### silentFallbackWarn

> :new: 8.8+, :up: 8.13

  * **Type:** `Boolean | RegExp`

  * **Read/Write**

Whether suppress fallback warnings when localization fails.

#### preserveDirectiveContent

> 8.7+

  * **Type:** `Boolean`

  * **Read/Write**

Whether `v-t` directive's element should preserve `textContent` after directive is unbinded.

#### warnHtmlInMessage

> 8.11+

  * **Type:** `WarnHtmlInMessageLevel`

  * **Read/Write**

Whether to allow the use locale messages of HTML formatting.

If you set `warn` or` error`, will check the locale messages on the VueI18n instance.

If you are specified `warn`, a warning will be output at console.
If you are specified `error` will occured an Error.

In VueI18n instance, set the `off` as default.


### Methods

#### getChoiceIndex

  * **Arguments:**
    * `{number} choice`
    * `{number} choicesLength`

  * **Return:** `finalChoice {number}`

Get pluralization index for current pluralizing number and a given amount of choices. Can be overridden through prototype mutation:

```js
VueI18n.prototype.getChoiceIndex = /* custom implementation */
```

#### getLocaleMessage( locale )

  * **Arguments:**

    * `{Locale} locale`
  * **Return:** `LocaleMessageObject`

Get the locale message of locale.

#### setLocaleMessage( locale, message )

  * **Arguments:**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

Set the locale message of locale.

:::tip NOTE
> 8.11+

If you set `warn` or` error` in the `warnHtmlInMessage` property, when this method is executed, it will check if HTML formatting is used for locale message.
:::

#### mergeLocaleMessage( locale, message )

> 6.1+

  * **Arguments:**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

Merge the registered locale messages with the locale message of locale.

:::tip NOTE
> 8.11+

If you set `warn` or` error` in the `warnHtmlInMessage` property, when this method is executed, it will check if HTML formatting is used for locale message.
:::

#### t( key, [locale], [values] )

  * **Arguments:**

    * `{Path} key`: required
    * `{Locale} locale`: optional
    * `{Array | Object} values`: optional
  * **Return:** : `TranslateResult`

This is the same as the `Function` returned with `$t` method. More detail see [$t](#t).

#### i( key, [locale], [values] )

> :new: 7.0+

  * **Arguments:**

    * `{Path} key`: required
    * `{Locale} locale`: optional
    * `{Array} values`: optional
  * **Return:** : `TranslateResult`

#### tc( key, [choice], [values] )

  * **Arguments:**

    * `{Path} key`: required
    * `{number} choice`: optional, default `1`
    * `{string | Array | Object} values`: optional
  * **Return:** `TranslateResult`

This is the same as the `Function` returned `$tc` method. More detail see [$tc](#tc).

#### te( key, [locale] )

  * **Arguments:**

    * `{string} key`: required
    * `{Locale} locale`: optional
  * **Return:** `boolean`

Check whether key path exists in global locale message. If you specified `locale`, check the locale message of `locale`.

#### getDateTimeFormat ( locale )

> :new: 7.0+

  * **Arguments:**

    * `{Locale} locale`
  * **Return:** `DateTimeFormat`

Get the datetime format of locale.

#### setDateTimeFormat ( locale, format )

> :new: 7.0+

  * **Arguments:**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

Set the datetime format of locale.

#### mergeDateTimeFormat ( locale, format )

> :new: 7.0+

  * **Arguments:**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

Merge the registered datetime formats with the datetime format of locale.

#### d( value, [key], [locale] )

> :new: 7.0+

  * **Arguments:**

    * `{number | Date} value`: required
    * `{Path | Object} key`: optional
    * `{Locale | Object} locale`: optional
  * **Return:** `DateTimeFormatResult`

This is the same as `$d` method of Vue instance method. More detail see [$d](#d).

#### getNumberFormat ( locale )

> :new: 7.0+

  * **Arguments:**

    * `{Locale} locale`
  * **Return:** `NumberFormat`

Get the number format of locale.

#### setNumberFormat ( locale, format )

> :new: 7.0+

  * **Arguments:**

    * `{Locale} locale`
    * `{NumberFormat} format`

Set the number format of locale.

#### mergeNumberFormat ( locale, format )

> :new: 7.0+

  * **Arguments:**

    * `{Locale} locale`
    * `{NumberFormat} format`

Merge the registered number formats with the number format of locale.

#### n( value, [format], [locale] )

> :new: 7.0+

  * **Arguments:**

    * `{number} value`: required
    * `{Path | Object} format`: optional
    * `{Locale} locale`: optional
  * **Return:** `NumberFormatResult`

This is the same as `$n` method of Vue instance method. More detail see [$n](#n).

## Directives

> :new: 7.3+

### v-t

  * **Expects:** `string | Object`

  * **Modifiers:**

    * `.preserve`: (8.7.0+) preserves element `textContent` when directive is unbinded.

  * **Details:**

Update the element `textContent` that localized with locale messages. You can use string syntax or object syntax. string syntax can be specified as a keypath of locale messages. If you can be used object syntax, you need to specify as the object key the following params:

    * path: required, key of locale messages
    * locale: optional, locale
    * args: optional, for list or named formatting

:::tip NOTE
The element `textContent` will be cleared by default when `v-t` directive is unbinded. This might be undesirable situation when used inside [transitions](https://vuejs.org/v2/guide/transitions.html). To preserve `textContent` data after directive unbind use `.preserve` modifier or global [`preserveDirectiveContent` option](#preservedirectivecontent).
:::
  * **Examples:**
```html
<!-- string syntax: literal -->
<p v-t="'foo.bar'"></p>

<!-- string syntax: binding via data or computed props -->
<p v-t="msg"></p>

<!-- object syntax: literal -->
<p v-t="{ path: 'hi', locale: 'ja', args: { name: 'kazupon' } }"></p>

<!-- object syntax: binding via data or computed props -->
<p v-t="{ path: greeting, args: { name: fullName } }"></p>

<!-- with preserve modifier -->
<p v-t.preserve="'foo.bar'"></p>
```

  * **See also:** [Custom directive localization](../guide/directive.md)

## Components

### i18n functional component

> :new: 7.0+

#### Props:

  * `path {Path}`: required, keypath of locale messages
  * `locale {Locale}`: optional, locale
  * `tag {string}`: optional, default `span`
  * `places {Array | Object}`: optional (7.2+)

:::danger Important!!
In next major version, `places` prop is deprecated. Please switch to slots syntax.
:::

#### Usage:

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
  ja: {
    tos: '利用規約',
    term: '私は xxx の{0}に同意します。'
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

#### See also:

[Component interpolation](../guide/interpolation.md)

### i18n-n functional component

> :new: 8.10+

#### Props:

  * `value {number}`: required, number to format
  * `format {string | NumberFormatOptions}`: optional, number format name or object with explicit format options
  * `locale {Locale}`: optional, locale
  * `tag {string}`: optional, default `span`

#### Usage:

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
  'ja-JP': {
    currency: {
      style: 'currency', currency: 'JPY'
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

#### See also:

[Number custom formatting](../guide/number.md#custom-formatting)

## Special Attributes

### place

> :new: 7.2+

#### Expects: `{number | string}`

Used on component interpolation to indicate which index of list formatting or key of named formatting.

For detailed usage, see the guide section linked below.

#### See also:

[Component interpolation](../guide/interpolation.md)
