# API References


## Vue Constructor Options

### i18n

- **Type:** `I18nOptions`

Component based translation option. 

- **See also:** [`VueI18n` class constructor options](#constructor-options)


## Vue Static Properties

### version

- **Type:** `string`

vue-i18n version.

### availabilities

- **Type:** `IntlAvailability`

Whether the following internationalization features are available:

- `{boolean} dateTimeFormat`: locale sensitive datetime formatting

The above internationalization features are depends on [the browser environmens](http://kangax.github.io/compat-table/esintl/), due to implement with ECMAScript Internationalization API (ECMA-402).

## Vue injected methods

### $t

- **Arguments:**
  - `{Path} key`: required
  - `{Locale} locale`: optional
  - `{Array | Object} values`: optional

- **Return:** `string`

  Translate the locale message of `key`. Translate in preferentially component locale messages than global locale messages. If not specified component locale messages, translate with global locale messages. If you specified `locale`, translate the locale messages of `locale`. If you specified `key` of list / named formatting local messages, you must specify `values` too. For `values` more details see [Formatting](formatting.md).

### $tc

- **Arguments:**
  - `{Path} key`: required
  - `{number} choice`: optional, default 1
  - `{string | Array | Object} values`: optional

- **Return:** `string`

  Translate the locale message of `key` with pluralization. Translate in preferentially component locale messages than global locale messages. If not specified component locale messages, translate with global locale messages. If you will specify string value to `values`, translate the locale messages of value. If you will specify Array or Object value to `values`, you must specify with `values` of [$t](#t).

### $te

- **Arguments:**
  - `{Path} key`: required
  - `{Locale} locale`: optional

- **Return:** `boolean`

  Check whether key exists. In Vue instance, If not specified component locale messages, check with global locale messages. If you specified `locale`, check the locale messages of `locale`.


### $d

- **Arguments:**
  - `{number | Date} value`: required
  - `{string | Object} key`: optional
  - `{string | Object} locale`: optional

- **Return:** `string`

  Localize the datetime of `value` with datetime format of `key`. The datetime format of `key` need to register to `dateTimeFormats` option of `VueI18n` class, and depend on `locale` option of `VueI18n` constructor. If you will specify `locale` argument, Localized in preferentially it than `locale` option of `VueI18n` constructor.

  If the datetime format of `key` not exist in `dateTimeFormats` option,  fallback to depened on `fallbackLocale` option of `VueI18n` constructor.

## Injected properties

### $i18n

- **Type:** `I18n`

- **Read only**

Get a `VueI18n` instance. If you are specify.

If you have specified an `i18n` option at component options, you will be able to get a `VueI18n` instance at the component, Otherwise, you will be able get root `VueI18n` instance.


## `VueI18n` class

`Vuei18n` class implement [`I18n` interface](#type-definitions-for-flowtype).

### Constructor Options

You can specify the below some options of [`I18nOptions` constructor options](#type-definitions-for-flowtype).

#### locale

- **Type:** `Locale`

- **Default:** `'en-US'`

The locale of translation.

#### fallbackLocale

- **Type:** `Locale`

- **Default:** `'en-US'`

The locale of fallback translation.

#### messages

- **Type:** `LocaleMessages`

- **Default:** `{}`

The locale messages of translation.

#### dateTimeFormats

- **Type:** `DateTimeFormats`

- **Default:** `{}`

The datetime formats of localization.

- **See also:** [`DateTimeFormats` type](#type-definitions-for-flowtype).

#### formatter

- **Type:** `Formatter`

- **Default:** Built in formatter

The formatter that implemented with `Formatter` interface.

#### missing

- **Type:** `MissingHandler`

- **Default:** `null`

A hander for translation missing. The handler gets called with the translation target locale, translation path key and the Vue instance.

If missing hander is assigned, and occured translation missing, it's not warned.

#### fallbackRoot

- **Type:** `Boolean`

- **Default:** `true`

In the component translation, whether to fall back to root level (global) translation  when translation fails.

If `false`, it's warned, and is returned the key.

#### sync

- **Type:** `Boolean`

- **Default:** `true`

Whether synchronize the root level locale to the component translation locale.

If `false`, regardless of the root level locale, translate for each component locale.

### silentTranslationWarn

- **Type:** `Boolean`

- **Default:** `false`

Whether suppress warnings outputted when translation fails.

If `true`, supress translation fail warnings.

### Properties

#### locale

- **Type:** `Locale`

- **Read/Write**

The locale of translation.

#### fallbackLocale

- **Type:** `Locale`

- **Read/Write**

The locale of fallback translation.

#### messages

- **Type:** `LocaleMessages`

- **Read only**

The locale messages of translation.

#### dateTimeFormats

- **Type:** `DateTimeFormats`

- **Read only**

The datetime formats of localization.

#### missing

- **Type:** `MissingHandler`

- **Read/Write**

A hander for translation missing.

#### formatter

- **Type:** `Formatter`

- **Read/Write**

The formatter that implemented with `Formatter` interface.

#### silentTranslationWarn

- **Type:** `boolean`

- **Read/Write**

Whether suppress warnings outputted when translation fails.

### methods

#### getLocaleMessage( locale )

- **Arguments:**
  - `{Locale} locale`

- **Return:** `LocaleMessage`

Get the locale message of locale.

#### setLocaleMessage( locale, message )

- **Arguments:**
  - `{Locale} locale`
  - `{LocaleMessage} message`

Set the locale message of locale.

#### mergeLocaleMessage( locale, message ) 

- **Arguments:**
  - `{Locale} locale`
  - `{LocaleMessage} message`

Merge the registered locale messages with the locale message of locale.

#### t( key, [locale], [values] )

- **Arguments:**
  - `{Path} key`: required
  - `{Locale} locale`: optional
  - `{Array | Object} values`: optional

- **Return:**: `string`

  This is the same as the `Function` returned with `$t` computed property. More detail see [$t](#$t).

#### tc( key, [choice], [values] )

- **Arguments:**
  - `{Path} key`: required
  - `{number} choice`: optional, default `1`
  - `{string | Array | Object} values`: optional

- **Return:** `string`

  This is the same as the `Function` returned `$tc` computed property. More detail see [$tc](#$tc).

#### te( key, [locale] )

- **Arguments:**
  - `{string} key`: required
  - `{Locale} locale`: optional

- **Return:** `boolean`

  Check whether key path exists in global locale message. If you specified `locale`, check the locale message of `locale`.

#### getDateTimeFormat ( locale )

- **Arguments:**
  - `{Locale} locale`

- **Return:** `DateTimeFormat`

Get the datetime format of locale.

#### setDateTimeFormat ( locale, format )

- **Arguments:**
  - `{Locale} locale`
  - `{DateTimeFormat} format`

Set the datetime format of locale.

#### mergeDateTimeFormat ( locale, format ) 

- **Arguments:**
  - `{Locale} locale`
  - `{DateTimeFormat} format`

Merge the registered datetime formats with the datetime format of locale.

#### d( value, [key], [locale] )

- **Arguments:**
  - `{number | Date} value`: required
  - `{string | Object} key`: optional
  - `{string | Object} locale`: optional

- **Return:** `string`

This is the same as `$d` method of Vue instance method. More detail see [$d](#$d).


## Type Definitions for FlowType

```
declare type Path = string;
declare type Locale = string;
declare type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
declare type LocaleMessageObject = { [key: Path]: LocaleMessage };
declare type LocaleMessageArray = Array<LocaleMessage>;
declare type LocaleMessages = { [key: Locale]: LocaleMessageObject };

// This options is the same as Intl.DateTimeFormat constructor options:
// http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor
declare type DateTimeFormatOptions = {
  year?: 'numeric' | '2-digit',
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
  day?: 'numeric' | '2-digit',
  hour?: 'numeric' | '2-digit',
  minute?: 'numeric' | '2-digit',
  second?: 'numeric' | '2-digit',
  weekday?: 'narrow' | 'short' | 'long',
  hour12?: boolean,
  era?: 'narrow' | 'short' | 'long',
  timeZone?: string, // IANA time zone
  timeZoneName?: 'short' | 'long',
  localeMatcher?: 'lookup' | 'best fit',
  formatMatcher?: 'basic' | 'best fit'
};
declare type DateTimeFormat = { [key: string]: DateTimeFormatOptions };
declare type DateTimeFormats = { [key: Locale]: DateTimeFormat };

declare type TranslateResult = string | Array<string>;
declare type DateTimeFormatResult = string;
declare type MissingHandler = (locale: Locale, key: Path, vm?: any) => void;

declare type I18nOptions = {
  locale?: Locale,
  fallbackLocale?: Locale,
  messages?: LocaleMessages,
  dateTimeFormats?: DateTimeFormats,
  formatter?: Formatter,
  missing?: MissingHandler,
  root?: I18n, // for internal
  fallbackRoot?: boolean,
  sync?: boolean,
  silentTranslationWarn?: boolean
};

declare type IntlAvailability = {
  dateTimeFormat: boolean
};

declare interface I18n {
  static install: () => void, // for Vue plugin interface
  static version: string,
  static availabilities: IntlAvailability,
  get vm (): any, // for internal
  get locale (): Locale,
  set locale (locale: Locale): void,
  get fallbackLocale (): Locale,
  set fallbackLocale (locale: Locale): void,
  get messages (): LocaleMessages,
  get missing (): ?MissingHandler,
  set missing (handler: MissingHandler): void,
  get formatter (): Formatter,
  set formatter (formatter: Formatter): void,
  get silentTranslationWarn (): boolean,
  set silentTranslationWarn (silent: boolean): void,
  getLocaleMessage (locale: Locale): LocaleMessage,
  setLocaleMessage (locale: Locale, message: LocaleMessage): void,
  mergeLocaleMessage (locale: Locale, message: LocaleMessage): void,
  t (key: Path, ...values: any): TranslateResult,
  tc (key: Path, choice?: number, ...values: any): TranslateResult,
  te (key: Path, locale?: Locale): boolean,
  getDateTimeFormat (locale: Locale): DateTimeFormat,
  setDateTimeFormat (locale: Locale, format: DateTimeFormat): void,
  mergeDateTimeFormat (locale: Locale, format: DateTimeFormat): void,
  d (value: number | Date, ...args: any): DateTimeFormatResult
};

declare type FormatterOptions = { [key: string]: any };

declare interface Formatter {
  format (message: string, ...values: any): string
};
```
