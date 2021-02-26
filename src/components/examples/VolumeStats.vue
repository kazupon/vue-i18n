<template>
	<div>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import allabis from '../../allabis'
	import * as volumeStore from '../common/volumeStore'

	export default {
		data: () => ({
			pools: null,
			data: null,
		}),

		async created() {
			let pools = Object.keys(allabis)
							.filter(pool => pool != 'y' && pool != 'susd' && pool != 'tbtc')
							.map(pool => pool == 'susdv2' ? 'susd' : pool == 'iearn' ? 'y' : pool == 'ren' ? 'ren2' : pool == 'sbtc' ? 'rens' : pool)
			this.pools = pools
			let data = await Promise.all(pools.map(pool => fetch(`https://beta.curve.fi/raw-stats/${pool}-30m.json`)))
			this.data = await Promise.all(data.map(d => d.json()))

			let btcPrices = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1589587198&to=${(Date.now() / 1000) | 0}`)
			btcPrices = await btcPrices.json()

			Vue.set(this.data, 6, this.data[6].map(d => {
				d.volume = Object.fromEntries(Object.entries(d.volume).map(([k, v]) => [k, v.map(vol => vol * volumeStore.findClosestPrice(d.timestamp, btcPrices.prices))]))
				return d;
			}))

			this.getVolumeLast24h('susd')
			this.getVolumePairLast24h('renBTC-WBTC')
		},

		methods: {
			pairToIdx(pair) {
				let i = pair.split('-')[0]
				let j = pair.split('-')[1]

				let indexes = {
					'DAI': 0,
					'USDC': 1,
					'USDT': 2,
					'TUSD': 3,
					'BUSD': 3,
					'sUSD': 3,
					'PAX': 3,
					'renBTC': 0,
					'WBTC': 1,
				}

				return indexes[i] + '-' + indexes[j];
			},

			async getVolumeLast24h(pool) {
				let data
				if(pool) data = [this.data[this.pools.indexOf(pool)].slice(-48)] 
				else data = this.data.map(d => d.slice(-48))
				console.log(data, "THE DATA")

				let volume = 0

				for(let [i, pooldata] of data.entries()) {
					let thepool = this.pools[i]
					if(pool) thepool = pool
					if(thepool == 'susd') thepool = 'susdv2'
					console.log(thepool, "THE POOL")
					for(let d of pooldata) {
						volume += Object.entries(d.volume)
									.map(([pair, value]) => value[0] / allabis[thepool].coin_precisions[pair.split('-')[0]])
									.reduce((a, b) => a + b, 0)
					}
				}

				console.log(volume, "VOLUME LAST 24H")
			},

			async getVolumePairLast24h(_pair, pool) {
				let data
				if(pool) data = [this.data[this.pools.indexOf(pool)].slice(-48)] 
				else data = this.data.map(d => d.slice(-48))
				if(_pair.includes('sUSD')) {
					pool = 'susd'
					data = [this.data[4].slice(-48)]
				}
				if(_pair.includes('TUSD')) {
					pool = 'y'
					data = [this.data[2].slice(-48)]
				}
				if(_pair.includes('BUSD')) {
					pool = 'busd'
					data = [this.data[3].slice(-48)]
				}
				if(_pair.includes('PAX')) {
					pool = 'pax'
					data = [this.data[5].slice(-48)]
				}
				if(_pair.includes('renBTC') || _pair.includes('WBTC')) {
					pool = 'ren2'
					data = [this.data[6].slice(-48)]
				}
				console.log(data, "THE DATA")
				_pair = this.pairToIdx(_pair)
				console.log(_pair, "PAIR TO IDX")
				let i = _pair.split('-')[0]
				let j = _pair.split('-')[1]
				let inverse = i > j
				if(inverse) _pair = j + '-' + i

				let volume = 0

				for(let [i, pooldata] of data.entries()) {
					let thepool = this.pools[i]
					if(pool) thepool = pool
					if(thepool == 'susd') thepool = 'susdv2'
					if(thepool == 'ren2') thepool = 'ren'
					console.log(thepool, "THE POOL")
					for(let d of pooldata) {
						console.log(d.volume[_pair] && d.volume[_pair][0] / 1e8, "VOLUME")
						volume += Object.entries(d.volume)
									.filter(([pair, _ ]) => pair == _pair)
									.map(([pair, value]) => value[inverse ? 1 : 0] / allabis[thepool].coin_precisions[pair.split('-')[inverse ? 1 : 0]])
									.reduce((a, b) => a + b, 0)
					}
				}

				console.log(volume, "VOLUME LAST 24H FOR PAIR")

			},

		}
	}
</script>