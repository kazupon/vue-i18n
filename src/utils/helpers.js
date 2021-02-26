import Vue from 'vue'

Vue.filter('capitalize', capitalize)

Vue.filter('toFixed2', function (value) {
  if(value === 0) return (+value).toFixed(2)
  if(value == '' || value == undefined) return '';
	return (+value).toFixed(2);
})

Vue.filter('toUpper', val => val.toUpperCase())

export function capitalize(value) {
  let capitalizations = {
    susd: 'sUSD',
    ycurve: 'yCurve',
    wbtc: 'wBTC',
    renbtc: 'renBTC',
    sbtc: 'sBTC',
  }
  if(capitalizations[value]) return capitalizations[value]
  return value.toUpperCase();
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function totalCurrencies(currencies) {
	return Object.keys(currencies).join('+');
}

export function getTokenIcon(token, wrapped, pool) {
    if(wrapped && ['compound', 'usdt'].includes(pool) && token != 'pax') {
        token = 'c' + token
    }
    else if(wrapped && ['iearn', 'y', 'busd', 'pax'].includes(pool) && token != 'pax') {
        token = '_y' + token
    }
    let publicPath = process.env.BASE_URL
    let asset
    let pngs = ['dai', 'busd', 'pax', '_ydai', '_yusdc', '_yusdt', '_ytusd', '_ybusd']
    if(pngs.includes(token)) {
        asset = publicPath + 'tokens/' + token + '.png'
    }
    else {
      asset = publicPath + 'tokens/' + token + '.svg'
    }
    return asset;
}

export function randomBytes(bytes) {
  //taken from https://github.com/renproject/ren-js/blob/master/packages/lib/ren-utils/src/common.ts
  const uints = new Uint32Array(bytes / 4); // 4 bytes (32 bits)
  // @ts-ignore
  window.crypto.getRandomValues(uints);
  let str = "";
  for (const uint of uints) {
      str += "0".repeat(8 - uint.toString(16).length) + uint.toString(16);
  }
  return str
}

export function interpolate(x, x0, x1) {
  return (y0, y1) => y0 + (x - x0)*(y1 - y0)/(x1 - x0)
}

export function debounced(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}

export function omit(keys, obj) {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)))
}

export function makeCancelable(promise) {
    let rejectFn;

    const wrappedPromise = new Promise((resolve, reject) => {
        rejectFn = reject;

        Promise.resolve(promise)
            .then(resolve)
            .catch(reject);
    });

    wrappedPromise.cancel = (reason) => {
        rejectFn({ canceled: true, reason: reason });
    };

    return wrappedPromise;
};

export function setTimeoutPromise(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export async function retry(fn, retryDelay = 100, numRetries = 3) {
  for (let i = 0; i < numRetries; i++) {
    try {
      return await fn
    } 
    catch (e) {
      if (i === numRetries - 1) throw e
      await setTimeoutPromise(retryDelay)
      retryDelay = retryDelay * 2
    }
  }
}

export function formatDate(date) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return monthNames[date.getMonth()] + String(date.getDate()).padStart(2, '0');
}

export function formatDateToHuman(timestamp) {
  //convert to UTC
  let d = new Date(timestamp*1000+(new Date).getTimezoneOffset() * 60 * 1000)
  return [
            d.getDate(),
            `${(d.getMonth()+1).toString().padStart(2, '0')}`,
            d.getFullYear()].join('/')+' '+
            [`${d.getHours()}`.padStart(2, '0'),
            `${d.getMinutes()}`.padStart(2, '0'),
            `${d.getSeconds()}`.padStart(2, '0'),
          ]
          .join(':');
}

export function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
 
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

export function formatNumber(number, dec = 2, dsep, tsep) {
  if(number == 0) return 0
  if (isNaN(+number) || number == null) return '';
  number = parseFloat(number)
  number = number.toFixed(~~dec);
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
}

export async function getETHPrice() {
  let price = 260
  try {
    let req = await fetch('https://pushservice.curve.fi/getETHprice');
    let res = await req.json()
    price = res.price
  }
  catch(err) {
    console.error(err)
    try {
      let req = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      let res = await req.json()
      price = res.ethereum.usd
    }
    catch(err) {
      console.error(err)
    }
  }
  return price
}

