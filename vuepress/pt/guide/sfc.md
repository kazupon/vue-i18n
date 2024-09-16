# Componentes de arquivo único

## Uso básico

Se você estiver construindo um componente ou aplicativo Vue usando componentes de arquivo único, você pode gerenciar as mensagens de localização usando um bloco `i18n` personalizado.

Código de componente com [exemplo de componentes de arquivo único](https://github.com/kazupon/vue-i18n/tree/dev/examples/sfc):

```vue
<i18n>
{
  "en": {
    "hello": "Hello World!"
  },
  "pt": {
    "hello": "Olá Mundo!"
  }
}
</i18n>

<template>
  <div id="app">
    <label for="locale">Idiomas</label>
    <select v-model="locale">
      <option>en</option>
      <option>pt</option>
    </select>
    <p>Mensagem: {{ $t('hello') }}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    this.$i18n.locale = 'pt';
    return { locale: 'pt' }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
}
</script>
```

## Instalação vue-i18n-loader

Você precisa instalar `vue-loader` e `vue-i18n-loader` devido ao uso de blocos personalizados `<i18n>`. Embora [vue-loader](https://github.com/vuejs/vue-loader) provavelmente já seja usado em seu projeto se você estiver trabalhando com componentes de arquivo único, mas você vai precisar instalar [vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader) adicionalmente:

```bash
npm i --save-dev @kazupon/vue-i18n-loader
```

## Webpack

O Webpack requer a seguinte configuração:

Para vue-loader v15 ou posterior:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      }
      // ...
    ]
  }
  // ...
}
```

Para vue-loader v14:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // você precisa especificar a chave do carregador `i18n` com o `vue-i18n-loader`
            // (https://github.com/kazupon/vue-i18n-loader)
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      }
      // ...
    ]
  }
  // ...
}
```

## Vue CLI 3.0

