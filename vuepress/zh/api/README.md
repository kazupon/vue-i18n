---
sidebar: auto
---

# API参考

## 扩展 Vue

### Vue 构造函数选项

#### i18n

  * **类型：**`I18nOptions`

基于组件的本地化选项

  * **请参阅：**`VueI18n` 类构造函数选项

### Vue 注入方法

#### $t

  * **参数：**

    * `{Path} key`：必填
    * `{Locale} locale`：可选
    * `{Array | Object} values`：可选
  * **返回值：**`TranslateResult`

本地化语言环境信息 `key`，在本地化时组件的语言环境信息优先于全局语言环境信息。如果未指定组件的语言环境信息，就使用全局语言环境信息进行本地化。如果你指定了 `locale` 参数，则使用 `locale` 提供的语言环境进行本地化。如果你为列表/格式化的语言环境信息指定了 `key`，就必须同时指定 `values`。有关 `values` 的详细信息，请参阅[格式化](../guide/formatting.md)。

:::danger 提示
注意，你需要在生命周期方法中保证上下文是组件实例 (例如在 `data` 选项中，`const $t = this.$t.bind(this)`)。
:::

#### $tc

  * **参数：**

    * `{Path} key`：必填
    * `{number} choice`：可选，默认为 1
    * `{Locale} locale`：可选
    * `{string | Array | Object} values`：可选
  * **返回值：**`TranslateResult`

以复数形式将语言环境信息 `key` 本地化。在本地化时组件的语言环境信息优先于全局语言环境信息。如果未指定组件的语言环境信息，就使用全局语言环境信息进行本地化。如果你指定了 `locale` 参数，则使用 `locale` 提供的语言环境进行本地化。如果将 `values` 指定为字符串，则该字符串会作为语言环境信息进行本地化。如果将 `values` 指定为 Array 或 Object，则格式必须为 `$t` 的 `values`。

:::danger 提示
注意，你需要在生命周期方法中保证上下文是组件实例 (例如在 `data` 选项中，`const $tc = this.$tc.bind(this)`)
:::

#### $te

  * **参数：**

    * `{Path} key`：必填
    * `{Locale} locale`：可选
  * **返回值：**`boolean`

检查 key 是否存在。在 Vue 实例中，如果未指定组件语言环境信息，则使用全局语言环境信息。如果指定了 `locale`，则使用 `locale` 的语言环境。

:::danger 提示
注意，你需要在生命周期方法中保证上下文是组件实例 (例如在 `data` 选项中，`const $te = this.$te.bind(this)`)。
:::

#### $d

> :new: 7.0 新增

  * **参数：**

    * `{number | Date} value`：必填
    * `{Path | Object} key`：可选
    * `{Locale | Object} locale`：可选
  * **返回值：**`DateTimeFormatResult`

将日期时间 `value` 以 `key` 的格式本地化。日期时间格式 `key` 需要注册到 `VueI18n` 类的 `dateTimeFormats` 选项，并依赖于 `VueI18n` 构造函数的 `locale` 选项。如果要指定 `locale` 参数，它将优先于 `VueI18n` 构造函数的 `locale` 选项。

如果 `dateTimeFormats` 选项中不存在日期时间格式的 `key`，则根据 `VueI18n` 构造函数的 `fallbackLocale` 选项回退。

:::danger 提示
注意，你需要在生命周期方法中保证上下文是组件实例 (例如在 `data` 选项中，`const $d = this.$d.bind(this)`)。
:::

#### $n

> :new: 7.0 新增

  * **参数：**

    * `{number} value`：必填
    * `{Path | Object} key`：可选
    * `{Locale} locale`：可选
  * **返回值：**`NumberFormatResult`

将数字 `value` 以 `key` 的格式本地化。数字格式 `key` 需要注册到 `VueI18n` 类的 `numberFormats` 选项，并依赖于 `VueI18n` 构造函数的 `locale` 选项。如果要指定 `locale` 参数，它将优先于 `VueI18n` 构造函数的 `locale` 选项。

