# Locale Messages Syntax

Locale Messages syntax the bellow:

```javascript
// As Flowtype defnition, Locale Messages syntax like BNF annotation
type LocaleMessages = { [key: Locale]: LocaleMessageObject };
type LocaleMessageObject = { [key: Path]: LocaleMessage };
type LocaleMessageArray = LocaleMessage[];
type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
type Locale = string;
type Path = string;
```

Based on the above syntax, You can configure the bellow structure Locale Messages:

```json
{
  "en": {  // 'en' Locale
    "key1": "this is message1", // basic
    "nested": { // nested
      "message1": "this is nested message1"
    },
    errors: [ // array
      "this is 0 error code message",
      {  // array in object
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
