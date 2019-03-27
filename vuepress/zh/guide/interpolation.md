# 组件插值

## 基本用法

:::tip 支持版本
:new: 7.0 新增
:::

有时，我们需要使用包含 HTML 标签或组件的语言环境信息进行本地化。例如：

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

在上面的信息中，如果你使用 `$t`，可能你会尝试编写以下语言环境信息：

```js
const messages = {
  en: {
    term1: 'I Accept xxx\'s',
    term2: 'Terms of Service Agreement'
  }
}
```

你可能会尝试在以下模板中实现：

```html
<p>{{ $t('term1') }}<a href="/term">{{ $t('term2') }}</a></p>
```

输出：

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

这是非常麻烦的，如果在语言环境信息中配置 `<a>` 标签，则可能由于使用了 `v-html="$t('term')"` 进行本地化而存在被 XSS 攻击的可能性。

你可以使用 `i18n` 函数式组件来避免它。例如：

```html
<div id="app">
  <!-- ... -->
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
  <!-- ... -->
</div>
```
```js
const messages = {
  en: {
    tos: 'Term of Service',
    term: 'I accept xxx {0}.'
  },
  ja: {
    tos: '利用規約',
    term: '私は xxx の{0}に同意します。'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

输出如下：

```html
<div id="app">
  <!-- ... -->
  <label for="tos">
    I accept xxx <a href="/term" target="_blank">Term of Service</a>.
  </label>
  <!-- ... -->
</div>
```

关于上面的例子，见[示例](https://github.com/kazupon/vue-i18n/tree/dev/examples/interpolation)

`i18n` 函数式组件的子元素用 `path` 属性的语言环境信息进行插值。在上面的例子中，
:::v-pre
`<a :href="url" target="_blank">{{ $t('tos') }}</a>`
:::
被插入了语言环境信息 `term`。

在上面的示例中，组件插值遵循**列表格式**。`i18n` 函数式组件的子项按其出现顺序进行插值。

## 高级用法

:::tip 支持版本
:new: 7.2 新增
:::
:::warning 提示
:warning: 在 `i18n` 组件中，仅包含空格的文本内容将被省略。
:::

在 `place` 特性的帮助下支持具名格式。例如：

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <span place="limit">{{ changeLimit }}</span>
    <a place="action" :href="changeUrl">{{ $t('change') }}</a>
  </i18n>
  <!-- ... -->
</div>
```
```js
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    changeUrl: '/change',
    refundUrl: '/refund',
    changeLimit: 15,
    refundLimit: 30
  }
}).$mount('#app')
```

输出：

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/change">change your flight</a> until <span>15</span> minutes from departure.
  </p>
  <!-- ... -->
</div>
```

:::warning 提示
:warning: `i18n` 组件的所有子项都必须设置 `place` 属性。否则它将回退到列表格式。
:::


如果你仍想在命名格式中插入文本内容，可以在 `i18n` 组件上定义 `places` 属性。例如：

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p" :places="{ limit: refundLimit }">
    <a place="action" :href="refundUrl">{{ $t('refund') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

输出：

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/refund">refund your ticket</a> until 30 minutes from departure.
  </p>
  <!-- ... -->
</div>
```
