# 翻訳メッセージの構文規則

## 構造

以下は翻訳メッセージの構文規則:

```typescript
// BNFアノテーションのような翻訳メッセージの構文規則を、Flowtypeで定義
type LocaleMessages = { [key: Locale]: LocaleMessageObject };
type LocaleMessageObject = { [key: Path]: LocaleMessage };
type LocaleMessageArray = LocaleMessage[];
type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
type Locale = string;
type Path = string;
```

上記の構文に基づいて、以下の構造の翻訳メッセージを設定できます:

```json
{
  "en": {  // 'en' 言語
    "key1": "this is message1", // 基本
    "nested": { // 入れ子
      "message1": "this is nested message1"
    },
    "errors": [ // 配列
      "this is 0 error code message",
      {  // 配列の中のオブジェクト
        "internal1": "this is internal 1 error message"
      },
      [  // 配列の中の配列
        "this is nested array error 1"
      ]
    ]
  },
  "ja": { // 'ja' 言語
    // ...
  }
}
```

上記の翻訳メッセージ構造は、以下のキーとパスを使って出力できます。

```html
<div id="app">
  <!-- 基本 -->
  <p>{{ $t('key1') }}</p>
  <!-- 入れ子 -->
  <p>{{ $t('nested.message1') }}</p>
  <!-- 配列 -->
  <p>{{ $t('errors[0]') }}</p>
  <!-- 配列の中のオブジェクト -->
  <p>{{ $t('errors[1].internal1') }}</p>
  <!-- 配列の中の配列 -->
  <p>{{ $t('errors[2][0]') }}</p>
</div>
```

以下は出力結果:

```html
<div id="app">
  <!-- 基本 -->
  <p>this is message1</p>
  <!-- 入れ子 -->
  <p>this is nested message1</p>
  <!-- 配列 -->
  <p>this is 0 error code message</p>
  <!-- 配列の中のオブジェクト -->
  <p>this is internal 1 error message</p>
  <!-- 配列の中の配列 -->
  <p>this is nested array error 1</p>
</div>
```

## 翻訳メッセージをリンクする

他と同じ文字列を含む翻訳キーがある場合、リンクができます。他の翻訳キーにリンクするには、接頭辞に `@:` を付け、その後にリンク先のネームスペースを含む翻訳キーを入力するだけです。

以下は翻訳メッセージ:

```js
const messages = {
  en: {
    message: {
      the_world: 'the world',
      dio: 'DIO:',
      linked: '@:message.dio @:message.the_world !!!!'
    }
  }
}
```

以下はテンプレート:

```html
<p>{{ $t('message.linked') }}</p>
```

以下は出力結果:

```html
<p>DIO: the world !!!!</p>
```


### 括弧でグループ化する

リンクされた翻訳メッセージのキーは、`@:(message.foo.bar.baz)` の形式にすることもできます。この場合、別のキーへのリンクは括弧 `()` 内に入れます。

これは、リンクの `@:message.something` の後に、リンクの一部ではないピリオド `.` が続く場合に便利です。

以下は翻訳メッセージ:

```js
const messages = {
  en: {
    message: {
      dio: 'DIO',
      linked: 'There\'s a reason, you lost, @:(message.dio).'
    }
  }
}
```

以下はテンプレート:

```html
<p>{{ $t('message.linked') }}</p>
```

以下は出力結果:

```html
<p>There's a reason, you lost, DIO.</p>
```
