# Hot reload

You can watch for changes in translation files and hot reload changes into your application.

```javascript
// Support hot updates
if (module.hot) {
  module.hot.accept(['./en', './ja'], () => {
    Vue.locale('en', require('./en').default);
    Vue.locale('ja', require('./ja').default);
  });
}
```