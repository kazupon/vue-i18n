# 热重载

你可以监视本地化文件中的更改，并将更改热重载到应用程序中。

```js
// 语言环境信息
const messages = {
  // ...
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
