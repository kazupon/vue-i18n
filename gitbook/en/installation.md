# Installation

### Compatibility Note
- Vue.js `2.0.0`+

### Direct Download / CDN

https://unpkg.com/vue-i18n/dist/vue-i18n

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-i18n@6.1.2/dist/vue-i18n.js

Include vue-i18n after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
```

### NPM

    $ npm install vue-i18n

### Yarn

    $ yarn add vue-i18n

When used with a module system, you must explicitly install the `vue-i18n` via `Vue.use()`:

```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
```

You don't need to do this when using global script tags.

### Dev Build

You will have to clone directly from GitHub and build `vue-i18n` yourself if
you want to use the latest dev build.

    $ git clone https://github.com/kazupon/vue-i18n.git node_modules/vue-i18n
    $ cd node_modules/vue-i18n
    $ npm install
    $ npm run build

