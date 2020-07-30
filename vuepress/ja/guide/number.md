# 数字のローカライゼーション

:::tip サポートするバージョン
:new: 7.0 以上
:::

定義された書式で数字をローカライズできます。

以下は数字の書式:

```js
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'ja-JP': {
    currency: {
      style: 'currency', currency: 'JPY', currencyDisplay: 'symbol'
    }
  }
}
```

上記のように、数字の書式を名前付き（例えば `currency` など）で定義でき、ここでは [ECMA-402 Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) のオプションを使う必要があります。

その後、翻訳メッセージのように `VueI18n` コンストラクタの `numberFormats` オプションで指定する必要があります:

```js
const i18n = new VueI18n({
  numberFormats
})

new Vue({
  i18n
}).$mount('#app')
```

以下はテンプレート:

```html
<div id="app">
  <p>{{ $n(100, 'currency') }}</p>
  <p>{{ $n(100, 'currency', 'ja-JP') }}</p>
</div>
```


以下は出力結果:

```html
<div id="app">
  <p>$100.00</p>
  <p>￥100</p>
</div>
```

## カスタム書式

:::tip サポートするバージョン
:new: 8.10 以上
:::

`$n` メソッドは、数字をフォーマットした後の文字列として返すメソッドで、全体に対してのみ適用されます。フォーマットされた数字の一部（小数点桁数など）にスタイルを設定する必要がある場合、`$n` では不十分です。そのようなケースでは、`<i18n-n>` 関数型コンポーネントが役に立ちます。

`<i18n-n>` は最小限のプロパティを設定すると、設定された DOM 要素に括られた、`$n` と同じ出力結果を生成します。

次のテンプレートは:

```html
<div id="app">
  <i18n-n :value="100"></i18n-n>
  <i18n-n :value="100" format="currency"></i18n-n>
  <i18n-n :value="100" format="currency" locale="ja-JP"></i18n-n>
</div>
```

以下のように出力されます:

```html
<div id="app">
  <span>100</span>
  <span>$100.00</span>
  <span>￥100</span>
</div>
```

しかし、このコンポーネントの真の実力は、[スコープ付きスロット](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)として使われたときに発揮されます。

数字の整数部分を太字のフォントで表示する必要があるとしましょう。これは、`integer` スコープのスロット要素を指定することで実現できます。

```html
<i18n-n :value="100" format="currency">
  <span v-slot:integer="slotProps" styles="font-weight: bold">{{ slotProps.integer }}</span>
</i18n-n>
```

上記のテンプレートは、以下のHTMLとして出力されます:

```html
<span>$<span styles="font-weight: bold">100</span>.00</span>
```

同時に複数のスコープ付きスロットを指定できます:

```html
<i18n-n :value="1234" :format="{ key: 'currency', currency: 'EUR' }">
  <span v-slot:integer="slotProps" styles="font-weight: bold">{{ slotProps.integer }}</span>
  <span v-slot:group="slotProps" styles="font-weight: bold">{{ slotProps.group }}</span>
  <span v-slot:fraction="slotProps" styles="font-size: small">{{ slotProps.fraction }}</span>
</i18n-n>
```

（このHTMLは読みやすくするためにフォーマットされています）

```html
<span>
  €
  <span styles="font-weight: bold">1</span>
  <span styles="font-weight: bold">,</span>
  <span styles="font-weight: bold">234</span>
  .
  <span styles="font-size: small">00</span>
</span>
```

サポートされているスコープ付きスロットと、他の `<i18n-n>` プロパティのすべての一覧は、[API ページ](../api/readme.md#i18n-n-functional-component)にあります。
