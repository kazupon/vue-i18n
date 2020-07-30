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
    '/ja/': {
      lang: 'ja-JP',
      title: 'Vue I18n',
      description: 'Vue I18n は、Vue.js のための国際化プラグインです。'
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
            text: 'Learn',
            items: [
              {
                text: 'Guide',
                link: '/guide/formatting',
              },
              {
                text: 'API',
                link: '/api/'
              }
            ]
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
                    link: 'https://kazupon.github.io/eslint-plugin-vue-i18n/'
                  },
                  {
                    text: 'Extensions',
                    link: 'https://github.com/kazupon/vue-i18n-extensions'
                  }
                ]
              },
              {
                text: 'Translation Tooling',
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
            text: '学习',
            items: [
              {
                text: '指南',
                link: '/zh/guide/formatting',
              },
              {
                text: 'API',
                link: '/zh/api/'
              }
            ]
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
                    link: 'https://kazupon.github.io/eslint-plugin-vue-i18n/'
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
      '/ja/': {
        label: '日本語',
        selectText: '言語',
        editLinkText: 'このページを GitHub で編集する',
        lastUpdated: '最終更新日時',
        nav: [
          {
            text: '学ぶ',
            items: [
              {
                text: 'ガイド',
                link: '/ja/guide/formatting'
              },
              {
                text: 'API',
                link: '/ja/api/'
              }
            ]
          },
          {
            text: 'エコシステム',
            items: [
              {
                text: '公式ツール',
                items: [
                  {
                    text: 'Vue CLI プラグイン',
                    link: 'https://github.com/kazupon/vue-cli-plugin-i18n'
                  },
                  {
                    text: 'Webpack ローダー',
                    link: 'https://github.com/kazupon/vue-i18n-loader'
                  },
                  {
                    text: 'ESLint プラグイン',
                    link: 'https://kazupon.github.io/eslint-plugin-vue-i18n/'
                  },
                  {
                    text: '拡張',
                    link: 'https://github.com/kazupon/vue-i18n-extensions'
                  }
                ]
              },
              {
                text: '翻訳ツール',
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
            text: 'Patreon',
            link: 'https://www.patreon.com/kazupon'
          },
          {
            text: 'リリースノート',
            link: 'https://github.com/kazupon/vue-i18n/releases'
          }
        ],
        sidebar: [
          '/ja/introduction',
          '/ja/started',
          '/ja/installation',
          {
            title: 'ガイド',
            collapsable: false,
            children: [
              '/ja/guide/formatting',
              '/ja/guide/pluralization',
              '/ja/guide/datetime',
              '/ja/guide/number',
              '/ja/guide/messages',
              '/ja/guide/fallback',
              '/ja/guide/component',
              '/ja/guide/directive',
              '/ja/guide/interpolation',
              '/ja/guide/sfc',
              '/ja/guide/hot-reload',
              '/ja/guide/locale',
              '/ja/guide/lazy-loading'
            ]
          },
          {
            title: 'レガシー',
            collapsable: false,
            children: [
              '/ja/legacy/',
              '/ja/legacy/v5'
            ]
          }
        ]
      },
    }
  }
}

