# Интерполяция компонента

## Базовое использование

:::tip Поддержка с версии
:new: 7.0+
:::

Иногда требуется перевести сообщения в которых есть HTML теги или компоненты. Например:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

Для такого сообщения, если хотим использовать `$t`, то, вероятно, попробуем достичь скомпоновав из следующих сообщений локализации:

```js
const messages = {
  en: {
    term1: "I Accept xxx's",
    term2: 'Terms of Service Agreement'
  }
}
```

И в итоге шаблон станет выглядеть так:

```html
<p>{{ $t('term1') }}<a href="/term">{{ $t('term2') }}</a></p>
```

Результат:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

Это выглядит очень громоздко, но если перенести тег `<a>` в сообщение локализации, то добавится вероятность XSS-уязвимости из-за применения `v-html="$t('term')"`.

Этого можно избежать воспользовавшись функциональным компонентом `i18n`. Например:

```html
<div id="app">
  <!-- ... -->
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

```js
const messages = {
  en: {
    tos: 'Term of Service',
    term: 'I accept xxx {0}.'
  },
  ru: {
    tos: 'Условия обслуживания',
    term: 'Я соглашаюсь с xxx {0}.'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

Результат:

```html
<div id="app">
  <!-- ... -->
  <label for="tos">
    I accept xxx <a href="/term" target="_blank">Term of Service</a>.
  </label>
  <!-- ... -->
</div>
```

Подробнее о примере можно изучить [здесь](https://github.com/kazupon/vue-i18n/tree/dev/examples/interpolation/places)

Потомки функционального компонента `i18n` интерполируют сообщения локализации по входному параметру `path`. В примере выше,

:::v-pre
`<a :href="url" target="_blank">{{ $t('tos') }}</a>`
:::

интерполируется с сообщением локализации `term`.

В примере выше интерполяция компонента использует **формат в виде списка**. Потомки функционального компонента `i18n` интерполируются по порядку их появления.

## Использование синтаксиса слотов

:::tip Поддержка с версии
:new: 8.14+
:::

Гораздо удобнее использовать синтаксис именованных слотов. Например:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <template v-slot:limit>
      <span>{{ changeLimit }}</span>
    </template>
    <template v-slot:action>
      <a :href="changeUrl">{{ $t('change') }}</a>
    </template>
  </i18n>
  <!-- ... -->
</div>
```

```js
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  i18n,
  data: {
    changeUrl: '/change',
    refundUrl: '/refund',
    changeLimit: 15,
    refundLimit: 30
  }
}).$mount('#app')
```

Результат:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/change">change your flight</a> until
    <span>15</span> minutes from departure.
  </p>
  <!-- ... -->
</div>
```

С версии Vue 2.6 можно использовать сокращённый синтаксис слотов в шаблонах:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <template #limit>
      <span>{{ changeLimit }}</span>
    </template>
    <template #action>
      <a :href="changeUrl">{{ $t('change') }}</a>
    </template>
  </i18n>
  <!-- ... -->
</div>
```

:::warning Ограничение
:warning: В компоненте `i18n` входные параметры слота не поддерживаются.
:::

## Использование синтаксиса places

:::danger Внимание!
В следующей мажорной версии входные параметры `place` и `places` будут объявлены устаревшими. Рекомендуем использовать синтаксис слотов.
:::

:::tip Поддержка с версии
:new: 7.2+
:::

:::warning Обратите внимание
:warning: В компоненте `i18n` содержимое, состоящее только из пробелов, будет опущено.
:::

Именованное форматирование поддерживается с помощью атрибута `place`. Например:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <span place="limit">{{ changeLimit }}</span>
    <a place="action" :href="changeUrl">{{ $t('change') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

```js
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    changeUrl: '/change',
    refundUrl: '/refund',
    changeLimit: 15,
    refundLimit: 30
  }
}).$mount('#app')
```

Результат:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/change">change your flight</a> until
    <span>15</span> minutes from departure.
  </p>
  <!-- ... -->
</div>
```

:::warning Обратите внимание
:warning: Для использования именованного форматирования все потомки компонента `i18n` должны иметь установленный атрибут `place`. В противном случае будет использовано форматирование списком.
:::

Если всё же необходимо интерполировать текстовое содержимое с помощью именованного форматирования, можно определить свойство `places` на компоненте `i18n`. Например:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p" :places="{ limit: refundLimit }">
    <a place="action" :href="refundUrl">{{ $t('refund') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

Результат:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/refund">refund your ticket</a> until 30 minutes from
    departure.
  </p>
  <!-- ... -->
</div>
```
