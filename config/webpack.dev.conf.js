const path = require('path')
const webpack = require('webpack')
const JasmineWebpackPlugin = require('./webpack.dev.plugin')

module.exports = {
  entry: './test/unit/index.js',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new JasmineWebpackPlugin()
  ],
  devtool: '#eval-source-map'
}
