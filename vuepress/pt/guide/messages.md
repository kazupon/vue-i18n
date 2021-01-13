# Sintaxe mensagens locais

## Estrutura

Sintaxe local das mensagens:

```typescript
// Como definição do Flowtype, a sintaxe das mensagens de tradução é semelhante à anotação BNF
type LocaleMessages = { [key: Locale]: LocaleMessageObject }
type LocaleMessageObject = { [key: Path]: LocaleMessage }
type LocaleMessageArray = LocaleMessage[]
type MessageContext = {
  list: (index: number) => mixed,
  named: (key: string) => mixed
};
type MessageFunction = (ctx: MessageContext) => string;
type LocaleMessage = string | MessageFunction | LocaleMessageObject | LocaleMessageArray;
type Locale = string
type Path = string
```

Com base na sintaxe acima, você pode configurar a seguinte estrutura de mensagens locais:

```json
{
  // localização 'pt'
  "pt": {
    "key1": "esta é a mensagem 1", // uso comum
    "nested": {
      // aninhado
      "message1": "esta é a mensagem aninhada 1"
    },
    "errors": [
      // array
      "esta é a mensagem de código de erro 0",
      {
        // um objeto em array
        "internal1": "esta é uma mensagem de código de erro interno 1"
      },
      [
        // array em array
        "este é o erro de array aninhado 1"
      ]
    ]
  },
  // localização 'en'
  "en": {
    // ...
  }
}
```

Na estrutura de mensagens locais acima, você pode traduzir usando os caminhos-chave abaixo.

```html
<div id="app">
  <!-- uso comum -->
  <p>{{ $t('key1') }}</p>
  <!-- aninhado -->
  <p>{{ $t('nested.message1') }}</p>
  <!-- array -->
  <p>{{ $t('errors[0]') }}</p>
  <!-- um objeto em array -->
  <p>{{ $t('errors[1].internal1') }}</p>
  <!-- array em array -->
  <p>{{ $t('errors[2][0]') }}</p>
</div>
```

O resultado será o seguinte:

```html
<div id="app">
  <!-- uso comum -->
  <p>esta é a mensagem 1</p>
  <!-- aninhado -->
  <p>esta é a mensagem aninhada 1</p>
  <!-- array -->
  <p>esta é a mensagem de código de erro 0</p>
  <!-- um objeto em array -->
  <p>esta é uma mensagem de código de erro interno 1</p>
  <!-- array em array -->
  <p>este é o erro de array aninhado 1</p>
</div>
```

## Mensagens de localização relacionadas

Se houver uma chave de tradução que sempre terá o mesmo texto concreto igual outra, você pode simplesmente criar um link para essa. Para vincular a outra chave de tradução, tudo que você precisa fazer é prefixar seu conteúdo com um sinal `@:` seguido pelo nome completo da chave de tradução incluindo o namespace ao qual deseja vincular.

Mensagens de localização a seguir:

```js
const messages = {
  en: {
    message: {
      the_world: 'the world',
      dio: 'DIO:',
      linked: '@:message.dio @:message.the_world !!!!'
    }
  }
}
```

Template:

```html
<p>{{ $t('message.linked') }}</p>
```

O resultado será o seguinte:

```html
<p>DIO: the world !!!!</p>
```

### Formatando mensagens de localização relacionadas

Se o idioma distinguir casos de caracteres, você pode precisar controlar o caso das mensagens de localização relacionadas.
Mensagens relacionadas podem ser formatadas com o modificador `@.modifier:key`

Mensagens de localização a seguir:

- `upper`: Letras maiúsculas em todos os caracteres na mensagem vinculada.
- `lower`: Letras minúsculas em todos os caracteres na mensagem vinculada.
- `capitalize`: Primeiro caractere em maiúsculo da mensagem vinculada.

Mensagens de localização:

```js
const messages = {
  en: {
    message: {
      homeAddress: 'Home address',
      missingHomeAddress: 'Please provide @.lower:message.homeAddress'
    }
  },
  pt: {
    message: {
      homeAddress: 'Endereço residencial',
      missingHomeAddress: 'Por favor, providencie o @.lower:message.homeAddress'
    }
  }
}
```

```html
<label>{{ $t('message.homeAddress') }}</label>

<p class="error">{{ $t('message.missingHomeAddress') }}</p>
```

