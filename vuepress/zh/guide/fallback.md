# 回退本地化

以下语言环境信息的 `ja` 语言环境中不存在 `message` 键：

```js
const messages = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
```

当为 VueI18n 构造函数选项指定 `fallbackLocale` 选项时，`message` 键使用 `en` 语言环境进行本地化：

```js
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages
})
```

模板如下：

```html
<p>{{ $t('message') }}</p>
```

输出如下：

```html
<p>hello world</p>
```

注意，默认情况下回退到 `fallbackLocale` 会产生两个控制台警告：

```
[vue-i18n] Value of key 'message' is not a string!
[vue-i18n] Fall back to translate the keypath 'message' with 'en' locale.
```

为了避免这些警告 (同时保留那些完全没有翻译给定关键字的警告)，需初始化 `VueI18n` 实例时设置 `silentFallbackWarn：true`。

## 回退插值

由于翻译的键值是字符串，因此也可以作为翻译的值：

```javascript
const messages = {
  ja: {
    'Hello world': 'こんにちは、世界'
  }
}
```

这是一种很自然的书写方式，如果在`message`中找不到相应的键值将回退到原本的语言：

*注意: `fallbackRoot`的优先级高于`formatFallbackMessages`*

```html
<p>{{ $t('Hello world') }}</p>
```

为了实现此功能，可以通过设置`formatFallbackMessages`为`true`：

```javascript
const messages = {
  ru: {
    'Hello {name}': 'Здравствуйте {name}'
  }
}

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  messages
})
```

当模板`template`如下时：

```html
<p>{{ $t('Hello {name}', { name: 'John' }}) }}</p>
<p>{{ $t('The weather today is {condition}!', { condition: 'sunny' }) }}</p>
```

将会输出：

```html
<p>Здравствуйте John</p>
<p>The weather today is sunny!</p>
```
