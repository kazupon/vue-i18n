# Linked translation

If there's a translation key that will always have the same concrete text as another one you can just link to it. To link to another translation key, all you have to do is to prefix its contents with an `@:` sign followed by the full name of the translation key including the namespace you want to link to.

Locale messages the following:

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

Template the following:

```html
<p>{{ $t('message.linked') }}</p>
```

Output the following:

```html
<p>DIO: the world !!!!</p>
```
