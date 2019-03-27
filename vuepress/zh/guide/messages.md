# 语言环境信息的语法

## 结构

语言环境信息的语法如下：

```typescript
// 作为 Flowtype 定义，语言环境信息的语法类似于 BNF 注释
type LocaleMessages = { [key: Locale]: LocaleMessageObject };
type LocaleMessageObject = { [key: Path]: LocaleMessage };
type LocaleMessageArray = LocaleMessage[];
type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
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
