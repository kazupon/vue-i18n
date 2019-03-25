# 数字本地化

:::tip 支持版本
:new: 7.0 新增
:::

你可以使用你定义的格式来本地化数字。

数字格式如下：

```js
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'ja-JP': {
    currency: {
      style: 'currency', currency: 'JPY', currencyDisplay: 'symbol'
    }
  }
}
```

如上，你可以指定具名的 (例如：`currency` 等) 的数字格式，并且需要使用 [ECMA-402 Intl.NumberFormat 的选项](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)。

之后就像语言环境信息一样，你需要指定 `VueI18n` 构造函数的 `numberFormats` 选项：

```js
const i18n = new VueI18n({
  numberFormats
})

new Vue({
  i18n
}).$mount('#app')
```

模板如下：

```html
<div id="app">
  <p>{{ $n(100, 'currency') }}</p>
  <p>{{ $n(100, 'currency', 'ja-JP') }}</p>
</div>
```


输出如下：

```html
<div id="app">
  <p>$100.00</p>
  <p>￥100</p>
</div>
```
