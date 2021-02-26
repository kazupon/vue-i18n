<template>
	<component :is='currentProfit'></component>
</template>

<script>
    import { getters, contract as currentContract } from '../contract'

    import Profit from './Profit.vue'
    import yProfit from './yProfit.vue'
    import plainProfit from './plainProfit.vue'

	export default {
		components: {
			Profit,
			yProfit,
			plainProfit,
		},
		computed: {
			...getters,
			currentProfit() {
				if(['compound', 'usdt'].includes(this.currentPool)) return 'Profit'
				if(['susdv2', 'tbtc', 'ren', 'sbtc'].includes(this.currentPool)) return 'plainProfit'
				return 'yProfit';
			}
		}
	}
</script>

<style>
	
</style>