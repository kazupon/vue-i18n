# Dynamic locale

Sometimes, you need to set dynamically the locale from external location. You can set dynamically it with `Vue.locale`.

the below the example:

```javascript
var self = this
var lang = 'ja'
Vue.locale(lang, function () {
  self.loading = true
  return fetch('/locale/' + lang, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json()
  }).then(function (json) {
    self.loading = false
    if (Object.keys(json).length === 0) {
      return Promise.reject(new Error('locale empty !!'))
    } else {
      return Promise.resolve(json)
    }
  }).catch(function (error) {
    self.error = error.message
    return Promise.reject()
  })
}, function () {
  Vue.config.lang = lang
})
```

## Dynamic locale interfaces

In dynamic locales, You can use the two type interfaces:

### 1. function
You need to implement locale setting that return function have `function (resolve, reject)` like promise (future). The following, those argument of the function, if successful, you need to use the `resolve` according to locale object. if failed, you need to use `reject`

- successful: `resolve`
- failed: `reject`

### 2. promise
As mentioned above, You need to implement locale setting that return a promise. if successful, you need to `resolve` according to locale object. if failed, you need to use `reject`.

> :warning: You must return a **ES6 compatible** promise.
