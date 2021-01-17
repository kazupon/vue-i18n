# 语言环境信息的语法

## 结构

语言环境信息的语法如下：

```typescript
// 作为 Flowtype 定义，语言环境信息的语法类似于 BNF 注释
type LocaleMessages = { [key: Locale]: LocaleMessageObject };
type LocaleMessageObject = { [key: Path]: LocaleMessage };
type LocaleMessageArray = LocaleMessage[];
type MessageContext = {
  list: (index: number) => mixed,
  named: (key: string) => mixed
};
type MessageFunction = (ctx: MessageContext) => string;
type LocaleMessage = string | MessageFunction | LocaleMessageObject | LocaleMessageArray;
type Locale = string;
type Path = string;
```

基于以上语法，你可以配置以下结构的 Locale 信息：

```json
{
  "en": {  // 'en' Locale
    "key1": "this is message1", // 基本的
    "nested": { // 嵌套
      "message1": "this is nested message1"
    },
    "errors": [ // 数组
      "this is 0 error code message",
      {  // 数组嵌套对象
        "internal1": "this is internal 1 error message"
      },
      [  // 数组嵌套数组
        "this is nested array error 1"
      ]
    ]
  },
  "ja": { // 'ja' Locale
    // ...
  }
}
```

在上面的语言环境信息的结构中，你可以使用以下键名路径进行翻译。

```html
<div id="app">
  <!-- 基本的 -->
  <p>{{ $t('key1') }}</p>
  <!-- 嵌套 -->
  <p>{{ $t('nested.message1') }}</p>
  <!-- 数组 -->
  <p>{{ $t('errors[0]') }}</p>
  <!-- 数组嵌套对象 -->
  <p>{{ $t('errors[1].internal1') }}</p>
  <!-- 数组嵌套数组 -->
  <p>{{ $t('errors[2][0]') }}</p>
</div>
```

输出以下内容：

```html
<div id="app">
  <!-- 基本的 -->
  <p>this is message1</p>
  <!-- 嵌套 -->
  <p>this is nested message1</p>
  <!-- 数组 -->
  <p>this is 0 error code message</p>
  <!-- 数组嵌套对象 -->
  <p>this is internal 1 error message</p>
  <!-- 数组嵌套数组 -->
  <p>this is nested array error 1</p>
</div>
```

## Linked locale messages

如果有一个翻译关键字总是与另一个具有相同的具体文本，你可以链接到它。要链接到另一个翻译关键字，你所要做的就是在其内容前加上一个 `@:` 符号后跟完整的翻译键名，包括你要链接到的命名空间。

语言环境信息如下：

```js
const messages = {
  en: {
    message: {
      the_world: 'the world',
      dio: 'DIO:',
      linked: '@:message.dio @:message.the_world !!!!'
    }
  }
}
```

模板如下：

```html
<p>{{ $t('message.linked') }}</p>
```

输出如下：

```html
<p>DIO: the world !!!!</p>
```
### 格式化链接的语言环境消息

如果语言区分字符大小写，则可能需要控制链接的语言环境消息的大小写。
链接的消息可以用修饰符 `@.modifier:key` 格式化。

以下修饰符当前可用。

* `upper`: 链接消息中的所有字符均大写
* `lower`: 小写链接消息中的所有字符
* `capitalize`: 大写链接消息中的第一个字符

语言环境消息如下：

```javascript
const messages = {
  en: {
    message: {
      homeAddress: 'Home address',
      missingHomeAddress: 'Please provide @.lower:message.homeAddress'
    }
  }
}
```

```html
<label>{{ $t('message.homeAddress') }}</label>

<p class="error">{{ $t('message.missingHomeAddress') }}</p>
```

输出以下内容：

```html
<label>Home address</label>

<p class="error">Please provide home address</p>
```

您可以添加修饰符或覆盖将 `modifiers` 选项传递给 `VueI18n` 构造函数的现有修饰符。

```javascript
const i18n = new VueI18n({
  locale: 'en',
  modifiers: {
    snakeCase: (str) => str.split(' ').join('-')
  },
  messages: {
    // ...
  },
})
```

### 按括号分组

链接到的语言环境信息的键名也可以形如 `@:(message.foo.bar.baz)`，其中链接到另一段翻译的键名在括号 `()` 里。

如果链接 `@:message.something` 后紧跟着一个点 `.`，则此选项非常有用，因为它本不该成为但却成为了链接的一部分。

语言环境信息如下：

```js
const messages = {
  en: {
    message: {
      dio: 'DIO',
      linked: 'There\'s a reason, you lost, @:(message.dio).'
    }
  }
}
```

模板如下：

```html
<p>{{ $t('message.linked') }}</p>
```

输出如下：

```html
<p>There's a reason, you lost, DIO.</p>
```

## 留言功能

vue-i18n 建议在翻译消息时使用基于列表的字符串或命名格式作为语言环境消息。

但是，在某些情况下，由于复杂的语言语法，您确实需要JavaScript的全部编程功能。 因此，您可以使用 **message function** 来代替基于字符串的消息。

以下是一个返回简单问候语的消息函数：

```js
const messages = {
  en: {
    greeting: (ctx) => 'hello!'
  }
}
```

使用消息功能非常容易！ 您只需使用 `$t` 或 `t` 指定消息功能的键：

```html
<p>{{ $t('greeting') }}</p>
```

输出如下：

```html
<p>hello!</p>
```

消息功能输出消息，该消息具有消息功能的返回值。

### 命名格式

vue-i18n 支持[命名格式](./formatting.md#named-formatting) 作为基于字符串的消息格式。 vue-i18n用$ t或t插值参数值，并可以将其输出。

使用 **消息上下文** 的消息功能可以完成以下操作：

这是问候的示例：

```js
const messages = {
  en: {
    greeting: (ctx) => `hello, ${ctx.named('name')}!`
  }
}
```

模板：

```html
<p>{{ $t('greeting', { name: 'DIO' }) }}</p>
```

输出如下：

```html
<p>hello, DIO!</p>
```

消息上下文具有命名函数。 您需要指定键来解析以 `$t` 或 `t` 命名的值。

### 清单格式

列表格式的使用类似于上述命名格式。

vue-i18n 支持 [列表格式](./formatting.md#list-formatting) 作为基于字符串的消息格式。 vue-i18n用$ t或t插值参数值，并可以将其输出。

您可以通过使用消息上下文对消息函数执行相同的操作：

这是问候的示例：

```js
const messages = {
  en: {
    greeting: (ctx) => `hello, ${ctx.list(0)}!`
  }
}
```

模板：

```html
<p>{{ $t('greeting', ['DIO']) }}</p>
```

输出如下：

```html
<p>hello, DIO!</p>
```

消息上下文具有列表功能。 您需要指定索引来解析由 `$t` 或 `t` 列表指定的值。

### 局限性

在消息功能中，以下基于字符串提供的功能无法通过消息上下文使用：

- 链接的区域设置消息
- 复数
