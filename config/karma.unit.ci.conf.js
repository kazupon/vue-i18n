const base = require('./karma.base.conf')

module.exports = config => {
  config.set(Object.assign(base, {
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    reporters: ['progress'],
    singleRun: true,
    plugins: base.plugins.concat([
      'karma-chrome-launcher',
      'karma-firefox-launcher',
    ])
  }))
}