[Vue CLI 3.0](https://github.com/vuejs/vue-cli) ocultar a configuração do Webpack, portanto, para adicionar suporte para tags `<i18n>` em componentes de arquivo único, precisamos modificar a configuração existente.

Para fazer isso, temos que criar um `vue.config.js` na raiz do nosso projeto. Depois de fazer isso, devemos incluir o seguinte código:

Para vue-loader v15 ou posterior:

```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
        .loader('@kazupon/vue-i18n-loader')
        .end()
  }
}
```

Para vue-loader v14:

```js
const merge = require('deepmerge')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          loaders: {
            i18n: '@kazupon/vue-i18n-loader'
          }
        })
      )
  }
}
```

_Não se esqueça de instalar o [deepmerge](https://github.com/KyleAMathews/deepmerge)! (`npm i deepmerge -D` ou `yarn add deepmerge -D`)_

Você pode aprender mais sobre as possibilidades de modificar a configuração do Webpack existente [neste guia](https://cli.vuejs.org/guide/webpack.html).

## Laravel-Mix

Para Laravel-mix 4 com vue-loader v15 ou posterior:

```js
// Estenda o Mix usando o método "i18n", que carrega o vue-i18n-loader
mix.extend( 'i18n', new class {
        webpackRules() {
            return [
                {
                    resourceQuery: /blockType=i18n/,
                    type:          'javascript/auto',
                    loader:        '@kazupon/vue-i18n-loader',
                },
            ];
        }
    }(),
);

// Certifique-se de chamar .i18n() para carregar o loader antes do .js(..., ...)
mix.i18n()
   .js( 'resources/js/App.js', 'public/js/app.js' )
   ...
```

para Laravel-mix 2 com vue-loader v14:

No Laravel-mix, começando na versão [V2.1](https://github.com/JeffreyWay/laravel-mix/releases/tag/v2.1), você pode adicionar regras personalizadas usando `mix.extend()`. O Laravel-mix já possui suas próprias regras para lidar com arquivos `.vue`. Para adicionar `vue-i18n-loader`, no arquivo `webpack.mix.js` adicione o seguinte código:

```js
// O código a seguir injetará o i18n Kazupon/vue-18-loader como o loader de arquivos .vue
mix.extend( 'i18n', function( webpackConfig, ...args ) {
    webpackConfig.module.rules.forEach( ( module ) => {
        // Procure o componente "vue-loader", que processa os arquivos .vue
        if( module.loader !== 'vue-loader' ) {
            return;
        }

        // Neste módulo, adicione o vue-i18n-loader para a tag i18n.
        module.options.loaders.i18n = '@kazupon/vue-i18n-loader';
    } );
} );

// Certifique-se de chamar .i18n() para carregar o loader antes de .js(..., ...)
mix.i18n()
   .js( 'resources/assets/js/App.js', 'public/js/app.js' )
   ...
```

## Carregando YAML

Os blocos personalizados `i18n` podem ser especificados no formato `JSON` ou `YAML` usando o recurso de pré-carregador do `vue-loader`.

Os blocos personalizados `i18n` no formato `YAML`:

```vue
<i18n>
  en:
    hello: "Hello World!"
  pt:
    hello: "Olá Mundo!"
</i18n>
```

Configuração do Webpack:

Para vue-loader v15 ou posterior:

```js
// Vue CLI 3.0
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
        .loader('@kazupon/vue-i18n-loader')
        .end()
      .use('yaml')
        .loader('yaml-loader')
        .end()
  }
}
```

Para vue-loader v14:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preLoaders: {
            i18n: 'yaml-loader'
          },
          loaders: {
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      }
      // ...
    ]
  }
  // ...
}
```

## Vários blocos personalizados

Você pode usar mensagens de localização com vários blocos personalizados `i18n`.

```vue
<i18n src="./common/locales.json"></i18n>
<i18n>
  {
    "en": {
      "hello": "Hello World!"
    },
    "pt": {
      "hello": "Olá Mundo!"
    }
  }
</i18n>
```

No exemplo acima, o primeiro bloco personalizado carrega as mensagens de localização genérica usando o atributo `src`, o segundo bloco personalizado carrega as mensagens de localização que são definidas apenas neste componente de arquivo único. Todos eles serão mesclados com mensagens de localização de componentes.

Desta forma, vários blocos personalizados são úteis quando usados ​​como módulos.

## Estilos Locais

Ao usar `vue-i18n` com estilos locais `style scoped`, é importante lembrar de usar [deep selector](https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors) para estilizar o elemento __*dentro*__ da string de tradução.

Por exemplo:

__Quando a tradução contém apenas texto__ (funciona sem deep selector)

```vue
<i18n>
  {
    "en": {
      "hello": "Hello World!"
    },
    "pt": {
      "hello": "Olá Mundo!"
    }
  }
</i18n>

<template>
  <div class="parent">
    <p>Mensagem: {{ $t('hello') }}</p>
  </div>
</template>

<!-- Vai funcionar por exemplo -->
<style scoped>
  .parent p {
    color: #42b883;
  }
</style>
```

__Tradução que contém elemento HTML__ (deve usar deep selector)

```vue
<i18n>
  {
    "en": {
      "hello": "Hello <span>World!</span>"
    },
    "pt": {
      "hello": "Olá <span>Mundo!</span>"
    }
  }
</i18n>

<template>
  <div class="parent">
    <p v-html="$t('hello')"></p>
  </div>
</template>

<!-- Não vai funcionar por exemplo -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p span {
    color: red;
  }
</style>

<!-- Vai funcionar por exemplo >>> -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p >>> span {
    color: red;
  }
</style>

<!-- Vai funcionar por exemplo /deep/ -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p /deep/ span {
    color: red;
  }
</style>

<!-- Vai funcionar por exemplo ::v-deep -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  ::v-deep .parent p span {
    color: red;
  }
</style>
```

## Blocos personalizados em componente funcional

Se os componentes de arquivo único têm o template usando um componente funcional, e você definiu blocos personalizados `i18n`, observe que você não pode localizar usando mensagens de local.

Por exemplo, o código a seguir não pode usar mensagens de localização do bloco `i18n`.

```vue
<i18n>
  {
    "en": {
      "hello": "Hello World"
    },
    "pt": {
      "hello": "Olá Mundo"
    }
  }
</i18n>

<template functional>
  <!-- Mensagem de localização 'hello' na instância pai -->
  <p>{{ parent.$t('hello') }}</p>
</template>
```
