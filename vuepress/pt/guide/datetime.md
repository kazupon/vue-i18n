# Localização de datas

:::tip Suporta a versão
:new: 7.0+
:::

Você pode localizar datas de acordo com o formato apropriado.

Formato de exemplo para DateTime:

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

Como visto acima, é possível definir um formato de data nomeado (por exemplo, `short`, `long`, etc.) usando opções [ECMA-402 Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)

Depois disso, para poder usar este formato em mensagens de localização, você deve definir a opção `dateTimeFormats` no construtor na instância `VueI18n`:

```js
const i18n = new VueI18n({
  dateTimeFormats
})

new Vue({
  i18n
}).$mount('#app')
```

Template:

```html
<div id="app">
  <p>{{ $d(new Date(), 'short') }}</p>
  <p>{{ $d(new Date(), 'long', 'pt-BR') }}</p>
</div>
```

O resultado será o seguinte:

```html
<div id="app">
  <p>Jan 18, 2021</p>
  <p>domingo, 18 de janeiro de 2021 5:49 AM</p>
</div>
```
