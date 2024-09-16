# 复数

你可以使用复数进行翻译。你必须定义具有管道 `|` 分隔符的语言环境，并在管道分隔符中定义复数。

*您的模板将需要使用 `$tc()` 而不是 `$t()`。

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

但是，这种多元化并不适用于所有语言（例如，斯拉夫语言具有不同的多元化规则）。

为了实现这些规则，您可以将可选的 `pluralizationRules` 对象传递给`VueI18n` 构造函数选项。

使用针对斯拉夫语言（俄语，乌克兰语等）的规则的非常简化的示例：
```js
new VueI18n({
  // Key - 在这种情况下，用于规则 `'ru'` 的语言
  // Value - 选择正确的复数形式的功能
  pluralizationRules: {
    /**
     * @param choice {number} 输入给$的选择索引 $tc：`$tc('path.to.rule', choiceIndex)`
     * @param choicesLength {number} 可用选择总数
     * @returns 最终选择索引以选择复数单词
     */
    'ru': function(choice, choicesLength) {
      // this === VueI18n 实例，因此本地属性也存在于此

      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;

      if (choicesLength < 4) {
        return (!teen && endsWithOne) ? 1 : 2;
      }
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }

      return (choicesLength < 4) ? 2 : 3;
    }
  }
})
```

这将有效地实现以下目的：

```javascript
const messages = {
  ru: {
    car: '0 машин | {n} машина | {n} машины | {n} машин',
    banana: 'нет бананов | {n} банан | {n} банана | {n} бананов'
  }
}
```
格式在哪里 `0 东西 | 事情以结尾结束 1 | 事情以结尾结束 2-4 | 事情以结尾结束 5-9, 0 和青少年 (10-19)`.
附言 斯拉夫多元化是困难的，您可以阅读有关它的更多信息 [这里](http://www.russianlessons.net/lessons/lesson11_main.php).

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

### 默认多元

如果在多元化地图中找不到您当前的语言环境，则将使用英语的 [默认](#复数) 规则。
