# Горячая перезагрузка переводов

Можно отслеживать изменения в файлах локализации и осуществлять горячую перезагрузку.

```js
// Какие-то сообщения локализации
const messages = {
  // ...
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

// Настраиваем горячую перезагрузку
if (module.hot) {
  module.hot.accept(['./en', './ru'], function() {
    i18n.setLocaleMessage('en', require('./en').default)
    i18n.setLocaleMessage('ru', require('./ru').default)
    // Или настраиваем горячую перезагрузку через свойство $i18n
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ru', require('./ru').default)
  })
}
```