如果 `numberFormats` 选项中不存在用数字格式 `key`，则根据 `VueI18n` 构造函数的 `fallbackLocale` 选项回退。

如果第二个 `key` 参数指定为对象，则它应具有以下属性：

* `key {Path}`：可选，数字格式
* `locale {Locale}`：可选，语言环境
* `style {string}`：可选，数字格式选项
* `currency {string}`：可选，数字格式选项
* `currencyDisplay {string}`：可选，数字格式选项
* `useGrouping {string}`：可选，数字格式选项
* `minimumIntegerDigits {string}`：可选，数字格式选项
* `minimumFractionDigits {string}`：可选，数字格式选项
* `maximumFractionDigits {string}`：可选，数字格式选项
* `minimumSignificantDigits {string}`：可选，数字格式选项
* `maximumSignificantDigits {string}`：可选，数字格式选项
* `localeMatcher {string}`：可选，数字格式选项
* `formatMatcher {string}`：可选，数字格式选项

任何指定数字的格式选项将优先于 `VueI18n` 构造函数的 `numberFormats`。

:::danger 提示
注意，你需要在生命周期方法中保证上下文是组件实例 (例如在 `data` 选项中，`const $n = this.$n.bind(this)`)。
:::

### 注入属性

#### $i18n

  * **类型：**`I18n`

  * **只读**

若已经指定了 `VueI18n` 实例，则将其返回。

如果在组件选项中指定了 `i18n` 选项，则可以在组件上获得 `VueI18n` 实例，否则，你将获得 `VueI18n` 的根实例。

## `VueI18n` 类

