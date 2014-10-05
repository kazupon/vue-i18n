# vue-i18n

[![Build Status](https://travis-ci.org/kazupon/vue-i18n.svg?branch=master)](https://travis-ci.org/kazupon/vue-i18n)
[![Coverage Status](https://img.shields.io/coveralls/kazupon/vue-i18n.svg)](https://coveralls.io/r/kazupon/vue-i18n?branch=master)
[![NPM version](https://badge.fury.io/js/vue-i18n.svg)](http://badge.fury.io/js/vue-i18n)
[![Dependency Status](https://david-dm.org/kazupon/vue-i18n.svg)](https://david-dm.org/kazupon/vue-i18n) 

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

// create instance
new Vue({
  el: '#test-i18n'
});
```

Template the following:

```html
<div id="test-i18n" class="message">
  <p v-t="message.hello"></p>
</div>
```

Output the following:

```html
<div id="test-i18n" class="message">
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
