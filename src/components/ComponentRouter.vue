<template>
	<div class='window white'>
	    <component :is='componentRouter' @loaded='loaded'></component>
		<div v-show="currentPool == 'ren'" class='swapBTC-container'>
	        <input id='swapbtc' type='checkbox' value='swapbtc' v-model='swapbtc'/>
	        <label for='swapbtc'>
	        	Swap BTC
	        	<span v-show='hasIncomplete > 0 && swapbtc == false'>
	        		( {{hasIncomplete}} incomplete transactions)
	        	</span>
	        </label>
	    	<span v-show='loading' class='loading line'></span>
	    </div>
    </div>
</template>

<script>
    import { getters, contract as currentContract, gas as contractGas} from '../contract'
    import * as shiftState from './ren/shiftState'

	import LoadingComponent from './ren/LoadingComponent.vue'
	const Swap = () => import('./swap/Swap.vue')
    const SwapNative = () => ({
        component: import('./ren/Gateway.vue'),

        loading: Swap,

        delay: 0,
    })

    const Deposit = () => import('./deposit/Deposit.vue')
    const DepositNative = () => ({
        component: import('./ren/Deposit.vue'),

        loading: Swap,

        delay: 0,
    })

    const Withdraw = () => import('./withdraw/Withdraw.vue')
    const WithdrawNative = () => ({
    	component: import('./ren/Withdraw.vue'),

    	loading: Withdraw
    })

	export default {
		components: {
			Swap,
			SwapNative,

			Deposit,
			DepositNative,

			Withdraw,
			WithdrawNative,
		},

		props: ['component'],

		data: () => ({
			swapbtc: false,
			loading: false,
		}),

		watch: {
			swapbtc(val) {
				if(val) this.loading = true
				else this.loading = false
			}
		},

		computed: {
			componentRouter() {
				if(this.swapbtc) return this.component+'Native'
				return this.component
			},
			currentPool() {
				return getters.currentPool()
			},
			hasIncomplete() {
				return shiftState.hasIncomplete()
			},
		},

		methods: {
			loaded() {
				if(this.componentRouter == this.component + 'Native') this.loading = false;
			}
		},

	}
</script>

<style scoped>
	.swapBTC-container {
		margin-top: 1em;
		margin-bottom: 1em;
	}
	.loading.line {
		margin-left: 1em;
	}
</style>