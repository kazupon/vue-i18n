# Локализация чисел

:::tip Поддержка с версии
:new: 7.0+
:::

Можно выполнять локализацию чисел по соответствующему формату.

Пример формата для чисел:

```js
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'ru-RU': {
    currency: {
      style: 'currency',
      currency: 'RUB',
      currencyDisplay: 'symbol'
    }
  }
}
```

Как указано выше, можно задать числовые форматы (например, `currency` для валюты) используя [опции ECMA-402 Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

После этого, для возможности использования данного формата в сообщениях локализации, необходимо задать опцию `numberFormats` конструктора `VueI18n`:

```js
const i18n = new VueI18n({
  numberFormats
})

new Vue({
  i18n
}).$mount('#app')
```

Шаблон:

```html
<div id="app">
  <p>{{ $n(100, 'currency') }}</p>
  <p>{{ $n(100, 'currency', 'ru-RU') }}</p>
</div>
```

Результат:

```html
<div id="app">
  <p>$100.00</p>
  <p>100,00 ₽</p>
</div>
```

## Пользовательское форматирование

:::tip Поддержка с версии
:new: 8.10+
:::

Метод `$n` возвращает результат в виде строки с полностью отформатированным числом, которую можно использовать лишь целиком. В случаях, когда нужно стилизовать некоторую часть отформатированного числа (например, дробную часть), `$n` будет недостаточно. В таких случаях необходимо использовать функциональный компонент `<i18n-n>`.

При минимальном наборе свойств `<i18n-n>` генерирует тот же результат, что и `$n` обернутый в сконфигурированный DOM-элемент.

Шаблон:

```html
<div id="app">
  <i18n-n :value="100"></i18n-n>
  <i18n-n :value="100" format="currency"></i18n-n>
  <i18n-n :value="100" format="currency" locale="ru-RU"></i18n-n>
</div>
```

Результат:

```html
<div id="app">
  <span>100</span>
  <span>$100.00</span>
  <span>100,00 ₽</span>
</div>
```

Но по-настоящему оценить удобство компонента можно лишь тогда, когда он применяется с использованием [слотов с ограниченной областью видимости](https://ru.vuejs.org/v2/guide/components-slots.html#%D0%A1%D0%BB%D0%BE%D1%82%D1%8B-%D1%81-%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9-%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%D1%8E-%D0%B2%D0%B8%D0%B4%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8).

Допустим, есть требование выводить целую часть числа полужирным шрифтом. Реализовать это можно с помощью слота `integer`:

```html
<i18n-n :value="100" format="currency">
  <span v-slot:integer="slotProps" styles="font-weight: bold">
    {{ slotProps.integer }}
  </span>
</i18n-n>
```

Результат:

```html
<span>$<span styles="font-weight: bold">100</span>.00</span>
```

Можно использовать несколько слотов одновременно:

```html
<i18n-n :value="1234" :format="{ key: 'currency', currency: 'EUR' }">
  <span v-slot:currency="slotProps" styles="color: green">
    {{ slotProps.currency }}
  </span>
  <span v-slot:integer="slotProps" styles="font-weight: bold">
    {{ slotProps.integer }}
  </span>
  <span v-slot:group="slotProps" styles="font-weight: bold">
    {{ slotProps.group }}
  </span>
  <span v-slot:fraction="slotProps" styles="font-size: small">
    {{ slotProps.fraction }}
  </span>
</i18n-n>
```

(Полученный HTML ниже отформатирован для лучшей читаемости)

```html
<span>
  <span styles="color: green">€</span>
  <span styles="font-weight: bold">1</span>
  <span styles="font-weight: bold">,</span>
  <span styles="font-weight: bold">234</span>
  .
  <span styles="font-size: small">00</span>
</span>
```

Полный список поддерживаемых слотов, а также другие свойства `<i18n-n>` можно найти [на странице справочника API](../api/readme.md#i18n-n-functional-component).
