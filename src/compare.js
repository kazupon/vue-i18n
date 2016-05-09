/**
 * Version compare
 * - Inspired:
 *   https://github.com/omichelsen/compare-versions
 */

const PATCH_PATTERN = /-([\w-.]+)/


function split (v) {
  const temp = v.split('.')
  const arr = temp.splice(0, 2)
  arr.push(temp.join('.'))
  return arr
}

/**
 * compare
 *
 * @param {String} v1
 * @param {String} v2
 * @return {Number}
 */

export default function (v1, v2) {
  const s1 = split(v1)
  const s2 = split(v2)

  /* eslint-disable prefer-const */
  for (let i = 0; i < 3; i++) {
    let n1 = parseInt(s1[i] || 0, 10)
    let n2 = parseInt(s2[i] || 0, 10)

    if (n1 > n2) { return 1 }
    if (n2 > n1) { return -1 }
  }
  /* eslint-enable prefer-const */

  if ((s1[2] + s2[2] + '').indexOf('-') > -1) {
    const p1 = (PATCH_PATTERN.exec(s1[2]) || [''])[0]
    const p2 = (PATCH_PATTERN.exec(s2[2]) || [''])[0]

    if (p1 === '') { return 1 }
    if (p2 === '') { return -1 }
    if (p1 > p2) { return 1 }
    if (p2 > p1) { return -1 }
  }

  return 0
}
