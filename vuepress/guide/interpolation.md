# Component interpolation

## Basic Usage

:::tip Support Version
:new: 7.0+
:::

Sometimes, we need to localize with a locale message that was included in a HTML tag or component. For example:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

In the above message, if you use `$t`, you will probably try to compose the following locale messages:

```js
const messages = {
  en: {
    term1: 'I Accept xxx\'s',
    term2: 'Terms of Service Agreement'
  }
}
```

And your localized template may look like this:

```html
<p>{{ $t('term1') }}<a href="/term">{{ $t('term2') }}</a></p>
```

Output:

```html
<p>I accept xxx <a href="/term">Terms of Service Agreement</a></p>
```

This is very cumbersome, and if you configure the `<a>` tag in a locale message, there is a possibility of XSS vulnerabilities due to localizing with
`v-html="$t('term')"`.

You can avoid it using the `i18n` functional component. For example:

```html
<div id="app">
  <!-- ... -->
  <i18n path="term" tag="label" for="tos">
    <a :href="url" target="_blank">{{ $t('tos') }}</a>
  </i18n>
  <!-- ... -->
</div>
```
```js
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

the following output:

```html
<div id="app">
  <!-- ... -->
  <label for="tos">
    I accept xxx <a href="/term" target="_blank">Term of Service</a>.
  </label>
  <!-- ... -->
</div>
```

About the above example, see the [example](https://github.com/kazupon/vue-i18n/tree/dev/examples/interpolation/places)

The children of `i18n` functional component are interpolated with locale message of `path` prop. In the above example,
:::v-pre
`<a :href="url" target="_blank">{{ $t('tos') }}</a>`
:::
is interpolated with `term` locale message.

In the above example, the component interpolation follows the **list formatting**.  The children of `i18n` functional component are interpolated by their order of appearance.

## Slots syntax usage

:::tip Support Version
:new: 8.14+
:::

It's more convenient to use the named slots syntax. For example:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <template v-slot:limit>
      <span>{{ changeLimit }}</span>
    </template>
    <template v-slot:action>
      <a :href="changeUrl">{{ $t('change') }}</a>
    </template>
  </i18n>
  <!-- ... -->
</div>
```

```js
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  i18n,
  data: {
    changeUrl: '/change',
    refundUrl: '/refund',
    changeLimit: 15,
    refundLimit: 30
  }
}).$mount('#app')
```

Outputs:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/change">change your flight</a> until <span>15</span> minutes from departure.
  </p>
  <!-- ... -->
</div>
```

In Vue 2.6 and later, you can use the following slots syntax in templates:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <template #limit>
      <span>{{ changeLimit }}</span>
    </template>
    <template #action>
      <a :href="changeUrl">{{ $t('change') }}</a>
    </template>
  </i18n>
  <!-- ... -->
</div>
```

:::warning Limitation
:warning: In `i18n` component, slots props are not supported.
:::


## Places syntax usage

:::danger Important!!
In the next major version, the `place` and `places` props will be deprecated. Please switch to slots syntax.
:::

:::tip Support Version
:new: 7.2+
:::

:::warning Notice
:warning: In `i18n` component, text content consisting of only white spaces will be omitted.
:::

Named formatting is supported with the help of `place` attribute. For example:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p">
    <span place="limit">{{ changeLimit }}</span>
    <a place="action" :href="changeUrl">{{ $t('change') }}</a>
  </i18n>
  <!-- ... -->
</div>
```
```js
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})
new Vue({
  i18n,
  data: {
    changeUrl: '/change',
    refundUrl: '/refund',
    changeLimit: 15,
    refundLimit: 30
  }
}).$mount('#app')
```

Outputs:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/change">change your flight</a> until <span>15</span> minutes from departure.
  </p>
  <!-- ... -->
</div>
```

:::warning Notice
:warning: To use named formatting, all children of `i18n` component must have `place` attribute set. Otherwise it will fallback to list formatting.
:::

If you still want to interpolate text content in named formatting, you could define `places` property on `i18n` component. For example:

```html
<div id="app">
  <!-- ... -->
  <i18n path="info" tag="p" :places="{ limit: refundLimit }">
    <a place="action" :href="refundUrl">{{ $t('refund') }}</a>
  </i18n>
  <!-- ... -->
</div>
```

Outputs:

```html
<div id="app">
  <!-- ... -->
  <p>
    You can <a href="/refund">refund your ticket</a> until 30 minutes from departure.
  </p>
  <!-- ... -->
</div>
```
