# Component based localization

通常语言环境信息 (例如： `locale`，`messages` 等) 被设置为 `VueI18n` 的构造实例并且需要设置 `i18n` 的选项作为 Vue 的实例。

因此你可以在 Vue 实例的根节点中使用 `$t` 或者 `$tc` 进行全局翻译。当然面向 Vue 的组件化设计，可以更方便的分别控制每个组件的语言环境信息。

基于组件的本地化示例：

```js
// 为 Vue 的根节点设置语言环境信息
const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: {
      message: {
        hello: 'hello world',
        greeting: 'good morning'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界',
        greeting: 'おはようございます'
      }
    }
  }
})

// 定义组件
const Component1 = {
  template: `
    <div class="container">
     <p>Component1 locale messages: {{ $t("message.hello") }}</p>
     <p>Fallback global locale messages: {{ $t("message.greeting") }}</p>
   </div>`,
  i18n: { // `i18n` 选项，为 Vue 的根节点设置语言环境信息
    messages: {
      en: { message: { hello: 'hello component1' } },
      ja: { message: { hello: 'こんにちは、component1' } }
    }
  }
}

new Vue({
  i18n,
  components: {
    Component1
  }
}).$mount('#app')
```

模板：


```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

输出如下：

```html
<div id="app">
  <p>こんにちは、世界</p>
  <div class="container">
    <p>Component1 locale messages: こんにちは、component1</p>
    <p>Fallback global locale messages: おはようございます</p>
  </div>
</div>
```

在上面的例子中，如果组件没有语言环境信息，它将返回到全局定义的本地化信息。组件使用根实例中设置的语言 (在上面的例子中： `locale: 'ja'` )。

注意，在默认情况下，退回到根语言环境会在控制台中生成两个警告：

```console
[vue-i18n] Value of key 'message.greeting' is not a string!
[vue-i18n] Fall back to translate the keypath 'message.greeting' with root locale.
```

为避免以上警告 (同时保留那些警告完全没有给定关键字的翻译) 需初始化 `VueI18n` 实例时设置 `silentFallbackWarn：true`。

如果你希望在组件语言环境中进行本地化，你可以用 `sync: false` 和 `locale` 在 `i18n` 选项中。

## 功能组件的翻译

使用功能组件时，所有数据 (包括 props，children，slot，parent 等) 都通过包含属性的 `context` 传递，并且它无法识别 `this` 范围，因此在功能组件上使用 vue-i18n 时，你必须将 `$t` 称为 `parent.$t`，请查看以下示例：

```html
...
<div>
  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer">
    <img src="" :alt="parent.$t('message.hello')">
  </a>
</div>
...
```
