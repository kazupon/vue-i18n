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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
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
  webpack: webpackConfig,
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
