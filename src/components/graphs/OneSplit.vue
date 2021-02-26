<template>
    <div>

        <div class='swap exchange'>
            
            <div class='exchangefields'>
                <fieldset class='item'>
                    <legend>From:</legend>
                    <div class='maxbalance' :class="{'loading line': maxBalance == -1}" @click='set_max_balance'>
                        Max: 
                        <span v-show='maxSynthBalance  != -1 && [5,9].includes(from_currency)'> {{ maxSynthBalanceText }} / </span>
                        <span v-show = 'maxBalance != -1'>{{maxBalanceText}}</span>
                        <span v-show='susdWaitingPeriod' class='susd-waiting-period'>
                            <span class='tooltip'>
                                <img src='@/assets/clock-regular.svg' class='icon small'>
                                <span class='tooltiptext'>
                                    Cannot transfer during waiting period. {{ (susdWaitingPeriodTime).toFixed(0) }} secs left.
                                </span>
                            </span>
                        </span>
                        <span v-show="[5,9].includes(from_currency)" class='tooltip'> [?]
                            <span class='tooltiptext'>
                                Max transferrable amount is {{ maxSynthBalanceText }}. You can free the remaining balance by settling.
                            </span>
                        </span>
                    </div>
                    <ul>
                        <li>
                            <input type="text" id="from_currency" :disabled='disabled || selldisabled' name="from_currency" value='0.00'
                            :style = "{backgroundColor: fromBgColor}"
                            @input='set_to_amount'
                            v-model='fromInput'>
                            <p class='actualvalue' v-show='swapwrapped'>
                                ≈ {{actualFromValue}} {{Object.keys(currencies)[this.from_currency] | capitalize}}
                            </p>
                        </li>
                        <li :class="{'coins': true, [currency]: true}" v-for='(currency, i) in Object.keys(currencies)'>
                            <input type="radio" :id="'from_cur_'+i" name="from_cur" :value='i' v-model='from_currency'>
                            <label :for="'from_cur_'+i">
                                <img :class="{'icon token-icon': true, [currency+'-icon']: true}" :src='getTokenIcon(currency)'>
                                <span v-show='!swapwrapped'> {{currency | capitalize}} </span>
                                <span v-show='swapwrapped'> {{currencies[currency]}} </span>
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
                                ≈ {{actualToValue}} {{Object.keys(currencies)[this.to_currency] | capitalize}}
                            </p>
                        </li>
                        <li :class="{'coins': true, [currency]: true}" v-for='(currency, i) in Object.keys(currencies)'>
                            <input type="radio" :id="'to_cur_'+i" name="to_cur" :value='i' v-model='to_currency'>
                            <label :for="'to_cur_'+i">
                                <img :class="{'icon token-icon': true, [currency+'-icon']: true}" :src='getTokenIcon(currency)'>
                                <span v-show='!swapwrapped'> {{currency | capitalize}} </span>
                                <span v-show='swapwrapped'> {{currencies[currency]}} </span>
                            </label>
                        </li>
                    </ul>
                </fieldset>
            </div>
                <p v-show='fromInput > 0' class='exchange-rate'>
                    Exchange rate 
                    <span @click='swapExchangeRate' class='clickable underline'>
                        {{getPair(swaprate)}}
                        <img src='@/assets/sync-solid.svg' class='swaprates-icon'>
                    </span> (including fees):
                    <span id="exchange-rate" @click='swapExchangeRate' class='clickable'>
                        {{exchangeRateSwapped}}
                    </span>
                </p>
                <p v-show='fromInput > 0' class='best-pool-text'>
                    Trade routed through: 
                    <span id="best-pool">
                        <span v-show="bestPoolText != '1split'">
                            {{bestPoolText}}
                        </span>
                        <span v-show="bestPoolText == '1split'">
                            {{bestPoolText}}
                            <span class='tooltip'> [?]
                                <span class='tooltiptext' v-html = 'distributionText'></span>
                            </span>
                        </span>
                    </span>
                </p>
            <ul>
                <li v-show='bestPool !== null'>
                    <input id="inf-approval" type="checkbox" name="inf-approval" checked v-model='inf_approval'>
                    <label for="inf-approval">Infinite approval - trust {{bestPoolText}} contract forever</label>
                </li>
                <!-- TODO add all wrapped tokens -->
                <!-- <li v-show="['compound', 'usdt'].some(p => pools.includes(p))">
                    <input id='swapc' type='checkbox' name='swapc' v-model = 'swapwrapped'>
                    <label for='swapc'>Swap compounded</label>

                    <input id='swapy' type='radio' name='swapy' :value='2' :checked='swapwrapped == 2' @click='handleCheck(2)' v-model = 'swapwrapped'>
                    <label for='swapy'>Swap y</label>
                </li> -->
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
                        <div id='poolselect'>
                            <input id='compoundpool1' type='checkbox' value='compound' v-model='pools'/>
                            <label for='compoundpool1'>Compound</label>

                            <input id='ypool1' type='checkbox' value='y' v-model='pools'/>
                            <label for='ypool1'>Y</label>

                            <input id='busdpool1' type='checkbox' value='busd' v-model='pools'/>
                            <label for='busdpool1'>bUSD</label>

                            <input id='susdpool1' type='checkbox' value='susdv2' v-model='pools'/>
                            <label for='susdpool1'>sUSD</label>

                            <input id='paxpool1' type='checkbox' value='pax' v-model='pools'/>
                            <label for='paxpool1'>PAX</label>

                            <input id='renpool1' type='checkbox' value='ren' v-model='pools'/>
                            <label for='renpool1'>ren</label>

                            <input id='sbtcpool' type='checkbox' value='sbtc' v-model='pools'/>
                            <label for='sbtcpool'>sBTC</label>
                        </div>
                        <div v-show='fromInput > 0' id='max_slippage'><span>Max slippage:</span> 
                            <input id="slippage05" type="radio" name="slippage" value='0.005' @click='maxSlippage = 0.5; customSlippageDisabled = true'>
                            <label for="slippage05">0.5%</label>

                            <input id="slippage1" type="radio" name="slippage" checked value='0.01' @click='maxSlippage = 1; customSlippageDisabled = true'>
                            <label for="slippage1">1%</label>

                            <input id="custom_slippage" type="radio" name="slippage" value='-' @click='customippageDisabled = false'>
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
            <p class='simple-error' v-show='exchangeRate<=0.98 && to_currency > 0'>
                Warning! Exchange rate is too low!
            </p>
            <p class='simple-error' v-show='exchangeRate<=0.95 && to_currency == 0'>
                Warning! Exchange rate is too low!
            </p>
            <p class='simple-error' id='no-balance-synth' v-show='notEnoughBalanceSynth && !susdWaitingPeriod && +maxSynthBalanceText > 0'>
                Max balance you can use is {{ maxSynthBalanceText }}
            </p>
            <div class='simple-error pulse' v-show="susdWaitingPeriod">
                Cannot transfer {{ from_currency == 5 ? 'sUSD' : 'sBTC' }} during waiting period {{ (susdWaitingPeriodTime).toFixed(0) }} secs left
            </div>
            <p class='trade-buttons'>
                <button id="trade" @click='handle_trade' :disabled='selldisabled'>
                    Sell <span class='loading line' v-show='loadingAction'></span>
                </button>
            </p>
            <div class='info-message gentle-message waiting-message' v-show='show_loading'>
                <span v-html='waitingMessage'></span>
                <span class='loading line'></span>
            </div>
            <div class='info-message gentle-message' v-show='estimateGas'>
                Estimated tx cost: {{ (+estimateGas).toFixed(2) }}$
            </div>
            <p class='simple-error' id='no-balance' v-show='showNoBalanceWarning'>
                Not enough balance for 
                <span v-show='!swapwrapped'>{{Object.keys(currencies)[from_currency] | capitalize}}</span>
                <span v-show='swapwrapped'>{{Object.values(currencies)[from_currency]}}</span>. <span>Swap is not available.</span>
            </p>
            <div class='info-message gentle-message' v-show='selldisabled'>
                Swapping between {{Object.values(currencies)[from_currency]}} and {{Object.values(currencies)[to_currency]}} is not available currently
            </div>
            <div class='info-message gentle-message' v-show='warningNoPool !== null'>
                Swap not available. Please select {{warningNoPool}} in pool select
            </div>
        </div>
    </div>
