const fs = require('fs')
const puppeteer = require('puppeteer')

function parseTimings (timings) {
  const durationPairs = []
  let pair = null
  timings.forEach(timing => {
    if (timing.ph === 'b') {
      pair = {
        begin: timing
      }
    } else if (timing.ph === 'e') {
      if (pair && pair.begin) {
        pair.end = timing
        durationPairs.push(pair)
        pair = null
      }
    }
  })
  return durationPairs
}

async function perform (browser, target, url, profileName) {
  const page = await browser.newPage()
  try {
    await page.tracing.start({ path: `./generate/${profileName}.json` })
    await page.goto(url)
    for (let i = 0; i < 10; i++) {
      await page.waitForSelector('#app button')
      await page.click('#app button')
    }
    await page.tracing.stop()
    await page.screenshot({ path: `./generate/${profileName}.png` });
    const profile = require(`./generate/${profileName}.json`)
    const traces = profile.traceEvents
    const timings = traces.filter(timing => {
      return timing.cat.match(/blink\.user_timing/) && timing.name.match(/.*<App> render$/)
    })
    const durations = parseTimings(timings)
    durations.forEach((duration, index) => {
      console.log(`${target} ${index}: ${(duration.end.ts - duration.begin.ts) / 1000} ms`)
    })
  } catch (e) {
    console.error(e)
  } finally {
    await page.close()
  }
}

async function main () {
  const browser = await puppeteer.launch()
  try {
    await perform(browser, 'plain', 'http://localhost:5000/plain/', 'plain')
    await perform(browser, 'method', 'http://localhost:5000/method/', 'method')
    await perform(browser, 'directive', 'http://localhost:5000/directive/', 'directive')
    await perform(browser, 'compiler', 'http://localhost:5000/compiler/', 'compiler')
  } catch (e) {
    console.error(e)
  } finally {
    browser.close()
  }
}

main()
