# 复数

你可以使用复数进行翻译。你必须定义具有管道 `|` 分隔符的语言环境，并在管道分隔符中定义复数。

语言环境信息如下：

```js
const messages = {
  en: {
    car: 'car | cars',
    apple: 'no apples | one apple | {count} apples'
  }
}
```

模板如下：

```html
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>

<p>{{ $tc('apple', 0) }}</p>
<p>{{ $tc('apple', 1) }}</p>
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
```

输出如下：

```html
<p>car</p>
<p>cars</p>

<p>no apples</p>
<p>one apple</p>
<p>10 apples</p>
```

## 通过预定义的参数访问该数字

你无需明确指定复数的数字。可以通过预定义的命名参数 `{count}` 和/或 `{n}` 在语言环境信息中访问该数字。如有必要，你可以覆盖这些预定义的命名参数。

语言环境信息如下：

```js
const messages = {
  en: {
    apple: 'no apples | one apple | {count} apples',
    banana: 'no bananas | {n} banana | {n} bananas'
  }
}
```

模板如下：

```html
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
<p>{{ $tc('apple', 10) }}</p>

<p>{{ $tc('banana', 1, { n: 1 }) }}</p>
<p>{{ $tc('banana', 1) }}</p>
<p>{{ $tc('banana', 100, { n: 'too many' }) }}</p>
```

输出如下：

```html
<p>10 apples</p>
<p>10 apples</p>

<p>1 banana</p>
<p>1 banana</p>
<p>too many bananas</p>
```


## 自定义复数

然而，这种复数并不适用于所有语言 (例如，斯拉夫语言具有不同的复数规则)。

为了实现这些规则，你可以覆盖 `VueI18n.prototype.getChoiceIndex` 函数。

使用斯拉夫语言规则的简化示例 (俄语、乌克兰语等)：
```js

const defaultImpl = VueI18n.prototype.getChoiceIndex

/**
 * @param choice {number} 由 $tc 输入的选择索引：`$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} 总体可用选择
 * @returns 选择复数单词的最终选择索引
**/
VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
  // this === VueI18n 实例，所以语言环境属性也存在于此处
  if (this.locale !== 'ru') {
    // 继续执行默认实现
    return defaultImpl.apply(this, arguments)
  }

  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;

  if (!teen && endsWithOne) {
    return 1;
  }

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return (choicesLength < 4) ? 2 : 3;
}
```

这将有效地实现这一目标：


```javascript
const messages = {
  ru: {
    car: '0 машин | 1 машина | {n} машины | {n} машин',
    banana: 'нет бананов | 1 банан | {n} банана | {n} бананов'
  }
}
```
格式为 `0 things | 1 thing | few things | multiple things`.

你的模板仍然需要使用 `$tc()`，而不是 `$t()` ：

```html
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>
<p>{{ $tc('car', 4) }}</p>
<p>{{ $tc('car', 12) }}</p>
<p>{{ $tc('car', 21) }}</p>

<p>{{ $tc('banana', 0) }}</p>
<p>{{ $tc('banana', 4) }}</p>
<p>{{ $tc('banana', 11) }}</p>
<p>{{ $tc('banana', 31) }}</p>
```

结果如下：

```html
<p>1 машина</p>
<p>2 машины</p>
<p>4 машины</p>
<p>12 машин</p>
<p>21 машина</p>

<p>нет бананов</p>
<p>4 банана</p>
<p>11 бананов</p>
<p>31 банан</p>
```
