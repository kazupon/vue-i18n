<template>
	<div class='transaction-table'>
		<button class='simplebutton' @click='useFirestore'>
			<span v-show='fireUser === null'>
				Use permanent storage
				<span class='tooltip'> [?]
					<span class='tooltiptext long'>
						Use cloud storage of encrypted transaction data instead of local storage
						<!-- Data about ren transaction is stored in local storage, which can be cleared, currently.
						That means if you clear the storage, a loss of funds may occur.
						Using 3box permanent storage is recommended.  -->
					</span>
				</span>
			</span>
			<span v-show='fireUser !== null'>Permanent storage loaded</span>
		</button>


		<div id='modal' class='modal' v-show='showModal' @click.self='showModal = false'>
			<div class='modal-content window white'>
				<fieldset>
					<div class='legend2 hoverpointer' @click='showModal = false'>
						[<span class='greentext'>■</span>]
					</div>
					<legend>QR CODE</legend>
					<vue-qrcode :value="qrValue" :options="qrOptions"></vue-qrcode>
					<button @click='showModal =false'> OK </button>
				</fieldset>
			</div>
		</div>

		<div id='modalrecover' class='modal' v-show='showModalRecover' @click.self='showModalRecover = false'>
			<div class='modal-content window white'>
				<fieldset>
					<div class='legend2 hoverpointer' @click='showModalRecover = false'>
						[<span class='greentext'>■</span>]
					</div>
					<legend>Recover transaction</legend>
					<div class='content'>
						<label for='newtxhash'>New tx hash:</label>
						<input id='newtxhash' v-model='newtxhash'></label>

						<label for='newvout'>New vOut:</label>
						<input id='newvout' v-model='newvout'></label>
					</div>
					<button @click='recover' id='recoverredeposit'> Recover redeposit </button>
					<button @click='recoverStuck'> Recover stuck </button>
				</fieldset>
			</div>
		</div>

		<div id='modalinit' class='modal' v-show='showModal1' v-if='lastTransaction && [0,3].includes(lastTransaction.type)' @click.self='removeTx(lastTransaction)'>
			<div class='modal-content window white'>
				<fieldset>
					<div class='legend2 hoverpointer' @click='removeTx(lastTransaction)'>
						[<span class='greentext'>■</span>]
					</div>
					<legend>Initiate transaction</legend>
					<div class='content'>
						<div>
							<b>BTC deposit address: </b>
							<span :class="{'loading line': !lastTransaction.gatewayAddress }"></span>
							<span id='btcaddress'>{{ lastTransaction.gatewayAddress}}</span>
							<div>
								<span class='hoverpointer' v-show='[0,3].includes(lastTransaction.type)' @click='copy(lastTransaction)'>
									<span class='tooltip'>
										<img class='icon small' :src="publicPath + 'copy-solid.svg'">
										<span class='tooltiptext small'>{{ copied == false ? 'Copy' : 'Copied' }}</span>
									</span>
								</span>
								<span class='tooltip'>
									<img class='icon small hoverpointer qrcode' v-show='[0,3].includes(lastTransaction.type)'
										@click='showQRinModal(lastTransaction)' :src="publicPath + 'qrcode-solid.svg'">
									<span class='tooltiptext'>
										Show QR code
									</span>
								</span>
							</div>
							<div v-show='showQRinside' class='showQRinside'>
								<vue-qrcode :value="qrValue" :options="qrOptions"></vue-qrcode>
							</div>
						</div>
						<div>
							<b>Bitcoin to be sent: </b>
							<span>{{ lastTransaction.fromInput }}</span>
						</div>
						<div>
							<b>renVM fee: </b>
							<span>{{ renVMfee }}%</span>
						</div>
						<div>
							<b>BTC miner's fee: </b> 
							<span>{{ minersFee }} BTC</span>
						</div>
						<div>
							<b>Amount to be received:</b> 
							<span v-show='lastTransaction.type == 0'>
								{{ lastTransaction.toInput }}
								<span v-show='lastTransaction.to_currency == 1'>WBTC</span>
								<span v-show='lastTransaction.to_currency == 2'>sBTC</span>
							</span>
							<span v-show='lastTransaction.type == 3'>
								{{ (lastTransaction.min_amount / 1e18).toFixed(8) }} 
								Curve {{ lastTransaction.amounts.length == 2 ? 'ren' : 'sbtc' }} LP tokens
							</span>
						</div>
						<div v-show='lastTransaction.type == 0'>
							<b>Exchange rate: </b>
							<span>{{ lastTransaction.newMinExchangeRate / 1e8 }}</span>
						</div>
						<div class='ethaddress'>
							<b>ETH address: </b>
							<span id='ethaddress'>{{ lastTransaction.fromAddress }}</span>
							<div class='warningethaddress'>
								<img class='icon small hoverpointer warning' :src="publicPath + 'exclamation-circle-solid.svg'">
								This is the ETH address you need to finish the deposit with
							</div>
						</div>
						<div class='confirm-wrapper info-message'>
							<input id='confirmCheckbox' type='checkbox' v-model='confirmCheckbox'>
							<label for='confirmCheckbox'>
								Confirm: I have access to this ETH address
							</label>
						</div>
					</div>
					<button @click='proceedTx' :disabled='!confirmCheckbox'> OK </button>
					<button @click='removeTx(lastTransaction); showModal1 = false' class='buttoncancel'>Cancel</button>
				</fieldset>
			</div>
		</div>

		<span class='notification tooltip' v-show='!hasSubscription' @click='subscribeNotifications'>
			<img :src="publicPath + 'bell-solid.svg'" class='bell notification icon hoverpointer'>
			<span class='tooltiptext'>
				Enable push notifications on transactions received
			</span>
		</span>

		<span class='notification tooltip' v-show='hasSubscription' @click='unsubscribeNotifications'>
			<img :src="publicPath + 'bell-slash-solid.svg'" class='bell notification icon hoverpointer'>
			<span class='tooltiptext'>
				Disable push notifications on transactions received
			</span>
		</span>

		<div v-show='fireUser === null' class='info-message gentle-message'>
			Please use permanent storage to prevent potential loss of funds while waiting for BTC deposits
		</div>
		
		<p v-show='transactions.filter(t => t.removed).length'>
			<input id='showremoved' type='checkbox' v-model='showRemoved'/>
			<label for='showremoved'>Show removed transactions</label>
		</p>

		<div class='info-message gentle-message' v-show='showCompleted'>
			Swap completed
		</div>

		<div class='simple-error'>
			Please don't reuse previously generated BTC deposit addresses.
		</div>

		<table class='tui-table showdesktoptransactions'>
			<thead>
				<tr>
					<th>Type</th>
					<th>BTC Address</th>
					<th class='confirmations'>Confirmations</th>
					<th>Status</th>
					<th>Progress</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='transaction in filteredTransactions' 
					:class="{ completed: isCompletedMintTx(transaction) }">
					<td class='shifttype'>
						{{ transaction.fromInput }}
						<span v-show='[0, 3].includes(transaction.type)' class='tooltip'>
							<span v-show='transaction.type == 0'>
								BTC->{{ transaction.to_currency == 1 ? 'wBTC' : 'sBTC' }}
							</span>
							<span v-show='transaction.type == 3'>
								BTC->{{ transaction.pool == 'ren' ? 'renCRV' : 'sbtcCRV' }}
							</span>
							<span class='tooltiptext' v-show='transaction.type == 0'>
								Swap BTC->{{ transaction.to_currency == 1 ? 'wBTC' : 'sBTC' }}
							</span>
							<span class='tooltiptext' v-show='transaction.type == 3'>
								Deposit BTC
							</span>
						</span>
						<span v-show='transaction.type == 1'>
							<span v-show='transaction.burnType == 0' class='tooltip'>
								{{ transaction.from_currency == 1 ? 'wBTC' : 'sBTC' }}->BTC
								<span class='tooltiptext'>
									Swap {{ transaction.from_currency == 1 ? 'wBTC' : 'sBTC' }}->BTC
								</span>
							</span>
							<span v-show='transaction.burnType == 1' class='tooltip'>
								renBTC->BTC
								<span class='tooltiptext'>
									Remove liquidity									
								</span>
							</span>
							<span v-show='transaction.burnType == 2' class='tooltip'>
								renBTC->BTC
								<span class='tooltiptext medium'>
									Remove liquidity imbalance
								</span>
							</span>
							<span v-show='transaction.burnType == 3' class='tooltip'>
								renBTC->BTC
								<span class='tooltiptext medium'>
									Remove liquidity in BTC
								</span>
							</span>
						</span>
					</td>
					<td>
						<span :class="{'loading line': !transaction.gatewayAddress }"></span>
						<span class='nowrap btcaddress' v-show='transaction.gatewayAddress'>
							<span class='hoverpointer tooltip' @click='copy(transaction)'>
								{{shortenAddress(transaction.gatewayAddress)}}
								<span class='tooltiptext long'>
									{{transaction.gatewayAddress}}
								</span>
							</span>
							<span class='hoverpointer' v-show='[0,3].includes(transaction.type)' @click='copy(transaction)'>
								<span class='tooltip'>
									<img class='icon small' :src="publicPath + 'copy-solid.svg'">
									<span class='tooltiptext small'>{{ copied == false ? 'Copy' : 'Copied' }}</span>
								</span>
							</span>
							<span class='tooltip'>
								<img class='icon small hoverpointer qrcode' v-show='[0,3].includes(transaction.type)'
								@click='showQR(transaction)' :src="publicPath + 'qrcode-solid.svg'">
								<span class='tooltiptext'>
									Show QR code
								</span>
							</span>
							<span class='tooltip'>
								<img class='icon small hoverpointer' :src="publicPath + 'ethereum-brands_optimized.svg'">
								<span class='tooltiptext long'>
									From: {{ transaction.fromAddress }}
								</span>
							</span>
							<span class='tooltip' v-show='transaction.fromAddress && transaction.fromAddress.toLowerCase() != default_account.toLowerCase() && ![14, 65].includes(transaction.state)'>
								<img class='icon small hoverpointer warning' :src="publicPath + 'exclamation-circle-solid.svg'">
								<span class='tooltiptext long'>
									Please submit this transaction from <br> {{ transaction.fromAddress }} 
								</span>
							</span>
						</span>
					</td>
					<td>
						<span v-show='[0,3].includes(transaction.type) && transaction.state == 1'>▬</span>
						<a :href="getTxHashLink(transaction)" target="_blank" rel="noopener noreferrer" v-show='!([0,3].includes(transaction.type) && transaction.state == 1)'> 
							<span v-show='[0,3].includes(transaction.type) && transaction.state >= 2 && transaction.state < 10'>{{ transaction.confirmations }} / 6</span>
							<span class='confirmed' v-show='[0,3].includes(transaction.type) && transaction.state >= 10 && transaction.state < 14'>
								Confirmed
							</span>
							<span v-show='[0,3].includes(transaction.type) && [14,15,17].includes(transaction.state)'>
								Done
							</span>
							<span v-show='transaction.type == 1 && transaction.state >= 30 && transaction.state < 60'> {{ transaction.confirmations }} / 30 </span>
							<span v-show='transaction.type == 1 && transaction.state > 60'> {{ transaction.confirmations }}  </span>
						</a>
						<div v-show='[0,3].includes(transaction.type) && transaction.state == 14'>
							<a :href="'https://etherscan.io/tx/' + transaction.ethTxHash" target="_blank" rel="noopener noreferrer">Etherscan</a>
						</div>
					</td>
					<td>
						<tx-state 
							:state='transaction.state' 
							:transaction='transaction'
							@swapNow='swapNow'
							@receiveRen='receiveRen'
							@depositNow='depositNow'
							@receiveRenDeposit='receiveRenDeposit'
							@mint='mintThenSwap'
							@resubmit='resubmit'
							/>
						<span v-show='isRecover'>
							<img class='icon small hoverpointer' @click='showRecover(transaction)' :src="publicPath + 'cog-solid.svg'">
						</span>
					</td>
					<td class='nowrap'>
						<span v-show='[0,3].includes(transaction.type)'>
							{{ txProgress(transaction) }}%
							<span :class="{'loading line': txProgress(transaction) < 100}"></span>
						</span>
						<span v-show='transaction.type == 1'>
							{{ txProgress(transaction) }}%
							<span :class="{'loading line': txProgress(transaction) < 100}"></span>
						</span>
						<span v-show='[0,3].includes(transaction.type) && !transaction.btcTxHash' class='icon cancel' @click='removeTx(transaction)'>
							<!-- [<span class='redtext'>&times;</span>] -->
							<img :src="publicPath + 'trash-alt-solid.svg'">
						</span>
						<span v-show='transaction.removed' class='icon refresh' @click='refresh(transaction)'>
							<img :src="publicPath + 'sync-solid.svg'">
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<div class='showmobiletransactions'>
			<div v-for='transaction in filteredTransactions' 
				class='transactionmobile' :class="{ completed: isCompletedMintTx(transaction) }">
				<div class='shifttype'>
					<b>Type: </b>
					<span>{{ transaction.fromInput }}</span>
					<span v-show='[0, 3].includes(transaction.type)' class='tooltip'>
						<span v-show='transaction.type == 0'> BTC->wBTC </span>
						<span v-show='transaction.type == 3'> BTC->renBTC </span>
						<span class='tooltiptext' v-show='transaction.type == 0'>
							Swap BTC->wBTC
						</span>
						<span class='tooltiptext' v-show='transaction.type == 3'>
							Deposit BTC
						</span>
					</span>
					<span v-show='transaction.type == 1'>
						<span v-show='transaction.burnType == 0' class='tooltip'>
							wBTC->BTC
							<span class='tooltiptext'>
								Swap wBTC->BTC
							</span>
						</span>
						<span v-show='transaction.burnType == 1' class='tooltip'>
							renBTC->BTC
							<span class='tooltiptext'>
								Remove liquidity									
							</span>
						</span>
						<span v-show='transaction.burnType == 2' class='tooltip'>
							renBTC->BTC
							<span class='tooltiptext medium'>
								Remove liquidity imbalance
							</span>
						</span>
						<span v-show='transaction.burnType == 3' class='tooltip'>
							renBTC->BTC
							<span class='tooltiptext medium'>
								Remove liquidity in BTC
							</span>
						</span>
					</span>
				</div>
				<div>
					<b>BTC address: </b>
					<span :class="{'loading line': !transaction.gatewayAddress }"></span>
					<span class='nowrap btcaddress' v-show='transaction.gatewayAddress'>
						<span class='hoverpointer tooltip' @click='copy(transaction)'>
							{{shortenAddress(transaction.gatewayAddress)}}
							<span class='tooltiptext long'>
								{{transaction.gatewayAddress}}
							</span>
						</span>
						<span class='hoverpointer' v-show='[0,3].includes(transaction.type)' @click='copy(transaction)'>
							<span class='tooltip'>
								<img class='icon small' :src="publicPath + 'copy-solid.svg'">
								<span class='tooltiptext small'>{{ copied == false ? 'Copy' : 'Copied' }}</span>
							</span>
						</span>
						<img class='icon small hoverpointer qrcode' v-show='[0,3].includes(transaction.type)'
							@click='showQR(transaction)' :src="publicPath + 'qrcode-solid.svg'">
						<span class='tooltip'>
							<img class='icon small hoverpointer' :src="publicPath + 'ethereum-brands_optimized.svg'">
							<span class='tooltiptext long'>
								From: {{ transaction.fromAddress }}
							</span>
						</span>
					</span>
				</div>
				<div>
					<b>Confirmations ✓: </b>
					<span v-show='[0,3].includes(transaction.type) && transaction.state == 1'>▬</span>
					<a :href="getTxHashLink(transaction)" target="_blank" rel="noopener noreferrer" v-show='!([0,3].includes(transaction.type) && transaction.state == 1)'> 
						<span v-show='[0,3].includes(transaction.type) && transaction.state >= 2 && transaction.state < 10'>{{ transaction.confirmations }} / 6</span>
						<span class='confirmed' v-show='[0,3].includes(transaction.type) && transaction.state >= 10 && transaction.state < 14'>
							Confirmed
						</span>
						<span v-show='[0,3].includes(transaction.type) && [14,15].includes(transaction.state)'>
							Done
						</span>
						<span v-show='transaction.type == 1 && transaction.state >= 30 && transaction.state < 60'> {{ transaction.confirmations }} / 30 </span>
						<span v-show='transaction.type == 1 && transaction.state > 60'> {{ transaction.confirmations }}  </span>
					</a>
					<div v-show='[0,3].includes(transaction.type) && transaction.state == 14'>
						<a :href="'https://etherscan.io/tx/' + transaction.ethTxHash" target="_blank" rel="noopener noreferrer">Etherscan</a>
					</div>
				</div>
				<div>
					<b>Status: </b>
					<tx-state 
						:state='transaction.state' 
						:transaction='transaction'
						@swapNow='swapNow'
						@receiveRen='receiveRen'
						@depositNow='depositNow'
						@receiveRenDeposit='receiveRenDeposit'
						@mint='mintThenSwap'
						@resubmit='resubmit'
						/>
						<span v-show='isRecover'>
							<img class='icon small hoverpointer' @click='showRecover(transaction)' :src="publicPath + 'cog-solid.svg'">
						</span>
				</div>
				<div class='nowrap'>
					<b>Progress: </b>
					<span v-show='[0,3].includes(transaction.type)'>
						{{ txProgress(transaction) }}%
						<span :class="{'loading line': txProgress(transaction) < 100}"></span>
					</span>
					<span v-show='transaction.type == 1'>
						{{ txProgress(transaction) }}%
						<span :class="{'loading line': txProgress(transaction) < 100}"></span>
					</span>
					<span v-show='[0,3].includes(transaction.type) && !transaction.btcTxHash' class='icon cancel' @click='removeTx(transaction)'>
						<!-- [<span class='redtext'>&times;</span>] -->
						<img :src="publicPath + 'trash-alt-solid.svg'">
					</span>
					<span v-show='transaction.removed' class='icon refresh' @click='refresh(transaction)'>
						<img :src="publicPath + 'sync-solid.svg'">
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as store from './shiftStore'
	import { state } from './shiftState'
	import * as helpers from '../../utils/helpers'
	import TxState from './TxState.vue'
	import VueQrcode from '@chenfengyuan/vue-qrcode'
	import * as subscriptionStore from '../common/subscriptionStore'
	console.log(subscriptionStore, "SUBSCRIPTION STORE")
	console.log(subscriptionStore.state, "STATE")
	console.log(subscriptionStore.state.subscription, "SUBSCRIPTION")

	export default {
		components: {
			TxState,
			VueQrcode,
		},

		data: () => ({
			qrValue: null,
			qrOptions: {
				width: 200,
				margin: 0,
				color: {
					light: '#0000'
				}
        	},
        	showQRinside: false,
        	copied: false,
        	confirmCheckbox: false,
        	showRemoved: false,

        	recovertx: null,
        	newtxhash: '',
        	newvout: '',
		}),

		computed: {
			transactions() {
				return state.transactions
			},
			filteredTransactions() {
				if(this.showRemoved) return state.transactions
				return state.transactions.filter(t => !t.removed)
			},
			lastTransaction() {
				return this.filteredTransactions[0]
			},
			renVMfee() {
				return state.mintFee / 100
			},
			minersFee() {
				return state.minersLockFee / 1e8
			},
			showCompleted() {
        		let tx = state.transactions[0]
        		if(!tx) return;
        		return tx.type == 0 && [14,15].includes(tx.state) || tx.type == 1 && tx.state == 65
        	},
        	space() {
        		return state.space
        	},
        	fireUser() {
        		return state.fireUser
        	},
        	hasSubscription() {
        		return subscriptionStore.state.subscription !== null 
        	},
        	publicPath() {
        		return process.env.BASE_URL
        	},
        	showModal: {
        		get() {
        			return state.showModal
        		},
        		set(value) {
        			state.showModal = value
        		},
        	},
        	showModal1: {
        		get() {
        			return state.showModal1
        		},
        		set(value) {
        			state.showModal1 = value
        		},
        	},
        	showModalRecover: {
        		get() {
        			return state.showModalRecover
        		},
        		set(value) {
        			state.showModalRecover = value
        		},
        	},
        	default_account() {
        		return state.default_account
        	},
        	isRecover() {
        		return state.recover
        	},
		},


		methods: {
			showQR({ fromInput, gatewayAddress }) {
				this.showModal = true
				this.qrValue = `bitcoin:${gatewayAddress}?amount=${fromInput}`
			},

			showQRinModal({ fromInput, gatewayAddress }) {
				this.showQRinside = !this.showQRinside
				this.qrValue = `bitcoin:${gatewayAddress}?amount=${fromInput}`
			},

			proceedTx() {
				if(this.confirmCheckbox)
					this.showModal1 =false
			},

			copy(transaction) {
				this.copied = true;
				setTimeout(() => this.copied = false, 600)
				helpers.copyToClipboard(transaction.gatewayAddress)
			},

			shortenAddress(address) {
				return address.slice(0,4) + '...' + address.slice(-4)
			},

			getTxHashLink(transaction) {
				let hash = [0,3].includes(transaction.type) ? 
					'https://blockchain.info/btc/tx/' + transaction.btcTxHash 
					: 'https://etherscan.io/tx/' + transaction.ethTxHash;
				return hash;
			},

			txProgress(transaction) {
        		if([0,3].includes(transaction.type)) {
        			let progress = transaction.state / 14 * 100 | 0
        			if(progress > 100) progress = 100
        			if(!transaction.stake)
        				return [14, 15].includes(transaction.state) ? 100 : progress
        			progress -= 5
        			return [15, 17].includes(transaction.state) ? 100 : progress
        		}
        		if(transaction.type == 1) {
        			let progress = ((transaction.state - 30) / 35) * 100 | 0
        			if(progress > 100) progress = 100
        			return transaction.state == 65 ? 100 : progress
        		}
        	},

        	isCompletedMintTx(transaction) {
        		if([0, 3].includes(transaction.type))
        			return transaction.stake ? transaction.state == 17 : transaction.state == 14
        	},

        	removeTx(transaction) {
        		store.removeTx(transaction)
        		this.showModal1 = false
			},

			mintThenSwap(transaction) {
				store.mintThenSwap(transaction)
			},

			useFirestore() {
				return store.useFirestore()
			},

			swapNow(transaction) {
				store.swapNow(transaction)
			},

			receiveRen(transaction) {
				store.receiveRen(transaction)
			},

			depositNow(transaction) {
				store.depositNow(transaction)
			},

			resubmit(transaction) {
				store.resubmit(transaction)
			},

			showRecover(transaction) {
				this.recovertx = transaction
				this.showModalRecover = true
			},

			recover() {
				store.recoverRedeposit(this.recovertx, this.newtxhash, this.newvout)
			},

			recoverStuck() {
				store.recoverStuck(this.recovertx)
			},

			receiveRenDeposit(transaction) {
				store.receiveRenDeposit(transaction)
			},

			refresh(transaction) {
				store.refresh(transaction)
			},
			subscribeNotifications() {
				subscriptionStore.subscribeNotifications()
			},
			unsubscribeNotifications() {
				subscriptionStore.unsubscribeNotifications()
			},

		}
	}
