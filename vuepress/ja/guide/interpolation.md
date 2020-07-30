# コンポーネント展開

## 基本的な使い方

:::tip サポートするバージョン
:new: 7.0 以上
:::

時々、HTML タグやコンポーネントを含む翻訳メッセージでローカライズが必要なときがあります。例えば:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

上記のメッセージに `$t` を使うとすると、おそらく以下のような翻訳メッセージを作ろうとするでしょう:

```js
const messages = {
  en: {
    term1: 'I Accept xxx\'s',
    term2: 'Terms of Service Agreement'
  }
}
```

そして以下のようにテンプレートで実装しようとするでしょう:

```html
<p>{{ $t('term1') }}<a href="/term">{{ $t('term2') }}</a></p>
```

出力結果:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

これは非常に面倒です。もし翻訳メッセージ内に `<a>` タグを使おうとすると、`v-html="$t('term')"` でローカライズするため XSS 脆弱性が発生する可能性があります。

`i18n` 関数型コンポーネントを使うことでこれを回避できます。例えば:

```html
<div id="app">
  <!-- ... -->
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
  <!-- ... -->
</div>
```
```js
const messages = {
  en: {
    tos: 'Term of Service',
    term: 'I accept xxx {0}.'
  },
  ja: {
    tos: '利用規約',
    term: '私は xxx の{0}に同意します。'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

以下は出力結果:

```html
<div id="app">
  <!-- ... -->
  <label for="tos">
    I accept xxx <a href="/term" target="_blank">Term of Service</a>.
  </label>
  <!-- ... -->
</div>
```

上記の例は[サンプル](https://github.com/kazupon/vue-i18n/tree/dev/examples/interpolation)をご覧ください

`i18n` 関数型コンポーネントの子は、`path` プロパティの翻訳メッセージとして展開されます。上記の例では、 
:::v-pre
`<a :href="url" target="_blank">{{ $t('tos') }}</a>`
:::
翻訳メッセージ `term` が展開されました。

上記の例では、コンポーネントの展開は**リストの書式**に従います。`i18n` 関数型コンポーネントの子は、出現順序によって展開されます。

## 応用的な使い方

:::tip サポートするバージョン
:new: 7.2 以上
:::
:::warning 注目
:warning: `i18n` コンポーネントでは、空白スペースのみで構成されるテキストコンテンツは省略されます。
:::

名前付き書式は、`place` 属性でサポートされています。例えば:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <span place="limit">{{ changeLimit }}</span>
    <a place="action" :href="changeUrl">{{ $t('change') }}</a>
  </i18n>
  <!-- ... -->
</div>
```
```js
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    changeUrl: '/change',
    refundUrl: '/refund',
    changeLimit: 15,
    refundLimit: 30
  }
}).$mount('#app')
```

出力結果:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/change">change your flight</a> until <span>15</span> minutes from departure.
  </p>
  <!-- ... -->
</div>
```

:::warning 注目
:warning: 名前付き書式を使うには、`i18n` コンポーネントのすべての子に `place` 属性を設定する必要があります。設定されていなければ、リストの書式にフォールバックします。
:::

それでもテキストの内容を名前付き書式で展開したい場合は、`i18n` コンポーネントに `places` プロパティを定義できます。例えば:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p" :places="{ limit: refundLimit }">
    <a place="action" :href="refundUrl">{{ $t('refund') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

出力結果:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/refund">refund your ticket</a> until 30 minutes from departure.
  </p>
  <!-- ... -->
</div>
```
