module.exports = {
  base: '/vue-i18n/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VueI18n',
      description: 'VueI18n is internationalization plugin for Vue.js'
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  serviceWorker: false,
  themeConfig: {
    repo: 'kazupon/vue-i18n',
    editLinks: true,
    docsDir: 'vuepress',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'Guide',
            link: '/guide/started.md',
          },
          {
            text: 'API',
            link: '/api/'
          },
          {
            text: 'Release Notes',
            link: 'https://github.com/kazupon/vue-i18n/releases'
          }
        ],
        sidebar: [
          '/installation.md',
          '/introduction.md',
          ['/5.x/', 'Looking for 5.x docs?'],
          {
            title: 'Guide',
            collapsable: false,
            children: [
              '/guide/started.md',
              '/guide/formatting.md',
              '/guide/pluralization.md',
              '/guide/datetime.md',
              '/guide/number.md',
              '/guide/messages.md',
              '/guide/fallback.md',
              '/guide/component.md',
              '/guide/directive.md',
              '/guide/interpolation.md',
              '/guide/sfc.md',
              '/guide/hot-reload.md',
              '/guide/lazy-loading.md',
              '/guide/migrations.md'
            ]
          }
        ]
      }
    }
  }
}

