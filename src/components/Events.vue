<template>
	<div class='white window'>
		<fieldset>
			<legend>Events</legend>
			<div id='poolselect'>
				<select class = 'tvision' v-model='event'>
					<option v-for = '(option, i) in allEvents' :value = 'i'> {{ option }} </option>
				</select>
				<div id='poollist'>
					<input id='compoundpool' type='checkbox' value='compound' v-model='pools'/>
					<label for='compoundpool'>Compound</label>

					<input id='usdtpool' type='checkbox' value='usdt' v-model='pools'/>
					<label for='usdtpool'>usdt</label>

					<input id='ypool' type='checkbox' value='iearn' v-model='pools'/>
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

				<button @click="selectPoolsHandler" id='select'>Select</button>

				<table class="tui-table showdesktop" v-if='displayedEvent == 0'>
				    <thead>
				        <tr>
				        	<th>Time</th>
				        	<th>Block #</th>
				            <th>Swap</th>
				            <th>tokens sold</th>
				            <th>tokens bought</th>
				            <th>Pool</th>
				            <th>Event</th>
				            <!-- <th>Virtual price</th> -->
				            <th>Yield</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-show='!exchanges.length' class='loadingtr'>
				    		<td v-for='n in 8'><span class='loading line'></span></td>
				    	</tr>
				        <tr v-for='event in paginatedExchanges'>
				        	<td>
				        		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				        			<span class='tooltip'>
				        				{{ event.timestamp && formatTime(event.timestamp) }}
				        				<span class='tooltiptext'>
				        					{{ event.timestamp && formatDateTime(event.timestamp) }}
				        				</span>
				        			</span>
				        		</a>
				        	</td>
				        	<td>
				        		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				        			{{ event.blockNumber }}
				        		</a>
				        	</td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.fromCurrency }}➔{{ event.toCurrency }}
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ isBTC(event) ? event.soldAmount.toFixed(8) : event.soldAmount.toFixed(2) }}
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ isBTC(event) ? event.boughtAmount.toFixed(8) : event.boughtAmount.toFixed(2) }}
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ getPool(event) }}
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.event }}
				            	</a>
		            	 	</td>
		            	 	<!-- <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
		            	 			{{ event.virtual_price}}
		            	 		</a>
		            	 	</td> -->
 		            	 	<td>
		            	 		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
		            	 			{{ (event.yield * 10000).toFixed(4) }} bps
		            	 		</a>
		            	 	</td>
				        </tr>
				    </tbody>
				</table>

				<div class='showmobiletable' v-if='displayedEvent == 0'>
					<div v-for='event in paginatedExchanges' class='eventmobile'>
			        		<div>
			        			Time:

			        			<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			        				{{ event.timestamp && formatDateTime(event.timestamp) }}
			        			</a>
			        		</div>
			        		<div>
			        			Block #:

			        			<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			        			{{ event.blockNumber }}
			        			</a>
			        		</div>
			            	<div>
			            		Swap:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            		{{ event.fromCurrency }}➔{{ event.toCurrency }}
			            		</a>
			            	</div>
			            	<div>
			            		tokens sold:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            		{{ isBTC(event) ? event.soldAmount.toFixed(8) : event.soldAmount.toFixed(2) }}
			            		</a>
			            	</div>
			            	<div>
			            		tokens bought:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            		{{ isBTC(event) ? event.boughtAmount.toFixed(8) : event.boughtAmount.toFixed(2) }}
			            		</a>
			            	</div>
			            	<div>
			            		Pool:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            		{{ getPool(event) }}
			            		</a>
			            	</div>
			            	<div>
			            		Event:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            		{{ event.event }}
			            		</a>
			            	</div>
	            	 	<!-- <td>
			            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
	            	 			{{ event.virtual_price}}
	            	 		</a>
	            	 	</td> -->
	            	 		<div>
	            	 			Yield:

	            	 			<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
	            	 			{{ (event.yield * 10000).toFixed(4) }} bps
	            	 			</a>
	            	 		</div>
			       	</div>
				</div>

				<table class="tui-table showdesktop" v-if='displayedEvent == 1'>
				    <thead>
				        <tr>
				        	<th>Time</th>
				        	<th>Block #</th>
				        	<th>Provider</th>
				        	<!-- <th>Invariant</th> -->
				            <th>token amounts</th>
				            <th>Pool</th>
				            <th>token supply</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-show='!exchanges.length' class='loadingtr'>
				    		<td v-for='n in 7'><span class='loading line'></span></td>
				    	</tr>
				        <tr v-for='event in paginatedExchanges'>
				        	<td>
				        		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				        			<span class='tooltip'>
				        				{{ event.timestamp && formatTime(event.timestamp) }}
				        				<span class='tooltiptext'>
				        					{{ event.timestamp && formatDateTime(event.timestamp) }}
				        				</span>
				        			</span>
				        		</a>
				        	</td>
				        	<td>
				        		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				        			{{ event.blockNumber }}
				        		</a>
				        	</td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ formatAddress(event.returnValues.provider) }}
				            	</a>
				            </td>
				            <!-- <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.returnValues.invariant / 1e18 }}
				            	</a>
				            </td> -->
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		<div class='tooltip'>
				            			{{ isBTC(event) ? totalAmount(event).toFixed(8) : totalAmount(event).toFixed(2) }}
				            			<div class='tooltiptext'>
						            		<div v-for = 'currAmount in showAmounts(event)'>
						            			{{ currAmount }}
						            		</div>
					            		</div>
				            		</div>
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ getPool(event) }}
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.returnValues.token_supply ? (event.returnValues.token_supply / 1e18).toFixed(2) : 'N/A' }}
				            	</a>
				            </td>
				        </tr>
				    </tbody>
				</table>

				<div class='showmobiletable' v-if='displayedEvent == 1'>
					<div v-for='event in paginatedExchanges' class='eventmobile'>
			        		<div>
			        			Time:

			        			<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			        			{{ event.timestamp && formatDateTime(event.timestamp) }}
			        			</a>
			        		</div>
			        		<div>
			        			Block #:

			        			<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			        			{{ event.blockNumber }}
			        			</a>
			        		</div>
			            	<div>
			            		Provider:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			{{ formatAddress(event.returnValues.provider) }}
			            		</a>
			            	</div>
			            	<div>
			            		tokens amounts:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			<div class='tooltip'>
				            			{{ isBTC(event) ? totalAmount(event).toFixed(8) : totalAmount(event).toFixed(2) }}
				            			<div class='tooltiptext'>
						            		<div v-for = 'currAmount in showAmounts(event)'>
						            			{{ currAmount }}
						            		</div>
					            		</div>
				            		</div>
			            		</a>

			            		<div v-for = 'currAmount in showAmounts(event)'>
			            			{{ currAmount }}
			            		</div>
			            	</div>
			            	<div>
			            		Pool:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			{{ getPool(event) }}
			            		</a>
			            	</div>
			            	<div>
			            		Token supply:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			{{ event.returnValues.token_supply ? (event.returnValues.token_supply / 1e18).toFixed(2) : 'N/A' }}
			            		</a>
			            	</div>
			       	</div>
				</div>

				<table class="tui-table showdesktop" v-if='displayedEvent == 2'>
				    <thead>
				        <tr>
				        	<th>Time</th>
				        	<th>Block #</th>
				        	<th>Provider</th>
				        	<!-- <th>Invariant</th> -->
				            <th>token amounts</th>
				            <th>Pool</th>
				            <th>Event</th>
				            <th>token supply</th>
				        </tr>
				    </thead>
				    <tbody>
				    	<tr v-show='!exchanges.length' class='loadingtr'>
				    		<td v-for='n in 7'><span class='loading line'></span></td>
				    	</tr>
				        <tr v-for='event in paginatedExchanges'>
				        	<td>
				        		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				        			{{ event.timestamp && formatTime(event.timestamp) }}
				        		</a>
				        	</td>
				        	<td>
				        		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				        			{{ event.blockNumber }}
				        		</a>
				        	</td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ formatAddress(event.returnValues.provider) }}
				            	</a>
				            </td>
				            <!-- <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.returnValues.invariant / 1e18 }}
				            	</a>
				            </td> -->
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		<div class='tooltip'>
				            			{{ isBTC(event) ? totalAmount(event).toFixed(8) : totalAmount(event).toFixed(2) }}
				            			<div class='tooltiptext'>
				            				<div v-for = 'currAmount in showAmounts(event)'>
						            			{{ currAmount }}
						            		</div>
				            			</div>
				            		</div>
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ getPool(event) }}
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.event }}
				            	</a>
				            </td>
				            <td>
				            	<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.returnValues.token_supply ? (event.returnValues.token_supply / 1e18).toFixed(2) : 'N/A' }}
				            	</a>
				            </td>
				        </tr>
				    </tbody>
				</table>

				<div class='showmobiletable' v-if='displayedEvent == 2'>
					<div v-for='event in paginatedExchanges' class='eventmobile'>
			        		<div>
			        			Time:

			        			<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			        			{{ event.timestamp && formatDateTime(event.timestamp) }}
			        			</a>
			        		</div>
			        		<div>
			        			Block #:

			        			<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			        			{{ event.blockNumber }}
			        			</a>
			        		</div>
			            	<div>
			            		Provider:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			{{ formatAddress(event.returnValues.provider) }}
			            		</a>
			            	</div>
			            	<div>
			            		tokens amounts:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			<div class='tooltip'>
				            			{{ isBTC(event) ? totalAmount(event).toFixed(8) : totalAmount(event).toFixed(2) }}
				            			<div class='tooltiptext'>
						            		<div v-for = 'currAmount in showAmounts(event)'>
						            			{{ currAmount }}
						            		</div>
					            		</div>
				            		</div>
			            		</a>

			            		<div class='tooltiptext'>
				            		<div v-for = 'currAmount in showAmounts(event)'>
				            			{{ currAmount }}
				            		</div>
			            		</div>
			            	</div>
			            	<div>
			            		Pool:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			{{ getPool(event) }}
			            		</a>
			            	</div>
			            	<div>
			            		Event:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
				            		{{ event.event }}
			            		</a>
			            	</div>
			            	<div>
			            		Token supply:

			            		<a :href="`https://etherscan.io/tx/${event.transactionHash}`">
			            			{{ event.returnValues.token_supply ? (event.returnValues.token_supply / 1e18).toFixed(2) : 'N/A' }}
			            		</a>
			            	</div>
			       	</div>
				</div>


				<div>
					<button id='loadmore' @click='loadMore' v-show='page == pages && exchanges.length > perPage'>Load more</button>
				</div>
				<div id='pages'>
					<button @click='page > 0 && page--'>Prev</button>
					Page: {{page}} (of {{pages}})
					<button @click='page < pages && page++'>Next</button>
					<div>
						<label for='gotopage'> Go to: </label>
						<input id='gotopage' type='text' v-model='gotopage'>
						<button @click='goTo'>Go</button>
					</div>
					<div>
						<label for='perpage'>Per page:</label>
						<select class='tvision' v-model='perPage' id='perpage'>
							<option value='10'>10</option>
							<option value='20'>20</option>
							<option value='50'>50</option>
							<option value='100'>100</option>
							<option value='300'>300</option>
						</select>
					</div>
				</div>
			</div>
		</fieldset>
	</div>
