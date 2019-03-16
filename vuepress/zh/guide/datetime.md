# 时间本地化

:::tip 支持版本
 7.0+ 新增
:::

你可以使用你定义的格式来本地化时间。

时间格式如下:

```js
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    }
  }
}
```

如上，你可以使用指定字段 (例如： `short`, `long`, etc) 的定义日期时间格式, 你需要使用 [the options with ECMA-402 Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)

之后就像语言环境信息一样，你需要指定 `Vue I18n` 构造函数的 `date Time Formats` 选项：

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
  <p>Apr 19, 2017</p>
  <p>2017年4月19日(水) 午前2:19</p>
</div>
```
