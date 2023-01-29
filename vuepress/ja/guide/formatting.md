# 書式

## HTML 書式

:::warning 注目
:warning: Webサイト上の任意の HTML を動的にローカライズすることは、簡単に XSS 脆弱性を引き起こす可能性があり大変危険です。信頼できるコンテンツにのみ HTML 内挿を使い、ユーザー提供のコンテンツには使用しないでください。

[コンポーネント内挿](interpolation.md)機能を使うことをお勧めします。
:::

場合により、翻訳を静的な文字列ではなく HTML としてレンダリングしたいときがあります。
    
```js  
const messages = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  }
}
```

以下はテンプレート

    
```html    
<p v-html="$t('message.hello')"></p>
```

以下は出力結果（あらかじめフォーマットされた文章ではありません）

    
```html
<p>hello
<!--<br> は存在しますが、HTML としてレンダリングされ、文字列ではありません-->
world</p>
```

## 名前付き書式

以下は翻訳メッセージ:

    
```js 
const messages = {
  en: {
    message: {
      hello: '{msg} world'
    }
  }
}
```

以下はテンプレート:

```html   
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

以下は出力結果:

```html 
<p>hello world</p>
```

## リスト書式

以下は翻訳メッセージ:

```js 
const messages = {
  en: {
    message: {
      hello: '{0} world'
    }
  }
}
```

以下はテンプレート:

```html 
<p>{{ $t('message.hello', ['hello']) }}</p>
```

以下は出力結果:

```html 
<p>hello world</p>
```

リスト書式は配列のようなオブジェクトも受け付けます:

    
```html  
<p>{{ $t('message.hello', {'0': 'hello'}) }}</p>
```

以下は出力結果:

```html  
<p>hello world</p>
```    

## ruby on rails i18n 書式のサポート

以下は翻訳メッセージ:

```js    
const messages = {
  en: {
    message: {
      hello: '%{msg} world'
    }
  }
}
```

以下はテンプレート:

```html 
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

以下は出力結果:

```html 
<p>hello world</p>
```

## カスタム書式

場合によっては、カスタム書式で翻訳する必要があるかもしれません（例：[ICU message syntax](http://userguide.icu-project.org/formatparse/messages)）。 

[Formatter Interface](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js#L41-L43) を実装することで、カスタム書式を実現できます。

ES2015 クラス構文を使ったカスタム書式:

```js 
// カスタム書式の実装
class CustomFormatter {
     constructor (options) {
       // ...
     }
    
     //
     // interpolate
     //
     // @param {string} message
     //   リスト、または名前付き書式。
     //   例
     //   - 名前付き書式: 'Hi {name}'
     //   - リスト書式: 'Hi {0}'
     //
     // @param {Object | Array} values
     //   `message` に内挿する値。
     //   `$t`、 `$tc`、`i18n` 関数型コンポーネントで値を渡す。
     //   例
     //   - $t('hello', { name: 'kazupon' }) -> 渡された値: Object `{ name: 'kazupon' }` 
     //   - $t('hello', ['kazupon']) -> 渡された値: Array `['kazupon']`
     //   - `i18n` 関数型コンポーネント (コンポーネント内挿)
     //     <i18n path="hello">
     //       <p>kazupon</p>
     //       <p>how are you?</p>
     //     </i18n>
     //     -> 渡された値: Array (VNodeを含む):
     //        `[VNode{ tag: 'p', text: 'kazupon', ...}, VNode{ tag: 'p', text: 'how are you?', ...}]`
     //
     // @return {Array<any>}
     //   内挿された値。以下を返す必要があります:
     //   - `$t` または `$tc` を使う時は、文字列の配列。
     //   - `i18n` 関数型コンポーネントを使う時は、VNodeオブジェクトを含む配列。
     // 
     interpolate (message, values) {
       // ここに内挿ロジックを実装
       // ...
    
       // 内挿された配列を返す
       return ['resolved message string']
     }
}
    
// `formatter` オプションを登録
const i18n = new VueI18n({
  locale: 'en-US',
  formatter: new CustomFormatter(/* ここがコンストラクタのオプション */),
  messages: {
    'en-US': {
      // ...
    },
    // ...
  }
})
    
// 実行！
new Vue({ i18n }).$mount('#app')
```

[カスタム書式の公式サンプル](https://github.com/kazupon/vue-i18n/tree/dev/examples/formatting/custom)をチェックしてください。
