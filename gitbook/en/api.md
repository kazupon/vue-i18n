# API References

## Injected computed properties

### $t

- **Type:** `Function`

- **Return:**

  The `Function` that have some arguments the below:

  - **Arguments:**
    - `{Path} key`: required
    - `{Locale} locale`: optional
    - `{Array | Object} values`: optional

  - **Return:** `string`

  Translate the locale message of `key`. Translate in preferentially component locale messages than global locale messages. If not specified component locale messages, translate with global locale messages. If you specified `locale`, translate the locale messages of `locale`. If you specified `key` of list / named formatting local messages, you must specify `values` too. For `values` more details see [Formatting](formatting.md).

### $tc

- **Type:** `Function`

- **Return:**

  The `Function` that have some arguments the below:

  - **Arguments:**
    - `{Path} key`: required
    - `{number} choice`: optional, default 1
    - `{string | Array | Object} values`: optional
  
  - **Return:** `string`

  Translate the locale message of `key` with pluralization. Translate in preferentially component locale messages than global locale messages. If not specified component locale messages, translate with global locale messages. If you will specify string value to `values`, translate the locale messages of value. If you will specify Array or Object value to `values`, you must specify with `values` of [$t](#t).

### $te

- **Type:** `Function`

- **Return:**

  The `Function` that have some arguments the below:

  - **Arguments:**
    - `{Path} key`: required
    - `{Locale} locale`: optional
  
  - **Return:** `boolean`

  Check whether key exists. In Vue instance, If not specified component locale messages, check with global locale messages. If you specified `locale`, check the locale messages of `locale`.


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

#### missing

- **Type:** `MissingHandler`

- **Read/Write**

A hander for translation missing.

#### formatter

- **Type:** `Formatter`

- **Read/Write**

The formatter that implemented with `Formatter` interface.

### methods

#### getLocaleMessage( locale )

- **Arguments:**
  - `{Locale} locale`

- **Return:** `LocaleMessage`

Get the locale message of `locale`.

#### setLocaleMessage( locale, message )

- **Arguments:**
  - `{Locale} locale`
  - `{LocaleMessage} message`

Set the locale message of `locale`.

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

## Type Definitions for FlowType

```
declare type Path = string;
declare type Locale = string;
declare type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
declare type LocaleMessageObject = { [key: Path]: LocaleMessage };
declare type LocaleMessageArray = Array<LocaleMessage>;
declare type LocaleMessages = { [key: Locale]: LocaleMessageObject };
declare type TranslateResult = string | Array<string>;
declare type MissingHandler = (locale: Locale, key: Path, vm?: any) => void;

declare type I18nOptions = {
  locale?: Locale,
  fallbackLocale?: Locale,
  messages?: LocaleMessages,
  formatter?: Formatter,
  missing?: MissingHandler,
  root?: I18n,
  fallbackRoot?: boolean,
  sync?: boolean
};

declare interface I18n {
  static install: () => void,
  static version: string,
  get vm () :any,
  get locale (): Locale,
  set locale (locale: Locale): void,
  get fallbackLocale (): Locale,
  set fallbackLocale (locale: Locale): void,
  get messages (): LocaleMessages,
  get missing (): ?MissingHandler,
  set missing (handler: MissingHandler): void,
  get formatter (): Formatter,
  set formatter (formatter: Formatter): void,
  getLocaleMessage (locale: Locale): LocaleMessage,
  setLocaleMessage (locale: Locale, message: LocaleMessage): void,
  t (key: Path, ...values: any): TranslateResult,
  tc (key: Path, choice?: number, ...values: any): TranslateResult,
  te (key: Path, locale?: Locale): boolean
};

declare type FormatterOptions = { [key: string]: any };

declare interface Formatter {
  format (message: string, ...values: any): string
};
```
