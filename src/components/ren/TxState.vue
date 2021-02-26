<template>
	<div>
		<span v-show='transaction.error !== null'>
			<span class='tooltip'>
				<span class='errortext'>Error</span><img class='icon small hoverpointer warning' :src="publicPath + 'exclamation-circle-solid.svg'">
				<span class='tooltiptext long errormessage'>
					{{ transaction.error }}
				</span>
			</span>
		</span>
		<span v-show='(transaction.fromAddress && transaction.fromAddress.toLowerCase() != default_account.toLowerCase() && ![14, 65].includes(state)) && transaction.error === null' class='submitfromwarning'>
			<span class='tooltip'>
				Submit from {{ shortenAddress(transaction.fromAddress) }}
				<span class='tooltiptext long'>
					{{ transaction.fromAddress }}
				</span>
			</span>
		</span>
		<span v-show='(transaction.fromAddress && transaction.fromAddress.toLowerCase() == default_account.toLowerCase() || [14, 65].includes(state)) && transaction.error === null'>
			<span v-show='state == 0'>
				Waiting for renVM BTC deposit address
			</span>
			<span v-show='state == 1'>
				Waiting for deposit on BTC address
			</span>
			<span v-show='state >= 2 && state <= 9	'>
				Waiting for BTC confirmation
			</span>
			<span v-show='state == 10'>
				Waiting for renVM
			</span>
			<span v-show='state == 11'>
				Got BTC {{ (transaction.utxoAmount / 1e8).toFixed(8) }}, now initiating swap
				<button @click="$emit('resubmit', transaction)">Resubmit</button>
			</span>
			<span v-show='state == 12'>
				Waiting for swap confirmation
			</span>
			<span v-show='state == 14 && transaction.type == 0'>
				Swap done <button @click="$emit('resubmit', transaction)">resubmit</button>
			</span>
			<span v-show='[14,17].includes(state) && transaction.type == 3'>
				Deposit<span v-show='transaction.state == 17'> & stake</span> done
				<button 
					v-show='transaction.state != 17' 
					@click="$emit('resubmit', transaction)">
					stake
				</button> 
				<button @click="$emit('resubmit', transaction)">resubmit</button>
			</span>
			<span v-show='state == 15'>
				Got {{ (transaction.utxoAmount / 1e8).toFixed(8) }} renBTC, do you want to 
				<button @click="$emit('mint', transaction)">mint and swap</button>
			</span>
			<span v-show='state == 13 && transaction.type == 0'>
				Exchange rates expired, you got {{ (transaction.utxoAmount / 1e8).toFixed(8) }} deposited.
				Do you want to <button @click="$emit('swapNow', transaction)">swap now</button> or
				<button @click="$emit('receiveRen', transaction)">receive renBTC</button>
			</span>
			<span v-show='state == 13 && transaction.type == 3 && !transaction.lessSent'>
				Minimum token receive amount expired, you got {{ (transaction.utxoAmount / 1e8).toFixed(8) }} deposited
				Do you want to 
				<button @click="$emit('depositNow', transaction)">
					deposit<span v-show='transaction.stake'> &stake</span> now
				</button> or
				<button @click="$emit('receiveRenDeposit', transaction)">receive renBTC</button>
			</span>
			<span v-show='state == 13 && transaction.type == 3 && transaction.lessSent'>
				You sent less than specified amount in BTC. You'll receive min {{ transaction.renCRVmin }}
				Do you want to 
				<button @click="$emit('depositNow', transaction)">
					deposit<span v-show='transaction.stake'> &stake</span> now
				</button> or
				<button @click="$emit('receiveRenDeposit', transaction)">receive renBTC</button>
			</span>
			<span v-show='state == 16'>
				ETH transaction failed
				<button @click="$emit('resubmit', transaction)">resubmit</button>
			</span>

			<span v-show='state == 30'>
				Started swap WBTC->BTC
			</span>

			<span v-show='state >= 31 && state < 61'>
				Waiting for confirmations
			</span>

			<span v-show='state == 61'>
				Submitted to RenVM
			</span>

			<span v-show='state == 62'>
				Waiting for RenVM
			</span>

			<span v-show='state == 63'>
				Waiting for RenVM swap renBTC->BTC
			</span>

			<span v-show='state == 64'>
				Executing swap renBTC->BTC
			</span>

			<span v-show='state == 65'>
				BTC sent
			</span>

			<span v-show='state == 66'>
				ETH transaction failed
				<button @click="$emit('resubmit', transaction)">resubmit</button>
			</span>
		</span>
	</div>
</template>

<script>
	import BN from 'bignumber.js'

	import { state } from './shiftState'

	export default {
		props: ['state', 'transaction'],
		computed: {
			renFee() {
				return BN(this.transaction.utxoAmount).times(1e8).times(0.001).div(1e8).toFixed()
			},
			default_account() {
				return state.default_account
			},
			publicPath() {
        		return process.env.BASE_URL
        	},
		},
		methods: {
			shortenAddress(address) {
				return address.slice(0,6) + '...' + address.slice(-3)
			},
		},
	}
</script>

<style scoped>
	button {
		box-shadow: none;
	}
	.submitfromwarning {
		color: darkred;
	}
	.submitfromwarning .tooltip {
		width: min-content;
	}
	.icon.small {
		height: 1em;
	}
	.hoverpointer {
		cursor: pointer;
	}
	.errortext {
		color: darkred;
	}
	.icon.warning {
		width: 1em;
		margin-left: 0.5em;
		filter: invert(13%) sepia(90%) saturate(4444%) hue-rotate(11deg) brightness(88%) contrast(97%);
	}
	.errormessage {
		word-break: break-all;
	}
</style>