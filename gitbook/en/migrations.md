# Migrations


## Global config

### lang <sup>replaced</sup>

Use `VueI18n` class constructor `locale` option, or `VueI18n#locale` property:

  ```javascript
  const i18n = new VueI18n({
    locale: 'en',
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // change locale
  i18n.locale = 'ja'
  // or
  app.$i18n.locale = 'ja'
  ```

### fallbackLang <sup>replaced</sup>

Use `VueI18n` class constructor `fallbackLocale` option, or `VueI18n#fallbackLocale` property:

  ```javascript
  const i18n = new VueI18n({
    locale: 'ja',
    fallbackLocale: 'en',
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // change fallback locale
  i18n.fallbackLocale = 'zh'
  // or
  app.$i18n.fallbackLocale = 'zh'
  ```

### missingHandler <sup>replaced</sup>

Use `VueI18n` class constructor `missing` option, or `VueI18n#missing` property:

  ```javascript
  const i18n = new VueI18n({
    // ...
    missing: (locale, key, vm) => {
      // handle translation missing
    },
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // change missing handler
  i18n.missing = (locale, key, vm) => {
    // handle translation missing
  }
  // or
  app.$i18n.missing = (locale, key, vm) => {
    // handle translation missing
  }
  ```

### i18nFormatter <sup>replaced</sup>

Use `VueI18n` class constructor `formatter` option, or `VueI18n#formatter` property:

  ```javascript
  class CustomFormatter {
    format (message, ...values) {
      // something render logic
      return 'something string'
    }
  }

  const i18n = new VueI18n({
    // ...
    formatter: new CustomFormatter(),
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // change custom formatter
  i18n.formatter = {
    format: (message, ...values) => {
      // something render logic
      return 'something string'
    }
  }
  // or
  app.$i18n.formatter = {
    format: (message, ...values) => {
      // something render logic
      return 'something string'
    }
  }
  ```

## Global methods

### Vue.locale <sup>replaced</sup>

Use `VueI18n` class constructor `messages` option, or `VueI18n#GetLocaleMessage` / `VueI18n#setLocaleMessage` methods:

  ```javascript
  const i18n = new VueI18n({
    // ...
    messages: {
      en: {
        hello: 'hello world',
        // ...
      },
      ja: {
        hello: 'こんにちは、世界',
        // ...
      }
    },
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // get locale message
  const en = i18n.getLocaleMessage('en')
  en.greeting = 'hi!'
  // set locale message
  i18n.setLocaleMessage('en', en)
  // or
  const ja = app.$i18n.getLocaleMessage('ja')
  ja.greeting = 'やあ！'
  app.$i18n.setLocaleMessage('ja', ja)
  ```

### Vue.t <sup>replaced</sup>

Use `VueI18n#t` method:

  ```javascript
  const i18n = new VueI18n({
    locale: 'en',
    messages: {
      en: {
        greeting: 'hi {name}'
      }
    },
    // ...
  })

  i18n.t('greeting', { name: 'kazupon' }) // -> hi kazupon
  ```

### Vue.tc <sup>replaced</sup>

Use `VueI18n#tc` method:

  ```javascript
  const i18n = new VueI18n({
    locale: 'en',
    messages: {
      en: {
        apple: 'no apples | one apple | {count} apples'
      }
    },
    // ...
  })

  const count = 10
  i18n.tc('apple', count, { count }) // -> 10 apples
  ```

### Vue.te <sup>replaced</sup>

Use `VueI18n#te` method:

  ```javascript
  const i18n = new VueI18n({
    locale: 'en',
    messages: {
      en: {
        hello: 'hello world'
      }
    },
    // ...
  })

  i18n.te('hello') // -> true
  i18n.te('hallo', 'ja') // -> false
  i18n.te('hello') // -> true
  ```

## Constructor options

### locales <sup>replaced</sup>

Use `messages` of `VueI18n` class constructor option, or `messages` of `i18n` option (for Component option):

  ```javascript
  const i18n = new VueI18n({
    locale: 'en',
    messages: {
      en: {
        greeting: 'hi {name}'
      }
    },
    // ...
  })

  // for Component
  const Component1 = {
    i18n: {
      messages: {
        en: {
          title: 'Title1'
        }
      }
    }
  }
  ```

## Instance properties

### $lang <sup>replaced</sup>

Use `VueI18n#locale` property:

  ```javascript
  const i18n = new VueI18n({
    locale: 'en',
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // change locale
  i18n.locale = 'ja'
  // or
  app.$i18n.locale = 'ja'
  ```

## Features

### Dynamic locale <sup>removed</sup>

If you need to dynamic set locale messages, you should implement the below:

  ```javascript
  const i18n = new VueI18n({ locale: 'en' })
  const app = new Vue({
    i18n,
    data: { loading: '' }
  }).$mount('#app')

  function loadLocaleMessage (locale, cb) {
    return fetch('/locales/' + locale, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((json) => {
      if (Object.keys(json).length === 0) {
        return Promise.reject(new Error('locale empty !!'))
      } else {
        return Promise.resolve(json)
      }
    }).then((message) => {
      cb(null, message)
    }).catch((error) => {
      cb(error)
    })
  }

  app.loading = 'loading ...'
  loadLocaleMessage('en', (err, message) => {
    if (err) {
      app.loading = ''
      console.error(err)
      return
    }
    i18n.setLocaleMessage('en', message)
    app.loading = ''
  })
  ```
