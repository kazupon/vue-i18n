# 语言环境变更

通常，使用 Vue 根实例作为起点，使用 `VueI18n` 类的 `locale` 属性作为参考来本地化所有子组件。

有时你可能希望动态更改语言环境。在这种情况下，你可以更改 `VueI18n` 实例的 `locale` 属性的值。

```js
const i18n = new VueI18n({
  locale: 'ja', // 设置语言环境
  ...
})

// 创建 Vue 根实例
new Vue({
  i18n,
  ...
}).$mount('#app')

// 更改为其它的 locale
i18n.locale = 'en'
```

每个组件都包含一个引用为 `$i18n` 属性的 `VueI18n` 实例，该实例也可用于更改语言环境。

示例：

```html
<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['ja', 'en'] }
  }
}
</script>
```

:::warning 警告
:warning: 对于使用了 `sync: false` 的组件，语言环境的更改将被忽略。
:::
