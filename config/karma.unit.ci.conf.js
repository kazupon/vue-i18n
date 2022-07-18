const base = require('./karma.base.conf')

module.exports = config => {
  config.set(Object.assign(base, {
    browsers: ['Chrome', 'Firefox'],
    reporters: ['progress'],
    singleRun: true,
    plugins: base.plugins.concat([
      'karma-chrome-launcher',
      'karma-firefox-launcher',
    ])
  }))
}
