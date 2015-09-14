var pack = require('../package.json')
var version = process.env.VERSION || pack.version

module.exports =
  pack.name + ' v' + version + '\n' +
  '(c) ' + new Date().getFullYear() +
  ' ' + pack.author.name + '\n' +
  'Released under the ' + pack.license + ' License.'
