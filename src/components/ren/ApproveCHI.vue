<template>
	<div class='CHIcontainer'>
		<span v-show='showCHIUsed'>
			Using <img class='icon small' :src="publicPath + 'tokens/chi.png'"> CHI
		</span>
		<span>
		 	<button @click='approveCHI' v-show='showApproveCHI'>
				Approve
		 		<img class='icon small' :src="publicPath + 'tokens/chi.png'"> CHI
			</button>
		</span>
	</div>
</template>

<script>
    import * as common from '../../utils/common.js'
    import { getters, contract as currentContract, gas as contractGas} from '../../contract'
    import allabis, { ERC20_abi, CHI_address } from '../../allabis'

	export default {
		data: () => ({
			chi: null,
			chiContract: 0,
			chiUser: 0,
			chiAllowance: 0,
		}),

		computed: {
			publicPath() {
                return process.env.BASE_URL
            },
            showCHIUsed() {
            	return this.chiContract > 20 || (BN(this.chiAllowance).gt(currentContract.max_allowance.div(2)) && this.chiUser > 10)
            },
            showApproveCHI() {
            	return this.chiContract == 0 && (BN(this.chiAllowance).lt(currentContract.max_allowance.div(2)) && this.chiUser > 10)
            },
		},

		async created() {
			this.$watch(()=>currentContract.initializedContracts, val => {
                if(val) this.mounted();
            }, {
            	immediate: true
            })
		},

		methods: {
			async mounted() {
				if(!['ren','sbtc'].includes(currentContract.currentContract)) return;
				let calls = [	
					[CHI_address, currentContract.chi.methods.balanceOf(allabis[currentContract.currentContract].adapterBiconomyAddress).encodeABI()],
					[CHI_address, currentContract.chi.methods.balanceOf(currentContract.default_account).encodeABI()],
					[CHI_address, currentContract.chi.methods.allowance(currentContract.default_account, 
						allabis[currentContract.currentContract].adapterBiconomyAddress).encodeABI()]
				]
				let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
				let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
				this.chiContract = +decoded[0]
				this.chiUser = +decoded[1]
				this.chiAllowance = +decoded[2]
			},

			async approveCHI() {
				await common.approveAmount(currentContract.chi, currentContract.max_allowance, 
											currentContract.default_account, allabis[currentContract.currentContract].adapterBiconomyAddress, true)
				this.showCHIbutton = false
			},
		}
	}
</script>

<style scoped>
	.CHIcontainer {
		margin-top: 1em;
		text-align: center;
	}

	button {
		padding-bottom: 0.1em;
	}

	button img {
		width: 1.2em;
		height: 1.2em;
		vertical-align: middle;
	}
</style>