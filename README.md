# vue-i18n

[![Build Status](https://travis-ci.org/kazupon/vue-i18n.svg?branch=master)](https://travis-ci.org/kazupon/vue-i18n)
[![Coverage Status](https://img.shields.io/coveralls/kazupon/vue-i18n.svg)](https://coveralls.io/r/kazupon/vue-i18n?branch=master)
[![NPM version](https://badge.fury.io/js/vue-i18n.svg)](http://badge.fury.io/js/vue-i18n)
[![Sauce Test Status](https://saucelabs.com/buildstatus/vue-i18n)](https://saucelabs.com/u/vue-i18n)


Internationalization plugin of Vue.js


# Compatibility
- Vue.js `1.0.0`+ 
- Vue.js `2.0.0-beta.1`+


# Installation

## CDN
jsdelivr

```html
<script src="https://cdn.jsdelivr.net/vue.i18n/4.2.0/vue-i18n.min.js"></script>
```

## NPM

### stable version

    $ npm install vue-i18n

### development version

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
Vue.use(VueI18n)


// set lang
Vue.config.lang = 'ja'

// set locales
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

# Fallback translation

Locale the following:

```javascript
var locales = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
Vue.config.lang = 'ja'
```

Template the following:

```html
<p>{{ $t('message') }}</p>
```

Output the following:

```html
<p>hello world</p>
```

# Component locale

You can translate component based.

The below locale setting example:

```javascript
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
      
Vue.config.lang = 'ja'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

new Vue({
  el: '#app',
  components: {
    component1: {
      template: '<p>component1 local: {{ $t("hello") }}</p>'
        + '<p>component1 global: {{ $t("message.hello") }}</p>',
      locales: {
        en: { hello: 'hello component1' },
        ja: { hello: 'こんにちは、component1' }
      }
    }
  }
})
```

Template the following:

```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

Output the following:

```html
<div id="app">
  <p>こんにちは、世界</p>
  <p>component1 local: こんにちは、component1</p>
  <p>component1 global: こんにちは、世界</p>
</div>
```

> :pencil: If you set the locale of same keypath as global locale (`Vue.locale()`), in its component, `$t` is translate with component locale.


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

> :warning: You must return a **ES6 compatible** promise.


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

### fallbackLang

- **Type:** `String`

- **Default:** `en`

- **Usage:**

  Get or set a translation fallback language code. Default by `en` string value.

  ```javascript
  Vue.config.fallbackLang = 'ja'
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
  This is the same as the `$t` method. This is translate function for global locale only. more detail see [$t](https://github.com/kazupon/vue-i18n#$t)

## Constructor Options

### locales

- **Type:** `Object`

- **Details:**

  A locale definition object to be made available to the Vue instance only.

- **See also:**
  - [$t](https://github.com/kazupon/vue-i18n#$t)

## Instance Methods

## $t(keypath, [lang], [arguments])

- **Arguments:**
  - `{String} keypath`
  - `{String} [lang]`
  - `{Array | Object [arguments]`

- **Return:**
  Translated string

- **Usage:**
  Translate the locale of `keypath`. Translate in preferentially component locale than global locale. If not specified component locale, translate with global locale. If you specified `lang`, translate the locale of `lang`. If you specified `keypath` of list / named formatting local, you must specify `arguments` too. For `arguments` more details see [Formatting](https://github.com/kazupon/vue-i18n#formatting).


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
