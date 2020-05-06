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
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
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
  <p>{{ $d(new Date(), 'long', 'ru-RU') }}</p>
</div>
```

Результат:

```html
<div id="app">
  <p>Apr 19, 2017</p>
  <p>2017年4月19日(水) 午前2:19</p>
</div>
```
