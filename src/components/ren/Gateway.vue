<template>
	<div class='rengateway'>
		
		<div class='exchange'>

            <div class='exchangefields'>

				<div class='flexbreak'></div>

                <fieldset class='item'>
                    <legend>From:</legend>
                    <div class='maxbalance' @click='set_max_balance'>
                    	Max: 
                    	<span 
                            v-show="currentPool == 'sbtc' && from_currency == 2"
                        >
                            {{maxSynthText}}/
                        </span>
                    	<span>{{maxBalanceText}}</span> 
                    	<span v-show='susdWaitingPeriod' class='susd-waiting-period'>
                            <span class='tooltip'>
                                <img src='@/assets/clock-regular.svg' class='icon small'>
                                <span class='tooltiptext'>
                                    Cannot transfer during waiting period
                                </span>
                            </span>
                        </span>
                        <span v-show="currentPool == 'sbtc' && from_currency == 2" class='tooltip'> [?]
                            <span class='tooltiptext long'>
                                Max transferrable amount is {{ maxSynthText }}. You can free the remaining balance by settling.
                            </span>
                        </span>
                    </div>
                    <ul>
                        <li>
                            <input type="text" id="from_currency" :disabled='disabled' name="from_currency" value='0.00'
                            :style = "{backgroundColor: fromBgColor}"
                            @input='set_to_amount'
                            v-model='fromInput'>
                            <p class='actualvalue' v-show="['sbtc', 'ren'].includes(currentPool)">
                                ≈ {{ actualFromValue }}$
                            </p>
                        </li>
                        <li class='coins' v-for='(currency, i) in Object.keys(currencies)'>
                            <input type="radio" :id="'from_cur_'+i" name="from_cur" :value='i' v-model='from_currency'>
                            <label :for="'from_cur_'+i">
                            	<img 
                                    :class="{'token-icon': true, [currency+'-icon']: true}" 
                                    :src='getTokenIcon(currency)'>
                                <span>{{currency | capitalize}}</span>
                            </label>
                        </label>
                        </li>
                        <div v-show='from_currency == 0 && amountAfterBTC >= 0' class='amount-after-fees'> 
                        	Amount after renVM fees: {{amountAfterBTC}}
                        </div>
                    </ul>
                </fieldset>
                <fieldset class='item iconcontainer' @click='swapInputs'>
                    <img :src="publicPath + 'exchange-alt-solid.svg'" id='exchangeicon'/>
                </fieldset>
                <fieldset class='item'>
                    <legend>To:</legend>
                    <div class='maxbalance2'>Max: <span></span> </div>
                    <ul>
                        <li>
                            <input type="text" 
                            id="to_currency" 
                            name="to_currency" 
                            value="0.00" 
                            disabled
                            :style = "{backgroundColor: bgColor}"
                            :value = 'toInputFormat'>
