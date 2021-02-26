<template>
  <div id="app" :class="{'root': true, [$route.name]: true}">
    <div class='screencontainer'>
     <div class="top-menu-bar">
      <label for="hamburger" class='border-menu'></label>
      <input type="checkbox" id="hamburger"/>

      <div class='poolsdropdown'>
        <button class='simplebutton'>☰</button>
        <div class='dropdown'>
           <!--  <a :href="'//compound.localhost:8080'+$route.path" :class="{selected: currentPool == 'compound'}" @click="changePools('compound')">Compound</a>
            <a :href="'//usdt.localhost:8080'+$route.path" :class="{selected: currentPool == 'usdt'}" @click="changePools('usdt')">USDT</a>
            <a :href="'//y.localhost:8080'+$route.path" :class="{selected: currentPool == 'iearn'}" @click="changePools('iearn')">Y</a>
            <a :href="'//busd.localhost:8080'+$route.path" :class="{selected: currentPool == 'busd'}" @click="changePools('busd')">bUSD</a> -->

            <router-link :to="'/compound/' + ($route.path.split('/')[2] || '')  ">Compound</router-link>
            <!-- <router-link :to="'/usdt/' + ($route.path.split('/')[2] || '')  ">USDT</router-link> -->
            <router-link :to="'/pax/' + ($route.path.split('/')[2] || '')">PAX</router-link>
            <router-link :to="'/iearn/' + ($route.path.split('/')[2] || '') ">Y</router-link>
            <router-link :to="'/busd/' + ($route.path.split('/')[2] || '')  ">bUSD</router-link>
            <router-link :to="'/susdv2/' + ($route.path.split('/')[2] || '')">sUSD</router-link>
            <router-link :to="'/ren/' + ($route.path.split('/')[2] || '')">renBTC</router-link>
            <router-link :to="'/sbtc/' + ($route.path.split('/')[2] || '')">sBTC</router-link>
