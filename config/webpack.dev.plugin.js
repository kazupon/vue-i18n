const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jasmineCore = require('jasmine-core')

const jasmineFiles = jasmineCore.files
const jasminePath = resolveJasmineDir(jasmineFiles.path)
const jasmineBootDir = resolveJasmineDir(jasmineFiles.bootDir)
const jasmineJsFiles = resolveJasmineFiles(jasminePath, jasmineFiles.jsFiles)
const jasmineCssFiles = resolveJasmineFiles(jasminePath, jasmineFiles.cssFiles)
const jasmineBootFiles = resolveJasmineFiles(jasmineBootDir, jasmineFiles.bootFiles)

function JasmineWebpackPlugin (options = {}) {
  return new HtmlWebpackPlugin({
    title: 'vue-i18n test runner',
    filename: options.filename || 'index.html',
    template: './config/webpack.runner.template.html',
    jasmineJsFiles: jasmineJsFiles.concat(jasmineBootFiles),
    jasmineCssFiles
  })
}

function resolveJasmineDir (dirname) {
  return dirname.replace(process.cwd(), '').replace(/^\//, '')
}

function resolveJasmineFiles (dirname, files) {
  return files.map(file => { return path.join(dirname, file) })
}
module.exports = JasmineWebpackPlugin
