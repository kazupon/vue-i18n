---
sidebar: auto
---

# API参考

## 扩展 Vue

### Vue 构造函数选项

#### i18n

  * **类型：** `I18nOptions`

基于组件化的本地化选项

  * **请参阅:** `VueI18n` 类构造函数选项

### Vue 注入方法

#### $t

  * **参数：**

    * `{Path} key`: 必填
    * `{Locale} locale`: 可选
    * `{Array | Object} values`: 可选
  * **Return:** `TranslateResult`

本地化关键字的语言环境信息, 组件语言环境信息进行本地化优先于全局语言环境信息。 如果未指定组件语言环境信息，将使用全局语言环境信息进行本地化。如果指定了 `locale` ，本地化语言环境使用 `locale` 。如果你指定的 `key` 为列表/格式化的语言环境信息，你必须指定 `values` 。有关 `values` 详细信息，请参阅格式化 [Formatting](../guide/formatting.md).

:::danger 提示
注意 你需要保证此上下文等于生命周期方法中的组件实例 (例如，在data选项中, `const $t = this.$t.bind(this)`)
:::

#### $tc

  * **参数：**

    * `{Path} key`: 必填
    * `{number} choice`: 可选, 默认为 1
    * `{Locale} locale`: 可选
    * `{string | Array | Object} values`: 可选
  * **Return:** `TranslateResult`

用多元化本地化关键字的语言环境信息。优先于组件语言环境信息和全局语言环境信息。如果未指定组件语言环境信息，将使用全局语言环境信息进行本地化。如果指定了 `locale` ，本地化语言环境使用 `locale` 。如果要将 `values` 指定为字符串值，请设置本地化 `values` 的 `locale` 信息。如果要为 `values` 指定 Array 或 Object values ，则必须使用 `$t` 的 `values` 指定。

:::danger 提示
注意 你需要保证此上下文等于生命周期方法中的组件实例 (例如，在data选项中, `const $tc = this.$tc.bind(this)`)
:::

#### $te

  * **参数：**

    * `{Path} key`: 必填
    * `{Locale} locale`: 可选
  * **Return:** `boolean`

检查 key 是否存在。在Vue实例中，如果未指定组件语言环境信息，请使用全局语言环境信息进行检查。如果指定了 `locale` ，请检查语言环境的 `locale` 信息。

:::danger 提示
注意 你需要保证此上下文等于生命周期方法中的组件实例 (例如，在data选项中, `const $te = this.$te.bind(this)`).
:::

#### $d

> 7.0+ 新增

  * **参数：**

    * `{number | Date} value`: 必填
    * `{Path | Object} key`: 可选
    * `{Locale | Object} locale`: 可选
  * **Return:** `DateTimeFormatResult`

使用关键字日期时间格式本地化 datetime 的 `value` 。关键字的日期时间格式需要注册到 `VueI18n` 类的 `dateTimeFormats` 选项，并依赖于 `VueI18n` 构造函数的 `locale` 选项。如果要指定 `locale` 参数，它将优先于 `VueI18n` 构造函数的 `locale` 选项。

如果 `dateTimeFormats` 选项中不存在关键字的日期时间格式，则 fallback 将依赖于 `VueI18n` 构造函数的 `fallbackLocale` 选项。

:::danger 提示
注意 你需要保证此上下文等于生命周期方法中的组件实例 (例如，在data选项中, `const $n = this.$n.bind(this)`).
:::

#### $n

> 7.0+ 新增

  * **参数：**

    * `{number} value`: 必填
    * `{Path | Object} key`: 可选
    * `{Locale} locale`: 可选
  * **Return:** `NumberFormatResult`

使用关键字数字格式本地化 number 的 `value` 。关键字的数字格式需要注册到 `VueI18n` 类的 `numberFormats` 选项，并依赖于 `VueI18n` 构造函数的 `locale` 选项。如果要指定 `locale` 参数，它将优先于 `VueI18n` 构造函数的 `locale` 选项。

如果 `numberFormats` 选项中不存在关键字的数字格式，则 fallback 将依赖于 `VueI18n` 构造函数的 `fallbackLocale`选项。

