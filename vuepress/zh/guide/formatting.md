# 格式化

## HTML格式化

:::warning 提示
:warning: 在你的网站上动态插入任意 HTML 可能非常危险，因为它很容易导致 XSS 攻击。仅对可信内容使用 HTML 插值，而不对用户提供的内容使用。

我们建议使用[组件插值](interpolation.md) 功能。
:::

在某些情况下，你可能希望将翻译呈现为 HTML 信息而不是静态字符串。


```js
const messages = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  }
}
```

模板如下：


```html
<p v-html="$t('message.hello')"></p>
```

输出如下 (取代预先格式化的信息)


```html
<p>hello
<!--<br> 存在，但呈现为 html 而不是字符串-->
world</p>
```

## 具名格式

语言环境信息如下：

```js
const messages = {
  en: {
    message: {
      hello: '{msg} world'
    }
  }
}
```

模板如下：

```html
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

输出如下：

```html
<p>hello world</p>
```

## 列表格式

语言环境信息如下：

```js
const messages = {
  en: {
    message: {
      hello: '{0} world'
    }
  }
}
```

模板如下：

```html
<p>{{ $t('message.hello', ['hello']) }}</p>
```

输出如下：

```html
<p>hello world</p>
```

列表格式也接受类似数组的对象：


```html
<p>{{ $t('message.hello', {'0': 'hello'}) }}</p>
```

输出如下：

```html
<p>hello world</p>
```

## 支持 ruby on rails 的 i18n 格式

语言环境信息如下：

```js
const messages = {
  en: {
    message: {
      hello: '%{msg} world'
    }
  }
}
```

模板如下：

```html
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

输出如下：

```html
<p>hello world</p>
```

## 自定义格式

有时，你可能需要使用自定义格式进行翻译 (例如：[ICU 信息语法](http://userguide.icu-project.org/formatparse/messages))。

你可以使用实现[格式化接口](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js#L41-L43) 的自定义格式化函数来实现。

以下使用 ES2015 class 语法的自定义格式化函数：

```js
// 实现自定义格式
class CustomFormatter {
     constructor (options) {
       // ...
     }

     //
     // 插值
     //
     // @param {string} 信息
     //   列表或具名格式的字符串。
     //   例如：
     //   - 具名格式：'Hi {name}'
     //   - 列表格式：'Hi {0}'
     //
     // @param {Object | Array} 值
     //   `message` 插值的值
     //   使用 `$t`， `$tc` 和 `i18n` 函数式组件传递值。
     //   e.g.
     //   - $t('hello', { name: 'kazupon' }) -> 传递值：Object `{ name: 'kazupon' }`
     //   - $t('hello', ['kazupon']) -> 传递值：Array `['kazupon']`
     //   - `i18n` 函数式组件 (组件插值)
     //     <i18n path="hello">
     //       <p>kazupon</p>
     //       <p>how are you?</p>
     //     </i18n>
     //     -> 传递值：Array (included VNode):
     //        `[VNode{ tag: 'p', text: 'kazupon', ...}, VNode{ tag: 'p', text: 'how are you?', ...}]`
     //
     // @return {Array<any>}
     //   插值，你需要返回以下内容：
     //   - 当使用 `$t` 或 `$tc` 数组中应该是字符串。
     //   - 当使用 `i18n` 函数式组件时 数组中应包含 VNode 对象。
     //
     interpolate (message, values) {
       // 在这里实现插值逻辑
       // ...

       // 返回插值数组
       return ['resolved message string']
     }
}

// 注册 `formatter` 选项
const i18n = new VueI18n({
  locale: 'en-US',
  formatter: new CustomFormatter(/* 这里是构造函数选项 */),
  messages: {
    'en-US': {
      // ...
    },
    // ...
  }
})

// 启动!
new Vue({ i18n }).$mount('#app')
```

你可以查看[自定义格式化函数的官方示例](https://github.com/kazupon/vue-i18n/tree/dev/examples/formatting/custom)。
