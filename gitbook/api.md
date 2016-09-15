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

### missingHandler

- **Type:** `Function`

- **Default:** `null`

- **Usage:**

  Assign a handler for translation missing. The handler gets called with the translation target language, translation key and the Vue instance.

  ```javascript
  Vue.config.missingHandler = function (lang, key, vm) {
    // handle translation missing
  }
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
  This is the same as the `$t` method. This is translate function for global locale only. more detail see [$t](#tkeypath-lang-arguments).

### Vue.tc( keypath, [choice], [arguments] )

- **Arguments:**
  - `{String} keypath`
  - `{Number} [choice] - default: 1`
  - `{String | Array | Object [arguments]`

- **Return:**
  Translated pluralization string

- **Usage:**
  This is the same as the `$tc` method. This is translate pluralization function for global locale only. more detail see [$tc](#tc-keypath-choice-arguments-).

## Constructor Options

### locales

- **Type:** `Object`

- **Details:**

  A locale definition object to be made available to the Vue instance only.

- **See also:**
  - [$t](#tkeypath-lang-arguments)

## Instance Methods

### $t(keypath, [lang], [arguments])

- **Arguments:**
  - `{String} keypath`
  - `{String} [lang]`
  - `{Array | Object [arguments]`

- **Return:**
  Translated string

- **Usage:**
  Translate the locale of `keypath`. Translate in preferentially component locale than global locale. If not specified component locale, translate with global locale. If you specified `lang`, translate the locale of `lang`. If you specified `keypath` of list / named formatting local, you must specify `arguments` too. For `arguments` more details see [Formatting](formatting.md).

### $tc( keypath, [choice], [arguments] )

- **Arguments:**
  - `{String} keypath`
  - `{Number} [choice] - default: 1`
  - `{String | Array | Object [arguments]`

- **Return:**
  Translated pluralization string

- **Usage:**

  Translate the locale of `keypath` with pluralization. Translate in preferentially component locale than global locale. If not specified component locale, translate with global locale. If you will specify String value to `arguments`, translate the locale of value. If you wll specify Array or Object value to `arguments`, you must specify with `arguments` of [$t](#tkeypath-lang-arguments).
