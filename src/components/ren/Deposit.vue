<template>
	<div>
		<div class="add-liquidity">
            <fieldset class="currencies">
                <legend>Currencies:</legend>
                <ul>
                    <li v-for='(currency, i) in Object.keys(currencies)'>
                        <label :for="'currency_'+i">
                        	<span class='currency_label'>
                                <img 
                                    :class="{'token-icon': true, [currency+'-icon']: true}" 
                                    :src='getTokenIcon(currency)'>
    	                        <span>{{currency | capitalize}} </span>
                                <span @click='setMaxBalanceCoin(i)' class='maxBalanceCoin' v-show="['wbtc', 'sbtc'].includes(currency)">
                                    <span v-show="currentPool == 'sbtc' && i == 2 && maxBalanceCoin(i) != '0.00'">
                                        {{transferableBalanceText}}/
                                    </span>
                                    <span>Max: {{ maxBalanceCoin(i) }} </span>
                                    <span v-show='i == 2 && susdWaitingPeriod'>
                                        <span class='tooltip'>
                                            <img src='@/assets/clock-regular.svg' class='icon small'>
                                            <span class='tooltiptext normalFont'>
                                                Cannot transfer during waiting period
                                            </span>
                                        </span>
                                    </span>
                                    <span v-show="currentPool == 'sbtc' && i == 2 && maxBalanceCoin(i) != '0.00'" class='tooltip'> [?]
                                        <span class='tooltiptext long normalFont'>
                                            Max transferable balance is {{ transferableBalanceText }}. You can free the remaining balance by settling.
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </label>
                        <input 
                            type="text" 
                            :id="'currency_'+i" 
                            :disabled='disabled' 
                            name="from_cur" 
                            v-model = 'inputs[i]'
                            :style = "{backgroundColor: bgColors[i]}"
                            @input='change_currency(i, true)'
                        >
                        <div v-show="i == 0 && amountAfterBTC > 0">
                            Amount after renVM fees: {{ amountAfterBTC }}
                        </div>
                        <div v-show="i == 0 && amountAfterBTC < 0">
                            Minimum deposit amount in BTC is {{ minOrderSize }}
                        </div>

                    </li>
                </ul>
            </fieldset>
            <ul>
                <!-- <li>
                    <input id="sync-balances" type="checkbox" name="sync-balances" @change='handle_sync_balances_proportion' :disabled='disabledButtons' checked v-model='sync_balances'>
                    <label for="sync-balances">Add all coins in a balanced proportion</label>
                </li> -->
                <li id='inf_approval_wrapper'>
                    <input id="inf-approval" type="checkbox" name="inf-approval" checked v-model='inf_approval'>
                    <label for="inf-approval">Infinite approval - trust this contract forever 
                    	<span class='tooltip'>[?]
                    		<span class='tooltiptext long'>
                    			Preapprove the contract to to be able to spend any amount of your coins. You will not need to approve again.
                    		</span>
                    	</span>
                    </label>
                </li>
            </ul>

            <gas-price></gas-price>


            <p style="text-align: center" v-show="currentPool == 'ren'">
                <a href='https://bridge.renproject.io/'> Mint/redeem renBTC </a>
            </p>

            <approve-chi></approve-chi>

            <p style="text-align: center" class='buttons'>
                <button id="add-liquidity" :disabled='amountAfterBTC < 0 && +inputs[0] > 0' @click='handle_add_liquidity()'>
                		Deposit <span class='loading line' v-show='loadingAction == 1'></span>
                </button>
                <button 
                    id="add-liquidity-stake" 
                    :disabled='amountAfterBTC < 0 && +inputs[0] > 0' 
                    v-show="['sbtc'].includes(currentPool)"
                    @click='handle_add_liquidity(true)'>
                        Deposit and stake <span class='loading line' v-show='loadingAction == 2'></span>
                </button>
                <button id='stakeunstaked' 
                    v-show="totalShare > 0 && ['sbtc'].includes(currentPool)" 
                    @click='stakeTokens()'>
                    Stake unstaked <span class='loading line' v-show='loadingAction == 3'></span>
                </button>
                <div class='info-message gentle-message' v-show='show_loading'>
                	{{waitingMessage}} <span class='loading line'></span>
                </div>
                <div class='info-message gentle-message' v-show='estimateGas'>
	                Estimated tx cost: {{ (estimateGas * gasPrice / 1e9 * ethPrice).toFixed(2) }}$
	            </div>
                <Slippage/>
            </p>

            <tx-table></tx-table>

        </div>
	</div>
