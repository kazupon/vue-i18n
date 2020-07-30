# 複数形化

複数形化を翻訳できます。パイプ `|` セパレーターを含む翻訳を定義し、パイプセパレーターの中に複数形を定義します。

*テンプレートでは `$t()` ではなく `$tc()` を使う必要があります。*

以下は翻訳メッセージ:

```js
const messages = {
  en: {
    car: 'car | cars',
    apple: 'no apples | one apple | {count} apples'
  }
}
```

以下はテンプレート:

```html
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>

<p>{{ $tc('apple', 0) }}</p>
<p>{{ $tc('apple', 1) }}</p>
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
```

以下は出力結果:

```html
<p>car</p>
<p>cars</p>

<p>no apples</p>
<p>one apple</p>
<p>10 apples</p>
```

## あらかじめ定義された引数で数字にアクセスする

複数形化のために数字を明示する必要はありません。あらかじめ定義された名前付き引数 `{count}` および/または `{n}` を介して、翻訳メッセージの中からアクセスできます。必要に応じて、これらの名前付き引数を上書きできます。

以下は翻訳メッセージ:

```js
const messages = {
  en: {
    apple: 'no apples | one apple | {count} apples',
    banana: 'no bananas | {n} banana | {n} bananas'
  }
}
```

以下はテンプレート:

```html
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
<p>{{ $tc('apple', 10) }}</p>

<p>{{ $tc('banana', 1, { n: 1 }) }}</p>
<p>{{ $tc('banana', 1) }}</p>
<p>{{ $tc('banana', 100, { n: 'too much' }) }}</p>
```

以下は出力結果:

```html
<p>10 apples</p>
<p>10 apples</p>

<p>1 banana</p>
<p>1 banana</p>
<p>too much bananas</p>
```


## カスタム複数形化

しかし、このような複数形化はすべての言語に適用されるわけではありません（例えばスラヴ語派は、異なる複数形化規則を持っています）。

これらの規則を実装するため、`VueI18n.prototype.getChoiceIndex` 関数を上書きできます。

スラヴ語派（ロシア語、ウクライナ語など）の規則を使った非常にシンプルな例:
```js
/**
 * @param choice {number} $tc への入力によって与えられる選択肢のインデックス: `$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} 利用可能な選択肢の数
 * @returns 複数形の単語を選ぶための最終的なインデックス
**/
VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
  // this === VueI18n インスタンス、locale プロパティもここにあります
  if (this.locale !== 'ru') {
    // デフォルトの実装に進む
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

これは事実上、以下のようになるでしょう:


```javascript
const messages = {
  ru: {
    car: '0 машин | 1 машина | {n} машины | {n} машин',
    banana: 'нет бананов | 1 банан | {n} банана | {n} бананов'
  }
}
```
書式は `0 things | 1 thing | few things | multiple things`.

テンプレートでは `$t()` ではなく、`$tc()`を使う必要があります:

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

結果は次の通りです:

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
