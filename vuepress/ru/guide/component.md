# Локализация на основе компонентов

В основном данные локализации (например, `locale`,`messages`, и т.д.) задаются в качестве опции конструктора экземпляра `VueI18n` и устанавливаются опцией `i18n` корневого экземпляра Vue.

Поэтому вы можете глобально переводить, используя методы `$t` или `$tc` в корневом экземпляре Vue и любом из его компонентов. Также можно управлять данными локализации для каждого компонента в отдельности, что может быть удобнее благодаря дизайну ориентированному на компоненты Vue.

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

As in the example above, if the component doesn't have the locale message, it falls back to globally defined localization info. The component uses the language set in the root instance (in the above example: `locale: 'ru'`).

Note that, by default, falling back to root locale generates two warnings in the console:

```console
[vue-i18n] Value of key 'message.greeting' is not a string!
[vue-i18n] Fall back to translate the keypath 'message.greeting' with root locale.
```

To suppress these warnings (while keeping those which warn of the total absence of translation for the given key) set `silentFallbackWarn: true` when initializing the `VueI18n` instance.

If you want to localize using the component locale, you can do that with `sync: false` and `locale` in the `i18n` option.

## Общие сообщения локализации для компонентов

Sometimes you may want to import shared locale messages for certain components, not fallback from global locale messages (e.g. common messages of certain feature for components.

You can use `sharedMessages` options of `i18n`.

Common Locale Messages example:

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

Если указать опцию `sharedMessages` вместе с опцией `messages`, то эти сообщения будут объединены в сообщения локализации в экземпляре VueI18n этого компонента.

## Локализация в функциональных компонентах

При использовании функционального компонента все данные (включая props, children, slots, parent, и т.д.) передаются через `context`, содержащий все атрибуты, а также нет возможности использовать `this`, поэтому при использовании vue-i18n с функциональными компонентами необходимо обращаться к `$t` как к `parent.$t`, например так:

```html
...
<div>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src="" :alt="parent.$t('message.hello')" />
  </a>
</div>
...
```