`Vuei18n` 类实现了 `I18n` [flowtype 接口](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

### 静态属性

#### 版本

  * **类型：**`string`

vue-i18n 版本

#### 可用性

> :new: 7.0 新增

  * **类型：**`IntlAvailability`

是否提供以下国际化功能：

  * `{boolean} dateTimeFormat`：环境敏感的时间格式

  * `{boolean} numberFormat`：环境敏感的数字格式

由于使用 ECMAScript Internationalization API (ECMA-402) 实现，上述国际化功能取决于[浏览器环境](http://kangax.github.io/compat-table/esintl/)。

### 构造函数选项

你可以基于[flowtype 定义](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js) 中的 `I18nOptions` 指定下列构造函数选项

#### locale

  * **类型：**`Locale`

  * **默认值：**`'en-US'`

语言环境。

#### fallbackLocale

  * **类型：**`Locale`

  * **默认值：**`'en-US'`

预设的语言环境。

#### messages

  * **类型：**`LocaleMessages`

  * **默认值：**`{}`

本地化的语言环境信息。

#### dateTimeFormats

> :new: 7.0 新增

  * **类型：**`DateTimeFormats`

  * **默认值：**`{}`

本地化的日期时间格式。

  * **请参阅：**`DateTimeFormats` 类型的[flowtype 接口](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### numberFormats

> :new: 7.0 新增

  * **类型：**`NumberFormats`

  * **默认值：**`{}`

本地化的数字格式。

  * **请参阅：**`NumberFormats` 类型的[flowtype 接口](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js)

#### availableLocales

> :new: 8.9.0 新增

  * **类型：**`Locale[]`

  * **默认值：**`[]`

  * **示例：**`["en", "ja"]`

以词法顺序排列的 `messages` 中的可用语言环境列表。

#### formatter

  * **类型：**`Formatter`

  * **默认值：** Built in formatter

使用 `Formatter` 接口实现的格式化。

#### missing

  * **类型：**`MissingHandler`

  * **默认值：**`null`

缺少本地化时的处理函数。该处理函数在被调用时会使用本地化目标语言环境，本地化路径关键字和 Vue 实例。

如果设置了该函数，则本地化信息未定义时不会产生警告。

#### fallbackRoot

  * **类型：**`Boolean`

  * **默认值：**`true`

在组件本地化中，当本地化失败时是否回退到根级别 (全局) 本地化。

如果为 `false`，则会发出警告，并返回 key。

#### sync

  * **类型：**`Boolean`

  * **默认值：**`true`

是否将根级别语言环境与组件本地化语言环境同步。

如果为 `false`，则无论根级别语言环境如何，都要为每个组件语言环境进行本地化。

#### silentTranslationWarn

> 6.1 新增

  * **类型：**`Boolean`

  * **默认值：**`false`

是否取消本地化失败时输出的警告。

如果为 `true`，则禁止本地化失败警告。

#### silentFallbackWarn

> :new: 8.8 新增

  * **类型：**`Boolean`
  * **默认值：**`false`

是否在回退到 `fallbackLocale` 或 `root` 时取消警告。

如果为 `true`，则仅在根本没有可用的转换时生成警告，而不是在回退时。

#### preserveDirectiveContent

> 8.7 新增

  * **类型：**`Boolean`

  * **默认值：**`false`

在指令解除绑定后，`v-t` 指令的元素是否应该保留 `textContent`。

### Properties

#### locale

  * **类型：**`Locale`

  * **可读/可写**

语言环境。

#### fallbackLocale

  * **类型：**`Locale`

  * **可读/可写**

预设的语言环境。

#### messages

  * **类型：**`LocaleMessages`

  * **只读**

本地化的语言环境信息。

#### dateTimeFormats

> :new: 7.0 新增

  * **类型：**`DateTimeFormats`

  * **只读**

本地化的日期时间格式。

#### numberFormats

> :new: 7.0 新增

  * **类型：**`NumberFormats`

  * **只读**

本地化的数字格式。

#### missing

  * **类型：**`MissingHandler`

  * **可读/可写**

缺少本地化时的处理函数。

#### formatter

  * **类型：**`Formatter`

  * **可读/可写**

使用 `Formatter` 接口实现的格式化。

#### silentTranslationWarn

> 6.1 新增

  * **类型：**`boolean`

  * **可读/可写**

是否取消本地化失败时输出的警告。

#### preserveDirectiveContent

> 8.7 新增

  * **类型：**`boolean`

  * **可读/可写**

在指令解除绑定后，`v-t` 指令的元素是否应该保留 `textContent`。

### 方法

#### getChoiceIndex

  * **参数：**
    * `{number} choice`
    * `{number} choicesLength`

  * **返回值：**`finalChoice {number}`

根据当前的数字和一组给定的选项，获取其复数索引，可以通过原型变更覆盖：

```js
VueI18n.prototype.getChoiceIndex = /* 自定义实现 */
```

#### getLocaleMessage( locale )

  * **参数：**

    * `{Locale} locale`
  * **返回值：**`LocaleMessageObject`

获取语言环境的 `locale` 信息。

#### setLocaleMessage( locale, message )

  * **参数：**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

设置语言环境的 `locale` 信息。

#### mergeLocaleMessage( locale, message )

> 6.1 新增

  * **参数：**

    * `{Locale} locale`
    * `{LocaleMessageObject} message`

将语言环境信息 `locale` 合并到已注册的语言环境信息中。

#### t( key, [locale], [values] )

  * **参数：**

    * `{Path} key`：必填
    * `{Locale} locale`：可选
    * `{Array | Object} values`：可选
  * **返回值：**：`TranslateResult`

这与 `$t` 方法返回的 `Function` 相同。更多细节见[$t](#t)。

#### tc( key, [choice], [values] )

  * **参数：**

    * `{Path} key`：必填
    * `{number} choice`：可选，默认为 1
    * `{string | Array | Object} values`：可选
  * **返回值：**`TranslateResult`

这与 `$tc` 方法返回的 `Function` 相同。更多细节见[$tc](#tc)。

#### te( key, [locale] )

  * **参数：**

    * `{string} key`：必填
    * `{Locale} locale`：可选
  * **返回值：**`boolean`

检查全局语言环境信息中是否存在键名路径。如果指定了 `locale`，请检查语言环境信息 `locale`。

#### getDateTimeFormat ( locale )

> :new: 7.0 新增

  * **参数：**

    * `{Locale} locale`
  * **返回值：**`DateTimeFormat`

获取语言环境的日期时间格式。

#### setDateTimeFormat ( locale, format )

> :new: 7.0 新增

  * **参数：**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

设置语言环境的日期时间格式。

#### mergeDateTimeFormat ( locale, format )

> :new: 7.0 新增

  * **参数：**

    * `{Locale} locale`
    * `{DateTimeFormat} format`

将已注册的日期时间格式与语言环境的日期时间格式合并。

#### d( value, [key], [locale] )

> :new: 7.0 新增

  * **参数：**

    * `{number | Date} value`：必填
    * `{Path | Object} key`：可选
    * `{Locale | Object} locale`：可选
  * **返回值：**`DateTimeFormatResult`

这与 Vue 实例方法的 `$d` 方法相同。更多细节见[$d](#d)。

#### getNumberFormat ( locale )

> :new: 7.0 新增

  * **参数：**

    * `{Locale} locale`
  * **返回值：**`NumberFormat`

获取语言环境的数字格式。

#### setNumberFormat ( locale, format )

> :new: 7.0 新增

  * **参数：**

    * `{Locale} locale`
    * `{NumberFormat} format`

设置语言环境的数字格式。

#### mergeNumberFormat ( locale, format )

> :new: 7.0 新增

  * **参数：**

    * `{Locale} locale`
    * `{NumberFormat} format`

将已注册的数字格式与语言环境的数字格式合并。

#### n( value, [key], [locale] )

> :new: 7.0 新增

  * **参数：**

    * `{number} value`：必填
    * `{Path | Object} key`：可选
    * `{Locale} locale`：可选
  * **返回值：**`NumberFormatResult`

这与 Vue 实例方法的 `$n` 方法相同。更多细节见[$n](#n)。

## 指令

> :new: 7.3 新增

### v-t

  * **预期：**`string | Object`

  * **修饰符：**

    * `.preserve`：(8.7.0 新增) 当指令解除绑定时，保留元素 `textContent`。

  * **详细：**

更新使用语言环境信息进行本地化的元素 `textContent`。你可以使用字符串语法或对象语法。字符串语法可以指定为语言环境信息的关键字路径。如果可以使用对象语法，则需要将以下参数指定为对象键：

    * `path`：必填，语言环境信息的关键字
    * `locale`：可选，语言环境
    * `args`：可选，用于列表或命名格式

::::tip 注意
当 `v-t` 指令解除绑定时，默认情况下将清除元素 `textContent`。在[过渡动画](https://cn.vuejs.org/v2/guide/transitions.html)内部使用的时候，可能出现不合预期的情况。为了在指令解除绑定之后保留 `textContent` 数据，可使用 `.preserve` 修饰符或全局的 [`preserveDirectiveContent` 选项](#preservedirectivecontent)。
::::
  * **示例：**
```html
<!-- 字符串语法：字面量 -->
<p v-t="'foo.bar'"></p>

<!-- 字符串语法：通过数据或计算属性绑定 -->
<p v-t="msg"></p>

<!-- 对象语法： 字面量 -->
<p v-t="{ path: 'hi', locale: 'ja', args: { name: 'kazupon' } }"></p>

<!-- 对象语法： 通过数据或计算属性绑定 -->
<p v-t="{ path: greeting, args: { name: fullName } }"></p>

<!-- `preserve` 修饰符 -->
<p v-t.preserve="'foo.bar'"></p>
```

  * **请参阅：**[自定义指令本地化](../guide/directive.md)

## 组件

### i18n 函数式组件

> :new: 7.0 新增

#### 参数：

  * `path {Path}`：必填，关于语言环境信息的键名路径
  * `locale {Locale}`：可选，语言环境
  * `tag {string}`：可选，默认值 `span`
  * `places {Array | Object}`：可选 (7.2 新增)

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

[组件插值](../guide/interpolation.md)

## 特殊属性

### 地区

> :new: 7.2 新增

#### 预期：`{number | string}`

用于组件插槽，指示格式列表的索引值或具名格式的关键字。

有关详细用法，请参阅下面链接的指南部分。

#### 请参阅：

[组件插值](../guide/interpolation.md)