<!--             <a href="https://iearn.finance/pool">sUSD</a> -->
            <p>____________</p>
            <button class='simplebutton' @click = 'changeWallets'>Change wallet</button>
            <button id='changeAccounts' class='simplebutton' 
              @click = 'changeAccounts'>Change accounts</button>
        </div>
      </div>

      <router-link to="/">Home</router-link>
      <a href="https://dao.curve.fi">DAO</a>
      <router-link to='/earlyCRV'>Community CRV pre-allocation</router-link>
      <router-link to="/trade">Trade</router-link>
      <div class='poolsdropdown'>
        <router-link to="/combinedstats">Stats</router-link>
        <div class='dropdown'>
          <router-link to="/combinedstats">Stats</router-link>
          <router-link to="/dailystats">Daily stats</router-link>
          <router-link to="/volumepercoin">Coin volumes</router-link>
          <router-link to="/volumeperpair">Pair volumes</router-link>
          <router-link to="/totaldeposits">Total deposits</router-link>
        </div>
      </div>
      <router-link to="/curvepay">Pay</router-link>
      <router-link to="/risks">Risks</router-link>
      <div class='poolsdropdown right'>
        <span>?</span>
        <div class='dropdown'>
          <router-link to="/audits">Audits</router-link>
          <router-link to="/events">Events</router-link>
          <router-link to="/contracts">Contracts</router-link>
          <router-link to="/bugbounty">Bug Bounty</router-link>
          <router-link to="/rootfaq">FAQ</router-link>
          <router-link to="/integrations">Integrations</router-link>
          <router-link to="/donate">Donate</router-link>
          <router-link to="/devdocs">Developer Docs</router-link>
          <a href='https://guides.curve.fi' rel='noopener noreferrer'>Guides</a>
          <p>____________</p>
          <a href="https://twitter.com/CurveFinance" rel='noopener noreferrer'>#Twitter</a>
          <a href="https://t.me/curvefi" rel='noopener noreferrer'>@Telegram</a>
          <a href="https://t.me/curveficn" rel='noopener noreferrer'>@Telegram CN</a>
          <a href="https://discord.gg/9uEHakc" rel='noopener noreferrer'>@Discord</a>
          <a href="https://explore.duneanalytics.com/public/dashboards/RTH47mNjQcoLv5oG0HMDdI0iDq7BHxk1PzCRdwQB" rel='noopener noreferrer'>Dune Analytics</a>
          <p>____________</p>
          <a href="https://github.com/curvefi/curve-contract">git@</a>
          <a href="https://github.com/curvefi/curve-vue">git@UI</a>
        </div>
      </div>
      <a href="https://dao.curve.fi" class='showmobile'>DAO</a>
      <router-link to="/combinedstats" class='showmobile'>Stats</router-link>
      <router-link to="/dailystats" class='showmobile'>Daily stats</router-link>
      <router-link to="/volumepercoin" class='showmobile'>Coin volumes</router-link>
      <router-link to="/volumeperpair" class='showmobile'>Pair volumes</router-link>
      <router-link to="/totaldeposits" class='showmobile'>Total deposits</router-link>
      <router-link to="/audits" class='showmobile'>Audits</router-link>
      <router-link to="/events" class='showmobile'>Events</router-link>
      <router-link to="/bugbounty" class='showmobile'>Bug Bounty</router-link>
      <router-link to="/rootfaq" class='showmobile'>FAQ</router-link>
      <router-link to="/integrations" class='showmobile'>Integrations</router-link>
      <router-link to="/donate" class='showmobile'>Donate</router-link>
      <router-link to="/devdocs" class='showmobile'>Developer Docs</router-link>
      <a href='https://guides.curve.fi' rel='noopener noreferrer' class='showmobile'>Guides</a>
      <a href="https://twitter.com/CurveFinance" class='showmobile' rel='noopener noreferrer'>#Twitter</a>
      <a href="https://t.me/curvefi" class='showmobile' rel='noopener noreferrer'>@Telegram</a>
      <a href="https://discord.gg/9uEHakc" class='showmobile' rel='noopener noreferrer'>@Discord</a>
      <a href="https://explore.duneanalytics.com/public/dashboards/RTH47mNjQcoLv5oG0HMDdI0iDq7BHxk1PzCRdwQB" class='showmobile' rel='noopener noreferrer'>Dune Analytics</a>
      <a href="https://github.com/curvefi/curve-contract" class='showmobile'>git@</a>
      <a href="https://github.com/curvefi/curve-vue" class='showmobile'>git@UI</a>
      <button class='simplebutton showmobile' @click = 'changeWallets'>Change wallet</button>
      <button id='changeAccounts' class='simplebutton showmobile' 
        v-show="['ledger', 'trezor'].includes(walletName)" 
        @click = 'changeAccounts'>Change accounts</button>
    </div>
    <div id="screen">
        <div :class="'blue window ' + $route.name">
            <h1><img :src="logoSrc" alt="🌀 Curve"></h1>
        </div>
        <div class='info-message gentle-message window half-width gentle-message' v-if='hasConnectedWallet'>
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
    </div>
    <footer>
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
  import { getters, contract as currentContract, changeContract, poolMenu } from '../../contract'
  import init, { onboard, changeWallets } from '../../init'

  export default {
    metaInfo: {
      title: 'Curve.fi',
      meta: [
        {'property': 'og:title', 'content': 'curve.fi'},
        {'property': 'og:url', 'content': 'https://curve.fi'},
        {'property': 'og:type', 'content': 'website'},
        {'property': 'og:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
        {'property': 'og:image', 'content': '/curve.png'},
        {'name': 'twitter:card', 'content': 'summary_large_image'},
        {'name': 'twitter:title', 'content': 'curve.fi'},
        {'name': 'twitter:site', 'content': '@CurveFinance'},
        {'name': 'twitter:creator', 'content': '@CurveFinance'},
        {'name': 'twitter:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
        {'name': 'twitter:url', 'content': 'https://curve.fi'},
        {'name': 'twitter:image', 'content': '/curve.png'},
      ]
    },
    components: {
      
    },
    computed: {
      ...getters,
      poolMenu() {
        return poolMenu;
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

<style scoped>
  #changeAccounts {
    margin-top: 0.3em;
  }
  @media only screen and (min-device-width : 320px) and (max-device-width : 730px) {
    .top-menu-bar > .poolsdropdown {
      display: none;
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
  .blue.window.Events + .info-message.gentle-message {
    width: 730px;
    max-width: 730px;
  }
  .blue.window.Trade + .info-message.gentle-message {
    width: 1000px;
    max-width: 1000px;
  }
  .CRV a:hover, .CRV a:visited {
    color: white;
  }
</style>