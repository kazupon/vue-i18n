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

### Vue.tc( keypath, [chice], [arguments] )

TODO:

## Constructor Options

### locales

- **Type:** `Object`

- **Details:**

  A locale definition object to be made available to the Vue instance only.

- **See also:**
  - [$t](https://github.com/kazupon/vue-i18n#$t)

## Instance Methods

### $t(keypath, [lang], [arguments])

- **Arguments:**
  - `{String} keypath`
  - `{String} [lang]`
  - `{Array | Object [arguments]`

- **Return:**
  Translated string

- **Usage:**
  Translate the locale of `keypath`. Translate in preferentially component locale than global locale. If not specified component locale, translate with global locale. If you specified `lang`, translate the locale of `lang`. If you specified `keypath` of list / named formatting local, you must specify `arguments` too. For `arguments` more details see [Formatting](https://github.com/kazupon/vue-i18n#formatting).

### $tc( keypath, [chice], [arguments] )

TODO:

