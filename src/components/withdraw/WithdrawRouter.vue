<template>
	<div class='window white'>
		<div class='info-message gentle-message betaversion' v-show='swapbtc'>
			This is a beta version. Please test with small amounts and use with caution.
		</div>
		<div v-show="['ren', 'sbtc'].includes(currentPool)" class='swapBTC-container info-message gentle-message'>
	        <input id='swapbtc' type='checkbox' value='swapbtc' v-model='swapbtc'/>
	        <label for='swapbtc'>Withdraw
	        	<img :src="publicPath + 'tokens/btc.svg'" class='token-icon vamiddle'>
	        	<a href='https://guides.curve.fi/how-to-swap-bitcoin-for-wbtc-or-renbtc/' rel='noopener norefferer'>[?]</a>
	        	<span v-show='hasIncomplete > 0 && swapbtc == false'>
	        		({{hasIncomplete}} incomplete tx)
	        	</span>
	        </label>
	    	<span v-show='loading' class='loading line'></span>
	    </div>
	    <withdraw-native v-if='swapbtc' @loaded='loaded'></withdraw-native>
	    <withdraw v-if='!swapbtc || (swapbtc && !loaded)'></withdraw>
    </div>
</template>

<script>
    import { getters, contract as currentContract, gas as contractGas} from '../../contract'
    import * as shiftState from '../ren/shiftState'
	import Withdraw from './Withdraw.vue'

	import LoadingComponent from '../ren/LoadingComponent.vue'
    const WithdrawNative = () => ({
        component: import('../ren/Withdraw.vue'),

        loading: Withdraw,

        delay: 0,
    })

	export default {
		components: {
			Withdraw,
			WithdrawNative,
		},

		created() {
			if(this.$route.path.includes('native')) this.swapbtc = true
			this.$watch(() => currentContract.currentContract, (val, oldval) => {
				if(['ren', 'sbtc'].includes(oldval) && !['ren', 'sbtc'].includes(val)) this.swapbtc = false
			})
		},

		data: () => ({
			loading: false,
		}),

		watch: {
			swapbtc(val) {
				if(val) this.loading = true
				else this.loading = false
			}
		},

		computed: {
			swapComponent() {
				if(this.swapbtc && ['ren', 'sbtc'].includes(currentContract.currentContract)) return 'WithdrawNative'
				return 'Withdraw'
			},
			currentPool() {
				return getters.currentPool()
			},
			hasIncomplete() {
				return shiftState.hasIncomplete()
			},
			swapbtc: {
				get() {
					return currentContract.swapbtc && ['ren', 'sbtc'].includes(currentContract.currentContract)
				},
				set(val) {
					currentContract.swapbtc = val
				},
			},
			publicPath() {
                return process.env.BASE_URL
            },
		},

		methods: {
			loaded() {
				if(this.swapComponent == 'WithdrawNative') this.loading = false;
			}
		},

	}
</script>

<style scoped>
	.swapBTC-container {
		margin-top: 1em;
		margin-bottom: 1em;
		padding-top: 0.4em;
		padding-bottom: 0.4em;
		cursor: pointer;
	}
	.swapBTC-container label {
		cursor: pointer;
	}
	.loading.line {
		margin-left: 1em;
	}
</style>