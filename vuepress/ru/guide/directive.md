# Пользовательская директива

:::tip Поддержка с версии
:new: 7.3+
:::

Переводы можно осуществлять не только используя пользовательскую директиву `v-t`, но и с помощью метода `$t`.

## Строковый синтаксис

Можно передавать ключ сообщения локализации строкой.

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi there!' },
      ru: { hello: 'привет всем!' }
    }
  }),
  data: { path: 'hello' }
}).$mount('#string-syntax')
```

Шаблон:

```html
<div id="string-syntax">
  <!-- строковый литерал -->
  <p v-t="'hello'"></p>
  <!-- привязка пути к сообщению из данных -->
  <p v-t="path"></p>
</div>
```

Результат:

```html
<div id="string-syntax">
  <p>привет всем!</p>
  <p>привет всем!</p>
</div>
```

## Объектный синтаксис

Можно использовать объектный синтаксис.

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { hello: 'hi {name}!' },
      ru: { hello: 'привет {name}！' }
    }
  }),
  computed: {
    nickName() { return 'kazupon' }
  },
  data: { path: 'hello' }
}).$mount('#object-syntax')
```

Шаблон:

```html
<div id="object-syntax">
  <!-- литерал -->
  <p v-t="{ path: 'hello', locale: 'ru', args: { name: 'kazupon' } }"></p>
  <!-- привязка к данным -->
  <p v-t="{ path: path, args: { name: nickName } }"></p>
</div>
```

Результат:

```html
<div id="object-syntax">
  <p>привет、kazupon！</p>
  <p>hi kazupon!</p>
</div>
```

## Использование с transition

:::tip Поддержка с версии
:new: 8.7+
:::

При использовании директивы `v-t` на элементе внутри [компонента `<transition>`](https://ru.vuejs.org/v2/api/#transition), можно заметить как переведённое сообщение исчезает во время анимации перехода. Это поведение связано с реализацией самого компонента `<transition>` — все директивы в исчезающем элементе внутри компонента `<transition>` должны быть уничтожены **до начала анимации**. Это может привести к мерцанию содержимого на коротких анимациях, но наиболее заметно при длинных анимациях переходов.

Чтобы сохранить содержимое директивы во время анимации перехода, необходимо добавить [модификатор `.preserve`](../api/#v-t) при определении директивы `v-t`.

Javascript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' }
    }
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

Шаблон:

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t.preserve="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

Также можно глобально установить настройку `preserveDirectiveContent` в экземпляре `VueI18n`, что повлияет на все директивы `v-t` без добавления модификатора к ним.

JavaScript:

```js
new Vue({
  i18n: new VueI18n({
    locale: 'en',
    messages: {
      en: { preserve: 'with preserve' }
    },
    preserveDirectiveContent: true
  }),
  data: { toggle: true }
}).$mount('#in-transitions')
```

Шаблон:

```html
<div id="in-transitions">
  <transition name="fade">
    <span v-if="toggle" v-t="'preserve'"></span>
  </transition>
  <button @click="toggle = !toggle">Toggle</button>
</div>
```

Подробнее о примерах выше можно изучить [здесь](https://github.com/kazupon/vue-i18n/tree/dev/examples/directive)

## `$t` или `v-t`

### `$t`

`$t` — это метод, добавленный в экземпляр Vue. У него следующие плюсы и минусы:

#### Плюсы

Предоставляет **гибкость** в использовании синтаксиса фигурных скобок `{{}}` в шаблонах, а также применять в вычисляемых свойствах и методах экземпляра Vue.

#### Минусы

`$t` выполняется **каждый раз** когда происходит перерисовка, поэтому у него есть расходы на осуществление перевода.

### `v-t`

`v-t` — пользовательская директива. У неё следующие плюсы и минусы:

#### Плюсы

`v-t` имеет **лучшую производительность** в сравнении с методом `$t`, благодаря кэшу в пользовательской директиве после выполнения перевода. Также можно реализовать предварительный перевод с помощью модуля для компилятора Vue, который предоставляет плагин [`vue-i18n-extensions`](https://github.com/kazupon/vue-i18n-extensions).

Таким образом, можно достичь **большей оптимизации производительности**.

#### Минусы

`v-t` нельзя использовать также гибко, как `$t`, и это добавляет **сложности**. Перевод с помощью `v-t` вставляется в `textContent` элемента. Также, при использовании рендеринга на стороне сервера необходимо установить [пользовательскую директиву](https://github.com/kazupon/vue-i18n-extensions#directive-v-t-custom-directive-for-server-side) через опцию `directives` функции `createRenderer`.
