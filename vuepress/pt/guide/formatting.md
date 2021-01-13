# Formatação

## Formatação nomeada

Mensagens de localização:

```js
const messages = {
  en: {
    message: {
      hello: '{msg} World'
    }
  },
  pt: {
    message: {
      hello: '{msg} Mundo'
    }
  }
}
```

Template:

```html
<p>{{ $t('message.hello', { msg: 'Olá' }) }}</p>
```

O resultado será o seguinte:

```html
<p>Olá Mundo</p>
```

## Formatação de lista

Mensagens de localização:

```js
const messages = {
  en: {
    message: {
      hello: '{0} World'
    }
  },
  pt: {
    message: {
      hello: '{0} Mundo'
    }
  }
}
```

Template:

```html
<p>{{ $t('message.hello', ['Olá']) }}</p>
```

O resultado será o seguinte:

```html
<p>Olá Mundo</p>
```

A formatação de lista também aceita objetos do tipo array:

```html
<p>{{ $t('message.hello', {'0': 'Olá'}) }}</p>
```

O resultado será o seguinte:

```html
<p>Olá Mundo</p>
```

## Formatação HTML

:::warning Nota
:warning: Localizar HTML arbitrário de forma dinâmica em um site é muito perigoso porque pode facilmente levar a vulnerabilidades de XSS. <br> Use a interpolação HTML apenas para conteúdo confiável, nunca para conteúdo personalizado.

Recomendamos usar os recursos de [interpolação de componente](interpolation.md) nesses casos.
:::

:::warning Nota

> :new: Adicionado na versão 8.11+

Você pode controlar o uso da formatação HTML. <br> Consulte para obter mais detalhes a [opção do construtor](../api/#opcoes-de-construtor) `warnHtmlInMessage` e as propriedades da API.
:::

Em alguns casos, você pode querer renderizar sua tradução como uma mensagem HTML e não como uma string estática.

```js
const messages = {
  en: {
    message: {
      hello: 'hello <br> World'
    }
  },
  pt: {
    message: {
      hello: 'Olá <br> Mundo'
    }
  }
}
```

Template:

```html
<p v-html="$t('message.hello')"></p>
```

Resultado (em vez da mensagem pré-formatada):

```html
<p>
  Olá
  <!-- <br> existe, mas é renderizado como html e não uma string -->
  Mundo
</p>
```

## Suporte formatação i18n Ruby on Rails

Mensagens de localização:

```js
const messages = {
  en: {
    message: {
      hello: '%{msg} World'
    }
  },
  pt: {
    message: {
      hello: '%{msg} Mundo'
    }
  }
}
```

Template:

```html
<p>{{ $t('message.hello', { msg: 'Olá' }) }}</p>
```

O resultado será o seguinte:

```html
<p>Olá Mundo</p>
```

## Formatação personalizada

Às vezes, você pode precisar traduzir usando uma formatação personalizada (por exemplo, [sintaxe de mensagem ICU](http://userguide.icu-project.org/formatparse/messages)).

Você pode fazer isso com um formatador personalizado que implementa a [Interface do formatador](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js#L145-L147).

Um exemplo do método de formatação personalizado com a sintaxe de classe ES2015:

```js
// Implementação do formatador personalizado
class CustomFormatter {
  constructor(options) {
    // ...
  }

  //
  // interpolate
  //
  // @param {string} message
  //   string de lista ou formato nomeado
  //   p. ex.
  //   - formato nomeado: 'Hi {name}'
  //   - formato de lista: 'Hi {0}'
  //
  // @param {Object | Array} values
  //   valores de interpolação `message`.
  //   valores transmitidos com `$t`, `$tc` e componente funcional `i18n`.
  //   p. ex.
  //   - $t('hello', { name: 'Lucas' }) -> valores passados: Object `{ name: 'Lucas' }`
  //   - $t('hello', ['Lucas']) -> valores passados: Array `['Lucas']`
  //   - componente funcional `i18n` (interpolação no componente)
  //     <i18n path="hello">
  //       <p>Lucas</p>
  //       <p>Tudo bem com você?</p>
  //     </i18n>
  //     -> valores passados: Array (included VNode):
  //        `[VNode{ tag: 'p', text: 'Lucas', ...}, VNode{ tag: 'p', text: 'Tudo bem com você?', ...}]`
  //
  // @return {Array<any>}
  //   valores interpolados. Eles são necessários para retornar o seguinte:
  //   - um array de strings ao usar `$t` ou `$tc`.
  //   - um array incluindo o objeto VNode, ao usar `i18n` em um componente funcional.
  //
  interpolate(message, values) {
    // implemente a lógica de interpolação aqui
    // ...

    // retorna o array interpolado
    return ['resolved message string']
  }
}

// Registre com a opção `formatter`
const i18n = new VueI18n({
  locale: 'en-US',
  formatter: new CustomFormatter(/* aqui as opções do construtor */),
  messages: {
    'en-US': {
      // ...
    },
    'pt-BR': {
      // ...
    }
    // ...
  }
})

// Iniciando o aplicativo!
new Vue({ i18n }).$mount('#app')
```

Você também pode verificar [o exemplo oficial do formatador personalizado](https://github.com/kazupon/vue-i18n/tree/dev/examples/formatting/custom).
