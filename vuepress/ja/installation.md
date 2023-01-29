# インストール

## 互換性について

- Vue.js `2.0.0` 以上

## 直接ダウンロード / CDN

<https://unpkg.com/vue-i18n/dist/vue-i18n>

[unpkg.com](https://unpkg.com) は、NPM ベースの CDN リンクを提供します。上記のリンクは、常に NPM 上の最新リリースを指しています。次のような URL で特定のバージョン/タグを使うこともできます。 <https://unpkg.com/vue-i18n@8.10.0/dist/vue-i18n.js>

Vue の後に vue-i18n を含めると自動的にインストールされます:

    
```html    
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
```

## NPM
    
```sh
npm install vue-i18n
``` 

## Yarn
    
```sh
yarn add vue-i18n
```

モジュールシステムを使うときは、`Vue.use()` によって明示的に `vue-i18n` をインストールする必要があります:

    
```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
```

グローバルの script タグを使う場合、これを行う必要はありません。

## Vue Cli 3.x
    
```sh
vue add i18n
```

前提条件として Vue cli 3.x が必要です。次のコマンドでシェルにインストールできます:

```sh
npm install @vue/cli -g
```

## 開発用ビルド

最新の開発用ビルドを使いたい場合、GitHub から `vue-i18n` を直接クローンし、自身でビルドする必要があります。

```sh
git clone https://github.com/kazupon/vue-i18n.git node_modules/vue-i18n
cd node_modules/vue-i18n
npm install # or `yarn`
npm run build  # or `yarn run build`
```
