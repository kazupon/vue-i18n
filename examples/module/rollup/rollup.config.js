import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
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

const external = [
  //'vue'
]
const globals = {
  //vue: 'Vue'
}

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  commonjs(),
  vue({
    css: true,
    compileTemplate: true,
    template: {
      compilerOptions: {
        modules: [module(i18n)]
      }
    }
  }),
  buble({ exclude: 'node_modules/**' })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify())
} else if (process.env.NODE_ENV === 'development') {
  plugins.push(serve({
    contentBase: ['dist'],
    port: 5000,
    open: true
  }))
}

export default {
  input: 'src/index.js',
  external,
  output: {
    file: 'dist/bundle.js',
    name: 'app',
    format: 'iife',
    sourcemap: true,
    globals
  },
  plugins
}
