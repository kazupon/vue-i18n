# 数字本地化

:::tip 支持版本
:new: 7.0+ 新增
:::

你可以使用你定义的格式来本地化数字。

数字格式如下：

```js
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'ja-JP': {
    currency: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol'
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

## 自定义格式

:::tip 支持版本
:new: 8.10+ 新增
:::

`$n` 方法返回的结果字符串带有完全格式化的数字，该数字只能作为整体使用。 在需要格式化格式化数字的某些部分（例如小数位）的情况下，`$n` 是不够的。 在这种情况下，`<i18n-n>` 功能组件将有所帮助。

有了最少的一组属性，`<i18n-n>` 产生的输出与 `$n` 相同，并包装到已配置的DOM元素中。

以下模板：

```html
<div id="app">
  <i18n-n :value="100"></i18n-n>
  <i18n-n :value="100" format="currency"></i18n-n>
  <i18n-n :value="100" format="currency" locale="ja-JP"></i18n-n>
</div>
```

将产生以下输出：

```html
<div id="app">
  <span>100</span>
  <span>$100.00</span>
  <span>￥100</span>
</div>
```

但是，当与[范围内的插槽](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) 一起使用时，该组件的真正功能就会发挥作用。

假设需要用较粗的字体呈现数字的整数部分。 这可以通过指定 `integer` 作用域的插槽元素来实现：

```html
<i18n-n :value="100" format="currency">
  <span v-slot:integer="slotProps" styles="font-weight: bold">{{ slotProps.integer }}</span>
</i18n-n>
```

上面的模板将产生以下 HTML：

```html
<span>$<span styles="font-weight: bold">100</span>.00</span>
```

可以同时指定多个作用域插槽：

```html
<i18n-n :value="1234" :format="{ key: 'currency', currency: 'EUR' }">
  <span v-slot:currency="slotProps" styles="color: green">{{ slotProps.currency }}</span>
  <span v-slot:integer="slotProps" styles="font-weight: bold">{{ slotProps.integer }}</span>
  <span v-slot:group="slotProps" styles="font-weight: bold">{{ slotProps.group }}</span>
  <span v-slot:fraction="slotProps" styles="font-size: small">{{ slotProps.fraction }}</span>
</i18n-n>
```

（此结果 HTML 进行了格式化，以提高可读性）

```html
<span>
  <span styles="color: green">€</span>
  <span styles="font-weight: bold">1</span>
  <span styles="font-weight: bold">,</span>
  <span styles="font-weight: bold">234</span>
  <span styles="font-size: small">00</span>
</span>
```

您可以通过指定 `tag` 属性来选择根容器的节点类型。 如果省略，则默认为 `'span'`。 您也可以将其设置为布尔值 `false` 以直接插入子节点，而无需创建根元素。

可以在 [API 页面](../api/readme.md#i18n-n-functional-component) 中找到受支持的作用域插槽以及其他 `<i18n-n>` 属性的完整列表。
