# Fallback Localização

*Resumo: Use `fallbackLocale: '<lang>'` para escolher qual idioma usar quando seu idioma preferido não tiver uma tradução.*

## Fallback implícito usando localidades

Se um `locale` é fornecido contendo um território e um dialeto opcional, o fallback implícito é ativado automaticamente.

Por exemplo, para `de-DE-bavarian` o seguinte será considerado como fallback:
1. `de-DE-bavarian`
2. `de-DE`
3. `de`

Para desativar a detecção automática de locais de fallback, especifique o caractere `!`, Por exemplo, `de-DE!`

## Fallback explícito com um local

Às vezes, alguns itens não são traduzidas para outros idiomas. Neste exemplo, o item `hello` está disponível no idioma inglês, mas não no português:

```js
const messages = {
  en: {
    hello: 'Hello, world!'
  },
  pt: {
    // Localização sem tradução para `hello`
  }
}
```

Se você deseja usar (digamos) mensagens de localização de `en`, quando a tradução não está na localização desejada, você deve defina a opção `fallbackLocale` ao inicializar a instância `VueI18n`:

```js
const i18n = new VueI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  messages
})
```

Template:

```html
<p>{{ $t('hello') }}</p>
```

O resultado será o seguinte:

```html
<p>Hello, world!</p>
```

Por padrão, se as mensagens de localização de fallback de `fallbackLocale` foram usadas, os avisos serão exibidos no console:

```
[vue-i18n] Value of key 'hello' is not a string!
[vue-i18n] Fall back to translate the keypath 'hello' with 'en' locale.
```

Para ocultar esses avisos (deixando aqueles em casos em que não há traduções para a chave fornecida), defina `silentFallbackWarn: true` ao inicializar a instância `VueI18n`.

## Fallback explícito com  um array de localidades

Você pode especificar mais de um local de fallback usando um array.

Por exemplo:

```js
fallbackLocale: ['pt', 'en'],
```

## Fallback explícito com mapas de decisão

Um algoritmo de tomada de decisão mais complexo para determinar o local de fallback pode ser implementado usando mapas de decisão com localidades em um fallback de acordo.

Por exemplo, usando o seguinte mapa de decisão

```js
fallbackLocale: {
  /* 1 */ 'de-CH':   ['fr', 'it'],
  /* 2 */ 'zh-Hant': ['zh-Hans'],
  /* 3 */ 'es-CL':   ['es-AR'],
  /* 4 */ 'es':      ['en-GB'],
  /* 5 */ 'pt':      ['es-AR'],
  /* 6 */ 'default': ['en', 'ru']
},
```

Resultará nas seguintes cadeias de fallback

| Local       | fallback escolha                          |
| ----------- | ----------------------------------------- |
| `'de-CH'`   | de-CH > fr > it > en > ru                 |
| `'de'`      | de > en > ru                              |
| `'zh-Hant'` | zh-Hant > zh-Hans > zh > en > ru          |
| `'es-SP'`   | es-SP > es > en-GB > en > ru              |
| `'es-SP!'`  | es-SP > en > ru                           |
| `'fr'`      | fr > en > ru                              |
| `'pt-BR'`   | pt-BR > pt > es-AR > es > en-GB > en > ru |
| `'es-CL'`   | es-CL > es-AR > es > en-GB > en > ru      |

## Fallback interpolação

* Resumo: Defina `formatFallbackMessages: true` para fazer a interpolação do modelo nas chaves de tradução quando seu idioma não tiver uma tradução para uma chave. *

Como as chaves para as traduções são strings, você pode usar uma mensagem legível pelo usuário como uma chave (para um idioma específico).

Por exemplo:

```js
const messages = {
  pt: {
    'Hello, world!': 'Olá Mundo!'
  }
}
```

Isso pode ser útil porque você não precisa especificar uma tradução para o "Hello, world!" na localização em inglês.

Na verdade, você pode até incluir parâmetros de modelo em uma chave. Junto com `formatFallbackMessages: true`, isso permite pular a escrita de modelos para o seu idioma base" e as chaves *são* seus modelos.

```js
const messages = {
  pt: {
    'Hello {name}': 'Olá {name}'
  }
}

const i18n = new VueI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  messages
})
```

Template:

```html
<p>{{ $t('Hello {name}', { name: 'John' }}) }}</p>
<p>{{ $t('The weather today is {condition}!', { condition: 'sunny' }) }}</p>
```

O resultado será o seguinte:

```html
<p>Olá, John</p>
<p>The weather today is sunny!</p>
```
