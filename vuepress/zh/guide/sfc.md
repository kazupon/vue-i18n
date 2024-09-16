# 单文件组件

## 基本用法

如果使用单文件组件构建 Vue 组件或 Vue 应用程序，则可以管理 `i18n` 自定义块的语言环境信息。

以下是[单文件组件示例](https://github.com/kazupon/vue-i18n/tree/dev/examples/sfc):

```vue
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

## 安装 vue-i18n-loader

为了使用 `<i18n>` 自定义块，你需要安装 `vue-loader` 和 `vue-i18n-loader`。如果你使用了单文件组件，[vue-loader](https://github.com/vuejs/vue-loader) 很可能已在项目中使用了，那么 [vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader) 必须另外安装：

```sh
npm i --save-dev @kazupon/vue-i18n-loader
```

## Webpack

需要对 Webpack 进行以下配置：

对于 vue-loader v15 或更高版本：
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
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      }
      // ...
    ]
  },
  // ...
}
```

对于 vue-loader v14：
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
            // 你需要指定 `i18n` 的值为 `vue-i18n-loader`
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

[Vue CLI 3.0](https://github.com/vuejs/vue-cli) 隐藏了 webpack 配置，因此，如果我们想在单文件组件中添加对 `<i18n>` 标记的支持，我们需要修改现有配置。

为此，我们必须在项目的根目录下创建一个 `vue.config.js`。完成后，我们必须包括以下内容：

对于 vue-loader v15 或更高版本：
```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
        .loader("@kazupon/vue-i18n-loader")
        .end();
  }
}
```

对于 vue-loader v14：
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
_别忘了安装[deepmerge](https://github.com/KyleAMathews/deepmerge)! (`npm i deepmerge -D` 或 `yarn add deepmerge -D`)_

如果你想了解有关修改现有配置的更多信息[点击这里](https://cli.vuejs.org/guide/webpack.html)。

## Laravel-Mix

对于带有 vue-loader v15 或更高版本的 Laravel-mix 4：
```js
// 使用 “i18n” 方法扩展 Mix ，加载 vue-i18n-loader
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

// 确保在 `.js(..., ...)` 之前调用 `.i18n()` (来加载加载器)
mix.i18n()
   .js( 'resources/js/App.js', 'public/js/app.js' )
   ...
```

对于带有 vue-loader v14 的 Laravel-mix 2：

从 Laravel-mix 的 [V2.1](https://github.com/JeffreyWay/laravel-mix/releases/tag/v2.1) 开始，你可以通过 `mix.extend()` 添加自定义规则。Laravel mix 已经有了处理 .vue 文件的规则。要添加 `vue-i18n-loader`，请将以下内容添加到 `webpack.mix.js`：

```js
// 下面的代码将注入 i18n Kazupon/vue-18-loader 作为 .vue 文件的加载器。
mix.extend( 'i18n', function( webpackConfig, ...args ) {
    webpackConfig.module.rules.forEach( ( module ) => {
        // 搜索处理 .vue 文件的 “vue-loader” 组件。
        if( module.loader !== 'vue-loader' ) {
            return;
        }

        // 在此模块中，为 i18n 标记添加 vue-i18n-loader。
        module.options.loaders.i18n = '@kazupon/vue-i18n-loader';
    } );
} );

// 确保在 `.js(...，...)` 之前调用 `.i18n()`
mix.i18n()
   .js( 'resources/assets/js/App.js', 'public/js/app.js' )
   ...
```

## 加载 YAML

`i18n` 自定义块需要指定为 JSON 格式，你也可以通过使用 `vue-loader` 预加载器功能来使用 `YAML` 格式。

以下是 `YAML` 格式的 `i18n` 自定义块：

```vue
<i18n>
en:
  hello: "hello world!"
ja:
  hello: "こんにちは、世界！"
</i18n>
```


Webpack 配置如下：

对于 vue-loader v15 或更高版本：
```js
// Vue CLI 3.0
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
        .loader("@kazupon/vue-i18n-loader")
        .end()
      .use('yaml')
        .loader('yaml-loader')
        .end()
  }
}
```

对于 vue-loader v14：
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

## 多个自定义块

你可以使用具有多个 `i18n` 自定义块的语言环境信息。

```vue
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

如上所见，第一个自定义块使用 `src` 特性加载常用的语言环境信息，第二个自定义块加载仅在该单文件组件中定义的语言环境信息。这些语言环境信息将合并为组件的语言环境信息。

这样，多个自定义块在想要用作模块时非常有用。

## Scoped 风格

当使用带有 `scoped style` `vue-i18n` 时，重要的是要记住使用[深度选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#深度作用选择器) 来设置嵌套转换的样式。例如：

__翻译仅包含文本__（不使用深层选择器）

```vue
<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界"
  }
}
</i18n>

<template>
  <div class="parent">
    <p>message: {{ $t('hello') }}</p>
  </div>
</template>

<!-- 可行 -->
<style scoped>
  .parent p {
    color: #42b883;
  }
</style>
```

__使用 HTML 元素翻译__（必须使用深度选择器）

```vue
<i18n>
{
  "en": {
    "hello": "hello<span>world!</span>"
  },
  "ja": {
    "hello": "こんにちは、<span>世界！</span>"
  }
}
</i18n>

<template>
  <div class="parent">
    <p v-html="$t('hello')"></p>
  </div>
</template>

<!-- 不可行-->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p span {
    color: red;
  }
</style>

<!-- 可行 >>> -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p >>> span {
    color: red;
  }
</style>

<!-- 可行 /deep/ -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  .parent p /deep/ span {
    color: red;
  }
</style>

<!-- 可行 ::v-deep -->
<style scoped>
  .parent p {
    color: #42b883;
  }

  ::v-deep .parent p span {
    color: red;
  }
</style>
```

## 函数式组件中的自定义块

如果单个文件组件具有使用函数式组件的模板，并且你已经定义了 `i18n` 自定义块，请注意你无法使用语言环境信息进行本地化。

例如，以下代码无法使用 `i18n` 自定义块的语言环境信息进行本地化。

```vue
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
  <!-- 'hello' 的父实例的语言环境信息 -->
  <p>{{ parent.$t('hello') }}</p>
</template>
```
