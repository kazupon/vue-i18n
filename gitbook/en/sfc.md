# Single file components

## Basic Usage

If you are building Vue component or Vue application with using single file components, you can manage the locale messages `i18n` custom block.

The following in [single file components example](https://github.com/kazupon/vue-i18n/tree/dev/examples/sfc):

```html
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

```
$ npm i --save-dev @kazupon/vue-i18n-loader
```

## Webpack

For Webpack the configuration below is required:

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

## Vue CLI 3.0 (beta)

[Vue-cli 3.0](https://github.com/vuejs/vue-cli) hides the webpack configuration, so, if we want to add support to the `<i18n>` tag inside a single file component we need to modify the existing configuration.

In order to do that we have to create a `vue.config.js` at the root of our project. Once done that, we have to include the following:

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

_Don't forget to install [deepmerge](https://github.com/KyleAMathews/deepmerge)! (`npm i deepmerge -D` or `yarn add deepmerge -D`)_

If you want to read more about modifying the existing configuration [click here](https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md).

## Laravel-Mix

Laravel mix has its own rules for .vue files. To add the `vue-i18n-loader`, add the following to webpack.mix.js

```js
mix.webpackConfig({
    // ...
    module: {
        rules: [
            {
                // Rules are copied from laravel-mix@1.5.1 /src/builder/webpack-rules.js and manually merged with the ia8n-loader. Make sure to update the rules to the latest found in webpack-rules.js
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /bower_components/,
                options: {
                    // extractCSS: Config.extractVueStyles,
                    loaders: Config.extractVueStyles ? {
                        js: {
                            loader: 'babel-loader',
                            options: Config.babel()
                        },

                        scss: vueExtractPlugin.extract({
                            use: 'css-loader!sass-loader',
                            fallback: 'vue-style-loader'
                        }),

                        sass: vueExtractPlugin.extract({
                            use: 'css-loader!sass-loader?indentedSyntax',
                            fallback: 'vue-style-loader'
                        }),

                        css: vueExtractPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        }),

                        stylus: vueExtractPlugin.extract({
                            use: 'css-loader!stylus-loader?paths[]=node_modules',
                            fallback: 'vue-style-loader'
                        }),

                        less: vueExtractPlugin.extract({
                            use: 'css-loader!less-loader',
                            fallback: 'vue-style-loader'
                        }),

                        i18n: '@kazupon/vue-i18n-loader',
                    } : {
                        js: {
                            loader: 'babel-loader',
                            options: Config.babel()
                        },

                        i18n: '@kazupon/vue-i18n-loader',
                    },
                    postcss: Config.postCss,
                    preLoaders: Config.vue.preLoaders,
                    postLoaders: Config.vue.postLoaders,
                    esModule: Config.vue.esModule
                }
            },
            // ...
        ]
    },
    // ...
});
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
<i18n src='./common/locales.json'></i18n>
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

In the above, first custom block load the common locale message with `src` attribute, second custom block load the locale messge that defined only at single file component. These locale messages will be merged as locale message of component.

In this way, multiple custom blocks useful when want to be used as module.
