import Vue from 'vue'
import plugin from '../../src/index'
import 'babel-polyfill'

require('./path')
require('./format')

Vue.use(plugin)

require('./i18n')
require('./asset')
require('./component')
require('./issues')
