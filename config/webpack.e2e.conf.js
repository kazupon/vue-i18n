module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './test/e2e/index.js']
  },
  output: {
    path: './test/e2e',
    filename: 'translation.build.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  devtool: 'inline-source-map'
}
