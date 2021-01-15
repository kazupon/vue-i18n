---
sidebar: auto
---

# API Referência

## Estendendo o protótipo Vue

### Opções do construtor Vue

#### i18n

* **Tipo:** `I18nOptions`

Opção de localização baseada em componentes.

* **Veja também:** Opções do construtor `VueI18n`

### Métodos injetados no Vue

#### $t

* **Argumentos:**

  * `{Path} key`: obrigatório
  * `{Locale} locale`: opcional
  * `{Array | Object} values`: opcional

* **Retorno:** `TranslateResult`

Obtendo uma mensagem traduzida usando a chave `key`. As mensagens de localização em um componente têm precedência sobre as mensagens globais. Se não houver mensagens de localização no componente, a localização será executada usando as mensagens de localização globais. Se `locale` for especificado, as mensagens de localização do `locale` serão usadas. Se `key` foi especificada para a lista / formato nomeado das mensagens de localização, então os `values` também devem ser especificados. Você pode aprender mais sobre `values` na seção [Formato das mensagens de localização](../guia/formatting.md).

:::danger Dica
Observe que você precisa garantir este contexto igual à instância do componente nos métodos em seu ciclo de vida (por exemplo, nas opções de `data`,` const $t = this.$t.bind(this) `).
:::

#### $tc

* **Argumentos:**

  * `{Path} key`: obrigatório
  * `{number} choice`: opcional, padrão `1`
  * `{Locale} locale`: opcional
  * `{string | Array | Object} values`: opcional

* **Retorno:** `TranslateResult`

Obtendo uma mensagem traduzida usando a `key` com pluralização. As mensagens de localização de componentes têm precedência sobre as mensagens globais. Se não houver mensagens de localização no componente, a localização será executada usando mensagens de localização globais. Se `locale` for especificado, as mensagens de localização de `locale` serão usadas. Se um valor de texto for especificado para `value`, a localização será realizada para esse valor. Se for um Array ou Object especificado em `value`, então deve ser especificado com `value` de $t.

