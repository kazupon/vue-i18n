<template>
	<div>
        <div class="">
            <div class='exchange'>
                <div class='exchangefields'>
                    <fieldset class='item'>
                        <legend>From:</legend>
                        <div class='maxbalance' @click='set_max_balance'>
                            Max: 
                            <span 
                                v-show="(currentPool == 'susdv2' && from_currency == 3 || currentPool == 'sbtc' && from_currency == 2)
                                         && maxBalanceText != '0.00'"
                            >
                                {{maxSynthText}}/
                            </span>
                            <span>{{maxBalanceText}}</span>
                            <span v-show='susdWaitingPeriod' class='susd-waiting-period'>
                                <span class='tooltip'>
                                    <img src='@/assets/clock-regular.svg' class='icon small'>
                                    <span class='tooltiptext'>
                                        Cannot transfer during waiting period. {{ (susdWaitingPeriodTime).toFixed(0) }} secs left.
                                    </span>
                                </span>
                            </span>
                            <span v-show="(currentPool == 'susdv2' && from_currency == 3 || currentPool == 'sbtc' && from_currency == 2)
                                            && maxBalanceText != '0.00'" 
                                class='tooltip'> [?]
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
                                <p class='actualvalue' v-show='swapwrapped'>
                                    ≈ {{toFixed(actualFromValue)}} {{Object.keys(currencies)[this.from_currency] | capitalize}}
                                </p>
                                <p class='actualvalue' v-show="['sbtc', 'ren'].includes(currentPool)">
                                    ≈ {{ actualFromValue }}$
                                </p>
                            </li>
                            <li class='coins' v-for='(currency, i) in Object.keys(currencies)'>
                                <input type="radio" :id="'from_cur_'+i" name="from_cur" :value='i' v-model='from_currency'>
                                <label :for="'from_cur_'+i">
                                    <img 
                                        :class="{'token-icon': true, [currency+'-icon']: true, 'y': swapwrapped}" 
                                        :src='getTokenIcon(currency)'>
                                    <span v-show="!swapwrapped && !['tbtc', 'ren', 'sbtc'].includes(currentPool)">{{currency | capitalize}}</span>
                                    <span v-show="swapwrapped || ['tbtc', 'ren', 'sbtc'].includes(currentPool)">{{currencies[currency]}}</span>
                                </label>
                            </label>
                            </li>
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
                                v-model='toInput'>
                                <p class='actualvalue' v-show='swapwrapped'>
                                    ≈ {{toFixed(actualToValue)}} {{Object.keys(currencies)[this.to_currency] | capitalize}}
                                </p>
                                <p class='actualvalue' v-show="['ren', 'sbtc'].includes(currentPool)">
                                    ≈ {{ actualToValue }}$
                                </p>
                            </li>
                            <li class='coins' v-for='(currency, i) in Object.keys(currencies)'>
                                <input type="radio" :id="'to_cur_'+i" name="to_cur" :value='i' v-model='to_currency'>
                                <label :for="'to_cur_'+i">
                                    <img 
                                        :class="{'token-icon': true, [currency+'-icon']: true, 'y': swapwrapped}" 
                                        :src='getTokenIcon(currency)'>
                                    <span v-show="!swapwrapped && !['tbtc', 'ren'].includes(currentPool)">{{currency | capitalize}}</span>
                                    <span v-show="swapwrapped || ['tbtc', 'ren'].includes(currentPool)">{{currencies[currency]}}</span>
                                </label>
                            </label>
                            </li>
                        </ul>
                    </fieldset>
                </div>
                <p class='exchange-rate'>
                    Exchange rate
                    <span @click='swapExchangeRate' class='clickable underline'>
                        {{getPair(swaprate)}}
                        <img src='@/assets/sync-solid.svg' class='swaprates-icon'>
                    </span> (including fees): 
                    <span id="exchange-rate" @click='swapExchangeRate' class='clickable'>
                        {{exchangeRateSwapped}}
                    </span>
                </p>
                <ul>
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
                    <li>
                        <input id='swapw' type='checkbox' name='swapw' v-model = 'swapwrapped'>
                        <label for='swapw' v-show = "!['susdv2', 'tbtc', 'ren', 'sbtc'].includes(currentPool)">Swap wrapped</label>
                    </li>
                </ul>
                <div>
                    <button class='simplebutton advancedoptions' @click='showadvancedoptions = !showadvancedoptions'>
                        Advanced options
                        <span v-show='!showadvancedoptions'>▼</span>
                        <span v-show='showadvancedoptions'>▲</span>
                    </button>
                    <div v-show='showadvancedoptions'>
                        <fieldset>
                            <legend>Advanced options:</legend>
                            <div id='max_slippage'><span>Max slippage:</span> 
                                <input id="slippage05" type="radio" name="slippage" value='0.005' @click='maxSlippage = 0.5; customSlippageDisabled = true'>
                                <label for="slippage05">0.5%</label>

                                <input id="slippage1" type="radio" name="slippage" checked value='0.01' @click='maxSlippage = 1; customSlippageDisabled = true'>
                                <label for="slippage1">1%</label>

                                <input id="custom_slippage" type="radio" name="slippage" value='-' @click='customSlippageDisabled = false'>
                                <label for="custom_slippage" @click='customSlippageDisabled = false'>
                                    <input type="text" id="custom_slippage_input" :disabled='customSlippageDisabled' name="custom_slippage_input" v-model='maxInputSlippage'> %
                                </label>
                                <span class='tooltip' v-show='showSlippageTooLow'>
                                    <img class='icon small hoverpointer warning' :src="publicPath + 'exclamation-circle-solid.svg'">
                                    <span class='tooltiptext'>
                                        Max slippage value is likely too low and the transaction may fail
                                    </span>
                                </span>
                            </div>
                            <gas-price></gas-price>
                        </fieldset>
                    </div>
                </div>
                <p class='simple-error' v-show="exchangeRate<=0.98 && (to_currency > 0 && !['ren', 'sbtc'].includes(currentPool))">
                    Warning! Exchange rate is too low!
                </p>
                <p class='simple-error' v-show="exchangeRate<=0.98 && ['ren', 'sbtc'].includes(currentPool)">
                    Warning! Exchange rate is too low!
                </p>
                <p class='simple-error' v-show="exchangeRate<=0.95 && (to_currency == 0 && !['ren', 'sbtc'].includes(currentPool))">
                    Warning! Exchange rate is too low!
                </p>
                <p class='trade-buttons' v-show="['ren', 'sbtc'].includes(currentPool)">
                    <a href='https://bridge.renproject.io/'>Mint/redeem renBTC</a>
                </p>
                <!-- <p class='simple-error' id='no-balance-synth' v-show='notEnoughBalanceSynth'>
                    Max balance you can use is {{ (+maxSynthBalance).toFixed(2) }}
                </p> -->
                <p class='trade-buttons'>
                    <button id="trade" @click='handle_trade'>
                        Sell <span class='loading line' v-show='loadingAction'></span>
                    </button>
                </p>
                <div class='info-message gentle-message waiting-message' v-show='show_loading'>
                    <span v-html='waitingMessage'></span>
                    <span class='loading line'></span>
                </div>
                <p class='simple-error' id='no-balance' v-show='selldisabled'>
                    Not enough balance for 
                    <span v-show='!swapwrapped'>{{Object.keys(currencies)[from_currency] | capitalize}}</span>
                    <span v-show='swapwrapped'>{{Object.values(currencies)[from_currency]}}</span>. <span>Swap is not available.</span>
                </p>
                <div class='simple-error pulse' v-show="susdWaitingPeriod">
                    Cannot transfer {{ currentPool == 'susdv2' ? 'sUSD' : 'sBTC' }} during waiting period. {{ (susdWaitingPeriodTime).toFixed(0) }} secs left.
                </div>
                <div class='info-message gentle-message' v-show='estimateGas'>
                    Estimated tx cost: {{ (estimateGas * gasPrice / 1e9 * ethPrice).toFixed(2) }}$
                </div>

            </div>
        </div>
