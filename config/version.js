const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./gitbook/en/installation.md', 'utf-8')
  .replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/vue\.i18n\/[\d.]+.[\d]+\/vue-i18n\.min\.js"><\/script>/,
    '<script src="https://cdn.jsdelivr.net/vue.i18n/' + pack.version + '/vue-i18n.min.js"></script>'
  )
  .replace(
    /<script src="https:\/\/unpkg\.com\/vue-i18n@[\d.]+.[\d]+\/dist\/vue-i18n\.min\.js"><\/script>/,
    '<script src="https://unpkg.com/vue-i18n@' + pack.version + '/dist/vue-i18n.min.js"></script>'
  )
fs.writeFileSync('./gitbook/en/installation.md', installation)
