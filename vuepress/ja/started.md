# はじめる

:::tip 備考
ガイド中のサンプルコードでは、[ES2015](https://github.com/lukehoban/es6features) を使っています。
:::

## HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>

<div id="app">
  <p>{{ $t("message.hello") }}</p>
</div>
``` 

## JavaScript

```js
// モジュールシステム（例えば vue-cli）を使う場合、Vue と VueI18n をインポートし、Vue.use(VueI18n) を呼び出してください。
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
//
// Vue.use(VueI18n)

// 翻訳メッセージを用意する
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// VueI18n インスタンスをオプションを指定して作成
const i18n = new VueI18n({
  locale: 'ja', // 言語を設定
  messages, // 翻訳メッセージを設定
})


// Vue インスタンスを `i18n` オプションを指定して作成
new Vue({ i18n }).$mount('#app')

// アプリケーションを開始！
``` 

以下が出力されます:

```html 
<div id="#app">
  <p>こんにちは、世界</p>
</div>
```
