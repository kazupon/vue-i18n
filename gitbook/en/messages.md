# Locale messages syntax

## Structure

Locale Messages syntax the below:

```javascript
// As Flowtype defnition, Locale Messages syntax like BNF annotation
type LocaleMessages = { [key: Locale]: LocaleMessageObject };
type LocaleMessageObject = { [key: Path]: LocaleMessage };
type LocaleMessageArray = LocaleMessage[];
type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
type Locale = string;
type Path = string;
```

Based on the above syntax, You can configure the following structure Locale Messages:

```json
{
  "en": {  // 'en' Locale
    "key1": "this is message1", // basic
    "nested": { // nested
      "message1": "this is nested message1"
    },
    errors: [ // array
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

In the above Locale Messages structure,  You can translate with using below key paths.

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

Ouput the following:

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

```javascript
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

Template the below:

```html
<p>{{ $t('message.linked') }}</p>
```

Output the below:

```html
<p>DIO: the world !!!!</p>
```
