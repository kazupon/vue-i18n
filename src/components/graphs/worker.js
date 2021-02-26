import * as Comlink from 'comlink'
import BN from 'bignumber.js'

import stableswap_fns from '../../utils/stableswap_fns'

const currencies = {
	compound: {
		dai: 'cDAI',
		usdc: 'cUSDC'
	},
	usdt: {
		dai: 'cDAI',
		usdc: 'cUSDC',
		usdt: 'USDT'
	},
	iearn: {
		dai: 'yDAI',
		usdc: 'yUSDC',
		usdt: 'yUSDT',
		tusd: 'yTUSD'
	},
	busd: {
		dai: 'yDAI',
		usdc: 'yUSDC',
		usdt: 'yUSDT',
		busd: 'ybUSD'
	},
	susd: {
		susd: 'ySUSD',
		ycurve: 'yCurve',
	},
	susdv2: {
		dai: 'DAI',
		usdc: 'USDC',
		usdt: 'USDT',
		susd: 'sUSD',
	},
	pax: {
		dai: 'ycDAI',
		usdc: 'ycUSDC',
		usdt: 'ycUSDT',
		pax: 'PAX',
	},
	tbtc: {
		tbtc: 'TBTC',
		wbtc: 'wBTC',
		hbtc: 'hBTC',
	},
	ren: {
		renbtc: 'renBTC',
		wbtc: 'wBTC',
	},
	sbtc: {
		renbtc: 'renBTC',
		wbtc: 'wBTC',
		sbtc: 'sBTC',
	},
}

let calcPrice = (config, fromCurrency, toCurrency, precisions, usefee = false) => {
	let calc = stableswap_fns(config);
	return calc.get_dy_underlying(fromCurrency,toCurrency,precisions,usefee).toString(10)
};

let calcPriceWrapped = (config, fromCurrency, toCurrency, precisions, usefee = false) => {
	let calc = stableswap_fns(config)
	return calc.get_dy(fromCurrency,toCurrency,precisions,usefee).toString(10)
}

let normalizeCoinIdx = (i, pool) => {
	if(pool == 'sbtc' && i == 0) return 8;
	if(pool == 'sbtc' && i == 1) return 10;
	if(pool == 'sbtc' && i == 2) return 11;
	if(pool == 'ren' && i == 0) return 10;
	if(pool == 'ren' && i == 1) return 8;
	if(pool == 'tbtc' && i == 0) return 7;
	if(pool == 'tbtc' && i == 1) return 8;
	if(pool == 'tbtc' && i == 2) return 9;
	if(pool == 'pax' && i == 3) return 6;
	if(pool == 'susd' && i == 3) return 5;
	if(pool == 'busd' && i == 3) return 4;
	return i;
}

let getVolumePerCoin = (data, pools, allabis) => {

	let poolnames = pools.map(entry => entry[0])
	let volumes = []
	let maxlenpool = Object.keys(data).reduce((a, b) => data[a].length > data[b].length ? a : b)
	for(let i = 0; i < data[maxlenpool].length; i++) {
		let timestamp = data[maxlenpool][i].timestamp
		for(let pool of poolnames) {
			let key = pool
			let v = data[key][i]
			if(!v || Object.keys(v).length === 0 && v.constructor === Object) continue;
			let vol = Object.entries(v.volume)
			for(let [pair, val] of vol) {
				let [m, n] = pair.split('-')
				let volSold = val[0]
				let volBought = val[1]
				let normM = normalizeCoinIdx(m, key)
				let normN = normalizeCoinIdx(n, key)
				if(volumes[normM] === undefined) volumes[normM] = []
				if(volumes[normN] === undefined) volumes[normN] = []
				volumes[normM].push([
					v.timestamp * 1000,
					volSold / allabis[key == 'y' ? 'iearn' : key == 'susd' ? 'susdv2' : key].coin_precisions[m]
				])
				volumes[normN].push([
					v.timestamp * 1000,
					volBought / allabis[key == 'y' ? 'iearn' : key == 'susd' ? 'susdv2' : key].coin_precisions[n]
				])
			}
		}
	}
	return volumes
}

let pairToName = (pair, pool) => {
	pool = pool == 'y' ? 'iearn' : pool == 'susd' ? 'susdv2' : pool
	let i = pair.split('-')[0]
	let j = pair.split('-')[1]

	return (Object.keys(currencies[pool])[i] + ' ⇄ ' + Object.keys(currencies[pool])[j]).toUpperCase()
}

let pairReverse = (pair) => {
	return pair.split(' ⇄ ')[1] + ' ⇄ ' + pair.split(' ⇄ ')[0]
}

let getVolumePerPair = (data, pools, allabis) => {
	let poolnames = pools.map(entry => entry[0])
	let volumes = {}
	let maxlenpool = Object.keys(data).reduce((a, b) => data[a].length > data[b].length ? a : b)
	for(let i = 0; i < data[maxlenpool].length; i++) {
		let timestamp = data[maxlenpool][i].timestamp
		for(let pool of poolnames) {
			let key = pool
			let v = data[key][i]
			if(!v || Object.keys(v).length === 0 && v.constructor === Object) continue;
			let vol = Object.entries(v.volume)
			for(let [pair, val] of vol) {
				let pairName = pairToName(pair, pool)
				if(!volumes[pairName]) volumes[pairName] = []
				//if(!volumes[pairReverse(pairName)]) volumes[pairReverse(pairName)] = []
				volumes[pairName].push([
					v.timestamp * 1000,
					val[0] / allabis[key == 'susd' ? 'susdv2' : key].coin_precisions[pair.split('-')[0]]
				])
				// volumes[pairReverse(pairName)].push([
				// 	v.timestamp * 1000,
				// 	val[1] / allabis[key == 'susd' ? 'susdv2' : key].coin_precisions[pair.split('-')[1]]
				// ])
			}
		}
	}
	return volumes
}

Comlink.expose({calcPrice:calcPrice, calcPriceWrapped:calcPriceWrapped, getVolumePerCoin, getVolumePerPair});