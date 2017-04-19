# Hot reloading

You can watch for changes in localization files and hot reload changes into your application.

```javascript
// Something locale messages
const messages = {
  // ...
}

// VueI18n instance
const i18n = new Vuei18n({
  locale: 'en',
  messages
})

// Run app
const app = new Vue({
  i18n,
  // ...
}).$mount('#app')

// Hot updates
if (module.hot) {
  module.hot.accept(['./en', './ja'], function () {
    i18n.setLocaleMessage('en', require('./en').default)
    i18n.setLocaleMessage('ja', require('./ja').default)
    // Or the following hot updates via $i18n property
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ja', require('./ja').default)
  })
}
```
