# Interpolação de componentes

## Exemplo básico

:::tip Suporta a versão
:new: 7.0+
:::

Às vezes, precisamos localizar uma mensagem de um localidade incluída em uma tag ou um componente HTML.

Por exemplo:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

Na mensagem acima, se quisermos usar `$t`, provavelmente tentaremos obtê-lo vinculando as seguintes mensagens de localização:

```js
const messages = {
  en: {
    term1: "I Accept xxx's",
    term2: 'Terms of Service Agreement'
  }
}
```

Como resultado o template terá a seguinte aparência:

```html
<p>{{ $t('term1') }}<a href="/term">{{ $t('term2') }}</a></p>
```

O resultado será o seguinte:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

Isso é muito complicado, e se você mover a tag `<a>` para a mensagem de localização, você adicionará a possibilidade de uma vulnerabilidade XSS devido ao uso de `v-html="$t('term')"`.

Isso pode ser evitado usando o componente funcional `i18n`.

Por exemplo:

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
  pt: {
    tos: 'Termos de serviço',
    term: 'Eu concordo xxx {0}.'
  }
}

const i18n = new VueI18n({
  locale: 'pt',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

O resultado será o seguinte:

```html
<div id="app">
  <!-- ... -->
  <label for="tos">
    Eu concordo xxx <a href="/term" target="_blank">Termos de serviço</a>.
  </label>
  <!-- ... -->
</div>
```

Mais detalhes sobre o exemplo acima, veja o [exemplo](https://github.com/kazupon/vue-i18n/tree/dev/examples/interpolation/places)

Descendentes do componente funcional `i18n` interpola mensagens de localização pelo caminho do parâmetro de `path`.

No exemplo acima:
:::v-pre
`<a :href="url" target="_blank">{{ $t('tos') }}</a>`
:::
interpolado com o `term` da mensagem de localização.

No exemplo acima, a interpolação de componentes usa **formatação de lista**. Os descendentes do componente da função `i18n` são interpolados na ordem em que aparecem.

Você pode especificar o tipo do elemento raiz usando o parâmetro de entrada `tag`. Se nenhum parâmetro de entrada for especificado, o padrão é `'span'`. Você também pode defini-lo com o valor booleano `false` para inserir os nós filhos diretamente sem criar um elemento raiz.

## Usando a sintaxe de slots

:::tip Suporta a versão
:new: 8.14+
:::

É mais conveniente usar a sintaxe de slots nomeados.

Por exemplo:

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

O resultado será o seguinte:

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

Desde o Vue 2.6, você pode usar a seguinte sintaxe de slots nos templates:

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

:::warning Limitação
:warning: Os parâmetros de entrada do slot não são suportados no componente `i18n`.
:::

## Usando a sintaxe de place

:::danger Atenção!
Na próxima versão principal, os parâmetros de entrada `place` e `places` serão descontinuados. Recomendamos usar a sintaxe de slot.
:::

:::tip Suporta a versão
:new: 7.2+
:::

:::warning Nota
:warning: No componente `i18n`, o conteúdo de texto consistindo apenas em espaços em branco será omitido.
:::

A formatação nomeada é suportada com a ajuda do atributo `place`.

Por exemplo:

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

O resultado será o seguinte:

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

:::warning Nota
:warning: Para usar formatação nomeada, todos os descendentes do componente `i18n` devem ter o atributo `place` definido. Caso contrário, a formatação de lista será usada.
:::

Se você ainda precisa interpolar o conteúdo do texto usando formatação nomeada, você pode definir a propriedade `places` no componente `i18n`.

Por exemplo:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p" :places="{ limit: refundLimit }">
    <a place="action" :href="refundUrl">{{ $t('refund') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

O resultado será o seguinte:

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
