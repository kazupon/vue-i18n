# vue-i18n

[![Build Status](https://travis-ci.org/kazupon/vue-i18n.svg?branch=master)](https://travis-ci.org/kazupon/vue-i18n)
[![Coverage Status](https://img.shields.io/coveralls/kazupon/vue-i18n.svg)](https://coveralls.io/r/kazupon/vue-i18n?branch=master)
[![NPM version](https://badge.fury.io/js/vue-i18n.svg)](http://badge.fury.io/js/vue-i18n)
[![Sauce Test Status](https://saucelabs.com/buildstatus/vue-i18n)](https://saucelabs.com/u/vue-i18n)


Internationalization plugin of Vue.js


# Requirements
works with Vue.js `1.0.0`+


# Installation

## npm

```shell
$ npm install vue-i18n
```

When used in CommonJS, you must explicitly install the router via Vue.use():

```javascript
var Vue = require('vue')
var VueI18n = require('vue-i18n')

Vue.use(VueI18n, { ... })
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

// install plugin
// DEPRECATED:
//   `options` arguments, please use `Vue.config.lang` and `Vue.locale`.
//   3.1 later, not used `options` arguments!!
Vue.use(i18n/*, {
  lang: 'ja',
  locales: locales
}*/)


// RECOMMEND: 3.0 or later
// set lang
Vue.config.lang = 'ja'

// RECOMMEND: 3.0 or later
// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
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
<div class="message">
  <p>{{{ $t('message.hello') }}}</p>
</div>
```

Output the following (instead of the message pre formatted)

```html
<div class="message">
  <p>hello
  <!--<br> exists but is rendered as html and not a string-->
  world</p>
</div>
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


# Interpolation format
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

### Vue.locale ( lang, [locale] )

- **Arguments:**
    - `{String} lang`
    - `{Object | Function} [locale]`
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

> NOTE: Deprecated in 3.0 or later

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


# Testing

```shell
$ npm run unit
```


# License

## MIT

[MIT](http://opensource.org/licenses/MIT)
