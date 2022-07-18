# Lazy loading traduções

Carregar todos os seus arquivos de tradução de uma vez é exagero e desnecessário.

Lazy loading (carregamento lento) ou carregamento assíncrono de arquivos de tradução é muito fácil de implementar usando o Webpack.

Suponde que temos um diretório de projeto com a seguinte estrutura:

```
nosso-projeto-legal
-dist
-src
--routes
--store
--setup
---i18n-setup.js
--lang
---en.js
---it.js
```

O diretório `lang` contém todos os arquivos de tradução. Vários arquivos de configuração são agrupados no diretório `setup`, por exemplo, configurações i18n, registro de componentes globais, inicialização de plugin e muito mais.

```js
// i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/en'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // defenindo localidade
  fallbackLocale: 'en',
  messages // definindo mensagens de localização
})

const loadedLanguages = ['en'] // nosso idioma padrão que é pré-carregado

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // Se a localização for a mesma
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // Se a localização já foi carregada
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // Se a localização ainda não foi carregada
  return import(
    /* webpackChunkName: "lang-[request]" */ `@/i18n/messages/${lang}.js`
  ).then(messages => {
    i18n.setLocaleMessage(lang, messages.default)
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}
```

Em resumo, estamos criando uma nova instância `VueI18n` como normalmente faríamos. Então estamos criando um array `loadedLanguages` que irá manter o controle de nossos idiomas carregados. A seguir está função `setI18nLanguage` que realmente mudará a localização na instância vueI18n, axios e onde for necessário.

A função `loadLanguageAsync` será usada para alterar o idioma. O carregamento de novos arquivos é feito pela função `import` que o Webpack fornece e nos permite carregar arquivos dinamicamente, e por usar promessas podemos facilmente esperar que o carregamento termine.

Você pode aprender mais sobre a função de importações dinâmicas na [documentação do Webpack](https://webpack.js.org/guides/code-splitting/#dynamic-imports).

É muito fácil usar `loadLanguageAsync`. Por exemplo, no hook beforeEach do vue-router.

```js
router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})
```

Poderíamos melhorar isso verificando se `lang` é realmente suportado ou não e chamando `reject` para que possamos pegar isso no `beforeEach` parando a transição da rota de navegação.
