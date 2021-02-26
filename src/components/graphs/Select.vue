<template>
	<div>
		<div id='poolselect'>
			<input id='compoundpool' type='checkbox' value='compound' v-model='pools'/>
			<label for='compoundpool'>Compound</label>

			<input id='usdtpool' type='checkbox' value='usdt' v-model='pools'/>
			<label for='usdtpool'>usdt</label>

			<input id='ypool' type='checkbox' value='y' v-model='pools'/>
			<label for='ypool'>Y</label>

			<input id='busdpool' type='checkbox' value='busd' v-model='pools'/>
			<label for='busdpool'>bUSD</label>

			<input id='susdpool' type='checkbox' value='susdv2' v-model='pools'/>
			<label for='susdpool'>sUSD</label>

			<input id='paxpool' type='checkbox' value='pax' v-model='pools'/>
			<label for='paxpool'>PAX</label>

			<input id='tbtcpool' type='checkbox' value='tbtc' v-model='pools'/>
			<label for='tbtcpool'>tBTC</label>

			<input id='renpool' type='checkbox' value='ren' v-model='pools'/>
			<label for='renpool'>renBTC</label>

			<input id='sbtcpool' type='checkbox' value='sbtc' v-model='pools'/>
			<label for='sbtcpool'>sBTC</label>
		</div>

		<select class='tvision' v-model='pair'>
			<option v-for = 'v in allPairs' :value='v'>{{v.val | toUpper}}</option>
		</select>
		<select class='tvision' v-model='interval'>
			<option v-for = 'v in intervals' :value='v'>{{v}}</option>
		</select>
		<button @click="emitSelect">Select</button>
		<button @click="emitUpdate">Update charts</button>
	</div>
</template>

<script>
	import { contract, allCurrencies } from '../../contract'
	import EventBus from './EventBus'
	import tradeStore from './tradeStore'
	import * as helpers from '../../utils/helpers'

	import SelectPool from '../common/SelectPool.vue'

	export default {
		components: {
			SelectPool
		},
		data: () => ({
			pools: tradeStore.pools,
			pool: tradeStore.pool,
			pair: '',
			interval: tradeStore.interval,
			intervals: tradeStore.intervals
		}),
		watch: {
			pools(val) {
				this.pushState()
			},
			pair() {
				this.pushState()
			},
			interval() {
				this.pushState()
			}
		},
		created() {
			this.$watch(() => contract.web3, this.mounted)
		},
		mounted() {
			contract.web3 && this.mounted()
		},
		methods: {
			async mounted() {
				let params = this.$route.params.params
				if(params && params.length) {
					params = params.split('/')
					//is the url like /DAI-USDC/30m
					//or is it like /compound,usdt,y,busd,susdv2/DAI-USDC/30m
					let pair = params[params.length - 2];
					let interval = params[params.length - 1] || '30m';
					if(params.length == 3)
					this.pools = tradeStore.allPools.filter(pool => params[0].split('_').includes(pool))
					this.pair = this.allPairs.find(p => p.val == pair.toLowerCase())
					this.interval = interval
					this.emitSelect()
				}
				else
					this.pair = this.pairs[0];
				//this.$emit('selected', this.pool, this.pair, this.interval)
			},
			emitSelect() {
				let currenciesPools = Object.values(this.filteredCurrencies).map(v=>Object.keys(v))
				let pairPools = this.isUnique(this.pair.val)
				if(pairPools.length == 1) {
					let pairPoolIndex = currenciesPools.map(v=>v.join()).indexOf(pairPools[0].join())
					let pool = Object.keys(this.filteredCurrencies)[pairPoolIndex]
					this.pools = tradeStore.pools = [pool]
				}
				let currency_i = this.pair.val.split('-')[0]
				let currency_j = this.pair.val.split('-')[1]
				let poolsWithPair = Object.fromEntries(Object.entries(this.filteredCurrencies).filter(([key, pairs]) => Object.keys(pairs).includes(currency_i) && Object.keys(pairs).includes(currency_j)))
				poolsWithPair = Object.keys(poolsWithPair).map(pool => pool == 'iearn' ? 'y' : pool)
				this.pools = tradeStore.pools = poolsWithPair.filter(pool => this.pools.includes(pool))
				tradeStore.pairIdx = this.pair.idx
				tradeStore.pairVal = this.pair.val
				tradeStore.interval = this.interval
				//EventBus.$emit('selected', this.pool, this.pair, this.interval)
			},
			emitUpdate() {
				EventBus.$emit('updateCharts')
			},
			pushState() {
				history.pushState({}, null, '/trade/' + this.pools.join('_') + '/' + this.pair.val.toUpperCase() + '/' + this.interval)
			},
			isUnique(pair) {
				let [i, j] = pair.split('-').map(p => p.toLowerCase())
				return Object.values(this.filteredCurrencies)
					.map(v=>Object.keys(v))
					.filter(currs => currs.includes(i) && currs.includes(j))
			},
		},
		computed: {
			allPairs() {
				let currencies = Object.assign({}, this.filteredCurrencies)
				delete currencies.susd
				let pairs = Object.values(currencies).filter(p=>p != 'susd').map(v=>Object.keys(v))
				let allPairs = []
				for(let pair of pairs) {
					for(let [i, val] of pair.entries()) {
						for(let [j, val1] of pair.entries()) {
							if(i != j && allPairs.find(p=>p.val == `${val}-${val1}`) === undefined) {
								allPairs.push({
									idx: `${i}-${j}`,
									val: `${val}-${val1}`
								})
							}
						}
					}
				}
				return allPairs
			},
			pairs() {
				//this.pools.map(p=>Object.entriesthis.filteredCurrencies[this.pool])
				if(!this.pools.length) return []
				let pools = this.pools.map(p=>p == 'y' ? 'iearn' : p)
				let duplicates
				if(pools.length > 1) {
					let filteredCurrencies = Object.keys(this.filteredCurrencies).filter(p => pools.includes(p))
					duplicates = Object.keys(this.filteredCurrencies)
										.flatMap(f=>Object.keys(this.filteredCurrencies[f]))
										.filter((k, i, all)=>all.indexOf(k) === i && all.lastIndexOf(k) !== i)
				}
				else {
					duplicates = Object.keys(this.filteredCurrencies[this.pools[0] == 'y' ? 'iearn' : this.pools[0]])
				}
				var pairs = []
				for(let [i, val] of duplicates.entries()) {
					for(let [j, val1] of duplicates.entries()) {
						if(i != j) pairs.push({
							idx: `${i}-${j}`,
							val: `${val}-${val1}`
						})
					}
				}
				return pairs
			},
			filteredCurrencies() {
			return allCurrencies;
          	return Object.fromEntries(Object.entries(allCurrencies).filter(
			      ([key, val])=>!['tbtc'].includes(key)
			   ))
          	}
		}
	}
</script>

<style scoped>
	button {
		box-shadow: none;
		margin-left: 10px;
	}
	select {
		margin-left: 10px;
		box-shadow: none;
	}
	select:nth-of-type(1) {
		margin-left: 0;
	}
	option {
		color: black;
		background: #d7d5d5;
	}
	#poolselect {
		margin-bottom: 1em;
	}
	#poolselect > label:nth-of-type(1) {
		margin-left: 0;
	}
	#poolselect > label {
		margin-left: 1em;
	}
	@media only screen and (min-device-width : 320px) and (max-device-width : 730px) {
		select, button {
			display: block;
		}
		select, button {
			margin-left: 0;
			margin-top: 10px;
		}
	}
</style>