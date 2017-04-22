const path = require('path')

const init = function (files) {
  files.unshift({
    pattern: path.join(__dirname, '../node_modules/intl/dist/Intl.complete.js'),
    included: true,
    served: true,
    watched: false
  })
}

init.$inject = ['config.files']

module.exports = {
  'framework:intl-shim': ['factory', init]
}
