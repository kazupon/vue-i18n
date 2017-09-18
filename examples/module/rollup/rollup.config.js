import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { module } from 'vue-i18n-extensions'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      headers: {
        links: 'Essential Links',
        ecosystem: 'Ecosystem'
      },
      items: {
        docs: 'Core Docs',
        forum: 'Forum',
        chat: 'Gitter Chat',
        twitter: 'Twitter',
        routing: 'vue-router',
        store: 'vuex',
        webpack: 'vue-loader',
        curated: 'awesome-vue'
      }
    },
    ja: {
    }
  }
})

export default {
  moduleName: 'App',
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    vue({
      css: 'dist/bundle.css',
      compileTemplate: true,
      compileOptions: {
        modules: [module(i18n)]
      }
    }),
    babel()
  ]
}
