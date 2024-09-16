# 热重载

您可以使用Webpack的 [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR) 功能来监视本地化文件中的更改以及将热更改重新加载到您的应用程序中。

你可以监视本地化文件中的更改，并将更改热重载到应用程序中。

## 基本例子

如果仅使用静态语言环境集，则可以显式热加载这些语言环境：

```js
import Vue from "vue"
import VueI18n from "vue-i18n"
import en from './en'
import ja from './ja'

// 语言环境信息
const messages = {
  en,
  ja
}

// VueI18n 实例
const i18n = new VueI18n({
  locale: 'en',
  messages
})

// 运行程序
const app = new Vue({
  i18n,
  // ...
}).$mount('#app')

// 热更新
if (module.hot) {
  module.hot.accept(['./en', './ja'], function () {
    i18n.setLocaleMessage('en', require('./en').default)
    i18n.setLocaleMessage('ja', require('./ja').default)
    // 同样可以通过 $i18n 属性进行热更新
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ja', require('./ja').default)
  })
}
```

## 进阶范例

如果您想支持一组不断变化的语言环境，则可以使用 `require.context` 动态地重新加载这些语言环境：

```js
import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// 加载所有语言环境并记住上下文
function loadMessages() {
  const context = require.context("./locales", true, /[a-z0-9-_]+\.json$/i);

  const messages = context
    .keys()
    .map((key) => ({ key, locale: key.match(/[a-z0-9-_]+/i)[0] }))
    .reduce(
      (messages, { key, locale }) => ({
        ...messages,
        [locale]: context(key),
      }),
      {}
    );

  return { context, messages };
}

const { context, messages } = loadMessages();

// VueI18n 实例
const i18n = new VueI18n({
  locale: "en",
  messages,
});

// 运行程序
const app = new Vue({
  i18n,
  // ...
}).$mount('#app');

// 热更新
if (module.hot) {
  module.hot.accept(context.id, () => {
    const { messages: newMessages } = loadMessages();

    Object.keys(newMessages)
      .filter((locale) => messages[locale] !== newMessages[locale])
      .forEach((locale) => {
        messages[locale] = newMessages[locale];
        i18n.setLocaleMessage(locale, messages[locale]);
      });
  });
}
```