O resultado será o seguinte:

```html
<label>Endereço residencial</label>

<p class="error">Por favor, providencie o Endereço residencial</p>
```

Você pode adicionar modificadores ou sobrescrever os existentes passando as opções de `modificadores` para o construtor `VueI18n`.

```js
const i18n = new VueI18n({
  locale: 'pt',
  messages: {
    // ...
  },
  modifiers: {
    // Adicionando um novo modificador
    snakeCase: str => str.split(' ').join('-')
  },
})
```

### Agrupando com parêntese

Uma chave de tradução de uma mensagem também pode ser especificada com  `@:(message.foo.bar.baz)`, onde a referência a outra chave de tradução está entre parêntese `()`.

Isso pode ser necessário se um ponto `.` for exigido após um link para outra mensagem `@:message.something`, que de outra forma seria considerado parte do link.

Mensagens de localização:

```js
const messages = {
  en: {
    message: {
      dio: 'DIO',
      linked: "There's a reason, you lost, @:(message.dio)."
    }
  },
  pt: {
    message: {
      dio: 'DIO',
      linked: "Há uma razão pela qual você falhou, @:(message.dio)."
    }
  }
}
```

Template:

```html
<p>{{ $t('message.linked') }}</p>
```

O resultado será o seguinte:

```html
<p>Há uma razão pela qual você falhou, DIO.</p>
```

## Mensagem com função

vue-i18n recomenda o uso de strings para formatação de lista ou formatação nomeada como mensagem de localização ao traduzir as mensagens.

No entanto, existem situações em que, devido à sintaxe complexa da linguagem, todo o poder do JavaScript é necessário. Nesse caso, em vez de mensagens de string, você pode usar **uma mensagem com função**.

A função abaixo retorna uma saudação:

```js
const messages = {
  en: {
    greeting: (ctx) => 'Hello!'
  },
  pt: {
    greeting: (ctx) => 'Olá!'
  }
}
```

Usar a função da mensagem é fácil! Você só precisa especificar a chave usando `$t` ou `t`:

```html
<p>{{ $t('greeting') }}</p>
```

O resultado será o seguinte:

```html
<p>Olá!</p>
```

O resultado de retorno da função é usado para a mensagem.

### Formatação nomeada

vue-i18n suporta [formatação nomeada](./formatting.md#named-formatting) como um formato de mensagem baseado em string. vue-i18n interpola os valores dos parâmetros com `$t` ou `t`, e os retorna.

O mesmo pode ser feito com a função da mensagem usando o **contexto de mensagem**:

Aqui está o exemplo de saudação:

```js
const messages = {
  en: {
    greeting: (ctx) => `Hello, ${ctx.named('name')}!`
  },
  pt: {
    greeting: (ctx) => `Olá, ${ctx.named('name')}!`
  }
}
```

Template:

```html
<p>{{ $t('greeting', { name: 'DIO' }) }}</p>
```

O resultado será o seguinte:

```html
<p>Olá, DIO!</p>
```

O contexto da mensagem fornece acesso à função `named`. Você deve especificar a chave especificada para `$t` ou `t`, que resolverá com o valor necessário.

### Formatação de lista

O uso da formatação de lista é semelhante ao formatação nomeada descrito acima.

vue-i18n suporta [formatação de lista](./formatting.md#list-formatting) para mensagens de string. vue-i18n interpola os valores dos parâmetros com `$t` ou `t`, e os retorna.

O mesmo pode ser feito com a função da mensagem usando o **contexto de mensagem**:

Aqui está o exemplo de saudação:

```js
const messages = {
  en: {
    greeting: (ctx) => `Hello, ${ctx.list(0)}!`
  },
  pt: {
    greeting: (ctx) => `Olá, ${ctx.list(0)}!`
  }
}
```

Template:

```html
<p>{{ $t('greeting', ['DIO']) }}</p>
```

O resultado será o seguinte:

```html
<p>Olá, DIO!</p>
```

O contexto da mensagem fornece acesso à função `list`. Você deve especificar a chave especificada para `$t` ou `t`, que resolverá com o valor necessário.

### Limitação

Em uma função para mensagem, os seguintes recursos, que estão disponíveis em uma versão de string, não estarão disponíveis por meio do contexto da mensagem:

- Mensagens de localidade vinculadas
- Pluralização
