<template>
	<div class='window white'>
		<div class='info-message gentle-message'>
			ycTokens(<a href='https://etherscan.io/token/0x99d1fa417f94dcd62bfe781a1213c092a47041bc'>yDAI</a>,
			<a href='https://etherscan.io/token/0x9777d7e2b60bb01759d0e2f8be2095df444cb07e'>yUSDC</a>,
			<a href='https://etherscan.io/token/0x1be5d71f2da660bfdee8012ddc58d024448a0a59'>yUSDT</a>)
			are forked from iearn's yTokens, without owner and with Compound lending available for ycUSDT
		</div>
		<fieldset v-for='(token, i) of ycTokens'>
			<legend> 
				{{ token.name }} / {{ token.uname.toUpperCase() }} 
				<span>APR: {{ (token.apr * 100).toFixed(2) }}%</span>
			</legend>
			<div class='tokens'>
			<div class='inputs'>
				<div class='maxBalanceContainer' @click='setBalance(i, 0)'>
					<label :for="'token_'+i">
						{{ token.name }}
					</label>
					<sub class='maxBalance'> Bal: 
						{{ (token.maxBalance / token.precisions).toFixed(2) }}
						({{ ((token.maxBalance / token.precisions) * token.rate ).toFixed(2) }} {{ token.uname.toUpperCase() }})
					</sub>
				</div>
				<input 
					:id ="'token_'+i" 
					type='text' 
					v-model='token.value' 
					@focus='changeValue(i)' 
					@input='changeValue(i)'
					:style = "{ backgroundColor: bgColors[i] }">
				<button class='simplebutton' @click='withdraw(i)'>Withdraw</button>
			</div>

			<div class='inputs'>
				<div class='maxBalanceContainer' @click='setBalance(i, 1)'>
					<label :for="'token_'+i">
						{{ token.uname.toUpperCase() }}
					</label>
					<sub class='maxBalance'> Bal: 
						{{ (token.maxBalanceUnderlying / token.precisions).toFixed(2) }}
					</sub>
				</div>
				<input 
					:id ="'token_'+i" 
					type='text' 
					v-model='token.uvalue' 
					@focus='changeUValue(i)' 
					@input='changeUValue(i)'
					:style = "{ backgroundColor: ubgColors[i] }">
				<button class='simplebutton' @click='deposit(i)'>Deposit</button>
			</div>
		</div>
		</fieldset>
	</div>
</template>

