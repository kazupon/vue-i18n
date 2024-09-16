# Локализация дат

:::tip Поддержка с версии
:new: 7.0+
:::

Можно выполнять локализацию дат по соответствующему формату.

Пример формата для дат:

```js
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  'pt-BR': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  }
}
```

Как видно выше, можно определять именованный формат даты (например, `short`, `long` и т.д.) используя [опции ECMA-402 Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)

После этого, для возможности использования данного формата в сообщениях локализации, необходимо задать опцию `dateTimeFormats` в конструкторе `VueI18n`:

```js
const i18n = new VueI18n({
  dateTimeFormats
})

new Vue({
  i18n
}).$mount('#app')
```

Шаблон:

```html
<div id="app">
  <p>{{ $d(new Date(), 'short') }}</p>
  <p>{{ $d(new Date(), 'long', 'pt-BR') }}</p>
</div>
```

Результат:

```html
<div id="app">
  <p>Jan 18, 2021</p>
  <p>domingo, 18 de janeiro de 2021 5:47 AM</p>
</div>
```
