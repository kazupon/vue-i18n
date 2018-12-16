# Pluralization

You can translate with pluralization. You must define the locale that have a pipe `|` separator, and define plurals in pipe separator.

Make your your local strings like this:

```javascript
const messages = {
  en: {
    car: 'car | cars',
    apple: 'no apples | one apple | {count} apples'
  }
}
```
Where the format is `0 things | 1 thing | more than 1 thing`.

Your template needs to use `$tc()`, not `$t()`:

```html
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>

<p>{{ $tc('apple', 0) }}</p>
<p>{{ $tc('apple', 1) }}</p>
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
```
Note that if you need to pass in a variable, you might have to pass it in twice like in the last example above.

This will output the following HTML:

```html
<p>car</p>
<p>cars</p>

<p>no apples</p>
<p>one apple</p>
<p>10 apples</p>
```

---

## Custom pluralization

Such pluralization, however, does not apply to all languages (Slavic languages, for example, have different pluralization rules).

In order to implement these rules you can pass an optional `pluralizationRules` object into `VueI18n` constructor options.

Very simplified example using rules for Slavic languages (Russian, Ukrainian, etc.):
```js
new VueI18n({
  pluralizationRules: {
    /** Key - language to use the rule for, 'ru', in this case */
    /** Value - function
     * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
     * @param choicesLength {number} an overall amount of available choices
     * @returns a final choice index to select plural word by
     **/
    'ru': function (choice, choicesLength) {
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
});
```

This would effectively give this:

```javascript
const messages = {
  ru: {
    car: '0 машин | 1 машина | {n} машины | {n} машин',
    banana: 'нет бананов | 1 банан | {n} банана | {n} бананов'
  }
}
```
Where the format is `0 things | 1 thing | few things | multiple things`.

Your template still needs to use `$tc()`, not `$t()`:

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

Which results in:

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

If your current locale is not found in a pluralization map, the [default](#pluralization) rule of the english langugage will be used.
