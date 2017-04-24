export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return { value: ~~(between / 60), unit: 'minute' }
  } else if (between < 86400) {
    return { value: ~~(between / 3600), unit: 'hour' }
  } else {
    return { value: ~~(between / 86400), unit: 'day' }
  }
}
