# Миграция с версии v5.x

## Глобальная конфигурация

### lang  replaced

Use `VueI18n` class constructor `locale` option, or `VueI18n#locale` property:

```js
  const i18n = new VueI18n({
    locale: 'en',
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // change locale
  i18n.locale = 'ru'
  // or
  app.$i18n.locale = 'ru'
```

### fallbackLang replaced

Use `VueI18n` class constructor `fallbackLocale` option, or
`VueI18n#fallbackLocale` property:

```js
  const i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // change fallback locale
  i18n.fallbackLocale = 'zh'
  // or
  app.$i18n.fallbackLocale = 'zh'
```

### missingHandler replaced

Use `VueI18n` class constructor `missing` option, or `VueI18n#missing`
property:

```js
const i18n = new VueI18n({
  // ...
  missing: (locale, key, vm, values) => {
    // handle translation missing
  },
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// change missing handler
i18n.missing = (locale, key, vm, values) => {
  // handle translation missing
}
// or
app.$i18n.missing = (locale, key, vm, values) => {
  // handle translation missing
}
```

### i18nFormatter replaced

Use `VueI18n` class constructor `formatter` option, or `VueI18n#formatter`
property:

```js
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

## Глобальные методы

### Vue.locale replaced

Use `VueI18n` class constructor `messages` option, or
`VueI18n#GetLocaleMessage` / `VueI18n#setLocaleMessage` methods:

```js
  const i18n = new VueI18n({
    // ...
    messages: {
      en: {
        hello: 'hello world',
        // ...
      },
      ru: {
        hello: 'привет мир',
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
  const ru = app.$i18n.getLocaleMessage('ru')
  ru.greeting = 'Привет!'
  app.$i18n.setLocaleMessage('ru', ru)
```

### Vue.t replaced

Use `VueI18n#t` method:

```js
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

### Vue.tc replaced

Use `VueI18n#tc` method:

```js
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

### Vue.te replaced

Use `VueI18n#te` method:

```js
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
i18n.te('hallo', 'ru') // -> false
i18n.te('hello') // -> true
```

## Опции конструктора

### locales replaced

Use `messages` of `VueI18n` class constructor option, or `messages` of `i18n`
option (for Component option):

```js
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

## Свойства экземпляра

### $lang replaced

Use `VueI18n#locale` property:

```js
const i18n = new VueI18n({
  locale: 'en',
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// change locale
i18n.locale = 'ru'
// or
app.$i18n.locale = 'ru'
```

## Другие возможности

### Dynamic locale removed

If you need to dynamic set locale messages, you should implement the below:

```js
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
