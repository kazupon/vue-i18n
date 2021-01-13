# Localização baseada em componentes

Em geral, as informações de localidade (por exemplo, `locale`, `messages`, etc) são definidas como opção de construtor na instância `VueI18n` e define a opção `i18n` como a instância raiz do Vue.

Portanto, você pode realizar traduções globalmente usando os métodos `$t` ou `$tc` na instância raiz do Vue e qualquer um dos componentes nela. Mas também é possível especificar dados para localização em cada componente separadamente, o que pode ser mais conveniente devido ao design orientado a componentes.

Um exemplo de localização baseada em componente:

```js
// Definir a localização para raiz na instância Vue
const i18n = new VueI18n({
  locale: 'pt',
  messages: {
    en: {
      message: {
        hello: 'Hello World',
        greeting: 'Good morning'
      }
    },
    pt: {
      message: {
        hello: 'Olá Mundo',
        greeting: 'Bom dia'
      }
    }
  }
})

// Definição no componente
const Component1 = {
  template: `
    <div class="container">
     <p>Component1 locale messages: {{ $t("message.hello") }}</p>
     <p>Fallback global locale messages: {{ $t("message.greeting") }}</p>
   </div>`,
  i18n: {
    // opção `i18n` definindo dados de localização para o componente
    messages: {
      en: { message: { hello: 'hello component1' } },
      pt: { message: { hello: 'olá componente1' } }
    }
  }
}

new Vue({
  i18n,
  components: {
    Component1
  }
}).$mount('#app')
```

Template:

```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

O resultado será o seguinte:

```html
<div id="app">
  <p>Olá Mundo</p>
  <div class="container">
    <p>Component1 locale messages: olá component1</p>
    <p>Fallback global locale messages: Bom dia</p>
  </div>
</div>
```

Como no exemplo acima, se o componente não tiver a mensagem de localidade, ele retornará às informações de localização definidas globalmente. O componente usa o idioma definido na instância raiz (no exemplo acima: `locale: 'ja'`).

Observe que, por padrão, ao acessar os dados de localização da raiz, avisos serão gerados no console:

```
[vue-i18n] Value of key 'message.greeting' is not a string!
[vue-i18n] Fall back to translate the keypath 'message.greeting' with root locale.
```

Para ocultar esses avisos (deixando aqueles que alertam sobre a falta completa de tradução para a chave fornecida), defina a opção `silentFallbackWarn: true` ao inicializar a instância do `VueI18n`.

Se você precisar traduzir com base na localidade do componente, pode fazê-lo usando as opções `sync: false` e `locale` na propriedade do `i18n`.

## Mensagens de localização comuns para componentes

Às vezes, você pode querer importar as mensagens de localidade compartilhadas para determinados componentes, não o fallback de mensagens na localidade global (por exemplo, mensagens comuns de determinado recurso para componentes.

Para fazer isso, você pode usar a opção `sharedMessages` na propriedade `i18n` do componente.

Um exemplo de uso de mensagens de localização comuns:

```js
export default {
  en: {
    buttons: {
      save: 'Save'
      // ...
    }
  },
  pt: {
    buttons: {
      save: 'Salvar'
      // ...
    }
  }
}
```

Componente:

```js
import commonMessage from './locales/common' // importação de mensagens da localidade em comum

export default {
  name: 'ServiceModal',
  template: `
    <div class="modal">
      <div class="body">
        <p>Este é um bom serviço</p>
      </div>
      <div class="footer">
        <button type="button">
          {{ $t('buttons.save') }}
        </button>
      </div>
    </div>
  `,
  i18n: {
    messages: { ... },
    sharedMessages: commonMessages
  }
}
```

Se as opções `sharedMessages` e `messages` forem especificadas, então suas mensagens serão mescladas em mensagens de localização na instância `VueI18n` deste componente.

## Localização em componentes funcionais

Ao usar um componente funcional, todos os dados (incluindo `props`, `children`, `slots`, `parent`, etc.) são passados ​​através do `context`, que contém todos esses atributos. Além disso, não é possível usar `this`, então ao usar vue-i18n com componentes funcionais, você deve se referir a `$t` como `parent.$t`, assim:

```html
...
<div>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src="" :alt="parent.$t('message.hello')" />
  </a>
</div>
...
```
