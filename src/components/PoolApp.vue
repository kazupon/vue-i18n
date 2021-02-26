<template>
  <div id="app">
    <div class='screencontainer'>
     <div class="top-menu-bar">
      <label for="hamburger" class='border-menu'></label>
      <input type="checkbox" id="hamburger"/>

      <div class='poolsdropdown'>
        <button class='simplebutton' :class="{'loading line': !initializedContracts && !['Stats', 'FAQ', 'Donate'].includes($route.name)}">[{{poolMenu[currentPool]}}]</button>
        <div class='dropdown'>
           <!--  <a :href="'//compound.localhost:8080'+$route.path" :class="{selected: currentPool == 'compound'}" @click="changePools('compound')">Compound</a>
            <a :href="'//usdt.localhost:8080'+$route.path" :class="{selected: currentPool == 'usdt'}" @click="changePools('usdt')">USDT</a>
            <a :href="'//y.localhost:8080'+$route.path" :class="{selected: currentPool == 'iearn'}" @click="changePools('iearn')">Y</a>
            <a :href="'//busd.localhost:8080'+$route.path" :class="{selected: currentPool == 'busd'}" @click="changePools('busd')">bUSD</a> -->

            <router-link :to="'/compound/' + ($route.path.split('/')[2] || '')  " :class="{selected: currentPool == 'compound'}">Compound</router-link>
            <!-- <router-link :to="'/usdt/' + ($route.path.split('/')[2] || '')  " :class="{selected: currentPool == 'usdt'}">USDT</router-link> -->
            <router-link :to="'/pax/' + ($route.path.split('/')[2] || '') " :class="{selected: currentPool == 'pax'}">PAX</router-link>
            <router-link :to="'/iearn/' + ($route.path.split('/')[2] || '') " :class="{selected: currentPool == 'iearn'}">Y</router-link>
            <router-link :to="'/busd/' + ($route.path.split('/')[2] || '')  " :class="{selected: currentPool == 'busd'}">bUSD</router-link>
            <router-link :to="'/susdv2/' + ($route.path.split('/')[2] || '') " :class="{selected: currentPool == 'susdv2'}">sUSD</router-link>
            <router-link :to="'/ren/' + ($route.path.split('/')[2] || '')">renBTC</router-link>
            <router-link :to="'/sbtc/' + ($route.path.split('/')[2] || '')">sBTC</router-link>
            <!-- <a href="https://iearn.finance/pool">sUSD</a> -->
            <p>____________</p>
            <router-link to='/'>Home</router-link>
            <router-link to='/trade'>Trade</router-link>
            <router-link to='/combinedstats'>All stats</router-link>
            <router-link to='/dailystats'>Daily stats</router-link>
            <router-link to='/volumepercoin'>Coin volumes</router-link>
            <a href="https://twitter.com/CurveFinance">#Twitter</a>
            <a href="https://t.me/curvefi">@Telegram</a>
            <a href="https://t.me/curveficn">@Telegram CN</a>
            <a href="https://discord.gg/9uEHakc" rel='noopener noreferrer'>@Discord</a>
            <a href="https://explore.duneanalytics.com/public/dashboards/RTH47mNjQcoLv5oG0HMDdI0iDq7BHxk1PzCRdwQB">Dune Analytics</a>
            <p>____________</p>
            <button class='simplebutton' @click = 'changeWallets'>Change wallet</button>
            <button id='changeAccounts' class='simplebutton' 
              v-show="['ledger', 'trezor'].includes(walletName)" 
              @click = 'changeAccounts'>Change accounts</button>
        </div>
      </div>

      <router-link to='/'>Root</router-link>
      <a href="https://dao.curve.fi">DAO</a>
      <router-link to='/combinedstats' class='showmobile'>All stats</router-link>
      <router-link :to="'/'+currentPool" v-show="currentPool !='susd'">Buy and sell</router-link>
      <router-link :to="'/' + currentPool + '/deposit'" v-show="currentPool !='susd'">Deposit</router-link>
      <router-link :to="'/' + currentPool + '/withdraw'">Withdraw</router-link>
      <router-link :to="'/' + currentPool + '/withdraw_old'" v-show="currentPool == 'compound' && oldBalance > 0">Withdraw old</router-link>
      <router-link to="/susd/withdraw" v-show="currentPool == 'susdv2' && oldBalance > 0">Withdraw old</router-link>
      <router-link :to="'/' + currentPool + '/stats'" v-show="currentPool !='susd'">Stats</router-link>
      <router-link :to="'/' + currentPool + '/profit'" v-show="currentPool !='susd'">Profit</router-link>
      <router-link :to="'/curvepay/' + currentPool">Pay</router-link>
      <div class='poolsdropdown right'>
        <span>?</span>
        <div class='dropdown'>
          <a :href="'https://etherscan.io/address/' + this.poolAddress" rel='noopener noreferrer'>Pool contract</a>
          <a :href="'https://etherscan.io/address/' + this.tokenAddress" rel='noopener noreferrer'>Token contract</a>
          <p>____________</p>
          <router-link to="/audits">Audits</router-link>
          <router-link to="/events">Events</router-link>
          <router-link :to="'/' + currentPool + '/risks'">Risks</router-link>
          <router-link to="/bugbounty">Bug Bounty</router-link>
          <router-link :to="'/' + currentPool + '/faq'">FAQ</router-link>
          <router-link to="/integrations">Integrations</router-link>
          <router-link :to="'/' + currentPool + '/donate'">Donate</router-link>
          <router-link to="/devdocs">Developer Docs</router-link>
          <a href='https://guides.curve.fi' rel='noopener noreferrer'>Guides</a>
          <p>____________</p>
          <a :href="'https://github.com/curvefi/curve-contract/tree/pool_'+gitBranches[currentPool]" rel='noopener noreferrer'>git@</a>
          <a href="https://github.com/curvefi/curve-vue" rel='noopener noreferrer'>git@UI</a>
        </div>
      </div>
      <a href="https://dao.curve.fi" class='showmobile'>DAO</a>
      <router-link to="/audits" class='showmobile'>Audits</router-link>
      <router-link to="/events" class='showmobile'>Events</router-link>
      <router-link :to="'/' + currentPool + '/faq'" class='showmobile'>FAQ</router-link>
      <router-link to="/integrations" class='showmobile'>Integrations</router-link>
      <router-link to="/bugbounty" class='showmobile'>Bug Bounty</router-link>
      <router-link :to="'/' + currentPool + '/donate'" class='showmobile'>Donate</router-link>
      <a href='https://guides.curve.fi' rel='noopener noreferrer' class='showmobile'>Guides</a>
      <a :href="'https://github.com/curvefi/curve-contract/tree/pool_'+gitBranches[currentPool]" class='showmobile' rel='noopener noreferrer'>git@</a>
      <a href="https://github.com/curvefi/curve-vue" class='showmobile' rel='noopener noreferrer'>git@UI</a>
      <button class='simplebutton showmobile' @click = 'changeWallets'>Change wallet</button>
      <button id='changeAccounts' class='simplebutton showmobile' 
        v-show="['ledger', 'trezor'].includes(walletName)" 
        @click = 'changeAccounts'>Change accounts</button>
    </div>
    <div id="screen">
        <div :class="{'blue window': true, [$route.name]: true}">
            <h1><img :src="logoSrc" alt="🌀 Curve"></h1>
        </div>
        <div class="error window half-width info" id="error-window" v-show='error'>
          {{error}}
        </div>
        <div class='info-message gentle-message window half-width gentle-message' v-show='hasConnectedWallet'>
          You haven't connected a wallet. <button @click='changeWallets'>Connect wallet</button>
        </div>
        <div class='info-message gentle-message window half-width gentle-message CRV'>
          <div>
            <a href='https://etherscan.io/address/0xD533a949740bb3306d119CC777fa900bA034cd52'>CRV: 0xD533a949740bb3306d119CC777fa900bA034cd52</a>
          </div>
        </div>
        <div class='simple-error window' v-show='plsReturn'>
          Your recent withdrawal from Curve resulted in getting 1000 more USDT because of another user mistakenly transferring funds to the contract.
          If you wish to return them - please contact us on <a href='https://twitter.com/CurveFinance'>Twitter</a>/<a href='https://t.me/curvefi'>Telegram</a>/<a href="https://discord.gg/9uEHakc" rel='noopener noreferrer'>@Discord</a>. Thank you! 
        </div>
        <router-view/>
    </div>
    <balances-info
    :class = '{[$route.name]: true}'
    :bal_info = 'bal_info'
    :total = 'balTotal'
    :l_info = 'l_info'
    :totalShare = 'totalShare'
    :staked_info = 'staked_info'
    :totalStake = 'totalStake'
    :fee = 'fee'
    :admin_fee = 'admin_fee'
    :currencies = 'currencies'
    v-if="!['Stats', 'FAQ', 'Donate', 'Root', 'CombinedStats'].includes($route.name)"/>
    </div>
    <footer>
      <a :href="'https://etherscan.io/address/' + this.poolAddress" rel='noopener noreferrer'>Pool contract</a>
      <a :href="'https://etherscan.io/address/' + this.tokenAddress" rel='noopener noreferrer'>Token contract</a>
      <a href="https://twitter.com/CurveFinance" rel='noopener noreferrer'>#Twitter</a>
      <a href="https://t.me/curvefi" rel='noopener noreferrer'>@Telegram</a>
      <a href="https://t.me/curveficn" rel='noopener noreferrer'>@Telegram CN</a>
      <a href="https://discord.gg/9uEHakc" rel='noopener noreferrer'>@Discord</a>
      <a href="https://explore.duneanalytics.com/public/dashboards/RTH47mNjQcoLv5oG0HMDdI0iDq7BHxk1PzCRdwQB" rel='noopener noreferrer'>Dune Analytics</a>
      <a href="https://github.com/curvefi/curve-contract">git@</a>
      <a href="https://github.com/curvefi/curve-vue">git@UI</a>
      <router-link to="/devdocs">Developer Docs</router-link>
    </footer>
  </div>