<!--                             <p class='actualvalue' v-show='swapwrapped'>
                                ≈ {{actualToValue}} {{Object.keys(currencies)[this.to_currency] | capitalize}}
                            </p> -->
                            <p class='actualvalue' v-show="['ren', 'sbtc'].includes(currentPool)">
                                ≈ {{ actualToValue }}$
                            </p>
                        </li>
                        <li class='coins' v-for='(currency, i) in Object.keys(currencies)'>
                            <input type="radio" :id="'to_cur_'+i" name="to_cur" :value='i' v-model='to_currency'>
                            <label :for="'to_cur_'+i">
                            	<img 
                                    :class="{'token-icon': true, [currency+'-icon']: true}" 
                                    :src='getTokenIcon(currency)'>
                                <span>{{currency | capitalize}}</span>
                            </label>
                        </label>
                        </li>
                        <div v-show='[1,2].includes(from_currency) && to_currency == 0 && toInputOriginal >= 0' class='amount-after-fees'>
                        	Amount before renVM fees: {{toInputOriginal.toFixed(8)}}
                        </div>
                    </ul>
                </fieldset>
            </div>
            <p class='exchange-rate' v-show='!([1,2].includes(this.from_currency) && [1,2].includes(this.to_currency))'>Exchange rate (including fees and renVM fee): 
            	<span id="exchange-rate" v-show='!lessThanMinOrder'>{{ exchangeRate && exchangeRate.toFixed(4) }}</span>
            	<span v-show='lessThanMinOrder'>N/A</span>
            </p>
            <p class='exchange-rate'>Exchange rate (including fees): 
            	<span id="exchange-rate" v-show='!lessThanMinOrder'>{{ exchangeRateOriginal && exchangeRateOriginal.toFixed(4) }}</span>
            	<span v-show='lessThanMinOrder'>N/A</span>
            </p>
            <div id='max_slippage'><span>Max slippage:</span> 
                <input id="slippage05" type="radio" name="slippage" value='0.005' @click='maxSlippage = 0.5; customSlippageDisabled = true'>
                <label for="slippage05">0.5%</label>

                <input id="slippage1" type="radio" name="slippage" checked value='0.01' @click='maxSlippage = 1; customSlippageDisabled = true'>
                <label for="slippage1">1%</label>

                <input id="custom_slippage" type="radio" name="slippage" value='-' @click='customippageDisabled = false'>
                <label for="custom_slippage" @click='customSlippageDisabled = false'>
                    <input type="text" id="custom_slippage_input" :disabled='customSlippageDisabled' name="custom_slippage_input" v-model='maxInputSlippage'> %
                </label>
            </div>
            <gas-price></gas-price>
            <p class='simple-error' v-show='lessThanMinOrder && from_currency == 0'>
            	Minimum mint order size is {{ (minOrderSize / 1e8).toFixed(8) }} 
            </p>
            <p class='simple-error' v-show='lessThanMinOrder && from_currency == 1'>
            	Minimum burn order size is {{ (minOrderSize / 1e8 + 0.00000547).toFixed(8) }}
            </p>
            <div class='input address' v-show='this.from_currency == 0 && [1,2].includes(this.to_currency) || [1,2].includes(this.from_currency) && this.to_currency == 0'>
				<label for='address' v-show='[1,2].includes(this.from_currency) && this.to_currency == 0'>BTC withdrawal address</label>
				<label for='address' v-show='this.from_currency == 0 && [1,2].includes(this.to_currency)'>ETH address</label>
				
				<input id='address' type='text' v-model='address' placeholder='Address' :style='addressStyle'>
			</div>
	     	<ul class='infiniteapproval'>
	            <li>
	                <input id="inf-approval" type="checkbox" name="inf-approval" v-model='inf_approval'>
	                <label for="inf-approval">Infinite approval - trust this contract forever
	                    <span class='tooltip'>[?]
	                        <span class='tooltiptext long'>
	                            Preapprove the contract to to be able to spend any amount of your coins. You will not need to approve again.
	                        </span>
	                    </span>
	                </label>
	            </li>
	        </ul>
        </div>

        <div class='simple-error pulse' v-show="susdWaitingPeriod">
            Cannot transfer sBTC during waiting period
        </div>

        <div class='info-message gentle-message' v-show='estimateGas'>
            Estimated tx cost: {{ (estimateGas * gasPrice / 1e9 * ethPrice).toFixed(2) }}$
        </div>

        <approve-chi></approve-chi>
        
        <p class='simple-error' v-show='address && !checkAddress'>
            Invalid {{ from_currency == 0 ? 'ETH' : 'BTC' }} address
        </p>
        <button class='swap' @click='submit' :disabled='swapDisabled'>Swap</button>

		<tx-table></tx-table>

		
	</div>	
</template>

