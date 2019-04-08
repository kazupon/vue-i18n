# 日時のローカライゼーション

:::tip サポートするバージョン
:new: 7.0 以降
:::

定義された書式で日時をローカライズできます。

以下は日時の書式:

```js
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    }
  }
}
```

上記のように、日時の書式を名前付き（例えば `short`、`long` など）で定義でき、ここでは[ECMA-402 Intl.DateTimeFormat のオプション](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)を使う必要があります。

その後、翻訳メッセージのように `VueI18n` コンストラクタの `dateTimeFormats` オプションで指定する必要があります:

```js
const i18n = new VueI18n({
  dateTimeFormats
})

new Vue({
  i18n
}).$mount('#app')
```

以下はテンプレート:

```html
<div id="app">
  <p>{{ $d(new Date(), 'short') }}</p>
  <p>{{ $d(new Date(), 'long', 'ja-JP') }}</p>
</div>
```

以下は出力結果:

```html
<div id="app">
  <p>Apr 19, 2017</p>
  <p>2017年4月19日(水) 午前2:19</p>
</div>
```
