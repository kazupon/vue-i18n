<template>
	
</template>

<script>
	import allabis, { registry_abi, registry_address } from '../../allabis'
	import { contract, allCurrencies, getters } from '../../contract'

	export default {
		data: () => ({
			registry: null,
		}),
		created() {
			this.$watch(() => contract.web3 && contract.multicall, val => {
				if(val) this.mounted()
			})
		},
		mounted() {
			contract.web3 && contract.multicall && this.mounted()
		},
		methods: {
			async mounted() {
				this.registry = new web3.eth.Contract(registry_abi, registry_address)
				window.registry = this.registry
			},
		}
	}
</script>