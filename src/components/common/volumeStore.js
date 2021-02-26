import Vue from 'vue'
import abis from '../../allabis'

	let initState = () => ({
		compound: [],
		usdt: [],
		y: [],
		busd: [],
		susd: [],
		pax: [],
		tbtc: [],
		ren: [],
		sbtc: [],
	})

export const state = Vue.observable({
	volumes: {
		...Object.fromEntries(Object.entries(initState()).map(([key, el])=>[key, [-1, -1]]))
	},
	volumeData: {
		5: {
			...initState()
		},
		30: {
			...initState()
		},
		1440: {
			...initState()
		}
	},
	allVolume: {
		...initState()
	}
})

export function findClosestPrice(timestamp, data) {
	let result = data.find(d=>Date.parse(d[0])/1000 - timestamp > 0);
	if(result === undefined) return data[data.length - 1][1]
	return result.price
}


export async function fetchVolumeData(pools, refresh = false, period = 5) {
	if(!Array.isArray(pools)) pools = [pools]
	pools = pools.map(p => p == 'iearn' ? 'y' : p == 'susdv2' ? 'susd' : p == 'ren2' ? 'ren' : p == 'rens' ? 'sbtc' : p)
	if(!refresh) pools = pools.filter(pool => !state.volumeData[period][pool].length)
	//pools = pools.filter(pool => !['tbtc'].includes(pool))
	let requests = pools.map(p => {
		if(p == 'ren') p = 'ren2'
		if(p == 'sbtc') p = 'rens'
		return fetch(`${window.domain}/raw-stats/${p}-${period}m.json`)
	})
	//will work for 17 days on 5 minutes chart
	if(pools.includes('tbtc') || pools.includes('ren') || pools.includes('sbtc'))
		requests.push(fetch(`
			https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1589587198&to=${(Date.now() / 1000) | 0}`
			))
	requests = await Promise.all(requests)
	let jsons = await Promise.all(requests.map(r => r.json()))
	let btcPrices = jsons[jsons.length-1]
	if(pools.includes('tbtc') || pools.includes('ren')) jsons = jsons.slice(0, -1)
	for(let [i, data] of jsons.entries()) {
		let pool = pools[i]
		if(['tbtc', 'ren', 'sbtc'].includes(pool)) {
			data = data.map(d => {
				d.volume = Object.fromEntries(Object.entries(d.volume).map(([k, v]) => [k, v.map(vol => vol * findClosestPrice(d.timestamp, btcPrices.prices))]))
				return d;
			})
		}
		state.volumeData[period][pool] = data
	}
}

export async function getVolumes(pools, refresh = false) {
	if(!Array.isArray(pools)) pools = [pools]
	pools = pools.map(p => p == 'iearn' ? 'y' : p == 'susdv2' ? 'susd' : p == 'ren' ? 'ren2' : p == 'sbtc' ? 'rens' : p)
	if(Object.values(state.volumes).filter(v=>v[0]!=-1).length == pools.length && !refresh) return;
	let req = await Promise.all([fetch(`${window.domain}/raw-stats/apys.json`), fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)])
	let [stats, btcPrice] = await Promise.all(req.map(r => r.json()))
    btcPrice = btcPrice.bitcoin.usd
    for(let [pool, volume] of Object.entries(state.volumes)) {
    	if(volume[0] == -1) {
    		let volume = pool == 'ren' ? stats.volume.ren2 : pool == 'sbtc' ? stats.volume.rens : stats.volume[pool]
    		if(['tbtc', 'ren', 'sbtc'].includes(pool)) volume *= btcPrice
    		Vue.set(state.volumes[pool], 0, volume || 0)
    		Vue.set(state.volumes[pool], 1, pool == 'ren' ? stats.volume.ren2 : pool == 'sbtc' ? stats.volume.rens : stats.volume[pool])
    	}
    }
}

export async function getDailyVolume(pool, refresh = false, interval = 30) {
	pool = pool == 'iearn' ? 'y' : pool == 'susdv2' ? 'susd' : pool

	if(state.allVolume[pool].length && !refresh) return;
	await fetchVolumeData(pool, refresh, interval)
	let json = state.volumeData[interval][pool];
	state.volumeData[pool] = json
	for(let data of json) {
		state.allVolume[pool].push([
			data.timestamp * 1000,
			Object.entries(data.volume).map(([k, v]) => {
    			let precisions = abis[pool == 'susd' ? 'susdv2' : pool].coin_precisions[k.split('-')[0]]
    			return v[0] / precisions
    		}).reduce((a, b) => a + b, 0)
		])
	}
}


export async function getLendingAPY(pool, refresh = false, interval = 30) {
	pool = pool == 'iearn' ? 'y' : pool == 'susdv2' ? 'susd' : pool
	if(!state.volumeData[interval][pool].length)
		await fetchVolumeData(pool, refresh, interval)

	let lendingrates = []

	for(let j = 1; j < state.volumeData[interval][pool].length; j++) {
		let json = state.volumeData[interval][pool]
		let data = json[j]
		let prevdata = json[j-1]
		let balances = data.balances.map((b,bi)=>b /= abis[pool == 'susd' ? 'susdv2' : pool].coin_precisions[bi])
		let apdrate = data.rates.map((rate, k) => {
			return (rate / prevdata.rates[k]) - 1
		})
		let balancesp = balances.map((b, bi) => b *= apdrate[bi])
		let sump = balancesp.reduce((a,b) => a + b, 0)
		let sumbalances = balances.reduce((a, b) => a + b, 0)
		let apd = sump / sumbalances
		let daylen = data.timestamp - prevdata.timestamp
		let apdy = (1 + apd) ** (365 * 86400 / daylen)
		lendingrates.push([
			data.timestamp * 1000,
			(apdy - 1) * 100
		])
	}

	return lendingrates;

}

export function totalVolume() {
	return Object.values(state.volumes).reduce((a, b) => {
		return a + b[0]
	}, 0)
}