</template>

<script>
  import BalancesInfo from '../components/BalancesInfo.vue'
  import { getters, contract as currentContract, changeContract, poolMenu } from '../contract'
  import init, { onboard, changeWallets } from '../init'
  import allabis from '../allabis'

  const titles = {
      compound: 'Compounded',
      usdt: 'Tethered',
      iearn: 'Yield',
      busd: 'bUSD',
      susd: 'sUSD-yCurve old',
      susdv2: 'sUSD',
        pax: 'PAX',
        tbtc: 'TBTC',
        ren: 'renBTC',
        sbtc: 'sBTC',
    }

  export default {
    metaInfo() {
      return {
        title: 'Curve.fi :: ' + titles[this.currentPool],
      }
    },
    data: () => ({
      gitBranches: {
        compound: 'compound',
        usdt: 'usdt',
        iearn: 'y',
        y: 'y',
        busd: 'busd',
        susd: 'susd_vulnerable',
        susdv2: 'susd_plain',
        pax: 'pax',
        tbtc: 'tbtc',
        ren: 'ren',
        sbtc: 'renbtc_sbtc',
      }
    }),
    components: {
      BalancesInfo,
    },
    computed: {
      allGetters() {
        return getters;
      },
      ...getters,
      poolMenu() {
        return poolMenu;
      },
      poolAddress() {
        return allabis[this.currentPool].swap_address
      },
      tokenAddress() {
        return allabis[this.currentPool].token_address
      },
      publicPath() {
        return process.env.BASE_URL
      },
      logoSrc() {
        if(!currentContract.swapbtc) return this.publicPath + 'logo_optimized.svg'
        else return this.publicPath + 'logo_ren_beta_optimized.svg'
      },
      hasConnectedWallet() {
        return this.default_account == '0x0000000000000000000000000000000000000000'
                && !['Donate', 'StatsDaily', 'Audits', 'Stats', 'Contracts', 'FAQ', 'RootFAQ'].includes(this.$route.name)
      },
      plsReturn() {
        return currentContract.currentContract.toLowerCase() == '0x72c20f89008729c91b6bb85f3104fda942494cef'.toLowerCase()
      },
    },
    methods: {
      changePools(pool) {
        changeContract(pool)
      },
      async changeWallets() {
        changeWallets()
      },
      async changeAccounts() {
        return onboard.accountSelect();
      },
    },
  }
</script>

<style>
  #changeAccounts {
    margin-top: 0.3em;
  }
  a.showmobile {
    display: none;
  }
  @media only screen and (min-device-width : 320px) and (max-device-width : 730px) {
    #hamburger:checked ~ a.showmobile {
      display: block;
    }
    .blue.window.half-width, .info-message.window.half-width {
      width: 90%;
    }
  }
  h1 > img {
    height: 52.125px;
  }
  .simple-error.window {
    box-shadow: none;
  }
  .CRV a:hover, .CRV a:visited {
    color: white;
  }
</style>