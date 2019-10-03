# Lazy loading translations

Loading all of your translation files at once is overkill and unnecessary.

Lazy loading or asynchronously loading the translation files is really easy when using Webpack.

Let´s assume we have a project directory similar to the one below:

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

The `lang` folder is where all of our translation files reside. The `setup` folder is where our arbitrary setup files like the i18n-setup, global component inits, plugin inits and other reside.

```js
//i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/en'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})

const loadedLanguages = ['en'] // our default language that is preloaded

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/messages/${lang}.js`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}
```

In short we are creating a new VueI18n instance as we normally would. Then we are creating a `loadedLanguages` array that will keep track of our loaded languages. Next is the `setI18nLanguage` function that will actually change the language in our vueI18n instance, axios and where ever else is needed.

The `loadLanguageAsync` function is what we will actually use to change the languages. Loading the new files is done via the `import` function, which is generously provided by Webpack and it allows us to load files dynamically, and because it uses promises we can easily wait for the loading to finish.

You can learn more about the import function in the [Webpack documentation](https://webpack.js.org/guides/code-splitting/#dynamic-imports).

Using the `loadLanguageAsync` function is straightforward. A common use case is inside a vue-router beforeEach hook.

```js
router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})
```

We could improve this by checking if the `lang` is actually supported by us or not, call `reject` so we can catch that in the `beforeEach` stopping the route transition.
