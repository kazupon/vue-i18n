# Инструментарий

Для поддержки i18n приложений Vue некоторые инструменты предоставляются официально.

Также есть инструменты от сторонних разработчиков, которые интегрируются в Vue I18n.

## Официальный инструментарий

### Плагин для Vue CLI

[vue-cli-plugin-i18n](https://github.com/kazupon/vue-cli-plugin-i18n) — официальный плагин для Vue CLI.

С помощью этого плагина можно настроить среду i18n для приложения Vue и поддерживать среду разработки i18n.

### Модуль для Nuxt

[nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n/) — соответствующий модуль для Nuxt.js.

### Загрузчик для Webpack

[vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader) — официальный загрузчик для webpack.

С помощью этого загрузчика можно использовать пользовательские блоки `i18n` в однофайловых компонентах.

Подробнее о пользовательских блоках `i18n` можно изучить в разделе [Однофайловых компонентов](./sfc.md)

### Плагин для ESLint

[eslint-plugin-vue-i18n](https://intlify.github.io/eslint-plugin-vue-i18n/) — ESLint-плагин для Vue I18n.

Позволяет легко интегрировать функции проверки локализацией в ваше приложение Vue.js.

### Расширения

[vue-i18n-extensions](https://github.com/kazupon/vue-i18n-extensions) — предоставляет некоторые расширения дляVue I18n.

Эти расширения позволяет использовать в рендеринге на стороне сервера (SSR) и улучшить производительность i18n.

## Сторонние разработки

### BabelEdit

[BabelEdit](https://www.codeandweb.com/babeledit) — редактор переводов для веб-приложений.

BabelEdit может переводить файлы `json`, а также умеет работать с пользовательскими блоками `i18n` однофайловых компонентов.

Подробнее про BabelEdit можно узнать [на странице введения](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n).

### i18n Ally

[i18n Ally](https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally) — расширение i18n для VSCode.

i18n Ally предоставляет потрясающий DX для разработки с использованием i18n.

Подробнее о расширении i18n Ally можно изучить в [README](https://github.com/antfu/i18n-ally/blob/master/README.md).

### i18nPlugin (платформа intellij)

[i18nPlugin](https://github.com/nyavro/i18nPlugin) — плагин Intellij idea для поддержки i18next ([Jetbrains plugin page](https://plugins.jetbrains.com/plugin/12981-i18n-support)).

Плагин для i18n typescript/javascript/PHP. Поддерживает vue-i18n. Для включения поддержки vue-i18n в настройках -> Tools -> i18n Plugin configuration выберите "Vue-i18n". Необходимо установить каталоги с файлами локализаций (по умолчанию locales).

### vue-i18n-extract

[vue-i18n-extract](https://github.com/pixari/vue-i18n-extract) выполняет статический анализ проекта Vue.js на основе vue-i18n и сообщает следующую информацию:

- список всех **неиспользуемых ключей vue-i18n** (записи, найденные в файлах перевода, но не использованные в проекте)
- список всех **пропущенных ключей** (записи, найденные в проекте, но отсутствующие в файлах перевода)

Имеется возможность отобразить результат в консоли или записать его в файл json.

Пропущенные ключи также могут быть автоматически добавлены в заданные файлы переводов.
