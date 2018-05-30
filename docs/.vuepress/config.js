module.exports = {
  locales: {
    '/current/en/': {
      lang: 'en-US',
      title: 'vue-i18n',
      description: 'Vue-i18n internationalization plugin'
    },
    '/': {
      lang: 'en-US',
      title: 'vue-i18n',
      description: 'Vue-i18n internationalization plugin'
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'kazupon/vue-i18n',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/current/en/': {
        label: 'English',
        selectText: 'Languages',
        nav: [
          {
            text: 'Getting Started',
            link: '/current/en/started',
          },
          {
            text: 'Installation',
            link: '/current/en/installation'
          },
          {
            text: 'API',
            link: '/current/en/api'
          },
          {
            text: 'Release Notes',
            link: 'https://github.com/kazupon/vue-i18n/releases'
          }
        ],
        sidebar: [
          ['/current/en/', 'Introduction'],
          ['/5.x/en/', 'Looking for 5.x docs?'],
          '/current/en/started',
          '/current/en/formatting',
          '/current/en/pluralization',
          '/current/en/datetime',
          '/current/en/number',
          '/current/en/messages',
          '/current/en/fallback',
          '/current/en/component',
          '/current/en/directive',
          '/current/en/interpolation',
          '/current/en/sfc',
          '/current/en/hot-reload',
          '/current/en/lazy-loading',
          '/current/en/migrations',
          '/current/en/api'
        ]
      }
    }
  }
}

