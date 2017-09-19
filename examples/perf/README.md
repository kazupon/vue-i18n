# vue-i18n-performance-comparison-example

> vue-i18n performance comparison example

## Performance measurement prepare

```sh
# setup performance comparison examples
$ npm run setup

# build performance comparison examples
$ npm run build
```

## Performance measurement

```sh
# serve perform comparison examples
$ npm run serve

# measure performance !!
$ npm run perform
```

## Performance measurement targets
- Plain: Render TODO items only (No translation)
- Method: Render TODO items with `$t` method
- Directive: Render TODO items with `v-t` custom directive
- Compile: Render TODO items with compiler module

## Measurement enviroments
- Vue.config.performance = true
- Builded `vue-cli` webpack-simple
- Development build (Disable Production build)
- Headless chrome (pappeteer)

## An approach to measurement
Render 1000 TODO items, after that remove 10 TODO items.

## Measurement items
- Re-render user timing pass time, when remove TODO item.