<script>
	import Vue from 'vue'
    import { notify, notifyHandler } from '../../init'
	import { getters, allCurrencies, contract, gas as contractGas } from '../../contract'
	import RenSDK from '@renproject/ren'
	import BN from 'bignumber.js'
	import * as helpers from '../../utils/helpers'
	import * as common from '../../utils/common'
	import allabis, { ERC20_abi } from '../../allabis'
	let Box = null
	import * as subscriptionStore from '../common/subscriptionStore'
	import Table from './Table.vue'
	import * as store from './shiftStore'
	import { state } from './shiftState'
    import * as priceStore from '../common/priceStore'

    import * as gasPriceStore from '../common/gasPriceStore'
    import GasPrice from '../common/GasPrice.vue'

    import * as errorStore from '../common/errorStore'

    import ApproveCHI from './ApproveCHI.vue'

    import validate from 'bitcoin-address-validation';
	
	const txObject = () => ({
		id: '',
		timestamp: null,
		type: '',
		amount: '',
		fromInput: 0,
		toInput: 0,
		toAmount: 0,
		address: '',
		params: '',
		ethTxHash: '',
		ethStartBlock: null,
		ethCurrentBlock: null,
		ethConfirmations: null,
		renVMHash: '',
		gatewayAddress: '',
		confirmations: 0,
		// 0 - waiting for renVM gateway address, 1 - waiting for deposit on BTC address, 2 - got BTC transaction, waiting for confirmation
		// 3 - waiting for renVM to do it's magic and shift, 4 - got renBTC, now initiating swap, 5 - swap ready
		state: 0,
		btcTxHash: '',
		btcTxVOut: '',
		renResponse: '',
		signature: '',
	})

	export default {
		components: {
			'tx-table': Table,
            'approve-chi': ApproveCHI,
            GasPrice,
		},
		data: () => ({
			toInput: '0.00',
			toInputOriginal: 0,
			address: '',

			confirmations: 6,
			// 1 - getting btc deposit address, 2 - waiting to confirm on btc network, 3 - 
			box: null,
			showModal: false,
			qrValue: null,


			maxBalance: 0,
			maxSynthBalance: -1,
            susdWaitingPeriod: false,
			disabled: false,
			fromInput: '0.001',
			from_currency: 0,
			to_currency: 1,
            btcPrice: null,
            ethPrice: null,
            customGasDisabled: true,
            customGasInput: null,
            estimateGas: null,
			get_dy_original: '',
			fromBgColor: '',
			bgColor: '',
			maxSlippage: 1,
            maxInputSlippage: '',
            customSlippageDisabled: true,
			swapwrapped: false,
			copied: false,
			inf_approval: false,
			promise: helpers.makeCancelable(Promise.resolve()),
		}),
		computed: {
			swapDisabled() {
				return this.lessThanMinOrder || 
					([1,2].includes(this.from_currency) && this.to_currency == 0 && !this.address) ||
                    !this.checkAddress
			},
			maxBalanceText() {
				if(this.from_currency == 0) return 'N/A'
				return BN(this.maxBalance).div(this.fromPrecisions).toFixed(8)
			},
			maxSynthText() {
				return this.toFixed(BN(this.maxSynthBalance).div(1e18))
			},
			exchangeRate() {
				if(this.from_currency == 1) return this.amountAfterWBTC / this.fromInput
            	return this.toInput / this.fromInput
            },
            exchangeRateOriginal() {
            	return this.toInputOriginal / this.fromInput
            },
            amountAfterBTC() {
            	return (BN(this.fromInput).times(1e8).times(1-state.mintFee/10000).minus(state.minersLockFee)).div(1e8).toFixed(8)
            },
            amountAfterWBTC() {
            	return (BN(this.toInputOriginal).times(1e8).times(1-state.burnFee/10000).minus(state.minersReleaseFee)).div(1e8).toFixed(8)
            },
            minOrderSize() {
            	return state.minersReleaseFee + state.burnFee / 10000 + 1100
            },
            lessThanMinOrder() {
            	if([1,2].includes(this.from_currency) && [1,2].includes(this.to_currency)) return false
                if(this.from_currency == 0 && this.amountAfterBTC < 0) return true
                if(this.from_currency == 1 && (this.fromInput * 1e8 * (1-state.burnFee/10000)) < state.minersReleaseFee + 500) return true 
            },
        	toInputFormat() {
        		if(!this.toInput || typeof this.toInput == 'string') return '0.00'
        		if([1,2].includes(this.from_currency) && [1,2].includes(this.to_currency))
        			return +this.toInputOriginal.toFixed(8)
        		return +this.toInput.toFixed(8) 
        	},
        	addressStyle() {
        		if(this.from_currency == 0) {
        			return {
        				background: '#505070',
    					color: '#d0d0d0',
        			}
        		}
        		else return {}
        	},
            actualFromValue() {
                return (this.fromInput * this.btcPrice).toFixed(2)
            },
            actualToValue() {
                return (this.toInput * this.btcPrice).toFixed(2)
            },
        	publicPath() {
                return process.env.BASE_URL
            },
            currencies() {
            	if(contract.currentContract == 'ren') {
            		return {
            			btc: 'BTC',
						wbtc: 'WBTC',
            		}
            	}
            	if(contract.currentContract == 'sbtc') {
            		return {
            			btc: 'BTC',
						wbtc: 'wBTC',
						sbtc: 'sBTC',	
            		}
            	}
            },
            fromPrecisions() {
            	return allabis[contract.currentContract].coin_precisions[this.from_currency]
            },
            toPrecisions() {
            	return allabis[contract.currentContract].coin_precisions[this.to_currency]
            },
            currentPool() {
            	return getters.currentPool()
            },
            gasPrice() {
                return gasPriceStore.state.gasPrice
            },
            gasPriceWei() {
                return gasPriceStore.state.gasPriceWei
            },
            checkAddress() {
                if(this.from_currency == 0 && [1,2].includes(this.to_currency)) {
                    return contract.web3.utils.isAddress(this.address)
                }
                else {
                    return validate(this.address) !== false
                }
            },
		},
		watch: {
			from_currency(val, oldval) {
                if(val == this.to_currency) {
                    this.to_currency = oldval;
                }

                if(this.from_currency == 0) this.fromBgColor = 'blue'
                
                this.from_cur_handler()
            },
            async to_currency(val, oldval) {
            	if(val == this.from_currency) {
            		if (this.to_currency == 0) {
                        this.from_currency = 1;
                    } else {
                        this.from_currency = 0;
                    }
            	}
            	await this.from_cur_handler()
            },
		},
		created() {
			this.$watch(() => contract.initializedContracts && state.loaded, val => {
				if(!val) return;
				this.mounted()
			})
		},
		mounted() {
			this.$emit('loaded')
			let modal = document.querySelector('#modal')
			window.addEventListener('click', () => {
				if (event.target == modal) {
					this.showModal = false
			  	}
			})
			contract.initializedContracts && state.loaded && this.mounted()
		},
		methods: {
			async mounted() {
                this.btcPrice = await priceStore.getBTCPrice()
                //when used in OneSplit component
                // if(contract.currentContract != 'ren') {
                //  contract.swap = contract.contracts.ren.swap
                //  contract.coins = contract.contracts.ren.coins
                // }
				if([1,2].includes(this.from_currency)) this.address = contract.default_account
				this.from_cur_handler()
			},

			toFixed(num) {
                if(num == '' || num == undefined || num == 0) return '0.00'
                if(!BN.isBigNumber(num)) num = +num
                if(['tbtc', 'ren', 'sbtc'].includes(contract.currentContract)) return num.toFixed(8)
                return num.toFixed(2)
            },

			async set_max_balance() {
				if(this.from_currency == 0) {
					this.fromInput = 0
					return;
				}
				let maxBalance = BN(this.maxBalance).div(this.fromPrecisions).toFixed(8)
				if(this.currentPool == 'sbtc' && this.from_currency == 2) {
					maxBalance = BN(this.maxSynthBalance).div(1e18).toString()
				}

				this.fromInput = maxBalance
				this.set_to_amount()
			},

			getTokenIcon(token) {
                return helpers.getTokenIcon(token, this.swapwrapped, this.currentPool)
            },

			async set_to_amount() {
				this.highlight_input();
				let i = this.from_currency
				let j = this.to_currency
				let dx = BN(this.fromInput).times(this.fromPrecisions).toFixed(0,1)
				let original_dx = dx
				let fee = i == 0 ? state.minersLockFee : state.minersReleaseFee
				let ethfee = i == 0 ? state.mintFee : state.burnFee
				ethfee = 1 - ethfee/10000
				dx = BN(this.fromInput).times(this.fromPrecisions).times(ethfee).minus(fee).toFixed(0,1)
				//case WBTC -> BTC
					//swapping the entered WBTC amount and then from result subtract fees
				//case BTC -> WBTC
					//subtract fees and then do SWAP
				if(this.lessThanMinOrder) {
					this.toInput = 0;
					return;
				}
				let get_dy_original = contract.swap.methods.get_dy(i, j, BN(this.fromInput).times(this.fromPrecisions).toFixed(0,1)).encodeABI()
				let get_dys = [get_dy_original]
				if(this.from_currency == 0) {
					get_dys.push(contract.swap.methods.get_dy(i, j, BN(this.amountAfterBTC).times(this.fromPrecisions).toFixed(0,1)).encodeABI())
				}
				this.promise.cancel()
				let calls = get_dys.map(call => [contract.swap._address, call])
				let promise = contract.multicall.methods.aggregate(calls).call()
				this.promise = helpers.makeCancelable(promise)
				try {
					let result = await promise
					result = result[1].map(hex => contract.web3.eth.abi.decodeParameter('uint256', hex))
					if(this.from_currency == 0) {
						let [dy_original, dy] = result.map(v=>v / this.toPrecisions)
						this.toInput = dy
						this.toInputOriginal = dy_original
					}
					else {
						this.toInput = (result - fee)*ethfee / this.toPrecisions
						//this.toInput = result / 1e8
						this.toInputOriginal = result / this.toPrecisions
					}
				}
				catch(err) {
					console.error(err)
				}
			},

			highlight_input() {
				if(this.from_currency == 0) return;
				if(this.fromInput > this.maxBalance / this.fromPrecisions) {
					this.fromBgColor = 'red'
				}
				else {
					this.fromBgColor = 'blue'
				}
			},

			swapInputs() {
				[this.fromInput, this.toInput] = [this.toInput, this.fromInput]
                this.from_currency = this.to_currency
                this.from_cur_handler()
			},

			async from_cur_handler() {
				this.address = ''
				if(this.from_currency == 0) this.address = contract.default_account
                let currentAllowance = BN(await contract.coins[this.from_currency].methods.allowance(contract.default_account, allabis[contract.currentContract].adapterBiconomyAddress).call())
                let maxAllowance = contract.max_allowance.div(BN(2))
                if (currentAllowance.gt(maxAllowance))
                    this.inf_approval = true;
                else
                    this.inf_approval = false;

                await this.setMaxBalance();
                await this.set_to_amount();
            },

            async setMaxBalance() {
            	if(this.from_currency == 0) return;
            	let calls = [
            		[contract.coins[this.from_currency]._address, contract.coins[this.from_currency].methods.balanceOf(contract.default_account).encodeABI()],
            	]

            	if(this.currentPool == 'sbtc' && this.from_currency == 2) {
            		calls.push(
	            			[contract.coins[this.from_currency]._address, contract.coins[this.from_currency].methods.transferableSynths(contract.default_account).encodeABI()],
		            		[contract.snxExchanger._address, contract.snxExchanger.methods
		                        .maxSecsLeftInWaitingPeriod(contract.default_account, "0x7342544300000000000000000000000000000000000000000000000000000000").encodeABI()],
                    )
            	}


            	let aggcalls = await contract.multicall.methods.aggregate(calls).call()
            	let decoded = aggcalls[1].map(hex => contract.web3.eth.abi.decodeParameter('uint256', hex))
				let balance = +decoded[0]
				if(this.currentPool == 'sbtc' && this.from_currency == 2) {
					this.maxSynthBalance = +decoded[1]
					this.susdWaitingPeriod = +decoded[2]
                    this.susdWaitingPeriod = +this.susdWaitingPeriod > 0
					if(this.susdWaitingPeriod) balance = 0
				}
				this.maxBalance = contract.default_account ? balance : 0
				//console.log(this.maxBalance)
			},

			async submit() {
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]

                this.estimateGas = contract.currentContract == 'ren' ? 300000 : 400000

				let maxSlippage = this.maxSlippage;
                if(this.maxInputSlippage) maxSlippage = this.maxInputSlippage;
				if(this.from_currency == 0 && [1,2].includes(this.to_currency)) {
                	var min_dy = this.toInput * (1-maxSlippage)
					store.mint({
						from_currency: this.from_currency,
						to_currency: this.to_currency,
						amountAfterBTC: this.amountAfterBTC,
						address: this.address,
						fromInput: this.fromInput,
						toInput: this.toInput,
						slippage: maxSlippage * 10,
					})
                    if(document.querySelector('.showdesktoptransactions').offsetParent !== null) {
                        let el = document.querySelector('tbody tr td:first-child')
                        !helpers.isElementInViewport(el) && el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                    }
                    else {
                        let el = document.querySelector('.transactionmobile')
                        !helpers.isElementInViewport(el) && el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                    }
				}

				else if([1,2].includes(this.from_currency) && this.to_currency == 0) { 
					store.burnSwap({
						address: this.address,
						fromInput: this.fromInput,
						from_currency: this.from_currency,
						toInputOriginal: BN(this.toInputOriginal).times(this.toPrecisions),
						inf_approval: this.inf_approval,
					})
				}

				else {
					let dx = BN(this.fromInput).times(this.fromPrecisions).toFixed(0,1)
					let i = this.from_currency
					let j = this.to_currency

					try {
	                    if (this.inf_approval)
	                        await common.ensure_underlying_allowance(i, contract.max_allowance, [], undefined, false)
	                    else
	                        await common.ensure_underlying_allowance(i, dx, [], undefined, false);
	                }
	                catch(err) {
	                    console.error(err)
	                    throw err;
	                }

	                let min_dy = BN(this.toInputOriginal).times(this.toPrecisions).times(1-(maxSlippage / 100)).toFixed(0,1)
	                try {
                        await contract.swap.methods.exchange(i, j, dx, min_dy).send({
	                		from: contract.default_account,
                            gasPrice: this.gasPriceWei,
	                		gas: contractGas.swap[contract.currentContract].exchange(i, j),
	                	})
                        .once('transactionHash', hash => {
                            notifyHandler(hash)
                        })
                    }
                    catch(err) {
                        console.error(err)
                        errorStore.handleError(err)
                    }
				}
			}
		}
	}