<script>
	import Vue from 'vue'
	import allabis, { ERC20_abi, iearnAPR_abi, iearnAPR_address, yERC20_abi, } from '../../allabis'
	import { contract, allCurrencies } from '../../contract'
	import { omit, chunkArr } from '../../utils/helpers'
	import BN from 'bignumber.js'
	import { approveAmount } from '../../utils/common'

	export default {
		data: () => ({
			ycTokens: [
				//{	
					//name
					//uName
					//maxBalance,
					//maxBalanceUnderlying
					//interest
					//contract
					//ucontract
					//precisions
				//},
			],
			bgColors: ['blue', 'blue', 'blue'],
			ubgColors: ['blue', 'blue', 'blue'],
		}),
		computed: {
			tokens() {
				return omit('pax', allCurrencies.pax)
			}
		},
		async created() {
			this.$watch(() => contract.web3 && contract.multicall, async val => {
				if(!val) return;
				this.mounted()
			})
		},
		mounted() {
			contract.web3 && contract.multicall && this.mounted()
		},
		methods: {
			async mounted() {
				let iearnAPR = new contract.web3.eth.Contract(iearnAPR_abi, iearnAPR_address)
				let i = 0;
				for(let [utoken, token] of Object.entries(this.tokens)) {
					let address = allabis.pax.coins[i];
					let uaddress= allabis.pax.underlying_coins[i];
					let ycontract = new contract.web3.eth.Contract(yERC20_abi, address);
					let ucontract = new contract.web3.eth.Contract(ERC20_abi, uaddress);
					this.ycTokens.push({
						name: token,
						uname: utoken,
						contract: ycontract,
						ucontract: ucontract,
						precisions: allabis.pax.coin_precisions[i],
						value: '0.00',
						uvalue: '0.00',
						bgColor: 'blue',
						ubgColor: 'blue',
						apr: '',
					})
					i++;
				}
				let calls = this.ycTokens.flatMap(t => 
					[
						[t.ucontract._address, t.ucontract.methods.balanceOf(contract.default_account).encodeABI()],
						[t.contract._address, t.contract.methods.balanceOf(contract.default_account).encodeABI()],
						[iearnAPR_address, iearnAPR.methods.getAPROptions(t.ucontract._address).encodeABI()],
						[t.contract._address, t.contract.methods.getPricePerFullShare().encodeABI()]
					]
				)
				
				let aggcalls = await contract.multicall.methods.aggregate(calls).call()
				let balances = aggcalls[1].map((hex, i) => {
					let paramArray = new Array(10).fill('uint256')
					if(i % 4 == 2) {
						return Object.values(contract.web3.eth.abi.decodeParameters(paramArray, hex))
					}
					return contract.web3.eth.abi.decodeParameter('uint256', hex)
				})
				chunkArr(balances, 4).map(([ubal, bal, [,capr,,,,aapr,,dapr], rate], i) => {
					let apr = Math.max(capr, aapr, dapr) / 1e18;
					this.ycTokens[i].maxBalance = bal;
					this.ycTokens[i].apr = apr
					this.ycTokens[i].rate = rate / 1e18;
					Vue.set(this.ycTokens, i, Object.assign({}, this.ycTokens[i], { maxBalanceUnderlying: ubal }));
				})
			},
			setBalance(i, n) {
				//n == 0 for token
				//n == 1 for underlying token
				if(n == 0) {
					Vue.set(this.ycTokens, i, Object.assign({}, this.ycTokens[i], { value: 
						(this.ycTokens[i].maxBalance / this.ycTokens[i].precisions).toFixed(2) }))
				}
				if(n == 1) {
					Vue.set(this.ycTokens, i, Object.assign({}, this.ycTokens[i], { uvalue: 
						(this.ycTokens[i].maxBalanceUnderlying / this.ycTokens[i].precisions).toFixed(2) }))
				}
			},
			changeValue(i) {
				if(this.ycTokens[i].value > this.ycTokens[i].maxBalance / this.ycTokens[i].precisions) {
					Vue.set(this.bgColors, i, 'red')
				}
				else Vue.set(this.bgColors, i, 'blue')
			},
			changeUValue(i) {
				if(this.ycTokens[i].uvalue > this.ycTokens[i].maxBalanceUnderlying / this.ycTokens[i].precisions) {
					Vue.set(this.ubgColors, i, 'red')
				}
				else Vue.set(this.ubgColors, i, 'blue')
			},
			async deposit(i) {
				let amount = BN(this.ycTokens[i].uvalue).times(this.ycTokens[i].precisions)
				await approveAmount(this.ycTokens[i].ucontract, amount, contract.default_account, this.ycTokens[i].contract._address)
				await this.ycTokens[i].contract.methods.deposit(amount.toFixed(0,1)).send({
					from: contract.default_account,
					gas: 300000,
				})
			},
			async withdraw(i) {
				console.log('withdraw')
				let amount = BN(this.ycTokens[i].value).times(this.ycTokens[i].precisions).toFixed(0,1)
				console.log(this.ycTokens[i].contract.methods)
				await this.ycTokens[i].contract.methods.withdraw(amount).send({
					from: contract.default_account,
					gas: 300000,
				});
			},
		}
	}
</script>

<style scoped>
	legend {
		text-align: center;
	}
	.tokens {
		width: 80%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		margin-top: 1em;
	}
	.tokens > .inputs {
		margin-right: 3em;
		flex: 1;
	}
	.inputs button {
		margin-top: 0.3em;
	}
	.maxBalanceContainer {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.3em;
	}
	.maxBalance {
		text-align: right;
	}
	.maxBalance:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.tokens > div.break {
		flex: 1 1 100%;
		height: 0;
	}
	.apr {
		/*text-align: center;*/
		margin-bottom: 1em;
	}
	.info-message {
		margin-bottom: 1em;
	}
	.info-message a {
		color: white;
	}
</style>
