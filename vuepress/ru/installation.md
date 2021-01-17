# Установка

## Примечание совместимости

- Vue.js версии `2.0.0`+

## Загрузка файла / CDN

<https://unpkg.com/vue-i18n/dist/vue-i18n>

Сервис [unpkg.com](https://unpkg.com) предоставляет CDN-ссылки на основе NPM-пакетов. Ссылка выше будет всегда указывать на последнюю версию на NPM. Можно использовать конкретную версию или тег с помощью URL следующего вида <https://unpkg.com/vue-i18n@8.17.5/dist/vue-i18n.js>

При подключении vue-i18n после Vue плагин установит себя автоматически:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
```

## NPM

```bash
npm install vue-i18n
```

## Yarn

```bash
yarn add vue-i18n
```

При использовании системы модулей нужно явно устанавливать `vue-i18n`
через `Vue.use()`:

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
```

Подобного не требуется делать при подключении через глобальный тег `<script>`.

## Vue CLI 3.x

```bash
vue add i18n
```

Предварительно требуется установить Vue CLI 3.x, его можно установить следующей командой:

```bash
npm install @vue/cli -g
```

## Dev-сборка

При необходимости использовать последнюю dev-сборку нужно склонировать репозиторий с GitHub и выполнить сборку `vue-i18n` самостоятельно.

```bash
git clone https://github.com/kazupon/vue-i18n.git node_modules/vue-i18n
cd node_modules/vue-i18n
npm install # или `yarn`
npm run build  # или `yarn run build`
```

## Отличия различных сборок

[Внутри каталога dist / NPM-пакета](https://cdn.jsdelivr.net/npm/vue-i18n/dist/) можно обнаружить несколько различных сборок VueI18n. Вот следующие отличия между ними:

- UMD: `vue-i18n.js`
- CommonJS: `vue-i18n.common.js`
- ES Module для систем сборки: `vue-i18n.esm.js`
- ES Module для браузеров: `vue-i18n.esm.browser.js`

### Термины

- **[UMD](https://github.com/umdjs/umd)**: UMD-сборки можно использовать непосредственно в браузере через тег `<script>`. Файл по умолчанию с Unpkg CDN [https://unpkg.com/vue-i18n](https://unpkg.com/vue-i18n) указывает на UMD-сборку (`vue-i18n.js`).

- **[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)**: CommonJS сборки предназначены для использования со старыми системами сборки, такими как [browserify](http://browserify.org/) или [webpack 1](https://webpack.github.io). Файлом по умолчанию для этих систем сборки (`pkg.main`) будет сборка CommonJS (`vue-i18n.common.js`).

- **[ES Module](http://exploringjs.com/es6/ch_modules.html)**: VueI18n, начиная с версии 8.11, предоставляет две сборки ES-модулей (ESM):

  - ESM для систем сборки: предназначен для использования с современными системами сборки, такими как [webpack 2](https://webpack.js.org) или [Rollup](https://rollupjs.org/). Формат ESM разработан для возможности статического анализа, чтобы системы сборки могли применять "tree-shaking" и удалять неиспользуемый код из финального приложения. Файлом по умолчанию для этих систем сборки (`pkg.module`) будет ES-сборка (`vue-i18n.esm.js`).
  - ESM для браузеров (только для 8.11+, `vue-i18n.esm.browser.js`): предназначен для импорта напрямую в современных браузерах через тег `<script type="module">`.
