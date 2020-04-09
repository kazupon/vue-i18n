# Синтаксис сообщений локализации

## Структура

Синтаксис сообщений локализации:

```typescript
// As Flowtype definition, Locale Messages syntax like BNF annotation
type LocaleMessages = { [key: Locale]: LocaleMessageObject };
type LocaleMessageObject = { [key: Path]: LocaleMessage };
type LocaleMessageArray = LocaleMessage[];
type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
type Locale = string;
type Path = string;
```

Используя синтаксис выше, можно создать следующую структуру сообщений локализации:

```json
{
  "en": {  // локализация 'en'
    "key1": "это сообщение 1", // обычное использование
    "nested": { // вложенное
      "message1": "это вложенное сообщение 1"
    },
    "errors": [ // массив
      "это сообщение кода ошибки 0",
      {  // объект в массиве
        "internal1": "это внутреннее сообщение кода ошибки 1"
      },
      [  // массив в массиве
        "это вложенный массив ошибки 1"
      ]
    ]
  },
  "ru": { // локализация 'ru'
    // ...
  }
}
```

Для такой структуры сообщений локализации, можно переводить сообщения используя ключи:

```html
<div id="app">
  <!-- обычное использование -->
  <p>{{ $t('key1') }}</p>
  <!-- вложенное -->
  <p>{{ $t('nested.message1') }}</p>
  <!-- массив -->
  <p>{{ $t('errors[0]') }}</p>
  <!-- объект в массиве -->
  <p>{{ $t('errors[1].internal1') }}</p>
  <!-- массив в массиве -->
  <p>{{ $t('errors[2][0]') }}</p>
</div>
```

Результат:

```html
<div id="app">
  <!-- обычное использование -->
  <p>это сообщение 1</p>
  <!-- вложенное -->
  <p>это вложенное сообщение 1</p>
  <!-- массив -->
  <p>это сообщение кода ошибки 0</p>
  <!-- объект в массиве -->
  <p>это внутреннее сообщение кода ошибки 1</p>
  <!-- массив в массиве -->
  <p>это вложенный массив ошибки 1</p>
</div>
```

## Связанные сообщения локализации

If there's a translation key that will always have the same concrete text as another one you can just link to it. To link to another translation key, all you have to do is to prefix its contents with an `@:` sign followed by the full name of the translation key including the namespace you want to link to.

Сообщения локализации:

```js
const messages = {
  en: {
    message: {
      the_world: 'the world',
      dio: 'DIO:',
      linked: '@:message.dio @:message.the_world !!!!'
    }
  }
}
```

Шаблон:

```html
<p>{{ $t('message.linked') }}</p>
```

Результат:

```html
<p>DIO: the world !!!!</p>
```

### Formatting linked locale messages

If the language distinguish cases of character, you may need control the case of the linked locale messages.
Linked messages can be formatted with modifier  `@.modifier:key`

The below modifiers are available currently.

* `upper`: Uppercase all characters in the linked message.
* `lower`: Lowercase all characters in the linked message.

Сообщения локализации:

```javascript
const messages = {
  en: {
    message: {
      homeAddress: 'Home address',
      missingHomeAddress: 'Please provide @.lower:message.homeAddress'
    }
  }
}
```

```html
<label>{{ $t('message.homeAddress') }}</label>

<p class="error">{{ $t('message.missingHomeAddress') }}</p>
```

Результат:

```html
<label>Home address</label>

<p class="error">Please provide home address</p>
```

You can add modifiers or overwrite the existing ones passing the `modifiers` options to the `VueI18n` constructor.

```javascript
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    // ...
  },
  modifiers: {
    snakeCase: (str) => str.split(' ').join('-')
  }
})
```


### Grouping by brackets

A translation key of linked locale message can also have the form of `@:(message.foo.bar.baz)` in which the link to another translation key is within brackets `()`.

This can be useful if the link `@:message.something` is followed by period `.`, which otherwise would be part of the link and may not need to be.

Locale messages:

```js
const messages = {
  en: {
    message: {
      dio: 'DIO',
      linked: 'There\'s a reason, you lost, @:(message.dio).'
    }
  }
}
```

Шаблон:

```html
<p>{{ $t('message.linked') }}</p>
```

Результат:

```html
<p>There's a reason, you lost, DIO.</p>
```
