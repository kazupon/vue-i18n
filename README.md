# vue-i18n

[![Build Status](https://travis-ci.org/kazupon/vue-i18n.svg?branch=master)](https://travis-ci.org/kazupon/vue-i18n)
[![Coverage Status](https://img.shields.io/coveralls/kazupon/vue-i18n.svg)](https://coveralls.io/r/kazupon/vue-i18n?branch=master)
[![NPM version](https://badge.fury.io/js/vue-i18n.svg)](http://badge.fury.io/js/vue-i18n)
[![Sauce Test Status](https://saucelabs.com/buildstatus/vue-i18n)](https://saucelabs.com/u/vue-i18n)


Internationalization plugin of Vue.js


# Compatibility
- Vue.js `1.0.0`+


# Installation

## CDN
jsdelivr

```html
<script src="https://cdn.jsdelivr.net/vue.i18n/3.0.0/vue-i18n.min.js"></script>
```

## NPM

```shell
$ npm install vue-i18n
```

When used in CommonJS, you must explicitly install the router via Vue.use():

```javascript
var Vue = require('vue')
var VueI18n = require('vue-i18n')

Vue.use(VueI18n)
Vue.config.lang = 'ja'
Vue.locale('ja', { ... })
```

# Usage

```javascript
var Vue = require('vue')
var VueI18n = require('vue-i18n')

// ready translated locales
var locales = {
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

// install plugin
// DEPRECATED:
//   `options` arguments, please use `Vue.config.lang` and `Vue.locale`.
//   3.1 or later, not used `options` arguments!!
Vue.use(VueI18n/*, {
  lang: 'ja',
  locales: locales
}*/)


// set lang
// RECOMMEND: 3.0 or later
Vue.config.lang = 'ja'

// set locales
// RECOMMEND: 3.0 or later
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

// create instance
new Vue({ el: 'body' })
```

Template the following:

```html
<p>{{ $t("message.hello") }}</p>
```

Output the following:

```html
<p>こんにちは、世界</p>
```


# Formatting

## HTML formatting
In some cases you might want to rendered your translation as an HTML message and not a static string.

```javascript
var locales = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  }
}
```

Template the following (notice the tripple brackets):

```html
<p>{{{ $t('message.hello') }}}</p>
```

Output the following (instead of the message pre formatted)

```html
<p>hello
<!--<br> exists but is rendered as html and not a string-->
world</p>
```

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
<p>{{ $t('message.hello', { msg: "hello"}) }}</p>
```

Output the following:

```html
<p>hello world</p>
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
<p>{{ $t('message.hello', ["hello"]) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

## Support ruby on rails i18n format

Locale the following:

```javascript
var locales = {
  en: {
    message: {
      hello: '%{msg} world'
    }
  }
}
```

Template the following:

```html
<p>{{ $t('message.hello', { msg: "hello"}) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

# Dynamic locale

Sometimes, you need to set dynamically the locale from external location. You can set dynamically it with `Vue.locale`.

the below the example:

```javascript
var self = this
var lang = 'ja'
Vue.locale(lang, function () {
  self.loading = true
  return fetch('/locale/' + lang, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json()
  }).then(function (json) {
    self.loading = false
    if (Object.keys(json).length === 0) {
      return Promise.reject(new Error('locale empty !!'))
    } else {
      return Promise.resolve(json)
    }
  }).catch(function (error) {
    self.error = error.message
    return Promise.reject()
  })
}, function () {
  Vue.config.lang = lang
})
```

## Dynamic locale interfaces

In dynamic locales, You can use the two type interfaces:

### 1. function
You need to implement locale setting that return function have `function (resolve, reject)` like promise (future). The following, those argument of the function, if successful, you need to use the `resolve` according to locale object. if failed, you need to use `reject`

- successful: `resolve`
- failed: `reject`

### 2. promise
As mentioned above, You need to implement locale setting that return a promise. if successful, you need to `resolve` according to locale object. if failed, you need to use `reject`.


# API References

## Global Config

### lang

- **Type:** `String`

- **Default:** `en`

- **Usage:**

  Get or set a translation language code. Default by `en` string value.

  ```javascript
  Vue.config.lang = 'ja'
  ```

## Global Methods

### Vue.locale ( lang, [locale], [cb] )

- **Arguments:**
    - `{String} lang`
    - `{Object | Function} [locale]`
    - `{Function} [cb]`
- **Return:**
    - locale function or object

- **Usage:**

  Register or retrieve a locale

  ```javascript
  // register locale with object
  Vue.locale('en', { message: 'hello' })

  // register with external locale
  Vue.locale('ja', function () {
    return fetch('/locales/ja', {
      method: 'get',
      // ...
    }).then(function (json) {
      return Promise.resolve(json)
    }).catch(function (error) {
      return Promise.reject()
    })
  }, function () {
    Vue.config.lang = 'ja'
  })
  ```

### Vue.t( keypath, [lang], [arguments] )

- **Arguments:**
  - `{String} keypath`
  - `{String} [lang]`
  - `{Array | Object [arguments]`

- **Return:**
  Translated string

- **Usage:**
  This is the same as the `$t` method. This is translate function for global. more detail see [$t](https://github.com/kazupon/vue-i18n#$t)

## Instance Methods

## $t(keypath, [lang], [arguments])

- **Arguments:**
  - `{String} keypath`
  - `{String} [lang]`
  - `{Array | Object [arguments]`

- **Return:**
  Translated string

- **Usage:**
  Translate the locale of `keypath`. If you specified `lang`, translate the locale of `lang`. If you specified `keypath` of list / named formatting local, you must specify `arguments` too. For `arguments` more details see [Formatting](https://github.com/kazupon/vue-i18n#formatting).


# Options

> NOTE: Deprecated in 3.1 or later :warning:

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


# Contributing
- Fork it !
- Create your top branch from `dev`: `git branch my-new-topic origin/dev`
- Commit your changes: `git commit -am 'Add some topic'`
- Push to the branch: `git push origin my-new-topic`
- Submit a pull request to `dev` branch of `kazupon/vue-i18n` repository !


# Development Setup

    # install deps
    npm install

    # build dist files
    npm run build

    # lint
    npm run lint

    # run unit tests only
    npm run unit

    # run e2e tests only
    npm run e2e

    # lint & run all tests
    npm test


# Changelog

Details changes for each release are documented in the [CHANGELOG.md](https://github.com/kazupon/vue-i18n/blob/dev/CHANGELOG.md).


# License

[MIT](http://opensource.org/licenses/MIT)
