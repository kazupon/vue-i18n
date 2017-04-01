const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: 'mocha-loader!./test/unit/index.js',
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
    })
  ],
  devtool: '#eval-source-map'
}