</template>

<script>
	import Vue from 'vue'
    import { notify, notifyHandler, notifyNotification } from '../../init'

    import * as common from '../../utils/common.js'
    import { getters, contract as currentContract, gas as contractGas } from '../../contract'
    import allabis from '../../allabis'
    const compound = allabis.compound
    import * as helpers from '../../utils/helpers'

    import BN from 'bignumber.js'

    import Slippage from './../common/Slippage.vue'

    import Table from './Table.vue'
    import * as store from './shiftStore'
    import { state } from './shiftState'

    import * as gasPriceStore from '../common/gasPriceStore'
    import GasPrice from '../common/GasPrice.vue'

    import * as errorStore from '../common/errorStore'

    import ApproveCHI from './ApproveCHI.vue'

    export default {
    	components: {
    		Slippage,
            'tx-table': Table,
            'approve-chi': ApproveCHI,
            GasPrice,
    	},
    	data: () => ({
    		disabled: false,
    		disabledButtons: true,
    		sync_balances: false,
    		max_balances: false,
    		inf_approval: true,
    		wallet_balances: [],
            transferableBalance: null,
            susdWaitingPeriod: null,
    		balances: [],
    		inputs: [],
    		amounts: [],
    		bgColors: [],
    		depositc: false,
    		coins: [],
    		rates: [],
    		swap_address: currentContract.swap_address,
    		show_loading: false,
    		waitingMessage: '',
    		estimateGas: 0,
            customGasDisabled: true,
            customGasInput: null,
    		ethPrice: 0,
            justDeposit: false,
            loadingAction: false,
            errorStaking: false,
    		slippagePromise: helpers.makeCancelable(Promise.resolve()),
    	}),
        async created() {
            this.$watch(()=>currentContract.default_account, (val, oldval) => {
            	if(!val || !oldval) return;
            	if(val.toLowerCase() == oldval.toLowerCase()) return;
                this.mounted();
            })
            this.$watch(()=>currentContract.initializedContracts, val => {
                if(val) this.mounted();
            })
            this.$watch(()=>currentContract.currentContract, (val, oldval) => {
            	this.setInputStyles(false, val, oldval)
            	if(currentContract.initializedContracts) this.mounted();
            })

        },
        watch: {
            
        },
        computed: {
          ...getters,
          currencies() {
            if(currentContract.currentContract == 'ren') {
                return {
                    btc: 'BTC',
                    wbtc: 'WBTC',
                }
            }
            if(currentContract.currentContract == 'sbtc') {
                return {
                    btc: 'BTC',
                    wbtc: 'wBTC',
                    sbtc: 'sBTC',   
                }
            }
          },
          minAmount() {
          	if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) return 1e-8
          	return 0.01
          },
          calcFee() {
            let N_COINS = allabis[currentContract.currentContract].N_COINS
            return this.fee / 100 * N_COINS / (4 * (N_COINS -1))
          },
          amountAfterBTC() {
            return (BN(this.inputs[0]).times(1e8).times(1-state.mintFee/10000).minus(state.minersLockFee)).div(1e8).toFixed(8)
          },
          minOrderSize() {
            return ((state.minersLockFee + state.mintFee / 10000 + 1100) / 1e8).toFixed(8)
          },
          fromPrecisions() {
            return allabis[currentContract.currentContract].coin_precisions[this.from_currency]
          },
          toPrecisions() {
            return allabis[currentContract.currentContract].coin_precisions[this.to_currency]
          },
          transferableBalanceText() {
            return this.toFixed((this.transferableBalance / 1e18))
          },
          gasPrice() {
            return gasPriceStore.state.gasPrice
          },
          gasPriceWei() {
            return gasPriceStore.state.gasPriceWei
          },
        },
        mounted() {
            this.$emit('loaded')
	        this.setInputStyles(true)
            if(currentContract.initializedContracts) this.mounted();
        },
        methods: {

            async mounted(oldContract) {
            	this.coins = currentContract.coins
                this.rates = currentContract.c_rates
                this.swap_address = currentContract.swap_address
            	currentContract.showSlippage = false;
        		currentContract.slippage = 0;
                await this.handle_sync_balances();
                await this.calcSlippage()
                let calls = [...Array(currentContract.N_COINS).keys()].map(i=>[this.coins[i]._address, 
                	this.coins[i].methods.allowance(currentContract.default_account || '0x0000000000000000000000000000000000000000', this.swap_address).encodeABI()])
                let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
                let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
                if(decoded.some(v=>BN(v).lte(currentContract.max_allowance.div(BN(2))) > 0))
                	this.inf_approval = false
                this.disabledButtons = false;
                this.highlightInputs(0)
            },
            getTokenIcon(token) {
                return helpers.getTokenIcon(token, this.depositc, this.currentPool)
            },
            toFixed(num, precisions = 2, round = 4) {
                if(+num == 0 && ['ren', 'sbtc'].includes(currentContract.currentContract)) return '0.00'
                if(precisions == 2 && ['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) precisions = 8
                let rounded = num.toFixed(precisions)
                return isNaN(rounded) ? '0.00' : rounded
            },
            useFirestore() {
                store.useFirestore()
            },
            maxBalanceCoin(i) {
                return this.toFixed(this.wallet_balances[i] * this.rates[i])
            },
            setMaxBalanceCoin(i) {
                Vue.set(this.inputs, i, this.maxBalanceCoin(i))
                if(this.currentPool == 'sbtc' && i == 2) {
                    let maxbalance_susd = this.susdWaitingPeriod ? 0 : BN(this.transferableBalance).times(this.rates[i]).toString()
                    Vue.set(this.inputs, i, maxbalance_susd)
                }
            },
        	inputsFormat(i) {
        		if(this.inputs[i]) {
        			return this.toFixed(+this.inputs[i])
        		}
        		return '0.00'
        	},
            setInputStyles(newInputs = false, newContract, oldContract) {
				if(oldContract) {
					for(let i = 0; i < allabis[newContract].N_COINS - allabis[oldContract].N_COINS; i++) {
						this.inputs.push('0.00')
					}
					if(allabis[oldContract].N_COINS - allabis[newContract].N_COINS > 0) {
						this.inputs = this.inputs.filter((_, i) => i < allabis[newContract].N_COINS)
					}
				}
				else if(newInputs) {
					this.inputs = new Array(Object.keys(this.currencies).length).fill('0.00')
				}
	        	this.bgColors = Array(currentContract.N_COINS).fill({
	        		backgroundColor: '#707070',
	        		color: '#d0d0d0',
	        	})
            },
            async calcSlippage() {
            	try {
                    let inputs = [...this.inputs]
                    inputs[0] = this.amountAfterBTC > 0 ? this.amountAfterBTC : 0
	            	this.slippagePromise.cancel();
	        		this.slippagePromise = helpers.makeCancelable(common.calc_slippage(inputs, true))
	        		await this.slippagePromise;
            	}
            	catch(err) {
            		console.error(err)
            	}
            },
            async handle_sync_balances() {
			    await common.update_fee_info();
			    let calls = []
                for(let [i, coin] of this.coins.slice(1).entries()) {
    	           calls.push([coin._address, coin.methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
    	           calls.push([currentContract.swap._address, currentContract.swap.methods.balances(i).encodeABI()])
                }
                if(this.currentPool == 'sbtc') {
                    calls.push([this.coins[2]._address, this.coins[2].methods.transferableSynths(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
                    calls.push([currentContract.snxExchanger._address, 
                        currentContract.snxExchanger.methods
                        .maxSecsLeftInWaitingPeriod(currentContract.default_account, "0x7355534400000000000000000000000000000000000000000000000000000000")
                        .encodeABI()])
                }
			    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
			    let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
                let endOffset = 0
                if(this.currentPool == 'sbtc') {
                    this.transferableBalance = decoded[decoded.length-2]
                    this.susdWaitingPeriod = +(decoded[decoded.length-1] != 0)
                    endOffset = 2
                }
                helpers.chunkArr(decoded.slice(0, decoded.length-endOffset), 2).map((v, i) => {
                    Vue.set(this.wallet_balances, i+1, v[0])
                    if(!currentContract.default_account) Vue.set(this.wallet_balances, i+1, 0)
                    Vue.set(this.balances, i+1, +v[1])
                })
			},
			async handle_sync_balances_proportion() {
				await this.handle_sync_balances();
				//for(let i = 0; i < currentContract.N_COINS; i++) this.change_currency(i)
			},
			deposit_stake() {
				this.show_loading = true;
				this.handle_add_liquidity(true)
			},
            setLoadingAction(val) {
                this.loadingAction = val
                setTimeout(() => this.loadingAction = false, 500)
            },
            async stakeTokens(tokens, deposit_and_stake = false) {
                if(this.loadingAction == 3) return;
                this.setLoadingAction(3);
                if(!tokens) tokens = BN(await currentContract.swap_token.methods.balanceOf(currentContract.default_account).call());
                this.waitingMessage = `Please approve staking ${this.toFixed(tokens.div(BN(1e18)))} of your sCurve tokens`
                let curveRewards = new contract.web3.eth.Contract(allabis.sbtc.sCurveRewards_abi, allabis.sbtc.sCurveRewards_address)

                var { dismiss } = notifyNotification(this.waitingMessage)
                await common.ensure_stake_allowance(tokens, curveRewards, this.inf_approval);
                dismiss()
                this.waitingMessage = `Please confirm stake transaction ${deposit_and_stake ? '(2/2)' : ''}`
                var { dismiss } = notifyNotification(this.waitingMessage)
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
                this.estimateGas = 200000
                try {
                    await curveRewards.methods.stake(tokens.toFixed(0,1)).send({
                        from: currentContract.default_account,
                        gasPrice: this.gasPriceWei,
                        gas: 400000,
                    })
                    .once('transactionHash', hash => {
                        this.waitingMessage = `Waiting for stake transaction to confirm 
                            ${deposit_and_stake ? '(2/2)' : ''}: no further action needed`
                        dismiss()
                        notifyHandler(hash)
                    })
                    currentContract.totalShare -= tokens
                    common.update_fee_info()
                }
                catch(err) {
                    console.error(err)
                    dismiss()
                    errorStore.handleError(err)
                }
                this.waitingMessage = ''
                this.show_loading = false;
            },
			async handle_add_liquidity(stake = false) {
                let actionType = stake == false ? 1 : 2;
                if(this.loadingAction == actionType) return;
                this.setLoadingAction(actionType)
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
				//this.show_loading = true
				let calls = this.coins.slice(1).map((coin, i) => {
                            if(this.currentPool == 'sbtc' && i == 1)
                                return [coin._address, coin.methods.transferableSynths(currentContract.default_account).encodeABI()]
				            return [coin._address, coin.methods.balanceOf(currentContract.default_account).encodeABI()]
                        }
                    )
				calls.push([currentContract.swap_token._address, currentContract.swap_token.methods.totalSupply().encodeABI()])
                let endOffset = 1
                if(this.currentPool == 'sbtc') {
                    calls.push([
                        currentContract.snxExchanger._address, 
                            currentContract.snxExchanger.methods
                            .maxSecsLeftInWaitingPeriod(currentContract.default_account, "0x7355534400000000000000000000000000000000000000000000000000000000")
                            .encodeABI()
                        ]
                    )
                    endOffset = 2
                }
                if(currentContract.currentContract == 'ren') this.amounts = this.amounts.slice(0,2)
 				let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
				let decoded = aggcalls[1].map(hex=>currentContract.web3.eth.abi.decodeParameter('uint256',hex))
                decoded.slice(0, decoded.length-endOffset).forEach((balance, i) => {
                    balance = BN(balance)
                    if(this.currentPool == 'sbtc' && i+1 == 2 && decoded[decoded.length-1] != 0) bal = BN(0)
                    let precisions = allabis[currentContract.currentContract].coin_precisions[i+1]
                    let maxDiff = (BN(balance).div(precisions)).minus(this.inputs[i+1])
                    if(balance.gt(0) && maxDiff.lt(0) && BN(maxDiff).lt(BN(this.minAmount))) {
                        Vue.set(this.amounts, i+1, BN(balance).toFixed(0,1))
                    }
                    else Vue.set(this.amounts, i+1, BN(this.inputs[i+1]).times(precisions).toFixed(0,1))
                })
                Vue.set(this.amounts, 0, BN(this.amountAfterBTC).times(1e8).toFixed(0,1))
                if(+this.inputs[0] == 0) Vue.set(this.amounts, 0, 0)
				let total_supply = +decoded[decoded.length-endOffset];
				// /this.waitingMessage = 'Please approve spending your coins'
                var token_amount = 0;
                if(total_supply > 0) {
                    let token_amounts = this.amounts
                    token_amount = await currentContract.swap.methods.calc_token_amount(token_amounts, true).call();
                    token_amount = BN(token_amount).times(BN(1).minus(BN(this.calcFee)))
                    token_amount = BN(token_amount).times(0.99).toFixed(0,1);
                }
				this.estimateGas = contractGas.deposit[this.currentPool] / 2
		      
                if(+this.inputs[0] > 0) {
                    for(let i = 1; i < currentContract.N_COINS; i++) {
                        await common.approveAmount(this.coins[i], BN(this.amounts[i]), currentContract.default_account, allabis[currentContract.currentContract].adapterBiconomyAddress, this.inf_approval)
                    }
                }
                else {
                    if (this.inf_approval)
                        await common.ensure_allowance(this.amounts, false, undefined, undefined, true)
                    else {
                        await common.ensure_allowance(this.amounts, false);
                    }
                }
	
			    let receipt;
			    let minted = 0;
                //this.waitingMessage = 'Please confirm deposit transaction'
                //deposit ERC20s only
                if(+this.inputs[0] == 0) {
                    this.waitingMessage = 'Please confirm deposit transaction'
                    var { dismiss } = notifyNotification(this.waitingMessage)
                    await helpers.setTimeoutPromise(100)
                    let add_liquidity = currentContract.swap.methods.add_liquidity(this.amounts, token_amount).send({
                        from: currentContract.default_account,
                        gasPrice: this.gasPriceWei,
                        gas: contractGas.deposit[this.currentPool],
                    }).once('transactionHash', hash => {
                        dismiss()
                        notifyHandler(hash)
                        this.waitingMessage = 
                        `Waiting for deposit 
                            <a href='http://etherscan.io/tx/${hash}'>transaction</a> 
                            to confirm ${stake ? 'before staking' : 'no further action required'}`
                    })
                    try {
                        receipt = await add_liquidity
                    }
                    catch(err) {
                        console.error(err)
                        dismiss()
                        errorStore.handleError(err)
                        if(err.code == -32603) {
                            await common.setTimeout(300)
                            receipt = await add_liquidity
                        }
                    }
                    this.waitingMessage = ''
                    if(!stake ) this.show_loading = false
                    if(stake) {
                        try {
                            minted = BN(
                                Object.values(receipt.events).filter(event => {
                                    return (event.address.toLowerCase() == allabis.sbtc.token_address.toLowerCase())
                                            && event.raw.topics[1] == "0x0000000000000000000000000000000000000000000000000000000000000000" 
                                            && event.raw.topics[2].toLowerCase() == '0x000000000000000000000000' + currentContract.default_account.slice(2).toLowerCase()
                                })[0].raw.data)
                            await helpers.setTimeoutPromise(100)
                            await this.stakeTokens(minted, true)
                        }
                        catch(err) {
                            try {
                                minted = BN(
                                    Object.values(receipt.logs).filter(event => {
                                        return (event.address.toLowerCase() == allabis.sbtc.token_address.toLowerCase())
                                                && event.topics[1] == "0x0000000000000000000000000000000000000000000000000000000000000000" 
                                                && event.topics[2].toLowerCase() == '0x000000000000000000000000' + currentContract.default_account.slice(2).toLowerCase()
                                    })[0].data)
                                await helpers.setTimeoutPromise(100)
                                await this.stakeTokens(minted, true)
                            }
                            catch(err) {
                                console.error(err)
                                this.errorStaking = true;
                            }
                        }
                    }
                }
                else {
    		    	let add_liquidity = store.deposit({ btcAmount: this.inputs[0], amounts: this.amounts, min_amount: token_amount, gasPrice: this.gasPriceWei, stake: stake, })
                    if(document.querySelector('.showdesktoptransactions').offsetParent !== null) {
                        let el = document.querySelector('tbody tr td:first-child')
                        !helpers.isElementInViewport(el) && el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                    }
                    else {
                        let el = document.querySelector('.transactionmobile')
                        !helpers.isElementInViewport(el) && el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                    }
    			    try {
    			    	receipt = await add_liquidity
    			    }
    			    catch(err) {
    			    	if(err.code == -32603) {
    			    		await common.setTimeout(300)
    			    		receipt = await add_liquidity
    			    	}
    			    }
                }
				this.waitingMessage = ''
				this.estimateGas = 0 
				this.gasPrice = 0
                this.justDeposit = false

			    await this.handle_sync_balances();
			    common.update_fee_info();
			},
			highlightInputs(i) {
                if(i == 0) {
                    if(this.amountAfterBTC < 0) Vue.set(this.bgColors, i, 'red')
                    else Vue.set(this.bgColors, i, 'blue')
                    return;
                }
				let value = this.inputs[i]
                let balance = this.wallet_balances[i]
                if(this.currentPool == 'sbtc' && i == 2) balance = this.transferableBalance
				if (value > balance * this.rates[i])
	                Vue.set(this.bgColors, i, 'red');
	            else
	                Vue.set(this.bgColors, i, 'blue');
			},
			async change_currency(i, setInputs = true, event) {
				if(event) {
					this.inputs[i] = event.target.value
				}
	            await this.calcSlippage()
	            var value = this.inputs[i]
	            this.highlightInputs(i)
	        },
        }
    }

</script>

<style>
	#add-liquidity {
		margin-right: 1em;
	}
	#mintr {
        margin-top: 1em;
		margin-left: 1em;
		text-align: center;
	}
 	#stakeunstaked {
 		margin-left: 1em;
    }
    .pulse {
        background: red;
        animation: pulse 1s 3;
        margin: 0;
        margin-bottom: 8px;
    }
    .maxBalanceCoin {
        cursor: pointer;
    }
    .maxBalanceCoin:hover {
        text-decoration: underline;
    }
    .maxBalanceCoin > span {
        font-size: 0.7em;
    }
    .pulse p {
        margin-bottom: 0;
    }
    .currency_label {
        display: block;
        margin-bottom: 0.3em;
    }
    .currency_label .token-icon {
        margin-right: 0.6em;
    }
    #inf_approval_wrapper {
        margin-top: 1em;
    }
</style>
