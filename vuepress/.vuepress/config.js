module.exports = {
  base: '/vue-i18n/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue I18n',
      description: 'Vue I18n is internationalization plugin for Vue.js'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Vue I18n',
      description: 'Vue I18n是Vue.js的国际化插件'
    },
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
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '最近一次更新',
        nav: [
          {
            text: 'Guide',
            link: '/zh/guide/formatting',
          },
          {
            text: 'Legacy',
            link: '/zh/legacy/',
          },
          {
            text: 'API',
            link: '/zh/api/'
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
          '/zh/',
          '/zh/introduction',
          '/zh/started',
          '/zh/installation',
          {
            title: 'Guide',
            collapsable: false,
            children: [
              '/zh/guide/formatting',
              '/zh/guide/pluralization',
              '/zh/guide/datetime',
              '/zh/guide/number',
              '/zh/guide/messages',
              '/zh/guide/fallback',
              '/zh/guide/component',
              '/zh/guide/directive',
              '/zh/guide/interpolation',
              '/zh/guide/sfc',
              '/zh/guide/hot-reload',
              '/zh/guide/locale',
              '/zh/guide/lazy-loading'
            ]
          },
          {
            title: 'Legacy',
            collapsable: false,
            children: [
              '/zh/legacy/',
              '/zh/legacy/v5'
            ]
          }
        ]
      }
    }
  }
}

