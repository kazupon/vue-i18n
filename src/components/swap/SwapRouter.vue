<template>
	<div class='window white'>
		<div class='aligncontainer'>
			<div class='info-message gentle-message pulseinfo' v-show='contactUs'>
				We believe there was an issue with your swap. 
				Please contact us on <a href='https://t.me/curvefi'>Telegram</a> or <a href='https://twitter.com/CurveFinance'>Twitter</a>.
			</div>

			<div class='info-message gentle-message betaversion' v-show='swapbtc'>
				This is a beta version. Please test with small amounts and use with caution.
			</div>
			<div v-show="['ren', 'sbtc'].includes(currentPool)" class='swapBTC-container info-message gentle-message'>
		        <input id='swapbtc' type='checkbox' value='swapbtc' v-model='swapbtc'/>
		        <label for='swapbtc'>Swap 
		        	<img :src="publicPath + 'tokens/btc.svg'" class='token-icon vamiddle'>
		        	<a href='https://guides.curve.fi/how-to-swap-bitcoin-for-wbtc-or-renbtc/' rel='noopener norefferer'>[?]</a>
		        	<span v-show='hasIncomplete > 0 && swapbtc == false'>
		        		({{hasIncomplete}} incomplete tx)
		        	</span>
		        </label>
		    	<span v-show='loading' class='loading line'></span>
		    </div>
		</div>
	    <swap-native v-if='swapbtc' @loaded='loaded'></swap-native>
	    <swap v-if='!swapbtc || (swapbtc && !loaded)'></swap>
    </div>
</template>

<script>
    import { getters, contract as currentContract, gas as contractGas} from '../../contract'
    import * as shiftState from '../ren/shiftState'
	import Swap from './Swap.vue'

	import LoadingComponent from '../ren/LoadingComponent.vue'
    const SwapNative = () => ({
        component: import('../ren/Gateway.vue'),

        loading: Swap,

        delay: 0,
    })

	export default {
		components: {
			Swap,
			SwapNative,
		},


		data: () => ({
			loading: false,
		}),

		created() {
			if(this.$route.path.includes('native')) this.swapbtc = true
			if(this.$route.path.includes('recover')) shiftState.state.recover = true
			this.$watch(() => currentContract.currentContract, (val, oldval) => {
				if(['ren', 'sbtc'].includes(oldval) && !['ren', 'sbtc'].includes(val)) this.swapbtc = false
			}, {
				immediate: true,
			})
		},

		watch: {
			swapbtc(val) {
				if(val) this.loading = true
				else this.loading = false
			}
		},

		computed: {
			swapComponent() {
				console.log(currentContract.currentContract, "CURRENT CONTRACT")
				if(this.swapbtc && ['ren', 'sbtc'].includes(currentContract.currentContract)) return 'SwapNative'
				return 'Swap'
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
            default_account() {
            	return getters.default_account()
            },
            contactUs() {
            	return ['0x0f87dd03a74e6a48d56661d96f44880c79b9d795'].map(a => a.toLowerCase())
            		.includes(this.default_account.toLowerCase())
            },
		},

		methods: {
			loaded() {
				if(this.swapComponent == 'SwapNative') this.loading = false;
			}
		},

	}
</script>

<style scoped>
	.swapBTC-container {
		margin-top: 1em;
		margin-bottom: 1em;
		cursor: pointer;
	}
	.swapBTC-container label {
		cursor: pointer;
	}
	.loading.line {
		margin-left: 1em;
	}
	.aligncontainer {
		margin: 0 auto;
		width: 80%;
	}
	.swapBTC-container.info-message {
		padding-top: 0.4em;
		padding-bottom: 0.4em;
	}
</style>