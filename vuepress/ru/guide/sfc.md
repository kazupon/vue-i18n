# Однофайловые компоненты

## Базовое использование

При создании компонента Vue или приложения Vue с использованием однофайловых компонентов, можно управлять сообщениями локализации с помощью пользовательского блока `i18n`.

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

Необходимо установить `vue-loader` и `vue-i18n-loader` для использования пользовательских блоков `<i18n>`. Скорее всего [vue-loader](https://github.com/vuejs/vue-loader) уже используется в вашем проекте, если работаете с однофайловыми компонентами, но необходимо дополнительно установить [vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader):

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

[Vue CLI 3.0](https://github.com/vuejs/vue-cli) скрывает конфигурацию Webpack, поэтому при необходимости добавить поддержку тегов `<i18n>` внутри однофайловых компонентов, потребуется изменить существующую конфигурацию.

Для этого потребуется создать файл `vue.config.js` в корне проекта. После этого, необходимо добавить в него следующее:

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

Подробнее изучить возможности по изменению существующей конфигурации Webpack [можно здесь](https://cli.vuejs.org/ru/guide/webpack.html).

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

Начиная с версии [V2.1](https://github.com/JeffreyWay/laravel-mix/releases/tag/v2.1) Laravel-mix, можно добавлять пользовательские правила с помощью mix.extend(). Laravel mix уже имеет собственные правила для обработки .vue файлов. Чтобы добавить `vue-i18n-loader`, нужно добавить в `webpack.mix.js` следующее:

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

Пользовательские блоки `i18n` должны быть указаны в формате `JSON`, также можно использовать формат `YAML` используя функцию предварительного загрузчика `vue-loader`.

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

В примере выше, первый пользовательский блок загружает общие сообщения локализации с помощью атрибута `src`, второй пользовательский блок загружает сообщения локализации, которые определены только в этом однофайловом компоненте. Эти сообщения локализации будут объединены в качестве сообщения локализации компонента.

Таким образом, несколько пользовательских блоков полезны, когда хочется использовать их в качестве модуля.

## Локальные стили

При использовании `vue-i18n` с локальными стилями `style scoped` важно помнить об использовании [глубокого селектора](https://vue-loader.vuejs.org/ru/guide/scoped-css.html#%D0%BA%D0%BE%D1%80%D0%BD%D0%B5%D0%B2%D0%BE%D0%B9-%D1%8Dn%D0%B5%D0%BC%D0%B5%D0%BD%D1%82-%D0%B4%D0%BE%D1%87%D0%B5%D1%80%D0%BD%D0%B5%D0%B3%D0%BE-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0) для стилизации элемента **_внутри_** строки перевода. Например:

**Перевод содержит только текст** (работает без глубокого селектора)

```vue
...
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
...
<template>
  <div class="parent">
    <p>Сообщение: {{ $t('hello') }}</p>
  </div>
</template>
...
<!-- Будет работать -->
<style>
  .parent p {
    color: #42b883;
  }
</style>
```

**Перевод с HTML-элементом** (необходимо использовать глубокий селектор)

```vue
...
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
...
<template>
  <div class="parent">
    <p v-html="$t('hello')"></p>
  </div>
</template>
...
<!-- НЕ ЗАРАБОТАЕТ -->
<style>
  .parent p {
    color: #42b883;
  }

  .parent p span {
    color: red;
  }
</style>

<!-- Будет работать -->
<style>
  .parent p {
    color: #42b883;
  }

  .parent p >>> span {
    color: red;
  }
</style>
```

## Пользовательские блоки в функциональном компоненте

Если в шаблоне однофайловых компонентов используется функциональный компонент, и определены пользовательские блоки `i18n`, обратите внимание что вы не можете локализовать с помощью сообщения локализации.

Например, следующий код не может использовать локализацию с сообщениями локализации из пользовательского блока `i18n`.

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
