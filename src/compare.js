/**
 * Version compare
 * - Inspired:
 *   https://github.com/omichelsen/compare-versions
 */

const PATCH_PATTERN = /-([\w-.]+)/


function split (v) {
  let temp = v.split('.')
  let arr = temp.splice(0, 2)
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
  let s1 = split(v1)
  let s2 = split(v2)

  for (let i = 0; i < 3; i++) {
    let n1 = parseInt(s1[i] || 0, 10)
    let n2 = parseInt(s2[i] || 0, 10)

    if (n1 > n2) { return 1 }
    if (n2 > n1) { return -1 }
  }

  if ((s1[2] + s2[2] + '').indexOf('-') > -1) {
    let p1 = (PATCH_PATTERN.exec(s1[2]) || [''])[0]
    let p2 = (PATCH_PATTERN.exec(s2[2]) || [''])[0]

    if (p1 === '') { return 1 }
    if (p2 === '') { return -1 }
    if (p1 > p2) { return 1 }
    if (p2 > p1) { return -1 }
  }

  return 0
}
