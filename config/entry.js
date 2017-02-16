const replace = require('rollup-plugin-replace')
const flow = require('rollup-plugin-flow-no-whitespace')
const buble = require('rollup-plugin-buble')
const banner = require('./banner')
const pack = require('../package.json')

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}

const classifyRE = /(?:^|[-_\/])(\w)/g
function classify (str) {
  return str.replace(classifyRE, toUpper)
}
const moduleName = classify(pack.name)

const entries = {
  commonjs: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.common.js`,
    format: 'cjs',
    banner
  },
  production: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.min.js`,
    format: 'umd',
    env: 'production',
    moduleName,
    banner
  },
  development: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.js`,
    format: 'umd',
    env: 'development',
    moduleName,
    banner
  }
}

function genConfig (opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    format: opts.format,
    banner: opts.banner,
    moduleName,
    plugins: [
      flow(),
      buble()
    ]
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env),
      '__VERSION__': pack.version
    }))
  }

  return config
}

exports.getEntry = name => genConfig(entries[name])
exports.getAllEntries = () => Object.keys(entries).map(name => genConfig(entries[name]))