</template>

<script>
    import EventBus from './EventBus'

    import contractAbis, { ERC20_abi, cERC20_abi, yERC20_abi, synthERC20_abi,
        synthetixExchanger_address, synthetixExchanger_ABI,
        onesplit_address, onesplit_abi } from '../../allabis'
    import { notify, notifyHandler, notifyNotification } from '../../init'

    import { contract, LENDING_PRECISION, PRECISION, gas as contractGas } from '../../contract'
    import * as common from '../../utils/common'
    import * as helpers from '../../utils/helpers'
    import tradeStore from './tradeStore'

    import * as gasPriceStore from '../common/gasPriceStore'
    import GasPrice from '../common/GasPrice.vue'

    import * as errorStore from '../common/errorStore'

    import BN from 'bignumber.js'

    import * as Comlink from 'comlink'

    let { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic')

    import Worker from 'worker-loader!./worker.js';
    const worker = new Worker();
    const calcWorker = Comlink.wrap(worker);

    export default {

        components: {
            GasPrice,
        },

        data: () => ({
            pools: ['compound', 'y', 'busd', 'susdv2', 'pax', 'ren', 'sbtc'],
            maxBalance: -1,
            maxSynthBalance: -1,
            susdWaitingPeriod: false,
            susdWaitingPeriodTime: 0,
            snxExchanger: null,
            from_currency: 0,
            to_currency: 1,
            fromInput: '1.00',
            toInput: '0.00',
            updateTimer: null,
            disabled: true,
            bgColor: '#505070',
            fromBgColor: 'blue',
            exchangeRate: 'Not available',
            swaprate: false,
            maxSlippage: 1,
            maxInputSlippage: '',
            customSlippageDisabled: true,
            inf_approval: false,
            distribution: null,
            //DAI, USDC, USDT, TUSD, BUSD, sUSD, PAX, renBTC, wBTC, sBTC
            coin_precisions: [1e18, 1e6, 1e6, 1e18, 1e18, 1e18, 1e18, 1e8, 1e8, 1e18],
            swap: [],
            addresses: [],
            coins: [],
            underlying_coins: [],
            onesplit: null,
            onesplit_address: '',
            //0x01+0x02+0x04+0x08+0x10+0x20+0x40+0x80+0x100+0x400+0x800+0x10000+0x20000+0x40000 -> 462335
            swapPromise: helpers.makeCancelable(Promise.resolve()),
            usedFlags: '',
            usedParts: 0,
            multipath: 0,
            swapwrapped: false,
            bestPool: null,
            get showadvancedoptions() {
                return localStorage.getItem('advancedoptions') === 'true' 
                    || +this.fromInput > 5000 || ([7,8,9].includes(this.from_currency) && +this.fromInput > 0.5)
            },
            set showadvancedoptions(val) {
                console.log(val, "VAL TO SET")
                localStorage.setItem('advancedoptions', val)
            },
            show_loading: false,
            waitingMessage: '',
            userInteracted: false,
            ethPrice: 0,
            estimateGas: 0,
            loadingAction: false,

            interval: null,
        }),
        computed: {
            //onesplit exchanges [uniswap, kyber, bancor, oasis, cCurve, tCurve, yCurve, bCurve, sCurve]
            CONTRACT_FLAG() {
                //disable uniswap, kyber, bancor, oasis, compound, fulcrum, chai, aave, smart token, bdai, iearn, weth, idle, 
                    //mooniswap, uniswap v2 all, dforce
                //enable multipath DAI, multipath USDC
                //enabled curve compound, curve usdt, curve y, curve binance, curve susd, curve pax
                let disabled = 0x20000000 + 0x40000000;
                let enabled = 0x1000 + 0x2000 + 0x4000 + 0x8000 + 0x40000 + 0x80000000
                let enabledMulti = 0x10000 + 0x20000 + 0x400000000
                let curveFlags = {
                    compound: 0x1000,
                    usdt: 0x2000,
                    y: 0x4000,
                    busd: 0x8000,
                    susdv2: 0x40000,
                    pax: 0x80000000,
                    ren: 0x100000000,
                    sbtc: 0x40000000000,
                }
                let addPoolFlag = Object.keys(curveFlags).filter(pool=>this.pools.includes(pool)).map(pool=>curveFlags[pool])
                addPoolFlag = addPoolFlag.reduce((a, b) => a + b, 0)
                return disabled + addPoolFlag + enabledMulti;
            },
            currencies() {
                if(this.swapwrapped === false) {
                    return {
                        dai: 'DAI',
                        usdc: 'USDC',
                        usdt: 'USDT',
                        tusd: 'TUSD',
                        busd: 'BUSD',
                        susd: 'sUSD',
                        pax: 'PAX',
                        renbtc: 'renBTC',
                        wbtc: 'wBTC',
                        sbtc: 'sBTC',
                        // tbtc: 'tBTC',
                        // hbtc: 'hBTC',
                        // wbtc: 'wBTC',
                    }
                }
                if(this.swapwrapped == 1) {
                    return {
                        dai: 'cDAI',
                        usdc: 'cUSDC',
                    }
                }
                return {
                    dai: 'yDAI',
                    usdc: 'yUSDC',
                    tusd: 'yTUSD',
                    busd: 'yBUSD',
                }
            },
            maxBalanceText() {
                return this.toFixed(this.maxBalance / this.precisions(this.from_currency))
            },
            maxSynthBalanceText() {
                if(isNaN(this.maxSynthBalance)) return '0.00'
                return this.toFixed(this.maxSynthBalance / this.precisions(this.from_currency))
            },
            notEnoughBalanceSynth() {
                return [5,9].includes(this.from_currency) && BN(this.fromInput).gt(BN(this.maxSynthBalance).div(this.precisions(this.from_currency)))
            },
            actualFromValue() {
                if(!this.swapwrapped) return;
                return (this.fromInput * this.c_rates(this.from_currency)[this.from_currency] * this.precisions(this.from_currency)).toFixed(2)
            },
            actualToValue() {
                if(!this.swapwrapped) return;
                return (this.toInput * this.c_rates(this.to_currency)[this.to_currency] * this.precisions(this.to_currency)).toFixed(2)
            },
            bestPoolText() {
                // if((this.from_currency == 6 && [3,4,5].includes(this.to_currency)) 
                //     || (this.to_currency == 6 && [3,4,5].includes(this.from_currency))) return 'Not Available'
                if(this.bestPool === null) return 'Not available'
                return ['compound', 'y', 'busd', 'susd', 'pax', 'ren', 'sbtc', '1split'][this.bestPool]
            },
            selldisabled() {
                if([7,8,9].includes(this.from_currency) && ![7,8,9].includes(this.to_currency) 
                    || [7,8,9].includes(this.to_currency) && ![7,8,9].includes(this.from_currency)) return true
                // if(this.from_currency == 5 && ![0,1,2].includes(this.to_currency) || this.to_currency == 5 && ![0,1,2].includes(this.from_currency))
                //     return true
                // if((this.from_currency == 6 && [3,4,5].includes(this.to_currency)) || (this.to_currency == 6 && [3,4,5].includes(this.from_currency)))
                //     return true;
                return false;
            },
            allPools() {
                return ['compound', 'usdt', 'y', 'busd', 'susdv2', 'pax', 'ren', 'sbtc']
            },
            warningNoPool() {
                this.message = 'Please select '
                let poolMessage = null
                if(([7, 8].includes(this.from_currency) || [7, 8].includes(this.to_currency)) && !this.pools.includes('ren')) {
                    poolMessage = 'ren'
                }
                if((this.from_currency == 6 || this.to_currency == 6) && !this.pools.includes('pax')) {
                    poolMessage = 'pax'
                }
                if((this.from_currency == 5 || this.to_currency == 5) && !this.pools.includes('susdv2')) {
                    poolMessage = 'susd'
                }
                if((this.from_currency == 4 || this.to_currency == 4) && !this.pools.includes('busd')) {
                    poolMessage = 'busd'
                }
                if((this.from_currency == 3 || this.to_currency == 3) && !this.pools.includes('y')) {
                    poolMessage = 'y'
                }
                if((this.from_currency == 2 || this.to_currency == 2) && this.pools.find(pool=>['usdt', 'y', 'busd', 'susdv2', 'pax'].includes(pool)) == undefined) {
                    poolMessage = 'usdt'
                }
                return poolMessage
            },
            decodeDistribution() {
                if(this.distribution === null) return []
                let distArr = []
                this.multipath = 0;
                //onesplit exchanges [uniswap, kyber, bancor, oasis, cCurve, tCurve, yCurve, bCurve, sCurve]
                //multipath USDC
                if(this.usedFlags == this.CONTRACT_FLAG - 0x10000 - 0x400000000 && this.distribution.find(v=>+v > this.usedParts) !== undefined) {
                    this.multipath = 1
                }
                //multipath DAI
                if(this.usedFlags == this.CONTRACT_FLAG - 0x20000 - 0x400000000 && this.distribution.find(v=>+v > this.usedParts) !== undefined) {
                    this.multipath = 2
                }
                //multipath USDT
                if(this.usedFlags == this.CONTRACT_FLAG - 0x10000 - 0x20000 && this.distribution.find(v=>+v > this.usedParts) !== undefined) {
                    this.multipath = 3
                }
                //no multipath
                let curveDist = this.distribution.slice(4, 9)
                //pax
                curveDist.push(this.distribution[17])
                //ren, sbtc
                curveDist.push(this.distribution[14], this.distribution[18]);
                if(this.multipath == 0) {
                    distArr.push(curveDist)
                }
                else {
                    distArr.push(curveDist.map(v => v / 256))
                    distArr.push(curveDist.map(v => v % 256))
                }

                return distArr
            },
            distributionText() {
                if(!this.decodeDistribution.length) return null;
                let distPools = ['compound', 'usdt', 'y', 'busd', 'susdv2', 'pax', 'ren', 'sbtc']
                let text = '';
                let multipaths = ['DAI', 'USDC', 'USDT']

                for(let j = this.decodeDistribution.length-1; j >= 0; j--) {
                    if(this.multipath > 0 && j == 1) 
                        text += Object.values(this.currencies)[this.from_currency] + ' -> ' + (multipaths[this.multipath-1]) + '<br>'

                    if(this.multipath > 0 && j == 0) 
                        text += (multipaths[this.multipath-1]) + ' -> ' + Object.values(this.currencies)[this.to_currency] + '<br>'

                    for(let [i, v] of this.decodeDistribution[j].entries()) {
                        if(v < 1) continue;
                        text += '' + (100 * v / this.usedParts).toFixed(2) + '% ' + distPools[i] + '<br>';
                    }
                }

                return text;
            },
            publicPath() {
                return process.env.BASE_URL
            },
            exchangeRateSwapped() {
                if(this.swaprate)
                    return (1 / this.exchangeRate).toFixed(4)
                else
                    return this.exchangeRate
            },
            gasPrice() {
                return gasPriceStore.state.gasPrice
            },
            gasPriceWei() {
                return gasPriceStore.state.gasPriceWei
            },
            showNoBalanceWarning() {
                return this.maxBalance != -1 && +this.fromInput > this.maxBalance / this.precisions(this.from_currency) && this.userInteracted
            },
            showSlippageTooLow() {
                return this.maxInputSlippage != '' && +this.maxInputSlippage < 0.2
            },
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
            pools() {
                this.from_cur_handler()
            },
            swapwrapped(val) {
                if(val) this.pools = this.pools.filter(p=>['compound','usdt'].includes(p))
                if(this.from_currency > 1) this.from_currency = 0
                else this.from_cur_handler()
            },
            warningNoPool(val, oldval) {
                if(val !== null) {
                    this.bgColor = 'red'
                    this.toInput = '0.00'
                    this.exchangeRate = 'Not available'
                }
            },
            exchangeRateSwapped() {
                if(this.swaprate)
                    return (1 / this.exchangeRate).toFixed(4)
                else
                    return this.exchangeRate
            },
            gasPrice() {
                this.set_to_amount()
            },
            fromInput() {
                this.userInteracted = true
            },
        },
        async created() {
            //EventBus.$on('selected', this.selectPool)
            let unwatch = this.$watch(() => contract.web3 && contract.multicall, val => {
                this.mounted();
                unwatch()
            })

        },
        mounted() {
            contract.web3 && contract.multicall && this.mounted()
        },
        methods: {
            async mounted() {
                await this.setup();
                this.disabled = false;
                this.from_cur_handler()
                let promises = await Promise.all([helpers.getETHPrice()])
                this.ethPrice = promises[0]
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
            getTokenIcon(token) {
                return helpers.getTokenIcon(token, this.swapwrapped, '')
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
                if(num == '' || num == undefined || num == 0) return '0.00'
                if(!BN.isBigNumber(num)) num = +num
                if([7, 8, 9].includes(this.from_currency)) return num.toFixed(8)
                return num.toFixed(2)
            },
            handleError(err) {
                console.error(err)
                this.waitingMessage = '',
                this.show_loading = false
                throw err;
            },
            handleCheck(val) {
                if(this.swapwrapped === val) this.swapwrapped = false;
                else this.swapwrapped = val
            },
            c_rates(i) {
                if(this.swapwrapped == 2 && i < 3) return contract.contracts.iearn.c_rates
                if(this.swapwrapped == 2 && i == 3) return contract.contracts.busd.c_rates
                else return contract.c_rates;
            },
            getCoins(i) {
                if(this.swapwrapped == 1)
                    return this.coins.slice(0,2)[i]
                else if(this.swapwrapped == 2)
                    return this.coins.slice(2)[i]
                else
                    return this.underlying_coins[i]
            },
            normalizeCurrency(i) {
                if([7, 8, 9].includes(i)) return i - 7;
                if(i > 3) return 3
                return i;
            },
            precisions(i, contractName) {
                if(!this.swapwrapped) return this.coin_precisions[i]
                if(!contractName && this.swapwrapped == 1) contractName = 'compound'
                if(!contractName && this.swapwrapped == 2 && i < 3) contractName = 'iearn'
                if(!contractName && this.swapwrapped == 2 && i == 3) contractName = 'busd'
                if(!contractName) contractName = contract.currentContract
                if(this.swapwrapped) return contractAbis[contractName].wrapped_precisions[i];
                return contractAbis[contractName].coin_precisions[i]
            },
            async highlight_input() {
                var balance = parseFloat(await this.getCoins(this.from_currency).methods.balanceOf(contract.default_account || '0x0000000000000000000000000000000000000000').call()) 
                                / this.precisions(this.from_currency);
                if (this.fromInput > balance)
                    this.fromBgColor = 'red'
                else
                    this.fromBgColor = 'blue'
            },
            async from_cur_handler() {
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
            setLoadingAction() {
                this.loadingAction = true
                setTimeout(() => this.loadingAction = false, 500)
            },
            getCurrency(i) {
                return Object.values(this.currencies)[i]
            },
            async handle_trade() {
                if(this.loadingAction) return;
                this.userInteracted = true
                this.setLoadingAction();
                this.show_loading = true;
                //handle allowances
                var i = this.from_currency
                var j = this.to_currency;
                let amount = BN(this.fromInput).times(this.precisions(i)).toFixed(0)
                let maxSlippage = this.maxSlippage / 100;
                if(this.maxInputSlippage) maxSlippage = this.maxInputSlippage / 100;
                let min_dy = BN(this.toInput).times(this.precisions(j)).times(BN(1 - maxSlippage)).toFixed(0)
                let pool = contract.currentContract
                let bestContract = contract;
                if(this.bestPool > 0 && this.bestPool < 7) {
                    let poolIdx = this.bestPool
                    pool = Object.keys(contract.contracts).filter(pool=>pool != 'usdt' && pool != 'tbtc')[this.bestPool]
                    bestContract = contract.contracts[pool]
                }
                let address = bestContract.swap._address
                if(this.bestPool == 7) {
                    address = this.onesplit_address
                    bestContract.swap._address = address
                }
                this.waitingMessage = `Please approve ${this.fromInput} ${this.getCurrency(this.from_currency)} for exchange`
                var { dismiss } = notifyNotification(this.waitingMessage)
                try {
                    if (this.inf_approval)
                            await common.ensure_underlying_allowance(this.from_currency, contract.max_allowance, this.underlying_coins, address, this.swapwrapped, bestContract)
                        else
                            await common.ensure_underlying_allowance(this.from_currency, amount, this.underlying_coins, address, this.swapwrapped, bestContract);
                dismiss()
                }
                catch(err) {
                    this.handleError(err)
                }
                this.waitingMessage = `Please confirm swap 
                                        from ${this.fromInput} ${this.getCurrency(this.from_currency)}
                                        for min ${this.toFixed(min_dy / this.precisions(j))} ${this.getCurrency(this.to_currency)}`
                var { dismiss } = notifyNotification(this.waitingMessage)
                if(this.bestPool == 7) {
                    try {
                        await this.onesplit.methods.swap(
                            this.getCoins(this.from_currency)._address,
                            this.getCoins(this.to_currency)._address,
                            amount,
                            min_dy,
                            this.distribution,
                            this.usedFlags,
                        ).send({
                            from: contract.default_account,
                            gasPrice: this.gasPriceWei,
                            gas: 4000000,
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
                        dismiss()
                        this.handleError(err)
                        errorStore.handleError(err)
                    }
                }
                else {
                    let exchangeMethod = bestContract.swap.methods.exchange_underlying
                    if(this.swapwrapped || ['susd', 'ren', 'sbtc'].includes(this.bestPoolText)) 
                        exchangeMethod = bestContract.swap.methods.exchange
                    i = this.normalizeCurrency(i)
                    j = this.normalizeCurrency(j)
                    try {
                        await exchangeMethod(i, j, amount, min_dy).send({
                            from: contract.default_account,
                            gasPrice: this.gasPriceWei,
                            gas: this.swapwrapped ? contractGas.swap[pool].exchange(i, j) : contractGas.swap[pool].exchange_underlying(i, j),
                        })
                        .once('transactionHash', hash => {
                            notifyHandler(hash)
                            this.waitingMessage = `Waiting for swap 
                                                    <a href='https://etherscan.io/tx/${hash}'>transaction</a>
                                                    to confirm: no further action needed`
                        })
                    }
                    catch(err) {
                        this.handleError(err)
                        errorStore.handleError(err)
                    }
                    this.waitingMessage = ''
                    this.show_loading = false;

                    this.from_cur_handler();
                    let balance = await this.getCoins(this.from_currency).methods.balanceOf(contract.default_account || '0x0000000000000000000000000000000000000000').call();
                    if(!contract.default_account) balance = 0
                    let maxAmount = balance / this.precisions(i)
                    this.maxBalance = this.toFixed(maxAmount);
                }
            },
            async set_from_amount(i) {
                let coinAddress = this.getCoins(i)._address
                let balanceCalls = [
                    [coinAddress, this.getCoins(i).methods.balanceOf(contract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()]]
                if([5, 9].includes(i)) {
                    balanceCalls.push([coinAddress, 
                        this.getCoins(i).methods.transferableSynths(contract.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
                    let currencyKey = '0x7355534400000000000000000000000000000000000000000000000000000000'
                    if(i == 9) 
                        currencyKey = '0x7342544300000000000000000000000000000000000000000000000000000000'
                    balanceCalls.push([this.snxExchanger._address, 
                        this.snxExchanger.methods
                            .maxSecsLeftInWaitingPeriod(contract.default_account, currencyKey)
                            .encodeABI()
                    ])
                }
                let aggcalls = await contract.multicall.methods.aggregate(balanceCalls).call()
                let balances = aggcalls[1].map(hex => contract.web3.eth.abi.decodeParameter('uint256', hex))
                let amounts = balances.map(balance => contract.default_account ? balance : 0)
                this.maxBalance = amounts[0]
                let highlight_red = this.fromInput > balances[0] / this.precisions(this.from_currency)
                if([5, 9].includes(i)) {
                    this.maxSynthBalance = amounts[1]
                    this.susdWaitingPeriod = (+amounts[2] != 0)
                    this.susdWaitingPeriodTime = +amounts[2]
                    highlight_red = this.fromInput > this.maxSynthBalance / this.precisions(this.from_currency)
                    if(this.susdWaitingPeriod) highlight_red = true
                }   
                if(highlight_red) 
                    this.fromBgColor = 'red'
                else
                    this.fromBgColor = 'blue'
                // let balance = await this.getCoins(i).methods.balanceOf(contract.default_account || '0x0000000000000000000000000000000000000000').call();
                // if(!contract.default_account) balance = 0
                // let amount = balance / this.precisions(i)

                // if (this.fromInput == '' || this.val == 0) {
                //     if(!contract.default_account) balance = 0
                //     this.fromInput = this.toFixed(amount)
                // }
                // this.maxBalance = this.toFixed(amount);
            },
            makeCall(amount, parts, flags) {
                if(this.swapwrapped == 1) flags -= 0x10
                if(this.swapwrapped == 2) flags -= 0x800
                return [
                    this.onesplit._address,
                    this.onesplit.methods.getExpectedReturn(
                        this.getCoins(this.from_currency)._address,
                        this.getCoins(this.to_currency)._address,
                        amount,
                        parts,
                        flags
                    ).encodeABI()
                ]
            },
            getCalls(amount) {
                let defaultCalls = [
                    this.makeCall(amount, 10, this.CONTRACT_FLAG - 0x10000 - 0x20000 - 0x400000000),
                ]
                let calls = defaultCalls.concat();
                if([3,4,5,6].includes(this.from_currency) && [3,4,5,6].includes(this.to_currency)) {
                    calls = defaultCalls.slice(1)
                    calls.push(
                        this.makeCall(amount, 15, this.CONTRACT_FLAG - 0x10000 - 0x400000000),
                        this.makeCall(amount, 15, this.CONTRACT_FLAG - 0x20000 - 0x400000000),
                        this.makeCall(amount, 15, this.CONTRACT_FLAG - 0x10000 - 0x20000),
                        this.makeCall(amount, 30, this.CONTRACT_FLAG - 0x10000 - 0x400000000),
                        this.makeCall(amount, 30, this.CONTRACT_FLAG - 0x20000 - 0x400000000),
                        this.makeCall(amount, 30, this.CONTRACT_FLAG - 0x10000 - 0x20000),
                    )
                }
                if([7,8].includes(this.from_currency) && [7,8].includes(this.to_currency)) {
                    calls.push(
                        this.makeCall(amount, 1000, 4403952091136)
                    )
                }
                return calls
            },
            async set_to_amount_onesplit() {
                let amount = BN(this.fromInput).times(this.precisions(this.from_currency)).toFixed(0)
                let calls = this.getCalls(amount)
                this.swapPromise.cancel();
                let aggcalls = contract.multicall.methods.aggregate(calls).call(undefined, 'pending')
                this.swapPromise = helpers.makeCancelable(aggcalls)
                let split_swap = await this.swapPromise
                let decoded = split_swap[1].map(hex => contract.web3.eth.abi.decodeParameters(['uint256', 'uint256[]'], hex))
                let max = decoded.reduce((a, b) => a[0] > b[0] ? a : b)
                let decodedCall = contract.web3.eth.abi.decodeParameters(['address', 'address', 'uint256', 'uint256', 'uint256'], 
                                                                calls[decoded.indexOf(max)][1].slice(10))
                this.usedFlags = decodedCall[4]
                this.usedParts = decodedCall[3]
                console.log(max, "1split swap", this.underlying_coins[this.from_currency], this.underlying_coins[this.to_currency])

                let amount_dy = max[0];
                let exchangeRate = BN(amount_dy).div(this.precisions(this.to_currency)).div(this.fromInput)
                this.distribution = max[1]
                return ['1split', exchangeRate, amount_dy]
                // this.setExchangeRate(exchangeRate)
                // this.toInput = BN(amount_dy).div(this.precisions(this.to_currency)).toFixed(2);
                // this.disabled = false
            },
            setExchangeRate(exchangeRate) {
                if(+exchangeRate <= 0.98) this.bgColor = 'red'
                else this.bgColor= '#505070'
                if(isNaN(+exchangeRate)) this.exchangeRate = "Not available"
                else {
                    this.exchangeRate = (+exchangeRate).toFixed(4)
                }
            },
            getPoolsCalls() {
                let pools = this.pools
                let calls = []
                if(this.swapwrapped == 1) { 
                    pools = ['compound', 'usdt']
                    let dx = BN(this.fromInput).times(contractAbis.usdt.wrapped_precisions[this.from_currency])
                    calls = [
                        [
                            this.swap[0]._address,
                            this.swap[0].methods.get_dy(this.from_currency, this.to_currency, dx.toFixed(0,1)).encodeABI()
                        ],
                        [
                            this.swap[1]._address,
                            this.swap[1].methods.get_dy(this.from_currency, this.to_currency, dx.toFixed(0,1)).encodeABI()
                        ]
                    ]
                }
                if(!this.swapwrapped) {          
                    let dx = BN(this.fromInput).times(contractAbis.iearn.coin_precisions[this.from_currency])
                    //TUSD only in y pool
                    if((this.from_currency == 3 || this.to_currency == 3) && this.pools.includes('y')) {
                        calls = [
                            [
                                this.swap[2]._address,
                                this.swap[2].methods.get_dy_underlying(this.from_currency, this.to_currency, dx.toFixed(0,1)).encodeABI()
                            ]
                        ]
                    }
                    //BUSD only in b pool
                    else if((this.from_currency == 4 || this.to_currency == 4) && this.pools.includes('busd')) {

                        let from_currency = this.from_currency == 4 ? 3 : this.from_currency
                        let to_currency = this.to_currency == 4 ? 3 : this.to_currency

                        let dx = BN(this.fromInput).times(contractAbis.busd.coin_precisions[from_currency])

                        calls = [
                            [
                                this.swap[3]._address,
                                this.swap[3].methods.get_dy_underlying(from_currency, to_currency, dx.toFixed(0,1)).encodeABI()
                            ]
                        ]
                    }
                    //sUSD exchanges only in s pool
                    else if((this.from_currency == 5 || this.to_currency == 5) && this.pools.includes('susdv2')) {
                        let from_currency = this.from_currency == 5 ? 3 : this.from_currency;
                        let to_currency = this.to_currency == 5 ? 3 : this.to_currency;

                        let dx = BN(this.fromInput).times(contractAbis.susdv2.coin_precisions[from_currency])

                        calls = [
                            [
                                this.swap[4]._address,
                                this.swap[4].methods.get_dy(from_currency, to_currency, dx.toFixed(0,1)).encodeABI()
                            ]
                        ]
                    }
                    //PAX exchanges only in PAX pool
                    else if((this.from_currency == 6 || this.to_currency == 6) && this.pools.includes('pax')) {
                        let from_currency = this.from_currency == 6 ? 3 : this.from_currency;
                        let to_currency = this.to_currency == 6 ? 3 : this.to_currency;

                        let dx = BN(this.fromInput).times(contractAbis.pax.coin_precisions[from_currency])
                        calls = [
                            [
                                this.swap[5]._address,
                                this.swap[5].methods.get_dy_underlying(from_currency, to_currency, dx.toFixed(0,1)).encodeABI()
                            ]
                        ]
                    }
                    else if(([7,8,9].includes(this.from_currency) || [7,8,9].includes(this.to_currency)) 
                            && (this.pools.includes('ren') || this.pools.includes('sbtc'))) {
                        let from_currency = this.from_currency - 7
                        let to_currency = this.to_currency - 7

                        let dx = BN(this.fromInput).times(contractAbis.sbtc.coin_precisions[from_currency])
                        let poolidx = this.pools.filter(pool => ['ren', 'sbtc'].includes(pool)).map(pool => this.allPools.indexOf(pool) + 1)
                        if(this.from_currency == 9 || this.to_currency == 9) poolidx = [poolidx.filter(id => id != 7)]
                        calls = poolidx.map(i => {
                            return [
                                this.swap[i]._address,
                                this.swap[i].methods.get_dy(from_currency, to_currency, dx.toFixed(0, 1)).encodeABI()
                            ]
                        }
                        )
                    }
                    else {
                        //susd is already checked outside this function
                        //now coins are DAI, USDC, USDT, other cases are handled and they go through all pools
                        dx = BN(this.fromInput).times(contractAbis.usdt.coin_precisions[this.from_currency])
                        let poolidx = this.pools.filter(pool => !['tbtc', 'ren', 'sbtc'].includes(pool)).map(pool => this.allPools.indexOf(pool))
                        if(this.from_currency == 2 || this.to_currency == 2) poolidx =  poolidx.filter(id => id != 0)
                        calls = poolidx.map(i =>
                            [
                                this.swap[i]._address, 
                                this.swap[i].methods.get_dy_underlying(this.from_currency, this.to_currency, dx.toFixed(0,1)).encodeABI()
                            ]
                        )
                    }
                }
                return calls
            },
            async realComparePools() {
                //use addresses of coins instead of checking from_currency, to_currency?
                let calls = this.getPoolsCalls();
                let aggcalls = await contract.multicall.methods.aggregate(calls).call()
                let decoded = aggcalls[1].map(hex => contract.web3.eth.abi.decodeParameter('uint256', hex))
                let poolRates = calls.map((call, i) => [call[0], decoded[i]])
                return poolRates.reduce((a, b) => {
                    let pool1 = this.addresses.find(v => v.address == a[0]).pool
                    let pool2 = this.addresses.find(v => v.address == b[0]).pool
                    let gas1 = this.calculateGas(pool1)[0]
                    let gas2 = this.calculateGas(pool2)[0]
                    let precisions = this.precisions(this.to_currency)
                    return (a[1] / precisions) - gas1 > (b[1] / precisions) - gas2 ? a : b
                })
            },
            calculateGas(pool) {
                let i = this.normalizeCurrency(this.from_currency)
                let j = this.normalizeCurrency(this.to_currency)
                let onesplitGas = 4000000
                let txPricePool = 0
                if(pool != '1split') {
                    let poolgas = contractGas.swap[pool].exchange_underlying(i, j) / 2
                    txPricePool = poolgas * this.gasPrice / 1e9 * this.ethPrice
                }
                let txPrice1split = onesplitGas * this.gasPrice / 1e9 * this.ethPrice
                return [txPricePool, txPrice1split]
            },
            async set_to_amount() {
                this.interval && !this.interval.stopped && clearIntervalAsync(this.interval)
                if(typeof (+this.fromInput) === 'number' && !isNaN(+this.fromInput))
                    this.interval = setIntervalAsync(this.set_to_amount, 3000)
                this.distribution = null
                let minAmount = 10000
                if(this.swapwrapped) minAmount *= 50
                let exchangeRate;
                let bestdy_ = 0;
                try {
                    if(this.fromInput == 0) {
                        this.disabled = false;
                        this.toInput = '0.00';
                        return;
                    }
                    /*if(this.from_currency == 5 || this.to_currency == 5) {
                        let dx = BN(this.fromInput * this.precisions(this.from_currency)).toFixed(0, 1)
                        let actualFromCurrency = this.normalizeCurrency(this.from_currency)
                        let actualToCurrency = this.normalizeCurrency(this.to_currency)
                        let dy = await this.swap[2].methods.get_dy_underlying(actualFromCurrency, actualToCurrency, dx).call()
                        this.bestPool = 4;
                        dy = +(BN(dy).div(this.precisions(this.to_currency)))
                        exchangeRate = dy / dx * this.precisions(this.from_currency)
                    }
                    else*/
                    if([3,4,5,6].includes(this.from_currency) && [3,4,5,6].includes(this.to_currency)) {
                        exchangeRate = (await this.set_to_amount_onesplit())[1]
                        this.bestPool = 7
                        let [_, txPrice1split] = this.calculateGas('1split')
                        this.estimateGas = txPrice1split
                    }
                    else {
                        let pools = ['compound', 'iearn', 'busd', 'susdv2', 'pax', 'ren', 'sbtc', '1split']
                        this.swapPromise.cancel()
                        let promises = [this.realComparePools()]
                        if(this.fromInput > 100 || [7,8].includes(this.from_currency) && [7,8].includes(this.to_currency)) {
                            promises = [this.realComparePools(), this.set_to_amount_onesplit()]
                        }
                        this.swapPromise = helpers.makeCancelable(Promise.all(promises))
                        let result = await this.swapPromise
                        let [poolAddress, dy] = result[0]
                        let pool = this.addresses.find(v => v.address == poolAddress).pool
                        let dy_ = BN(dy).div(this.precisions(this.to_currency, pool))
                        exchangeRate = BN(dy_).div(BN(this.fromInput))
                        bestdy_ = dy_
                        let pool1 = 0
                        let exchangeRate1 = 0
                        let dy_1split = 0
                        if(result[1]) {
                            [pool1, exchangeRate1, dy_1split] = result[1]
                        }
                        let [txPricePool, txPrice1split] = this.calculateGas(pool)
                        let useOneSplit = ((this.fromInput * exchangeRate1) - (this.fromInput * exchangeRate)) > (txPrice1split - txPricePool)
                        this.estimateGas = txPricePool
                        if(exchangeRate < exchangeRate1 && useOneSplit) {
                            exchangeRate = exchangeRate1
                            pool = '1split'
                            this.estimateGas = txPrice1split
                        }
                        else this.distribution = null
                        this.bestPool = pools.indexOf(pool)
                    }
                    let bestPool = this.bestPool
                    if(bestPool > 0) bestPool +=1
                    let address = this.swap[bestPool]._address
                    if (BN(await this.getCoins(this.from_currency).methods.allowance(contract.default_account || '0x0000000000000000000000000000000000000000', address).call()).gt(contract.max_allowance.div(BN(2))))
                        this.inf_approval = true;
                    else
                        this.inf_approval = false;

                    //show converted exchange rate when swapping wrapped coins?
                    this.toInput = this.toFixed(BN(this.fromInput).times(BN(exchangeRate)));
                    if(this.swapwrapped) {
                        let cdy_ = bestdy_ * this.c_rates(this.to_currency)[this.to_currency] * contractAbis.compound.wrapped_precisions[this.to_currency]
                        let cdx_ = this.fromInput * this.c_rates(this.from_currency)[this.from_currency] * contractAbis.compound.wrapped_precisions[this.from_currency]
                        exchangeRate = (cdy_ / cdx_)
                    }
                    this.setExchangeRate(exchangeRate)
                }
                catch(err) {
                    if(!err.canceled) {
                        console.error(err)
                        this.toInput = 0
                    }
                }
                finally {
                    this.set_from_amount(this.from_currency)
                }
            },
            async set_max_balance() {
                let balance
                if([5,9].includes(this.from_currency)) {
                    balance = await this.getCoins(this.from_currency).methods.transferableSynths(contract.default_account || '0x0000000000000000000000000000000000000000').call();
                    if(this.susdWaitingPeriod) balance = 0
                }
                else
                    balance = await this.getCoins(this.from_currency).methods.balanceOf(contract.default_account || '0x0000000000000000000000000000000000000000').call();
                let amount = BN(balance).div(this.precisions(this.from_currency)).toFixed()
                this.fromInput = contract.default_account ? amount : 0
                await this.set_to_amount();
            },
            async setup() {
                this.onesplit_address = await helpers.retry(contract.web3.eth.ens.getAddress('1split.eth'))
                this.onesplit = new contract.web3.eth.Contract(onesplit_abi, this.onesplit_address)
                this.swap = []
                this.addresses = []
                let abis = Object.keys(contractAbis).filter(p => p != 'susd' && p != 'y')
                for(let pool of abis) {
                    this.swap.push(new contract.web3.eth.Contract(contractAbis[pool].swap_abi, contractAbis[pool].swap_address))
                    this.addresses.push({address: contractAbis[pool].swap_address, pool: pool})
                }

                this.swap.push(this.onesplit)

                this.coins.push(new contract.web3.eth.Contract(cERC20_abi, contractAbis.compound.coins[0]))
                this.coins.push(new contract.web3.eth.Contract(cERC20_abi, contractAbis.compound.coins[1]))
                for(let i = 0; i < 4; i++) {
                    let coin_abi = cERC20_abi
                    this.coins.push(new contract.web3.eth.Contract(yERC20_abi, contractAbis.iearn.coins[i]))
                    this.underlying_coins.push(new contract.web3.eth.Contract(ERC20_abi, contractAbis.iearn.underlying_coins[i]))
                }

                //busd
                this.coins.push(new contract.web3.eth.Contract(yERC20_abi, contractAbis.busd.coins[3]))
                this.underlying_coins.push(new contract.web3.eth.Contract(ERC20_abi, contractAbis.busd.underlying_coins[3]))

                //susd
                    //coins and undelying_coins are the same
                this.coins.push(new contract.web3.eth.Contract(ERC20_abi, contractAbis.susdv2.coins[3]))
                this.underlying_coins.push(new contract.web3.eth.Contract(synthERC20_abi, contractAbis.susdv2.underlying_coins[3]))

                //pax
                this.coins.push(new contract.web3.eth.Contract(yERC20_abi, contractAbis.pax.coins[3]))
                this.underlying_coins.push(new contract.web3.eth.Contract(ERC20_abi, contractAbis.pax.underlying_coins[3]))

                for(let i = 0; i < contractAbis.ren.coins.length; i++) {
                    this.coins.push(new contract.web3.eth.Contract(ERC20_abi, contractAbis.ren.coins[i]))
                    this.underlying_coins.push(new contract.web3.eth.Contract(ERC20_abi, contractAbis.ren.coins[i]))
                }

                //sbtc
                this.coins.push(new contract.web3.eth.Contract(synthERC20_abi, contractAbis.sbtc.coins[2]))
                this.underlying_coins.push(new contract.web3.eth.Contract(synthERC20_abi, contractAbis.sbtc.coins[2]))

                this.snxExchanger = new contract.web3.eth.Contract(synthetixExchanger_ABI, synthetixExchanger_address)
            }
        },

        beforeDestroy() {
            this.interval && clearIntervalAsync(this.interval)
        },
    }
</script>

<style scoped>
   #poolselect {
        margin-bottom: 1em;
    }
    #poolselect > label:nth-of-type(1) {
        margin-left: 0;
    }
    #poolselect > label {
        margin-left: 1em;
    }
    .actualvalue {
        margin: 0.5em 0 0 0;
        text-align: right;
        font-size: 0.9em;
    }
    .exchange {
        width: 60%;
    }
    #best-pool .tooltiptext {
        text-align: left;
        padding-left: 1em;
    }
    .maxbalance.loading.line {
        display: block;
    }
    .coins.renbtc {
        margin-top: 1em;
    }
    .pulse {
        animation: pulse 1s 3;
        margin-bottom: 8px;
    }
    #no-balance-synth {
        margin-bottom: 0.3em;
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
    #trade {
        margin-top: 1em;
    }
    label[for='compoundpool1'] {
        margin-left: -2px;
    }
    @media only screen and (max-device-width: 1200px) {
        .exchange {
            width: 80%;
        }
    }
</style>