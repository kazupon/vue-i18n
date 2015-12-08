// Karma configuration
// Generated on Tue Sep 08 2015 19:27:24 GMT+0900 (JST)

module.exports = function (config) {
  var settings = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      '../test/specs/index.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../test/specs/index.js': ['webpack']
    },

    webpack: {
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules|vue\/dist/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: [
              ['babel-plugin-espower']
            ]
          }
        }],
        postLoaders: [{
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /\.js$/,
          exclude: /test|node_modules|vue\/dist/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  }

  switch (process.env.VUE_I18N_TYPE) {
    case 'coverage':
      settings.browsers = ['PhantomJS']
      settings.reporters = ['coverage']
      settings.coverageReporter = {
        reporters: [{
          type: 'html', dir: '../coverage'
        }, {
          type: 'text-summary', dir: '../coverage'
        }]
      }
      break
    case 'coveralls':
      settings.browsers = ['PhantomJS']
      settings.reporters = ['coverage', 'coveralls']
      settings.coverageReporter = {
        reporters: [{ type: 'lcov', dir: '../coverage' }]
      }
      break
    case 'sauce':
      var batch = process.env.SAUCE || 'batch1'
      var sauce = require('./sauce')[batch]
      settings.sauceLabs = sauce.sauceLabs
      settings.captureTimeout = sauce.captureTimeout
      settings.customLaunchers = sauce.customLaunchers
      settings.browsers = sauce.browsers
      settings.reporters = sauce.reporters
      break
    case 'browser':
      settings.browsers = ['Chrome', 'Safari', 'Firefox']
      settings.reporters = ['progress']
      break
    default:
      settings.browsers = ['PhantomJS']
      settings.reporters = ['mocha']
      break
  }


  config.set(settings)
}
