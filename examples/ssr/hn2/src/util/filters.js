export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time, $tc) {
  const between = Date.now() / 1000 - Number(time)
  if (!$tc) { return between }

  let t
  if (between < 3600) {
    t = ~~(between / 60)
    return `${t} ${$tc('time.units.minute', t)}`
  } else if (between < 86400) {
    t = ~~(between / 3600)
    return `${t} ${$tc('time.units.hour', t)}`
  } else {
    t = ~~(between / 86400)
    return `${t} ${$tc('time.units.day', t)}`
  }
}
