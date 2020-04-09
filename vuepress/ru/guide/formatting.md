# Формат сообщений локализации

## Именованный формат

Сообщения локализации:

```js
const messages = {
  en: {
    message: {
      hello: '{msg} world'
    }
  },
  ru: {
    message: {
      hello: '{msg} мир'
    }
  }
}
```

Шаблон:

```html
<p>{{ $t('message.hello', { msg: 'привет' }) }}</p>
```

Результат:

```html
<p>привет мир</p>
```

## Формат списков

Сообщения локализации:

```js
const messages = {
  en: {
    message: {
      hello: '{0} world'
    }
  },
  ru: {
    message: {
      hello: '{0} мир'
    }
  }
}
```

Шаблон:

```html
<p>{{ $t('message.hello', ['привееет']) }}</p>
```

Результат:

```html
<p>привееет мир</p>
```

Форматирование списков также принимает объекты, соответствующие по структуре массиву:

```html
<p>{{ $t('message.hello', {'0': 'привееет'}) }}</p>
```

Результат:

```html
<p>привееет мир</p>
```

## HTML формат

:::warning Обратите внимание
:warning: Динамическая локализация произвольного HTML на вебсайте может быть очень опасна, потому что легко может привести к XSS-уязвимостям. Используйте HTML-интерполяцию только для доверенного контента и никогда на пользовательском.

Рекомендуем в таких случаях использовать возможность [интерполяции компонента](interpolation.md).
:::

:::warning Обратите внимание

> :new: 8.11+

Можно управлять использованием HTML форматирования. Для подробностей см. опцию конструктора `warnHtmlInMessage` и свойства API.
:::

Иногда требуется отобразить перевод HTML-сообщением, а не статической строкой.

```js
const messages = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  },
  ru: {
    message: {
      hello: 'привет <br> мир'
    }
  }
}
```

Шаблон:

```html
<p v-html="$t('message.hello')"></p>
```

Результат (вместо отформатированного сообщения)

```html
<p>
  hello
  <!-- <br> существует, но отрендерен как html, а не как строка -->
  world
</p>
```

## Формат ruby on rails i18n

Сообщения локализации:

```js
const messages = {
  en: {
    message: {
      hello: '%{msg} world'
    }
  },
  ru: {
    message: {
      hello: '%{msg} мир'
    }
  }
}
```

Шаблон:

```html
<p>{{ $t('message.hello', { msg: 'привет' }) }}</p>
```

Результат:

```html
<p>привет мир</p>
```

## Пользовательский формат

Иногда может потребоваться осуществлять перевод для собственного формата (например, для [синтаксиса сообщений ICU](http://userguide.icu-project.org/formatparse/messages)).

Это возможно реализовать с помощью специального пользовательского Formatter, который реализует [интерфейс Formatter](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js#L41-L43).

Пример пользовательского Formatter с синтаксисом класса ES2015:

```js
// Реализация пользовательского Formatter
class CustomFormatter {
  constructor(options) {
    // ...
  }

  //
  // interpolate
  //
  // @param {string} message
  //   string of list or named format.
  //   e.g.
  //   - named formatting: 'Hi {name}'
  //   - list formatting: 'Hi {0}'
  //
  // @param {Object | Array} values
  //   values of `message` interpolation.
  //   passed values with `$t`, `$tc` and `i18n` functional component.
  //   e.g.
  //   - $t('hello', { name: 'kazupon' }) -> passed values: Object `{ name: 'kazupon' }`
  //   - $t('hello', ['kazupon']) -> passed values: Array `['kazupon']`
  //   - `i18n` functional component (component interpolation)
  //     <i18n path="hello">
  //       <p>kazupon</p>
  //       <p>how are you?</p>
  //     </i18n>
  //     -> passed values: Array (included VNode):
  //        `[VNode{ tag: 'p', text: 'kazupon', ...}, VNode{ tag: 'p', text: 'how are you?', ...}]`
  //
  // @return {Array<any>}
  //   interpolated values. you need to return the following:
  //   - array of string, when is using `$t` or `$tc`.
  //   - array included VNode object, when is using `i18n` functional component.
  //
  interpolate(message, values) {
    // implement interpolation logic here
    // ...

    // return the interpolated array
    return ['resolved message string']
  }
}

// Регистрация через опцию `formatter`
const i18n = new VueI18n({
  locale: 'en-US',
  formatter: new CustomFormatter(/* опции конструктора */),
  messages: {
    'en-US': {
      // ...
    },
    'ru-RU': {
      // ...
    }
    // ...
  }
})

// Запускаем приложение!
new Vue({ i18n }).$mount('#app')
```

Можете изучить [официальный пример пользовательского formatter](https://github.com/kazupon/vue-i18n/tree/dev/examples/formatting/custom).
