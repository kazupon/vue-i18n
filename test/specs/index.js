import Vue from 'vue'
import locales from './fixture/locales'
import plugin from '../../src/index'
import 'babel-polyfill'

require('./path')
require('./format')
require('./compare')

Vue.use(plugin, {
  lang: 'en',
  locales: locales
})

require('./i18n')
require('./asset')
