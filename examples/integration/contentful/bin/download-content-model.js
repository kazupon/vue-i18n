const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const fetch = require('node-fetch')
const Listr = require('listr')
const tar = require('tar')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const REPO_ROOT = path.resolve(__dirname, '..')
const DATA_DIR = path.resolve(REPO_ROOT, 'data')

const tasks = new Listr([
  {
    title: `Checking permissions to write files to the disk`,
    task: (ctx) => {
      return new Promise((resolve, reject) => {
        fs.access(REPO_ROOT, fs.constants.W_OK, (err) => {
          if (err) {
            reject()
            console.error(`Script is unable to write to project directory. Please check your users file permissions for ${REPO_ROOT}`)
            process.exit(1)
          }
          resolve()
        })
      })
    }
  },
  {
    title: `Clean up directory`,
    task: (ctx) => {
      return new Promise((resolve, reject) => {
        rimraf(DATA_DIR, (err) => {
          if (err) {
            reject(err)
          }
          resolve()
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          mkdirp(DATA_DIR, (err) => {
            if (err) {
              reject(err)
            }
            resolve()
          })
        })
      })
    }
  },
  {
    title: `Fetching release information of contentful/content-models`,
    task: (ctx) => {
      return fetch(`https://api.github.com/repos/contentful/content-models/releases/latest`)
      .then((response) => response.json())
      .then((json) => {
        ctx.latestReleaseInfo = json
      })
    }
  },
  {
    title: `Downloading latest release of contentful/content-models`,
    task: (ctx) => {
      ctx.latestReleaseZipLocation = path.join(DATA_DIR, 'latest-release.tar.gz')
      return fetch(ctx.latestReleaseInfo.tarball_url)
      .then((response) => {
        ctx.latestReleaseTarballStream = response.body
      })
    }
  },
  {
    title: `Unpacking latest release of contentful/content-models`,
    task: (ctx) => {
      return new Promise((resolve, reject) => {
        try {
          ctx.latestReleaseTarballStream
            .pipe(zlib.Unzip())
            .pipe(new tar.Unpack({
              cwd: DATA_DIR,
              strip: 1
            }))
            .on('error', reject)
            .on('close', resolve)
        } catch (err) {
          reject(err)
        }
      })
    }
  }
])

tasks.run()
