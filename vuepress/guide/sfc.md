# Single file components

## Basic Usage

If you are building Vue component or Vue application with using single file components, you can manage the locale messages `i18n` custom block.

The following in [single file components example](https://github.com/kazupon/vue-i18n/tree/dev/examples/sfc):

```js
<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界！"
  }
}
</i18n>

<template>
  <div id="app">
    <label for="locale">locale</label>
    <select v-model="locale">
      <option>en</option>
      <option>ja</option>
    </select>
    <p>message: {{ $t('hello') }}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () { return { locale: 'en' } },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
}
</script>
```

## Installing vue-i18n-loader

You need to install `vue-loader` and `vue-i18n-loader` due to use `<i18n>` custom blocks. While [vue-loader](https://github.com/vuejs/vue-loader) most likely is already used in your project if you are working with single file components, you must install [vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader) additionally:

```sh
npm i --save-dev @kazupon/vue-i18n-loader
```

## Webpack

For Webpack the configuration below is required:

for vue-loader v15:
```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        resourceQuery: /blockType=i18n/,
        loader: '@kazupon/vue-i18n-loader'
      }
      // ...
    ]
  },
  // ...
}
```

for vue-loader v14:
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
            // you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      },
      // ...
    ]
  },
  // ...
}
```

## Vue CLI 3.0

[Vue-cli 3.0](https://github.com/vuejs/vue-cli) hides the webpack configuration, so, if we want to add support to the `<i18n>` tag inside a single file component we need to modify the existing configuration.

In order to do that we have to create a `vue.config.js` at the root of our project. Once done that, we have to include the following:

for vue-loader v15:
```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .use("i18n")
        .loader("@kazupon/vue-i18n-loader")
        .end();
  }
}
```

for vue-loader v14:
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
_Don 't forget to install [deepmerge](https://github.com/KyleAMathews/deepmerge)! (`npm i deepmerge -D` or `yarn add deepmerge -D`)_

If you want to read more about modifying the existing configuration [click here](https://cli.vuejs.org/guide/webpack.html).

## Laravel-Mix

As of [V2.1](https://github.com/JeffreyWay/laravel-mix/releases/tag/v2.1) of Laravel-mix, you can add custom rules via mix.extend(). Laravel mix already has its own rules for handling .vue files. To add the `vue-i18n-loader`, add the following to `webpack.mix.js`

```js
// The below code will inject i18n Kazupon/vue-18-loader as a loader for .vue files.
mix.extend( 'i18n', function( webpackConfig, ...args ) {
    webpackConfig.module.rules.forEach( ( module ) => {
        // Search for the "vue-loader" component, which handles .vue files.
        if( module.loader !== 'vue-loader' ) {
            return;
        }

        // Within this module, add the vue-i18n-loader for the i18n tag.
        module.options.loaders.i18n = '@kazupon/vue-i18n-loader';
    } );
} );

// Make sure to call .i18n() before .js(..., ...)
mix.i18n()
   .js( 'resources/assets/js/App.js', 'public/js/app.js' )
   ...
```

## YAML loading

`i18n` custom blocks need to specify `JSON` format, also you can use `YAML` format by using pre-loader feature of `vue-loader`.

the `i18n` custom blocks below of `YAML` format:

```html
<i18n>
en:
  hello: "hello world!"
ja:
  hello: "こんにちは、世界！"
</i18n>
```


Webpack conf the below:

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
      },
      // ...
    ]
  },
  // ...
}
```

## Multiple custom blocks

you can be used the locale messages with multiple `i18n` custom block.

```html
<i18n src="./common/locales.json"></i18n>
<i18n>
  {
    "en": {
      "hello": "hello world!"
    },
    "ja": {
      "hello": "こんにちは、世界！"
    }
  }
</i18n>
```

In the above, first custom block load the common locale message with `src` attribute, second custom block load the locale message that defined only at single file component. These locale messages will be merged as locale message of component.

In this way, multiple custom blocks useful when want to be used as module.

## Scoped style

When using `vue-i18n` with `scoped style`, it's important to remember to use a [deep selector](https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements) for styling a nested translation. For example:

```html
...
<template>
  <div class="parent">
    <p>message: {{ $t('hello') }}</p>
  </div>
</template>
...
<!-- Won't work-->
<style scoped>
.parent p {
  color: #42b883;
}
</style>

<!-- Will work -->
<style>
.parent >>> p {
  color: #42b883;
}
</style>
```

## Custom blocks in functional component

If the single file components have the template using a functional component, and you had been defined `i18n` custom blocks, note you cannot localize using locale messages.

For example, the following code cannot localize with the locale message of `i18n` custom block.

```html
<i18n>
{
  "en": {
    "hello": "hello world"
  },
  "ja": {
    "hello": "こんにちは、世界"
  }
}
</i18n>

<template functional>
  <!-- 'hello' of locale messages of parent instance -->
  <p>{{ parent.$t('hello') }}</p>
</template>
```
