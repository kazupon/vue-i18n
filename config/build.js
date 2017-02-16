const fs = require('fs')
const exist = fs.existsSync
const mkdir = fs.mkdirSync
const getAllEntries = require('./entry').getAllEntries
const build = require('./bundle')

if (!exist('dist')) {
  mkdir('dist')
}

let entries = getAllEntries()

// filter entries via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  entries = entries.filter(b => {
    return filters.some(f => b.dest.indexOf(f) > -1)
  })
}

build(entries)
