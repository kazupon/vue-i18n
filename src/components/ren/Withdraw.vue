<template>
	<div class="add-liquidity">
        <fieldset class="percentage">
            <legend>
            	Share of liquidity (%)
        		<input id='showstaked' type='checkbox' name='showstaked' v-model = 'showstaked'>
        		<label for='showstaked' v-show="currentPool == 'sbtc'"> Show staked </label>
            </legend>
            <ul>
                <li>
                    <input type="text" 
                    id="liquidity-share" 
                    name="liquidity-share" 
                    v-model='share'
                    @input='handle_change_share'
                    @focus='handle_change_share'
                    :style='shareStyles'>
                </li>
            </ul>
        </fieldset>
        <fieldset class="currencies">
            <legend>Currencies:</legend>
            <ul>
                <li v-for='(currency, i) in Object.keys(currencies)'>
                    <label :for="'currency_'+i" class='currency_label'>
                        <img 
                            :class="{'token-icon': true, [currency+'-icon']: true, 'y': withdrawc, [currentPool]: true}" 
                            :src="getTokenIcon(i == 0 ? 'btc' : currency)">
                        <span v-show='withdrawc'>{{currencies[currency]}}
	                    	<span v-show="!(currency == 'usdt' && currentPool == 'usdt') && !['susdv2','ren','sbtc'].includes(currentPool)">(in {{currency | capitalize}})</span>
                    	</span>
                    	<span v-show="!withdrawc && !['susdv2', 'tbtc', 'ren'].includes(currentPool)">{{currency | capitalize}}</span>
                        <span v-show="!withdrawc && ['susdv2', 'tbtc', 'ren'].includes(currentPool)">{{currencies[currency]}}</span>
                    </label>
                    <input type="text" 
                    :id="'currency_'+i" 
                    name="from_cur" 
                    v-model = 'inputs[i]'
                    :style = "inputStyles[i]"
                    :disabled = "currentPool == 'susd'"
                    :ref="`inputs${i}`"
                    @input='handle_change_amounts(i)'
                    @focus='handle_change_amounts(i)'>
                    <div v-show='i == 0 && amountAfterBTC > 0'>
                        BTC Amount received after renVM fees: {{ amountAfterBTC }}
                    </div>
                    <div v-show='i == 0 && amountAfterBTC < 0'>
                        Minimum withdraw amount in BTC is {{ minOrderSize }}
                    </div>
                </li>
                <li v-show = "!['susd','susdv2','tbtc','ren'].includes(currentPool)">
                    <input id="withdrawc" type="checkbox" name="withdrawc" v-model='withdrawc'>
                    <label for="withdrawc">Withdraw wrapped</label>
                </li>
            </ul>
        </fieldset>
        <fieldset v-show = "currentPool != 'susd'">
        	<legend>
                Withdraw % in:
                <span class='tooltip'> [?]
                    <span class='tooltiptext long'>
                        You can also withdraw in one coin by typing in a currency field
                    </span>
                </span>
            </legend>
        	<ul>
        		<li v-show = "!['susdv2','tbtc','ren','sbtc'].includes(currentPool)">
        			<input type='radio' id='to_cur_comb' name="to_cur" :value='10' :checked='to_currency === 10' @click='handleCheck(10)'>
        			<label for='to_cur_comb'>
                        Combination of all coins
                        <span v-for='(currency, i) in Object.keys(currencies)'>
                            <span v-show='i > 0'>+</span>
                            <img 
                            :class="{'token-icon': true, [currency+'-icon']: true, 'y': withdrawc, [currentPool]: true}" 
                            :src="getTokenIcon(i == 0 ? 'btc' : currency)">
                        </span>
                    </label>
        		</li>
				<li class='withdrawin'>
	                <input type="radio" :id="'to_cur_'+0" name="to_cur" :value='0' :checked='to_currency === 0' @click='handleCheck(0)'>
	                <label :for="'to_cur_'+0">
                        <img 
                            :class="{'token-icon': true, ['btc-icon']: true}" 
                            :src="getTokenIcon('btc')"> 
                            <span> BTC </span>
                    </label>
	            </li>
	            <li>
	            	<input type='checkbox' id='donate_dust' name='donate_dust' v-model='donate_dust'>
	            	<label 
                        for='donate_dust' 
                        v-show="!['tbtc', 'ren'].includes(currentPool)">
                            Donate dust<span class='tooltip'>[?]<span class='tooltiptext'>(may use less gas)</span>
                        </span>
	            	</label>
	            </li>
        	</ul>
        </fieldset>
        <div id='max_slippage' v-show='showWithdrawSlippage'><span>Max slippage:</span> 
            <input id="slippage02" type="radio" name="slippage" value='0.2' v-model='maxSlippage'>
            <label for="slippage02">0.2%</label>

            <input id="slippage1" type="radio" name="slippage" checked value='3' v-model='maxSlippage'>
            <label for="slippage1">3%</label>

            <input id="custom_slippage" type="radio" name="slippage" value='-' @click='customippageDisabled = false'>
            <label for="custom_slippage" @click='customSlippageDisabled = false'>
                <input type="text" id="custom_slippage_input" :disabled='customSlippageDisabled' name="custom_slippage_input" v-model='maxInputSlippage'> %
            </label>
        </div>
        <div class='input address btc'>
            <label for='address'>BTC withdrawal address</label>
            <input id='address' type='text' v-model='btcAddress' placeholder='Address'>
        </div>
        
        
        <div class='info-message gentle-message' id='amount-warning' v-show = 'nobalance'>
            You don't have any available amount to withdraw
            <!-- <div v-show="currentPool == 'susdv2'">
                (You have {{(staked_balance / 1e18) | toFixed2}} staked)
            </div> -->
        </div>
        
        <approve-chi></approve-chi>

        <gas-price></gas-price>

        <div id='withdraw_buttons' class='buttons'>
            <p v-show="currentPool == 'ren'">
                <a href='https://bridge.renproject.io/'> Mint/redeem renBTC </a>
            </p>
            
            <p class='simple-error invalid-address' v-show='btcAddress && !checkAddress'>
                Invalid {{ from_currency == 0 ? 'ETH' : 'BTC' }} address
            </p>

            <button id="remove-liquidity"
                :disabled = "!btcAddress || amountAfterBTC < 0 || !checkAddress"
                @click='handle_remove_liquidity()' v-show="currentPool != 'susd'">
                Withdraw <span class='loading line' v-show='loadingAction == 1'></span>
            </button>            
            <button 
                id='remove-liquidity-unstake'
                v-show = "['susdv2', 'sbtc'].includes(currentPool) && staked_balance > 0 "
                :disabled = 'slippage < -0.03 || !btcAddress || amountAfterBTC < 0 || !checkAddress'
                @click='handle_remove_liquidity(true)'>
                Withdraw & claim <span class='loading line' v-show='loadingAction == 2'></span>
            </button>
            <button id='claim-snx'
                @click='claim_SNX'
                v-show="['susdv2', 'sbtc'].includes(currentPool) && pendingSNXRewards > 0"
            >
                Claim {{(pendingSNXRewards / 1e18).toFixed(2)}} SNX
                <span v-show="currentPool == 'sbtc'"> + {{(pendingRENRewards / 1e18).toFixed(2)}} REN</span>
            </button>
            <button id='unstake-snx'
                @click='handle_remove_liquidity(true, true)'
                v-show="['susdv2', 'sbtc'].includes(currentPool) && staked_balance > 0"
            >
                Unstake
            </button>
            <div class='info-message gentle-message' v-show='show_loading'>
                <span v-html='waitingMessage'></span> <span class='loading line'></span>
            </div>
            <div class='info-message gentle-message' v-show='estimateGas'>
                Estimated tx cost: {{ (estimateGas * gasPrice / 1e9 * ethPrice).toFixed(2) }}$
            </div>
            <div class='simple-error' v-show='warninglow'>
                You're withdrawing too little amount in one coin
            </div>
            <Slippage v-bind="{show_nobalance, show_nobalance_i}"/>
        </div>

        <tx-table></tx-table>
        
    </div>
