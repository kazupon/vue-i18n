# コンポーネントベースのローカライゼーション

一般的に、ロケール情報（例えば `locale`、`messages` など）は `VueI18n` インスタンスのコンストラクタオプションとして設定し、 `VueI18n` インスタンスはルート Vue インスタンスの `i18n` オプションとして設定します。

これによりルート Vue インスタンスおよび任意のコンポーネントで、`$t` または `$tc` を使ってグローバルに翻訳できます。各コンポーネントにロケール情報を別々に管理することもでき、Vue コンポーネント指向の設計に便利です。

コンポーネントベースのローカライゼーション例:

```js
// ルート Vue インスタンスのためのロケール情報を準備
const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: {
      message: {
        hello: 'hello world',
        greeting: 'good morning'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界',
        greeting: 'おはようございます'
      }
    }
  }
})

// コンポーネントを定義
const Component1 = {
  template: `
    <div class="container">
     <p>Component1 locale messages: {{ $t("message.hello") }}</p>
     <p>Fallback global locale messages: {{ $t("message.greeting") }}</p>
   </div>`,
  i18n: { // コンポーネントのためのロケール情報を準備する `i18n` オプション
    messages: {
      en: { message: { hello: 'hello component1' } },
      ja: { message: { hello: 'こんにちは、component1' } }
    }
  }
}

new Vue({
  i18n,
  components: {
    Component1
  }
}).$mount('#app')
```

テンプレート:

    
```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

以下は出力結果:

```html
<div id="app">
  <p>こんにちは、世界</p>
  <div class="container">
    <p>Component1 locale messages: こんにちは、component1</p>
    <p>Fallback global locale messages: おはようございます</p>
  </div>
</div>
```

上記の例のようにコンポーネントに翻訳メッセージがない場合、グローバルに定義されたロケール情報にフォールバックします。コンポーネントは、ルートインスタンスに設定されている言語を使います（上記の例では: `locale: 'ja'`）。

デフォルトでは、ルートのロケール情報にフォールバックすると2つの警告がコンソールに表示されることに注意してください:

```console
[vue-i18n] Value of key 'message.greeting' is not a string!
[vue-i18n] Fall back to translate the keypath 'message.greeting' with root locale.
```

（与えられたキーの翻訳がまったくないときの警告を残しながら）これらの警告を控えるには、`VueI18n` インスタンスの初期化時に `silentFallbackWarn: true` を設定します。

コンポーネントの言語でローカライズしたい場合は、`i18n` オプションで `sync: false` と `locale` を設定します。

## 関数型コンポーネントで翻訳する

関数型コンポーネントを使うとき、すべてのデータ（props、children、slots、parent などを含む）は属性を含んで `context` を介して渡されるため、`this` スコープを認識しません。したがって、関数型コンポーネントで vue-i18n を使う場合、`$t` を `parent.$t` として参照する必要があります。以下の例をチェックしてください:

```html
...
<div>
  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer">
    <img src="" :alt="parent.$t('message.hello')">
  </a>
</div>
...
```
