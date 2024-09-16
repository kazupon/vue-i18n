# 基于组件的本地化

通常语言环境信息 (例如：`locale`、`messages` 等) 会被设置为 `VueI18n` 实例的构造函数选项，并且该实例会被作为 `i18n` 选项设置在 Vue 的根实例上。

因此你可以全局地在 Vue 的根实例以及任何被组合的组件中使用 `$t` 或者 `$tc` 进行翻译。当然面向 Vue 组件的设计，你也可以更方便的分别控制每个组件的语言环境信息。

基于组件的本地化示例：

```js
// 为 Vue 的根实例设置语言环境信息
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
  i18n: { // `i18n` 选项，为组件设置语言环境信息
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

在上面的例子中，如果组件没有语言环境信息，它将回退到全局定义的本地化信息。组件使用根实例中设置的语言 (在上面的例子中：`locale: 'ja'`)。

注意，在默认情况下，回退到根语言环境会在控制台中生成两个警告：

```
[vue-i18n] Value of key 'message.greeting' is not a string!
[vue-i18n] Fall back to translate the keypath 'message.greeting' with root locale.
```

为避免以上警告 (同时保留那些完全没有翻译给定关键字的警告) 需初始化 `VueI18n` 实例时设置 `silentFallbackWarn：true`。

如果你希望在组件语言环境中进行本地化，可以在 `i18n` 选项中用 `sync: false` 和 `locale`。

## 组件的共享语言环境消息

有时您可能想为某些组件导入共享的语言环境消息，而不是从全局语言环境消息（例如，组件某些功能的常用消息）回退。

您可以使用 `i18n` 的 `sharedMessages` 选项。

通用语言环境消息示例：

```js
export default {
  en: {
    buttons: {
      save: "Save",
      // ...
    }
  },
  ja: {
    buttons: {
      save: "保存",
      // ...
    }
  }
}
```

Components:
```js
import commonMessage from './locales/common' // 导入通用语言环境消息

export default {
  name: 'ServiceModal',
  template: `
    <div class="modal">
      <div class="body">
        <p>This is good service</p>
      </div>
      <div class="footer">
        <button type="button">
          {{ $t('buttons.save') }}
        </button>
      </div>
    </div>
  `,
  i18n: {
    messages: { ... },
    sharedMessages: commonMessages
  }
}
```

如果将 `sharedMessages` 选项与 `messages` 选项一起指定，则这些消息将被合并为语言环境消息，并进入目标组件的VueI18n实例。

## 函数式组件的翻译

使用函数式组件时，所有数据 (包括 prop、子内容、插槽、父级内容等) 都通过包含属性的 `context` 传递，并且它无法识别 `this` 的范围，因此在函数式组件上使用 vue-i18n 时，你必须将 `$t` 称为 `parent.$t`，请查看以下示例：

```html
...
<div>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <img src="./assets/example.jpg" :alt="parent.$t('message.hello')">
  </a>
</div>
...
```
