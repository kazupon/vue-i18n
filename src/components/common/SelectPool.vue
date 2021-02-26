<template>

</template>

<script>
	import tradeStore from '../graphs/tradeStore'
	export default {
		computed: {
			pools: {
				get() {
					return tradeStore.pools
				},
				set(pools) {
					tradeStore.pools = pools
				}
			}
		}
	}
</script>

<style scoped>

</style>