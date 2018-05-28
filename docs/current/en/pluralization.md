# Pluralization

You can translate with pluralization. You must define the locale that have a
pipe `|` separator, and define plurals in pipe separator.

Locale messages the below:
    
```js    
const messages = {
  en: {
    car: 'car | cars',
    apple: 'no apples | one apple | {count} apples'
  }
}
```

Template the below:

```html 
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>
    
<p>{{ $tc('apple', 0) }}</p>
<p>{{ $tc('apple', 1) }}</p>
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
```

Output the below:

```html 
<p>car</p>
<p>cars</p>
    
<p>no apples</p>
<p>one apple</p>
<p>10 apples</p>
```    