</script>

<style scoped>
	.tui-table {
		width: 100%;
		margin-top: 1em;
	}
	.shifttype {
		white-space: nowrap;
	}
	tbody tr td {
		padding-bottom: 0.6em;
	}
	.icon.small {
		height: 1em;
	}
	.hoverpointer {
		cursor: pointer;
	}
	.modal-content {
		text-align: center;
		padding: 0;
		border: none;
		width: 260px;
	}
	.modal-content fieldset {
		color: white;
		font-weight: bolder;
		border: 6px double white;
		padding-block-start: 1em;
		padding-block-end: 1em;
	}
	.modal-content button {
		margin-top: 0.6em;
		padding: 0 2em;
	}
	.legend2 {
	  position: absolute;
	  top: 0;
	  left: 2em;
	  background: #c0c0c0;
	  line-height:1.2em;
	}
	.greentext {
		color: green;
	}
	.tooltiptext.small {
		width: 70px;
		margin-left: -35px;
	}
	.legend2 .greentext {
		display: inline-block;
		transform: translate3d(0,-0.1em,10em);
	}
	.legend2 .greentext:hover {
		transform: none;
	}
	.icon.cancel {
		cursor: pointer;
		font-size: 1em;
	}
	.icon.cancel img, .icon.warning {
		width: 1em;
		margin-left: 0.8em;
		filter: invert(13%) sepia(90%) saturate(4444%) hue-rotate(11deg) brightness(88%) contrast(97%);
	}
	.icon.warning {
		margin-left: 0;
	}
	.redtext {
		color: red;
	}
	.nowrap {
		white-space: nowrap;
	}
	.transaction-table {
		margin-top: 1em;
	}
	.icon.refresh {
		cursor: pointer;
		font-size: 1em;
	}
	.icon.refresh img {
		width: 1em;
		margin-left: 0.8em;
		filter: invert(37%) sepia(11%) saturate(2344%) hue-rotate(174deg) brightness(101%) contrast(104%);
	}
	.icon.qrcode {
		margin-left: 3px;
	}
	.notification.tooltip {
		margin-left: 1em;
		margin-top: 1em;
	}

	.transactionmobile {
		margin-bottom: 1em;
		border: 6px double white;
		padding: 0.6em;
	}

	.showmobiletransactions {
		display: none;
	}

	.transactionmobile:first-child {
		margin-top: 1em;
	}

	@media only screen and (max-device-width: 700px) {
		.showdesktoptransactions {
			display: none;
		}
		.showmobiletransactions {
			display: block;
		}
		.confirmations, .confirmed {
			font-size: 0;
			letter-spacing: -1px;
			color: transparent;
		}
		.confirmations::after, .confirmed::after {
			content: "✓";
			font-size: 16px;
			letter-spacing: normal;
			color: black;
		}
		.shifttype {
			white-space: pre-line;
		}
	}
	#modalinit .modal-content {
		width: 500px;
	}
	#modalinit .content {
		text-align: left;
	}
	.modal-content b {
		color: black;
	}
	.modal-content div:not(.ethaddress) b ~ span {
		color: black;
	}
	.content > div {
		margin-top: 0.5em;
	}
	.buttoncancel {
		margin-left: 1em;
		background: gray;
		box-shadow: none;
		border: none;
	}
	.confirm-wrapper {
		background: darkred;
	}
	#ethaddress, #btcaddress {
		color: darkred;
	}
	.warningethaddress {
		color: black;
		padding-top: 1em;
	}
	.showQRinside {
		text-align: center;
		margin-top: 1em;
		margin-bottom: 1em;
	}
	.tooltip .icon.qrcode {
		margin-left: 0;
	}
	tr.completed td, .transactionmobile.completed div span {
		color: gray;
	}
	tr.completed .btcaddress span, .transactionmobile.completed .btcaddress span {
		text-decoration: line-through;
	}
	#modalrecover .content {
		color: black;
		text-align: left;
	}
	#modalrecover .modal-content {
		width: 400px;
	}
	#recoverredeposit {
		margin-right: 1em;
	}
</style>
