# ローカライゼーションのフォールバック

以下の翻訳メッセージには、`ja` 言語に `message` キーが存在しません:

```js
const messages = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
```

VueI18nコンストラクタのオプションに `fallbackLocale` オプションを指定すると、`message` キーは `en` 言語でローカライズされます:

```js
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages
})
```    

以下はテンプレート:

```html     
<p>{{ $t('message') }}</p>
```

以下は出力結果:

```html
<p>hello world</p>
```

デフォルトでは、`fallbackLocale` でフォールバックすると2つの警告がコンソールに表示されることに注意してください:

```console
[vue-i18n] Value of key 'message' is not a string!
[vue-i18n] Fall back to translate the keypath 'message' with 'en' locale.
```

（与えられたキーの翻訳がまったくないときの警告を保ちつつ）これらの警告を控えるには、`VueI18n` インスタンスの初期化時に `silentFallbackWarn: true` を設定します。
