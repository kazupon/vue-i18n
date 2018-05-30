const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./vuepress/current/en/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/vue-i18n@[\d.]+.[\d]+\/dist\/vue-i18n\.js/,
    'https://unpkg.com/vue-i18n@' + pack.version + '/dist/vue-i18n.js'
  )
fs.writeFileSync('./vuepress/current/en/installation.md', installation)
