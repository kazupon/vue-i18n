# Locale messages syntax

## Structure

Locale Messages syntax below:

```typescript
// As Flowtype definition, Locale Messages syntax like BNF annotation
type LocaleMessages = { [key: Locale]: LocaleMessageObject };
type LocaleMessageObject = { [key: Path]: LocaleMessage };
type LocaleMessageArray = LocaleMessage[];
type MessageContext = {
  list: (index: number) => mixed,
  named: (key: string) => mixed
};
type MessageFunction = (ctx: MessageContext) => string;
type LocaleMessage = string | MessageFunction | LocaleMessageObject | LocaleMessageArray;
type Locale = string;
type Path = string;
```

Based on the above syntax, You can configure the following Locale Messages structure:

```json
{
  "en": {  // 'en' Locale
    "key1": "this is message1", // basic
    "nested": { // nested
      "message1": "this is nested message1"
    },
    "errors": [ // array
      "this is 0 error code message",
      {  // object in array
        "internal1": "this is internal 1 error message"
      },
      [  // array in array
        "this is nested array error 1"
      ]
    ]
  },
  "ja": { // 'ja' Locale
    // ...
  }
}
```

In the above Locale Messages structure, You can translate using below key paths.

```html
<div id="app">
  <!-- basic -->
  <p>{{ $t('key1') }}</p>
  <!-- nested -->
  <p>{{ $t('nested.message1') }}</p>
  <!-- array -->
  <p>{{ $t('errors[0]') }}</p>
  <!-- object in array -->
  <p>{{ $t('errors[1].internal1') }}</p>
  <!-- array in array -->
  <p>{{ $t('errors[2][0]') }}</p>
</div>
```

Output the following:

```html
<div id="app">
  <!-- basic -->
  <p>this is message1</p>
  <!-- nested -->
  <p>this is nested message1</p>
  <!-- array -->
  <p>this is 0 error code message</p>
  <!-- object in array -->
  <p>this is internal 1 error message</p>
  <!-- array in array -->
  <p>this is nested array error 1</p>
</div>
```

## Linked locale messages

If there's a translation key that will always have the same concrete text as another one you can just link to it. To link to another translation key, all you have to do is to prefix its contents with an `@:` sign followed by the full name of the translation key including the namespace you want to link to.

Locale messages the below:

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

Template:

```html
<p>{{ $t('message.linked') }}</p>
```

Output:

```html
<p>DIO: the world !!!!</p>
```

### Formatting linked locale messages

If the language distinguish cases of character, you may need control the case of the linked locale messages.
Linked messages can be formatted with modifier `@.modifier:key`

The below modifiers are available currently.

* `upper`: Uppercase all characters in the linked message.
* `lower`: Lowercase all characters in the linked message.
* `capitalize`: Capitalize the first character in the linked message.

Locale messages the below:

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

Output the below:

```html
<label>Home address</label>

<p class="error">Please provide home address</p>
```

You can add modifiers or overwrite the existing ones passing the `modifiers` options to the `VueI18n` constructor.

```javascript
const i18n = new VueI18n({
  locale: 'en',
  modifiers: {
    // Adding a new modifier
    snakeCase: (str) => str.split(' ').join('-')
  },
  messages: {
    // ...
  },
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

Template:

```html
<p>{{ $t('message.linked') }}</p>
```

Output:

```html
<p>There's a reason, you lost, DIO.</p>
```

## Message Function

vue-i18n recommends using the string base on list or named format as locale messages when translating messages.

There are situations however, where you really need the full programmatic power of JavaScript, due to the complex language syntax. So instead of string-based messages, you can use the **message function**.

The following is a message function that returns a simple greeting:

```js
const messages = {
  en: {
    greeting: (ctx) => 'hello!'
  }
}
```

The use of the message function is very easy! You just specify the key of the message function with `$t` or `t`:

```html
<p>{{ $t('greeting') }}</p>
```

Output is the below:

```html
<p>hello!</p>
```

The message function outputs the message of the return value of the message function.

### Named formatting

vue-i18n supports [named formatting](./formatting.md#named-formatting) as a string-based message format. vue-i18n interpolate the parameter values with `$t` or `t`, and it can be output it.

You can do the same thing with the message function by using **message context**:

here is the example of greeting:

```js
const messages = {
  en: {
    greeting: (ctx) => `hello, ${ctx.named('name')}!`
  }
}
```

Template:

```html
<p>{{ $t('greeting', { name: 'DIO' }) }}</p>
```

Output is the below:

```html
<p>hello, DIO!</p>
```

The message context has a named function. You need to specify the key that resolves the value specified with the named of `$t` or `t`.

### List formatting

The use of the list format is similar to the named format described above.

vue-i18n supports [list formatting](./formatting.md#list-formatting) as a string-based message format. vue-i18n interpolate the parameter values with `$t` or `t`, and it can be output it.

You can do the same thing with the message function by using message context:

here is the example of greeting:

```js
const messages = {
  en: {
    greeting: (ctx) => `hello, ${ctx.list(0)}!`
  }
}
```

Template:

```html
<p>{{ $t('greeting', ['DIO']) }}</p>
```

Output is the below:

```html
<p>hello, DIO!</p>
```

The message context has a list function. You need to specify the index that resolves the value specified with the list of `$t` or `t`.

### Limitation

In the message function, the following functions, which are provided on a string basis, are not available via a message context:

- Linked locale messages
- Pluralization
