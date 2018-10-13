# Pluralization

You can translate with pluralization. You must define the locale that have a pipe `|` separator, and define plurals in pipe separator.

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

## Accessing the number via the pre-defined argument

You don't need to explicitly give the number for pluralization.
The number can be accessed within locale messages via pre-defined named arguments `{count}` and/or `{n}`.
You can overwrite those pre-defined named arguments if necessary.

Locale messages the below:
    
```js    
const messages = {
  en: {
    apple: 'no apples | one apple | {count} apples',
    banana: 'no bananas | {n} banana | {n} bananas'
  }
}
```

Template the below:

```html 
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
<p>{{ $tc('apple', 10) }}</p>

<p>{{ $tc('banana', 1, { n: 1 }) }}</p>
<p>{{ $tc('banana', 1) }}</p>
<p>{{ $tc('banana', 100, { n: 'too much' }) }}</p>
```

Output the below:

```html 
<p>10 apples</p>
<p>10 apples</p>

<p>1 banana</p>
<p>1 banana</p>
<p>too much bananas</p>
```    





