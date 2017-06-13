const formats = {
  'en-US': {
    short: { // DD/MM/YYYY, hh:mm (AM|PM)
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    }
  },
  'ja-JP': {
    long: { // YYYY/MM/DD hh:mm:ss
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    },
    short: { // YYYY/MM/DD hh:mm
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    }
  }
}

// NOTE: avoid webkit(phatomjs/safari) & Intl timeZone don't support...
if (isChrome) {
  formats['en-US']['short']['timeZone'] = 'America/New_York'
  formats['ja-JP']['short']['timeZone'] = 'Asia/Tokyo'
  formats['ja-JP']['long']['timeZone'] = 'Asia/Tokyo'
} else {
  formats['en-US']['short']['timeZone'] = 'UTC'
  formats['ja-JP']['short']['timeZone'] = 'UTC'
  formats['ja-JP']['long']['timeZone'] = 'UTC'
}

export default formats
