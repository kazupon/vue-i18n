var webpack = require('webpack')

module.exports = {
  entry: 'mocha!./test/specs/index.js',
  output: {
    path: './test/specs',
    filename: 'specs.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules|vue\/dist/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: [
          'babel-plugin-espower'
        ]
      }
    }],
    postLoaders: [{
      test: /\.json$/,
      loader: 'json'
    }]
  },
  devServer: {
    contentBase: './test/specs',
    port: 8081,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
