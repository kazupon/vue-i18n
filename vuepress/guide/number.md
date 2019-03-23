# Number localization

:::tip Support Version
:new: 7.0+
:::

You can localize the number with your definition formats.

Number formats the below:

```js
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

As the above, you can define the number format with name (e.g. `currency`, etc), and you need to use [the options with ECMA-402 Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)

After that like the locale messages, you need to specify the `numberFormats` option of `VueI18n` constructor:

```js
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

## Custom formatting

:::tip Support Version
:new: 8.10+
:::

`$n` method returns resulting string with fully formatted number, which can only be used as a whole. In situations when you need to style some part of the formatted number (like fraction digits), `$n` is not enough. In such cases `<i18n-n>` functional component will be of help.

With a minimum set of properties, `<i18n-n>` generates the same output as `$n`, wrapped into configured DOM element.

The following template:

```html
<div id="app">
  <i18n-n :value="100"></i18n-n>
  <i18n-n :value="100" format="currency"></i18n-n>
  <i18n-n :value="100" format="currency" locale="ja-JP"></i18n-n>
</div>
```

will produce output below:

```html
<div id="app">
  <span>100</span>
  <span>$100.00</span>
  <span>￥100</span>
</div>
```

But real power of this component comes into play when it is used with [scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots).

Lets say there is requirement to render integer part of the number with a bolder font. This can be achieved by specifying `integer` scoped slot element:

```html
<i18n-n :value="100" format="currency">
  <span v-slot:integer="slotProps" styles="font-weight: bold">{{ slotProps.integer }}</span>
</i18n-n>
```

Template above will result in the following HTML:

```html
<span>$<span styles="font-weight: bold">100</span>.00</span>
```

It is possible to specify multiple scoped slots at the same time:

```html
<i18n-n :value="1234" :format="{ key: 'currency', currency: 'EUR' }">
  <span v-slot:integer="slotProps" styles="font-weight: bold">{{ slotProps.integer }}</span>
  <span v-slot:group="slotProps" styles="font-weight: bold">{{ slotProps.group }}</span>
  <span v-slot:fraction="slotProps" styles="font-size: small">{{ slotProps.fraction }}</span>
</i18n-n>
```

(this resulting HTML was formatted for better readability)

```html
<span>
  €
  <span styles="font-weight: bold">1</span>
  <span styles="font-weight: bold">,</span>
  <span styles="font-weight: bold">234</span>
  .
  <span styles="font-size: small">00</span>
</span>
```

Full list of the supported scoped slots as well as other `<i18n-n>` properties can be found [on API page](../api/readme.md#i18n-n-functional-component).
