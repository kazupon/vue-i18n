# 工具

为了支持开发，我们官方提供了一些工具。

此外，还有第三方供应商提供的集成了 Vue I18n 的工具。

## 官方工具

### Vue Cli 插件

[vue-cli-plugin-i18n](https://github.com/kazupon/vue-cli-plugin-i18n) 是官方提供的 Vue Cli 插件。

使用此插件，您可以为Vue应用程序设置 i18n 环境，并支持 i18n 开发环境。

### Webpack Loader

[vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader) 是官方提供的 Webpack Loader。
使用此加载程序，您可以在单个文件组件中使用 `i18n` 自定义块。

关于 `i18n` 自定义块，请参见 [单文件组件](./sfc.md)

### ESLint 插件

[eslint-plugin-vue-i18n](https://intlify.github.io/eslint-plugin-vue-i18n/) 是为 Vue I18n 编写的 ESLint 插件。

它可以轻松地将一些本地化 lint 功能集成到 Vue.js 应用程序中。

### Extensions

在[vue-i18n-extensions](https://github.com/kazupon/vue-i18n-extensions) 你可以找到为 Vue I18n 编写的插件。

您可以使用此扩展来启用 SSR 并提高 Vue I18n 的性能。

## 第三方工具

### BabelEdit

[BabelEdit](https://www.codeandweb.com/babeledit) 是 Web 应用程序的翻译编辑器。

BabelEdit可以翻译 `json` 文件，也可以翻译单文件组件的 `i18n` 自定义块。

欲了解更多，请看[教程](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n)

### i18n Ally

[i18n Ally](https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally) 是 VSCode 的 i18n 扩展。

i18n Ally 为您的 i18n 开发提供了出色的 DX。

在[自述文件](https://github.com/antfu/i18n-ally/blob/master/README.md)中了解有关 i18n Ally 的更多信息。

### i18nPlugin (intellij 平台)

[i18nPlugin](https://github.com/nyavro/i18nPlugin) Intellij idea i18next 支持插件([Jetbrains 插件页面](https://plugins.jetbrains.com/plugin/12981-i18n-support))。

适用于 i18n typescript/javascript/PHP 的插件。 支持 vue-i18n。 要启用 vue-i18n 支持，请转到 设置- > 工具 -> i18n 插件配置，然后选中 "Vue-i18n"。 您需要设置您的语言环境目录（默认为语言环境）。

### vue-i18n-extract

[vue-i18n-extract](https://github.com/pixari/vue-i18n-extract) 对基于 vue-i18n 的 Vue.js 项目执行静态分析，并报告以下信息：

- 所有 **未使用的 vue-i18n 键**的列表（在语言文件中找到但在项目中未使用的条目）
- 所有 **缺失键** 的列表（在项目中喜欢但在语言文件中不喜欢的条目）

可以在控制台中显示输出或将其写入json文件

丢失的键也可以自动添加到给定的语言文件中
