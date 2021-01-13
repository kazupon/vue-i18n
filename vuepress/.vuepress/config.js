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
      description: 'Vue I18n 是 Vue.js 的国际化插件'
    },
    '/ru/': {
      lang: 'ru-RU',
      title: 'Vue I18n',
      description: 'Vue I18n — плагин для интернационализации во Vue.js'
    },
    '/pt/': {
      lang: 'pt-BR',
      title: 'Vue I18n',
      description: 'Vue I18n é um internacionalizador de idiomas para Vue.js'
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  serviceWorker: false,
  themeConfig: {
    repo: 'kazupon/vue-i18n',
    editLinks: true,
    sidebarDepth: 3,
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
            link: '/guide/formatting'
          },
          {
            text: 'API',
            link: '/api/'
          },
          {
            text: 'Ecosystem',
            items: [
              {
                text: 'Official Tooling',
                items: [
                  {
                    text: 'Vue CLI Plugin',
                    link: 'https://github.com/kazupon/vue-cli-plugin-i18n'
                  },
                  {
                    text: 'Webpack Loader',
                    link: 'https://github.com/kazupon/vue-i18n-loader'
                  },
                  {
                    text: 'ESLint Plugin',
                    link: 'https://intlify.github.io/eslint-plugin-vue-i18n/'
                  },
                  {
                    text: 'Extensions',
                    link: 'https://github.com/kazupon/vue-i18n-extensions'
                  }
                ]
              },
              {
                text: '3rd Party Tooling',
                items: [
                  {
                    text: 'BabelEdit',
                    link: 'https://www.codeandweb.com/babeledit?utm_campaign=vue-i18n-2019-01'
                  },
                  {
                    text: 'i18n Ally',
                    link: 'https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally'
                  }
                ]
              }
            ]
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
              '/guide/lazy-loading',
              '/guide/tooling'
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
            text: '指南',
            link: '/zh/guide/formatting',
          },
          {
            text: 'API',
            link: '/zh/api/'
          },
          {
            text: '生态',
            items: [
              {
                text: '官方工具',
                items: [
                  {
                    text: '脚手架插件',
                    link: 'https://github.com/kazupon/vue-cli-plugin-i18n'
                  },
                  {
                    text: 'Webpack Loader',
                    link: 'https://github.com/kazupon/vue-i18n-loader'
                  },
                  {
                    text: 'ESLint 插件',
                    link: 'https://intlify.github.io/eslint-plugin-vue-i18n/'
                  },
                  {
                    text: '扩展',
                    link: 'https://github.com/kazupon/vue-i18n-extensions'
                  }
                ]
              },
              {
                text: '翻译工具',
                items: [
                  {
                    text: 'BabelEdit',
                    link: 'https://www.codeandweb.com/babeledit?utm_campaign=vue-i18n-2019-01'
                  }
                ]
              }
            ]
          },
          {
            text: '赞助',
            link: 'https://www.patreon.com/kazupon'
          },
          {
            text: '发布日志',
            link: 'https://github.com/kazupon/vue-i18n/releases'
          }
        ],
        sidebar: [
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
              '/zh/guide/lazy-loading',
              '/zh/guide/tooling'
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
      },
      '/ru/': {
        label: 'Русский',
        selectText: 'Переводы',
        editLinkText: 'Изменить эту страницу на GitHub',
        lastUpdated: 'Последнее обновление',
        nav: [
          {
            text: 'Руководство',
            link: '/ru/guide/formatting',
          },
          {
            text: 'Справочник API',
            link: '/ru/api/'
          },
          {
            text: 'Экосистема',
            items: [
              {
                text: 'Оф. инструментарий',
                items: [
                  {
                    text: 'Плагин для Vue CLI',
                    link: 'https://github.com/kazupon/vue-cli-plugin-i18n'
                  },
                  {
                    text: 'Загрузчик Webpack',
                    link: 'https://github.com/kazupon/vue-i18n-loader'
                  },
                  {
                    text: 'Плагин для ESLint',
                    link: 'https://intlify.github.io/eslint-plugin-vue-i18n/'
                  },
                  {
                    text: 'Расширения',
                    link: 'https://github.com/kazupon/vue-i18n-extensions'
                  }
                ]
              },
              {
                text: 'Сторонние разработки',
                items: [
                  {
                    text: 'BabelEdit',
                    link: 'https://www.codeandweb.com/babeledit?utm_campaign=vue-i18n-2019-01'
                  },
                  {
                    text: 'i18n Ally',
                    link: 'https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally'
                  }
                ]
              }
            ]
          },
          {
            text: 'Patreon',
            link: 'https://www.patreon.com/kazupon'
          },
          {
            text: 'История изменений',
            link: 'https://github.com/kazupon/vue-i18n/releases'
          }
        ],
        sidebar: [
          '/ru/introduction',
          '/ru/started',
          '/ru/installation',
          {
            title: 'Руководство',
            collapsable: false,
            children: [
              '/ru/guide/formatting',
              '/ru/guide/pluralization',
              '/ru/guide/datetime',
              '/ru/guide/number',
              '/ru/guide/messages',
              '/ru/guide/fallback',
              '/ru/guide/component',
              '/ru/guide/directive',
              '/ru/guide/interpolation',
              '/ru/guide/sfc',
              '/ru/guide/hot-reload',
              '/ru/guide/locale',
              '/ru/guide/lazy-loading',
              '/ru/guide/tooling'
            ]
          },
          {
            title: 'Устаревшие версии',
            collapsable: false,
            children: [
              '/ru/legacy/',
              '/ru/legacy/v5'
            ]
          }
        ]
      },
      '/pt/': {
        label: 'Português',
        selectText: 'Idiomas',
        editLinkText: 'Editar esta página no GitHub',
        lastUpdated: 'Última atualização',
        nav: [
          {
            text: 'Guia',
            link: '/pt/guide/formatting'
          },
          {
            text: 'API',
            link: '/pt/api/'
          },
          {
            text: 'Ecossistema',
            items: [
              {
                text: 'Ferramentas Oficiais',
                items: [
                  {
                    text: 'Vue CLI Plugin',
                    link: 'https://github.com/kazupon/vue-cli-plugin-i18n'
                  },
                  {
                    text: 'Webpack Loader',
                    link: 'https://github.com/kazupon/vue-i18n-loader'
                  },
                  {
                    text: 'ESLint Plugin',
                    link: 'https://intlify.github.io/eslint-plugin-vue-i18n/'
                  },
                  {
                    text: 'Extensoes',
                    link: 'https://github.com/kazupon/vue-i18n-extensions'
                  }
                ]
              },
              {
                text: 'Ferramentas de terceiros',
                items: [
                  {
                    text: 'BabelEdit',
                    link: 'https://www.codeandweb.com/babeledit?utm_campaign=vue-i18n-2019-01'
                  },
                  {
                    text: 'i18n Ally',
                    link: 'https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally'
                  }
                ]
              }
            ]
          },
          {
            text: 'Patreon',
            link: 'https://www.patreon.com/kazupon'
          },
          {
            text: 'Notas de Lançamento',
            link: 'https://github.com/kazupon/vue-i18n/releases'
          }
        ],
        sidebar: [
          '/pt/introduction',
          '/pt/started',
          '/pt/installation',
          {
            title: 'Guia',
            collapsable: false,
            children: [
              '/pt/guide/formatting',
              '/pt/guide/pluralization',
              '/pt/guide/datetime',
              '/pt/guide/number',
              '/pt/guide/messages',
              '/pt/guide/fallback',
              '/pt/guide/component',
              '/pt/guide/directive',
              '/pt/guide/interpolation',
              '/pt/guide/sfc',
              '/pt/guide/hot-reload',
              '/pt/guide/locale',
              '/pt/guide/lazy-loading',
              '/pt/guide/tooling'
            ]
          },
          {
            title: 'Legado',
            collapsable: false,
            children: [
              '/pt/legacy/',
              '/pt/legacy/v5'
            ]
          }
        ]
      },
    }
  }
}

