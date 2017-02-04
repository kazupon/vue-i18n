# Installation

## Compatibility
- Vue.js `1.0.0`+ 
- Vue.js `2.0.0-beta.1`+


## Installation

### CDN
unpkg
```html
<script src="https://unpkg.com/vue-i18n@5.0.0/dist/vue-i18n.min.js"></script>
```

jsdelivr

```html
<script src="https://cdn.jsdelivr.net/vue.i18n/5.0.0/vue-i18n.min.js"></script>
```

### NPM

#### stable version

    $ npm install vue-i18n

#### development version

    $ git clone https://github.com/kazupon/vue-i18n node_modules/vue-i18n
    $ cd node_modules/vue-i18n
    $ npm install
    $ npm run build

When used in CommonJS, you must explicitly install the router via Vue.use():

> :warning: if you are using `vue-router`, you must install with `Vue.use()` in advance of instance methods (`router#map`, `router#start`, ...etc).

```javascript
var Vue = require('vue')
var VueI18n = require('vue-i18n')

Vue.use(VueI18n)
Vue.config.lang = 'ja'
Vue.locale('ja', { ... })
```

You don't need to do this when using the standalone build, as it installs itself automatically.

### YARN

alernatively, using Facebook's recently released [yarn](https://yarnpkg.com) package manager.

    $ yarn
