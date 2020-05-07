# Горячая перезагрузка переводов

С помощью функции Webpack для [горячей перезагрузки модулей (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) можно отслеживать изменения в файлах локализации и осуществлять их горячую перезагрузку в приложении.

## Простой пример

Для статичного набора локалей, можно явно указать горячую перезагрузку этих переводов:

```js
import Vue from "vue"
import VueI18n from "vue-i18n"
import en from './en'
import ru from './ru'

const messages = {
  en,
  ru
}

// Экземпляр VueI18n
const i18n = new VueI18n({
  locale: 'en',
  messages
})

// Запускаем приложение
const app = new Vue({
  i18n
  // ...
}).$mount('#app')

// Добавляем горячую перезагрузку сообщений локализации
if (module.hot) {
  module.hot.accept(['./en', './ru'], function() {
    i18n.setLocaleMessage('en', require('./en').default)
    i18n.setLocaleMessage('ru', require('./ru').default)
    // Или добавляем горячую перезагрузку через свойство $i18n
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ru', require('./ru').default)
  })
}
```

## Продвинутый пример

Если требуется поддержка изменяющегося набор переводов, можно реализовать горячую перезагрузку для всех локалей динамически через `require.context`:

```js
import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// Загрузка всех локалей и сохранение контекста
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

// Экземпляр VueI18n
const i18n = new VueI18n({
  locale: "en",
  messages,
});

// Запускаем приложение
const app = new Vue({
  i18n,
  // ...
}).$mount('#app');

// Добавляем горячую перезагрузку сообщений локализации
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
