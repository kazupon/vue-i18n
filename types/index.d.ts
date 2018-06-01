import Vue, { PluginFunction } from 'vue';

declare namespace VueI18n {
  type Path = string;
  type Locale = string;
  type Values = any[] | { [key: string]: any };
  type Choice = number;
  type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
  interface LocaleMessageObject { [key: string]: LocaleMessage; }
  interface LocaleMessageArray { [index: number]: LocaleMessage; }
  interface LocaleMessages { [key: string]: LocaleMessageObject; }
  type TranslateResult = string | LocaleMessages;
  interface DateTimeFormatOptions {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
    weekday?: string;
    hour12?: boolean;
    era?: string;
    timeZone?: string;
    timeZoneName?: string;
    localeMatcher?: string;
    formatMatcher?: string;
  }
  interface DateTimeFormat { [key: string]: DateTimeFormatOptions; }
  interface DateTimeFormats { [key: string]: DateTimeFormat; }
  type DateTimeFormatResult = string;
  interface NumberFormatOptions {
    style?: string;
    currency?: string;
    currencyDisplay?: string;
    useGrouping?: boolean;
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
    localeMatcher?: string;
    formatMatcher?: string;
  }
  interface NumberFormat { [key: string]: NumberFormatOptions; }
  interface NumberFormats { [key: string]: NumberFormat; }
  type NumberFormatResult = string;

  interface Formatter {
    interpolate(message: string, values?: Values): any[];
  }

  type MissingHandler = (locale: Locale, key: Path, vm?: Vue) => string | void;

  interface IntlAvailability {
    dateTimeFormat: boolean;
    numberFormat: boolean;
  }

  // tslint:disable-next-line:interface-name
  interface I18nOptions {
    locale?: Locale;
    fallbackLocale?: Locale;
    messages?: LocaleMessages;
    dateTimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    formatter?: Formatter;
    missing?: MissingHandler;
    fallbackRoot?: boolean;
    sync?: boolean;
    silentTranslationWarn?: boolean;
  }
}

export type Path = VueI18n.Path;
export type Locale = VueI18n.Locale;
export type Values = VueI18n.Values;
export type Choice = VueI18n.Choice;
export type LocaleMessage = VueI18n.LocaleMessage;
export type LocaleMessageObject = VueI18n.LocaleMessageObject;
export type LocaleMessageArray = VueI18n.LocaleMessageArray;
export type LocaleMessages = VueI18n.LocaleMessages;
export type TranslateResult = VueI18n.TranslateResult;
export type DateTimeFormatOptions = VueI18n.DateTimeFormatOptions;
export type DateTimeFormat = VueI18n.DateTimeFormat;
export type DateTimeFormats = VueI18n.DateTimeFormats;
export type DateTimeFormatResult = VueI18n.DateTimeFormatResult;
export type NumberFormatOptions = VueI18n.NumberFormatOptions;
export type NumberFormat = VueI18n.NumberFormat;
export type NumberFormats = VueI18n.NumberFormats;
export type NumberFormatResult = VueI18n.NumberFormatResult;
export type Formatter = VueI18n.Formatter;
export type MissingHandler = VueI18n.MissingHandler;
export type IntlAvailability = VueI18n.IntlAvailability;
export type I18nOptions = VueI18n.I18nOptions;

export declare interface IVueI18n {
  readonly messages: VueI18n.LocaleMessages;
  readonly dateTimeFormats: VueI18n.DateTimeFormats;
  readonly numberFormats: VueI18n.NumberFormats;

  locale: VueI18n.Locale;
  fallbackLocale: VueI18n.Locale;
  missing: VueI18n.MissingHandler;
  formatter: VueI18n.Formatter;
  silentTranslationWarn: boolean;
}

declare class VueI18n {
  constructor(options?: VueI18n.I18nOptions)

  readonly messages: VueI18n.LocaleMessages;
  readonly dateTimeFormats: VueI18n.DateTimeFormats;
  readonly numberFormats: VueI18n.NumberFormats;

  locale: VueI18n.Locale;
  fallbackLocale: VueI18n.Locale;
  missing: VueI18n.MissingHandler;
  formatter: VueI18n.Formatter;
  silentTranslationWarn: boolean;

  t(key: VueI18n.Path, values?: VueI18n.Values): VueI18n.TranslateResult;
  t(key: VueI18n.Path, locale: VueI18n.Locale, values?: VueI18n.Values): VueI18n.TranslateResult;
  tc(key: VueI18n.Path, choice?: VueI18n.Choice, values?: VueI18n.Values): string;
  tc(key: VueI18n.Path, choice: VueI18n.Choice, locale: VueI18n.Locale, values?: VueI18n.Values): string;
  te(key: VueI18n.Path, locale?: VueI18n.Locale): boolean;
  d(value: number | Date, key?: VueI18n.Path, locale?: VueI18n.Locale): VueI18n.DateTimeFormatResult;
  d(value: number | Date, args?: { [key: string]: string }): VueI18n.DateTimeFormatResult;
  n(value: number, key?: VueI18n.Path, locale?: VueI18n.Locale): VueI18n.NumberFormatResult;
  n(value: number, args?: { [key: string]: string }): VueI18n.NumberFormatResult;

  getLocaleMessage(locale: VueI18n.Locale): VueI18n.LocaleMessageObject;
  setLocaleMessage(locale: VueI18n.Locale, message: VueI18n.LocaleMessageObject): void;
  mergeLocaleMessage(locale: VueI18n.Locale, message: VueI18n.LocaleMessageObject): void;

  getDateTimeFormat(locale: VueI18n.Locale): VueI18n.DateTimeFormat;
  setDateTimeFormat(locale: VueI18n.Locale, format: VueI18n.DateTimeFormat): void;
  mergeDateTimeFormat(locale: VueI18n.Locale, format: VueI18n.DateTimeFormat): void;

  getNumberFormat(locale: VueI18n.Locale): VueI18n.NumberFormat;
  setNumberFormat(locale: VueI18n.Locale, format: VueI18n.NumberFormat): void;
  mergeNumberFormat(locale: VueI18n.Locale, format: VueI18n.NumberFormat): void;

  static install: PluginFunction<never>;
  static version: string;
  static availabilities: VueI18n.IntlAvailability;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $i18n: VueI18n & IVueI18n;
    $t: typeof VueI18n.prototype.t;
    $tc: typeof VueI18n.prototype.tc;
    $te: typeof VueI18n.prototype.te;
    $d: typeof VueI18n.prototype.d;
    $n: typeof VueI18n.prototype.n;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    i18n?: {
      messages?: VueI18n.LocaleMessages;
      dateTimeFormats?: VueI18n.DateTimeFormats;
      numberFormats?: VueI18n.NumberFormats;
    };
  }
}

export default VueI18n;
