# 延迟加载翻译

一次加载所有翻译文件是过度和不必要的。

使用 Webpack 时，延迟加载或异步加载转换文件非常简单。

让我们假设我们有一个类似于下面的项目目录

```
our-cool-project
-dist
-src
--routes
--store
--setup
---i18n-setup.js
--lang
---en.js
---it.js
```

`lang` 文件夹是我们所有翻译文件所在的位置。`setup` 文件夹是我们的任意设置的文件，如 i18n-setup，全局组件 inits，插件 inits 和其他位置。

```js
//i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/en'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // 设置语言环境
  fallbackLocale: 'en',
  messages // 设置语言环境信息
})

const loadedLanguages = ['en'] // 我们的预装默认语言

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
```

简而言之，我们正在创建一个新的 VueI18n 实例。然后我们创建一个 `loadedLanguages` 数组，它将跟踪我们加载的语言。接下来是 `setI18nLanguage` 函数，它将实际更改 vueI18n 实例、axios 以及其它需要本地化的地方。

`loadLanguageAsync` 是实际用于更改语言的函数。加载新文件是通过import功能完成的，`import` 功能由 Webpack 慷慨提供，它允许我们动态加载文件，并且因为它使用 promise，我们可以轻松地等待加载完成。

你可以在 [Webpack 文档](https://webpack.js.org/guides/code-splitting/#dynamic-imports) 中了解有关导入功能的更多信息。

使用 `loadLanguageAsync` 函数很简单。一个常见的用例是在 vue-router beforeEach 钩子里面。

```js
router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})
```

我们可以通过检查 `lang` 实际上是否支持来改进这一点，调用 `reject` 这样我们就可以在 beforeEach 捕获路由转换。
