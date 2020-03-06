const execa = require(require.resolve('execa'))
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const read = promisify(fs.readFile)
const write = fs.writeFileSync

function extractSpecificChangelog (changelog, version) {
  if (!changelog) {
    return null
  }
  const escapedVersion = version.replace(/\./g, '\\.')
  const regex = new RegExp(
    `(#+?\\s\\[?v?${escapedVersion}\\]?[\\s\\S]*?)(#+?\\s\\[?v?\\d+?\\.\\d+?\\.\\d+?\\]?)`,
    'g'
  )
  const matches = regex.exec(changelog)
  return matches ? matches[1] : null
}

async function commitChangelog (current, next) {
  const { stdout } = await execa('npx', ['lerna-changelog', '--next-version', `v${next}`])
  const escapedVersion = next.replace(/\./g, '\\.')
  const regex = new RegExp(
    `(#+?\\s\\[?v?${escapedVersion}\\]?[\\s\\S]*?)(#+?\\s\\[?v?\\d\\.\\d\\.\\d\\]?)`,
    'g'
  )
  const matches = regex.exec(stdout.toString())
  const head = matches ? matches[1] : stdout
  const changelog = await read('./CHANGELOG.md', 'utf8')
  return write('./CHANGELOG.md', `${head}\n\n${changelog}`)
}

module.exports = {
  mergeStrategy: { toSameBranch: ['v8.x'] },
  monorepo: undefined,
  updateChangelog: false,
  beforeCommitChanges: ({ nextVersion, exec, dir }) => {
    return new Promise(resolve => {
      const pkg = require('./package.json')
      commitChangelog(pkg.version, nextVersion).then(resolve)
    })
  },
  formatCommitMessage: ({
    version,
    releaseType,
    mergeStrategy,
    baseBranch
  }) => `${releaseType} release v${version}`,
  formatPullRequestTitle: ({
    version,
    releaseType
  }) => `${releaseType} release v${version}`,
  shouldRelease: () => true,
  releases: {
    extractChangelog: ({ version, dir }) => {
      const changelogPath = path.resolve(dir, 'CHANGELOG.md')
      try {
        const changelogFile = fs.readFileSync(changelogPath, 'utf-8').toString()
        const ret = extractSpecificChangelog(changelogFile, version)
        return ret
      } catch (err) {
        if (err.code === 'ENOENT') {
          return null
        }
        throw err
      }
    }
  }
}
