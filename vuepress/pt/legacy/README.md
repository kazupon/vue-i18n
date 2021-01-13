# Migração da versão v5.x

## Configuração global

### Substituindo o lang

Use a opção `locale` ou a propriedade `VueI18n#locale` no construtor na instância `VueI18n`:

```js
  const i18n = new VueI18n({
    locale: 'en'
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // Alterando a localização
  i18n.locale = 'pt'
  // ou
  app.$i18n.locale = 'pt'
```

### Substituindo fallbackLang

Use a opção `fallbackLocale` ou propriedade `VueI18n#fallbackLocale` do construtor na instância `VueI18n`:

```js
  const i18n = new VueI18n({
    locale: 'pt',
    fallbackLocale: 'en'
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // Alterando a localização do fallback
  i18n.fallbackLocale = 'ru'
  // ou
  app.$i18n.fallbackLocale = 'ru'
```

### Substituindo missingHandler

Use a opção `missing` ou a propriedade `VueI18n#missing` no construtor na instância `VueI18n`:

```js
  const i18n = new VueI18n({
    // ...
    missing: (locale, key, vm, values) => {
      // Tratar as traduções que faltam
    }
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // Mudar manipulador para traduções ausentes
  i18n.missing = (locale, key, vm, values) => {
    // Tratar as traduções que faltam
  }
  // ou
  app.$i18n.missing = (locale, key, vm, values) => {
    // Tratar as traduções que faltam
  }
```

### Substituindo i18nFormatter

Use a opção `formatter` ou a propriedade `VueI18n#formatter` no construtor na instância `VueI18n`:

```js
  class CustomFormatter {
    format(message, ...values) {
      // Algum tipo de lógica ou tratamento
      return 'algum texto'
    }
  }

  const i18n = new VueI18n({
    // ...
    formatter: new CustomFormatter()
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // Alterando o formatador personalizado
  i18n.formatter = {
    format: (message, ...values) => {
      // Algum tipo de lógica ou tratamento
      return 'algum texto'
    }
  }
  // ou
  app.$i18n.formatter = {
    format: (message, ...values) => {
      // Algum tipo de lógica ou tratamento
      return 'algum texto'
    }
  }
```

## Métodos globais

### Substituindo Vue.locale

Use a opção `messages` ou os métodos `VueI18n#GetLocaleMessage` / `VueI18n#setLocaleMessage` no construtor na instância `VueI18n`:

```js
  const i18n = new VueI18n({
    // ...
    messages: {
      en: {
        hello: 'Hello World'
        // ...
      },
      pt: {
        hello: 'Olá Mundo'
        // ...
      }
    }
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // Obtendo mensagem local
  const en = i18n.getLocaleMessage('en')
  en.greeting = 'Hi!'
  // Definindo mensagem local
  i18n.setLocaleMessage('en', en)
  // ou
  const pt = app.$i18n.getLocaleMessage('pt')
  pt.greeting = 'Olá!'
  app.$i18n.setLocaleMessage('pt', pt)
```

### Substituindo Vue.t

Use o método `VueI18n#t`:

```js
  const i18n = new VueI18n({
    locale: 'pt',
    messages: {
      pt: {
        greeting: 'Olá {name}'
      }
    }
    // ...
  })

  i18n.t('greeting', { name: 'kazupon' }) // -> olá kazupon
```

### Substituindo Vue.tc

Use o método `VueI18n#tc`:

```js
  const i18n = new VueI18n({
    locale: 'pt',
    messages: {
      pt: {
        apple: 'sem maçãs | uma maçã | {count} maçãs'
      }
    }
    // ...
  })

  const count = 10
  i18n.tc('apple', count, { count }) // -> 10 maçãs
```

### Substituindo Vue.te

Use o método `VueI18n#te`:

```js
  const i18n = new VueI18n({
    locale: 'en',
    messages: {
      en: {
        hello: 'Hello World'
      }
    }
    // ...
  })

  i18n.te('hello') // -> true
  i18n.te('hallo', 'pt') // -> false
  i18n.te('hello') // -> true
```

## Opções do construtor

### Substituindo locales

Use a opção `messages` de `i18n` (para um componente) ou `messages` no construtor na instância `VueI18n`:

```js
  const i18n = new VueI18n({
    locale: 'pt',
    messages: {
      pt: {
        greeting: 'Olá {name}'
      }
    }
    // ...
  })

  // para componente
  const Component1 = {
    i18n: {
      messages: {
        pt: {
          title: 'Título 1'
        }
      }
    }
  }
```

## Propriedades na instância

### Substituindo \$lang

Use a propriedade `VueI18n#locale`:

```js
  const i18n = new VueI18n({
    locale: 'en'
    // ...
  })
  const app = new Vue({ i18n }).$mount('#app')

  // Alterando a localização
  i18n.locale = 'pt'
  // ou
  app.$i18n.locale = 'pt'
```

## Outras possibilidades

### Localização dinâmica removida

Se precisar definir mensagens de localização dinamicamente, você mesmo precisará adicionar a implementação:

```js
  const i18n = new VueI18n({ locale: 'pt' })
  const app = new Vue({
    i18n,
    data: { loading: '' }
  }).$mount('#app')

  function loadLocaleMessage(locale, cb) {
    return fetch('/locales/' + locale, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        if (Object.keys(json).length === 0) {
          return Promise.reject(new Error('localidade vazia !!'))
        } else {
          return Promise.resolve(json)
        }
      })
      .then(message => {
        cb(null, message)
      })
      .catch(error => {
        cb(error)
      })
  }

  app.loading = 'Carregando...'
  loadLocaleMessage('pt', (err, message) => {
    if (err) {
      app.loading = ''
      console.error(err)
      return
    }
    i18n.setLocaleMessage('pt', message)
    app.loading = ''
  })
```
