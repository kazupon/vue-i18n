var pack = require('../package.json')
var webpack = require('webpack')
var banner = require('./banner')

module.exports = {
  entry: './lib/index.js',
  output: {
    path: './dist',
    filename: pack.name + '.js',
    library: pack.name,
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}

