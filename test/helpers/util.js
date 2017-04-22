const inBrowser = typeof window !== 'undefined'
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
const isPhantomJS = UA && UA.indexOf('PhantomJS') > -1
const isSafari = UA && UA.indexOf('safari') !== -1 && UA.indexOf('chrome') === -1
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
window.isWebkit = isPhantomJS || isSafari || isIOS
