# vue-i18n

[![Build Status](https://travis-ci.org/kazupon/vue-i18n.svg?branch=master)](https://travis-ci.org/kazupon/vue-i18n)
[![Coverage Status](https://img.shields.io/coveralls/kazupon/vue-i18n.svg)](https://coveralls.io/r/kazupon/vue-i18n?branch=master)
[![NPM version](https://badge.fury.io/js/vue-i18n.svg)](http://badge.fury.io/js/vue-i18n)
[![Dependency Status](https://david-dm.org/kazupon/vue-i18n.svg)](https://david-dm.org/kazupon/vue-i18n) 

Internationalization plugin of Vue.js


# Installing

## component

```shell
$ component install kazupon/vue-i18n
```

## bower

```shell
$ bower install vue-i18n
```

## brwoerify

```shell
$ npm install vue-i18n
```


# Support Vue.js versoin

0.10.4 later


# Usage

## v-t directive

```js
var Vue = require('vue')
var i18n = require('vue-i18n')

// ready translated locales
var locales = {
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
}

// set plugin
Vue.use(i18n, {
  lang: 'ja',
  locales: locales // NOTE: 'resources' is deprecated
})

// create instance
new Vue({
  el: '#test-i18n'
})
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

## Vue.t function

```js
var Vue = require('vue')
var i18n = require('vue-i18n')

// ready translated locales
var locales = {
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
}

// set plugin
Vue.use(i18n, {
  lang: 'en',
  locales: locales
})

console.log(Vue.t('message.hello')) // output the 'the wolrd'
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
