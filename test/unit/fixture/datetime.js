export default {
  'en-US': {
    short: { // DD/MM/YYYY, hh:mm (AM|PM)
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York'
    }
  },
  'ja-JP': {
    long: { // YYYY/MM/DD hh:mm:ss
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZone: 'Asia/Tokyo'
    },
    short: { // YYYY/MM/DD hh:mm
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo'
    }
  }
}
