# Getting Started

```javascript
var Vue = require('vue')
var VueI18n = require('vue-i18n')

// ready translated locales
var locales = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// install plugin
Vue.use(VueI18n)


// set lang
Vue.config.lang = 'ja'

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

// create instance
new Vue({ el: 'body' })
```

Template the following:

```html
<p>{{ $t("message.hello") }}</p>
```

Output the following:

```html
<p>こんにちは、世界</p>
```

If you want to use `$t` in data property, methods or computed properties of a component, use `this.$t`:

```javascript
export defaults {
  data () {
    return {
      hello: this.$t("message.hello")
    }
  },
  computed: {
    computedHello () {
      return this.$t("message.hello")
    }
  },
  methods: {
    sayHello () {
      alert(this.$t("message.hello"))
    }
  }
}
```
