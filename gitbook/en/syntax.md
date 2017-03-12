# Locale and KeyPath Syntax

You can use the bellow structure locale:

```json
{
  key1: 'this is message1', // basic
  nested: { // nested
    message1: 'this is nested message1'
  },
  errors: [ // array
    'this is 0 error code message',
    { // array in object
       inernal1: 'this is internal 1 error message'
    },
    [ // array in array
       'this is nested array error 1'
    ]
  ]
}
```

In the above locale structure,  You can translate with using below key paths.

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
