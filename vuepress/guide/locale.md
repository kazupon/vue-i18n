# Locale changing

Normally, Root Vue instance as the starting point, for all child components, it localize with `locale` option of `VueI18n` class.

Sometimes, you might dynamically change the locale. In that case, change the `locale` property of the `VueI18n` instance.


```js
const i18n = new VueI18n({
  locale: 'ja', // set locale
  ...
})

// create root Vue instance
new Vue({
  i18n,
  ...
}).$mount('#app')

// cheange other locale
i18n.locale = 'en'
```

For each the component, `VueI18n` instance injected at Root Vue instance is referenced as `$i18n` property, so you can change with it.

example:

```html
<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['ja', 'en'] }
  }
}
</script>
```

:::warning Notice
:warning: For components with using `sync: false`, locale changing is ignored it.
:::
