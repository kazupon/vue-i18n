<template>
	<div class="window white">
	        <fieldset class='poolsdialog donations'>
	            <legend>Integrations</legend>
	            <div :class="{selected: activeLink == 0}">
	                <a href='https://1inch.exchange/'>
	                	<div class='index'>0.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/1inch.svg'" alt="1inch exchange">
					</div>
            		<span class='text'>1inch exchange</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	DEX Aggregator with the best prices on the market. Achieving best rates by splitting orders among multiple DEXes in one single transaction.
	                </div>
	            </div>
	            </div>
	            <div :class="{selected: activeLink == 1}">
	                <a href='https://paraswap.io'>
	                	<div class='index'>1.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/paraswap.png'" alt="Paraswap exchange">
					</div>
            		<span class='text'>Paraswap exchange</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	The Fastest Liquidity Aggregator. Cheaper & Safer thanks to Gas Token & 1k ETH cover
	                </div>
	            </div>
	            </div>
	            <div :class="{selected: activeLink == 2}">
	                <a href='https://swap.totle.com/'>
	                	<div class='index'>2.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/totle.svg'" alt="Totle exhange">
					</div>
            		<span class='text'>Totle swap</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	Reliable DeFi Aggregation
						<div>
							Totle aggregates DeFi services and automatically finds you the best price.
						</div>
	                </div>
	            </div>
	            </div>
	            <div :class="{selected: activeLink == 3}">
	                <a href='https://dex.ag'>
	                	<div class='index'>3.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/dexag.png'" alt="DEX.ag exchange">
					</div>
            		<span class='text'>DEX.ag exchange</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
						DEX.AG is a DEX aggregator that gets you the best price for your trade across multiple DEXes.
	                </div>
	            </div>
	            </div>
	            <div :class="{selected: activeLink == 4}">
	                <a href='https://debank.com/projects/curve'>
	                	<div class='index'>4.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/debank.svg'" alt="DeBank">
					</div>
            		<span class='text'>Debank DeFi wallet</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	DeBank is an all-in-one DeFi wallet, from where you can track DeFi portfolio, explore DeFi projects, compare DeFi rates.
	                </div>
	            </div>
	            </div>
	            <div :class="{selected: activeLink == 5}">
	                <a href='https://docs.instadapp.io/connectors/curve'>
	                	<div class='index'>5.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/instadapp.webp'" alt="InstaDApp">
					</div>
            		<span class='text'>InstaDApp DSA</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	DSA platform is designed to allow developers to build extensible products and business models on top of DeFi with maximum security and composability.
	                </div>
	            </div>
	            </div>
	            <div :class="{selected: activeLink == 6}">
	                <a href='https://www.coingecko.com/en/exchanges/curve'>
	                	<div class='index'>6.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/coingecko.webp'" alt="CoinGecko">
					</div>
            		<span class='text'>CoinGecko</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	Cryptocurrency Prices &amp; Market Capitalization
	                </div>
	            </div>
	            </div>
				<div :class="{selected: activeLink == 7}">
	                <a href='https://www.zapper.fi/dashboard'>
	                	<div class='index'>7.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/zapper.svg'" alt="Zapper">
					</div>
            		<span class='text'>Zapper.fi</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	A simple dashboard for DeFi. Easily track and visualize all your DeFi assets and liabilities in one simple interface.
	                </div>
	            </div>
	            </div>
	            <div :class="{selected: activeLink == 8}">
	                <a href='https://zerion.io/'>
	                	<div class='index'>8.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/zerion.png'" alt="Zerion">
					</div>
            		<span class='text'>Zerion</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                	A simple interface to access decentralized finance to invest, earn interest and borrow crypto assets.
	                </div>
	            </div>
	            </div>

	            <div :class="{selected: activeLink == 9}">
	                <a href='https://pools.fyi/'>
	                	<div class='index'>9.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/poolsfyi.png'" alt="pools.fyi">
					</div>
            		<span class='text'>Pools.fyi</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
		                	Find the best liquidity pools
		                </div>
	            	</div>
	            </div>

	            <div :class="{selected: activeLink == 10}">
	                <a href='https://spells.fyi/'>
	                	<div class='index'>10.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/spellsfyi.png'" alt="spells.fyi">
					</div>
            		<span class='text'>Spells.fyi</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
		                	Review upcoming admin changes
		                </div>
	            	</div>
	            </div>

	            <div :class="{selected: activeLink == 11}">
	                <a href='https://dydx.exchange/'>
	                	<div class='index'>11.</div>
	                	<div class='icon-container'>
	                		<img class='dydx icon' :src="publicPath + 'icons/integrations/dydx.svg'" alt="dydx exchange">
					</div>
            		<span class='text'>dydx exchange</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
		                	dYdX allows trading BTC Perpetual with up to 10x leverage
		                </div>
		            </div>
	            </div>

	            <div :class="{selected: activeLink == 11}">
	                <a href='https://etherscan.io/accounts/label/curve-fi'>
	                	<div class='index'>11.</div>
	                	<div class='icon-container'>
	                		<img class='etherscan icon' :src="publicPath + 'icons/integrations/etherscan.png'" alt="etherscan explorer">
					</div>
            		<span class='text'>Etherscan</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
		                	Ethereum Blockchain Explorer
		                </div>
		            </div>
	            </div>

	            <div :class="{selected: activeLink == 12}">
	                <a href='https://coinmarketcap.com/currencies/curve-dao-token/'>
	                	<div class='index'>12.</div>
	                	<div class='icon-container'>
	                		<img class='icon' :src="publicPath + 'icons/integrations/coinmarketcap.png'" alt="CoinMarketCap">
					</div>
            		<span class='text'>CoinMarketCap</span></a>

	                <div class='descriptionscontainer'>
	                	<div class='descriptions'>
	                		Cryptocurrency market cap rankings, charts, and more
	                	</div>
	                </div>
	            </div>

	        </fieldset>
	    </div>
