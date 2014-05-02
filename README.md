# vue-i18n

Internationalization plugin of Vue.js


# Installing

```shell
    $ component install kazupon/vue-i18n
```


# Usage

```js
    var Vue = require('vue');
    var i18n = require('vue-i18n');

    // ready translated resources
    var resources = {
      en: {
        message: {
          hello: 'world'
        }
      },
      ja: {
        message: {
          hello: '世界'
        }
      }
    };

    // set plugin
    Vue.use(i18n, {
      lang: 'ja',
      resources: resources 
    });
```

```html
    <div class="message">
      <p v-t="message.hello"></p>
    </div>
```

# Testing

TODO: 


# License

See the `LICENSE`.
