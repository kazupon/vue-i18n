# Pluralization

You can translate with pluralization.  You must define the locale that have a pipe `|` separator, and define plurals in pipe separator.

Locale messages the following:

```javascript
const messages = {
  en: {
    car: 'car | cars'
  }
}
```

Template the following:

```html
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>
```

Output the following:

```html
<p>car</p>
<p>cars</p>
```
