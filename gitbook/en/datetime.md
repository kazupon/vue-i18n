# DateTime localization

> :new: 7.0+

You can localize the datetime with your definition formats.

DateTime formats the below:

```javascript
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    }
  }
}
```

As the Above, You can define the datetime format with named (e.g. `short`, `long`, etc), and you need to use [the options with ECMA-402 Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)

After that like the locale messages, You need to specify the `dateTimeFormats` option of `VueI18n` constructor:

```javascript
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
  <p>Apr 19, 2017</p>
  <p>2017年4月19日(水) 午前2:19</p>
</div>
```
