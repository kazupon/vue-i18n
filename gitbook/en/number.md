# Number localization

> :new: 7.0+

You can localize the number with your definition formats.

Number formats the below:

```javascript
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'ja-JP': {
    currency: {
      style: 'currency', currency: 'JPY', currencyDisplay: 'symbol'
    }
  }
}
```

As the Above, You can define the number format with named (e.g. `currency`, etc), and you need to use [the options with ECMA-402 Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)

After that like the locale messages, You need to specify the `numberFormats` option of `VueI18n` constructor:

```javascript
const i18n = new VueI18n({
  numberFormats
})

new Vue({
  i18n
}).$mount('#app')
```

Template the below:

```html
<div id="app">
  <p>{{ $n(100, 'currency') }}</p>
  <p>{{ $n(100, 'currency', 'ja-JP') }}</p>
</div>
```

Output the below:

```html
<div id="app">
  <p>$100.00</p>
  <p>￥100</p>
</div>
```
