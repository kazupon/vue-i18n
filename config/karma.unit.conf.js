const base = require('./karma.base.conf')

module.exports = config => {
  config.set(Object.assign(base, {
    reporters: ['progress'],
    browsers: ['Chrome', 'Firefox', 'Safari'],
    singleRun: true
  }))
}
