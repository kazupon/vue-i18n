# 安装

## 兼容性说明

- Vue.js `2.0.0`+

## 直接下载 / CDN

<https://unpkg.com/vue-i18n/dist/vue-i18n>

[unpkg.com](https://unpkg.com) 提供了基于 NPM 的 CDN 链接。上面的链接会一直指向在 NPM 发布的最新版本。你也可以通过 <https://unpkg.com/vue-i18n@8.9.0/dist/vue-i18n.js> 这样的 URL 指定版本号或者 tag。

在 Vue 之后引入 vue-i18n，它会自动安装：


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

如果在一个模块系统中使用它，你必须通过 `Vue.use()` 明确地安装 `vue-i18n`：


```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
```

如果使用全局的 script 标签，则无须如此 (手动安装)。

## Vue Cli 3.x

```sh
vue add i18n
```

你需要 Vue cli 3.x 作为先决条件，你可以在命令行上使用下面的命令来安装：

```sh
npm install @vue/cli -g
```

## 开发版构建

如果你想使用最新的开发版构建，就得从 GitHub 上直接 clone，然后自己构建一个 `vue-i18n`。

```sh
git clone https://github.com/kazupon/vue-i18n.git node_modules/vue-i18n
cd node_modules/vue-i18n
npm install # or `yarn`
npm run build  # or `yarn run build`
```
