module.exports = {
  base: '/vue-i18n/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue I18n',
      description: 'Vue I18n is internationalization plugin for Vue.js'
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
            link: '/guide/formatting',
          },
          {
            text: 'Legacy',
            link: '/legacy/',
          },
          {
            text: 'API',
            link: '/api/'
          },
          {
            text: 'CLI Plugin',
            link: 'https://github.com/kazupon/vue-cli-plugin-i18n'
          },
          {
            text: 'Patreon',
            link: 'https://www.patreon.com/kazupon'
          },
          {
            text: 'Release Notes',
            link: 'https://github.com/kazupon/vue-i18n/releases'
          }
        ],
        sidebar: [
          '/introduction',
          '/started',
          '/installation',
          {
            title: 'Guide',
            collapsable: false,
            children: [
              '/guide/formatting',
              '/guide/pluralization',
              '/guide/datetime',
              '/guide/number',
              '/guide/messages',
              '/guide/fallback',
              '/guide/component',
              '/guide/directive',
              '/guide/interpolation',
              '/guide/sfc',
              '/guide/hot-reload',
              '/guide/locale',
              '/guide/lazy-loading'
            ]
          },
          {
            title: 'Legacy',
            collapsable: false,
            children: [
              '/legacy/',
              '/legacy/v5'
            ]
          }
        ]
      }
    }
  }
}

