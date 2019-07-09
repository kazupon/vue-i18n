# Installation

## Compatibility Note

- Vue.js `2.0.0`+

## Direct Download / CDN

<https://unpkg.com/vue-i18n/dist/vue-i18n>

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like <https://unpkg.com/vue-i18n@8.12.0/dist/vue-i18n.js>

Include vue-i18n after Vue and it will install itself automatically:

    
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

When using with a module system, you must explicitly install the `vue-i18n`
via `Vue.use()`:

    
```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
```

You don't need to do this when using global script tags.

## Vue Cli 3.x
    
```sh
vue add i18n
```

You need Vue cli 3.x as pre-requisite, you can install it on your shell with the next command:

```sh
npm install @vue/cli -g
```

## Dev Build

You will have to clone directly from GitHub and build `vue-i18n` yourself if you want to use the latest dev build.

```sh
git clone https://github.com/kazupon/vue-i18n.git node_modules/vue-i18n
cd node_modules/vue-i18n
npm install # or `yarn`
npm run build  # or `yarn run build`
```

## Explanation of Different Builds

In the dist/ [directory of the NPM package](https://cdn.jsdelivr.net/npm/vue-i18n/dist/) you will find many different builds of VueI18n. Here’s an overview of the difference between them:

- UMD: `vue-i18n.js`
- CommonJS: `vue-i18n.common.js`
- ES Module for bundlers: `vue-i18n.esm.js`
- ES Module for browsers: `vue-i18n.esm.browser.js`

### Terms

- **[UMD](https://github.com/umdjs/umd)**: UMD builds can be used directly in the browser via a `<script>` tag. The default file from Unpkg CDN at [https://unpkg.com/vue-i18n](https://unpkg.com/vue-i18n) is the UMD build (`vue-i18n.js`).

- **[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)**: CommonJS builds are intended for use with older bundlers like [browserify](http://browserify.org/) or [webpack 1](https://webpack.github.io). The default file for these bundlers (`pkg.main`) is the Runtime only CommonJS build (`vue-i18n.common.js`).

- **[ES Module](http://exploringjs.com/es6/ch_modules.html)**: starting in 8.11 VueI18n provides two ES Modules (ESM) builds:
  - ESM for bundlers: intended for use with modern bundlers like [webpack 2](https://webpack.js.org) or [Rollup](https://rollupjs.org/). ESM format is designed to be statically analyzable so the bundlers can take advantage of that to perform "tree-shaking" and eliminate unused code from your final bundle. The default file for these bundlers (`pkg.module`) is the Runtime only ES Module build (`vue-i18n.esm.js`).
  - ESM for browsers (8.11+ only, `vue-i18n.esm.browser.js`): intended for direct imports in modern browsers via `<script type="module">`.
