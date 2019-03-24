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

为了避免这些警告 (同时保留那些完全没有翻译给定关键字的警告)，需初始化 `VueI18n` 实例时设置 `silentFallbackWarn：true`。
