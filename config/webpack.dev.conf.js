const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: 'mocha-loader!./test/unit/index.js',
  mode: 'development',
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.resolve(__dirname, '/test/unit'),
    filename: 'tests.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules|vue\/dist/,
      loader: 'babel-loader'
    }]
  },
  devtool: '#eval-source-map'
}
