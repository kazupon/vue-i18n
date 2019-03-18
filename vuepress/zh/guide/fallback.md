# 回退本地化

在 `ja` 语言环境中不存在 `message` 键的以下语言环境消息：

```js
const messages = {
  en: {
    message: 'hello world'
  },
  ja: {
  }
}
```

当为 VueI18n 构造函数选项指定 `fallbackLocale` 选项时，`message` 键使用 `en` 语言环键进行本地化：

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

```console
[vue-i18n] Value of key 'message' is not a string!
[vue-i18n] Fall back to translate the keypath 'message' with 'en' locale.
```

为了抑制这些警告（同时保留那些警告完全没有给定 key 的翻译），在初始化 `VueI18n` 实例时设置 `silentFallbackWarn：true`。