</template>

<script>
	import { contract, allCurrencies, getters } from '../contract'
	import allabis from '../allabis'

	import * as helpers from '../utils/helpers'

	let initRates = () => ({
		compound: [],
		usdt: [],
		iearn: [],
		busd: [],
		susdv2: [],
		pax: [],
		tbtc: [],
		ren: [],
		sbtc: [],
	})

	export default {
		data: () => ({
			allPools: ['compound', 'usdt', 'iearn', 'busd', 'susdv2', 'pax', 'tbtc', 'ren', 'sbtc'],
			pools: ['compound', 'usdt', 'iearn', 'busd', 'susdv2', 'pax', 'tbtc', 'ren', 'sbtc'],
			createdAtBlocks: [9554040, 9456293, 9476468, 9567295, 9906598, 10041041, 10074719, 10068305],
			allEvents: ['Exchange', 'Deposit', 'Withdraw'],
			event: 0,
			displayedEvent: 0,
			//compound first block
			fromBlock: '0x91c86f',
			swapContracts: [],
			exchanges: [
				/*{
					buyer: '',
					sold_id: '',
					tokens_sold: '',
					bought_id: '',
					tokens_bought: '',
				}*/
			],
			page: 0,
			perPage: 10,
			gotopage: 0,
			subscriptions: [],
			rates: {
				...initRates(),
			},
			c_rates: {
				...initRates(),
			},
			jsons: [],
			latestblock: null,
			numBlocks: 1000,
			paginatedExchanges: [],
		}),
		computed: {
			...getters,
			allAddresses() {
				return Object.keys(allabis).filter(pool => this.allPools.includes(pool)).map(pool => ({pool, address: allabis[pool].swap_address}))
			},
			addresses() {
				return Object.keys(allabis).filter(pool => this.pools.includes(pool)).map(pool => allabis[pool].swap_address)
			},
			tokenExchangeEvent() {
				return web3.utils.sha3('TokenExchange(address,int128,uint256,int128,uint256)')
			},
			tokenExchangeUnderlyingEvent() {
				return web3.utils.sha3('TokenExchangeUnderlying(address,int128,uint256,int128,uint256)')
			},
			addLiquidityTopics() {
				return {
					compound: '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
					usdt: '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
					iearn: '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
					busd: '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
					susdv2: '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
					pax: '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
					tbtc: '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
					ren: '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
					sbtc: '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
				}
			},
			removeLiquidityTopics() {
				return {
					compound: [
						'0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
						'0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',
					],
					usdt: [
						'0xa49d4cf02656aebf8c771f5a8585638a2a15ee6c97cf7205d4208ed7c1df252d',
						'0x173599dbf9c6ca6f7c3b590df07ae98a45d74ff54065505141e7de6c46a624c2',
					],
					iearn: [
						'0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
						'0xb964b72f73f5ef5bf0fdc559b2fab9a7b12a39e47817a547f1f0aee47febd602',
					],
					busd: [
						'0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
						'0xb964b72f73f5ef5bf0fdc559b2fab9a7b12a39e47817a547f1f0aee47febd602',
					],
					susdv2: [
						'0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
						'0xb964b72f73f5ef5bf0fdc559b2fab9a7b12a39e47817a547f1f0aee47febd602',
					],
					pax: [
						'0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
						'0xb964b72f73f5ef5bf0fdc559b2fab9a7b12a39e47817a547f1f0aee47febd602',
					],
					tbtc: [
						'0xa49d4cf02656aebf8c771f5a8585638a2a15ee6c97cf7205d4208ed7c1df252d',
						'0x173599dbf9c6ca6f7c3b590df07ae98a45d74ff54065505141e7de6c46a624c2',
						'0x9e96dd3b997a2a257eec4df9bb6eaf626e206df5f543bd963682d143300be310',
					],
					ren: [
						'0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
						'0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',
						'0x9e96dd3b997a2a257eec4df9bb6eaf626e206df5f543bd963682d143300be310',
					],

					sbtc: [
						'0xa49d4cf02656aebf8c771f5a8585638a2a15ee6c97cf7205d4208ed7c1df252d',
						'0x173599dbf9c6ca6f7c3b590df07ae98a45d74ff54065505141e7de6c46a624c2',
						'0x9e96dd3b997a2a257eec4df9bb6eaf626e206df5f543bd963682d143300be310',
					],
				}
			},
			allCurrencies() {
				return allCurrencies
			},
			pages() {
				return this.exchanges.length && Math.ceil(this.exchanges.length / this.perPage) - 1
			},
			changePagination() {
				return this.page, this.perPage, Date.now()
			},

		},
		watch: {
			changePagination() {
				this.paginate()
			},
		},
		created() {
			this.$watch(() => contract.multicall, val => {
				if(val)
					this.mounted()
			})
		},
		mounted() {
			contract.multicall && this.mounted();
		},
		methods: {
			async mounted() {
				let params = this.$route.params.params
				if(params && params.length) {
					params = params.split('/')
					this.pools = params[0].split('_')
					let event = this.allEvents.indexOf(params[1])
					if(event === undefined) event = 'Exchange'
					this.event = this.displayedEvent = event
				}
				this.swapContracts = Object.keys(allabis)
					.filter(pool => this.allPools.includes(pool))
					.map(pool => new web3.eth.Contract(allabis[pool].swap_abi, allabis[pool].swap_address))

				//get rates
				await this.getRates();
				this.selectPools()
			},
			getEvents(block, numBlocks) {
				return this.pools.map(pool => {
					let topics = [];
					if(this.event == 0) {
						if(['tbtc', 'ren', 'sbtc'].includes(pool)) {
							topics = [
								this.swapContracts[this.allPools.indexOf(pool)]
									.getPastEvents(this.tokenExchangeEvent, 
										{ 
											fromBlock: (block - numBlocks) | 0,
											toBlock: block,
										}),
							]
						}
						else {
							topics = [
								this.swapContracts[this.allPools.indexOf(pool)]
									.getPastEvents(this.tokenExchangeUnderlyingEvent, 
										{ 
											fromBlock: (block - numBlocks) | 0,
											toBlock: block,
										}),
								this.swapContracts[this.allPools.indexOf(pool)]
									.getPastEvents(this.tokenExchangeEvent, 
										{ 
											fromBlock: (block - numBlocks) | 0,
											toBlock: block,
										}),
							]
						}
					}
					if(this.event == 1) {
						topics = [
							this.swapContracts[this.allPools.indexOf(pool)]
								.getPastEvents(this.addLiquidityTopics[pool],
								{ 
									fromBlock: (block - numBlocks) | 0,
									toBlock: block,
								}),
						]
					}
					if(this.event == 2) {
						topics = this.removeLiquidityTopics[pool].map(topic => {
							return this.swapContracts[this.allPools.indexOf(pool)]
								.getPastEvents(topic, {
									fromBlock: (block - numBlocks) | 0,
									toBlock: block,
								})
						})
						
					}
					return topics
				})
			},
			pushState() {
				history.pushState({}, null, '/events/' + this.pools.join('_') + '/' + this.allEvents[this.event])
			},
			selectPoolsHandler() {
				this.exchanges = []
				this.paginatedExchanges = []
				this.displayedEvent = this.event
				this.selectPools()
			},
			async loadMore() {
				let lastBlock = this.exchanges[this.exchanges.length-1].blockNumber
				this.loadEvents(lastBlock)
			},
			async loadEvents(block) {
				this.paginatedExchanges = []
				this.exchanges = []
				let length = 0
				let i = 0;
				let createdAtBlock;
				if(this.pools.length == 1) {
					let index = this.allPools.indexOf(this.pools[0])
					createdAtBlock = this.createdAtBlocks[index]
				}
				while(length < 500) {
					let numBlocks = this.numBlocks;
					let results
					let numTries = 5
					while(true) {
						try {
							results = await Promise.all(this.getEvents(block, numBlocks).flat())
							break;
						}
						catch(err) {
							console.error(err)
							numTries--;
							numBlocks /= 2;
							if(numTries == 0) throw err
						}
					}
					length += results.flat().length
					results = results.flat()
						.sort((a, b) => b.blockNumber - a.blockNumber)
					this.exchanges.push(...results)
					if(this.paginatedExchanges.length == 0 && this.perPage <= length) this.paginate()
					i++
					if(createdAtBlock && (block - numBlocks) < createdAtBlock) {
						this.paginate();
						break;
					}
					block -= numBlocks
				}
			},
			//change pagination on first load, on change page, per page and on new events
			async paginate() {
				let start = this.page*this.perPage
				let exchanges = this.exchanges.slice(start, start + this.perPage)
				if(this.event == 1 || this.event == 2) {
					this.paginatedExchanges = await Promise.all(exchanges.map(event => {
						if(!event.formatted) this.formatAmounts(event)
						return event
					}));
					return;
				}
				exchanges = await Promise.all(exchanges.map(event => {
					if(!event.fromCurrency) event =  this.formatEvent(event)
					return event;
				}))
				let events = []
				for(let event of exchanges) {
					let prevEvent = exchanges.find(e => {
						return e.address == event.address && e.transactionHash != event.transactionHash && e.blockNumber <= event.blockNumber
					})
					let virtual_price
					if(prevEvent === undefined) {
						let pool = this.allAddresses.find(v => v.address.toLowerCase() == event.address.toLowerCase()).pool
						let poolIdx = this.allPools.indexOf(pool);
						try {
							virtual_price = await this.swapContracts[poolIdx].methods.get_virtual_price().call(null, event.blockNumber - 1)
							virtual_price /= 1e18
						}
						catch(err) {
							console.error(err)
							virtual_price = this.findClosest(event.timestamp, poolIdx).virtual_price / 1e18
						}
					}
					else {
						virtual_price = prevEvent.virtual_price
					}
					if(virtual_price === undefined) {
						event.yield = ''
					}
					else {
						event.yield = (event.virtual_price / virtual_price - 1)
					}
					events.push(event)
				}
				this.paginatedExchanges = events
			},
			async selectPools() {
				this.pushState();
				this.latestblock = await web3.eth.getBlockNumber();
				for(let subscription of this.subscriptions) subscription.unsubscribe()
				this.exchanges = []
				//get historic rates
				let fetchpools = this.pools.map(pool => pool == 'iearn' ? 'y' : pool == 'susdv2' ? 'susd' : pool == 'ren' ? 'ren2' : pool == 'sbtc' ? 'rens' : pool)
				let requests = await Promise.all(fetchpools.map(pool => fetch(`${window.domain}/raw-stats/${pool}-1m.json`)))
				let jsons = await Promise.all(requests.map(request => request.json()))
				this.jsons = jsons
				for(let [i, data] of jsons.entries()) {
					let pool = fetchpools[i]
					//really have to change everything to use the same names!
					this.rates[pool == 'y' ? 'iearn' : pool == 'susd' ? 'susdv2' : pool] = data[data.length-1].rates
				}
				this.subscriptions = []
				this.page = 0
				this.gotopage = 0
				await this.loadEvents(this.latestblock)
				//listen for new events
				this.getSubscriptions()
			},
			//gets current rates
			async getRates(blockNumber) {
				let calls = []
				let pools = this.pools
				for(let [i, pool] of pools.entries()) {
					let abi = allabis[pool]
					for(let j = 0; j < abi.N_COINS; j++) {
						let address = abi.coins[j]
						let rate;
						if(this.isPlain(j, abi, pool)) {
							rate = 1 / abi.coin_precisions[j]
							this.c_rates[pool][j] = rate
						}
						else if(['iearn', 'busd', 'pax'].includes(pool)) {
							calls.push([
								address,
								//getPricePerFullShare()
								'0x77c7b8fc'
							])
						}
						else {
							calls.push(
								[
									address,
									//exchangeRateStored()
									'0x182df0f5'
								],
								[
									address,
									//supplyRatePerBlock()
									'0xae9d70b0'
								],
								[
									address,
									//accrualBlockNumber()
									'0x6c540baf'
								]
							)
						}
					}
				}
				let aggcalls = await contract.multicall.methods.aggregate(calls).call(null, blockNumber)
				let block = aggcalls[0];
				let decoded = aggcalls[1].map(hex => web3.eth.abi.decodeParameter('uint256', hex))
				for(let [i, pool] of pools.entries()) {
					let abi = allabis[pool]
					//usdt in usdt pool and susdv2 pool are already in the array, no need to calculate
					if(['susdv2', 'tbtc', 'ren', 'sbtc'].includes(pool)) continue;
					else if(['iearn', 'busd', 'pax'].includes(pool)) {
						let len = 4;
						if(pool == 'pax') len = 3
						let calls = decoded.slice(0,len)
						for(let j = 0; j < len; j++) {
							let rate = +calls[j]
							this.c_rates[pool][j] = rate / 1e18 / abi.coin_precisions[j]
						}
						decoded = decoded.slice(4)
					}
					else {
						let calls = decoded.slice(0,6)
						for(let j = 0; j < 2; j++) {
							let rate = +calls[j*3] / 1e18 / abi.coin_precisions[j]
							let supplyRate = +calls[j*3+1]
							let oldBlock = +calls[j*3+2]

							let calcRate = rate * (1 + supplyRate * (block - oldBlock) / 1e18)

							this.c_rates[pool][j] = calcRate;
						}
						decoded = decoded.slice(6)
					}
				}
			},
			isPlain(i, abi, pool) {
				return abi.tethered && abi.tethered[i] 
						&& abi.use_lending && !abi.use_lending[i] 
						|| pool == 'susdv2' || abi.is_plain[i];
			},
			isBTC(event) {
				return [allabis.tbtc.swap_address.toLowerCase(), allabis.ren.swap_address.toLowerCase()].includes(event.address.toLowerCase())
			},
			getCurrency(event, type) {
				//type == 0 for sold
				//type == 1 for bought
				let i = type == 0 ? event.returnValues.sold_id : event.returnValues.bought_id
				let contractAddress = event.address
				let pool = this.allAddresses.find(v => v.address.toLowerCase() == contractAddress.toLowerCase()).pool
				if(event.event == 'TokenExchange') return Object.values(allCurrencies[pool])[i]
				if(pool == 'susdv2' && i == 3) return 'sUSD'
				return Object.keys(allCurrencies[pool])[i].toUpperCase()
			},
			// getVirtualPrice(event) {
			// 	let pool = this.allAddresses.find(v => v.address.toLowerCase() == contractAddress.toLowerCase()).pool
			// 	let poolIdx = this.pools.indexOf(pool);
			// 	if(event.blockNumber > this.latestblock - 4) {
			// 		return await this.swapContracts[poolIdx].methods.get_virtual_price().call()
			// 	}
			// 	else {

			// 	}
			// },
			async formatEvent(event) {
				event.fromCurrency = this.getCurrency(event, 0)
				//call formatAmount once
				let contractAddress = event.address
				let pool = this.allAddresses.find(v => v.address.toLowerCase() == contractAddress.toLowerCase()).pool
				let timestamp = await this.getTimestamp(event.blockNumber)
				event.timestamp = timestamp
				let poolIdx = this.pools.indexOf(pool);
				let virtual_price, poolInfo
				if(event.blockNumber > this.latestblock - 120) {
					await this.getRates(event.blockNumber)
					virtual_price = (await this.swapContracts[poolIdx].methods.get_virtual_price().call(null, event.blockNumber)) / 1e18
				}
				else {
					poolInfo = this.interpolatePoint(timestamp, poolIdx)
					virtual_price = poolInfo.virtual_price / 1e18
				}
				event.soldAmount = this.formatAmount(event, 0, poolInfo)
				event.boughtAmount = this.formatAmount(event, 1, poolInfo)
				event.toCurrency = this.getCurrency(event, 1)
				event.virtual_price = virtual_price
				return event
			},
			subscribeExchange(event) {
				if(this.exchanges.findIndex(prevEvent => prevEvent.transactionHash == event.transactionHash) !== -1) return;
				this.latestblock = event.blockNumber
				this.getRates()
				this.exchanges.unshift(event)
				this.paginate()
			},
			getSubscriptions() {
				for(let pool of this.pools) {
					if(this.event == 0) {
						if(!['tbtc', 'ren', 'sbtc'].includes(pool)) {
							this.subscriptions.push(
								this.swapContracts[this.allPools.indexOf(pool)]
								.events.TokenExchangeUnderlying()
								.on('data', event => this.subscribeExchange(event)),
							)
						} 
						this.subscriptions.push(
							this.swapContracts[this.allPools.indexOf(pool)]
							.events.TokenExchange()
							.on('data', event => this.subscribeExchange(event))
						)
					}
					if(this.event == 1) {
						this.subscriptions.push(
							this.swapContracts[this.allPools.indexOf(pool)]
								.events.AddLiquidity()
								.on('data', event => this.subscribeExchange(event))
						)
					}
					if(this.event == 2) {
						this.subscriptions.push(
							this.swapContracts[this.allPools.indexOf(pool)]
								.events.RemoveLiquidity()
								.on('data', event => this.subscribeExchange(event)),

							this.swapContracts[this.allPools.indexOf(pool)]
								.events.RemoveLiquidityImbalance()
								.on('data', event => this.subscribeExchange(event)),
						)
					}
				}
			},
			async getTimestamp(blockNumber) {
				return (await web3.eth.getBlock(blockNumber)).timestamp
			},
			findClosest(timestamp, pool) {
				let poolData = this.jsons[pool]
			    let data = poolData.find(d=>d.timestamp - timestamp > 0);
			    //check if timestamp was before recording, this is only for when timestamp > latest recorded, get latest recorded
			    if(timestamp < poolData[0].timestamp) {
			    	return poolData[0];
			    }
			    if(data === undefined) {
			    	return poolData[poolData.length-1]
			    }
			    return data;
			},
			interpolatePoint(timestamp, poolidx) {
				let poolData = this.jsons[poolidx]
				if(timestamp > poolData[poolData.length-1].timestamp) return poolData[poolData.length-1]
				let next = poolData.findIndex(p=>p.timestamp - timestamp > 0 && p.virtual_price > 0)
				let prev = poolData[next-1]
				next = poolData[next]
				if(prev === undefined) prev = poolData[0]
				if(next === undefined) next = poolData[poolData.length-1]
				if(prev.timestamp == next.timestamp) return next;

				let point = {}
				let interpolator = helpers.interpolate(timestamp, prev.timestamp, next.timestamp)
				point.virtual_price = interpolator(prev.virtual_price, next.virtual_price)
				point.rates = prev.rates.map((r, i) => interpolator(r, next.rates[i]))
				return point
			},
			formatAddress(address) {
				if(address.toLowerCase() == '0xeB21209ae4C2c9FF2a86ACA31E123764A3B6Bc06'.toLowerCase()) return 'Compound zap'
				if(address.toLowerCase() == '0xac795D2c97e60DF6a99ff1c814727302fD747a80'.toLowerCase()) return 'usdt zap'
				if(address.toLowerCase() == '0xbBC81d23Ea2c3ec7e56D39296F0cbB648873a5d3'.toLowerCase()) return 'y zap'
				if(address.toLowerCase() == '0xb6c057591E073249F2D9D88Ba59a46CFC9B59EdB'.toLowerCase()) return 'busd zap'
				if(address.toLowerCase() == '0xFCBa3E75865d2d561BE8D220616520c171F12851'.toLowerCase()) return 'susd zap'
				if(address.toLowerCase() == '0xA50cCc70b6a011CffDdf45057E39679379187287'.toLowerCase()) return 'pax zap'
				if(address.toLowerCase() == '0x9fe350dfa5f66bc086243f21a8f0932514316627'.toLowerCase()) return 'Curve Ren Adapter'
				return address.slice(0,6) + '...' + address.slice(-6)
			},
			totalAmount(event) {
				if(event.returnValues.token_amount) return +event.returnValues.token_amount / 1e18
				return event.returnValues.token_amounts.reduce((a, b) => +a + +b, 0)
			},
			showAmounts(event) {
				if(event.returnValues.token_amount) return ''
				let amounts = event.returnValues.token_amounts
				let pool = this.getPool(event);
				let currencies = Object.entries(allCurrencies[pool == 'y' ? 'iearn' : pool == 'susd' ? 'susdv2' : pool])
				return amounts.map((amount, i) => `${(+amount).toFixed(2)} ${currencies[i][0].toUpperCase()}`)
			},
			async formatAmounts(event) {
				if(event.returnValues.token_amount) {
					event.returnValues.token_amounts = event.returnValues.token_amount / 1e18
					event.formatted = true
					return event
				}
				let pool = this.allAddresses.find(v => v.address.toLowerCase() == event.address.toLowerCase()).pool
				let poolIdx = this.pools.indexOf(pool);
				let rates;
				let timestamp = await this.getTimestamp(event.blockNumber)
				event.timestamp = timestamp
				if(event.blockNumber > this.latestblock - 120) {
					await this.getRates(event.blockNumber)
					rates = this.c_rates[pool]
				}
				else {
					let poolInfo = this.interpolatePoint(timestamp, poolIdx)
					rates = poolInfo.rates.map((rate, i) => rate / 1e18 / allabis[pool].coin_precisions[i])
				}
				event.returnValues.token_amounts = event.returnValues.token_amounts.map((amount, i) => amount * rates[i])
				event.formatted = true;
				return event

			},
			formatAmount(event, type, poolInfo) {
				let pool = this.allAddresses.find(v => v.address.toLowerCase() == event.address.toLowerCase()).pool

				let i = type == 0 ? event.returnValues.sold_id : event.returnValues.bought_id
				let amount = type == 0 ? event.returnValues.tokens_sold : event.returnValues.tokens_bought
				let precisions = 1e18 * allabis[pool].coin_precisions[i]
				let rate
				if(event.blockNumber > this.latestblock - 120) {
					rate = this.c_rates[pool][i]
				}
				else {
					rate = poolInfo.rates[i] / precisions
				}
				if(event.event == 'TokenExchange') {
					amount = amount * rate
				}
				else amount = amount / allabis[pool].coin_precisions[i]
				return amount
			},
			getPool(event) {
				let pool = this.allAddresses.find(v => v.address.toLowerCase() == event.address.toLowerCase()).pool
				return pool == 'iearn' ? 'y' : pool
			},
			goTo() {
				if(+this.gotopage >= 0 && +this.gotopage <= this.pages)
					this.page = this.gotopage
				else
					this.page = 0
			},
			formatDateTime(timestamp) {
				return helpers.formatDateToHuman(timestamp)
			},
			formatTime(timestamp) {
				return helpers.formatDateToHuman(timestamp).split(' ')[1]
			},

		}
	}
