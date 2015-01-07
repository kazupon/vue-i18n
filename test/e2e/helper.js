/**
 * Import(s)
 */

var pathResolve = require('path').resolve;
var urlFormat = require('url').format;


/**
 * Exports(s)
 */

module.exports = {
  resolve: resolve
}


function resolve (path) {
  return urlFormat({
    protocol: 'file',
    slashes: true,
    pathname: pathResolve(__dirname, path)
  })
}
