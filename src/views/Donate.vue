<template>
	<div class="window white">
	        <fieldset class='poolsdialog donations'>
	            <legend>Donations</legend>
	            <div :class="{selected: activeLink == 0}">
	                <a href='https://gitcoin.co/grants/453/curve-related-vyper-research?tab=description'>0.<img class='icon' :src="publicPath + 'klein-vyper_optimized.svg?rev=98185d4fe81a0ff9206e8b34c66e2be5'" alt="🌀 Curve"><span class='text'>Curve-related Vyper research</span></a>
	            </div>
	            <div :class="{selected: activeLink == 1}">
	                <a href='https://etherscan.io/address/0x28b88cfD875C883cDb61938C97B8d1baabf31c88'>1.<img class='icon ethicon' :src="publicPath + 'ethereum-brands_optimized.svg?rev=8160e2e87988f42e44fd33495dead52c'" /><span class='text'>0x28b88cfD875C883cDb61938C97B8d1baabf31c88</span></a>
	            </div>
	            <div :class="{selected: activeLink == 2}">
	                <a href='https://www.blockchain.com/btc/address/1C5UfsRKCzEbDbQxKLN7Jx8HFA1ff6dfp4'>2.<img class='icon btcicon' :src="publicPath + 'btc-brands_optimized.svg?rev=7cbd9f5561d25b6aa72c5ee927a9f10a'" /><span class='text'>1C5UfsRKCzEbDbQxKLN7Jx8HFA1ff6dfp4</span></a>
	            </div>
	        </fieldset>
	    </div>
</template>

<script>
	export default {
		metaInfo: {
	      title: 'Curve.fi :: Donate',
	      meta: [
	        {'property': 'og:title', 'content': 'curve.fi/donate'},
	        {'property': 'og:url', 'content': 'https://curve.fi/donate'},
	        {'property': 'og:type', 'content': 'website'},
	        {'property': 'og:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
	        {'property': 'og:image', 'content': '/curve.png'},
	        {'name': 'twitter:card', 'content': 'summary_large_image'},
	        {'name': 'twitter:title', 'content': 'curve.fi/donate'},
	        {'name': 'twitter:site', 'content': '@CurveFinance'},
	        {'name': 'twitter:creator', 'content': '@CurveFinance'},
	        {'name': 'twitter:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
	        {'name': 'twitter:url', 'content': 'https://curve.fi/donate'},
	        {'name': 'twitter:image', 'content': '/curve.png/donate'},
	      ]
	    },

	    data: () => ({
	    	activeLink: -1,
	    	keydownListener: null,
	    }),

	    computed: {
	    	publicPath() {
	    		return process.env.BASE_URL
	    	},
	    },

	    mounted() {
	    	this.keydownListener = document.addEventListener('keydown', this.handle_navigating)
	    },

	    beforeDestroy() {
			document.removeEventListener('keydown', this.handle_navigating);
	    },

	    methods: {
	    	handle_navigating(e) {
				if(this.activeLink == -1) return this.activeLink = 0
	            if(e.code == 'ArrowUp' && this.activeLink != 0) {
	                e.preventDefault();
	                this.activeLink--;
	            }
	            if(e.code == 'ArrowDown' && this.activeLink < 2) {
	                e.preventDefault();
	                this.activeLink++;
	            }
	            if(e.code.includes('Digit')) {
	                e.preventDefault();
	                var digit = e.code.slice(-1);
	                if(digit > 5) return;
	                this.activeLink = digit
	            }
	            if(e.code == 'Enter') {
	                e.preventDefault();
	                window.open(document.querySelector('.poolsdialog .selected a').href, '_blank', 'noopener,noreferrer')
	            }
			},
	    },

	}
</script>