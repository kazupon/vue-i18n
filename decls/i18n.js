declare type Dictionary<T> = { [key: string]: T }

declare type Messages = Dictionary<any>

declare type MissingHandler = (locale: string, key: string, vm?: any) => void

declare type I18nOptions = {
  locale?: string,
  fallbackLocale?: string,
  messages?: Messages,
  formatter?: Formatter,
  missing?: MissingHandler,
  root?: I18n,
  fallbackRoot?: boolean,
  sync?: boolean
}

declare interface I18n {
  static install: () => void,
  static version: string,
  get vm() :any,
  get locale (): string,
  set locale (locale: string): void,
  get fallbackLocale (): string,
  set fallbackLocale (locale: string): void,
  get messages (): Messages,
  set messages (messages: Messages): void,
  get missing (): ?MissingHandler,
  set missing (handler: MissingHandler): void,
  get formatter (): Formatter,
  set formatter (formatter: Formatter): void,
  t (key: string, ...args: any): string,
  tc (key: string, choice?: number, ...args: any): any,
  te (key: string, ...args: any): boolean,
  watchLocale (): any,
  unwatchLocale (): boolean
}

declare type FormatterOptions = Dictionary<any>

declare interface Formatter {
  format (message: string, ...args: any): any
}

