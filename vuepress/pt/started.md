# Iniciando

:::tip NOTA
Neste guia usamos [ES2015](https://github.com/lukehoban/es6features) nos exemplos de código.
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
// Se você usa um sistema de módulos (p. ex. via vue-cli)
// Importe o Vue e VueI18n assim utilize-o Vue.use(VueI18n).
//
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
//
// Vue.use(VueI18n)

// Mensagens traduzidas de suas localidades
const messages = {
  en: {
    message: {
      hello: 'Hello World'
    }
  },
  pt: {
    message: {
      hello: 'Olá Mundo'
    }
  }
}

// Crie uma instância do VueI18n com opções
const i18n = new VueI18n({
  locale: 'pt', // Defina uma localidade
  messages, // Defina as mensagens
})


// Crie uma instância Vue com a opção `i18n`
new Vue({ i18n }).$mount('#app')

// Pronto agora o aplicativo foi iniciado!
```

O resultado será o seguinte:

```html
<div id="#app">
  <p>Olá Mundo</p>
</div>
```
