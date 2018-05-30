const webpack = require('webpack')
const intlPlugin = require('./karma-intl-plugin')

const webpackConfig = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  devtool: '#inline-source-map'
}

module.exports = {
  frameworks: ['mocha', 'intl-shim'],
  files: [
    '../test/unit/index.js'
  ],
  preprocessors: {
    '../test/unit/index.js': ['webpack', 'sourcemap']
  },
  webpack: Object.assign({
    mode: 'development',
  }, webpackConfig),
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-sourcemap-loader',
    'karma-webpack',
    intlPlugin,
  ]
}
