# Formatting

## HTML formatting
In some cases you might want to rendered your translation as an HTML message and not a static string.

```javascript
var messages = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  }
}
```

Template the following for Vue 1 (notice the triple brackets):
```html
<p>{{{ $t('message.hello') }}}</p>
```

Or for Vue 2 (triple brackets are deprecated in vue 2.0 and replaced by v-html):

```html
<p v-html="$t('message.hello')"></p>
```

Output the following (instead of the message pre formatted)

```html
<p>hello
<!--<br> exists but is rendered as html and not a string-->
world</p>
```

## Named formatting

Locale messages the following:

```javascript
var messages = {
  en: {
    message: {
      hello: '{msg} world'
    }
  }
}
```

Template the following:

```html
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

## List formatting

Locale messages the following:

```javascript
var messages = {
  en: {
    message: {
      hello: '{0} world'
    }
  }
}
```

Template the following:

```html
<p>{{ $t('message.hello', ['hello']) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

## Support ruby on rails i18n format

Locale messages the following:

```javascript
var messages = {
  en: {
    message: {
      hello: '%{msg} world'
    }
  }
}
```

Template the following:

```html
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

## Custom formatting
Sometimes, you maybe need to translate with custom formatting (e.g. [ICU message syntax](http://userguide.icu-project.org/formatparse/messages)).

You can realize with custom formatter that implement [Formatter Interface](https://github.com/kazupon/vue-i18n/blob/dev/decls/i18n.js#L41-L43).

The below custom formatter with ES2015 class syntax:

```javascript
// Custom Fromatter implementaion
class CustomFormatter {
 constructor (options) {
   // ...
 }

 format (message, ...args) {
   // implement formatting logic here
   // ...

   // return the resolved message string
   return 'resolved message string'
 }
}

// register with `formatter` option
const i18n = new VueI18n({
  locale: 'en-US',
  formatter: new CustomFormatter(/* here the constructor options */),
  messages: {
    'en-US': {
      // ...
    },
    // ...
  }
})

// Run!
new Vue({ i18n }).$mount('#app')
```

You can check [the custom formatter official example](https://github.com/kazupon/vue-i18n/tree/dev/examples/formatting/custom).
