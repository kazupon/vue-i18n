# Tooling

To support the i18n of Vue applications, some tools are officially provided.

There are also tools from third vendors integrating Vue I18n.

## Official tooling

### Vue CLI Plugin

[vue-cli-plugin-i18n](https://github.com/kazupon/vue-cli-plugin-i18n) is officially provided as the Vue CLI Plugin.

With this plugin, you can setup the i18n environment for the Vue application, and support the i18n development environment.

### Nuxt Module

[nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n/) is corresponding Nuxt.js module.

### Webpack loader

[vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader) is an officially provided webpack loader.

With this loader, you can use the `i18n` custom block in the Single file components.

In about `i18n` custom block, see the [Single file components section](./sfc.md)

### ESLint Plugin

[eslint-plugin-vue-i18n](https://intlify.github.io/eslint-plugin-vue-i18n/) is ESLint plugin for Vue I18n.

It easily integrates some localization lint features to your Vue.js Application.

### Extensions

[vue-i18n-extensions](https://github.com/kazupon/vue-i18n-extensions) provides some extensions for Vue I18n.

You can use this extension to enable SSR and improve i18n performance.

## 3rd party tooling

### BabelEdit

[BabelEdit](https://www.codeandweb.com/babeledit) is translation editor for web apps.

BabelEdit can translate `json` files, and it can also translate `i18n` custom block of Single-file components.

Read more about BabelEdit in [tutorial page](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n).

### i18n Ally

[i18n Ally](https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally) is i18n extension for VSCode.

i18n Ally give awesome DX for your i18n development.

Read more about i18n Ally in [README](https://github.com/antfu/i18n-ally/blob/master/README.md).

### i18nPlugin (intellij platform)

[i18nPlugin](https://github.com/nyavro/i18nPlugin) Intellij idea i18next support plugin ( [Jetbrains plugin page ](https://plugins.jetbrains.com/plugin/12981-i18n-support)).

Plugin for i18n typescript/javascript/PHP. Supports vue-i18n. To enable vue-i18n support go to settings -> Tools -> i18n Plugin configuration and check "Vue-i18n". You need set vue locales directory (locales by default).

### vue-i18n-extract

[vue-i18n-extract](https://github.com/pixari/vue-i18n-extract) performs static analysis on a Vue.js project based on vue-i18n and reports the following information:

- list of all the **unused vue-i18n keys** (entries found in the language files but not used in the project)
- list of all the **missing keys** (entries fond in the project but not in the language files)

It's possible to show the output in the console or to write it in a json file.

The missing keys can be also automatically added to the given language files.