</template>

<script>
	export default {
		metaInfo: {
	      title: 'Curve.fi :: Integrations',
	      meta: [
	        {'property': 'og:title', 'content': 'curve.fi/integrations'},
	        {'property': 'og:url', 'content': 'https://curve.fi/integrations'},
	        {'property': 'og:type', 'content': 'website'},
	        {'property': 'og:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
	        {'property': 'og:image', 'content': '/curve.png'},
	        {'name': 'twitter:card', 'content': 'summary_large_image'},
	        {'name': 'twitter:title', 'content': 'curve.fi/integrations'},
	        {'name': 'twitter:site', 'content': '@CurveFinance'},
	        {'name': 'twitter:creator', 'content': '@CurveFinance'},
	        {'name': 'twitter:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
	        {'name': 'twitter:url', 'content': 'https://curve.fi/integrations'},
	        {'name': 'twitter:image', 'content': '/curve.png'},
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
	            if(e.code == 'ArrowDown' && this.activeLink < 11) {
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
	                window.open(document.querySelector('.poolsdialog .selected a').href, '_blank', 'noopener,norefferer')
	            }
			},
	    },
	}
</script>

<style scoped>
	.descriptionscontainer {
		
	}

	.descriptions {
		height: 0;
		overflow: hidden;
		transition: all 0.5s;
		margin-left: 2.2em;
	}

	fieldset > div:hover .descriptions {
		padding-top: 0.6em;
		height: 30px;
	}

	.poolsdialog div:hover {
		background: transparent;
		color: black;
	}

	fieldset > div > a {
		height: 2em;
		vertical-align: middle;
		display: flex;
	}

	fieldset > div > a .index {
		flex: 0.1;
	}

	fieldset > div > a .icon-container {
		height: auto;
		flex: 0.15;
	}

	fieldset > img {
		vertical-align: middle;
	}

	fieldset > div > a .text {
		flex: 3;
	}

	.dydx.icon {
		filter: brightness(0) saturate(100%);
		transform: scale(1.5);
	}

</style>