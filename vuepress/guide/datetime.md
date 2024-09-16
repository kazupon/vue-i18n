# DateTime localization

:::tip Support Version
:new: 7.0+
:::

You can localize the datetime with your definition formats.

DateTime formats the below:

```js
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  }
}
```

As seen above, you can define named datetime format (e.g. `short`, `long`, etc), and you need to use [the options with ECMA-402 Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)

After that, when using the locale messages, you need to specify the `dateTimeFormats` option of the `VueI18n` constructor:

```js
const i18n = new VueI18n({
  dateTimeFormats
})

new Vue({
  i18n
}).$mount('#app')
```

Template the below:

```html
<div id="app">
  <p>{{ $d(new Date(), 'short') }}</p>
  <p>{{ $d(new Date(), 'long', 'ja-JP') }}</p>
</div>
```

Output the below:

```html
<div id="app">
  <p>Jan 18, 2021</p>
  <p>2021年1月18日日曜日 午前5:47</p>
</div>
```
