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
                                    :class="{'token-icon': true, [currency+'-icon']: true, 'y': depositc && !isPlain}" 
                                    :src='getTokenIcon(currency)'>
                                <span v-show='depositc'>{{currencies[currency]}}
    	                        	<span v-show="!(currency == 'usdt' && currentPool == 'usdt' || currency == 'pax') 
    	                        					&& !['susdv2', 'tbtc', 'ren', 'sbtc'].includes(currentPool)"> 
    	                        		(in {{currency | capitalize}}) 
    	                        	</span>
    	                        </span>
    	                        <span v-show='!depositc'>{{currency | capitalize}}
    	                        </span>
                                <span @click='setMaxBalanceCoin(i)' class='maxBalanceCoin'>
                                    Max: 
                                    <span 
                                        v-show="(currentPool == 'susdv2' && i == 3 || currentPool == 'sbtc' && i == 2)
                                                    && maxBalanceCoin(i) != '0.00'"
                                    >
                                        {{transferableBalanceText}}/
                                    </span>
                                    <span>{{ maxBalanceCoin(i) }} </span>
                                    <span v-show="susdWaitingPeriod">
                                        <span class='tooltip'>
                                            <img src='@/assets/clock-regular.svg' class='icon small'>
                                            <span class='tooltiptext normalFont'>
                                                Cannot transfer during waiting period. {{ (susdWaitingPeriodTime ).toFixed(0) }} secs left.
                                            </span>
                                        </span>
                                    </span>
                                    <span v-show="(currentPool == 'susdv2' && i == 3 || currentPool == 'sbtc' && i == 2)
                                                    && maxBalanceCoin(i) != '0.00'" 
                                        class='tooltip'> [?]
                                        <span class='tooltiptext long normalFont'>
                                            Max transferrable amount is {{ transferableBalanceText }}. You can free the remaining balance by settling.
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

                    </li>
                </ul>
            </fieldset>
            <ul>
                <gas-price></gas-price>

                <li>
                    <input id="sync-balances" type="checkbox" name="sync-balances" @change='handle_sync_balances_proportion' :disabled='disabledButtons' checked v-model='sync_balances'>
                    <label for="sync-balances">Add all coins in a balanced proportion</label>
                </li>
                <li>
                    <input id="max-balances" type="checkbox" name="max-balances" @change='handle_sync_balances' :disabled='disabledButtons' checked v-model='max_balances'>
                    <label for="max-balances">Use maximum amount of coins available</label>
                </li>
                <li>
                    <input id="inf-approval" type="checkbox" name="inf-approval" checked v-model='inf_approval'>
                    <label for="inf-approval">Infinite approval - trust this contract forever 
                    	<span class='tooltip'>[?]
                    		<span class='tooltiptext long'>
                    			Preapprove the contract to to be able to spend any amount of your coins. You will not need to approve again.
                    		</span>
                    	</span>
                    </label>
                </li>
                <li v-show = "!['susd','susdv2','tbtc','ren','sbtc'].includes(currentPool)">
                    <input id="depositc" type="checkbox" name="depositc" checked v-model='depositc'>
                    <label for="depositc">Deposit wrapped</label>
                </li>
            </ul>
            <div class='simple-error pulse' v-show="susdWaitingPeriod">
                Cannot transfer {{ currentPool == 'susdv2' ? 'sUSD' : 'sBTC' }} during waiting period. {{ (susdWaitingPeriodTime).toFixed(0) }} secs left.
            </div>
            <p style="text-align: center" class='buttons'>
                <button id="add-liquidity" 
                    :disabled="currentPool == 'susdv2' && slippage < -0.03 || depositingZeroWarning || isZeroSlippage"
                    @click='justDeposit = true; handle_add_liquidity()' 
                    >
                        Deposit <span class='loading line' v-show='loadingAction == 1'></span>
                </button>
                <button 
                    id='add-liquidity-stake' 
                    v-show="['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool) && hasRewards" 
                    :disabled = 'slippage < -0.03 || depositingZeroWarning || isZeroSlippage'
                    @click = 'justDeposit = false; deposit_stake()'>
                    Deposit and stake <span class='loading line' v-show='loadingAction == 2'></span>
                </button>
                <button id='stakeunstaked' 
                    v-show="totalShare > 0 && ['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool) && hasRewards"
                    :disabled='stakePercentageInvalid' 
                    @click='stakeTokens()'
                    >
                    Stake unstaked <span class='loading line' v-show='loadingAction == 3'></span>
                </button>
                <p class='info-message gentle-message' v-show="lpCrvReceived > 0">
                    You'll receive minimum {{ lpCrvReceivedText }} Curve {{currentPool}} LP tokens <sub>{{ ((1 - getMaxSlippage) * 100).toFixed(2)}}% max slippage</sub>
                    
                    <span class='curvelpusd'> 
                        1 Curve {{currentPool}} LP token = {{ (1 * virtual_price).toFixed(6) }} 
                        {{ !['ren', 'sbtc'].includes(currentPool) ? 'USD' : 'BTC' }} 
                    </span>
                </p>
                <div>
                    <button class='simplebutton advancedoptions' @click='showadvancedoptions = !showadvancedoptions'>
                        Advanced options
                        <span v-show='!showadvancedoptions'>▼</span>
                        <span v-show='showadvancedoptions'>▲</span>
                    </button>
                    <div v-show='showadvancedoptions'>
                        <fieldset>
                            <legend>Advanced options:</legend>
                            <div v-show="hasRewards && totalShare > 0 && ['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool)">
                                <label for='stakepercentage'>Stake %</label>
                                <input id='stakepercentage' v-model='stakepercentage' :class="{'invalid': stakePercentageInvalid}">
                                <button id='stakeunstaked' 
                                    v-show="totalShare > 0 && ['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool)"
                                    :disabled='stakePercentageInvalid' 
                                    @click='stakeTokens()'
                                >
                                    Stake unstaked <span class='loading line' v-show='loadingAction == 3'></span>
                                </button>
                            </div>

                            <div id='max_slippage'>
                                <span class='tooltip'>
                                    Max slippage:
                                    <span class='tooltiptext long'>
                                        Customize the maximum slippage you can get when depositing
                                    </span>
                                </span>
                                <input id="slippage01" type="radio" name="slippage" value='0.1' v-model='maxSlippage'>
                                <label for="slippage01">0.1%</label>

                                <input id="slippage1" type="radio" name="slippage" checked value='1' v-model='maxSlippage'>
                                <label for="slippage1">1%</label>

                                <input id="custom_slippage" type="radio" name="slippage" value='-' @click='customippageDisabled = false'>
                                <label for="custom_slippage" @click='customSlippageDisabled = false'>
                                    <input type="text" id="custom_slippage_input" :disabled='customSlippageDisabled' :class="{'invalid': warningInputSlippage}" name="custom_slippage_input" v-model='maxInputSlippage'> %
                                </label>

                                <div class='simple-error' v-show='warningInputSlippage'>
                                    {{ maxInputSlippage }}% is too low of a slippage - your transaction may fail 
                                </div>
                            </div>
                        </fieldset>

                    </div>

                </div>
                <p class='trade-buttons' v-show="['ren', 'sbtc'].includes(currentPool)">
                    <a href='https://bridge.renproject.io/'>Mint/redeem renBTC</a>
                </p>
                <div id='mintr' v-show="['susdv2', 'sbtc'].includes(currentPool)">
                    <a href = 'https://mintr.synthetix.io/' target='_blank' rel="noopener noreferrer">Manage staking in Mintr</a>
                </div>
                <div id='mintr' v-show="['y', 'iearn'].includes(currentPool)">
                    <a href = 'https://ygov.finance/' target='_blank' rel="noopener noreferrer">Manage staking in yGov</a>
                </div>
                <button id="migrate-new" @click='handle_migrate_new' v-show="currentPool == 'compound' && oldBalance > 0">Migrate from old</button>
                <div class='info-message gentle-message' v-show='show_loading'>
                    <span v-html='waitingMessage'></span> <span class='loading line'></span>
                </div>
                <div class='info-message gentle-message' v-show='estimateGas'>
                    Estimated tx cost: {{ (estimateGas * gasPrice / 1e9 * ethPrice).toFixed(2) }}$
                </div>
                <!-- <div class='simple-error' v-show="justDeposit && ['susdv2','sbtc','y','iearn'].includes(currentPool)">
                    Your tokens are being deposited into the {{ ['y', 'iearn'].includes(currentPool) ? 'y' : 'susd'}} pool without staking.
                    You can do that manually later on here or on 
                    <a href = 'https://mintr.synthetix.io/' v-show="['susdv2', 'sbtc'].includes(currentPool)" target='_blank' rel="noopener noreferrer"> Mintr. </a> 
                    <a href = 'https://ygov.finance/' v-show="['y', 'iearn'].includes(currentPool)" target='_blank' rel="noopener noreferrer"> yGov. </a> 
                </div> -->
                <div class='simple-error' v-show='errorStaking'>
                    There was an error in staking your tokens. You can manually stake them on 
                    <a href = 'https://mintr.synthetix.io/' v-show="['susdv2', 'sbtc'].includes(currentPool)" target='_blank' rel="noopener noreferrer"> Mintr. </a>
                    <a href = 'https://ygov.finance/' v-show="['y', 'iearn'].includes(currentPool)" target='_blank' rel="noopener noreferrer"> yGov. </a>
                </div>
                <div class='simple-error pulse' v-show='compareInputsWarning.length && !max_balances'>
                    Not enough balance for currencies {{ compareInputsWarning.toString() }}
                    <p v-show='compareInputsWarning.length == N_COINS - 1'> 
                        Maybe you forgot to uncheck the first 
                        "Add all coins in a balanced proportion" checkbox?
                    </p>
                </div>
                <div class='simple-error pulse' v-show='depositingZeroWarning && !max_balances'>
                    You're depositing 0 coins.
                    <p>
                        Maybe you forgot to uncheck the first 
                        "Add all coins in a balanced proportion" checkbox?
                    </p>
                </div>
                <Slippage/>
            </p>
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

    import * as gasPriceStore from '../common/gasPriceStore'
    import GasPrice from '../common/GasPrice.vue'

    import * as errorStore from '../common/errorStore'

    import BN from 'bignumber.js'

    import Slippage from '../common/Slippage.vue'

    export default {
    	components: {
    		Slippage, GasPrice,
    	},
    	data: () => ({
    		disabled: true,
    		disabledButtons: true,
    		sync_balances: false,
    		max_balances: true,
    		inf_approval: true,
    		wallet_balances: [],
            transferableBalance: null,
            susdWaitingPeriod: false,
            susdWaitingPeriodTime: 0,
    		balances: [],
    		inputs: [],
    		amounts: [],
    		bgColors: [],
    		depositc: false,
    		coins: [],
    		rates: [],
    		swap_address: currentContract.swap_address,
            lpCrvReceived: null,
    		show_loading: false,
    		waitingMessage: '',
    		estimateGas: 0,
    		ethPrice: 0,
            justDeposit: false,
            stakepercentage: 100,
            get showadvancedoptions() {
                return localStorage.getItem('advancedoptions') === 'true' 
            },
            set showadvancedoptions(val) {
                localStorage.setItem('advancedoptions', val)
            },
            maxSlippage: 1,
            maxInputSlippage: '',
            customSlippageDisabled: true,
            loadingAction: false,
            errorStaking: false,
    		slippagePromise: helpers.makeCancelable(Promise.resolve()),

            hasRewards: true,
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
        	async depositc(val, oldval) {
        		this.changeSwapInfo(val)
        		await this.handle_sync_balances()
        		!this.max_balances && this.highlightAllInputs();
        		//await Promise.all([...Array(currentContract.N_COINS).keys()].map(i=>this.change_currency(i, false)))
        		await this.calcSlippage()
        	},
            getMaxSlippage() {
                this.getLPCrvReceived()
            },
        },
        computed: {
          ...getters,
          minAmount() {
          	if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) return 1e-8
          	return 0.01
          },
          calcFee() {
            let N_COINS = allabis[currentContract.currentContract].N_COINS
            return this.fee / 100 * N_COINS / (4 * (N_COINS -1))
          },
          compareInputsWarning() {
            let currencies = []
            for(let [i, currency] of Object.keys(this.currencies).entries()) {
                let balance = this.wallet_balances[i]
                if(this.currentPool == 'susdv2' && i == 3) {
                    balance = this.susdWaitingPeriod ? 0 : this.transferableBalance
                }
                let diff3 = BN(BN(balance).times(this.rates[i])).minus(this.inputs[i])
                if(diff3.lt(BN(-0.01))) currencies.push(this.depositc ? this.currencies[currency] : currency.toUpperCase())
            }
            return currencies
          },
          depositingZeroWarning() {
            return this.inputs.filter(v=>+v==0).length == this.N_COINS && !this.disabledButtons
          },
          isPlain() {
            return ['susdv2', 'tbtc', 'ren', 'sbtc'].includes(this.currentPool)
          },
          transferableBalanceText() {
            return this.toFixed((this.transferableBalance / 1e18))
          },
          virtual_price() {
            return currentContract.virtual_price
          },
          lpCrvReceivedText() {
            return this.toFixed(this.lpCrvReceived)
          },
          gasPrice() {
            return gasPriceStore.state.gasPrice
          },
          gasPriceWei() {
            return gasPriceStore.state.gasPriceWei
          },
          stakePercentageInvalid() {
            return this.stakepercentage < 0 || this.stakepercentage > 100
          },
          getMaxSlippage() {
            let maxSlippage = +this.maxSlippage;
            if(this.maxInputSlippage) maxSlippage = +this.maxInputSlippage;
            return (100 - maxSlippage)/100
          },
          warningInputSlippage() {
            if(!this.maxInputSlippage) return false
            return +this.maxInputSlippage < 0.5
          },
          isZeroSlippage() {
            return this.maxInputSlippage !== '' && (+this.maxInputSlippage == 0 || isNaN(this.maxInputSlippage))
          },
        },
        mounted() {
	        this.setInputStyles(true)
            if(currentContract.initializedContracts) this.mounted();
        },
        methods: {
        	async stakeTokens(tokens, deposit_and_stake = false) {
                if(this.loadingAction == 3) return;
                this.setLoadingAction(3);
                if(!tokens) {
                    tokens = BN(await currentContract.swap_token.methods.balanceOf(currentContract.default_account).call());
                    tokens = BN(this.stakepercentage / 100).times(tokens)
                }
                this.waitingMessage = `Please approve staking ${this.toFixed(tokens.div(BN(1e18)))} of your sCurve tokens`
                var { dismiss } = notifyNotification(this.waitingMessage)
                await common.ensure_stake_allowance(tokens, currentContract.curveRewards, this.inf_approval);
                dismiss()
                this.waitingMessage = `Please confirm stake transaction ${deposit_and_stake ? '(2/2)' : ''}`
                var { dismiss } = notifyNotification(this.waitingMessage)
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
                this.estimateGas = 200000
                try {
                    await currentContract.curveRewards.methods.stake(tokens.toFixed(0,1)).send({
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

            async mounted(oldContract) {

            	if(['susd', 'susdv2', 'tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) this.depositc = true;
                else this.depositc = false;
            	this.changeSwapInfo(this.depositc)
            	currentContract.showSlippage = false;
        		currentContract.slippage = 0;
                await this.handle_sync_balances();
                await this.getLPCrvReceived()
                await this.calcSlippage()
                let calls = [...Array(currentContract.N_COINS).keys()].map(i=>[this.coins[i]._address, 
                	this.coins[i].methods.allowance(currentContract.default_account || '0x0000000000000000000000000000000000000000', this.swap_address).encodeABI()])
                if(['susdv2', 'sbtc', 'y', 'iearn'].includes(this.currentPool))
                    calls.push([currentContract.curveRewards._address, currentContract.curveRewards.methods.periodFinish().encodeABI()])
                let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
                let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
                if(decoded.slice(0,decoded.length-1).some(v=>BN(v).lte(currentContract.max_allowance.div(BN(2))) > 0))
                	this.inf_approval = false
                let now = Date.now() / 1000
                if(['susdv2', 'sbtc', 'y', 'iearn'].includes(this.currentPool) && +decoded[decoded.length-1] < now)
                    this.hasRewards = false

                this.disabledButtons = false;
            },
            getTokenIcon(token) {
                return helpers.getTokenIcon(token, this.depositc, this.currentPool)
            },
            toFixed(num, precisions = 2, round = 4) {
                if(+num == 0 && ['ren', 'sbtc'].includes(currentContract.currentContract)) return '0.00'
                if(precisions == 2 && ['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) precisions = 8
                let rounded = (+num).toFixed(precisions)
                return isNaN(rounded) ? '0.00' : rounded
            },
            maxBalanceCoin(i) {
                return this.toFixed(this.wallet_balances[i] * this.rates[i])
            },
            setMaxBalanceCoin(i) {
                Vue.set(this.inputs, i, this.maxBalanceCoin(i))
                if(this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2) {
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
            changeSwapInfo(val) {
            	if(val) {
                    this.coins = currentContract.coins
                    if(this.currentPool == 'susdv2') Vue.set(this.coins, 3, currentContract.underlying_coins[3])
                    if(this.currentPool == 'sbtc') Vue.set(this.coins, 2, currentContract.underlying_coins[2])
	            	this.rates = currentContract.c_rates
	            	this.swap_address = currentContract.swap_address
        		}
            	else {
            		this.coins = currentContract.underlying_coins
            		this.rates = currentContract.coin_precisions.map(cp=>1/cp)
            		this.swap_address = currentContract.deposit_zap._address
            	}
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
	            	this.slippagePromise.cancel();
	        		this.slippagePromise = helpers.makeCancelable(common.calc_slippage(this.inputs, true))
	        		await this.slippagePromise;
            	}
            	catch(err) {
            		console.error(err)
            	}
            },
            async handle_sync_balances() {
			    await common.update_fee_info();
			    let calls = []
			    for (let i = 0; i < currentContract.N_COINS; i++) {
			    	calls.push([this.coins[i]._address, this.coins[i].methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
			    	calls.push([currentContract.swap._address, currentContract.swap.methods.balances(i).encodeABI()])
			    }
                if(this.currentPool == 'susdv2' || this.currentPool == 'sbtc') {
                    let idx = this.currentPool == 'susdv2' ? 3 : 2
                    let currencyKey = '0x7355534400000000000000000000000000000000000000000000000000000000'
                    if(this.currentPool == 'sbtc') 
                        currencyKey = '0x7342544300000000000000000000000000000000000000000000000000000000'
                    calls.push([this.coins[idx]._address, this.coins[idx].methods.transferableSynths(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
                    calls.push([currentContract.snxExchanger._address, 
                        currentContract.snxExchanger.methods
                        .maxSecsLeftInWaitingPeriod(currentContract.default_account, currencyKey)
                        .encodeABI()])
                }
			    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
			    let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
                let balances = decoded
                if(this.currentPool == 'susdv2' || this.currentPool == 'sbtc') balances = decoded.slice(0, -2)
			    helpers.chunkArr(balances, 2).map((v, i) => {
			    	Vue.set(this.wallet_balances, i, v[0])
			    	if(!currentContract.default_account) Vue.set(this.wallet_balances, i, 0)
			    	Vue.set(this.balances, i, +v[1])
			    })
                if(this.currentPool == 'susdv2' || this.currentPool == 'sbtc') {
                    this.transferableBalance = decoded[decoded.length - 2]
                    this.susdWaitingPeriod = (+decoded[decoded.length - 1] != 0)
                    this.susdWaitingPeriodTime = +decoded[decoded.length - 1]
                }
			    if (this.max_balances) {
			        this.disabled = true;
			        for (let i = 0; i < currentContract.N_COINS; i++) {
			        	let amount = this.wallet_balances[i] * currentContract.c_rates[i]
			        	if(!this.depositc) amount = this.wallet_balances[i] / allabis[currentContract.currentContract].coin_precisions[i]
			            var val = amount
			            var val = this.toFixed(amount);
			            if(val == 0) val = '0.00'
			            Vue.set(this.inputs, i, this.toFixed(val))
                        if(this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2) {
                            let precisions = 2
                            if(this.currentPool == 'sbtc' && i == 2) precisions = 18
                            let maxbalance_susd = this.susdWaitingPeriod ? 0 : this.transferableBalance
                            Vue.set(this.inputs, i, this.toFixed(BN(this.transferableBalance).div(1e18)))
                        }
			        }
			    }
			    else
			        this.disabled = false;
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
			async handle_add_liquidity(stake = false) {
                let actionType = stake == false ? 1 : 2;
                if(this.loadingAction == actionType) return;
                this.setLoadingAction(actionType)
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
                
				this.show_loading = true
                let calls = [...Array(currentContract.N_COINS).keys()].map(i=> {
                          if(this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2)
                            return [this.coins[i]._address, this.coins[i].methods.transferableSynths(currentContract.default_account).encodeABI()]
                          return [this.coins[i]._address, this.coins[i].methods.balanceOf(currentContract.default_account).encodeABI()]
                        }
                    )
                let endOffset = 1
                calls.push([currentContract.swap_token._address, currentContract.swap_token.methods.totalSupply().encodeABI()])
                if(['susdv2', 'sbtc'].includes(this.currentPool)) {
                    let currencyKey = '0x7355534400000000000000000000000000000000000000000000000000000000'
                    if(this.currentPool == 'sbtc') 
                        currencyKey = '0x7342544300000000000000000000000000000000000000000000000000000000'
                    calls.push([
                            currentContract.snxExchanger._address, 
                            currentContract.snxExchanger.methods
                            .maxSecsLeftInWaitingPeriod(currentContract.default_account, currencyKey)
                            .encodeABI()
                        ])
                    endOffset = 2
                }
                let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
                let decoded = aggcalls[1].map(hex=>currentContract.web3.eth.abi.decodeParameter('uint256',hex))
                decoded.slice(0, decoded.length-endOffset).forEach((balance, i) => {
                    let abi = allabis[currentContract.currentContract]
                    let precisions = this.depositc ? abi.wrapped_precisions[i] : abi.coin_precisions[i]
                    let bal = BN(balance)
                    if(this.depositc) bal = BN(bal).times(currentContract.c_rates[i])
                    else bal = BN(bal).div(precisions)
                    if((this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2)
                        && +decoded[decoded.length - 1] != 0) bal = BN(0)
                    let maxDiff = BN(bal).minus(BN(this.inputs[i]))
                    if(!this.inputs[i]) {
                        return Vue.set(this.amounts, i, 0)
                    }
                    if(BN(bal).gt(0) && maxDiff.lt(0) && BN(maxDiff).lt(BN(this.minAmount))) {
                        if(!this.depositc) balance = BN(balance).div(precisions).div(currentContract.c_rates[i])
                        Vue.set(this.amounts, i, BN(balance).toFixed(0,1))
                    }
                    else {
                        Vue.set(this.amounts, i, BN(this.inputs[i]).div(currentContract.c_rates[i]).toFixed(0,1))
                    }
                })
                this.amounts = this.amounts.map(v => v || 0)
				let total_supply = +decoded[decoded.length-endOffset];
				this.waitingMessage = 'Please approve spending your coins'
			    let nonZeroInputs = this.inputs.filter(Number).length
                let amounts = this.inputs.map((v, i)=>{
                    if(!v) return 0
                    let abi = allabis[currentContract.currentContract]
                    let maxDiff = (BN(this.wallet_balances[i]).div(abi.coin_precisions[i])).minus(v)
                    let balance = this.wallet_balances[i]
                    if(this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2) balance = this.transferableBalance
                    if((this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2)
                        && +decoded[decoded.length - 1] != 0) balance = 0
                    if(BN(balance).gt(0) && maxDiff.lt(0) && maxDiff.lt(BN(this.minAmount))) return BN(balance).toFixed(0, 1)
                    return BN(v).times(currentContract.coin_precisions[i]).toFixed(0, 1)
                })
                var token_amount = 0;
                if(total_supply > 0) {
                    let token_amounts = this.amounts
                    token_amount = await currentContract.swap.methods.calc_token_amount(token_amounts, true).call();
                    token_amount = BN(token_amount).times(BN(1).minus(BN(this.calcFee)))
                    token_amount = BN(token_amount).times(BN(this.getMaxSlippage)).toFixed(0,1);
                }
				if(this.depositc)
					this.estimateGas = contractGas.deposit[this.currentPool] / 2
				else
					this.estimateGas = (contractGas.depositzap[this.currentPool].deposit(nonZeroInputs) | 0) / 1.5
			    if (this.inf_approval)
			        await common.ensure_allowance(this.amounts, !this.depositc, undefined, undefined, true)
			    else if(this.depositc) {
			        await common.ensure_allowance(this.amounts, false);
			    }
			    else {
			    	await common.ensure_allowance(amounts, true)
			    }
			    let receipt;
			    let minted = 0;
			    if(this.depositc) {
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
				}
				else {
			    	let gas = contractGas.depositzap[this.currentPool].deposit(nonZeroInputs) | 0
			    	console.warn(this.inputs, 'inputs', amounts, 'uamounts', 
			    		this.amounts, 'amounts', currentContract.swap._address, 'swap address', currentContract.coin_precisions, 'coin precisions', 
			    		currentContract.c_rates, 'c rates',
			    		currentContract.coins.map(c=>c._address), 'coins', currentContract.underlying_coins.map(uc=>uc._address), 'underlying_coins',
			    		currentContract.virtual_price, 'virtual_price', token_amount, 'token_amount', Date.now())
                    this.waitingMessage = 'Please confirm deposit transaction'
                    await helpers.setTimeoutPromise(100)
					let add_liquidity = currentContract.deposit_zap.methods.add_liquidity(amounts, token_amount).send({
						from: currentContract.default_account,
                        gasPrice: this.gasPriceWei,
						gas: gas,
					})
					.once('transactionHash', hash => {
                        notifyHandler(hash)
						this.waitingMessage = `Waiting for deposit 
                            <a href='http://etherscan.io/tx/${hash}'>transaction</a>
                            to confirm ${stake ? 'before staking (1/2)' : 'no further action required'}`
						console.warn(hash, 'tx hash')
					})
					try {
				    	receipt = await add_liquidity
				    }
				    catch(err) {
                        console.error(err)
                        errorStore.handleError(err)
				    	if(err.code == -32603) {
				    		await common.setTimeout(300)
				    		receipt = await add_liquidity
				    	}
				    }
				}
				this.waitingMessage = ''
				if(!stake ) this.show_loading = false
				if(stake && ['susdv2', 'sbtc', 'y', 'iearn'].includes(this.currentPool)) {
                    console.warn(receipt.events)
                    try {
    					minted = BN(
    						Object.values(receipt.events).filter(event => {
    							return (event.address.toLowerCase() == allabis.susdv2.token_address.toLowerCase()
                                            || event.address.toLowerCase() == allabis.sbtc.token_address.toLowerCase()
                                            || event.address.toLowerCase() == allabis.iearn.token_address.toLowerCase()
                                        )
    									&& event.raw.topics[1] == "0x0000000000000000000000000000000000000000000000000000000000000000" 
    									&& (
                                            event.raw.topics[2].toLowerCase() == '0x000000000000000000000000' + currentContract.default_account.slice(2).toLowerCase()
                                            || event.raw.topics[2].toLowerCase() == '0x000000000000000000000000' + allabis.iearn.deposit_address.slice(2).toLowerCase()
                                            )
    						})[0].raw.data)
                        await helpers.setTimeoutPromise(100)
    					await this.stakeTokens(minted, true)
                    }
                    catch(err) {
                        try {
                            minted = BN(
                                Object.values(receipt.logs).filter(event => {
                                    return (event.address.toLowerCase() == allabis.susdv2.token_address.toLowerCase()
                                                || event.address.toLowerCase() == allabis.sbtc.token_address.toLowerCase()
                                                || event.address.toLowerCase() == allabis.iearn.token_address.toLowerCase()
                                            )
                                            && event.topics[1] == "0x0000000000000000000000000000000000000000000000000000000000000000" 
                                            && (
                                                event.topics[2].toLowerCase() == '0x000000000000000000000000' + currentContract.default_account.slice(2).toLowerCase()
                                                || event.raw.topics[2].toLowerCase() == '0x000000000000000000000000' + allabis.iearn.deposit_address.slice(2).toLowerCase()
                                                )
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
				this.estimateGas = 0 
                this.justDeposit = false

			    await this.handle_sync_balances();
			    common.update_fee_info();
			},
			highlightAllInputs() {
				for(let i = 0; i < currentContract.N_COINS; i++) this.highlightInputs(i)
			},
			highlightInputs(i) {
				let value = this.inputs[i]
                let balance = this.wallet_balances[i]
                if(this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2) balance = this.transferableBalance
				if (value > balance * this.rates[i])
	                Vue.set(this.bgColors, i, 'red');
	            else
	                Vue.set(this.bgColors, i, 'blue');
			},
            async getLPCrvReceived() {
                let inputs = this.inputs.map(v => v || 0)
                this.lpCrvReceived = (await currentContract.swap.methods
                    .calc_token_amount(inputs.map((v, i) => BN(v).div(currentContract.c_rates[i]).toFixed(0,1)), true).call() / 1e18) * this.getMaxSlippage
            },
			async change_currency(i, setInputs = true, event) {
				if(event) {
					this.inputs[i] = event.target.value
				}
                var value = this.inputs[i]
                this.highlightInputs(i)

                if (this.sync_balances && !this.max_balances) {
                    for (let j = 0; j < currentContract.N_COINS; j++)
                        if (j != i) {
                            var value_j = this.inputs[j]

                            if (this.balances[i] * currentContract.c_rates[i] > 1) {
                                // proportional
                                var newval = value / currentContract.c_rates[i] * this.balances[j] / this.balances[i];
                                newval = Math.floor(newval * currentContract.c_rates[j] * 100) / 100;
                                setInputs && Vue.set(this.inputs, j, newval);

                            } else {
                                // same value as we type
                                var newval = value;
                                setInputs && Vue.set(this.inputs, j, newval);
                            }

                            // Balance not enough highlight
                            if (newval > this.wallet_balances[j] * this.rates[j])
                                Vue.set(this.bgColors, j, 'red');
                            else
                                Vue.set(this.bgColors, j, 'blue');
                        }
                }
                await this.getLPCrvReceived()
	            await this.calcSlippage()
	        },
	        handle_migrate_new() {
	        	common.handle_migrate_new('new')
	        }
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
    .pulseinfo {
        animation: pulse 1s 3;
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
    .curvelpusd {
        display: inline-block;
        padding-top: 1em;
    }
    .advancedoptions {
        margin-top: 1em;
    }
    .advancedoptions + div fieldset {
        margin-top: 1em;
    }
    .advancedoptions + div legend {
        text-align: center;
    }
    #stakepercentage {
        width: 2.6em;
    }
    label[for='stakepercentage'] {
        margin-right: 1em;
    }
    #stakepercentage.invalid, #max_slippage .invalid {
        background-color: red;
    }
    #max_slippage {
        margin-top: 0.4em;
    }
</style>
