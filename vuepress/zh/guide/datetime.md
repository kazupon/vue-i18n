# 日期时间本地化

:::tip 支持版本
:new: 7.0+ 新增
:::

你可以使用你定义的格式来本地化日期时间。

日期时间格式如下：

```js
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  }
}
```

如上，你可以定义具名的 (例如：`short`、`long` 等) 日期时间格式，并需要使用 [ECMA-402 Intl.DateTimeFormat 的选项](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)。

之后就像语言环境信息一样，你需要指定 `VueI18n` 构造函数的 `dateTimeFormats` 选项：

```js
const i18n = new VueI18n({
  dateTimeFormats
})

new Vue({
  i18n
}).$mount('#app')
```

模板如下：

```html
<div id="app">
  <p>{{ $d(new Date(), 'short') }}</p>
  <p>{{ $d(new Date(), 'long', 'ja-JP') }}</p>
</div>
```

输出如下：

```html
<div id="app">
  <p>Jan 18, 2021</p>
  <p>2021年1月18日日曜日 午前5:47</p>
</div>
```
