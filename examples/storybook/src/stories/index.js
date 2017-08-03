/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import App from '../App.vue'
import MyButton from './MyButton.vue'
import Welcome from './Welcome.vue'
import VueI18n from 'vue-i18n'

storiesOf('App', module)
  .add('basic', () => ({
    components: { App },
    template: '<App/>',
    i18n: new VueI18n({
      locale: 'ja',
      messages: {
        en: {
          message: 'Welcome to Your Vue.js App',
          links: 'Essential Links',
          ecosystem: 'EcoSystem'
        },
        ja: {
          message: 'ようこそ、Vue.js アプリケーションに',
          links: '必須リンク',
          ecosystem: 'エコシステム'
        }
      }
    })
  }))

storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Button') },
}))

storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') },
  }))
