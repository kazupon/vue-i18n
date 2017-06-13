const inBrowser = typeof window !== 'undefined'
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
window.isChrome = UA && UA.indexOf('chrome') !== -1

function getVersion () {
  const ua = window.navigator.userAgent
  let tem
  let M = ua.match(/(phantomjs|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: 'IE', version: parseInt((tem[1] || '-1'), 10) }
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/)
    if (tem !== null) {
      return { name: 'Opera', version: parseInt(tem[1], 10) }
    }
  }
  M = M[2]
    ? [M[1], M[2]]
    : [window.navigator.appName, window.navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
    M.splice(1, 1, tem[1])
  }
  return {
    name: M[0],
    version: parseInt(M[1], 10)
  }
}

const { browser, version } = getVersion()
window.availableIntl = (browser === 'IE' && version >= 11) ||
  (browser === 'Firefox' && version >= 29) ||
  (browser === 'Chrome' && version >= 24) ||
  (browser === 'Safari' && version >= 10)
