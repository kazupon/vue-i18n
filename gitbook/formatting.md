# Formatting

## HTML formatting
In some cases you might want to rendered your translation as an HTML message and not a static string.

```javascript
var locales = {
  en: {
    message: {
      hello: 'hello <br> world'
    }
  }
}
```

Template the following (notice the tripple brackets):

```html
<p>{{{ $t('message.hello') }}}</p>
```

Output the following (instead of the message pre formatted)

```html
<p>hello
<!--<br> exists but is rendered as html and not a string-->
world</p>
```

## Named formatting

Locale the following:

```javascript
var locales = {
  en: {
    message: {
      hello: '{msg} world'
    }
  }
}
```

Template the following:

```html
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

## List formatting

Locale the following:

```javascript
var locales = {
  en: {
    message: {
      hello: '{0} world'
    }
  }
}
```

Template the following:

```html
<p>{{ $t('message.hello', ['hello']) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

## Support ruby on rails i18n format

Locale the following:

```javascript
var locales = {
  en: {
    message: {
      hello: '%{msg} world'
    }
  }
}
```

Template the following:

```html
<p>{{ $t('message.hello', { msg: 'hello' }) }}</p>
```

Output the following:

```html
<p>hello world</p>
```

## Registering a custom formatter

If the provided formatter doesn't meet your needs, you can also register a custom formatter,

```javascript
Vue.config.i18nFormatter = function(string, ...arguments) {
  //...
  //return formattedString;
}
```