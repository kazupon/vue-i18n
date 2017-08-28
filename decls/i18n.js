declare var Intl: any;

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

// This options is the same as Intl.NumberFormat constructor options:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
declare type NumberFormatOptions = {
  style?: 'decimal' | 'currency' | 'percent',
  currency?: string, // ISO 4217 currency codes
  currencyDisplay?: 'symbol' | 'code' | 'name',
  useGrouping?: boolean,
  minimumIntegerDigits?: number,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  minimumSignificantDigits?: number,
  maximumSignificantDigits?: number,
  localeMatcher?: 'lookup' | 'best fit',
  formatMatcher?: 'basic' | 'best fit'
};
declare type NumberFormat = { [key: string]: NumberFormatOptions };
declare type NumberFormats = { [key: Locale]: NumberFormat };

declare type TranslateResult = string | Array<any>;
declare type DateTimeFormatResult = string;
declare type NumberFormatResult = string;
declare type MissingHandler = (locale: Locale, key: Path, vm?: any) => void;

declare type I18nOptions = {
  locale?: Locale,
  fallbackLocale?: Locale,
  messages?: LocaleMessages,
  dateTimeFormats?: DateTimeFormats,
  numberFormats?: NumberFormats,
  formatter?: Formatter,
  missing?: MissingHandler,
  root?: I18n, // for internal
  fallbackRoot?: boolean,
  sync?: boolean,
  silentTranslationWarn?: boolean
};

declare type IntlAvailability = {
  dateTimeFormat: boolean,
  numberFormat: boolean
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
  get dateTimeFormats (): DateTimeFormats,
  get missing (): ?MissingHandler,
  set missing (handler: MissingHandler): void,
  get formatter (): Formatter,
  set formatter (formatter: Formatter): void,
  get silentTranslationWarn (): boolean,
  set silentTranslationWarn (silent: boolean): void,
  getLocaleMessage (locale: Locale): LocaleMessageObject,
  setLocaleMessage (locale: Locale, message: LocaleMessageObject): void,
  mergeLocaleMessage (locale: Locale, message: LocaleMessageObject): void,
  t (key: Path, ...values: any): TranslateResult,
  i (key: Path, locale: Locale, values: Object): TranslateResult,
  tc (key: Path, choice?: number, ...values: any): TranslateResult,
  te (key: Path, locale?: Locale): boolean,
  getDateTimeFormat (locale: Locale): DateTimeFormat,
  setDateTimeFormat (locale: Locale, format: DateTimeFormat): void,
  mergeDateTimeFormat (locale: Locale, format: DateTimeFormat): void,
  d (value: number | Date, ...args: any): DateTimeFormatResult,
  getNumberFormat (locale: Locale): NumberFormat,
  setNumberFormat (locale: Locale, format: NumberFormat): void,
  mergeNumberFormat (locale: Locale, format: NumberFormat): void,
  n (value: number, ...args: any): NumberFormatResult
};

declare interface Formatter {
  interpolate (message: string, values: any): Array<any>
};
