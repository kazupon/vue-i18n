# 自定义指令本地化

:::tip 支持的版本
:new: 7.3+ 新增
:::

你不仅可以使用 `$t` 方法进行翻译，还可以使用 `v-t` 自定义指令。

## 字符串语法

你可以使用字符串语法传递语言环境信息的键名路径。

JavaScript：

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi there!' },
      ja: { hello: 'こんにちは！' }
    }
  }),
  data: { path: 'hello' }
}).$mount('#string-syntax')
```

模板：

```html
<div id="string-syntax">
  <!-- 字符串 -->
  <p v-t="'hello'"></p>
  <!-- 通过数据进行键名路径绑定 -->
  <p v-t="path"></p>
</div>
```

输出：

```html
<div id="string-syntax">
  <p>hi there!</p>
  <p>hi there!</p>
</div>
```

## 对象语法

你可以使用对象语法。

Javascript：

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi {name}!' },
      ja: { hello: 'こんにちは、{name}！' }
    }
  }),
  computed: {
    nickName () { return 'kazupon' }
  },
  data: { path: 'hello' }
}).$mount('#object-syntax')
```

模板：

```html
<div id="object-syntax">
  <!-- 文字 -->
  <p v-t="{ path: 'hello', locale: 'ja', args: { name: 'kazupon' } }"></p>
  <!-- 通过 `data` 绑定数据 -->
  <p v-t="{ path: path, args: { name: nickName } }"></p>
</div>
```

输出：

```html
<div id="object-syntax">
  <p>こんにちは、kazupon！</p>
  <p>hi kazupon!</p>
</div>
```

## 使用翻译

:::tip 支持版本
:new: 8.7+ 新增
:::

当 `v-t` 指令应用于 [`<transition>` 组件](https://cn.vuejs.org/v2/api/#transition)内的元素时，你可能会注意到过渡动画之后的翻译过的信息会消失。这与 `<transition>` 组件实现的方式有关——**在过渡开始之前** ，`<transition>` 组件内消失元素中的所有指令都将被销毁。此行为可能导致内容在短过渡时闪烁，但在长过渡时最明显。

为了确保在转换期间指令内容不会被触及，只需将[`.preserve` 修饰符](../api/#v-t)添加到 `v-t` 指令定义中。

Javascript：

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' },
    }
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

模板：

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t.preserve="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

也可以在 `VueI18n` 实例本身设置全局设置，这将对没有修饰符的所有 `v-t` 指令产生影响。

Javascript：

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' },
    },
    preserveDirectiveContent: true
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

模板：

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

关于上面的例子，请参阅[示例](https://github.com/kazupon/vue-i18n/tree/dev/examples/directive)

## `$t` vs `v-t`

### `$t`

`$t` 是扩展的 Vue 实例方法， 它有以下优点和缺点：

#### 优点

你可以**灵活地**在模板以及 Vue 实例的计算属性和方法中使用 mustash 语法 `{{}}`。

#### 缺点

`$t` 在**每次**重新渲染时都会被执行，因此它确实有翻译成本。

### `v-t`

`v-t` 是一个自定义指令，它有以下优点和缺点：

#### 优点

`v-t` 比 `$t` 方法具有**更好的**性能，因为在一次翻译时自定义指令会进行缓存。此外可以使用由 [`vue-i18n-extensions`](https://github.com/kazupon/vue-i18n-extensions) 提供的 Vue 编译器模块进行预翻译。

因此，可以进行**更多性能优化**。

#### 缺点

`v-t` 不能像 `$t` 一样灵活使用，它更**复杂**。带有 `v-t` 的翻译内容会被插入到元素的 `textContent` 中。此外，当你使用服务器渲染时，你需要设置[自定义指令](https://github.com/kazupon/vue-i18n-extensions#directive-v-t-custom-directive-for-server-side)到 `createRenderer` 函数的 `directives` 选项。
