<template>
	<div class="add-liquidity">
        <fieldset class="percentage">
            <legend>
            	Share of liquidity (%)
        		<input id='showstaked' type='checkbox' name='showstaked' v-model = 'showstaked'>
        		<label for='showstaked' v-show="['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool)"> Show staked </label>
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
                            :src='getTokenIcon(currency)'>
                        <span v-show='withdrawc'>{{currencies[currency]}}
	                    	<span v-show="!(currency == 'usdt' && currentPool == 'usdt') && !['susdv2', 'ren', 'sbtc'].includes(currentPool)">(in {{currency | capitalize}})</span>
                    	</span>
                    	<span v-show="!withdrawc && !['susdv2', 'tbtc', 'ren', 'sbtc'].includes(currentPool)">{{currency | capitalize}}</span>
                        <span v-show="!withdrawc && ['susdv2', 'tbtc', 'ren', 'sbtc'].includes(currentPool)">{{currencies[currency]}}</span>
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
                </li>
                <li v-show = "!['susd','susdv2','tbtc','ren', 'sbtc'].includes(currentPool)">
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
        		<li v-show = "!['susdv2','tbtc','ren', 'sbtc'].includes(currentPool)">
        			<input type='radio' id='to_cur_comb' name="to_cur" :value='10' :checked='to_currency === 10' @click='handleCheck(10)'>
        			<label for='to_cur_comb'>
                        Combination of all coins
                        <span v-for='(currency, i) in Object.keys(currencies)'>
                            <span v-show='i > 0'>+</span>
                            <img 
                            :class="{'token-icon': true, [currency+'-icon']: true, 'y': withdrawc, [currentPool]: true}" 
                            :src='getTokenIcon(currency)'>
                        </span>
                    </label>
        		</li>
				<li v-for='(currency, i) in Object.keys(currencies)' class='withdrawin'>
	                <input type="radio" :id="'to_cur_'+i" name="to_cur" :value='i' :checked='to_currency === i' @click='handleCheck(i)'>
	                <label :for="'to_cur_'+i">
                        <img 
                            :class="{'token-icon': true, [currency+'-icon']: true, 'y': withdrawc, [currentPool]: true}" 
                            :src='getTokenIcon(currency)'> 
                            <span v-show='!withdrawc'> {{ currency | capitalize }} </span>
                            <span v-show='withdrawc'> {{ currencies[currency] }} </span>
                    </label>
	            </li>
	            <li>
	            	<input type='checkbox' id='donate_dust' name='donate_dust' v-model='donate_dust'>
	            	<label 
                        for='donate_dust' 
                        v-show="!['tbtc', 'ren', 'sbtc'].includes(currentPool)">Donate dust
                            <span class='tooltip'>[?]<span class='tooltiptext'>(may use less gas)</span>
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

        <gas-price></gas-price>

        <!-- <div id='modal' class='modal' v-show='showModal' @click.self='showModal = false'>
            <div class='modal-content window white'>
                <fieldset>
                    <div class='legend2 hoverpointer' @click='showModal = false'>
                        [<span class='greentext'>■</span>]
                    </div>
                    <legend>CONFIRM</legend>
                    <div class='modaltext'>
                        Confirm <span class='warningtext'>burning</span> {{(pendingSNXRewards / 1e18).toFixed(2)}} YFI for {{(withdrawADAI / 1e18).toFixed(2)}} aDAI
                    </div>
                    <button @click='showModal = false; claimYFIaDAI()'> Confirm </button>
                    <button @click='showModal = false' class='buttoncancel'>Cancel</button>
                </fieldset>
            </div>
        </div> -->

        <p v-show='showInfApprovalZap'>
            <input id='inf_approval' type='checkbox' v-model='inf_approval'>
            <label for='inf_approval'>Infinite approval - trust zap contract forever</label>
        </p>

        <div id='withdraw_buttons' class='buttons'>
            <div class='info-message gentle-message' id='amount-warning' v-show = 'nobalance'>
	        	You don't have any available amount to withdraw
	        	<!-- <div v-show="currentPool == 'susdv2'">
	        		(You have {{(staked_balance / 1e18) | toFixed2}} staked)
	        	</div> -->
	      	</div>
            <button id="remove-liquidity"
                :disabled="['susdv2', 'sbtc'].includes(currentPool) && slippage < -0.03 && !warninglow || show_nobalance == true"
                @click='handle_remove_liquidity()' v-show="currentPool != 'susd'">
                Withdraw <span class='loading line' v-show='loadingAction == 1'></span>
            </button>
            <button 
                id='remove-liquidity-unstake'
                v-show = "['susdv2', 'sbtc','y','iearn'].includes(currentPool) && staked_balance > 0 "
                :disabled = 'slippage < -0.03'
                @click='handle_remove_liquidity(true, false, true)'>
                Withdraw & claim <span class='loading line' v-show='loadingAction == 2'></span>
            </button>
            <button id='claim-snx'
                @click='claim_SNX(false)'
                v-show="['susdv2', 'sbtc','y','iearn'].includes(currentPool) && pendingSNXRewards > 0"
            >
                Claim {{(pendingSNXRewards / 1e18).toFixed(2)}} {{ ['y','iearn'].includes(currentPool) ? 'YFI' : 'SNX' }}
                <span v-show="currentPool == 'sbtc'"> + {{(pendingRENRewards / 1e18).toFixed(2)}} REN</span>
            </button>
            <button id='claim-bpt'
                @click='claim_SNX(true)'
                v-show="['sbtc'].includes(currentPool) && pendingBALRewards > 0"
            >
                Claim {{(pendingBALRewards / 1e18).toFixed(6)}} BPT
            </button>
            <button id='claim-snxbpt' 
                @click='claim_SNX(true, false)'
                v-show="['sbtc'].includes(currentPool) && withdrawBALPool > 0"
            >
                Withdraw {{(withdrawSNXPool / 1e18).toFixed(0)}} SNX + {{(withdrawRENPool / 1e18).toFixed(0)}} REN
            </button>
            <!-- <button id='claim-adai' 
                @click='showModal = true'
                v-show="['y', 'iearn'].includes(currentPool) && withdrawADAI > 0"
            >
                {{(pendingSNXRewards / 1e18).toFixed(2)}} YFI -> {{(withdrawADAI / 1e18).toFixed(2)}} aDAI
                <span class='tooltip'> [?]
                    <span class='tooltiptext long'>
                        Burn your YFI tokens to receive aDAI tokens
                    </span>
                </span>
            </button> -->
            <button id='unstake-snx'
                @click='handle_remove_liquidity(true, true)'
                v-show="['susdv2', 'sbtc','y','iearn'].includes(currentPool) && staked_balance > 0"
            >
                Unstake
            </button>
            <router-link v-show="['susdv2'].includes(currentPool) && oldBalance > 0" class='button' to='/susd/withdraw' id='withdrawold'>Withdraw old</router-link>
            <button @click='migrateUSDT' v-show="currentPool == 'usdt'">Migrate to PAX</button>
            <button id="remove-liquidity" @click='handle_remove_liquidity' v-show="currentPool == 'susd'">Withdraw old</button>
            <p v-show="['ren', 'sbtc'].includes(currentPool)">
                <a href='https://bridge.renproject.io/'> Mint/redeem renBTC </a>
            </p>
            <div id='mintr' v-show="['susdv2', 'sbtc'].includes(currentPool)">
                <a href = 'https://mintr.synthetix.io/' v-show="['susdv2', 'sbtc'].includes(currentPool)" target='_blank' rel="noopener noreferrer">Manage staking in Mintr</a>
                <a href = 'https://ygov.finance/' v-show="['y', 'iearn'].includes(currentPool)" target='_blank' rel="noopener noreferrer"> yGov. </a>
            </div>
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

        <div v-show="staked_balance > 0 && ['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool)">
            <button class='simplebutton advancedoptions' @click='showadvancedoptions = !showadvancedoptions'>
                Advanced unstaking options
                <span v-show='!showadvancedoptions'>▼</span>
                <span v-show='showadvancedoptions'>▲</span>
            </button>
            <div v-show='showadvancedoptions'>
                <fieldset>
                    <legend>Advanced unstaking options:</legend>
                    <div>
                        <div id='stakedbalance'>
                            Staked tokens: <span @click='unstakepercentage = staked_balance / 1e18'>{{ (staked_balance / 1e18).toFixed(2) }}</span>
                        </div>
                        <div>
                            <label for='unstakepercentage'>Unstake:</label>
                            <input id='unstakepercentage' v-model='unstakepercentage' :class="{'invalid': unstakePercentageInvalid}">
                            <button id='unstakestaked' 
                                v-show="staked_balance > 0 && ['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool)"
                                :disabled='unstakePercentageInvalid' 
                                @click='unstakeStaked()'
                            >
                                Unstake staked
                            </button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>

    </div>
