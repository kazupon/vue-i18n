const base = require('./karma.base.conf')

module.exports = config => {
  const options = Object.assign(base, {
    browsers: ['ChromeHeadless'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../coverage', subdir: '.' }
      ]
    },
    singleRun: true,
    plugins: base.plugins.concat([
      'karma-coverage',
      'karma-chrome-launcher'
    ])
  })

  config.set(options)
}
