var path = require('path')
var webpack = require('webpack')
var Vue = require('vue')
var VueI18n = require('vue-i18n')
var i18nExtensions = require('vue-i18n-extensions')

Vue.use(VueI18n)

var i18n = new VueI18n({
  locale: 'jp',
  messages: {
    en: {
      label: 'x'
    },
    jp: {
      label: '☓'
    }
  }
})

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerModules: [i18nExtensions.module(i18n)],
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
