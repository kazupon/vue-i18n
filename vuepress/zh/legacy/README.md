# 从 v5.x 迁移

## 全局配置

### lang 已被替换

使用 `VueI18n` 类构造函数 `locale` 选项或 `VueI18n#locale` 属性：

```js
  const i18n = new VueI18n({
    locale: 'en',
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // 更改 locale
  i18n.locale = 'ja'
  // 或者
  app.$i18n.locale = 'ja'
```

### fallbackLang 已被替换

使用 `VueI18n` 类构造函数 `fallbackLocale` 选项或 `VueI18n#fallbackLocale` 属性：

```js
  const i18n = new VueI18n({
    locale: 'ja',
    fallbackLocale: 'en',
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // 更改 fallback locale
  i18n.fallbackLocale = 'zh'
  // 或者
  app.$i18n.fallbackLocale = 'zh'
```

### missingHandler 已被替换

使用 `VueI18n` 类构造函数 `missing` 选项或 `VueI18n#missing` 属性：

```js
const i18n = new VueI18n({
  // ...
  missing: (locale, key, vm, values) => {
    // 处理翻译缺失
  },
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// 改变丢失的处理函数
i18n.missing = (locale, key, vm, values) => {
  // 处理翻译缺失
}
// or
app.$i18n.missing = (locale, key, vm, values) => {
  // 处理翻译缺失
}
```

### i18nFormatter 已被替换

使用 `VueI18n` 类构造函数 `formatter` 选项或 `VueI18n#formatter` 属性：

```js
  class CustomFormatter {
    format (message, ...values) {
      // 一些渲染逻辑
      return 'something string'
    }
  }

  const i18n = new VueI18n({
    // ...
    formatter: new CustomFormatter(),
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // 更改自定义格式化程序
  i18n.formatter = {
    format: (message, ...values) => {
      // 一些渲染逻辑
      return 'something string'
    }
  }
  // or
  app.$i18n.formatter = {
    format: (message, ...values) => {
      // 一些渲染逻辑
      return 'something string'
    }
  }
```

## 全局方法

### Vue.locale 已被替换

使用 `VueI18n` 类构造函数 `messages` 选项，或者使用 `VueI18n#GetLocaleMessage` / `VueI18n#setLocaleMessage` 方法：

```js
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

  // 获取 locale message
  const en = i18n.getLocaleMessage('en')
  en.greeting = 'hi!'
  // 设置 locale message
  i18n.setLocaleMessage('en', en)
  // 或者
  const ja = app.$i18n.getLocaleMessage('ja')
  ja.greeting = 'やあ！'
  app.$i18n.setLocaleMessage('ja', ja)
```

### Vue.t 已被替换

使用 `VueI18n#t` 方法：

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

### Vue.tc 已被替换

使用 `VueI18n#tc` 方法：

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

### Vue.te 已被替换

使用 `VueI18n#te` 方法：

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
i18n.te('hallo', 'ja') // -> false
i18n.te('hello') // -> true
```

## 构造函数选项

### locales 已被替换

使用 `messages` 的 `VueI18n` 类的构造函数的选项，或 `messages` 的 `i18n` 选项 (针对组件选项)：

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

// 针对组件选项
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

## 实例属性

### $lang 已被替换

使用 `VueI18n#locale` 属性：

```js
const i18n = new VueI18n({
  locale: 'en',
  // ...
})
const app = new Vue({ i18n }).$mount('#app')

// 更改 locale
i18n.locale = 'ja'
// 或者
app.$i18n.locale = 'ja'
```

## 特性

### 已删除动态语言环境

如果需要动态设置语言环境信息，则应实现以下内容：

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
