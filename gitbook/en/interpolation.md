# Component interpolation

> :new: 7.0+

Sometimes, we need to localize with locale message that was included HTML tag or component. For example:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

In the above message, if you use with `$t`, probably you may try to compose the following locale messages:

```javascript
const messages = {
  en: {
    term1: 'I Accept xxx\'s',
    term2: 'Terms of Service Agreement'
  }
}
```

And in the following, you may try to implement in template:

```html
<p>{{ $t('term1') }}<a href="/term">{{ $t('term2') }}</a></p>
```

output:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

This is very cumbersome, and if you configure the `<a>` tag in a locale message, there is a possibility XSS vulnerabilities due to localize with `v-html="$t('term')"`.

You can avoid it with using `i18n` functional component. For example:

```html
<div id="app">
  <!-- ... -->
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

```javascript
const messages = {
  en: {
    tos: 'Term of Service',
    term: 'I accept xxx {0}.'
  },
  ja: {
    tos: '利用規約',
    term: '私は xxx の{0}に同意します。'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    url: '/term'
  }
}).$mount('#app')
```

the following ouput:

```html
<div id="app">
  <!-- ... -->
  <label for="tos">
    I accept xxx <a href="/term" target="_blank">Term of Service</a>.
  </label>
  <!-- ... -->
</div>
```

About the above example, see the [example](https://github.com/kazupon/vue-i18n/tree/dev/examples/interpolation)

The children of `i18n` functional component is interpolated with locale message of `path` prop. In the above example, `<a :href="url" target="_blank">{{ $t('tos') }}</a>` is interplated with `term` locale message.

The component interpolations follows the **list formatting**. The named formatting is not support. The children of `i18n` functional component is interpolated with order of list formatting.
