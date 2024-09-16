# Localização de números

:::tip Suporta a versão
:new: 7.0+
:::

Você pode localizar números com seus formatos de definição.

Formato de exemplo para números:

```js
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'pt-BR': {
    currency: {
      style: 'currency',
      currency: 'BRL',
      currencyDisplay: 'symbol'
    }
  }
}
```

Conforme declarado acima, você pode especificar formatos numéricos (por exemplo, `currency` para moeda) usando opções [ECMA-402 Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

Depois disso, para poder usar este formato em mensagens de localização, você precisa definir a opção `numberFormats` do construtor na instância `VueI18n`:

```js
const i18n = new VueI18n({
  numberFormats
})

new Vue({
  i18n
}).$mount('#app')
```

Template:

```html
<div id="app">
  <p>{{ $n(100, 'currency') }}</p>
  <p>{{ $n(100, 'currency', 'pt-BR') }}</p>
</div>
```

O resultado será o seguinte:

```html
<div id="app">
  <p>$100.00</p>
  <p>100,00 ₽</p>
</div>
```

## Formatação personalizada

:::tip Suporta a versão
:new: 8.10+
:::

O método `$n` retorna o resultado como uma string numérica totalmente formatada que só pode ser usada em sua totalidade. Nos casos em que você precisa estilizar alguma parte de um número formatado (por exemplo, uma parte fracionária), `$n` não será suficiente. Nesses casos, é necessário usar o componente funcional `<i18n-n>` será útil.

Com um conjunto mínimo de propriedades, `<i18n-n>` gera o mesmo resultado que `$n` envolvido em um elemento DOM configurado.

Template:

```html
<div id="app">
  <i18n-n :value="100"></i18n-n>
  <i18n-n :value="100" format="currency"></i18n-n>
  <i18n-n :value="100" format="currency" locale="pt-BR"></i18n-n>
</div>
```

O resultado será o seguinte:

```html
<div id="app">
  <span>100</span>
  <span>$100.00</span>
  <span>R$ 100,00</span>
</div>
```

O verdadeiro poder deste componente entra em ação quando é usado com [slots com escopo](https://br.vuejs.org/v2/guide/components-slots.html#Slots-com-Escopo-Definido).

Digamos que haja um requisito para exibir a parte inteira de um número em negrito. Isso pode ser obtido especificando `integer` no elemento do slot com escopo:

```html
<i18n-n :value="100" format="currency">
  <span v-slot:integer="slotProps" styles="font-weight: bold">
    {{ slotProps.integer }}
  </span>
</i18n-n>
```

O resultado será o seguinte:

```html
<span>$<span styles="font-weight: bold">100</span>.00</span>
```

É possível especificar vários slots com escopo ao mesmo tempo:

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

(O HTML de resultado abaixo é formatado para melhor legibilidade)

```html
<span>
  <span styles="color: green">€</span>
  <span styles="font-weight: bold">1</span>
  <span styles="font-weight: bold">,</span>
  <span styles="font-weight: bold">234</span>
  <span styles="font-size: small">00</span>
</span>
```

Você pode especificar o tipo do elemento raiz usando o parâmetro de entrada `tag`. Se nenhum parâmetro de entrada for especificado, o padrão é `'span'`. Você também pode defini-lo com o valor booleano `false` para inserir os nós filhos diretamente sem criar um elemento raiz.

A lista completa dos slots de escopo suportados, bem como outras propriedades `<i18n-n>`, pode ser encontradas [na página da API](../api/readme.md#i18n-n-functional-component).
