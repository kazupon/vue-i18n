import * as Vue from 'vue';
import * as VueI18n from 'vue-i18n';
import { ComponentOptions } from 'vue';

/**
 * VueI18n.install
 */
Vue.use(VueI18n);
VueI18n.install(Vue);

/**
 * VueI18n.version
 */
VueI18n.version;                    // $ExpectType string

/**
 * VueI18n Instance
 */
const locale = 'locale';
const key = 'key';
const value = 'value';
const i18n = new VueI18n({
  locale,
  fallbackLocale: locale,
  messages: {
    [locale]: {
      [key]: value,
    },
  },
  formatter: {
    format(message, values) {
      return message;
    },
  },
  missing(locale, key, vm) {
  },
  fallbackRoot: false,
  sync: true,
  silentTranslationWarn: true,
});
i18n.messages[locale][key];         // $ExpectType LocaleMessage
i18n.locale;                        // $ExpectType string
i18n.fallbackLocale;                // $ExpectType string
i18n.missing;                       // $ExpectType MissingHandler
i18n.formatter;                     // $ExpectType Formatter
i18n.silentTranslationWarn;         // $ExpectType boolean
i18n.setLocaleMessage;              // $ExpectType (locale: string, message: LocaleMessageObject) => void
i18n.getLocaleMessage;              // $ExpectType (locale: string) => LocaleMessageObject
i18n.mergeLocaleMessage;            // $ExpectType (locale: string, message: LocaleMessageObject) => void
// $ExpectType { (key: string, values?: { [key: string]: any; } | undefined): TranslateResult; (key: string, locale: string, values?: { [key: string]: any; } | undefined): TranslateResult; }
i18n.t;
// tslint:disable-next-line:max-line-length
// $ExpectType { (key: string, choice?: number | undefined, values?: { [key: string]: any; } | undefined): string; (key: string, choice: number, locale: string, values?: { [key: string]: any; } | undefined): string; }
i18n.tc;
// $ExpectType (key: string, locale?: string | undefined) => boolean
i18n.te;

/**
 * Vue
 */
const vm = new Vue({
  i18n,
});
vm.$i18n;                           // $ExpectType VueI18n
vm.$t(key);                         // $ExpectType TranslateResult
vm.$t(key, ['', 0, false, null, undefined]);  // $ExpectType TranslateResult
vm.$t(key, { x: 'x' });             // $ExpectType TranslateResult
vm.$t(key, locale);
vm.$t(key, locale, ['', 0, false, null, undefined]);  // $ExpectType TranslateResult
vm.$t(key, locale, { x: 'x' });     // $ExpectType TranslateResult
vm.$tc(key);                        // $ExpectType string
vm.$tc(key, 1);                     // $ExpectType string
vm.$tc(key, 1, []);                 // $ExpectType string
vm.$tc(key, 1, {});                 // $ExpectType string
vm.$tc(key, 1, locale);             // $ExpectType string
vm.$tc(key, 1, locale, []);         // $ExpectType string
vm.$tc(key, 1, locale, {});         // $ExpectType string
vm.$te(key);                        // $ExpectType boolean
vm.$te(key, locale);                // $ExpectType boolean

/**
 * VueI18n
 */
{
  let path: VueI18n.Path;
  let locale: VueI18n.Locale;
  let values: VueI18n.Values;
  let choice: VueI18n.Choice;
  let localeMessage: VueI18n.LocaleMessage;
  let localeMessageObject: VueI18n.LocaleMessageObject;
  let localeMessageArray: VueI18n.LocaleMessageArray;
  let localeMessages: VueI18n.LocaleMessages;
  let translateResult: VueI18n.TranslateResult;
  let formatter: VueI18n.Formatter;
  let missingHandler: VueI18n.MissingHandler;
  let i18nOptions: VueI18n.I18nOptions;
}
