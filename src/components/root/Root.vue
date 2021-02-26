<template>
	<div>

	    <basic-trade />

		<div class="window white">
	        <fieldset class='poolsdialog'>
	            <legend>
	            	Curve pools
	            	<span class='tooltip'>
	            		$
	            		<span class='tooltiptext'>
	            			Your total balances: ${{ +sumBalances.toFixed(2) }} 
	            		</span>
	            	</span>
	            </legend>
	            <div :class="{selected: activePoolLink == 0}">
	                <router-link to = '/compound'>
	                	<span class='index'>0.</span>  
	                    <span class='pooltext'>Compound</span> 
	                    <span class='pools'>[(c)DAI, (c)USDC]</span>  
	                    <span class='apr'>
	                    	<span class='tooltip'>APY:
		                    	<span class='tooltiptext long'>
		                    		<div>Pool APY + Lending APY (annualized)</div>
		                    		<div>Daily APY: {{daily_apy[0]}}%</div>
		                    		<div>Weekly APY: {{weekly_apy[0]}}%</div>
		                    		<div>Monthly APY: {{monthly_apy[0]}}%</div>
		                    		<div>Total APY: {{apy[0]}}%</div>
		                    	</span>
		                    </span>
                    	<span :class="{'loading line': !daily_apy[0]}">{{daily_apy[0]}}</span>%
                    	<br>
                    	<div :class="{'incentive-apr': true}">(+{{CRVAPYs.compound | toFixed2}}%
                			<span class='tooltip'><img class='icon small' :src="publicPath + 'logo.png'"> CRV
                                <span class='tooltiptext'>
                                    CRV LP reward annualized
                                </span>
                            </span>)
                		</div>
                    	</span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.compound && volumes.compound[0] < 0}">
	                    	<span v-show='volumes.compound && volumes.compound[0] >= 0'>${{(volumes.compound && volumes.compound[0] | 0) | formatNumber(0)}}</span>
	                    	<span v-show='!volumes.compound && volumes.compound[0]'>$0</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.compound > 0'>Balance: ${{balances.compound && balances.compound.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.compound > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.compound && balances.compound.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div>
	            <!-- <div :class="{selected: activePoolLink == 1}">
	                <router-link to = '/usdt'>
	                	<span class='index'>1.</span>  
	                    <span class='pooltext'>USDT</span>
	                    <span class='pools'>[(c)DAI, (c)USDC, USDT]</span>  
	                    <span class='apr'>
	                    	<span class='tooltip'>APY:
	                    		<span class='tooltiptext long'>
		                    		<div>Pool APY + Lending APY (annualized)</div>
		                    		<div>Daily APY: {{daily_apy[1]}}%</div>
		                    		<div>Weekly APY: {{weekly_apy[1]}}%</div>
		                    		<div>Monthly APY: {{monthly_apy[1]}}%</div>
		                    		<div>Total APY: {{apy[1]}}%</div>
		                    	</span>
	                    	</span> 
	                    	<span :class="{'loading line': !daily_apy[1]}">{{daily_apy[1]}}</span>%
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.usdt && volumes.usdt[0] < 0}">
	                    	<span v-show='volumes.usdt && volumes.usdt[0] >= 0'>${{(volumes.usdt && volumes.usdt[0] | 0) | formatNumber(0)}}</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.usdt > 0'>Balance: ${{balances.usdt && balances.usdt.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.usdt > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.usdt && balances.usdt.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div> -->
	            <div :class="{selected: activePoolLink == 1}">
	                <router-link to = '/pax'>
	                	<span class='index'>1.</span>  
	                    <span class='pooltext'>PAX</span>
	                    <span class='pools'>
	                    	[<span class='tooltip'>(yc)DAI
								<span class='tooltiptext long'>
								<router-link to='/yctokens'>ycTokens</router-link> are forked yTokens without owner and Compound lending available for ycUSDT
							</span>
							 </span>,
                    		 <span class='tooltip'>(yc)USDC
                    		 	<span class='tooltiptext long'>
                    		 	<router-link to='/yctokens'>ycTokens</router-link> are forked yTokens without owner and Compound lending available for ycUSDT
                    		 </span>
                    		 </span>,
                    		 <span class='tooltip'>(yc)USDT
                    		 	<span class='tooltiptext long'>
                    		 	<router-link to='/yctokens'>ycTokens</router-link> are forked yTokens without owner and Compound lending available for ycUSDT
                    		 </span>
                    		 </span>, 
                    		 PAX]
	                	</span>  
	                    <span class='apr'>
	                    	<span class='tooltip'>APY:
	                    		<span class='tooltiptext long'>
		                    		<div>Pool APY + Lending APY (annualized)</div>
		                    		<div>Daily APY: {{daily_apy[5]}}%</div>
		                    		<div>Weekly APY: {{weekly_apy[5]}}%</div>
		                    		<div>Monthly APY: {{monthly_apy[5]}}%</div>
		                    		<div>Total APY: {{apy[5]}}%</div>
		                    	</span>
	                    	</span> 
	                    	<span :class="{'loading line': !daily_apy[5]}">{{daily_apy[5]}}</span>%
	                    	<div :class="{'incentive-apr': true}">(+{{CRVAPYs.pax | toFixed2}}%
	                			<span class='tooltip'><img class='icon small' :src="publicPath + 'logo.png'"> CRV
	                                <span class='tooltiptext'>
	                                    CRV LP reward annualized
	                                </span>
	                            </span>)
	                		</div>
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.pax && volumes.pax[0] < 0}">
	                    	<span v-show='volumes.pax && volumes.pax[0] >= 0'>${{(volumes.pax && volumes.pax[0] | 0) | formatNumber(0)}}</span>
	                    	<span v-show='!volumes.pax && volumes.pax[0]'>$0</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.pax > 0'>Balance: ${{balances.pax && balances.pax.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.pax > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.pax && balances.pax.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div>
	            <div :class="{selected: activePoolLink == 2}">
	                <router-link to = '/y'>
	                	<span class='index'>2.</span>  
	                    <span class='pooltext'>Y</span>
	                    <span class='pools'>[(y)DAI, (y)USDC, (y)USDT, (y)TUSD]</span>  
	                    <span class='apr'>
	                    	<span class='tooltip'>APY:
	                    		<span class='tooltiptext long'>
		                    		<div>Pool APY + Lending APY (annualized)</div>
		                    		<div>Daily APY: {{daily_apy[2]}}%</div>
		                    		<div>Weekly APY: {{weekly_apy[2]}}%</div>
		                    		<div>Monthly APY: {{monthly_apy[2]}}%</div>
		                    		<div>Total APY: {{apy[2]}}%</div>
		                    	</span>
	                    	</span> 
	                    	<span :class="{'loading line': !daily_apy[2]}">{{daily_apy[2]}}</span>%
	                    	<div :class="{'loading line': yfiRewards === null, 'incentive-apr': true}">(+{{yfiRewards | toFixed2}}%
                    			<span class='tooltip'>YFI
	                                <span class='tooltiptext'>
	                                    YFI LP reward annualized
	                                </span>
	                            </span>)
                    		</div>
                    		<div :class="{'incentive-apr': true}">(+{{CRVAPYs.y | toFixed2}}%
	                			<span class='tooltip'><img class='icon small' :src="publicPath + 'logo.png'"> CRV
	                                <span class='tooltiptext'>
	                                    CRV LP reward annualized
	                                </span>
	                            </span>)
	                		</div>
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.y && volumes.y[0] < 0}">
	                    	<span v-show='volumes.y && volumes.y[0] >= 0'>${{(volumes.y && volumes.y[0] | 0) | formatNumber(0)}}</span>
	                    	<span v-show='!volumes.y && volumes.y[0]'>$0</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.y > 0'>Balance: ${{balances.y && balances.y.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.y > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.y && balances.y.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div>
	            <div :class="{selected: activePoolLink == 3}">
	                <router-link to = '/busd'>
	                	<span class='index'>3.</span>  
	                    <span class='pooltext'>BUSD</span>
	                    <span class='pools'>[(y)DAI, (y)USDC, (y)USDT, (y)BUSD]</span>  
	                    <span class='apr'>
	                    	<span class='tooltip'>APY:
	                    		<span class='tooltiptext long'>
		                    		<div>Pool APY + Lending APY (annualized)</div>
		                    		<div>Daily APY: {{daily_apy[3]}}%</div>
		                    		<div>Weekly APY: {{weekly_apy[3]}}%</div>
		                    		<div>Monthly APY: {{monthly_apy[3]}}%</div>
		                    		<div>Total APY: {{apy[3]}}%</div>
		                    	</span>
	                    	</span> 
	                    	<span :class="{'loading line': !daily_apy[3]}">{{daily_apy[3]}}</span>%
	                    	<div :class="{'incentive-apr': true}">(+{{CRVAPYs.busd | toFixed2}}%
	                			<span class='tooltip'><img class='icon small' :src="publicPath + 'logo.png'"> CRV
	                                <span class='tooltiptext'>
	                                    CRV LP reward annualized
	                                </span>
	                            </span>)
	                		</div>
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.busd && volumes.busd[0] < 0}">
	                    	<span v-show='volumes.busd && volumes.busd[0] >= 0'>${{(volumes.busd && volumes.busd[0] | 0) | formatNumber(0)}}</span>
	                    	<span v-show='!volumes.busd && volumes.busd[0]'>$0</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.busd > 0'>Balance: ${{balances.busd && balances.busd.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.busd > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.busd && balances.busd.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div>
	            <!-- <div :class="{selected: activePoolLink == 4}">
	                <router-link to = '/susd/withdraw'>
	                	<span class='index'>4.</span>  
	                    <span class='pooltext'>sUSD</span>
	                    <span class='pools'>[(y)sUSD, yCurve]</span>  
	                    <span class='apr'>APY: <span :class="{'loading line': !daily_apy[4]}">{{daily_apy[4]}}</span>%</span>
	                    <span class='volume'>
	                    	Vol: <span :class="{'loading line': volumesData.busd < 0}">
	                    	<span v-show='volumesData.busd >= 0'>${{(volumesData.busd | 0) | formatNumber(0)}}</span>
               	 		</span></span>
	                </router-link>
	            </div> -->
	            <div :class="{selected: activePoolLink == 4}">
	                <router-link to = '/susdv2'>
	                	<span class='index'>4.</span>  
	                    <span class='pooltext'>sUSD</span>
	                    <span class='pools'>[DAI, USDC, USDT, sUSD]</span>  
	                    <span class='apr'>
	                    	<span>
	                    		<span class='tooltip'>APY:
	                    			<span class='tooltiptext long'>
			                    		<div>Pool APY + Lending APY (annualized)</div>
			                    		<div>Daily APY: {{daily_apy[4]}}%</div>
			                    		<div>Weekly APY: {{weekly_apy[4]}}%</div>
			                    		<div>Monthly APY: {{+monthly_apy[4] == 0 ? 'N/A' : monthly_apy[4]}}%</div>
			                    		<div>Total APY: {{apy[4]}}%</div>
			                    	</span>
	                    		</span> 
	                    		<span :class="{'loading line': !daily_apy[4]}">{{daily_apy[4]}}%</span>
	                    		<div :class="{'loading line': snxRewards === null, 'incentive-apr': true}">(+{{snxRewards | toFixed2}}%
	                    			<span class='tooltip'>SNX
		                                <span class='tooltiptext'>
		                                    SNX LP reward annualized
		                                </span>
		                            </span>)
	                    		</div>
	                    		<div :class="{'incentive-apr': true}">(+{{CRVAPYs.susdv2 | toFixed2}}%
		                			<span class='tooltip'><img class='icon small' :src="publicPath + 'logo.png'"> CRV
		                                <span class='tooltiptext'>
		                                    CRV LP reward annualized
		                                </span>
		                            </span>)
		                		</div>
	                    	</span>
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.susd && volumes.susd[0] < 0}">
	                    	<span v-show='volumes.susd && volumes.susd[0] >= 0'>${{(volumes.susd && volumes.susd[0] | 0) | formatNumber(0)}}</span>
	                    	<span v-show='!volumes.susd && volumes.susd[0]'>$0</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.susdv2 > 0'>Balance: ${{balances.susdv2 && balances.susdv2.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.susdv2 > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.susdv2 && balances.susdv2.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div>
	            <!-- <div :class="{selected: activePoolLink == 5}">
	                <router-link to = '/tbtc'>
	                	<span class='index'>5.</span>  
	                    <span class='pooltext'>tBTC</span>
	                    <span class='pools'>[tBTC, hBTC, wBTC]</span>  
	                    <span class='apr'>
	                    	<span class='tooltip'>APY:
	                    		<span class='tooltiptext long'>
		                    		<div>Pool APY + Lending APY (annualized)</div>
		                    		<div>Daily APY: {{daily_apy[6]}}%</div>
		                    		<div>Weekly APY: {{weekly_apy[6]}}%</div>
		                    		<div>Monthly APY: {{monthly_apy[6]}}%</div>
		                    		<div>Total APY: {{apy[6]}}%</div>
		                    	</span>
	                    	</span> 
	                    	<span :class="{'loading line': !daily_apy[6]}">{{daily_apy[6]}}</span>%
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.tbtc && volumes.tbtc[0] < 0}">
	                    	<span v-show='volumes.tbtc && volumes.tbtc[0] >= 0'>${{(volumes.tbtc && volumes.tbtc[0] | 0) | formatNumber(0)}}</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.tbtc > 0'>Balance: ${{balances.tbtc && balances.tbtc.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.tbtc > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.tbtc && balances.tbtc.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div> -->
	            <div :class="{selected: activePoolLink == 5}">
	                <router-link to = '/ren'>
	                	<span class='index'>5.</span>  
	                    <span class='pooltext'>ren</span>
	                    <span class='pools'>[renBTC, wBTC]</span>  
	                    <span class='apr'>
	                    	<span class='tooltip'>APY:
	                    		<span class='tooltiptext long'>
		                    		<div>Pool APY + Lending APY (annualized)</div>
		                    		<div>Daily APY: {{daily_apy[7]}}%</div>
		                    		<div>Weekly APY: {{weekly_apy[7]}}%</div>
		                    		<div>Monthly APY: {{monthly_apy[7]}}%</div>
		                    		<div>Total APY: {{apy[7]}}%</div>
		                    	</span>
	                    	</span> 
	                    	<span :class="{'loading line': !daily_apy[7]}">{{daily_apy[7]}}</span>%
	                    	<div :class="{'incentive-apr': true}">(+{{CRVAPYs.ren | toFixed2}}%
	                			<span class='tooltip'><img class='icon small' :src="publicPath + 'logo.png'"> CRV
	                                <span class='tooltiptext'>
	                                    CRV LP reward annualized
	                                </span>
	                            </span>)
	                		</div>
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.ren && volumes.ren[0] < 0}">
	                    	<span v-show='volumes.ren && volumes.ren[0] >= 0'>${{(volumes.ren && volumes.ren[0] | 0) | formatNumber(0)}}</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.ren > 0'>Balance: ${{balances.ren && balances.ren.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.ren > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.ren && balances.ren.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div>
	            <div :class="{selected: activePoolLink == 6}">
	                <router-link to = '/sbtc'>
	                	<span class='index'>6.</span>  
	                    <span class='pooltext'>sbtc</span>
	                    <span class='pools'>[renBTC, wBTC, sBTC]</span>
	                    <span class='apr'>
	                    	<span>
	                    		<span class='tooltip'>APY:
	                    			<span class='tooltiptext long'>
			                    		<div>Pool APY + Lending APY (annualized)</div>
			                    		<div>Daily APY: {{daily_apy[8]}}%</div>
			                    		<div>Weekly APY: {{weekly_apy[8]}}%</div>
			                    		<div>Monthly APY: {{+monthly_apy[8] == 0 ? 'N/A' : monthly_apy[8]}}%</div>
			                    		<div>Total APY: {{apy[8]}}%</div>
			                    	</span>
	                    		</span> 
	                    		<span :class="{'loading line': !daily_apy[8]}">{{daily_apy[8]}}%</span>
	                    		<div :class="{'loading line': sbtcRewards === null, 'incentive-apr': true}">(+{{sbtcRewards | toFixed2}}%
	                    			<span class='tooltip'>SNX/REN
		                                <span class='tooltiptext'>
		                                    SNX/REN LP reward annualized
		                                </span>
		                            </span>)
	                    		</div>
	                    		<div :class="{'loading line': balRewards === null, 'incentive-apr': true}">(+{{balRewards | toFixed2}}%
	                    			<span class='tooltip'>BAL
		                                <span class='tooltiptext'>
		                                    BAL reward annualized
		                                </span>
		                            </span>)
	                    		</div>
	                    		<div :class="{'incentive-apr': true}">(+{{CRVAPYs.sbtc | toFixed2}}%
		                			<span class='tooltip'><img class='icon small' :src="publicPath + 'logo.png'"> CRV
		                                <span class='tooltiptext'>
		                                    CRV LP reward annualized
		                                </span>
		                            </span>)
		                		</div>
	                    	</span>
	                    </span>
	                    <span class='volume'>Vol: <span :class="{'loading line': volumes.sbtc && volumes.sbtc[0] < 0}">
	                    	<span v-show='volumes.sbtc && volumes.sbtc[0] >= 0'>${{(volumes.sbtc && volumes.sbtc[0] | 0) | formatNumber(0)}}</span>
               	 		</span></span>
               	 		<span class='balance'>
           	 				<span class='showmobile' v-show='balances.sbtc > 0'>Balance: ${{balances.sbtc && balances.sbtc.toFixed(2)}} </span>
               	 			<span class='tooltip' v-show='balances.sbtc > 0'>
               	 				<img :src="publicPath + 'dollar-sign-solid.svg'">
               	 				<span class='tooltiptext'>Balance: ${{balances.sbtc && balances.sbtc.toFixed(2)}}</span>
               	 			</span>
               	 		</span>
	                </router-link>
	            </div>
	        </fieldset>
	    </div>

	    <total-balances :total-volume='totalVolume'/>

	</div>
