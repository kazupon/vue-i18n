# Начало работы

:::tip ПРИМЕЧАНИЕ
В примерах кода этого руководства используется [ES2015](https://github.com/lukehoban/es6features).
:::

## HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>

<div id="app">
  <p>{{ $t("message.hello") }}</p>
</div>
```

## JavaScript

```js
// При использовании модульной системы (например, через vue-cli)
// нужно импортировать Vue и VueI18n и вызвать Vue.use(VueI18n).
//
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
//
// Vue.use(VueI18n)

// Готовые переводы сообщений локализаций
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ru: {
    message: {
      hello: 'Привет мир'
    }
  }
}

// Создание экземпляра VueI18n с настройками
const i18n = new VueI18n({
  locale: 'ru', // установка локализации по умолчанию
  messages // установка сообщений локализаций
})

// Создание экземпляра Vue с опцией `i18n`
new Vue({ i18n }).$mount('#app')

// Теперь можно запускать приложение!
```

Результат будет таким:

```html
<div id="#app">
  <p>Привет мир</p>
</div>
```
