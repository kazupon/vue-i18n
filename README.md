# vue-i18n

[![Build Status](https://travis-ci.org/kazupon/vue-i18n.svg?branch=master)](https://travis-ci.org/kazupon/vue-i18n) [![Coverage Status](https://coveralls.io/repos/kazupon/vue-i18n/badge.png)](https://coveralls.io/r/kazupon/vue-i18n) [![NPM version](https://badge.fury.io/js/vue-i18n.svg)](http://badge.fury.io/js/vue-i18n) [![Dependency Status](https://david-dm.org/kazupon/vue-i18n.svg)](https://david-dm.org/kazupon/vue-i18n) 

Internationalization plugin of Vue.js


# Installing

```shell
$ component install kazupon/vue-i18n
```


# Usage

```js
var Vue = require('vue');
var i18n = require('vue-i18n');

// ready translated resources
var resources = {
  en: {
    message: {
      hello: 'the world'
    }
  },
  ja: {
    message: {
      hello: 'ザ・ワールド'
    }
  }
};

// set plugin
Vue.use(i18n, {
  lang: 'ja',
  resources: resources 
});
```

Template the following:

```html
<div class="message">
  <p v-t="message.hello"></p>
</div>
```

Output the following:

```html
<div class="message">
  <p>ザ・ワールド</p>
</div>
```


# Testing

```shell
$ make test
```


# TODO
- specify default translate value
- fallback translate


# License

See the `LICENSE`.
