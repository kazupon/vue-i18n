<template>
	
</template>

<script>
	import { contract, allCurrencies, getters } from '../contract'
	import allabis from '../allabis'

	import * as helpers from '../utils/helpers'

	export default {
		data: () => ({
			pools: ['compound', 'usdt', 'iearn', 'busd', 'susdv2', 'pax', 'tbtc', 'ren'],
			swapContracts: [],
			gas: {},
		}),
		created() {
			this.$watch(() => contract.multicall, val => {
				if(val)
					this.mounted()
			})
		},
		mounted() {
			contract.multicall && this.mounted();
		},
		computed: {
			tokenExchangeEvent() {
				return web3.utils.sha3('TokenExchange(address,int128,uint256,int128,uint256)')
			},
			tokenExchangeUnderlyingEvent() {
				return web3.utils.sha3('TokenExchangeUnderlying(address,int128,uint256,int128,uint256)')
			},
		},
		methods: {
			async mounted() {
				this.swapContracts = Object.keys(allabis)
					.filter(pool => this.pools.includes(pool))
					.map(pool => new web3.eth.Contract(allabis[pool].swap_abi, allabis[pool].swap_address))

				this.gas = this.swapContracts.map(c => c._address).reduce((a, b) => ({...a, [b]: {}}), {})
				let addresses = this.swapContracts.map(c => c._address.toLowerCase())
				let allevents = await this.getAllEvents();
				let results = await Promise.all(allevents)
				results = await Promise.all(results.flat(3))
				results = results.flat()
				for(let result of results) {
					if(!result) continue;
					let pair = result.returnValues.sold_id + '-' + result.returnValues.bought_id
					let tx = await web3.eth.getTransactionReceipt(result.transactionHash)
					if(!addresses.includes(tx.to.toLowerCase())) continue
					let gasUsed = tx.gasUsed
					let obj = this.gas[result.address][result.event]
					if(!obj || Object.keys(obj).length === 0 && obj.constructor === Object) this.gas[result.address][result.event] = {}
					if(!this.gas[result.address][result.event][pair]) this.gas[result.address][result.event][pair] = []
					this.gas[result.address][result.event][pair].push(gasUsed)
				}
			},
			async getAllEvents() {
				let latestblock = +(await web3.eth.getBlockNumber()) - 300000;
				let events = []
				for(let i = 0; i < 3; i++) {
					events.push(this.getEvents(latestblock - i*100000, latestblock))
					latestblock -= i*100000
				}
				return events
			},
			async getEvents(fromBlock, toBlock) {
				return this.pools.map(pool => {
					let topics = [];
						if(['tbtc', 'ren'].includes(pool)) {
							topics = [
								this.swapContracts[this.pools.indexOf(pool)]
									.getPastEvents(this.tokenExchangeEvent, 
										{ 
											fromBlock: fromBlock,
											toBlock: toBlock,
										}),
							]
						}
						else {
							topics = [
								this.swapContracts[this.pools.indexOf(pool)]
									.getPastEvents(this.tokenExchangeUnderlyingEvent, 
										{ 
											fromBlock: fromBlock,
											toBlock: toBlock,
										}),
								this.swapContracts[this.pools.indexOf(pool)]
									.getPastEvents(this.tokenExchangeEvent, 
										{ 
											fromBlock: fromBlock,
											toBlock: toBlock,
										}),
							]
						}		
					return topics
				})
			},
		}
	}
</script>