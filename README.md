# vue-i18n

[![Build Status](https://travis-ci.org/kazupon/vue-i18n.svg?branch=master)](https://travis-ci.org/kazupon/vue-i18n)
[![Coverage Status](https://img.shields.io/coveralls/kazupon/vue-i18n.svg)](https://coveralls.io/r/kazupon/vue-i18n?branch=master)
[![NPM version](https://badge.fury.io/js/vue-i18n.svg)](http://badge.fury.io/js/vue-i18n)
[![Sauce Test Status](https://saucelabs.com/buildstatus/vue-i18n)](https://saucelabs.com/u/vue-i18n)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


Internationalization plugin of Vue.js


# Requirements
- works with Vue.js `0.12.0`+


# Installation

## npm

```shell
$ npm install vue-i18n
```

## bower

```shell
$ bower install vue-i18n
```

When used in CommonJS, you must explicitly install the router via Vue.use():

```javascript
var Vue = require('vue')
var i18n = require('vue-validator')

Vue.use(i18n, { ... })
```

# Usage

```javascript
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
  locales: locales
})

// create instance
new Vue({
  el: '#test-i18n'
})
```

Template the following:

```html
<div id="test-i18n" class="message">
  <p>{{ $t("message.hello") }}</p>
</div>
```

Output the following:

```html
<div id="test-i18n" class="message">
  <p>ザ・ワールド</p>
</div>
```


# Formatting

## Named formatting

Locale the following:

```javascript
var locales = {
  en: {
    message: {
      hello: '{msg} world'
    }
  }
}
```

Template the following:

```html
<div class="message">
  <p>{{ $t('message.hello', { msg: "hello"}) }}</p>
</div>
```

Output the following:

```html
<div class="message">
  <p>hello world</p>
</div>
```

## List formatting

Locale the following:

```javascript
var locales = {
  en: {
    message: {
      hello: '{0} world'
    }
  }
}
```

Template the following:

```html
<div class="message">
  <p>{{ $t('message.hello', ["hello"]) }}</p>
</div>
```

Output the following:

```html
<div class="message">
  <p>hello world</p>
</div>
```


# API

## $t(keypath, [lang], [arguments])
- keypath: `String` **required**
- lang: `String` **optional**
- arguments: `Array | Object` **optional**

Translate the locale of `keypath`. If you specified `lang`, translate the locale of `lang`. If you specified `keypath` of list / named formatting local, you must specify `arguments` too. For `arguments` more details see [Formatting](https://github.com/kazupon/vue-i18n#formatting).


# Options

## Plugin options

```javascript
Vue.use(plugin, {
  lang: 'en',
  locales: {
    en: {
      ...
    },
    ...
    ja: {
      ...
    }
  }
})
```

### lang
Specify translate the language code.

If you abbreviated the `lang` option, translate as well as 'en' language code option (default: 'en').

### locales
Specify translate some local dictionary.

If you abbreviated the `locales` option, set the empty local dictionary.


# Configuration

## Vue.config.lang
Get or set a global translation language code. Default by `en` string value. You can change the language of the global level dynamic translation in your application.

When specified with `lang` plugins option at `Vue.use`, `Vue.config.lang` is set that value.


# Contributing
- Fork it !
- Create your top branch from `dev`: `git branch my-new-topic origin/dev`
- Commit your changes: `git commit -am 'Add some topic'`
- Push to the branch: `git push origin my-new-topic`
- Submit a pull request to `dev` branch of `kazupon/vue-i18n` repository !


# Testing

```shell
$ make test
```


# License

## MIT

[MIT](http://opensource.org/licenses/MIT)
