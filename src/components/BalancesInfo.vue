<template>
  <div class="blue window half-width info">
    <fieldset id="lp-info-currency">
      <legend>Currency reserves</legend>
      <ul id='balances-info'>
          <li v-for='(currency, i) in Object.keys(currencies)'>
            <b>{{currency | capitalize}}:</b>
            <span :class="{'loading line': !bal_info || bal_info[i] === null}"> 
              <span v-show='bal_info && bal_info[i]'> 
                {{bal_info && toFixed(bal_info[i]) }} ({{((bal_info && bal_info[i] * 100) / totalBalances) | toFixed2}}%) 
              </span>
            </span>
          </li>
          <li>
            <b>{{totalCurrencies(currencies)}}:</b> 
            <span :class="{'loading line': totalBalances === null}"> {{toFixed(totalBalances)}}</span>
          </li>
          <li v-show="['ren', 'sbtc'].includes(currentPool)">
            <b>USD total:</b>
            <span :class="{'loading line': totalBalances === null}"> {{(totalBalances * btcPrice) | formatNumber(2)}}$ </span>
          </li>
      </ul>
      <p>
        <ul>
          <li>
            <b>Fee:</b> 
            <span id='fee-info' :class="{'loading line': !fee}">
            </span>
            <span v-show = 'fee'> {{fee && fee.toFixed(3)}}</span>
          </span>%
          <li>
            <b>Admin fee:</b> 
            <span id='admin-fee-info' :class="{'loading line': admin_fee}"> {{admin_fee && admin_fee.toFixed(3)}}</span>%
          </li>
        </ul>
      </p>
      <ul>
        <li>
          <b>
            Virtual price: 
          </b>
          <span :class="{'loading line': virtualPrice1 === null}"> 
            <span class='tooltip'>
              {{ (virtualPrice1).toFixed(4) }}
              <span class='tooltiptext'>
                {{ virtualPrice1 }}
              </span>
            </span>
          </span>
          &nbsp;
          <span class='tooltip'>[?]
            <span class='tooltiptext'>
              Average dollar value of pool token {{(usdShare1 + usdStake1).toFixed(2)}}
            </span>
          </span>
        </li>
        <li>
          <b class='tooltip'>
            A: 
            <span class='tooltiptext long'>
              Amplification coefficient chosen from fluctation of prices around 1
            </span>
          </b>
          <span :class="{'loading line': A1 === null}"> {{ A1 }} </span>
        </li>
        <li v-show='isRampingUp'>
          <b>
           Ramping up A:
            <span class='tooltip'>[?]
              <span class='tooltiptext long'>Slowly changing up A so that it doesn't negatively change virtual price growth of shares</span>
            </span> 
          </b>
          <span> {{ initial_A }} -> {{ future_A }} </span>
        </li>
        <li v-show='isRampingUp'>
          <b>Ramp up A ends on:</b>
          <span> {{ rampEnd }}</span>
        </li>
        <li v-show = 'admin_actions_deadline1 !== null && admin_actions_deadline1 !== 0'>
          <b>Future A: </b>
          <span :class="{'loading line': future_A1 === null}"> {{ future_A1 }} </span>
        </li>
        <li v-show = 'admin_actions_deadline1 !== null && admin_actions_deadline1 !== 0'>
          <b>Action deadline: </b>
          <div :class="{'loading line': admin_actions_deadline1 === null}"> 
            {{ admin_actions_readable }} GMT
            <span class='tooltip'> [?]
              <span class='tooltiptext long'>
                This is when the proposed future A can be enacted and changed.
                It also may not be changed. 
              </span>
            </span>
          </div>
        </li>
      </ul>
      <p>
        <ul>
          <li>
            <b>Liquidity utilization: </b>
            <span :class="{'loading line': totalBalances === null || nativeVolume == -1}">
              <span v-show='totalBalances !== null && nativeVolume != -1'>
                {{ (nativeVolume * 100 / totalBalances).toFixed(2) }}%
              </span>
            </span>
            <span class='tooltip'> [?]
              <span class='tooltiptext'>
                24h Volume/Liquidity ratio
              </span>
            </span>
          </li>
          <li>
            <b>Daily USD volume: </b>
            <span :class="{'loading line': poolVolumeUSD == -1}">
              <span v-show='poolVolumeUSD > -1'> ${{ poolVolumeUSD && poolVolumeUSD | formatNumber(2) }} </span>
            </span>
          </li>
          <li v-show='isBTC'>
            <b>Daily ₿ volume: </b>
            <span :class="{'loading line': poolVolumeUSD == -1}">
              <span v-show='poolVolumeUSD > -1'> {{ poolVolume && toFixed(poolVolume) }} ₿ </span>
            </span>
          </li>
        </ul>
      </p>
    </fieldset>

    <fieldset id="lp-info-container" v-show='totalShare > 0 && initializedContracts'>
      <legend>My share: ( {{(totalBalance / totalSupply * 100).toFixed(3)}}% of pool)</legend>
      <ul id='lp-info'>
          <li v-for='(currency, i) in Object.keys(currencies)'>
            <b>{{currency | capitalize}}:</b> 
            <span> {{l_info && toFixed(l_info[i])}}</span></li>
          <li>
            <b>{{totalCurrencies(currencies)}}:</b> 
            <span :class="{'loading line': totalUserBalances === null}"> {{toFixed(totalUserBalances)}}</span>
          </li>
          <li>
            <b>USD balance:</b> 

            <span>
               <span :class="{'loading line': realShare === null}"> 
                <span v-show="realShare !== null">
                  {{realShare | toFixed2 | formatNumber}}
                </span>
              </span>
            </span>
          </li>
          <li>
            <b>Averaged USD balance:</b> {{ usdShare1 | formatNumber(2) }}
          </li>
      </ul>
    </fieldset>
    <fieldset id="lp-info-container" v-show="totalStake > 0 && initializedContracts && ['susdv2', 'sbtc', 'y', 'iearn'].includes(currentPool)">
      <legend>Staked share: ( {{(totalStake / totalSupply * 100).toFixed(3)}}% of pool)</legend>
      <ul id='stakelp-info'>
          <li v-for='(currency, i) in Object.keys(currencies)'>
            <b>{{currency | capitalize}}:</b> 
            <span> {{staked_info && toFixed(staked_info[i])}}</span></li>
          <li>
            <b>{{totalCurrencies(currencies)}}:</b> 
            <span :class="{'loading line': totalStakedBalances === null}"> {{toFixed(totalStakedBalances)}}</span>
          </li>
          <li>
            <b>USD balance:</b> 

            <span>
              <span :class="{'loading line': realStake === null}">
                <span v-show="realStake !== null">
                  {{realStake | toFixed2 | formatNumber}}
                </span>
              </span>
            </span>
          </li>

          <li>
            <b>Averaged USD balance:</b> {{ usdStake1 | formatNumber(2)}}
          </li>

      </ul>
    </fieldset>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { getters, allCurrencies, contract as currentContract } from '../contract'
  import allabis from '../allabis'
  import * as helpers from '../utils/helpers'
  import * as volumeStore from './common/volumeStore'
  import stableswap_fns from '../utils/stableswap_fns'
  import * as Comlink from 'comlink'
  import Worker from 'worker-loader!./graphs/worker.js';
  const worker = new Worker();
  const calcWorker = Comlink.wrap(worker);
  import * as priceStore from './common/priceStore'

  export default {
    props: ['pool', 'bal_info', 'total', 'l_info', 'totalShare', 'fee', 'admin_fee', 'currencies', 'tokenSupply', 'tokenBalance', 'usdShare', 'staked_info', 'totalStake', 'usdStake', 'combinedstats', 'virtual_price', 'A', 'future_A', 'admin_actions_deadline'],
    data: () => ({
      volumes: [],
      realShare: null,
      realStake: null,
      lastPoint: null,
      lastPool: null,
      btcPrice: 0,
    }),
    methods: {
      toFixed(num, precisions = 2, round = 4) {
          if(num == '' || num === null || num === undefined) return ''
          if(precisions == 2 && ['tbtc', 'ren', 'sbtc'].includes(this.currentPool)) precisions = 8
          let rounded = this.formatNumber(num, precisions)
          return rounded
      },
      totalCurrencies(currencies) {
        if(!['susdv2', 'tbtc', 'ren'].includes(this.currentPool))
          return Object.keys(currencies).join('+').toUpperCase();
        return Object.values(currencies).join('+');
      },
      formatNumber(number, dec = 2) {
        return helpers.formatNumber(number, dec)
      },
      async updateShares() {
        if(!(this.usdShare1 > 0 || (['susdv2', 'sbtc', 'y', 'iearn'].includes(this.currentPool) && this.usdStake1) > 0)) return;
        let pool = this.currentPool
        pool = pool == 'iearn' ? 'y' : pool == 'susdv2' ? 'susd' : pool == 'ren' ? 'ren2' : pool == 'sbtc' ? 'rens' : pool  
        let req = await fetch(`${window.domain}/raw-stats/${pool}-1m.json`)
        this.lastPoint = await req.json()
        this.lastPoint = this.lastPoint[this.lastPoint.length - 1]
        let N_COINS = allabis[this.currentPool].N_COINS;
        this.realShare = 0;
        this.realStake = 0;
        for(let i = 0; i < N_COINS; i++) {
          let price = 1
          let amount = 1
          let toPrecisions = 1e6
          if(['tbtc', 'ren', 'sbtc'].includes(this.currentPool)) {
            amount = 0.0001
            toPrecisions = 1e8
          }
          if(i != 1) {
            let dy = await calcWorker.calcPrice({ 
              ...this.lastPoint, 
              N_COINS: allabis[this.currentPool].N_COINS,
              PRECISION_MUL: allabis[this.currentPool].coin_precisions.map(p=>1e18/p),
              PRECISION: 1e18,
            }, i, 1, amount * allabis[this.currentPool].coin_precisions[i])
            price = dy / toPrecisions / amount
          }
          this.realShare += +this.l_info[i] * price
          this.realStake += +this.staked_info[i] * price
        }
        if(this.isBTC) {
          this.realShare *= this.btcPrice
          this.realStake *= this.btcPrice
        }
      },
    },
    async created() {
      let key = this.currentPool == 'iearn' ? 'y' : this.currentPool == 'susdv2' ? 'susd' : this.currentPool
      let volume = volumeStore.state.volumes[key][0] || 0
      if(this.isBTC) {
        this.btcPrice = await priceStore.getBTCPrice()
      }
      if(volume == -1) {
        let stats = await fetch(`${window.domain}/raw-stats/apys.json`)
        stats = await stats.json()
        for(let [key, value] of Object.entries(volumeStore.state.volumes)) {
          if(volumeStore.state.volumes[key][0] == -1) {
            let volume = key == 'ren' ? stats.volume.ren2 : key == 'sbtc' ? stats.volume.rens : stats.volume[key]
            Vue.set(volumeStore.state.volumes[key], 0,  volume || 0)
            if(['tbtc', 'ren', 'sbtc'].includes(key)) {
              Vue.set(volumeStore.state.volumes[key], 0,  volume * this.btcPrice || 0)
              Vue.set(volumeStore.state.volumes[key], 1,  volume || 0)
            }
          }
        }
      }
      this.hasLoadedInfo && this.updateShares()
      this.$watch(() => this.hasLoadedInfo, val => this.updateShares())
    },
    computed: {
      showShares: getters.showShares,
      initializedContracts: getters.initializedContracts,
      totalSupply() {
        if(this.tokenSupply) return this.tokenSupply
        return getters.totalSupply()
      },
      totalBalance() {
        if(this.tokenBalance) return this.tokenBalance
        return getters.totalBalance()
      },
      curveStakeBalance() {
        return currentContract.curveStakeBalance
      },
      volumePool() {
        return this.currentPool == 'iearn' ? 'y' : this.currentPool == 'susdv2' ? 'susd' : this.currentPool
      },
      currentPool() {
        return this.pool || currentContract.currentContract
      },
      virtualPrice1() {
        return this.virtual_price || (currentContract.virtual_price || 0)
      },
      totalBalances() {
        return this.bal_info && this.bal_info.reduce((a, b) => a + b, 0) || null
      },
      totalUserBalances() {
        return this.l_info && this.l_info.reduce((a, b) => a + b, 0) || null
      },
      totalStakedBalances() {
        return this.staked_info && this.staked_info.reduce((a, b) => a + b, 0) || null
      },
      usdShare1() {
        let share = (this.usdShare || getters.usdShare())
        if(this.isBTC) share *= this.btcPrice
        return share
      },
      usdStake1() {
        let stake =  (this.usdStake || getters.usdStake())
        if(this.isBTC) stake *= this.btcPrice
        return stake
      },
      A1() {
        return this.A || ((getters.A() * 1e18) | 0)
      },
      future_A1() {
        return this.future_A || ((getters.future_A()) | 0)
      },
      initial_A() {
        return getters.initial_A()
      },
      isRampingUp() {
        return getters.initial_A_time() < Date.now()/1000 < getters.future_A_time() 
      },
      rampEnd() {
        return helpers.formatDateToHuman(getters.future_A_time())
      },
      admin_actions_readable() {
        return helpers.formatDateToHuman(this.admin_actions_deadline1)
      },
      admin_actions_deadline1() {
        return this.admin_actions_deadline || getters.admin_actions_deadline()
      },
      poolVolumeUSD() {
        return volumeStore.state.volumes[this.currentPool == 'iearn' ? 'y' : this.currentPool == 'susdv2' ? 'susd' : this.currentPool][0]
      },
      poolVolume() {
        return volumeStore.state.volumes[this.currentPool == 'iearn' ? 'y' : this.currentPool == 'susdv2' ? 'susd' : this.currentPool][1] || 0
      },
      nativeVolume() {
        if(this.isBTC) return this.poolVolume
        return this.poolVolumeUSD
      },
      isBTC() {
        return ['tbtc', 'ren', 'sbtc'].includes(this.currentPool)
      },
      hasLoadedInfo() {
        let N_COINS = allabis[this.currentPool].N_COINS;
        return this.currentPool && (this.l_info && this.l_info[N_COINS-1] !== undefined) || (this.staked_info && this.staked_info[N_COINS - 1] !== undefined)
      },
    }
  }
</script>

<style scoped>
  .tooltip {
    margin-left: 0;
  }
  
  .tooltip .tooltiptext {
    font-weight: normal;
    background-color: #aaaaaa;
    color: black;
  }
  .tooltip .tooltiptext::after {
    border-color: #aaaaaa transparent transparent transparent;
  }
</style>
