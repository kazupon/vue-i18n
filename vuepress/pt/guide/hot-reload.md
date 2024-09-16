# Hot reloading

Você pode usar o recurso [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/), você pode rastrear as mudanças em arquivos de localização e recarregá-los automaticamente em seu aplicativo.

## Exemplo básico

Para um conjunto estático de localidades, você pode especificar explicitamente o recarregamento automático dessas traduções:

```js
import Vue from "vue"
import VueI18n from "vue-i18n"
import en from './en'
import pt from './pt'

const messages = {
  en,
  pt
}

// Instância VueI18n
const i18n = new VueI18n({
  locale: 'en',
  messages
})

// Iniciando aplicativo
const app = new Vue({
  i18n
  // ...
}).$mount('#app')

// Atualizações automática
if (module.hot) {
  module.hot.accept(['./en', './pt'], function() {
    i18n.setLocaleMessage('en', require('./en').default)
    i18n.setLocaleMessage('pt', require('./pt').default)
    // Ou adicione um recarregamento automático por meio da propriedade $i18n
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('pt', require('./pt').default)
  })
}
```

## Exemplo avançado

Se precisar de suporte para uma mudança no conjunto de traduções, você pode implementar o recarregamento automático para todos os locais dinamicamente usando `require.context`:

```js
import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// Carregue todos os locais e lembre-se do contexto
function loadMessages() {
  const context = require.context("./locales", tpte, /[a-z0-9-_]+\.json$/i);

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

// Instância VueI18n
const i18n = new VueI18n({
  locale: "en",
  messages,
});

// Iniciando aplicativo
const app = new Vue({
  i18n,
  // ...
}).$mount('#app');

// Atualizações automática
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
