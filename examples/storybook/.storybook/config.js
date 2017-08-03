import { configure } from '@storybook/vue'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
