# Миграция с версии v5.x

## Глобальная конфигурация

### Заменён lang

Используйте у конструктора класса `VueI18n` опцию `locale` или свойство `VueI18n#locale`:

```js
const i18n = new VueI18n({
  locale: 'en'
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// переключение локализации
i18n.locale = 'ru'
// или
app.$i18n.locale = 'ru'
```

### Заменён fallbackLang

Используйте у конструктора класса `VueI18n` опцию `fallbackLocale` или свойство
`VueI18n#fallbackLocale`:

```js
const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en'
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// изменение запасной локализации
i18n.fallbackLocale = 'zh'
// или
app.$i18n.fallbackLocale = 'zh'
```

### Заменён missingHandler

Используйте у конструктора класса `VueI18n` опцию `missing` или свойство `VueI18n#missing`:

```js
const i18n = new VueI18n({
  // ...
  missing: (locale, key, vm, values) => {
    // обработка отсутствующих переводов
  }
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// изменение обработчика для отсутствующих переводов
i18n.missing = (locale, key, vm, values) => {
  // обработка отсутствующих переводов
}
// или
app.$i18n.missing = (locale, key, vm, values) => {
  // обработка отсутствующих переводов
}
```

### Заменён i18nFormatter

Используйте у конструктора класса `VueI18n` опцию `formatter` или свойство `VueI18n#formatter`:

```js
class CustomFormatter {
  format(message, ...values) {
    // какая-то логика
    return 'something string'
  }
}

const i18n = new VueI18n({
  // ...
  formatter: new CustomFormatter()
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// изменение пользовательского форматтера
i18n.formatter = {
  format: (message, ...values) => {
    // какая-то логика
    return 'something string'
  }
}
// или
app.$i18n.formatter = {
  format: (message, ...values) => {
    // какая-то логика
    return 'something string'
  }
}
```

## Глобальные методы

### Заменён Vue.locale

Используйте у конструктора класса `VueI18n` опцию `messages` или методы `VueI18n#GetLocaleMessage` / `VueI18n#setLocaleMessage`:

```js
const i18n = new VueI18n({
  // ...
  messages: {
    en: {
      hello: 'hello world'
      // ...
    },
    ru: {
      hello: 'привет мир'
      // ...
    }
  }
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// получение сообщений локализации
const en = i18n.getLocaleMessage('en')
en.greeting = 'hi!'
// установка сообщений локализации
i18n.setLocaleMessage('en', en)
// или
const ru = app.$i18n.getLocaleMessage('ru')
ru.greeting = 'Привет!'
app.$i18n.setLocaleMessage('ru', ru)
```

### Заменён Vue.t

Используйте метод `VueI18n#t`:

```js
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      greeting: 'hi {name}'
    }
  }
  // ...
})

i18n.t('greeting', { name: 'kazupon' }) // -> hi kazupon
```

### Заменён Vue.tc

Используйте метод `VueI18n#tc`:

```js
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      apple: 'no apples | one apple | {count} apples'
    }
  }
  // ...
})

const count = 10
i18n.tc('apple', count, { count }) // -> 10 apples
```

### Заменён Vue.te

Используйте метод `VueI18n#te`:

```js
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      hello: 'hello world'
    }
  }
  // ...
})

i18n.te('hello') // -> true
i18n.te('hallo', 'ru') // -> false
i18n.te('hello') // -> true
```

## Опции конструктора

### Заменён locales

Используйте у конструктора класса `VueI18n` опцию `messages` или `messages` из `i18n` (для компонента):

```js
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      greeting: 'hi {name}'
    }
  }
  // ...
})

// для компонента
const Component1 = {
  i18n: {
    messages: {
      en: {
        title: 'Title 1'
      }
    }
  }
}
```

## Свойства экземпляра

### Заменён \$lang

Используйте свойство `VueI18n#locale`:

```js
const i18n = new VueI18n({
  locale: 'en'
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// переключение локализации
i18n.locale = 'ru'
// или
app.$i18n.locale = 'ru'
```

## Другие возможности

### Динамическая локализация удалена

При необходимости динамически устанавливать сообщения локализации потребуется добавить реализацию самостоятельно:

```js
const i18n = new VueI18n({ locale: 'en' })
const app = new Vue({
  i18n,
  data: { loading: '' }
}).$mount('#app')

function loadLocaleMessage(locale, cb) {
  return fetch('/locales/' + locale, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
    .then(json => {
      if (Object.keys(json).length === 0) {
        return Promise.reject(new Error('locale empty !!'))
      } else {
        return Promise.resolve(json)
      }
    })
    .then(message => {
      cb(null, message)
    })
    .catch(error => {
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
