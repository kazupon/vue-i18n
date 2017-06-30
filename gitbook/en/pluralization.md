# Pluralization

You can translate with pluralization.  You must define the locale that have a pipe `|` separator, and define plurals in pipe separator.

Locale messages the below:

```javascript
const messages = {
  en: {
    car: 'car | cars'
  }
}
```

Template the below:

```html
<p>{{ $tc('car', 0) }}</p>
<p>{{ $tc('car', 1) }}</p>
```

Output the below:

```html
<p>car</p>
<p>cars</p>
```
