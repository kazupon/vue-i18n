var webpack = require('webpack')

module.exports = {
  entry: './test/e2e/index.js'/*{
    app: ['webpack/hot/dev-server', './test/e2e/index.js']
  }*/,
  output: {
    path: './test/e2e',
    filename: 'e2e.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules|vue\/dist/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './test/e2e',
    port: 8080,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
