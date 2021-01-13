# Diretiva personalizada

:::tip Suporta a versão
:new: 7.3+
:::

As traduções podem ser feitas não apenas usando a diretiva `v-t` personalizada, mas também usando o método `$t`.

## Sintaxe de string

Você pode passar o keypath de mensagens da localização como uma string.

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'Hi there!' },
      pt: { hello: 'Olá!' }
    }
  }),
  data: { path: 'hello' }
}).$mount('#string-syntax')
```

Template:

```html
<div id="string-syntax">
  <!-- string literal -->
  <p v-t="'hello'"></p>
  <!-- ligação do keypath por meio dos dados -->
  <p v-t="path"></p>
</div>
```

O resultado será o seguinte:

```html
<div id="string-syntax">
  <p>Olá!</p>
  <p>Olá!</p>
</div>
```

## Sintaxe do objeto

Você pode usar a sintaxe do objeto.

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'Hi {name}!' },
      pt: { hello: 'Olá {name}！' }
    }
  }),
  computed: {
    nickName() {
      return 'kazupon'
    }
  },
  data: { path: 'hello' }
}).$mount('#object-syntax')
```

Template:

```html
<div id="object-syntax">
  <!-- literal -->
  <p v-t="{ path: 'hello', locale: 'pt', args: { name: 'kazupon' } }"></p>
  <!-- ligação do keypath por meio dos dados  -->
  <p v-t="{ path: path, args: { name: nickName } }"></p>
</div>
```

O resultado será o seguinte:

```html
<div id="object-syntax">
  <p>Olá kazupon！</p>
  <p>Hi kazupon!</p>
</div>
```

## Use com transições

:::tip Suporta a versão
:new: 8.7+
:::

Ao usar a diretiva `v-t` em um elemento dentro do componente [`<transition>`](https://br.vuejs.org/v2/api/index.html#transition), você pode ver como a mensagem traduzida desaparece durante a animação de transição. Este comportamento é devido à implementação do próprio componente `<transition>` - todas as diretivas no elemento que desaparece dentro do componente `<transition>` devem ser destruídas **antes do início da transição**. Esse comportamento pode resultar em oscilação do conteúdo em animações curtas, mas é mais perceptível em animações de transição longa.

Para preservar o conteúdo de uma diretiva durante uma animação de transição, você precisa adicionar [modificador `.preserve`](../api/#v-t) ao definir a diretiva `v-t`.

Javascript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'pt',
    messages: {
      pt: { preserve: 'com preservação' }
    }
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

Template:

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t.preserve="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

Também é possível definir globalmente a configuração `preserveDirectiveContent` na instância `VueI18n`, o que afetará todas as diretivas `v-t` sem adicionar um modificador.

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'pt',
    messages: {
      pt: { preserve: 'com preservação' }
    },
    preserveDirectiveContent: true
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

Template:

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

Você pode aprender mais sobre os exemplos acima [aqui] (https://github.com/kazupon/vue-i18n/tree/dev/examples/directive)

## `$t` ou `v-t`

### `$t`

`$t` é um método adicionado à instância Vue. Tem os seguintes prós e contras:

#### Prós

Você pode **flexivelmente** usar a sintaxe de chaves `{{}}` em templates e também props e métodos computados na instância Vue.

#### Contras

`$t` é executado **toda vez** quando ocorre uma nova renderização, então tem a sobrecarga de fazer a tradução.

### `v-t`

`v-t` é uma diretiva personalizada. Tem os seguintes prós e contras:

#### Prós

`v-t` tem **melhor desempenho** do que o método `$t` devido ao seu cache com a diretiva personalizada, quando traduzido uma vez. Além disso, a pré-tradução é possível com o módulo do compilador Vue que foi fornecido por [`vue-i18n-extensions`](https://github.com/kazupon/vue-i18n-extensions).

Portanto, é possível fazer **mais otimizações de desempenho**.

#### Contras

`v-t` não pode ser usado de forma tão flexível como `$t`, e isso adiciona **complexidade**. A tradução com `v-t` é inserida no `textContent` do elemento. Além disso, ao usar a renderização do lado do servidor, você precisa definir a [diretiva personalizada](https://github.com/kazupon/vue-i18n-extensions#directive-vt-custom-directive-for-server-side) por meio da opção `directives` da função `createRenderer`.
