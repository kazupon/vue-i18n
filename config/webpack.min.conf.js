var pack = require('../package.json')
var webpack = require('webpack')
var banner = require('./banner')

module.exports = {
  entry: './lib/index.js',
  output: {
    path: './dist',
    filename: pack.name + '.min.js',
    library: pack.name,
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

