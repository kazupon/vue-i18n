# Locale changing

Normally, using the root Vue instance as the starting point, all child components are localized using the `locale` property of the `VueI18n` class as a reference.

Sometimes you might want to dynamically change the locale. In that case you can change the value of the `locale` property of the `VueI18n` instance.


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

// change other locale
i18n.locale = 'en'
```

Each component contains a `VueI18n` instance referenced as the `$i18n` property that can also be used to change the locale.

Example:

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
:warning: Locale changing is ignored for components that use `sync: false`.
:::