如果第二个 `key` 参数指定为对象，则它应具有以下属性：

* `key {Path}`: 可选, 数字格式
* `locale {Locale}`: 可选, 语言环境
* `style {string}`: 可选, 数字格式选项
* `currency {string}`: 可选, 数字格式选项
* `currencyDisplay {string}`: 可选, 数字格式选项
* `useGrouping {string}`: 可选, 数字格式选项
* `minimumIntegerDigits {string}`: 可选, 数字格式选项
* `minimumFractionDigits {string}`: 可选, 数字格式选项
* `maximumFractionDigits {string}`: 可选, 数字格式选项
* `minimumSignificantDigits {string}`: 可选, 数字格式选项
* `maximumSignificantDigits {string}`: 可选, 数字格式选项
* `localeMatcher {string}`: 可选, 数字格式选项
* `formatMatcher {string}`: 可选, 数字格式选项

任何指定数字的格式选项将优先于 `VueI18n` 构造函数的 `numberFormats` 。

:::danger 提示
注意 你需要保证此上下文等于生命周期方法中的组件实例 (例如，在data选项中, `const $d = this.$d.bind(this)`).
:::

### 注入属性

#### $i18n

  * **类型：** `I18n`

  * **Read only**

获取 `VueI18n` 实例，如果你指定。

如果在组件选项中指定了 `i18n` 选项，则可以在组件上获得 `VueI18n` 实例，否则，你将获得 `VueI18n` 的根实例。

## `VueI18n` class

`Vuei18n` class 实现了 [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js) `I18n` 接口

### 静态属性

#### 版本

  * **类型：** `string`

vue-i18n 版本

#### 可用性

> 7.0+ 新增

  * **类型：** `IntlAvailability`


是否提供以下国际化功能：

  * `{boolean} dateTimeFormat`: 区域敏感的时间格式

  * `{boolean} numberFormat`: 区域敏感的数字格式