</template>

<script>
	import Vue from 'vue'
    import { notify, notifyHandler, notifyNotification } from '../../init'
    import * as common from '../../utils/common.js'
    import { getters, contract as currentContract, gas as contractGas, init } from '../../contract'
    import allabis, { balancer_ABI, balancer_address, ERC20_abi } from '../../allabis'
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
    		share: '100.00',
    		shareStyles: {
    			backgroundColor: '#707070',
    			color: '#d0d0d0',
    		},
    		inputs: [],
    		inputStyles: [],
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
            pendingBALRewards: 0,
            balancerPool: null,
            withdrawBALPool: 0,
            withdrawSNXPool: 0,
            withdrawRENPool: 0,
            withdrawADAI: 0,
            show_loading: false,
            waitingMessage: '',
            showWithdrawSlippage: false,
            maxSlippage: 0.2,
            setSlippage: false,
            maxInputSlippage: '',
            customSlippageDisabled: true,
            estimateGas: 0,
            ethPrice: 0,
            unstakepercentage: 0,
            get showadvancedoptions() {
                return localStorage.getItem('advancedoptions') === 'true' 
            },
            set showadvancedoptions(val) {
                localStorage.setItem('advancedoptions', val)
            },
            loadingAction: false,
            warninglow: false,
            showModal: false,
    		slippagePromise: helpers.makeCancelable(Promise.resolve()),
            inf_approval: true,
    	}),
        async created() {

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
        	showMigrateNew() {
        		return (this.currentPool == 'compound' && this.oldBalance > 0) || this.currentPool == 'susd'
         	},
         	nobalance() {
         		return this.staked_balance && this.token_balance.plus(this.staked_balance).eq(BN(0))
         	},
            getMaxSlippage() {
                let maxSlippage = +this.maxSlippage;
                if(this.maxInputSlippage) maxSlippage = +this.maxInputSlippage;
                return (100 + maxSlippage)/100
            },
            minAmount() {
            if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) return 1e-8
                return 0.01
            },
            calcFee() {
                let N_COINS = allabis[currentContract.currentContract].N_COINS
                return this.fee / 100 * N_COINS / (4 * (N_COINS -1))
            },
            gasPrice() {
                return gasPriceStore.state.gasPrice
            },
            gasPriceWei() {
                return gasPriceStore.state.gasPriceWei
            },
            unstakePercentageInvalid() {
                return BN(this.unstakepercentage).times(1e18).gt(BN(this.staked_balance).times(1.01))
            },
            unstakeAmount() {
                return this.toFixed(BN(this.unstakepercentage / 100).times(this.staked_balance / 1e18))
            },
            showInfApprovalZap() {
                if(!this.withdrawc && this.currentPool != 'susdv2')
                    return true
                if(this.share != '---' && ((this.to_currency !== null && this.to_currency < 10) || this.to_currency == 10)) {
                    return true
                }
            },
        },
        mounted() {
        	if(['susdv2', 'sbtc', 'y', 'iearn'].includes(this.currentPool)) {
        		this.showstaked = true
        	}
        	this.$watch(() => this.showstaked, this.handle_change_share)
        	if(currentContract.currentContract == 'susd') this.withdrawc = true;
        	this.setInputStyles(true)
            if(currentContract.initializedContracts) this.mounted();
        },
        methods: {
            async mounted() {
            	if(['susdv2', 'tbtc', 'ren', 'sbtc'].includes(this.currentPool)) {
            		this.withdrawc = true;
            		this.to_currency = null
            	}
                else
                    this.withdrawc = false
            	currentContract.showSlippage = false;
        		currentContract.slippage = 0;
                let curveRewards = currentContract.curveRewards
                let allowance = BN(await currentContract.swap_token.methods.allowance(currentContract.default_account || '0x0000000000000000000000000000000000000000', currentContract.deposit_zap._address).call())
                if(allowance.lte(currentContract.max_allowance.div(BN(2))))
                    this.inf_approval = false
                if(['susdv2', 'y', 'iearn'].includes(this.currentPool)) {
                    this.pendingSNXRewards = await curveRewards.methods.earned(this.default_account).call()
                    console.log(this.pendingSNXRewards, "PENDING SNX REWARDS")
                }
                if(['sbtc'].includes(this.currentPool)) {
                    this.balancerPool = new currentContract.web3.eth.Contract(balancer_ABI, balancer_address)
                    window.balancerPool = this.balancerPool
                    let calls = [
                        [curveRewards._address, curveRewards.methods.earned(this.default_account).encodeABI()],
                        [this.balancerPool._address, this.balancerPool.methods.totalSupply().encodeABI()],
                        [this.balancerPool._address, this.balancerPool.methods.getBalance('0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f').encodeABI()],
                        [this.balancerPool._address, this.balancerPool.methods.getBalance('0x408e41876cccdc0f92210600ef50372656052a38').encodeABI()],
                        [this.balancerPool._address, this.balancerPool.methods.balanceOf(currentContract.default_account).encodeABI()],
                    ]
                    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
                    let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))

                    this.pendingBALRewards = decoded[0]
                    this.pendingSNXRewards = decoded[0] * decoded[2] / decoded[1]
                    this.pendingRENRewards = decoded[0] * decoded[3] / decoded[1]

                    this.withdrawBALPool = decoded[4]
                    this.withdrawSNXPool = decoded[4] * decoded[2] / decoded[1]
                    this.withdrawRENPool = decoded[4] * decoded[3] / decoded[1]

                }
                if(['y','iearn'].includes(this.currentPool)) {
                    this.withdrawADAI = await currentContract.aRewards.methods.claimable(currentContract.default_account).call()
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
            		if(this.withdrawc == false) this.withdrawc = true
            		this.to_currency = null

            		currentContract.slippage = 0
            		currentContract.showSlippage = false
            	}
            	else {
            		this.withdrawc = false
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
		    	if(['susdv2', 'sbtc','y','iearn'].includes(this.currentPool)) calls.push([currentContract.curveRewards._address, currentContract.curveRewards.methods.balanceOf(currentContract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
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
                console.log(decoded[decoded.length-2])
                if(['susdv2', 'sbtc','y','iearn'].includes(this.currentPool)) this.staked_balance = BN(decoded[decoded.length-2])
                else this.staked_balance = BN(0)
                this.unstakepercentage = this.toFixed(this.staked_balance.div(1e18))
				this.token_supply = +decoded[decoded.length-1]
			},
			async handle_change_amounts(i, event) {
                this.showWithdrawSlippage = true;
                this.show_nobalance = false
				if(event) {
					this.inputs[i] = event.target.value
					return;
				}
				if(this.currentPool == 'susd') return;
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
		            if(availableAmount.gt(maxAvailableAmount.plus(BN(this.staked_balance)))) {
		                this.setAllInputBackground('red')
		            }
		            else {
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
			    	min_amounts[i] = BN(0.98).times(this.share/100).times(BN(this.balances[i]))
					if(!this.withdrawc) {
						min_amounts[i] = min_amounts[i]
										.times(allabis[currentContract.currentContract].coin_precisions[i])
										.times(currentContract.c_rates[i])
					}
					min_amounts[i] = min_amounts[i].times(BN(this.token_balance))
						            .div(BN(this.token_supply))
						            .toFixed(0,1)
				}
				return min_amounts;
			},
            async claim_SNX(claim_bpt_only = false, unstake = true) {
                this.show_loading = true
                this.waitingMessage = `Please confirm claiming ${(this.pendingSNXRewards / 1e18).toFixed(2)} 
                    ${['y', 'iearn'].includes(this.currentPool) ? 'YFI' : 'SNX'}`
                if(this.currentPool == 'sbtc')
                    this.waitingMessage += ` and ${(this.pendingRENRewards / 1e18).toFixed(2)} REN`
                
                var { dismiss } = notifyNotification(this.waitingMessage)
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
                this.estimateGas = 200000

                let earned = await currentContract.curveRewards.methods.earned(currentContract.default_account).call()

                if(earned > 0 && unstake) {
                    await new Promise((resolve, reject) => {
                        currentContract.curveRewards.methods.getReward()
                            .send({
                                from: currentContract.default_account,
                                gasPrice: this.gasPriceWei,
                                gas: 400000,
                            })
                            .once('transactionHash', hash => {
                                dismiss()
                                notifyHandler(hash)
                            })
                            .on('receipt', () => {
                                this.pendingSNXRewards = 0
                                resolve()
                            })
                            .catch(err => {
                                errorStore.handleError(err)
                                dismiss()
                                reject(err)
                            })
                    })
                }

                if(this.currentPool == 'sbtc' && (!claim_bpt_only || !unstake)) {
                    this.estimateGas = 300000

                    try {
                        let balancerBalance = BN(await this.balancerPool.methods.balanceOf(currentContract.default_account).call())
                        await this.balancerPool.methods.exitPool(balancerBalance.toFixed(0,1), ['0', '0'])
                        .send({
                            from: currentContract.default_account,
                            gasPrice: this.gasPriceWei,
                            gas: 600000,
                        })
                        .once('transactionHash', hash => {
                            dismiss()
                            notifyHandler(hash)
                        })
                    }
                    catch(err) {
                        console.log(err)
                        dismiss()
                        errorStore.handleError(err)
                    }
                }

                this.show_loading = false

            },
            // async claimYFIaDAI() {
            //     this.estimateGas = 50000

            //     var { dismiss } = notifyNotification('Please confirm approval to burn YFI for aDAI')

            //     try {

            //         let balance = BN(await currentContract.aRewards.methods.claimable(currentContract.default_account).call())
            //         let yFI = new currentContract.web3.eth.Contract(ERC20_abi, '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e')
            //         await common.approveAmount(yFI, balance, currentContract.default_account, currentContract.aRewards._address)
            //         dismiss()

            //         var { dismiss1 } = notifyNotification('Please confirm burning YFI to aDAI transaction')

            //         await currentContract.aRewards.methods.claim(balance.toFixed(0,1))
            //         .send({
            //             from: currentContract.default_account,
            //             gasPrice: this.gasPriceWei,
            //             gas: 125000,
            //         })
            //         .once('transactionHash', hash => {
            //             dismiss1()
            //             notifyHandler(hash)
            //         })
            //         .on('error', err => {
            //             dismiss1()
            //             throw err
            //         })
            //     }
            //     catch(err) {
            //         console.log(err)
            //         dismiss()
            //         errorStore.handleError(err)
            //     }
            // },
            async unstakeStaked() {
                let amount = BN(this.unstakepercentage).times(1e18)
                this.unstake(amount, false, true)
            },
			async unstake(amount, exit = false, unstake_only = false) {
                if(unstake_only)
                    this.waitingMessage = `
                        Please confirm unstaking ${this.toFixed(amount.div(BN(1e18)))} tokens
                    `
                else 
                    this.waitingMessage = `
                    Unstaking ${this.toFixed(amount.div(BN(1e18)))} tokens for withdrawal.
                    <br>
                    A bit more tokens are needed to unstake to ensure that withdrawal is successful.
                    You'll see them in your unstaked balance afterwards.
                        
                `;
                
                var { dismiss } = notifyNotification(this.waitingMessage)

                let stakedAmount = BN(await currentContract.curveRewards.methods.balanceOf(currentContract.default_account).call())

                if(stakedAmount.lt(amount))
                    amount = stakedAmount

                try {
    				await new Promise((resolve, reject) => {
    					currentContract.curveRewards.methods.withdraw(amount.toFixed(0,1))
    						.send({
    							from: currentContract.default_account,
    							gasPrice: this.gasPriceWei,
                                gas: 125000,
    						})
    						.once('transactionHash', hash => {
                                this.waitingMessage = 'Waiting for unstake transaction to confirm'
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
                        //if(['y', 'iearn'].includes(this.currentPool))
                            //this.showModal = true
                    }
                }
                catch(err) {
                    console.log(err)
                    errorStore.handleError(err)
                    this.waitingMessage = ''
                    this.show_loading = false;
                    throw err
                }
                this.waitingMessage = ''
                this.show_loading = false
			},
            setLoadingAction(val) {
                this.loadingAction = val;
                setTimeout(() => this.loadingAction = false, 500)
            },
			async handle_remove_liquidity(unstake = false, unstake_only = false, exit = false) {
                await common.update_fee_info();
                await this.update_balances();

                let actionType = unstake == false ? 1 : 2
                if(this.loadingAction == actionType) return;
                this.setLoadingAction(actionType)
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
                this.estimateGas = 0;
                if(['susdv2', 'sbtc','y','earn'].includes(this.currentPool)) {
                    if(unstake_only) {
                        this.estimateGas = 125000
                        if(this.currentPool == 'sbtc') this.estimateGas += 300000
                    }
                    else {
                        let nonZeroInputs = this.inputs.filter(Number).length
                        if(this.share == '---') {
                            this.estimateGas = contractGas.withdraw[this.currentPool].imbalance(nonZeroInputs) | 0
                        }
                        else if(this.to_currency !== null && this.to_currency < 10) {
                            this.estimateGas = contractGas.depositzap[this.currentPool].withdraw / 2
                        }
                        else {
                            this.estimateGas = contractGas.depositzap[this.currentPool].withdrawShare / 2
                        }
                    }
                }
                this.show_loading = true;
                let inOneCoin = currentContract.deposit_zap
                if(['tbtc','ren', 'sbtc'].includes(currentContract.currentContract)) inOneCoin = currentContract.swap

				let min_amounts = []
			    for (let i = 0; i < currentContract.N_COINS; i++) {
                    if(!this.inputs[i]) {
                        Vue.set(this.amounts, i, 0)
                        continue
                    }
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
                this.amounts = this.amounts.map(amount => amount || 0)
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
                    if((this.token_balance.lt(BN(token_amount)) || unstake) && ['susdv2', 'sbtc','y','iearn'].includes(this.currentPool)) {
                        let unstakeAmount = BN(token_amount).minus(BN(this.token_balance))
                        if(unstake) unstakeAmount = BN(token_amount) 
                        await this.unstake(unstakeAmount, unstake && !unstake_only, unstake_only)
                    }
                    if(unstake_only) return;
			        let nonZeroInputs = this.inputs.filter(Number).length
			        if(this.withdrawc || ['susdv2', 'sbtc'].includes(this.currentPool)) {
			        	let gas = contractGas.withdraw[this.currentPool].imbalance(nonZeroInputs) | 0
                        try {
                            this.waitingMessage = 'Please confirm withdrawal transaction'
                            var { dismiss } = notifyNotification(this.waitingMessage)

                            try {
                                this.estimateGas = await currentContract.swap.methods.remove_liquidity_imbalance(this.amounts, token_amount)
                                                    .estimateGas({
                                                        from: currentContract.default_account,
                                                        gasPrice: this.gasPriceWei,
                                                        gas: gas,
                                                    })
                            }
                            catch(err) {
                                this.estimateGas = gas / 2;
                            }
                            await helpers.setTimeoutPromise(100)
    			        	await currentContract.swap.methods.remove_liquidity_imbalance(this.amounts, token_amount).send({
    				        	from: currentContract.default_account, 
                                gasPrice: this.gasPriceWei,
                                gas: gas,
    				        }).once('transactionHash', hash => {
                                dismiss()
                                notifyHandler(hash)
                                this.waitingMessage = 'Waiting for withdrawal to confirm: no further action needed'
                            })
                        }
                        catch(err) {
                            console.error(err)
                            dismiss()
                            errorStore.handleError(err)
                            this.waitingMessage = ''
                            this.show_loading = false
                            throw err;
                        }
			    	}
			        else {
			        	let inputs = this.inputs;
                        inputs = inputs.map(v => v || 0)
			        	let amounts = this.inputs.map((v, i) => {
                            if(!v) v = 0
                            let maxDiff = BN(this.calc_balances[i]).minus(BN(v))
                            return this.calc_balances[i] > 0 && maxDiff.lte(BN(this.minAmount)) && maxDiff > 0 ? this.calc_balances[i].times(currentContract.coin_precisions[i]).toFixed(0, 1) : BN(v).times(currentContract.coin_precisions[i]).toFixed(0, 1)
                        })
                        amounts = amounts.map(amount => amount || 0)
                        let gas = contractGas.depositzap[this.currentPool].withdrawImbalance(nonZeroInputs) | 0
                        this.waitingMessage = `Please approve ${this.toFixed(token_amount / 1e18)} Curve LP tokens for withdrawal`
                        var { dismiss } = notifyNotification(this.waitingMessage)
                        try {
                            this.estimateGas = gas / (['compound', 'usdt'].includes(currentContract.currentContract) ? 1.5 : 2.5)
                            if(!['tbtc','ren','sbtc'].includes(currentContract.currentContract)) await common.ensure_allowance_zap_out(token_amount, undefined, undefined, this.inf_approvalamount)
                            dismiss()
                            this.waitingMessage = 'Please confirm withdrawal transaction'
                            var { dismiss } = notifyNotification(this.waitingMessage)
                            await helpers.setTimeoutPromise(100)
    			        	await inOneCoin.methods.remove_liquidity_imbalance(amounts, token_amount).send({
    				        	from: currentContract.default_account, 
                                gasPrice: this.gasPriceWei,
                                gas: gas,
    				        }).once('transactionHash', hash => {
                                dismiss()
                                notifyHandler(hash)
                                this.waitingMessage = 'Waiting for withdrawal to confirm: no further action needed'
                            })
                        }
                        catch(err) {
                            console.error(err)
                            dismiss()
                            errorStore.handleError(err)
                            this.waitingMessage = ''
                            this.show_loading = false;
                            throw err;
                        }
			        }
			    }
			    else {
                    let balance = BN(this.token_balance)
                    if(this.share == 100) balance = BN(await currentContract.swap_token.methods.balanceOf(currentContract.default_account).call());
                    if(this.showstaked) balance = balance.plus(this.staked_balance)
                    var amount = BN(this.share).div(BN(100)).times(balance)

                    if((this.token_balance.lt(amount) || unstake) && ['susdv2', 'sbtc', 'y', 'iearn'].includes(this.currentPool)) {
                        let unstakeAmount = BN(amount).minus(BN(this.token_balance))
                        if(unstake) unstakeAmount = BN(amount)
                        await this.unstake(unstakeAmount, unstake && !unstake_only, unstake_only)
                    }
                    if(unstake_only) return;
                    amount = amount.toFixed(0,1)
                    if(this.to_currency !== null && this.to_currency < 10) {
                        this.waitingMessage = `Please approve ${this.toFixed((amount / 1e18))} Curve LP tokens for withdrawal`
                        var { dismiss } = notifyNotification(this.waitingMessage)
                        this.estimateGas = contractGas.depositzap[this.currentPool].withdraw / 2
                        if(!['tbtc','ren','sbtc'].includes(currentContract.currentContract)) await common.ensure_allowance_zap_out(amount, undefined, undefined, this.inf_approval)
                        dismiss()
                        let min_amount;
                        try {
                            min_amount = await inOneCoin.methods.calc_withdraw_one_coin(amount, this.to_currency).call();
                            min_amount = BN(min_amount).times(BN(1).minus(this.calcFee))
                        }
                        catch(err) {
                            console.error(err)
                            this.show_nobalance = true;
                            this.show_nobalance_i = this.to_currency;
                        }
                        this.waitingMessage = 'Please confirm withdrawal transaction'
                        var { dismiss } = notifyNotification(this.waitingMessage)
                        let args = [BN(amount).toFixed(0,1), this.to_currency, BN(min_amount).times(BN(1).div(BN(this.getMaxSlippage))).toFixed(0, 1)]
                        if(!['tbtc','ren','sbtc'].includes(currentContract.currentContract)) args.push(this.donate_dust)
                        await helpers.setTimeoutPromise(100)
			        	try {
                            await inOneCoin.methods
			        		.remove_liquidity_one_coin(...args)
			        		.send({
			        			from: currentContract.default_account,
			        			gasPrice: this.gasPriceWei,
                                gas: contractGas.depositzap[this.currentPool].withdraw | 0,
			        		}).once('transactionHash', hash => {
                                dismiss()
                                notifyHandler(hash)
                                this.waitingMessage = `Waiting for withdrawal 
                                <a href='https://etherscan.io/tx/${hash}'>transaction</a>
                                to confirm: no further action needed`
                            })
                        }
                        catch(err) {
                            console.error(err)
                            dismiss()
                            errorStore.handleError(err)
                        }
			        }
			        else if(this.to_currency == 10) {
                        this.waitingMessage = `Please approve ${this.toFixed(amount / 1e18)} Curve LP tokens for withdrawal`
                        var { dismiss } = notifyNotification(this.waitingMessage)
                        try {
                            this.estimateGas = contractGas.depositzap[this.currentPool].withdrawShare / 2
                            if(!['tbtc','ren','sbtc'].includes(currentContract.currentContract)) await common.ensure_allowance_zap_out(amount, undefined, undefined, this.inf_approval)
                            dismiss()
                            this.waitingMessage = 'Please confirm withdrawal transaction'
                            var { dismiss } = notifyNotification(this.waitingMessage)
                            let min_amounts = await this.getMinAmounts();
                            await helpers.setTimeoutPromise(100)
    			        	await inOneCoin.methods.remove_liquidity(amount, min_amounts)
    			        	.send({
                                from: currentContract.default_account, 
                                gasPrice: this.gasPriceWei,
                                gas: contractGas.depositzap[this.currentPool].withdrawShare,
                            })
                            .once('transactionHash', hash => {
                                dismiss()
                                notifyHandler(hash)
                                this.waitingMessage = `Waiting for withdrawal 
                                <a href='https://etherscan.io/tx/${hash}'>transaction</a>
                                to confirm: no further action needed`
                            });
                        }
                        catch(err) {
                            console.error(err)
                            dismiss()
                            errorStore.handleError(err)
                            this.waitingMessage = ''
                            this.show_loading = false
                            throw err;
                        }
			        }
			        else {
                        try {
    			        	let min_amounts = await this.getMinAmounts();
                            this.waitingMessage = 'Please confirm withdrawal transaction'
                            var { dismiss } = notifyNotification(this.waitingMessage)
                            try {
                                this.estimateGas = await currentContract.swap.methods.remove_liquidity(amount, min_amounts)
                                                    .estimateGas({
                                                        from: currentContract.default_account,
                                                        gasPrice: this.gasPriceWei,
                                                        gas: 600000,
                                                    })
                            }
                            catch(err) {
                                this.estimateGas = 600000
                            }
                            await helpers.setTimeoutPromise(100)
    			        	await currentContract.swap.methods.remove_liquidity(amount, min_amounts).send({
                                from: currentContract.default_account, 
                                gasPrice: this.gasPriceWei,
                                gas: 600000,
                            })
                            .once('transactionHash', hash => {
                                dismiss()
                                notifyHandler(hash)
                                this.waitingMessage = `Waiting for withdrawal 
                                <a href='https://etherscan.io/tx/${hash}'>transaction</a>
                                to confirm: no further action needed`
                            });
                        }
                        catch(err) {
                            console.error(err)
                            dismiss()
                            errorStore.handleError(err)
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
            async migrateUSDT() {
                this.withdrawc = false;
                let amounts = this.inputs;
                amounts.push(0);
                this.handle_remove_liquidity()
                await init(currentContract.contracts.pax)

                amounts = amounts.map((v, i)=>BN(v).times(allabis.pax.coin_precisions[i]).toFixed(0))
                this.waitingMessage = 'Please approve spending your coins'
                var { dismiss } = notifyNotification(this.waitingMessage)
                await common.ensure_allowance(amounts, true, 'pax', 3)
                dismiss()
                let pax_deposit_zap = new currentContract.web3.eth.Contract(allabis.pax.deposit_abi, allabis.pax.deposit_address)
                let token_amount = await currentContract.contracts.pax.swap.methods.calc_token_amount(amounts, true).call();
                token_amount = BN(Math.floor(token_amount * 0.99).toString()).toFixed(0,1);
                this.waitingMessage = 'Please confirm deposit to PAX pool transaction'
                var { dismiss } = notifyNotification(this.waitingMessage)
                let nonZeroInputs = amounts.filter(Number).length
                let gas = contractGas.depositzap.pax.deposit(nonZeroInputs) | 0
                await helpers.setTimeoutPromise(100)
                try {
                    let add_liquidity = pax_deposit_zap.methods.add_liquidity(amounts, token_amount).send({
                        from: currentContract.default_account,
                        gas: gas,
                    })
                    .once('transactionHash', hash => {
                        dismiss()
                        notifyHandler(hash)
                        this.waitingMessage = `Waiting for deposit to PAX transaction to confirm no further action required`
                    })
                }
                catch(err) {
                    console.error(err)
                    errorStore.handleError(err)
                }
            }
        },

    }
</script>

<style>
	#remove-liquidity, #remove-liquidity-unstake, #claim-snx, #claim-bpt, #claim-snxbpt, #claim-adai {
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
    #withdraw_buttons button:nth-child(n+3) {
        margin-top: 0.6em;
    }
    .hoverpointer {
        cursor: pointer;
    }
    .modal-content {
        text-align: center;
        padding: 0;
        border: none;
        width: 280px;
    }
    .modal-content fieldset {
        color: white;
        font-weight: bolder;
        border: 6px double white;
        padding-block-start: 1em;
        padding-block-end: 1em;
    }
    .modal-content button {
        margin-top: 0.6em;
        padding: 0 2em;
    }
    .legend2 {
      position: absolute;
      top: 0;
      left: 2em;
      background: #c0c0c0;
      line-height:1.2em;
    }
    .greentext {
        color: green;
    }
    .legend2 .greentext {
        display: inline-block;
        transform: translate3d(0,-0.1em,10em);
    }
    .legend2 .greentext:hover {
        transform: none;
    }
    .warningtext {
        color: darkred;
    }
    .buttoncancel {
        margin-left: 1em;
        background: gray;
        box-shadow: none;
        border: none;
    }
    .modaltext {
        color: black;
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
    #unstakestaked {
        margin-left: 1em;
    }
    #unstakepercentage {
        width: 5.1em;
    }
    #stakedbalance span {
        cursor: pointer;
        border-bottom: 1px solid black;
        border-bottom-style: dashed;
    }
    label[for='unstakepercentage'] {
        margin-right: 1em;
    }
    #unstakepercentage.invalid {
        background-color: red;
    }
    #stakedbalance + div {
        margin-top: 1em;
    }
</style>
