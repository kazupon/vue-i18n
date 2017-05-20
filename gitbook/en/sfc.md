# Single file component

If you are building Vue component or Vue application with using single file components, you can manage the locale messages `i18n` custom block.

The following in [single file component example](https://github.com/kazupon/vue-i18n/tree/dev/examples/sfc):

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

You need to use `vue-loader` due to use `i18n` custom blocks, and the Webpack configration below is required:

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
