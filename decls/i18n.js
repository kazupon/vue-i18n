declare type Locale = string;
declare type Path = string;
declare type Message = ?string | MessageObject | MessageArray;
declare type MessageObject = { [key: Path]: Message };
declare type MessageArray = Array<Message>;
declare type Messages = { [key: Locale]: MessageObject };
declare type TranslateResult = string | Array<string>;

declare type MissingHandler = (locale: Locale, key: Path, vm?: any) => void;

declare type I18nOptions = {
  locale?: Locale,
  fallbackLocale?: Locale,
  messages?: Messages,
  formatter?: Formatter,
  missing?: MissingHandler,
  root?: I18n,
  fallbackRoot?: boolean,
  sync?: boolean
};

declare interface I18n {
  static install: () => void,
  static version: string,
  get vm() :any,
  get locale (): Locale,
  set locale (locale: Locale): void,
  get fallbackLocale (): Locale,
  set fallbackLocale (locale: Locale): void,
  get messages (): Messages,
  set messages (messages: Messages): void,
  get missing (): ?MissingHandler,
  set missing (handler: MissingHandler): void,
  get formatter (): Formatter,
  set formatter (formatter: Formatter): void,
  t (key: Path, ...args: any): TranslateResult,
  tc (key: Path, choice?: number, ...args: any): TranslateResult,
  te (key: Path, ...args: any): boolean,
  watchLocale (): any,
  unwatchLocale (): boolean
};

declare type FormatterOptions = { [key: string]: any };

declare interface Formatter {
  format (message: string, ...args: any): string
};
