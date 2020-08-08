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

Such pluralization, however, does not apply to all languages (Slavic languages, for example, have different pluralization rules).

In order to implement these rules you can pass an optional `pluralizationRules` object into `VueI18n` constructor options.

Very simplified example using rules for Slavic languages (Russian, Ukrainian, etc.):
```js
new VueI18n({
  // Key - language to use the rule for, `'ru'`, in this case
  // Value - function to choose right plural form
  pluralizationRules: {
    /**
     * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
     * @param choicesLength {number} an overall amount of available choices
     * @returns a final choice index to select plural word by
     */
    'ru': function(choice, choicesLength) {
      // this === VueI18n instance, so the locale property also exists here

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

This would effectively give this:

```javascript
const messages = {
  ru: {
    car: '0 машин | {n} машина | {n} машины | {n} машин',
    banana: 'нет бананов | {n} банан | {n} банана | {n} бананов'
  }
}
```
Where the format is `0 things | things count ends with 1 | things count ends with 2-4 | things count ends with 5-9, 0 and teens (10-19)`.
P.S. Slavic pluralization is a pain, you can read more about it [here](http://www.russianlessons.net/lessons/lesson11_main.php).

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

### Default pluralization

If your current locale is not found in a pluralization map, the [default](#pluralization) rule of the english language will be used.