Se a implementação de pluralização padrão não for adequada para você, consulte [regras de pluralização nas opções do construtor](#pluralizationrules) e [pluralização customizada](../guide/pluralization.md).

:::danger Dica
Observe que você precisa garantir este contexto igual à instância do componente nos métodos em seu ciclo de vida (por exemplo, nas opções de `data`, `const $tc = this.$tc.bind(this)`).
:::

#### $te

* **Argumentos:**

  * `{Path} key`: obrigatório
  * `{Locale} locale`: opcional

* **Retorno:** `boolean`

Verifica se existe uma tradução para uma chave nas mensagens de localização. Se não houver mensagens de localização no componente, ele verifica as mensagens de localização globais. Se `locale` for especificado, então a presença de `locale` nas mensagens é verificada.

:::danger Dica
Observe que você precisa garantir este contexto igual à instância do componente nos métodos em seu ciclo de vida (por exemplo, nas opções de `data`, `const $te = this.$te.bind(this)`).
:::

#### $d

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{number | Date} value`: obrigatório
  * `{Path | Object} key`: opcional
  * `{Locale | Object} locale`: opcional

* **Retorno:** `DateTimeFormatResult`

Localização da data e hora de `value` com o formato de data e hora de `key`. O formato de data e hora da `key` precisa ser registrado na opção `dateTimeFormats` da classe `VueI18n`, e depende da opção `locale` do construtor `VueI18n`. Se você especificar o argumento `locale`, ele terá prioridade sobre a opção `locale` do construtor `VueI18n`.

Se o formato de data para `key` não estiver na opção `dateTimeFormats`, então um formato de fallback será usado com base na opção `fallbackLocale` do construtor `VueI18n`.

:::danger Dica
Observe que você precisa garantir este contexto igual à instância do componente nos métodos em seu ciclo de vida (por exemplo, nas opções de `data`, `const $d = this.$d.bind(this)`).
:::

#### $n

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{number} value`: obrigatório
  * `{Path | Object} format`: opcional
  * `{Locale} locale`: opcional

* **Retorno:** `NumberFormatResult`

Localização do número `value` usando o formato de número `format`. O formato de número de `format` deve ser registrado na opção `numberFormats` da classe `VueI18n`, e depende da opção `locale` do construtor `VueI18n`. Especificar o argumento `locale` sobrescreve a opção `locale` do construtor `VueI18n`.

Se o formato de número para `format` não for especificado na opção `numberFormats`, um formato de fallback será usado com base na opção `fallbackLocale` do construtor `VueI18n`.

Se o segundo argumento para `format` for especificado por um objeto, ele deverá conter as seguintes propriedades:

* `key {Path}`: opcional, número formatado
* `locale {Locale}`: opcional, localização
* `compactDisplay {string}`: opcional, opção de formatação do número
* `currency {string}`: opcional, opção de formatação do número
* `currencyDisplay {string}`: opcional, opção de formatação do número
* `currencySign {string}`: opcional, opção de formatação do número
* `localeMatcher {string}`: opcional, opção de formatação do número
* `notation {string}`: opcional, opção de formatação do número
* `numberingSystem {string}`: opcional, opção de formatação do número
* `signDisplay {string}`: opcional, opção de formatação do número
* `style {string}`: opcional, opção de formatação do número
* `unit {string}`: opcional, opção de formatação do número
* `unitDisplay {string}`: opcional, opção de formatação do número
* `useGrouping {string}`: opcional, opção de formatação do número
* `minimumIntegerDigits {string}`: opcional, opção de formatação do número
* `minimumFractionDigits {string}`: opcional, opção de formatação do número
* `maximumFractionDigits {string}`: opcional, opção de formatação do número
* `minimumSignificantDigits {string}`: opcional, opção de formatação do número
* `maximumSignificantDigits {string}`: opcional, opção de formatação do número

Qualquer opções de formatação de número especificadas terão precedência sobre os valores `numberFormats` do construtor `VueI18n`.

:::danger Dica
Observe que você precisa garantir este contexto igual à instância do componente nos métodos em seu ciclo de vida (por exemplo, nas opções de `data`, `const $n = this.$n.bind(this)`).
:::

### Propriedades injetadas

#### $i18n

* **Tipo:** `I18n`

* **Somente leitura**

Obter uma instância de `VueI18n`, se definido.

Se você especificou uma opção `i18n` nas opções do componente, você será capaz de obter uma instância` VueI18n` no componente, caso contrário, você poderá obter a instância raiz `VueI18n`.

## A classe `VueI18n`

A classe `VueI18n` implementa a interface `I18n` de [definições de tipo de fluxo](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

### Propriedades estáticas

#### version

* **Tipo:** `string`

Versão `vue-i18n`.

#### availabilities

> :new: Adicionado na versão 7.0+

* **Tipo:** `IntlAvailability`

Verificar a disponibilidade dos seguintes recursos de internacionalização:

* `{boolean} dateTimeFormat`: formatação de data sensível à localidade

* `{boolean} numberFormat`: formatação de número sensível à localidade

Os recursos de internacionalização acima dependem do [ambiente do navegador](http://kangax.github.io/compat-table/esintl/), que implementa a API de internacionalização ECMAScript (ECMA-402).

### Opções de construtor

É possível especificar algumas das opções do construtor `I18nOptions` com base em [definições de tipo de fluxo](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### locale

* **Tipo:** `Locale`

* **Padrão:** `'en-US'`

O local usado para localização. Se uma localidade contém território e dialeto, esta localidade contém um fallback implícito.

#### fallbackLocale

* **Tipo:** `FallbackLocale`

* **Padrão:** `false`

Localidade reserva para localização. Para obter mais detalhes e definições de fallback mais complexos, consulte a seção [fallback](../guide/fallback.md).

#### messages

* **Tipo:** `LocaleMessages`

* **Padrão:** `{}`

Mensagens de localização para o local.

#### dateTimeFormats

> :new: Adicionado na versão 7.0+

* **Tipo:** `DateTimeFormats`

* **Padrão:** `{}`

Formatos de data para localização.

* **Veja também:** `DateTimeFormats` tipo de [definições de flowtype](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### numberFormats

> :new: Adicionado na versão 7.0+

* **Tipo:** `NumberFormats`

* **Padrão:** `{}`

Formatos de número para localização.

* **Veja também:** `NumberFormats` tipo de [definições de flowtype](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### availableLocales

> :new: Adicionado na versão 8.9.0+

* **Tipo:** `Locale[]`

* **Padrão:** `[]`

* **Exemplos:** `["en", "ru"]`

Lista de localidades disponíveis em `messages` em ordem lexical.

#### formatter

* **Tipo:** `Formatter`

* **Padrão:** Formatador integrado

Um método de formatação que implementa a interface `Formatter`.

#### modifiers

> :new: Adicionado na versão 8.15.0+

* **Tipo:** `Modifiers`

* **Padrão:** modificadores `lower` e `upper`

Funções modificadoras para mensagens relacionadas

#### missing

* **Tipo:** `MissingHandler`

* **Padrão:** `null`

Manipulador para mensagens de localização ausentes. O manipulador será chamado com `locale`, a `key` da mensagem de localização e os `values`.

Se este manipulador for especificado e for feita uma tentativa de acessar a mensagem de localização ausente, não haverá nenhum aviso no console.

#### fallbackRoot

* **Tipo:** `Boolean`

* **Padrão:** `true`

Ao usar a localização em componentes, determina se deve consultar a localização de nível raiz (global) quando no caso da localização falhar.

Se definido como `false`, um aviso será lançado e uma chave retornada.

#### sync

* **Tipo:** `Boolean`

* **Padrão:** `true`

Se sincroniza a localidade de nível raiz com a localidade de localização do componente.

Se o valor for `false`, independentemente da localidade definida no nível raiz, a localidade definida no componente será usada.

#### silentTranslationWarn

> 6.1+, :up: 8.13

* **Tipo:** `Boolean | RegExp`

* **Padrão:** `false`

Desativa os avisos exibidos quando a localização falha.

Se verdadeiro, desativa os avisos de erro de localização. Se você usar uma expressão regular, você pode desligar os avisos de erro que correspondem à `key` (por exemplo, `$t`).

#### silentFallbackWarn

> :new: Adicionado na versão 8.8+, :up: 8.13

* **Tipo:** `Boolean | RegExp`

* **Padrão:** `false`

Desative os avisos ao retornar para fallback de `fallbackLocale` ou `root`.

Se `true`, os avisos serão gerados apenas quando nenhuma tradução estiver disponível, e não para os casos de fallbacks.
Se você usar uma expressão regular, poderá suprimir os avisos de fallback que correspondem à `chave` (por exemplo, `$t`).

#### pluralizationRules

> 8.5+

  * **Tipo:** `PluralizationRules`

  * **Padrão:** `{}`

  Um conjunto de regras para pluralização de palavras no seguinte formato:
  ```js
    {
      // Chave - a localidade para a qual a regra será aplicada.
      // Valor - uma função para obter o índice da opção de pluralização a partir do número atual e o número especificado de opções. (Veja a função getChoiceIndex)
      'pt': function(choice, choiceIndex) => Number/* índice da palavra em plural */;
      'ru': function(choice, choiceIndex) => Number/* índice da palavra em plural */;
      'en': function(choice, choiceIndex) => Number/* índice da palavra em plural */;
      'jp': function(choice, choiceIndex) => Number/* índice da palavra em plural */;
    }
  ```

#### preserveDirectiveContent

> Adicionado na versão 8.7+

* **Tipo:** `Boolean`

* **Padrão:** `false`

Determina se o elemento da diretiva `v-t` deve reter o `textContent` após a diretiva ser removida do elemento.

#### warnHtmlInMessage

> Adicionado na versão 8.11+

* **Tipo:** `WarnHtmlInMessageLevel`

* **Padrão:** `off`

Permitir ou não o uso de formatação HTML em mensagens de localização. Veja também a propriedade `warnHtmlInMessage`.

:::danger Atenção!
A partir da próxima versão principal, o valor padrão `warnHtmlInMessage` será `warn`.
:::

#### sharedMessages

> Adicionado na versão 8.12+

* **Tipo:** `LocaleMessages`

* **Padrão:** `undefined`

Mensagens de localização comuns quando localizadas em componentes. Ver [localização baseada em componentes](../guide/component.md#shared-locale-messages-for-components) para mais detalhes.

#### postTranslation

> Adicionado na versão 8.16+

* **Tipo:** `PostTranslationHandler`

* **Padrão:** `null`

Um manipulador para pós-processamento da tradução. Executado após chamar `$t`, `t`, `$tc` e `tc`.

Pode ser útil se você precisar processar adicionalmente o texto final da tradução, por exemplo, para eliminar os espaços e cortes de espaçamento.

#### componentInstanceCreatedListener

> Adicionado na versão 8.18+

* **Tipo:** `ComponentInstanceCreatedListener`

* **Padrão:** `null`

Um manipulador para receber uma notificação sobre a criação de uma instância local de um componente. O manipulador é chamado com instâncias VueI18n novas e antigas (raiz).

Este manipulador é útil ao estender a instância raiz do VueI18n e se deseja aplicar também essas extensões à instância local do componente.

#### escapeParameterHtml

> Adicionado na versão 8.22+

  * **Tipo:** `Boolean`

  * **Padrão:** `false`

Se `escapeParameterHtml` for definido como `true`, os parâmetros de interpolação serão escapados antes que a mensagem seja traduzida. Isso é útil quando o resultado da tradução é usado em `v-html` e o texto a ser traduzido contém marcação HTML (por exemplo, `<b>` em torno de um valor fornecido pelo usuário). Este padrão destina-se principalmente a casos em que `strings` de texto pré-compiladas para componentes de IU.

O processo de escape envolve a substituição dos seguintes símbolos por suas respectivas entidades de caracteres HTML: `<`, `>`, `"`, `'`.

Definir `escapeParameterHtml` como `true` não deve quebrar a funcionalidade existente, mas fornecerá proteção contra vetores de ataque XSS.

### Propriedades

#### locale

* **Tipo:** `Locale`

* **Leitura/Escrita**

O local usado para localização. Se uma localidade contém um território e um dialeto, essa localidade contém um fallback implícito.

#### fallbackLocale

* **Tipo:** `FallbackLocale`

* **Leitura/Escrita**

O local usado para localização de fallback. Para obter mais definições de fallback, consulte a seção [fallback](../ guide/fallback.md).

#### messages

* **Tipo:** `LocaleMessages`

* **Somente leitura**

As mensagens de localização usadas para a localização da tradução.

#### dateTimeFormats

> :new: Adicionado na versão 7.0+

* **Tipo:** `DateTimeFormats`

* **Somente leitura**

Formatação de data para localização.

#### numberFormats

> :new: Adicionado na versão 7.0+

* **Tipo:** `NumberFormats`

* **Somente leitura**

Os formatos para formatação de números da localização.

#### missing

* **Tipo:** `MissingHandler`

* **Leitura/Escrita**

Manipulador para chaves de localização ausentes.

#### formatter

* **Tipo:** `Formatter`

* **Leitura/Escrita**

Um método de formatação que implementa a interface `Formatter`.

#### silentTranslationWarn

> 6.1+, :up: 8.13

* **Tipo:** `Boolean | RegExp`

* **Leitura/Escrita**

Desative os avisos exibidos em erros de localização.

#### silentFallbackWarn

> :new: Adicionado na versão 8.8+, :up: 8.13

* **Tipo:** `Boolean | RegExp`

* **Leitura/Escrita**

Desative os avisos de fallback quando a localização falha.

#### pluralizationRules

> 8.5+

* **Tipo:** `PluralizationRules`

* **Leitura/Escrita**

Um conjunto de regras de pluralização dependentes da localidade.

#### preserveDirectiveContent

> Adicionado na versão 8.7+

* **Tipo:** `Boolean`

* **Leitura/Escrita**

Se o elemento da diretiva `v-t` deve preservar o `textContent` após a diretiva ser removida do elemento.

#### warnHtmlInMessage

> Adicionado na versão 8.11+

* **Tipo:** `WarnHtmlInMessageLevel`

* **Leitura/Escrita**

Permitir ou não o uso de formatação HTML em mensagens de localização.


Se você definir `warn` ou `error`, irá verificar as mensagens de localidade na instância VueI18n.

Se você definir `warn` um aviso será gerado no console.

Se você definir `error` gera o erro.

O valor padrão na instância VueI18n é definido como `off`.

#### postTranslation

> Adicionado na versão 8.16+

* **Tipo:** `PostTranslationHandler`

* **Leitura/Escrita**

Um manipulador para o pós-processamento da tradução.

### Métodos

#### getChoiceIndex

* **Argumentos:**

  * `{number} choice`
  * `{number} choicesLength`

* **Retorno:** `finalChoice {number}`

Obter um índice para pluralizar o número atual e o número de opções fornecido.
A implementação pode ser substituída pela mutação do protótipo:

```js
VueI18n.prototype.getChoiceIndex = /* implementação personalizada */
```

No entanto, na maioria dos casos, é suficiente passar a função desejada para a [opção do construtor pluralizationRules](#pluralizationrules).

#### getLocaleMessage( locale )

* **Argumentos:**

  * `{Locale} locale`

* **Retorno:** `LocaleMessageObject`

Obtendo a mensagem da localidade.

#### setLocaleMessage( locale, message )

* **Argumentos:**

  * `{Locale} locale`
  * `{LocaleMessageObject} message`

Defina a mensagem de localidade.

:::tip NOTA

> Adicionado na versão 8.11+

Se você definir `warn` ou `error` na propriedade `warnHtmlInMessage`, quando este método for executado, ele irá verificar se a formatação HTML é usada para mensagem local.
:::

#### mergeLocaleMessage( locale, message )

> 6.1+

* **Argumentos:**

  * `{Locale} locale`
  * `{LocaleMessageObject} message`

Mesclar as mensagens de localidade registradas com a mensagem de localidade.

:::tip NOTA

> Adicionado na versão 8.11+

Se você definir `warn` ou `error` na propriedade `warnHtmlInMessage`, quando este método for executado, ele irá verificar se a formatação HTML é usada para mensagem local.
:::

#### t( key, [locale], [values] )

* **Argumentos:**

  * `{Path} key`: obrigatório
  * `{Locale} locale`: opcional
  * `{Array | Object} values`: opcional

* **Retorno:** : `TranslateResult`

Semelhante à função retornada pelo método `$t`. Veja [$t](#t) para detalhes.

#### tc( key, [choice], [values] )

* **Argumentos:**

  * `{Path} key`: obrigatório
  * `{number} choice`: opcional, padrão `1`
  * `{string | Array | Object} values`: opcional

* **Retorno:** `TranslateResult`

Semelhante à função retornada pelo método `$tc`. Veja [$tc](#tc) para detalhes.

#### te( key, [locale] )

* **Argumentos:**

  * `{string} key`: obrigatório
  * `{Locale} locale`: opcional

* **Retorno:** `boolean`

Verifica se a chave especificada existe nas mensagens de localização global. Se você especificar `locale`, a verificação será feita nas mensagens de `locale`.

#### getDateTimeFormat ( locale )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{Locale} locale`

* **Retorno:** `DateTimeFormat`

Obtenha o formato de data e hora do local.

#### setDateTimeFormat ( locale, format )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{Locale} locale`
  * `{DateTimeFormat} format`

Configurando formatos de formatação de data para localização.

#### mergeDateTimeFormat ( locale, format )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{Locale} locale`
  * `{DateTimeFormat} format`

Mescle os formatos de data e hora registrados com o formato de data e hora do local.

#### d( value, [key], [locale] )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{number | Date} value`: obrigatório
  * `{Path | Object} key`: opcional
  * `{Locale | Object} locale`: opcional

* **Retorno:** `DateTimeFormatResult`

Semelhante à função retornada pelo método `$d`. Veja [$d](#d) para detalhes.

#### getNumberFormat ( locale )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{Locale} locale`

* **Retorno:** `NumberFormat`

Obtenha o formato de número da localidade.

#### setNumberFormat ( locale, format )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{Locale} locale`
  * `{NumberFormat} format`

Defina o formato de número do local.

#### mergeNumberFormat ( locale, format )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{Locale} locale`
  * `{NumberFormat} format`

Mescle os formatos de número registrados com o formato de número do local.

#### n( value, [format], [locale] )

> :new: Adicionado na versão 7.0+

* **Argumentos:**

  * `{number} value`: obrigatório
  * `{Path | Object} format`: opcional
  * `{Locale} locale`: opcional

* **Retorno:** `NumberFormatResult`

Semelhante à função retornada pelo método `$n`. Veja [$n](#n) para detalhes.

## Diretivas

> :new: Adicionado na versão 7.3+

### v-t

* **Aguarda:** `string | Object`

* **Modificadores:**

  * `.preserve`: (8.7.0+) preserva o `textContent` de um elemento quando a diretiva é desvinculada.

* **Detalhes:**

Atualizar o `textContent` de um elemento que foi traduzido usando mensagens de localização. Você pode usar string ou sintaxe de objeto. A sintaxe da string pode ser especificada como o caminho para a mensagem de localização. Ao usar a sintaxe de objeto, você deve especificar as seguintes propriedades:

  * `path`: obrigatório, chave da mensagem de localização
  * `locale`: opcional, localização
  * `args`: opcional, para lista ou formatação nomeada

:::tip NOTA
O elemento `textContent` será limpo por padrão quando a diretiva `v-t` for desassociada. Isso pode ser uma situação indesejável quando usado dentro de [transições](https://br.vuejs.org/v2/guide/transitions.html). Para preservar os dados `textContent` após a desvinculação da diretiva, use o modificador `.preserve` ou a opção global [ `preserveDirectiveContent`](#preserveirectivecontent).
:::

* **Exemplos:**

```html
<!-- sintaxe de string: literal -->
<p v-t="'foo.bar'"></p>

<!-- sintaxe de string: vinculação por meio de dados ou props computados -->
<p v-t="msg"></p>

<!-- sintaxe do objeto: literal -->
<p v-t="{ path: 'hi', locale: 'pt', args: { name: 'kazupon' } }"></p>

<!-- sintaxe do objeto: ligação por meio de dados ou props computados -->
<p v-t="{ path: greeting, args: { name: fullName } }"></p>

<!-- com o modificador de preservação -->
<p v-t.preserve="'foo.bar'"></p>
```

* **Veja também:** [Diretiva personalizada para localização](../guide/directive.md)

## Componentes

### Componente funcional i18n

> :new: Adicionado na versão 7.0+

#### Props:

* `path {Path}`: obrigatório, caminho-chave de mensagens de localização
* `locale {Locale}`: opcional, localização
* `tag {string | boolean | Object}`: opcional, padrão `'span'`
* `places {Array | Object}`: opcional (7.2+)

:::danger Atenção!
A partir da próxima versão principal, a opção `places` será removida. Use a sintaxe de slot.
:::

#### Usando:

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
    term: 'Eu concordo xxx {0}'.
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

#### Veja também:

[Componente de interpolação](../guide/interpolation.md)

### Componente funcional i18n-n

> :new: Adicionado na versão 8.10+

#### Props:

* `value {number}`: obrigatório, número para formatar
* `format {string | NumberFormatOptions}`: opcional, nome de formato de número ou objeto com opções de formato explícito
* `locale {Locale}`: opcional, localização
* `tag {string | boolean | Object}`: opcional, padrão `'span'`

#### Usando:

```html
<div id="app">
  <!-- ... -->
  <i18n-n :value="money" format="currency" tag="label">
    <span v-slot:currency="slotProps" class="font-weight: bold">
      {{ slotProps.currency }}
    <span>
  </i18n-n>
  <!-- ... -->
</div>
```

```js
var numberFormats = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'pt-BR': {
    currency: {
      style: 'currency',
      currency: 'BRL'
    }
  }
}

const i18n = new VueI18n({
  locale: 'en-US',
  numberFormats
})

new Vue({
  i18n,
  data: {
    money: 10234
  }
}).$mount('#app')
```

#### Slots com escopo

O componente funcional `<i18n-n>` pode aceitar vários slots com escopo nomeado. A lista de nomes de slots suportados é baseada nos [`Intl.NumberFormat.formatToParts() tipos de saída`] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/formatToParts):

* `currency`
* `decimal`
* `fraction`
* `group`
* `infinity`
* `integer`
* `literal`
* `minusSign`
* `nan`
* `plusSign`
* `percentSign`

Cada um desses slots com escopo nomeado aceitará três parâmetros de escopo:

* `[slotName] {FormattedNumberPartType}`: parâmetro com o mesmo nome do nome do slot real (como `integer`)
* `index {Number}`: índice da parte específica na matriz de partes numéricas
* `parts {Array}`: array de todas as partes numéricas formatadas

#### Veja também:

[Formatação personalizada de números](../guide/number.md#custom-formatting)

## Atributos especiais

### place

> :new: Adicionado na versão 7.2+

#### Aguarda: `{number | string}`

Usado ao interpolar um componente para especificar um índice para formatação de lista ou uma chave para formatação nomeada.

Mais sobre o uso na seção do link abaixo.

#### Veja também:

[Componente de interpolação](../guide/interpolation.md)
