# Hot reloading

You can use Webpack's [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR) feature to watch for changes in localization files and hot reload changes into your application.

## Basic example

If you only use a static set of locales, you can hot reload those locales explicitly:

```js
import Vue from "vue"
import VueI18n from "vue-i18n"
import en from './en'
import ja from './ja'

const messages = {
  en,
  ja
}

// VueI18n instance
const i18n = new VueI18n({
  locale: 'en',
  messages
})

// Run app
const app = new Vue({
  i18n,
  // ...
}).$mount('#app')

// Hot updates
if (module.hot) {
  module.hot.accept(['./en', './ja'], function () {
    i18n.setLocaleMessage('en', require('./en').default)
    i18n.setLocaleMessage('ja', require('./ja').default)
    // Or the following hot updates via $i18n property
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ja', require('./ja').default)
  })
}
```

## Advanced example

If you want to support a changing set of locales, you can hot reload those locales dynamically using `require.context`:

```js
import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// Load all locales and remember context
function loadMessages() {
  const context = require.context("./locales", true, /[a-z0-9-_]+\.json$/i);

  const messages = context
    .keys()
    .map((key) => ({ key, locale: key.match(/[a-z0-9-_]+/i)[0] }))
    .reduce(
      (messages, { key, locale }) => ({
        ...messages,
        [locale]: context(key),
      }),
      {}
    );

  return { context, messages };
}

const { context, messages } = loadMessages();

// VueI18n instance
const i18n = new VueI18n({
  locale: "en",
  messages,
});

// Run app
const app = new Vue({
  i18n,
  // ...
}).$mount('#app');

// Hot updates
if (module.hot) {
  module.hot.accept(context.id, () => {
    const { messages: newMessages } = loadMessages();

    Object.keys(newMessages)
      .filter((locale) => messages[locale] !== newMessages[locale])
      .forEach((locale) => {
        messages[locale] = newMessages[locale];
        i18n.setLocaleMessage(locale, messages[locale]);
      });
  });
}
```
