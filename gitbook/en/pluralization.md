# Pluralization

You can translate with pluralization.  You must define a locale string that has a pipe `|` separator, and define plurals separated by a `|` pipe.

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
