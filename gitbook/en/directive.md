# Custom directive localization

> :new: 7.3+

You can be translated not only with `v-t` custom directive, but also with `$t` method.

## String syntax

You can be passed the keypath of locale messages with string syntax.

Javascript:

```javascript
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi there!' },
      ja: { hello: 'こんにちは！' }
    }
  }),
  data: { path: 'hello' }
}).$mount('#string-syntax')
```

Templates:

```html
<div id="string-syntax">
  <!-- string literal -->
  <p v-t="'hello'"></p>
  <!-- keypath biniding via data -->
  <p v-t="path"></p>
</div>
```

Outputs:

```html
<div id="string-syntax">
  <p>hi there!</p>
  <p>hi there!</p>
</div>
```

## Object syntax

You can be used with object syntax.

Javascript:

```javascript
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi {name}!' },
      ja: { hello: 'こんにちは、{name}！' }
    }
  }),
  computed: {
    nickName () { return 'kazupon' }
  },
  data: { path: 'hello' }
}).$mount('#object-syntax')
```

Templates:

```html
<div id="object-syntax">
  <!-- literal -->
  <p v-t="{ path: 'hello', locale: 'ja', args: { name: 'kazupon' } }"></p>
  <!-- data biniding via data -->
  <p v-t="{ path: path, args: { name: nickName } }"></p>
</div>
```

Outputs:

```html
<div id="object-syntax">
  <p>こんにちは、kazupon！</p>
  <p>hi kazupon!</p>
</div>
```

## `$t` vs `v-t`

### `$t`
`$t` is extended Vue instance method. There are the following pros and cons.

#### Pros
You can be **flexibly** used it with mustash syntax `{{}}` in templates and also computed props and methods in Vue instance.

#### Cons
`$t` is executed **everytime** when occured re-render, so it does have a translation costs.

### `v-t`
`v-t` is custom directive. There are the following pros and cons.

#### Pros
`v-t` is **high performance** than `$t` method due to it's cached with custom directive, when was translated once. And also pre-translation is possible with Vue compiler module which was provided by [`vue-i18n-extentions`](https://github.com/kazupon/vue-i18n-extensions). therefore it' made be possible to **more optimize** performance.

#### Cons
`v-t` can not be flexibly used like `$t`, it's rather **complexity**. The translated contents with `v-t` is inserted to `textContent` of element. And also when you use server-side rendering, you need to set [custom direcitve](https://github.com/kazupon/vue-i18n-extensions#directive-v-t-custom-directive-for-server-side) to `directives` option of `createRenderer` function.
