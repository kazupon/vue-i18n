# Hot reload

You can watch for changes in translation files and hot reload changes into your application.

```javascript
// Something locale messages
var messages = {
  // ...
}

// VueI18n instance
var i18n = new Vuei18n({
  locale: 'en',
  mesasges: messages
})

// Run app
var app = new Vue({
  i18n: i18n,
  // ...
}).$mount('#app')

// Hot updates
if (module.hot) {
  module.hot.accept(['./en', './ja'], function () {
    i18n.setLocaleMessage('en', require('./en').default)
    i18n.setLocaleMessage('ja', require('./ja').default)
    // Or the bellow hot updates via $i18n prop
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ja', require('./ja').default)
  })
}
```
