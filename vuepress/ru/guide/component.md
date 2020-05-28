# Локализация на основе компонентов

В основном данные для локализации (например, `locale`,`messages`, и т.д.) задаются опциями конструктора экземпляра `VueI18n` и устанавливаются через свойство `i18n` в корневой экземпляр Vue.

Поэтому можно глобально выполнять переводы, используя методы `$t` или `$tc` в корневом экземпляре Vue и любом из компонентов в нём. Но также возможно указывать данные для локализации в каждом компоненте в отдельности, что может быть удобнее благодаря компонентно-ориентированному дизайну.

Пример локализации на основе компонентов:

```js
// Установка локализации в корневой экземпляр Vue
const i18n = new VueI18n({
  locale: 'ru',
  messages: {
    en: {
      message: {
        hello: 'hello world',
        greeting: 'good morning'
      }
    },
    ru: {
      message: {
        hello: 'привет мир',
        greeting: 'доброе утро'
      }
    }
  }
})

// Определение компонента
const Component1 = {
  template: `
    <div class="container">
     <p>Component1 locale messages: {{ $t("message.hello") }}</p>
     <p>Fallback global locale messages: {{ $t("message.greeting") }}</p>
   </div>`,
  i18n: {
    // опция `i18n`, определение данных локализации для компонента
    messages: {
      en: { message: { hello: 'hello component1' } },
      ru: { message: { hello: 'привет component1' } }
    }
  }
}

new Vue({
  i18n,
  components: {
    Component1
  }
}).$mount('#app')
```

Шаблон:

```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

Результат:

```html
<div id="app">
  <p>привет мир</p>
  <div class="container">
    <p>Component1 locale messages: привет component1</p>
    <p>Fallback global locale messages: доброе утро</p>
  </div>
</div>
```

Если компонент не имеет собственного сообщения для локализации, то в качестве запасного выхода он обратится к глобальным данным для локализации. Компонент использует локаль, установленную в корневом экземпляре (в примере выше установлена: `locale: 'ru'`).

Обратите внимание, по умолчанию при обращении к данным корневой локализации будут генерироваться предупреждения в консоли:

```
[vue-i18n] Value of key 'message.greeting' is not a string!
[vue-i18n] Fall back to translate the keypath 'message.greeting' with root locale.
```

Чтобы скрыть эти предупреждения (оставив те, что предупреждают о полном отсутствии перевода для данного ключа) установите опцию `silentFallbackWarn: true` при инициализации экземпляра `VueI18n`.

Если необходимо осуществлять перевод, основываясь на локали компонента, то это можно сделать с помощью опции `sync: false` и `locale` в настройках `i18n`.

## Общие сообщения локализации для компонентов

Иногда может потребоваться импортировать сообщения локализации в определённых компонентах, чтобы не обращаться к глобальным сообщениям локализации (например, общие сообщения для определённых функций компонентов).

Для этого можно использовать опцию `sharedMessages` в свойстве `i18n` компонента.

Пример использования общих сообщений локализации:

```js
export default {
  en: {
    buttons: {
      save: 'Save'
      // ...
    }
  },
  ru: {
    buttons: {
      save: 'Сохранить'
      // ...
    }
  }
}
```

Компонент:

```js
import commonMessage from './locales/common' // импорт общих сообщений локализации

export default {
  name: 'ServiceModal',
  template: `
    <div class="modal">
      <div class="body">
        <p>Это хороший сервис</p>
      </div>
      <div class="footer">
        <button type="button">
          {{ $t('buttons.save') }}
        </button>
      </div>
    </div>
  `,
  i18n: {
    messages: { ... },
    sharedMessages: commonMessages
  }
}
```

Если указаны опции `sharedMessages` и `messages`, то их сообщения будут объединены в сообщения локализации в экземпляре VueI18n этого компонента.

## Локализация в функциональных компонентах

При использовании функционального компонента все данные (включая `props`, `children`, `slots`, `parent`, и т.д.) передаются через `context`, в котором содержатся все эти атрибуты. Кроме того отсутствует возможность использовать `this`, поэтому при использовании vue-i18n с функциональными компонентами следует обращаться к `$t` как к `parent.$t`, например так:

```html
...
<div>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src="" :alt="parent.$t('message.hello')" />
  </a>
</div>
...
```