export function findClosestIndex(timestamp, data) {
    let index = data.findIndex(d=>d.timestamp - timestamp > 0);
    return index;
}

export function binary_search(x, val) {
    let ascending = (x[x.length - 1] > x[0])
    let start = 0
    let end = x.length - 1

    while (true) {
        if (Math.abs(start - end) <= 1) return Math.min(start, end)
        if (x[start] == val) return start
        if (x[end] == val) return end

        let mid = Math.floor((start + end) / 2)

        if (ascending) {
            if (val >= x[mid])
                start = mid
            else
                end = mid
        } else {
            if (val <= x[mid])
                start = mid
            else
                end = mid
        }
    }
}

export function interp(x, y, val) {
  let x_min = Math.min(x[0], x[x.length - 1])
  let x_max = Math.max(x[0], x[x.length - 1])
  return val => {
    if ((val <= x_min) | (val >= x_max))
        return 0
    let i = binary_search(x, val)
    return y[i] + (y[i+1] - y[i]) / (x[i+1] - x[i]) * (val - x[i])
  }
}

export function chunkArr(arr, chunks) {
  return new Array(Math.ceil(arr.length / chunks)).fill().map((_, i) => arr.slice(i*chunks,i*chunks+chunks))
}

export async function AES_GCM_encrypt(message, secretkey) {
  var iv = crypto.getRandomValues(new Uint8Array(16));
  var ivHex = bytesToHexString(iv);
  var pwUtf8 = new TextEncoder().encode(secretkey);
  let hash = await crypto.subtle.digest('SHA-256', pwUtf8)
  var pwHex = bytesToHexString(hash);
  var keyData = hexStringToUint8Array(pwHex);
  let key = await crypto.subtle.importKey("raw", keyData, "aes-gcm", false, ["encrypt"])
  var plainText = message;
  let cypherText = await crypto.subtle.encrypt({
    name: "aes-gcm",
    iv: iv
  }, key, asciiToUint8Array(plainText));
  return ivHex + bytesToHexString(cypherText)
}

export async function AES_GCM_decrypt(message, secretkey) {
  var pwUtf8 = new TextEncoder().encode(secretkey);
  let hash = await crypto.subtle.digest('SHA-256', pwUtf8)
  var pwHex = bytesToHexString(hash);
  var keyData = hexStringToUint8Array(pwHex);
  let key = await crypto.subtle.importKey("raw", keyData, "aes-gcm", false, ["decrypt"])
  var cipherText = message;
  var iv = hexStringToUint8Array(cipherText.slice(0, 32));
  var cipherHex = cipherText.slice(32);
  let plainText = await crypto.subtle.decrypt({
    name: "aes-gcm",
    iv: iv
  }, key, hexStringToUint8Array(cipherHex));
  return bytesToASCIIString(plainText);
}

export function hexStringToUint8Array(hexString) {
  if (hexString.length % 2 != 0)
    throw "Invalid hexString";
  var arrayBuffer = new Uint8Array(hexString.length / 2);

  for (var i = 0; i < hexString.length; i += 2) {
    var byteValue = parseInt(hexString.substr(i, 2), 16);
    if (byteValue == NaN)
      throw "Invalid hexString";
    arrayBuffer[i / 2] = byteValue;
  }

  return arrayBuffer;
}

export function bytesToHexString(bytes) {
  if (!bytes)
    return null;

  bytes = new Uint8Array(bytes);
  var hexBytes = [];

  for (var i = 0; i < bytes.length; ++i) {
    var byteString = bytes[i].toString(16);
    if (byteString.length < 2)
      byteString = "0" + byteString;
    hexBytes.push(byteString);
  }

  return hexBytes.join("");
}

export function asciiToUint8Array(str) {
  var chars = [];
  for (var i = 0; i < str.length; ++i)
    chars.push(str.charCodeAt(i));
  return new Uint8Array(chars);
}

export function bytesToASCIIString(bytes) {
  return String.fromCharCode.apply(null, new Uint8Array(bytes));
}

export function getSignatureParameters(signature) {
  if (!web3.utils.isHexStrict(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = web3.utils.hexToNumber(v);
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v
  };
}

export function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}




Vue.filter('formatNumber', formatNumber)
