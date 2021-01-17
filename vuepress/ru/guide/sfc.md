# Однофайловые компоненты

## Базовое использование

В компоненте Vue или приложении Vue с использованием однофайловых компонентов, можно управлять сообщениями локализации с помощью пользовательского блока `i18n`.

Код компонента из [примера использования с однофайловыми компонентами](https://github.com/kazupon/vue-i18n/tree/dev/examples/sfc):

```vue
<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ru": {
    "hello": "Привет мир!"
  }
}
</i18n>

<template>
  <div id="app">
    <label for="locale">Язык</label>
    <select v-model="locale">
      <option>en</option>
      <option>ru</option>
    </select>
    <p>Сообщение: {{ $t('hello') }}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    this.$i18n.locale = 'ru';
    return { locale: 'ru' }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
}
</script>
```

## Установка vue-i18n-loader

Требуется установить `vue-loader` и `vue-i18n-loader` чтобы использовать пользовательские блоки `<i18n>`. Скорее всего [vue-loader](https://github.com/vuejs/vue-loader) уже используется в проекте, если уже работаете с однофайловыми компонентами, но необходимо дополнительно установить [vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader):

```bash
npm i --save-dev @kazupon/vue-i18n-loader
```

## Webpack

Для Webpack требуется следующая конфигурация:

Для vue-loader v15 или более поздних версий:

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

Для vue-loader v14:

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
            // необходимо указать ключ `i18n` для загрузчика `vue-i18n-loader`
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

[Vue CLI 3.0](https://github.com/vuejs/vue-cli) скрывает конфигурацию Webpack, поэтому для добавления поддержки тегов `<i18n>` в однофайловых компонентах необходимо изменить существующую конфигурацию.

Для этого нужно создать файл `vue.config.js` в корне проекта и добавить в него следующее:

Для vue-loader v15 или более поздних версий:

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

Для vue-loader v14:

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

_Не забудьте установить [deepmerge](https://github.com/KyleAMathews/deepmerge)! (`npm i deepmerge -D` или `yarn add deepmerge -D`)_

Подробнее о возможностях изменения существующей конфигурации Webpack можно изучить [здесь](https://cli.vuejs.org/ru/guide/webpack.html).

## Laravel-Mix

Для Laravel-mix 4 с vue-loader v15 или более поздней версии:

```js
// Расширяем Mix с помощью метода "i18n", который загрузит vue-i18n-loader
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

// Убедитесь что вызвали .i18n() (для загрузки загрузчика) перед .js(..., ...)
mix.i18n()
   .js( 'resources/js/App.js', 'public/js/app.js' )
   ...
```

Для Laravel-mix 2 с vue-loader v14:

В Laravel-mix, начиная с версии [V2.1](https://github.com/JeffreyWay/laravel-mix/releases/tag/v2.1), можно добавлять пользовательские правила с помощью `mix.extend()`. Laravel-mix уже имеет собственные правила для обработки `.vue` файлов. Чтобы добавить `vue-i18n-loader`, нужно добавить в `webpack.mix.js` следующее:

```js
// Код ниже внедрит загрузчик i18n (@kazupon/vue-i18n-loader) в качестве загрузчика .vue файлов.
mix.extend( 'i18n', function( webpackConfig, ...args ) {
    webpackConfig.module.rules.forEach( ( module ) => {
        // Поиск компонента "vue-loader", который обрабатывает .vue файлы.
        if( module.loader !== 'vue-loader' ) {
            return;
        }

        // В этом модуле добавляем vue-i18n-loader для тега i18n.
        module.options.loaders.i18n = '@kazupon/vue-i18n-loader';
    } );
} );

// Убедитесь что вызвали .i18n() (для загрузки загрузчика) перед .js(..., ...)
mix.i18n()
   .js( 'resources/assets/js/App.js', 'public/js/app.js' )
   ...
```

## Загрузка YAML

Пользовательские блоки `i18n` можно указывать в формате `JSON` или `YAML` (используя функцию предварительного загрузчика `vue-loader`).

Пользовательский блок `i18n` в формате `YAML`:

```vue
<i18n>
  en:
    hello: "hello world!"
  ru:
    hello: "привет мир!"
</i18n>
```

Конфигурация Webpack:

Для vue-loader v15 или более поздних версий:

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

Для vue-loader v14:

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

## Несколько пользовательских блоков

Можно использовать сообщения локализации из нескольких пользовательских блоков `i18n`.

```vue
<i18n src="./common/locales.json"></i18n>
<i18n>
  {
    "en": {
      "hello": "hello world!"
    },
    "ru": {
      "hello": "Привет мир!"
    }
  }
</i18n>
```

В примере выше, первый пользовательский блок загружает общие сообщения локализации с помощью атрибута `src`, второй пользовательский блок загружает сообщения локализации, которые определены только в этом однофайловом компоненте. Все они будут объединены в качестве сообщений локализации компонента.

Несколько пользовательских блоков полезны, когда использовать их в качестве модулей.

## Локальные стили

При использовании `vue-i18n` с локальными стилями (`style scoped`) необходимо помнить и использовать [глубокий селектор](https://vue-loader.vuejs.org/ru/guide/scoped-css.html#%D0%BA%D0%BE%D1%80%D0%BD%D0%B5%D0%B2%D0%BE%D0%B9-%D1%8Dn%D0%B5%D0%BC%D0%B5%D0%BD%D1%82-%D0%B4%D0%BE%D1%87%D0%B5%D1%80%D0%BD%D0%B5%D0%B3%D0%BE-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0) для стилизации элемента __*внутри*__ строки перевода. Например:

__Когда перевод содержит только текст__ (работает без глубокого селектора)

```vue
<i18n>
  {
    "en": {
      "hello": "hello world!"
    },
    "ru": {
      "hello": "Привет мир!"
    }
  }
</i18n>

<template>
  <div class="parent">
    <p>Сообщение: {{ $t('hello') }}</p>
  </div>
</template>

<!-- Будет работать -->
<style scoped>
  .parent p {
    color: #42b883;
  }
</style>
```

__Когда перевод содержит HTML-элемент__ (необходимо использовать глубокий селектор)

```vue
<i18n>
  {
    "en": {
      "hello": "hello<span>world!</span>"
    },
    "ru": {
      "hello": "привет <span>мир!</span>"
    }
  }
</i18n>

<template>
  <div class="parent">
    <p v-html="$t('hello')"></p>
  </div>
</template>

<!-- НЕ БУДЕТ РАБОТАТЬ! -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p span {
    color: red;
  }
</style>

<!-- Будет работать >>> -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p >>> span {
    color: red;
  }
</style>

<!-- Будет работать /deep/ -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p /deep/ span {
    color: red;
  }
</style>

<!-- Будет работать ::v-deep -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  ::v-deep .parent p span {
    color: red;
  }
</style>
```

## Пользовательские блоки в функциональном компоненте

Если в шаблоне однофайловых компонентов используется функциональный компонент и определены пользовательские блоки `i18n`, то обратите внимание что невозможно локализовать с помощью сообщений локализации.

Например, следующий код не может использовать сообщения локализации из блока `i18n`.

```vue
<i18n>
  {
    "en": {
      "hello": "hello world"
    },
    "ru": {
      "hello": "привет мир"
    }
  }
</i18n>

<template functional>
  <!-- Сообщение локализации 'hello' из родительского экземпляра -->
  <p>{{ parent.$t('hello') }}</p>
</template>
```