</template>

<script>
	import Vue from 'vue'
	import TotalBalances from './TotalBalances.vue'
	import BasicTrade from '../graphs/BasicTrade.vue'
	import allabis, { ERC20_abi, balancer_ABI, balancer_address, } from '../../allabis'
	import * as volumeStore from '@/components/common/volumeStore'
	import * as priceStore from '@/components/common/priceStore'

	import * as helpers from '../../utils/helpers'

	import { contract } from '../../contract'

	export default {
		components: {
			TotalBalances,
			BasicTrade,
		},
		data: () => ({
			activePoolLink: -1,
			pools: ['compound','usdt','y','busd','susdv2','pax','ren', 'sbtc'],
			daily_apy: [],
			weekly_apy: [],
			monthly_apy: [],
			apy: [],
			start: 0,
			end: 0,
			volumes: {
				compound: [-1, -1],
				usdt: [-1, -1],
				y: [-1, -1],
				busd: [-1, -1],
				susd: [-1, -1],
				pax: [-1, -1],
				tbtc: [-1, -1],
				ren: [-1, -1],
				sbtc: [-1, -1],
			},
			balances: {
				compound: -1,
				usdt: -1,
				y: -1,
				busd: -1,
				susdv2: -1,
				pax: -1,
				tbtc: -1,
				ren: -1,
				sbtc: -1,
			},
			snxRewards: null,
			sbtcRewards: null,
			yfiRewards: null,
			balRewards: null,
			btcPrice: null,

			CRVAPYs: {},
		}),
		async created() {
			var start = new Date();
			start.setHours(0,0,0,0);
			this.start = start.getTime() / 1000

			var end = new Date();
			end.setHours(23,59,59,999);
			this.end = end.getTime() / 1000

			this.$watch(() => contract.web3 && contract.multicall, val => {
				if(!val) return;
				this.getCurveRewards()
				this.getBalances()
			})
		},
		async mounted() {
			this.keydownListener = document.addEventListener('keydown', this.handle_pool_change)
	        this.getAPY()
			contract.web3 && contract.multicall && this.getCurveRewards() && this.getBalances();
		},
		beforeDestroy() {
			document.removeEventListener('keydown', this.handle_pool_change);
		},
		computed: {
			totalVolume() {
				return volumeStore.totalVolume()
			},
			publicPath() {
                return process.env.BASE_URL
            },
			sumBalances() {
				return Object.values(this.balances).filter(balance => balance > 0).reduce((a, b) => a + b, 0)
			},
		},
		methods: {
			async getCurveRewards() {
				this.getCRVAPY()
				let curveRewards = new contract.web3.eth.Contract(allabis.susdv2.sCurveRewards_abi, allabis.susdv2.sCurveRewards_address)
				let sbtcRewards = new contract.web3.eth.Contract(allabis.sbtc.sCurveRewards_abi, allabis.sbtc.sCurveRewards_address)
				let yfiRewards = new contract.web3.eth.Contract(allabis.iearn.sCurveRewards_abi, allabis.iearn.sCurveRewards_address)

				let sCurve = new contract.web3.eth.Contract(allabis.susdv2.swap_abi, allabis.susdv2.swap_address)
				let sbtcCurve = new contract.web3.eth.Contract(allabis.sbtc.swap_abi, allabis.sbtc.swap_address)
				let yCurve = new contract.web3.eth.Contract(allabis.iearn.swap_abi, allabis.iearn.swap_address)

				let balancerPool = new contract.web3.eth.Contract(balancer_ABI, balancer_address)

				let calls = [
					[curveRewards._address, curveRewards.methods.totalSupply().encodeABI()],
					[sCurve._address, sCurve.methods.get_virtual_price().encodeABI()],
					[curveRewards._address, curveRewards.methods.DURATION().encodeABI()],
					[curveRewards._address, curveRewards.methods.rewardRate().encodeABI()],

					[sbtcRewards._address, sbtcRewards.methods.totalSupply().encodeABI()],
					[sbtcCurve._address, sbtcCurve.methods.get_virtual_price().encodeABI()],

					[	
						balancerPool._address, 
						balancerPool.methods.getBalance('0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f').encodeABI()
					],
                    [
                    	balancerPool._address,
                    	balancerPool.methods.getBalance('0x408e41876cccdc0f92210600ef50372656052a38').encodeABI()
                	],

					[yfiRewards._address, yfiRewards.methods.totalSupply().encodeABI()],
					[yCurve._address, yCurve.methods.get_virtual_price().encodeABI()],
                	[yfiRewards._address, yfiRewards.methods.DURATION().encodeABI()],
					[yfiRewards._address, yfiRewards.methods.rewardRate().encodeABI()],

					[curveRewards._address, curveRewards.methods.periodFinish().encodeABI()],
					[sbtcRewards._address, sbtcRewards.methods.periodFinish().encodeABI()],
					[yfiRewards._address, yfiRewards.methods.periodFinish().encodeABI()],
				]

				let aggcalls = await contract.multicall.methods.aggregate(calls).call();
				let decoded = aggcalls[1].map(hex => contract.web3.eth.abi.decodeParameter('uint256', hex))
				let prices = await this.fetchPrices()
				let [snxPrice, renPrice, btcPrice, balPrice, balancerTVL, yfiPrice] = prices;

				//total factor 0.64

				this.balRewards = (decoded[6] / 1e18 * snxPrice + decoded[7] / 1e18 * renPrice) * 0.64 / balancerTVL * balPrice * 100

				this.snxRewards = 365 * (decoded[2] * decoded[3] / 1e18)/7*snxPrice/((+decoded[0]) * (+decoded[1])/1e36) * 100
				let now = Date.now() / 1000
				if(+decoded[12] + 30*60 < now)
					this.snxRewards = 0

				this.sbtcRewards = (10000 * snxPrice + 25000 * renPrice) / 7 * 365 / (btcPrice * decoded[4] * decoded[5] / 1e36) * 100
				if(+decoded[13] + 30*60 < now)
					this.sbtcRewards = 0

				this.yfiRewards = 365 * (decoded[10] * decoded[11] / 1e18)/7*yfiPrice/((+decoded[8] * (+decoded[9]) / 1e36)) * 100
				if(+decoded[14] + 30*60 < now)
					this.yfiRewards = 0

				console.log(this.sbtcRewards, "SBTC REWARDS")
			},
			async fetchPrices() {
				let requests  = await Promise.allSettled([
					fetch('https://api.coingecko.com/api/v3/simple/price?ids=havven,republic-protocol,bitcoin,balancer,yearn-finance&vs_currencies=usd'),
					fetch('https://pushservice.curve.fi/getBalancerTVL'),
				])
				let prices = await Promise.all(requests.map((request, i) => {
					return request.status == 'fulfilled' && request.value.json()
				}))
				let snxPrice = prices[0] && prices[0].havven.usd
				let renPrice = prices[0] && prices[0]['republic-protocol'].usd
				let btcPrice = prices[0] && prices[0]['bitcoin'].usd
				let balPrice = prices[0] && prices[0].balancer.usd
				let balancerTVL = prices[1].TVL
				let yfiPrice = prices[0] && prices[0]['yearn-finance'].usd
				if(requests[0].status == 'rejected') {
					let requests = await Promise.allSettled([
						fetch('https://api.coinpaprika.com/v1/tickers/hav-havven'), 
						fetch('https://api.coinpaprika.com/v1/tickers/ren-republic-protocol'),
						fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin'),
						fetch('https://poloniex.com/public?command=returnTicker'),
					])
					let prices = await Promise.all(requests.map(request => request.status == 'fulfilled' && request.value.json()))
					snxPrice = prices[0] && prices[0].quotes.USD.price;
					renPrice = prices[1] && prices[1].quotes.USD.price;
					btcPrice = prices[2] && prices[2].quotes.USD.price;
					balPrice = prices[3] && prices[3]['USDT_BAL'].last
					yfiPrice = prices[4] && prices[4]['USDT_YFI'].last
				}
				return [snxPrice, renPrice, btcPrice, balPrice, balancerTVL, yfiPrice]
			},
			async getBalances() {
				if(!contract.default_account) return;
				contract.contracts.compound = contract;
				let calls = this.pools.flatMap(k => {
					return [
						//balanceOf(address)
						[allabis[k].token_address, '0x70a08231000000000000000000000000' + contract.default_account.slice(2)],
						//get_virtual_price
						[allabis[k].swap_address, "0xbb7b8b80"]
					]})
				calls.push([allabis.susdv2.sCurveRewards_address, '0x70a08231000000000000000000000000' + contract.default_account.slice(2)])
				calls.push([allabis.sbtc.sCurveRewards_address, '0x70a08231000000000000000000000000' + contract.default_account.slice(2)])
				calls.push([allabis.iearn.sCurveRewards_address, '0x70a08231000000000000000000000000' + contract.default_account.slice(2)])
				let aggcalls = await contract.multicall.methods.aggregate(calls).call()
				let decoded = aggcalls[1].map(hex => web3.eth.abi.decodeParameter('uint256', hex))
				console.log(decoded, "THE DECODED")
				//this.balances = []
				helpers.chunkArr(decoded, 2).slice(0,this.pools.length).map((v, i) => {
					let key = this.pools[i]
					Vue.set(this.balances, key, +v[0] * (+v[1]) / 1e36);
					if(['tbtc', 'ren', 'sbtc'].includes(key)) Vue.set(this.balances, key, this.balances[key] * this.btcPrice)
				})
				let len = decoded.length
				Vue.set(this.balances, 'susdv2', this.balances.susdv2 + (+decoded[len-3] * decoded[9]) / 1e36)
				Vue.set(this.balances, 'sbtc', this.balances.sbtc + ((+decoded[len-2] * decoded[15]) / 1e36) * this.btcPrice)
				Vue.set(this.balances, 'y', this.balances.y + (+decoded[len-1] * decoded[5]) / 1e36)
			},
			handle_pool_change(e) {
				if(document.querySelector('#from_currency') == document.activeElement 
					|| document.querySelector('#custom_slippage_input') == document.activeElement
					|| document.querySelector('#custom_gas_input') == document.activeElement) return;
				if(this.activePoolLink == -1) return this.activePoolLink = 0
	            if(e.code == 'ArrowUp' && this.activePoolLink != 0) {
	                e.preventDefault();
	                this.activePoolLink--;
	            }
	            if(e.code == 'ArrowDown' && this.activePoolLink < 6) {
	                e.preventDefault();
	                this.activePoolLink++;
	            }
	            if(e.code.includes('Digit')) {
	                e.preventDefault();
	                var digit = e.code.slice(-1);
	                if(digit > 6) return;
	                this.activePoolLink = digit
	            }
	            if(e.code == 'Enter') {
	                e.preventDefault();
	                this.$router.push('/'+pools[this.activePoolLink])
	            }
			},
			async getAPY() {
				let pools = ['compound', 'usdt', 'y', 'busd', 'susd', 'pax', 'tbtc','ren2','rens']
	            let requests = await Promise.all([fetch(`${window.domain}/raw-stats/apys.json`), helpers.retry(fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`), 300)])
	            let res = await Promise.all(requests.map(request => request.json()))
	            let stats = res[0]
	            this.btcPrice = res[1]
	            this.btcPrice = this.btcPrice.bitcoin.usd
                for(let [key, value] of Object.entries(volumeStore.state.volumes)) {
                	if(volumeStore.state.volumes[key] && volumeStore.state.volumes[key][0] == -1) {
                		let volume = key == 'ren' ? stats.volume.ren2 : key == 'sbtc' ? stats.volume.rens : stats.volume[key]
                		Vue.set(volumeStore.state.volumes[key], 0, volume || 0)
                		if(['tbtc', 'ren', 'sbtc'].includes(key)) {
                			Vue.set(volumeStore.state.volumes[key], 0, volume * this.btcPrice || 0)
                			Vue.set(volumeStore.state.volumes[key], 1, volume || 0)
                		}
                	}
                }
                this.volumes = volumeStore.state.volumes;
	            for(let [i, pool] of pools.entries()) {
	                var daily_apy = stats.apy.day[pool];
	                var weekly_apy = stats.apy.week[pool];
	                var monthly_apy = stats.apy.month[pool];
	                var apy = stats.apy.total[pool];
	                this.daily_apy.push((daily_apy*100).toFixed(2))
	                this.weekly_apy.push((weekly_apy*100).toFixed(2))
	                this.monthly_apy.push((monthly_apy*100).toFixed(2))
	                this.apy.push((apy*100).toFixed(2))
	            }
			},

			async getCRVAPY() {

				console.log("GET CRV APY")

				let poolInfo = {
					compound: {
						swap: '0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56',
						swap_token: '0x845838DF265Dcd2c412A1Dc9e959c7d08537f8a2',
						name: 'compound',
						gauge: '0x7ca5b0a2910B33e9759DC7dDB0413949071D7575',
					},
					usdt: {
						swap: '0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C',
						swap_token: '0x9fC689CCaDa600B6DF723D9E47D84d76664a1F23',
						name: 'usdt',
						gauge: '0xBC89cd85491d81C6AD2954E6d0362Ee29fCa8F53',
					},
					y: {
						swap: '0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51',
						swap_token: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
						name: 'y',
						gauge: '0xFA712EE4788C042e2B7BB55E6cb8ec569C4530c1',
					},
					busd: {
						swap: '0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27',
						swap_token: '0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B',
						name: 'busd',
						gauge: '0x69Fb7c45726cfE2baDeE8317005d3F94bE838840',
					},
					susdv2: {
						swap: '0xA5407eAE9Ba41422680e2e00537571bcC53efBfD',
						swap_token: '0xC25a3A3b969415c80451098fa907EC722572917F',
						name: 'susdv2',
						gauge: '0xA90996896660DEcC6E997655E065b23788857849',
					},
					pax: {
						swap: '0x06364f10B501e868329afBc005b3492902d6C763',
						swap_token: '0xD905e2eaeBe188fc92179b6350807D8bd91Db0D8',
						name: 'pax',
						gauge: '0x64E3C23bfc40722d3B649844055F1D51c1ac041d',
					},
					ren: {
						swap: '0x93054188d876f558f4a66B2EF1d97d16eDf0895B',
						swap_token: '0x49849C98ae39Fff122806C06791Fa73784FB3675',
						name: 'ren',
						gauge: '0xB1F2cdeC61db658F091671F5f199635aEF202CAC',
					},
					sbtc: {
						swap: '0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714',
						swap_token: '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3',
						name: 'sbtc',
						gauge: '0x705350c4BcD35c9441419DdD5d2f097d7a55410F',
					},
				}

				let decodedGauges = [
				  "0x7ca5b0a2910B33e9759DC7dDB0413949071D7575",
				  "0xBC89cd85491d81C6AD2954E6d0362Ee29fCa8F53",
				  "0xFA712EE4788C042e2B7BB55E6cb8ec569C4530c1",
				  "0x69Fb7c45726cfE2baDeE8317005d3F94bE838840",
				  "0x64E3C23bfc40722d3B649844055F1D51c1ac041d",
				  "0xB1F2cdeC61db658F091671F5f199635aEF202CAC",
				  "0xA90996896660DEcC6E997655E065b23788857849",
				  "0x705350c4BcD35c9441419DdD5d2f097d7a55410F"
				]

				let gaugeController_address = '0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB'
				let gauge_relative_weight = '0x6207d866000000000000000000000000'

				let pools = ['compound','usdt','iearn','busd','susdv2','pax','ren','sbtc']

				let prices = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,curve-dao-token&vs_currencies=usd')
				prices = await prices.json()
				let btcPrice = prices.bitcoin.usd
				let CRVprice = prices['curve-dao-token'].usd

				let weightCalls = decodedGauges.map(gauge => [gaugeController_address, gauge_relative_weight + gauge.slice(2)])

				let aggCallsWeights = await contract.multicall.methods.aggregate(weightCalls).call()
				let decodedWeights = aggCallsWeights[1].map((hex, i) => [weightCalls[i][0], web3.eth.abi.decodeParameter('uint256', hex) / 1e18])

				let ratesCalls = decodedGauges.map(gauge => [
					[gauge, "0x180692d0"],
					[gauge, "0x17e28089"],
				])

				let aggRates = await contract.multicall.methods.aggregate(ratesCalls.flat()).call()
				let decodedRate = aggRates[1].map(hex => web3.eth.abi.decodeParameter('uint256', hex))
				let gaugeRates = decodedRate.filter((_, i) => i % 2 == 0).map(v => v / 1e18)
				let workingSupplies = decodedRate.filter((_, i) => i % 2 == 1).map(v => v / 1e18)

				let virtualPriceCalls = Object.values(poolInfo).map(v => [v.swap, "0xbb7b8b80"])
				let aggVirtualPrices = await contract.multicall.methods.aggregate(virtualPriceCalls).call()
				let decodedVirtualPrices = aggVirtualPrices[1].map((hex, i) => [virtualPriceCalls[i][0], web3.eth.abi.decodeParameter('uint256', hex) / 1e18])

				let weightData = decodedWeights.map((w, i) => {
					let pool = Object.values(poolInfo).find(v => v.gauge.toLowerCase() == '0x' + weightCalls[i][1].slice(34).toLowerCase()).name
					let swap_address = poolInfo[pool].swap
					let virtual_price = decodedVirtualPrices.find(v => v[0].toLowerCase() == swap_address.toLowerCase())[1]
					let _working_supply = workingSupplies[i]
					if(['ren', 'sbtc'].includes(pool))
						_working_supply *= btcPrice
					let rate = (gaugeRates[i] * w[1] * 31536000 / _working_supply * 0.4) / virtual_price
					let apy = rate * CRVprice * 100
					if(isNaN(apy))
						apy = 0
					Object.values(poolInfo).find(v => v.name == pool).gauge_relative_weight = w[1]
					console.log(pool, apy, "POOL CRV APY")
					Vue.set(this.CRVAPYs, pool, apy)
				})

			}
		}
	}
</script>

<style scoped>
	@media only screen and (min-device-width : 320px) and (max-device-width : 730px) {
		#app .tradeview {
 	 		width: 90%;
		}
		.poolsdialog.poolsdialog > div a {
			display: block;
		  text-align: center;
		}
		.poolsdialog .balance {
			width: 100%;
		}
		.poolsdialog .balance .showmobile {
			display: block;
			text-align: center;
		}
		.poolsdialog .balance .tooltip {
			display: none;
		}
		.poolsdialog.poolsdialog > div a > span {
			display: block;
			text-align: center;
		}
		.poolsdialog.poolsdialog > div span.pooltext, .poolsdialog.poolsdialog > div span.index {
			display: inline;
		}
		.pools {
		  width: 100%;
		}
		.poolsdialog .incentive-apr {
			text-align: center;
		}
	}
	.poolsdialog > div a {
		display: flex;
		justify-content: space-between;
	}
	.poolsdialog > div > a:hover .tooltip {
 		border-bottom: 1px dotted white;
	}
	.poolsdialog > div > a:hover img {
		filter: invert(1);
	}
	.poolsdialog > div a span {
		text-align: left;
	}
	.index {
		flex: 0.1;
	}
	.pooltext {
		flex: 0.4;
	}
	.pools {
		flex: 1.6;
	}
	.apr {
		flex: 0.8;
	}
	.volume {
		flex: 0.8;
	}
	.balance {
		width: 12px;
	}
	.pools .tooltip {
		vertical-align: bottom;
		overflow: hidden;
	}
	.tooltip {
		position: relative;
		margin-left: 0;
	}
	.tooltiptext.long {
		max-width: 250px;
		position: absolute;
		margin-left: 0;
		transform: translateX(-50%) translateX(6px);
	}
	.tooltiptext.long a {
		display: inline-block;
		background: transparent;
		text-decoration: underline;
	}
	.tooltiptext.long > div {
		padding-left: 1em;
		text-align: left;
	}
	.tooltiptext.long > div:hover {
		background: none;
	}
	.balance img {
		height: 12px;
	}
	.poolsdialog > div {
		margin-top: 0.1em;
	}
</style>