</div>
</template>

<script>
    import * as common from '../../utils/common.js'
    import { notify, notifyHandler, notifyNotification } from '../../init'
    import { getters, contract as currentContract, gas as contractGas} from '../../contract'
    import * as helpers from '../../utils/helpers'
    import allabis from '../../allabis'
    import * as priceStore from '../common/priceStore'

    import * as gasPriceStore from '../common/gasPriceStore'
    import GasPrice from '../common/GasPrice.vue'

    import * as errorStore from '../common/errorStore'

    import BigNumber from 'bignumber.js'

    let { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic')

    var cBN = (val) => new BigNumber(val);


	export default {

        components: {
            GasPrice,
        },

        data: () => ({
            disabled: true,
            from_currency: 0,
            to_currency: 1,
            inf_approval: true,
            fromInput: '1.00',
            toInput: 0,
            updateTimer: null,
            btcPrice: null,
            maxBalance: -1,
            maxSynthBalance: -1,
            susdWaitingPeriod: false,
            susdWaitingPeriodTime: 0,
            maxBalanceText: 0,
            maxSynthText: 0,
            promise: helpers.makeCancelable(Promise.resolve()),
            exchangeRate: 'Not available',
            swaprate: false,
            bgColor: '#505070',
            fromBgColor: 'blue',
            maxSlippage: 1,
            maxInputSlippage: '',
            customSlippageDisabled: true,
            swapwrapped: false,
            coins: [],
            c_rates: [],
            get showadvancedoptions() {
                return localStorage.getItem('advancedoptions') === 'true' 
                    || +this.fromInput > 5000 || (['ren', 'sbtc'].includes(currentContract.currentContract) && +this.fromInput > 0.5)
            },
            set showadvancedoptions(val) {
                console.log(val, "VAL TO SET")
                localStorage.setItem('advancedoptions', val)
            },
            show_loading: false,
            waitingMessage: '',
            userInteracted: false,
            
            estimateGas: 0,
            ethPrice: 0,
            icontype: '',
            loadingAction: false,

            interval: null,
        }),
        async created() {
            this.$watch(()=>currentContract.default_account, (val, oldval) => {
                if(!val || !oldval) return;
                if(val.toLowerCase() != oldval.toLowerCase()) this.mounted();
            })
            this.$watch(()=>currentContract.initializedContracts, val => {
                if(val) this.mounted();
                console.timeEnd('initswap')
            })
        },
        watch: {
            from_currency(val, oldval) {
                if(val == this.to_currency) {
                    this.to_currency = oldval;
                }
                //this.swapExchangeRate()
                this.from_cur_handler()
            },
            to_currency(val, oldval) {
                //this.swapExchangeRate()
                this.to_cur_handler()
            },
            swapwrapped() {
                this.mounted()
            },
            maxBalance(val) {
                let amount = val / this.precisions[this.from_currency]

                this.maxBalanceText = currentContract.default_account ? this.toFixed(amount) : 0;
            },
            maxSynthBalance(val) {
                if(isNaN(val)) return '0.00';
                this.maxSynthText = this.toFixed(val)
            },
            triggerEstimateGas: {
                handler: async function triggerEstimateGas() {
                    let i = this.from_currency
                    let j = this.to_currency
                    let promises = await Promise.all([helpers.getETHPrice()])
                    this.ethPrice = promises[0]
                    this.estimateGas = this.swapwrapped ? 
                                            contractGas.swap[this.currentPool].exchange(i, j) / 2 : contractGas.swap[this.currentPool].exchange_underlying(i, j) / 2
                },
                immediate: true
            },
            fromInput() {
                this.userInteracted = true
            },
        },
        computed: {
            precisions() {
                if(this.swapwrapped) return allabis[currentContract.currentContract].wrapped_precisions;
                return allabis[currentContract.currentContract].coin_precisions
            },
            actualFromValue() {
                if(!this.swapwrapped && !['ren','sbtc'].includes(this.currentPool)) return;
                if(['ren', 'sbtc'].includes(this.currentPool)) return (this.fromInput * this.btcPrice).toFixed(2)
                return (this.fromInput * this.c_rates[this.from_currency] * this.toFixed(this.precisions[this.from_currency]))
            },
            actualToValue() {
                if(!this.swapwrapped && !['ren', 'sbtc'].includes(this.currentPool)) return;
                if(['ren', 'sbtc'].includes(this.currentPool)) return (this.toInput * this.btcPrice).toFixed(2)
                return (this.toInput * this.c_rates[this.to_currency] * this.toFixed(this.precisions[this.to_currency]))
            },
            ...getters,
            minAmount() {
                if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) return 1e-8
                return 0.01
            },
            selldisabled() {
                return this.maxBalance != -1 && +this.fromInput > +this.maxBalance / this.precisions[this.from_currency] && this.userInteracted
            },
            notEnoughBalanceSynth() {
                return this.currentPool == 'susdv2' && this.from_currency == 3 && cBN(this.fromInput).gt(cBN(this.maxSynthBalance))
            },
            exchangeRateSwapped() {
                if(this.swaprate)
                    return (1 / this.exchangeRate).toFixed(4)
                else
                    return this.exchangeRate
            },
            publicPath() {
                return process.env.BASE_URL
            },
            gasPrice() {
                return gasPriceStore.state.gasPrice
            },
            gasPriceWei() {
                return gasPriceStore.state.gasPriceWei
            },
            triggerEstimateGas() {
                console.log("TRIGGER ESTIMATE GAS")
                return this.swapwrapped, this.from_currency, this.to_currency, Date.now()
            },
            showSlippageTooLow() {
                return this.maxInputSlippage != '' && +this.maxInputSlippage < 0.2
            },
        },
        mounted() {
            if(currentContract.initializedContracts) this.mounted();
        },
        methods: { 
            async mounted() {
                console.log(currentContract.default_account)
                if(['ren', 'sbtc'].includes(currentContract.currentContract)) this.btcPrice = await priceStore.getBTCPrice()
                if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) this.fromInput = '0.0001'
                this.c_rates = currentContract.c_rates
                this.coins = currentContract.underlying_coins
                if(this.swapwrapped) {
                    this.coins = currentContract.coins
                }
                this.disabled = false;
                this.from_cur_handler()

            },
            getTokenIcon(token) {
                return helpers.getTokenIcon(token, this.swapwrapped, this.currentPool)
            },
            getPair(inverse = false) {
                let from = !this.swapwrapped ? Object.keys(this.currencies)[this.from_currency] : Object.values(this.currencies)[this.from_currency]
                let to = !this.swapwrapped ? Object.keys(this.currencies)[this.to_currency] : Object.values(this.currencies)[this.to_currency]
                from = helpers.capitalize(from)
                to = helpers.capitalize(to)
                if(!inverse) return from + '/' + to
                if(inverse) return to + '/' + from
            },
            toFixed(num) {
                if(num == '' || num == undefined || +num == 0) return '0.00'
                if(!BigNumber.isBigNumber(num)) num = +num
                if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) return num.toFixed(8)
                return num.toFixed(2)
            },
            getCurrency(i) {
                if(!this.swapwrapped && !['susdv2', 'tbtc', 'ren', 'sbtc'].includes(this.currentPool)) return (Object.keys(this.currencies)[i]).toUpperCase()
                return Object.values(this.currencies)[i] 
            },
            swapInputs() {
                //look no temp variable! :D
                [this.fromInput, this.toInput] = [this.toInput, this.fromInput]
                this.from_currency = this.to_currency
                this.from_cur_handler()
            },
            swapExchangeRate() {
                if(isNaN(this.exchangeRate)) return;
                this.swaprate = !this.swaprate
            },
            async set_to_amount() {
                this.promise.cancel()
                let promise = this.setAmountPromise()
                this.interval && !this.interval.stopped && clearIntervalAsync(this.interval)
                if(typeof (+this.fromInput) === 'number' && !isNaN(+this.fromInput))
                    this.interval = setIntervalAsync(this.set_to_amount, 3000)
                try {
                    let [dy, dy_, dx_, balance] = await promise
                    this.toInput = dy;
                    this.exchangeRate = (dy_ / dx_).toFixed(4);
                    if(this.swapwrapped) {
                        let cdy_ = (dy_ * this.c_rates[this.to_currency] * allabis[currentContract.currentContract].wrapped_precisions[this.to_currency])
                        let cdx_ = (dx_ * this.c_rates[this.from_currency] * allabis[currentContract.currentContract].wrapped_precisions[this.from_currency])
                        this.exchangeRate = (cdy_ / cdx_).toFixed(4)
                    }
                    if(this.exchangeRate <= 0.98) this.bgColor = 'red'
                    else this.bgColor= '#505070'
                    if(isNaN(this.exchangeRate)) this.exchangeRate = "Not available"
                    let amount = Math.floor(
                            100 * parseFloat(balance) / this.precisions[this.to_currency]
                        ) / 100

                    this.disabled = false;
                }
                catch(err) {
                    console.error(err)
                    this.disabled = true
                }
                finally {
                    this.set_from_amount(this.from_currency);
                }
                this.promise = helpers.makeCancelable(promise)
            },
            async from_cur_handler() {
                let currentAllowance = cBN(await this.coins[this.from_currency].methods.allowance(currentContract.default_account, currentContract.swap_address).call())
                let maxAllowance = currentContract.max_allowance.div(cBN(2))
                if (currentAllowance.gt(maxAllowance))
                    this.inf_approval = true;
                else
                    this.inf_approval = false;

                await this.set_from_amount(this.from_currency);
                await this.set_to_amount();
            },
            async to_cur_handler() {
                if (this.to_currency == this.from_currency) {
                    if (this.to_currency == 0) {
                        this.from_currency = 1;
                    } else {
                        this.from_currency = 0;
                    }
                    await this.set_from_amount(this.from_currency);
                }
                await this.set_to_amount();
            },
            async set_max_balance() {
                let balance
                if(this.currentPool == 'susdv2' && this.from_currency == 3 ||
                    this.currentPool == 'sbtc' && this.from_currency == 2) {
                    balance = await this.coins[this.from_currency].methods.transferableSynths(this.default_account).call();
                    if(this.susdWaitingPeriod) balance = 0
                }
                else
                    balance = await this.coins[this.from_currency].methods.balanceOf(currentContract.default_account).call();
                let amount = cBN(balance).div(this.precisions[this.from_currency]).toFixed()
                this.fromInput = currentContract.default_account ? amount : 0
                await this.set_to_amount();
            },
            async highlight_input() {
                let balanceCall = this.coins[this.from_currency].methods.balanceOf(this.default_account).call()
                let balance = parseFloat(await this.coins[this.from_currency].methods.balanceOf(this.default_account).call()) /
                        this.precisions[this.from_currency];
                if (this.fromInput > balance)
                    this.fromBgColor = 'red'
                else
                    this.fromBgColor = 'blue'
            },
            async set_from_amount(i) {
                let balanceCalls = [[this.coins[i]._address, this.coins[i].methods.balanceOf(this.default_account).encodeABI()]]
                if(this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2) {
                    balanceCalls.push([this.coins[i]._address, this.coins[i].methods.transferableSynths(this.default_account).encodeABI()])
                    let currencyKey = '0x7355534400000000000000000000000000000000000000000000000000000000'
                    if(this.currentPool == 'sbtc') 
                        currencyKey = '0x7342544300000000000000000000000000000000000000000000000000000000'
                    balanceCalls.push([
                        currentContract.snxExchanger._address, 
                        currentContract.snxExchanger.methods
                        .maxSecsLeftInWaitingPeriod(currentContract.default_account, currencyKey)
                        .encodeABI()
                    ])
                }
                let aggcalls = await currentContract.multicall.methods.aggregate(balanceCalls).call()
                let balances = aggcalls[1].map(hex => web3.eth.abi.decodeParameter('uint256', hex))
                let amounts = balances.map(balance => currentContract.default_account ? balance : 0)
                this.maxBalance = amounts[0]
                let highlight_red = this.fromInput > this.maxBalance / this.precisions[this.from_currency]
                if(this.currentPool == 'susdv2' && i == 3 || this.currentPool == 'sbtc' && i == 2) {
                    this.maxSynthBalance = cBN(amounts[1]).div(1e18).toFixed()
                    this.susdWaitingPeriod = (+amounts[2] != 0)
                    this.susdWaitingPeriodTime = +amounts[2]
                    console.log(this.maxSynthBalance, "MAX SYNTH BALANCE", this.susdWaitingPeriod, "SUSD WAITING PERIOD")
                    highlight_red = this.fromInput > this.maxSynthBalance
                    if(this.susdWaitingPeriod) highlight_red = true
                }
                if(highlight_red) 
                    this.fromBgColor = 'red'
                else 
                    this.fromBgColor = 'blue'
            },
            setAmountPromise() {
                let promise = new Promise(async (resolve, reject) => {
                    var i = this.from_currency;
                    var j = this.to_currency;
                    var dx_ = this.fromInput;
                    var dx = cBN(Math.round(dx_ * this.precisions[i])).toFixed(0,1);
                    let calls = [
                        [currentContract.swap._address, currentContract.swap.methods.balances(i).encodeABI()],
                    ]
                    if(!this.swapwrapped && !['susdv2', 'tbtc', 'ren'].includes(this.currentPool))
                        calls.push([currentContract.swap._address, currentContract.swap.methods.get_dy_underlying(i, j, dx).encodeABI()])
                    else {
                        //dx = cBN(dx).times(currentContract.c_rates[i])
                        calls.push([currentContract.swap._address, currentContract.swap.methods.get_dy(i, j, dx).encodeABI()])
                    }
                    calls.push([this.coins[this.to_currency]._address , this.coins[this.to_currency].methods.balanceOf(currentContract.default_account).encodeABI()])
                    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call(undefined, 'pending')
                    let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
                    let [b, get_dy_underlying, balance] = decoded
                    b = +b * currentContract.c_rates[i];
                    // In c-units
                    var dy_ = +get_dy_underlying / this.precisions[j];
                    var dy = this.toFixed(dy_);
                    resolve([dy, dy_, dx_, balance])
                })
                return helpers.makeCancelable(promise);
            },
            setLoadingAction() {
                this.loadingAction = true
                setTimeout(() => this.loadingAction = false, 500)
            },
            async handle_trade() {
                if(this.loadingAction) return;
                this.userInteracted = true
                this.setLoadingAction();
                
                this.show_loading = true;
                var i = this.from_currency
                var j = this.to_currency;

                var b = parseInt(await currentContract.swap.methods.balances(i).call()) / currentContract.c_rates[i];
                let maxSlippage = this.maxSlippage / 100;
                let currency = (Object.keys(this.currencies)[this.from_currency]).toUpperCase()
                if(this.swapwrapped) currency = Object.values(this.currencies)[this.from_currency]
                if(this.maxInputSlippage) maxSlippage = this.maxInputSlippage / 100;
                var dx = Math.floor(this.fromInput * this.precisions[i]);
                if(BN(this.maxBalance).gt(0) && BN(this.maxBalance).div(this.precisions[i]).minus(BN(this.fromInput)).lt(BN(this.minAmount))) {
                    dx = this.maxBalance
                }
                if(
                    (this.currentPool == 'susdv2' && this.from_currency == 3 ||
                        this.currentPool == 'sbtc' && this.from_currency == 2) &&
                    BN(this.maxSynthBalance).gt(0) && 
                    BN(this.maxSynthBalance).minus(BN(this.fromInput)).lt(BN(this.minAmount))
                ) {
                    dx = BN(this.maxSynthBalance).times(1e18).toFixed(0,1)
                }
                let min_dy_method = 'get_dy_underlying'
                if(this.swapwrapped || ['susdv2', 'tbtc', 'ren', 'sbtc'].includes(this.currentPool)) {
                    min_dy_method = 'get_dy'
                }
                var min_dy = BN(await currentContract.swap.methods[min_dy_method](i, j, BN(dx).toFixed(0,1)).call())
                min_dy = min_dy.times(1-maxSlippage)
                dx = cBN(dx.toString()).toFixed(0,1);
                this.waitingMessage = `Please approve ${this.fromInput} ${this.getCurrency(this.from_currency)} for exchange`
                var { dismiss } = notifyNotification(this.waitingMessage)
                try {
                    if (this.inf_approval)
                        await common.ensure_underlying_allowance(i, currentContract.max_allowance, [], undefined, this.swapwrapped)
                    else
                        await common.ensure_underlying_allowance(i, dx, [], undefined, this.swapwrapped);
                }
                catch(err) {
                    console.error(err)
                    dismiss()
                    this.waitingMessage = '',
                    this.show_loading = false
                    throw err;
                }
                dismiss()
                this.waitingMessage = `Please confirm swap 
                                        from ${this.fromInput} ${this.getCurrency(this.from_currency)}
                                        for min ${this.toFixed(min_dy / this.precisions[j])} ${this.getCurrency(this.to_currency)}`
                var { dismiss } = notifyNotification(this.waitingMessage)
                min_dy = cBN(min_dy).toFixed(0);
                let exchangeMethod = currentContract.swap.methods.exchange_underlying
                if(this.swapwrapped || ['susdv2', 'tbtc', 'ren', 'sbtc'].includes(this.currentPool)) exchangeMethod = currentContract.swap.methods.exchange
                try {
                    await helpers.setTimeoutPromise(100)
                    await exchangeMethod(i, j, dx, BN(min_dy).toFixed(0,1))
                        .send({
                            from: currentContract.default_account,
                            gasPrice: this.gasPriceWei,
                            gas: this.swapwrapped ? 
                                    contractGas.swap[this.currentPool].exchange(i, j) : contractGas.swap[this.currentPool].exchange_underlying(i, j),
                        })
                        .once('transactionHash', hash => {
                            dismiss()
                            notifyHandler(hash)
                            this.waitingMessage = `Waiting for swap 
                                                    <a href='https://etherscan.io/tx/${hash}'>transaction</a>
                                                    to confirm: no further action needed`
                        })
                }
                catch(err) {
                    console.error(err)
                    dismiss()
                    errorStore.handleError(err)
                    this.waitingMessage = '';
                    this.show_loading = '';
                    throw err;
                }
                this.waitingMessage = ''
                this.show_loading = false;
                this.estimateGas = 0;
                await common.update_fee_info();
                this.from_cur_handler();
                let balance = await this.coins[i].methods.balanceOf(currentContract.default_account).call();
                this.maxBalance = balance;
            }
        },

        beforeDestroy() {
            this.interval && clearIntervalAsync(this.interval)
        },
    }
</script>

<style scoped>
	.actualvalue {
        margin: 0.5em 0 0 0;
        text-align: right;
        font-size: 0.9em;
    }
    #no-balance {
        text-align: center;
    }
    .swapBTC-container {
        margin-top: 1em;
    }
    .pulse {
        animation: pulse 1s 3;
        margin-bottom: 8px;
    }
    .advancedoptions {
        margin-top: 1em;
    }
    .advancedoptions + div legend {
        text-align: center;
    }
</style>