<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import { getters, contract as currentContract } from './contract'
    import { capitalizeFirstLetter } from './utils/helpers'

    const descriptions = {
    	compound: 'A curve.fi portal for swapping cDAI/cUSDC',
    	usdt: 'A curve.fi Tethered portal for swapping cDAI/cUSDC/USDT',
    	iearn: 'A curve.fi yTokens portal for swapping DAI/USDC/USDT/TUSD',
    	busd: 'A curve.fi portal for swapping BUSD and other stablecoins',
    }

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
                title: "Curve.fi",
				meta: [
					{'property': 'og:title', 'content': 'curve.fi/' + this.currentPool},
					{'property': 'og:url', 'content': 'https://curve.fi/' + this.currentPool},
					{'property': 'og:type', 'content': 'website'},
					{'property': 'og:description', 'content': descriptions[this.currentPool]},
					{'property': 'og:image', 'content':  '/curve' + this.currentPool + '_preview.png'},
					{'name': 'twitter:card', 'content': 'summary_large_image'},
					{'name': 'twitter:title', 'content': 'curve.fi/' + this.currentPool},
					{'name': 'twitter:site', 'content': '@CurveFinance'},
					{'name': 'twitter:creator', 'content': '@CurveFinance'},
					{'name': 'twitter:description', 'content': descriptions[this.currentPool]},
					{'name': 'twitter:url', 'content': 'https://curve.fi/' + this.currentPool},
					{'name': 'twitter:image', 'content': this.currentPool + '/curve_preview.png'},
				]
			}
		},
        computed: {
          ...getters,
        },
	}
</script>