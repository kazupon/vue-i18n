import {resolve as pathResolve} from 'path'
import {format as urlFormat} from 'url'


export function resolve (path) {
  return urlFormat({
    protocol: 'file',
    slashes: true,
    pathname: pathResolve(__dirname, path)
  })
}