由于使用ECMAScript Internationalization API（ECMA-402）实现，上述国际化功能取决于[浏览器环境](http://kangax.github.io/compat-table/esintl/)

### 构造函数选项

你可以在下面指定 `I18nOptions` 构造函数的一些选项 [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### locale

  * **类型：** `Locale`

  * **默认值：** `'en-US'`

语言环境。

#### fallbackLocale

  * **类型：** `Locale`

  * **默认值：** `'en-US'`

预设的语言环境。

#### messages

  * **类型：** `LocaleMessages`

  * **默认值：** `{}`

本地化的语言环境信息。

#### dateTimeFormats

> 7.0+ 新增

  * **类型：** `DateTimeFormats`

  * **默认值：** `{}`

本地化的日期时间格式。

  * **请参阅:** `DateTimeFormats` type of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### numberFormats

> 7.0+ 新增

  * **类型：** `NumberFormats`

  * **默认值：** `{}`

本地化的数字格式。

  * **请参阅:** `NumberFormats` type of [flowtype definitions](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### availableLocales

> 8.9.0+ 新增

  * **类型：** `Locale[]`

  * **默认值：** `[]`

  * **Examples:** `["en", "ja"]`

以词法顺序排列的 `messages` 中的可用语言环境列表。

#### formatter

  * **类型：** `Formatter`

  * **默认值：** Built in formatter

使用 `Formatter` 接口实现的格式化。

#### missing

  * **类型：** `MissingHandler`

  * **默认值：** `null`

缺少本地化的处理程序。使用本地化目标语言环境，本地化关键字路径和 Vue 实例调用处理程序。

如果分配了未定义的异常处理程序，并且发生本地化未定义，则不会发出警告。

#### fallbackRoot

  * **类型：** `Boolean`

  * **默认值：** `true`

在组件本地化中，当本地化失败时是否回退到根级别（全局）本地化。

如果为 `false` ，则会发出警告，并返回关键字。

#### sync

  * **类型：** `Boolean`

  * **默认值：** `true`

是否将根级别语言环境与组件本地化语言环境同步。

如果为 `false` ，则无论根级别语言环境如何，都要为每个组件语言环境进行本地化。

#### silentTranslationWarn

> 6.1+

  * **类型：** `Boolean`

  * **默认值：** `false`

是否取消本地化失败时输出的警告。

如果为 `true` ，则禁止本地化失败警告。

#### silentFallbackWarn

> 8.8+ 新增

  * **类型：** `Boolean`
  * **默认值：** `false`

是否在回退到 `fallbackLocale` 或 `root` 时取消警告。

如果为true ，则仅在根本没有可用的转换时生成警告，而不是在回退时。

#### preserveDirectiveContent

> 8.7+

  * **类型：** `Boolean`

  * **默认值：** `false`

在指令解除绑定后， `v-t` 指令的元素是否应该保留 `textContent` 。

### Properties

#### locale

  * **类型：** `Locale`

  * **读取/写入**

语言环境。

#### fallbackLocale

  * **类型：** `Locale`

  * **读取/写入**

预设的语言环境。

#### messages

  * **类型：** `LocaleMessages`

  * **只读**

本地化的语言环境信息。

#### dateTimeFormats

> 7.0+ 新增

  * **类型：** `DateTimeFormats`

  * **只读**

本地化的日期时间格式。

#### numberFormats

> 7.0+ 新增

  * **类型：** `NumberFormats`

  * **只读**

本地化的数字格式。

#### missing

  * **类型：** `MissingHandler`

  * **读取/写入**

缺少本地化的处理程序。

#### formatter

  * **类型：** `Formatter`

  * **读取/写入**

使用 `Formatter` 接口实现的格式化。

#### silentTranslationWarn

> 6.1+

  * **类型：** `boolean`

  * **读取/写入**

是否取消本地化失败时输出的警告。

#### preserveDirectiveContent

> 8.7+

  * **类型：** `boolean`

  * **读取/写入**

在指令解除绑定后， `v-t` 指令的元素是否应该保留 `textContent` 。

### Methods

#### getChoiceIndex

  * **参数：**
    * `{number} choice`
    * `{number} choicesLength`

  * **Return:** `finalChoice {number}`

获取当前复数和给定选择数量的复数索引，可以通过原型变更覆盖：

```js
VueI18n.prototype.getChoiceIndex = /* 自定义实现 */
```

#### getLocaleMessage( locale )

  * **参数：**

    * `{Locale} locale`
  * **Return:** `LocaleMessageObject`

获取 locale 的语言环境信息。

#### setLocaleMessage( locale, message )

  * **参数：**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

设置 locale 的语言环境信息。

#### mergeLocaleMessage( locale, message )

> 6.1+

  * **参数：**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

将已注册的 `locale` 信息与语言环境的 `locale` 信息合并。

#### t( key, [locale], [values] )

  * **参数：**

    * `{Path} key`: 必填
    * `{Locale} locale`: 可选
    * `{Array | Object} values`: 可选
  * **Return:** : `TranslateResult`

这与 `$t` 方法返回的 `Function` 相同。 更多细节见 [$t](#t)。

#### i( key, [locale], [values] )

> 7.0+ 新增

  * **参数：**

    * `{Path} key`: 必填
    * `{Locale} locale`: 可选
    * `{Array} values`: 可选
  * **Return:** : `TranslateResult`

#### tc( key, [choice], [values] )

  * **参数：**

    * `{Path} key`: 必填
    * `{number} choice`: 可选, 默认为 1
    * `{string | Array | Object} values`: 可选
  * **Return:** `TranslateResult`

这与 `$c` 方法返回的 `Function` 相同。 更多细节见 [$c](#c)。

#### te( key, [locale] )

  * **参数：**

    * `{string} key`: 必填
    * `{Locale} locale`: 可选
  * **Return:** `boolean`

检查全局语言环境信息中是否存在 `key` 路径。 如果指定了 `locale` ，请检查 `locale` 的语言环境信息。

#### getDateTimeFormat ( locale )

> 7.0+ 新增

  * **参数：**

    * `{Locale} locale`
  * **Return:** `DateTimeFormat`

获取语言环境的日期时间格式。

#### setDateTimeFormat ( locale, format )

> 7.0+ 新增

  * **参数：**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

设置语言环境的日期时间格式。

#### mergeDateTimeFormat ( locale, format )

> 7.0+ 新增

  * **参数：**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

将已注册的日期时间格式与语言环境的日期时间格式合并。

#### d( value, [key], [locale] )

> 7.0+ 新增

  * **参数：**

    * `{number | Date} value`: 必填
    * `{Path | Object} key`: 可选
    * `{Locale | Object} locale`: 可选
  * **Return:** `DateTimeFormatResult`

这与 Vue 实例方法的 `$d` 方法相同。 更多细节见 [$d](#d)。

#### getNumberFormat ( locale )

> 7.0+ 新增

  * **参数：**

    * `{Locale} locale`
  * **Return:** `NumberFormat`

获取语言环境的数字格式。

#### setNumberFormat ( locale, format )

> 7.0+ 新增

  * **参数：**

    * `{Locale} locale`
    * `{NumberFormat} format`

设置语言环境的数字格式。

#### mergeNumberFormat ( locale, format )

> 7.0+ 新增

  * **参数：**

    * `{Locale} locale`
    * `{NumberFormat} format`

将已注册的数字格式与语言环境的数字格式合并。

#### n( value, [key], [locale] )

> 7.0+ 新增

  * **参数：**

    * `{number} value`: 必填
    * `{Path | Object} key`: 可选
    * `{Locale} locale`: 可选
  * **Return:** `NumberFormatResult`

这与 Vue 实例方法的 `$n` 方法相同。 更多细节见 [$n](#n)。

## 指令

> 7.3+ 新增

### v-t

  * **预期：** `string | Object`

  * **修饰符：**

    * `.preserve`: (8.7.0+) 当指令解除绑定时，保留元素 `textContent`。

  * **详细：**

更新使用语言环境信息进行本地化的元素 `textContent` 。 你可以使用字符串语法或对象语法。 字符串语法可以指定为语言环境信息的关键字路径。 如果可以使用对象语法，则需要将以下参数指定为对象键：

    * path: 必填, 语言环境信息的关键字
    * locale: 可选, 语言环境
    * args: 可选, 用于列表或命名格式

::::提示 注意
当 `v-t` 指令解除绑定时，默认情况下将清除元素 `textContent` 。 在使用[transitions](https://vuejs.org/v2/guide/transitions.html)的时候，这可能有不合理的情况. 在指令 `unbind` 之后保留 `textContent` 数据使用 `.preserve` 修饰符或global [`preserveDirectiveContent` option](#preservedirectivecontent).
::::
  * **示例：**
```html
<!-- 字符串语法：文字 -->
<p v-t="'foo.bar'"></p>

<!-- 字符串语法：通过数据或计算属性绑定 -->
<p v-t="msg"></p>

<!-- 对象语法： 文字 -->
<p v-t="{ path: 'hi', locale: 'ja', args: { name: 'kazupon' } }"></p>

<!-- 对象语法： 通过数据或计算属性绑定 -->
<p v-t="{ path: greeting, args: { name: fullName } }"></p>

<!-- 保留修饰符 -->
<p v-t.preserve="'foo.bar'"></p>
```

  * **请参阅:** [Custom directive localization](../guide/directive.md)

## 组件

### i18n 功能组件

> 7.0+ 新增

#### 参数：

  * `path {Path}`: 必填, 关于区域信息的关键字路径
  * `locale {Locale}`: 可选, 语言环境
  * `tag {string}`: 可选, 默认值 `span`
  * `places {Array | Object}`: 可选 (7.2+)

#### 用法：

```html
<div id="app">
  <!-- ... -->
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
  <!-- ... -->
</div>
```
```js
const messages = {
  en: {
    tos: 'Term of Service',
    term: 'I accept xxx {0}.'
  },
  ja: {
    tos: '利用規約',
    term: '私は xxx の{0}に同意します。'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

#### 请参阅：

[Component interpolation](../guide/interpolation.md)

## 特殊属性

### 地区

> 7.2+ 新增

#### 预期：`{number | string}`

用于组件插槽以指示列表格式的哪个索引或命名格式的关键字。

有关详细用法，请参阅下面链接的指南部分。

#### 请参阅:

[Component interpolation](../guide/interpolation.md)