</script>

<style scoped>
	label[for='getbtc'] {
		margin-left: 1em;
	}
	.input {
		margin-top: 1em;
	}
	.input input {
		display: block;
	}
	#amount {
		width: 100px;
	}
	#address {
		width: 600px;
	}
	.flexbreak {
		width: 100%;
		height: 0;
	}
	button.swap {
		display: block;
		margin: 0 auto;
		margin-top: 1em;
	}
	.tui-table {
		width: 100%;
		margin-top: 1em;
	}
	.simplebutton {
		margin-bottom: 1em;
	}
	#result {
		margin-top: 1em;
	}
	#result > div {
		margin-top: 0.3em;
	}
	.exchange-rate {
		text-align: left;
	}
	.exchange-rate {
		margin-top: 0.5em;
		margin-bottom: 0;
	}
	.input.address {
		margin-bottom: 1em;
	}
	.infiniteapproval {
		margin-top: 1em;
	}
	input[type=radio] + label[for]:before, input[type=checkbox] + label[for]:before {
		width: auto;
	}
	.exchangefields input[type=radio] + label[for]:before {
		margin-right: 0.5em;
	}
	.amount-after-fees {
		margin-top: 0.5em;
	}
	.maxbalance {
		cursor: pointer;
	}
	.maxbalance:hover {
		text-decoration: underline;
	}
	.window.white.rengateway {
		width: 80%;
		max-width: 700px;
	}
    .actualvalue {
        margin: 0.5em 0 0 0;
        text-align: right;
        font-size: 0.9em;
    }
</style>
