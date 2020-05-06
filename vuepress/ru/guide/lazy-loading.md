# Ленивая загрузка переводов

Одновременная загрузка всех файлов переводов может быть излишней и ненужной.

Ленивая или асинхронная загрузка файлов переводов очень просто реализуется при использовании Webpack.

Предположим, что у нас есть каталог проекта следующей структуры:

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

В каталоге `lang` располагаются все файлы переводов. В каталоге `setup` сгруппированы различные файлы настроек, например настройки i18n, регистрация глобальных компонентов, инициализации плагинов и другое.

```js
// i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/en'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // установка локализации
  fallbackLocale: 'en',
  messages // установка сообщений локализации
})

const loadedLanguages = ['en'] // список локализаций, которые пред-загружены

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // Если локализация та же
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // Если локализация уже была загружена
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // Если локализация ещё не была загружена
  return import(
    /* webpackChunkName: "lang-[request]" */ `@/i18n/messages/${lang}.js`
  ).then(messages => {
    i18n.setLocaleMessage(lang, messages.default)
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}
```

Для начала создаём новый экземпляр VueI18n как обычно. Затем определяем массив `loadedLanguages` в котором будем хранить список загруженных языков. Далее создаём функцию `setI18nLanguage`, которая будет переключать локализацию в экземпляре vueI18n, axios и где ещё это необходимо.

Функция `loadLanguageAsync` будет использоваться для изменения языка. Загрузка новых файлов осуществляется функцией `import`, которую предоставляет Webpack и позволяет загружать файлы динамически, а поскольку она возвращает Promise, то можем легко дождаться окончания загрузки.

Подробнее о динамических импортах можно изучить в [документации Webpack](https://webpack.js.org/guides/code-splitting/#dynamic-imports).

Использовать `loadLanguageAsync` очень просто. Например, в хуке beforeEach vue-router.

```js
router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})
```

Можно доработать реализацию, например добавив проверку поддерживается ли переданный `lang` или нет и вызывать `reject` чтобы отловить подобные случаи в хуке `beforeEach` и остановить навигацию.
