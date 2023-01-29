# カスタムディレクティブによるローカライゼーション

:::tip サポートするバージョン
:new: 7.3 以上
:::

`v-t` カスタムディレクティブだけでなく、`$t` メソッドでも翻訳できます。

## 文字列構文

翻訳メッセージのキーパスは文字列構文で渡せます。

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi there!' },
      ja: { hello: 'こんにちは！' }
    }
  }),
  data: { path: 'hello' }
}).$mount('#string-syntax')
```

テンプレート:

```html
<div id="string-syntax">
  <!-- 文字列リテラル -->
  <p v-t="'hello'"></p>
  <!-- data としてキーパスをバインド -->
  <p v-t="path"></p>
</div>
```

出力結果:

```html
<div id="string-syntax">
  <p>hi there!</p>
  <p>hi there!</p>
</div>
```

## オブジェクト構文

オブジェクト構文を使えます。

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi {name}!' },
      ja: { hello: 'こんにちは、{name}！' }
    }
  }),
  computed: {
    nickName () { return 'kazupon' }
  },
  data: { path: 'hello' }
}).$mount('#object-syntax')
```

テンプレート:

```html
<div id="object-syntax">
  <!-- リテラル -->
  <p v-t="{ path: 'hello', locale: 'ja', args: { name: 'kazupon' } }"></p>
  <!-- data としてデータをバインド -->
  <p v-t="{ path: path, args: { name: nickName } }"></p>
</div>
```

出力結果:

```html
<div id="object-syntax">
  <p>こんにちは、kazupon！</p>
  <p>hi kazupon!</p>
</div>
```

## トランジションとともに使う

:::tip サポートするバージョン
:new: 8.7 以上
:::

[`<transition>` コンポーネント](https://jp.vuejs.org/v2/api/index.html#transition)内の要素に `v-t` ディレクティブがあると、トランジション中に翻訳メッセージが消えることに気づくでしょう。この挙動は `<transition>` コンポーネントの実装の性質に関連しています。`<transition>` コンポーネント内の要素が消えたディレクティブは、**トランジションが始まる前に**すべて破棄されます。この挙動は、短いアニメーションではチラつき程度ですが、長いトランジションではもっと目立ちます。

ディレクティブの内容がトランジション中に変わらないようにするには、`v-t` ディレクティブの定義に [`.preserve` 修飾子](../api/#v-t)を追加するだけです。

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' },
    }
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

テンプレート:

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t.preserve="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

`VueI18n` インスタンス自身にグローバルに設定することもでき、こうすることで修飾子なしですべての `v-t` ディレクティブに影響を及ぼせます。

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' },
    },
    preserveDirectiveContent: true
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

テンプレート:

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

上記の例は[サンプル](https://github.com/kazupon/vue-i18n/tree/dev/examples/directive)をご覧ください

## `$t` vs `v-t`

### `$t`

`$t` は拡張された Vue インスタンスメソッドです。次のような長所と短所があります:

#### 長所

テンプレートでは mustache 構文 `{{}}` を、Vue インスタンスではcomputed、props、methodsを**柔軟に**使えます。

#### 短所

`$t` は再レンダリングのたびに**毎回**実行されるので、翻訳コストがかかります。

### `v-t`

`v-t` はカスタムディレクディブです。次のような長所と短所があります:

#### 長所

`v-t` は、一度翻訳するとカスタムディレクティブによってキャッシュされるため、`$t` メソッドよりも**パフォーマンスが良くなります**。また、[`vue-i18n-extensions`](https://github.com/kazupon/vue-i18n-extensions) によって提供されている Vue コンパイラモジュールを使って事前翻訳ができます。

したがって、**パフォーマンスをさらに最適化**できます。

#### 短所

`v-t` は、`$t` のように柔軟に使えません。かなり**複雑**です。`v-t` で翻訳されたコンテンツは、要素の `textContent` に挿入されます。また、サーバーサイドレンダリングを使うときは、[カスタムディレクティブ](https://github.com/kazupon/vue-i18n-extensions#directive-v-t-custom-directive-for-server-side)を `createRenderer` 関数の `directives` オプションに設定する必要があります。