</script>

<style scoped>
	.blue.window.Events, .white.window {
		max-width: 730px;
	}
	legend {
		text-align: center;
	}
	button {
		box-shadow: none;
		margin-left: 10px;
	}
	label:nth-of-type(1) {
		margin-left: 0;
	}
	label {
		margin-right: 1em;
	}
	table {
		width: 100%;
		margin-top: 1em;
	}
	tbody tr td a {
		display: inline-block;
		min-height: 100%;
		width: 100%;
		padding-top: 10px;
		font-weight: normal;
	}
	thead tr {
		border-bottom: 1px solid #a8a8a8;
	}
	thead tr th {
		color: #202020;
	}
	tbody tr td {
		padding: 0;
		color: black;
	}
	tbody tr td:nth-child(1) a, tbody tr td:nth-child(5) a, tbody tr td:nth-child(6) a {
		font-weight: normal;
	}
	#pages {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-top: 1em;
	}
	#pages > div {
		margin-top: 0.3em;
	}
	#pages button {
		margin-left: 0;
	}
	#gotopage {
		width: 3em;
	}
	#gotopage + button {
		margin-left: 0.5em;
	}

	select.tvision {
		box-shadow: none;
	}

	.loadingtr td {
		text-align: center;
	}

	#loadmore {
		margin-left: 0;
		margin-top: 10px;
	}

	#poollist, #select {
		margin-top: 1em;
	}

	#select {
		margin-left: 0;
	}

	.eventmobile:first-child {
		margin-top: 1em;
	}

	.eventmobile {
		margin-bottom: 1em;
		border: 6px double white;
		padding: 0.6em;

	}

	#poollist {
		display: flex;
		flex-wrap: wrap;
	}
</style>