</template>

<script>
	import Vue from 'vue'
    import { notify, notifyHandler, notifyNotification } from '../../init'
    import * as common from '../../utils/common.js'
    import { getters, contract as currentContract, gas as contractGas, init } from '../../contract'
    import allabis, { adapterAddress, balancer_ABI,  balancer_address } from '../../allabis'
    const compound = allabis.compound
    import * as helpers from '../../utils/helpers'

    import BN from 'bignumber.js'

    import Slippage from '../common/Slippage.vue'

    import Table from './Table.vue'
    import * as store from './shiftStore'
    import { state } from './shiftState'

    import * as gasPriceStore from '../common/gasPriceStore'
    import GasPrice from '../common/GasPrice.vue'

    import * as errorStore from '../common/errorStore'

    import ApproveCHI from './ApproveCHI.vue'

    import validate from 'bitcoin-address-validation';

    export default {
    	components: {
    		Slippage,
            'tx-table': Table,
            'approve-chi': ApproveCHI,
            GasPrice,
    	},
    	data: () => ({
    		share: '100.00',
    		shareStyles: {
    			backgroundColor: '#707070',
    			color: '#d0d0d0',
    		},
    		inputs: [],
            btcAddress: '',
    		inputStyles: [],
            swapbtc: false,
            loading: false,
    		wallet_balances: [],
    		calc_balances: [],
    		balances: [],
    		staked_balance: null,
    		token_balance: null,
    		token_supply: 0,
    		show_nobalance: false,
    		show_nobalance_i: 0,
    		bgColor: [],
    		amounts: [],
    		to_currency: 10,
    		test: null,
    		withdrawc: false,
    		donate_dust: true,
    		showstaked: false,
            pendingSNXRewards: 0,
            pendingRENRewards: 0,
            balancerPool: null,
            show_loading: false,
            waitingMessage: '',
            showWithdrawSlippage: false,
            maxSlippage: 0.2,
            setSlippage: false,
            maxInputSlippage: '',
            customSlippageDisabled: true,
            estimateGas: 0,
            customGasDisabled: true,
            customGasInput: null,
            ethPrice: 0,
            loadingAction: false,
            warninglow: false,
    		slippagePromise: helpers.makeCancelable(Promise.resolve()),
    	}),
        created() {
            this.$watch(()=>currentContract.default_account, (val, oldval) => {
            	if(!val || !oldval) return;
            	if(val.toLowerCase() == oldval.toLowerCase()) return;
                if(val) this.mounted();
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
        	to_currency(val) {
        		if(this.share == 0 || this.share == '---') this.share = 100
	        	this.setInputStyles()
	        	if(val !== null) this.handle_change_share();
        	},
        	withdrawc(val) {
        		if(this.share == '---' ) return;
        		if(!val && this.to_currency === null) this.to_currency = 10
        		if(val && this.to_currency !== null) this.to_currency = null
        	},
            maxSlippage() {
                this.setSlippage = true
            },
            maxInputSlippage(val) {
                if(val) this.setSlippage = true
            },
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
        	showMigrateNew() {
        		return (this.currentPool == 'compound' && this.oldBalance > 0) || this.currentPool == 'susd'
         	},
         	nobalance() {
         		return this.staked_balance && this.token_balance.plus(this.staked_balance).eq(BN(0))
         	},
            getMaxSlippage() {
                let maxSlippage = this.maxSlippage;
                if(this.maxInputSlippage) maxSlippage = this.maxInputSlippage;
                return (100 + maxSlippage)/100
            },
            minAmount() {
            if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) return 1e-8
                return 0.01
            },
            calcFee() {
                let N_COINS = allabis[currentContract.currentContract].N_COINS
                return this.fee * N_COINS / (4 * (N_COINS -1))
            },
            amountAfterBTC() {
              return (BN(this.inputs[0]).times(1e8).times(1-state.mintFee/10000).minus(state.minersLockFee)).div(1e8).toFixed(8)
            },
            minOrderSize() {
                return ((state.minersReleaseFee + state.burnFee / 10000) / 1e8 + 0.00000547).toFixed(8)
            },
            gasPrice() {
                return gasPriceStore.state.gasPrice
            },
            gasPriceWei() {
                return gasPriceStore.state.gasPriceWei
            },
            checkAddress() {
                return validate(this.btcAddress) !== false
            },
        },
        async mounted() {
            this.$emit('loaded')
        	this.$watch(() => this.showstaked, this.handle_change_share)
        	this.setInputStyles(true)
            if(currentContract.initializedContracts) this.mounted();
        },
        methods: {
            async mounted() {
            	if(['susdv2', 'tbtc', 'ren'].includes(this.currentPool)) {
            		this.withdrawc = true;
            		this.to_currency = null
            	}
                if(this.currentPool == 'sbtc') this.showstaked = true
            	currentContract.showSlippage = false;
        		currentContract.slippage = 0;

                let curveRewards = currentContract.curveRewards
                if(['sbtc'].includes(this.currentPool)) {
                    this.balancerPool = new currentContract.web3.eth.Contract(balancer_ABI, balancer_address)
                    let calls = [
                        [curveRewards._address, curveRewards.methods.earned(this.default_account).encodeABI()],
                        [this.balancerPool._address, this.balancerPool.methods.totalSupply().encodeABI()],
                        [this.balancerPool._address, this.balancerPool.methods.getBalance('0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f').encodeABI()],
                        [this.balancerPool._address, this.balancerPool.methods.getBalance('0x408e41876cccdc0f92210600ef50372656052a38').encodeABI()],
                    ]
                    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
                    let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))

                    this.pendingSNXRewards = decoded[0] * decoded[2] / decoded[1]
                    this.pendingRENRewards = decoded[0] * decoded[3] / decoded[1]

                }

                await common.update_fee_info();
                await this.update_balances();
                this.setCalcBalances()
            	this.handle_change_share();
            },
            getTokenIcon(token) {
                return helpers.getTokenIcon(token, this.withdrawc, this.currentPool)
            },
            toFixed(num, precisions = 2, round = 4) {
                if(num == '' || num == undefined || +num == 0) return '0.00'
                if(precisions == 2 && ['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) precisions = 8
                let rounded = num.toFixed(precisions)
                return isNaN(rounded) ? '0.00' : rounded
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
	        	this.inputStyles = Array(Object.keys(this.currencies).length).fill({
	        		backgroundColor: '#707070',
	        		color: '#d0d0d0',
	        	})
            },
            async calcSlippage(...args) {
            	this.slippagePromise.cancel();
        		this.slippagePromise = helpers.makeCancelable(common.calc_slippage(...args))
        		await this.slippagePromise;
            },
            handleCheck(val) {
            	if(val === this.to_currency) {
            		this.to_currency = null

            		currentContract.slippage = 0
            		currentContract.showSlippage = false
            	}
            	else {
            		this.to_currency = val
            	}
            },
            setCalcBalances() {
                for (let i = 0; i < currentContract.N_COINS; i++) {
                    let token_balance = this.showstaked ? this.token_balance.plus(this.staked_balance) : this.token_balance
                    let value = BN(100 / 100 * this.balances[i] * currentContract.c_rates[i] * token_balance / this.token_supply)
                    Vue.set(this.calc_balances, i, value)
                }
            },
            async update_balances() {
            	let calls = []
			    if (currentContract.default_account) {
			        for (let i = 0; i < currentContract.N_COINS; i++) {
			        	calls.push([currentContract.underlying_coins[i]._address ,currentContract.underlying_coins[i].methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
			        }
			        calls.push([currentContract.swap_token._address ,currentContract.swap_token.methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
			    }
			    else {
			        this.token_balance = BN(0);
			    }
			    for (let i = 0; i < currentContract.N_COINS; i++) {
			    	calls.push([currentContract.swap._address ,currentContract.swap.methods.balances(i).encodeABI()])
			    }
		    	if(['susdv2', 'sbtc'].includes(this.currentPool)) calls.push([currentContract.curveRewards._address, currentContract.curveRewards.methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
				calls.push([currentContract.swap_token._address ,currentContract.swap_token.methods.totalSupply().encodeABI()])
				let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
				let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
				if(currentContract.default_account) {
					decoded.slice(0, currentContract.N_COINS).map((v, i) => {
						Vue.set(this.wallet_balances, i, +v / allabis[this.currentPool].coin_precisions[i])
					})
					this.token_balance = BN(decoded[currentContract.N_COINS])
					decoded = decoded.slice(currentContract.N_COINS+1)			
				}
				decoded.slice(0, currentContract.N_COINS+1 + currentContract.N_COINS).map((v, i) => {
					Vue.set(this.balances, i, +v)
			        if(!currentContract.default_account) Vue.set(this.balances, i, 0)
				})
				if(['susdv2', 'sbtc'].includes(this.currentPool)) this.staked_balance = BN(decoded[decoded.length-2])
                else this.staked_balance = BN(0)
				this.token_supply = +decoded[decoded.length-1]
			},
			async handle_change_amounts(i, event) {
                this.showWithdrawSlippage = true;
                this.show_nobalance = false
				if(event) {
					this.inputs[i] = event.target.value
					return;
				}
				this.to_currency = null
		        var values = this.inputs.map((x,i) => x / currentContract.c_rates[i])
		        values = values.map(v=>BN(Math.floor(v).toString()).toFixed(0))
		        this.show_nobalance = false;
		        this.show_nobalance_i = 0;
		        let calls = [...Array(currentContract.N_COINS).keys()].map(i=>[currentContract.swap._address, currentContract.swap.methods.balances(i).encodeABI()])
		        calls.push([currentContract.swap._address ,currentContract.swap.methods.calc_token_amount(values, false).encodeABI()])
		        calls.push([currentContract.swap_token._address, currentContract.swap_token.methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
		        try {
                    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
                    let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
                    decoded.slice(0, currentContract.N_COINS).forEach((v, i) => {
                        let coin_balance = +v * currentContract.c_rates[i]
                        if(coin_balance < this.inputs[i]) {
                            this.show_nobalance |= true;
                            this.show_nobalance_i = i;
                        }
                        else
                            this.show_nobalance |= false;
                    })
		            var availableAmount = BN(decoded[decoded.length-2])
		            availableAmount = availableAmount.div(BN(1 - currentContract.fee * currentContract.N_COINS / (4 * (currentContract.N_COINS - 1))))
		            var maxAvailableAmount = BN(decoded[decoded.length-1]);
		            if(i == 1 && availableAmount.gt(maxAvailableAmount.plus(BN(this.staked_balance))) || i == 0 && this.amountAfterBTC < 0) {
		                this.setAllInputBackground('red')
		            }
		            else if(i == 0 && this.amountAfterBTC > 0) {
		                this.setAllInputBackground('blue')
		            }
		            this.calcSlippage(this.inputs, false);

		            this.share = '---';
		            this.shareStyles = {
		            	backgroundColor: '#707070',
		            	color: '#d0d0d0'
		            }
		        }
		        catch(err) {
		            console.error(err)
                    this.show_nobalance = true;
                    this.show_nobalance_i = currentContract.bal_info.findIndex((balance, i) => {
                        return +this.inputs[i] > +balance
                    });
		            this.setAllInputBackground('red')
		        }
			},
			async getMinAmounts() {
				//use update rates instead
				await common.update_fee_info();
				let min_amounts = []
				for(let i = 0; i < currentContract.N_COINS; i++) {
			    	min_amounts[i] = (BN(1).div(BN(this.getMaxSlippage))).times(this.share/100).times(BN(this.balances[i]))
					min_amounts[i] = min_amounts[i].times(BN(this.token_balance))
						            .div(BN(this.token_supply))
						            .toFixed(0,1)
				}
				return min_amounts;
			},
            async claim_SNX() {
                this.show_loading = true
                this.waitingMessage = `Claiming ${(this.pendingSNXRewards / 1e18).toFixed(2)} SNX`
                if(this.currentPool == 'sbtc')
                    this.waitingMessage += ` and ${(this.pendingRENRewards / 1e18).toFixed(2)} REN`
                var { dismiss } = notifyNotification(this.waitingMessage)
                let earned = await currentContract.curveRewards.methods.earned(currentContract.default_account).call()

                await new Promise((resolve, reject) => {
                    currentContract.curveRewards.methods.getReward()
                        .send({
                            from: currentContract.default_account,
                            gasPrice: this.gasPriceWei,
                            gas: 200000,
                        })
                        .once('transactionHash', hash => {
                            dismiss()
                            notifyHandler(hash)
                            resolve()
                        })
                        .on('receipt', () => this.pendingSNXRewards = 0)
                        .catch(err => {
                            dismiss()
                            errorStore.handleError(err)
                            reject(err)
                        })
                })

                if(this.currentPool == 'sbtc') {

                    try {
                        await this.balancerPool.methods.exitPool(earned, ['0', '0'])
                        .send({
                            from: currentContract.default_account,
                            gasPrice: this.gasPriceWei,
                            gas: 600000,
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

            },
            async unstake(amount, exit = false, unstake_only = false) {
                if(unstake_only)
                    this.waitingMessage = `
                        Unstaking ${this.toFixed(amount.div(BN(1e18)))} tokens from Mintr
                    `
                else 
                    this.waitingMessage = `
                    Need to unstake ${this.toFixed(amount.div(BN(1e18)))} tokens from Mintr for withdrawal.
                    <br>
                    A bit more tokens are needed to unstake to ensure that withdrawal is successful.
                    You'll see them in your unstaked balance afterwards.
                        
                `;
                var { dismiss } = notifyNotification(this.waitingMessage)

                try {
                    await new Promise((resolve, reject) => {
                        currentContract.curveRewards.methods.withdraw(amount.toFixed(0,1))
                            .send({
                                from: currentContract.default_account,
                                gasPrice: this.gasPriceWei,
                                gas: 125000,
                            })
                            .once('transactionHash', hash => {
                                dismiss()
                                notifyHandler(hash)
                                resolve()
                            })
                            .on('receipt', receipt => {
                                this.staked_balance = this.staked_balance.minus(amount)
                                currentContract.curveStakedBalance -= amount
                                common.update_fee_info()
                            })
                            .catch(err => {
                                dismiss()
                                reject(err)
                            })
                    })
                    if(exit) {
                        this.claim_SNX()
                    }
                }
                catch(err) {
                    console.error(err)
                    errorStore.handleError(err)
                    this.waitingMessage = ''
                    this.show_loading = false;
                    throw err
                }
            },
            setLoadingAction(val) {
                this.loadingAction = val;
                setTimeout(() => this.loadingAction = false, 500)
            },
			async handle_remove_liquidity(unstake = false, unstake_only = false) {
                let actionType = unstake == false ? 1 : 2
                if(this.loadingAction == actionType) return;
                this.setLoadingAction(actionType)
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
                this.estimateGas = 0;
                //this.show_loading = true;
                let inOneCoin = currentContract.deposit_zap
                if(['tbtc','ren','sbtc'].includes(currentContract.currentContract)) inOneCoin = currentContract.swap

				let min_amounts = []
			    for (let i = 0; i < currentContract.N_COINS; i++) {
                    let maxDiff = BN(this.calc_balances[i]).minus(BN(this.inputs[i]))
			    	let useMax = this.calc_balances[i] > 0 && maxDiff.lte(BN(this.minAmount)) && maxDiff > 0
                    if(useMax) {
			    		Vue.set(this.amounts, i, BN(this.calc_balances[i]).div(currentContract.c_rates[i]).toFixed(0,1))
			    	}
			    	else {
			        	Vue.set(this.amounts, i, BN(Math.floor(this.inputs[i] / currentContract.c_rates[i]).toString()).toFixed(0,1)); // -> c-tokens
			    	}
			    }
			    var txhash;
			    if (this.share == '---') {
			    	var token_amount;
			        try {
			        	token_amount = await currentContract.swap.methods.calc_token_amount(this.amounts, false).call();
			        }
			        catch(err) {
			        	console.error(err)
						this.show_nobalance = true;
						this.show_nobalance_i = this.to_currency;
			        }
                    token_amount = BN(token_amount).times(BN(1).plus(this.calcFee))
			        token_amount = BN(Math.floor(token_amount * this.getMaxSlippage).toString()).toFixed(0,1)
                    if((this.token_balance.lt(BN(token_amount)) || unstake) && ['susdv2', 'sbtc'].includes(this.currentPool))
                        await this.unstake(BN(token_amount).minus(BN(this.token_balance)), unstake && !unstake_only, unstake_only)
                    if(unstake_only) return;
			        let nonZeroInputs = this.inputs.filter(Number).length
		        	let gas = contractGas.withdraw[this.currentPool].imbalance(nonZeroInputs) | 0
                    this.estimateGas = gas / 2;
                    try {
                        await common.ensure_allowance_zap_out(token_amount, undefined, allabis[currentContract.currentContract].adapterBiconomyAddress)
                        var { dismiss } = notifyNotification('Please confirm withdrawal transaction')
			        	await store.removeLiquidityImbalanceThenBurn({
                            address: this.btcAddress,
                            coinDestination: currentContract.default_account,
                            amounts: this.amounts,
                            renBTCAmount: this.inputs[0],
                            max_burn_amount: token_amount,
                            gasPrice: this.gasPriceWei,
                            dismiss: dismiss,
                        })
                    }
                    catch(err) {
                        this.waitingMessage = ''
                        this.show_loading = false
                        throw err;
                    }
			    }
			    else {
                    let balance = BN(this.token_balance)
                    if(this.share == 100) balance = BN(await currentContract.swap_token.methods.balanceOf(currentContract.default_account).call());
                    if(this.showstaked) balance = balance.plus(this.staked_balance)
                    var amount = BN(this.share).div(BN(100)).times(balance)

                    if((this.token_balance.lt(BN(amount)) || unstake) && ['susdv2', 'sbtc'].includes(this.currentPool))
                        await this.unstake(BN(amount).minus(BN(this.token_balance)), unstake && !unstake_only, unstake_only)
                    if(unstake_only) return;
                    amount = amount.toFixed(0,1)
                    if(this.to_currency !== null && this.to_currency < 10) {
                        this.waitingMessage = `Please approve ${this.toFixed((amount / 1e18))} tokens for withdrawal`
                        var { dismiss } = notifyNotification(this.waitingMessage)
                        this.estimateGas = contractGas.depositzap[this.currentPool].withdraw / 2
                        let min_amount;
                        try {
                            min_amount = await currentContract.swap.methods.calc_withdraw_one_coin(amount, this.to_currency).call();
                            min_amount = BN(min_amount).times(BN(1).minus(this.calcFee))
                        }
                        catch(err) {
                            console.error(err)
                            this.show_nobalance = true;
                            this.show_nobalance_i = this.to_currency;
                        }
                        this.waitingMessage = 'Please confirm withdrawal transaction'
                        var { dismiss } = notifyNotification(this.waitingMessage)
                        console.log('remove liqudiity one coin then burn')
			        	await store
			        		.removeLiquidityOneCoinThenBurn({
                                address: this.btcAddress,
                                coinDestination: currentContract.default_account,
                                token_amounts: amount,
                                renBTCAmount: this.inputs[0],
                                min_amount: BN(min_amount).times(BN(1).div(BN(this.getMaxSlippage))).toFixed(0, 1),
                                gasPrice: this.gasPriceWei,
                                dismiss: dismiss,
                            })
			        }
			        else {
                        try {
    			        	let min_amounts = await this.getMinAmounts();
                            this.waitingMessage = 'Please confirm withdrawal transaction'
                            var { dismiss } = notifyNotification(this.waitingMessage)
                            this.estimateGas = 600000
    			        	await store
                                .removeLiquidityThenBurn({
                                    address: this.btcAddress,
                                    coinDestination: currentContract.default_account,
                                    amount: amount, 
                                    renBTCAmount: this.inputs[0],
                                    min_amounts: min_amounts,
                                    gasPrice: this.gasPriceWei,
                                    dismiss: dismiss,
                                })
                        }
                        catch(err) {
                            this.waitingMessage = ''
                            this.show_loading = false
                            throw err;
                        }
			        }
			    }
			    if(this.share == '---') {
			        for (let i = 0; i < currentContract.N_COINS; i++) {
			            this.handle_change_amounts(i);
			        }
			    }
                this.show_loading = false;
                this.waitingMessage = ''
                this.estimateGas = 0
                this.gasPrice = 0

			    await this.update_balances();
			    await common.update_fee_info();
			},
			async handle_change_share() {
                let inOneCoin = currentContract.deposit_zap
                if(['tbtc','ren','sbtc'].includes(currentContract.currentContract)) inOneCoin = currentContract.swap

                this.warninglow = false;
                this.showWithdrawSlippage = false
                this.show_nobalance = false
                if(this.to_currency == null && this.withdrawc == false && this.share == '---') this.to_currency = 10
                if(this.share != '---' && this.to_currency != null && this.to_currency != 10) this.showWithdrawSlippage = true
				let token_balance = this.showstaked ? this.token_balance.plus(this.staked_balance) : this.token_balance
                console.log(token_balance, "TOKEN BALANCE")
	        	currentContract.showSlippage = false;
        		currentContract.slippage = 0;
        		if(this.to_currency !== null && this.to_currency < 10) {
                    var amount = BN(this.share).div(BN(100)).times(token_balance).toFixed(0,1);
                    if (this.share == 100) {
                        amount = await currentContract.swap_token.methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').call();
                        if(this.showstaked) amount = BN(amount).plus(BN(this.staked_balance)).toFixed(0,1)
                    }
/*				        this.inputs = this.inputs.map(v=>0)
				        Vue.set(this.inputs, this.to_currency, amount / 1e18)
				        let ref = 'inputs'+this.to_currency
				        this.handle_change_amounts(this.to_currency);*/
				        //this.$refs[ref][0].focus();
	                let precision = allabis[currentContract.currentContract].coin_precisions[this.to_currency]
					let zap_values = Array(currentContract.N_COINS).fill(0)
					try {
                        this.warninglow = false
						zap_values[this.to_currency] = BN(await inOneCoin.methods.calc_withdraw_one_coin(amount, this.to_currency).call())
                        if(zap_values[this.to_currency].eq(BN(0))) this.warninglow = true
					}
					catch(err) {
						console.error(err)
                        if(this.share != '') {
    						this.show_nobalance = true;
    						this.show_nobalance_i = this.to_currency;
                        }
					}
			        let real_values = Array(currentContract.N_COINS).fill(0)
			        real_values[this.to_currency] = zap_values[this.to_currency].div(precision)
			        this.inputs = this.inputs.map(v=>0)
			        this.inputs[this.to_currency] = this.toFixed(BN(real_values[this.to_currency]), 2,1)
				    await this.calcSlippage([], false, zap_values, this.to_currency)
        		}

				this.shareStyles.backgroundColor = 'blue'
				this.shareStyles.color = 'aqua'
			    if (this.share == '---') {
			        this.share = 0;
			    }
			    else if ((this.share > 100) | (this.share < 0))
			        this.shareStyles.backgroundColor = 'red'
			    if(this.to_currency !== null && this.to_currency < 10) return;
			    for (let i = 0; i < currentContract.N_COINS; i++) {
			        if ((this.share >=0) & (this.share <= 100)) {
			        	let value = BN(this.share / 100 * this.balances[i] * currentContract.c_rates[i] * token_balance / this.token_supply)
			            Vue.set(this.inputs, i, this.toFixed(value, 2, 1))
			        }
			        else {
			            Vue.set(this.inputs, i, 0)
			        }
			        Vue.set(this.inputStyles, i, {
			        	backgroundColor: '#707070',
			        	color: '#d0d0d0'
			        })
			    }
			},
			setAllInputBackground(bgcolor) {
				for(let i = 0; i < currentContract.N_COINS; i++) {
					Vue.set(this.inputStyles, i, Object.assign(this.inputStyles[i] || {}, {backgroundColor: bgcolor}))
				}
			},
	        async handle_migrate_new() {
	        	if(this.currentPool == 'compound')
	        		return common.handle_migrate_new('new')
	        	this.share = 100
	        	await this.handle_remove_liquidity();
	        },
        },

    }
</script>

<style>
	#remove-liquidity {
		margin-right: 1em;
	}
	#withdrawold {
		margin-left: 3px;
		color: white;
	}
	#amount-warning {
		margin-bottom: 1em;
	}
	#mintr {
        margin-top: 1em;
		margin-left: 1em;
	}
	#withdraw_buttons {
		text-align: center;
		margin-top: 3px;
	}
    .currency_label {
        display: block;
        margin-bottom: 0.3em;
    }
    .currency_label .token-icon {
        margin-right: 0.6em;
    }
    .withdrawin {
        margin-bottom: 0.3em;
    }
    .input.address.btc {
        margin-top: 1em;
    }
    .simple-error.invalid-address {
        margin-bottom: 1em;
    }
</style>
