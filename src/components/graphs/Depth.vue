<template>
	<div class='bigdiv'>
		<div id='zoomSelect'>
			<div>
				<label for='zoom'>Zoom {{zoom}}%</label>
				<input type='range' min='0' max='300' id='zoom' v-model='zoom'/>
			</div>
			<button @click='resetChart'>Reset time interval</button>
			<span id='linearcontainer'>
				<input type='checkbox' id='linearscale' v-model='linearscale'>
				<label for='linearscale'>Linear scale</label>
			</span>
<!-- 			<input type='range' min='0' max='110' id='volzoom' v-model='volZoom'/>
 -->	</div>
<!-- 		<button @click='setExtremes'>Look at actual price * +-0.01</button>
 -->		<div @mousemove = 'move' ref='chartcontainer'>
			<highcharts :options='depthchart' ref='highcharts' class='depthchart'></highcharts>
		</div>
	</div>
</template>

<script>
	import Highcharts from 'highcharts'
	import HC_exporting from 'highcharts/modules/exporting';
	import HC_exporting_data from 'highcharts/modules/export-data';
	HC_exporting(Highcharts);
	HC_exporting_data(Highcharts)

	Highcharts.setOptions({
		lang: {
			loading: '',
		}
	})


	import {Chart} from 'highcharts-vue'
	import EventBus from './EventBus'
	import tradeStore, { updatePoolInfo, getters as tradeGetters } from './tradeStore'
	import stableswap_fns from '../../utils/stableswap_fns'
	import { getters, contract, LENDING_PRECISION, PRECISION, changeContract, init } from '../../contract'
	import abis from '../../allabis'
	import Decimal from 'break_infinity.js'
	import * as helpers from '@/utils/helpers'
	import * as priceStore from '../common/priceStore'

	let BN = val => new Decimal(val)

	import * as Comlink from 'comlink'

	import Worker from 'worker-loader!./worker.js';
	const worker = new Worker();
	const calcWorker = Comlink.wrap(worker);

	export default {
		components: {
			highcharts: Chart,
		},
		data() {
			return {
				loading: true,
				zoom: 100,
				volZoom: 100,
				btcPrice: null,
				chart: null,
			    	depthchart: {
			    		chart: {
			    			type: 'areaspline',
			    			zoomType: 'x',
			    			marginTop: 20,
			    			marginLeft: 20,
			    			marginRight: 20,
			    		},
			    		exporting: {
							buttons: {
								contextButton: {
									menuItems: ["printChart",
							                    "separator",
							                    "downloadPNG",
							                    "downloadJPEG",
							                    "downloadPDF",
							                    "downloadSVG",
							                    "separator",
							                    "downloadCSV",
							                    "downloadXLS",
							                    //"viewData",
							                    "openInCloud"]
								}
							}
						},
			    		title: {
			    			text: '',
			    		},
			    		xAxis: {
			    			//type: 'logarithmic',
			    			crosshair: {
			    				color: 'gray',
			    				width: 1.5,
			    			},
			    			minPadding: 0,
			    			maxPadding: 0,
			    			 plotLines: [{
			    			 	id: 1,
					            color: '#888',
					            value: 1,
					            width: 1,
					            label: {
					                text: 'Actual price',
					                rotation: 90
					            }
					        }],
			    			title: {
			    				text: 'Price'
			    			},
			    			events: {
			    				setExtremes: (function(self) {
				    				return function(e) {
				    					//on reset zoom button click
						                if(typeof e.min == 'undefined' && typeof e.max == 'undefined') {
						                	//setting zoom to 100 doesn't work?? so 99.99 is pretty close :D
						                	self.zoom = 99.99
						                }

				    				}
			    				})(this)
			    			}
			    		},
			    		yAxis: [{
			    			type: 'logarithmic',
			    			crosshair: {
			    				color: 'gray',
			    				width: 1.5,
			    			},
			    			min: 1,
					        lineWidth: 1,
					        gridLineWidth: 1,
					        title: null,
					        tickWidth: 1,
					        tickLength: 5,
					        tickPosition: 'inside',
					        labels: {
					            align: 'left',
					            x: 8
					        }
					    }, {
					    	type: 'logarithmic',
					    	crosshair: {
					    		color: 'gray',
					    		width: 1.5,
					    	},
					    	min: 1,
					        opposite: true,
					        linkedTo: 0,
					        lineWidth: 1,
					        gridLineWidth: 0,
					        title: null,
					        tickWidth: 1,
					        tickLength: 5,
					        tickPosition: 'inside',
					        labels: {
					            align: 'right',
					            x: -8
					        }
					    }],
					    legend: {
					        enabled: false
					    },
					    plotOptions: {
					        area: {
					            fillOpacity: 0.2,
					            step: 'center',
					        }
					    },
					    tooltip: {
					        headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
					        valueDecimals: 2
					    },
					    series: [],
			    	},
			    	pair: {
				  		idx: '0-1',
				  		val: 'DAI-USDC'
				  	},
				  	pool: 'compound',
				  	pools: [],
				  	interval: 5,
			    	bbrect: null,
			    	data: [],
			    	currentValue: 1,
			    	imax: 100,
			    	inverse: false,
			    	unwatch: null,
			    	lastTimestamp: null,
			    	linearscale: false,
			}
		},
		async created() {
			//EventBus.$on('selected', this.selectPool)
			EventBus.$on('changeTime', this.changeTime)
			EventBus.$on('updateDepth', this.updateDepth)
			this.unwatch = this.$watch(()=>contract.initializedContracts, async (val) => {
				this.updateDepth()
                this.unwatch();
            })
		},
		watch:{
			async selectChange(val, oldval) {
				//don't call mount when pools are changed, it's called when contacts are re-initialized
				//pairIdx or interval are changed
				let arr = val[1].concat();
				let oldarr = oldval[1].concat();
				if(arr.sort().toString() == oldarr.sort.toString()) this.mounted()
				else {
					let inits = await Promise.all(val[1].map(p=>{
						return init(contract.contracts[p == 'y' ? 'iearn' : p])
					}))
					this.chart.showLoading()
					//this.chart.xAxis[0].removePlotLine(1)
                	//no need to as all 4 pools are loaded at page load
                	await updatePoolInfo();
					this.mounted()
				}
			},
			zoom() {
				this.setZoom()
			},
			linearscale(val) {
				this.chart.yAxis[1].update({
					linkedTo: undefined,
					type: val ? 'linear' : 'logarithmic'
				})
				this.chart.yAxis[0].update({
					type: val ? 'linear' : 'logarithmic'
				})
				this.setZoom();
			},
/*			volZoom(val) {
				this.chart.yAxis[0].min = val*100+1
				this.chart.yAxis[1].min = val*100+1
				console.log(val*100+1)
				this.chart.yAxis[0].update();
				this.chart.yAxis[1].update()
			}*/
		},
		async mounted() {
			this.chart = this.$refs.highcharts.chart
			this.chart.showLoading();
			this.btcPrice = await priceStore.getBTCPrice()
/*			await Promise.all(tradeStore.pools.map(p=>{
				return init(contract.contracts[p == 'y' ? 'iearn' : p])
			}))
			await this.updatePoolInfo();*/
			contract.multicall && this.updateDepth();
		},
		beforeDestroy() {
			//EventBus.$off('selected', this.selectPool)
			EventBus.$off('changeTime', this.changeTime)
			EventBus.$off('updateDepth', this.updateDepth)
		},
		computed: {
			selectChange() {
				return [tradeStore.pairIdx, tradeStore.pools, tradeStore.interval]
			}
		},
		methods: {
			async updateDepth() {
				let inits = await Promise.all(tradeStore.pools.map(p=>{
					return init(contract.contracts[p == 'y' ? 'iearn' : p])
				}))
				await updatePoolInfo()
                this.mounted()
			},
			setZoom() {
                let data1 = this.chart.series[1].xData
                let data2 = this.chart.series[0].xData
				let min_price = Math.min(data1[0], data1[data1.length-1])
				let bid_price = Math.max(data1[0], data1[data1.length-1])
				let max_price = Math.max(data2[0], data2[data2.length-1])
				let ask_price = Math.min(data2[0], data2[data2.length-1])
				let p = (bid_price + ask_price) / 2
				let priceLeft = Math.max(min_price, p - (max_price - p))
				let priceRight = Math.min(max_price, p + (p - min_price))

				let zoom = +this.zoom
				let base = this.linearscale ? 30 : 10
				priceLeft = p - (p - priceLeft) * Math.pow(base, 2 * (zoom / 300 - 1))
				priceRight = p + (priceRight - p) * Math.pow(base, 2 * (zoom / 300 - 1))
				this.chart.xAxis[0].setExtremes(priceLeft, priceRight, true, false);
			},
			setExtremes() {
				//console.log(this.chart.series[0].xData[0], this.chart.series[1].xData[0]);
            	this.chart.xAxis[0].setExtremes(this.chart.series[1].xData[0] - 0.001, this.chart.series[0].xData[0] + 0.001, true, true)
			},
			async resetChart() {
				this.chart.setTitle({ text: '' })
				//await updatePoolInfo()
				this.mounted()
			},
			//we can go back in time! Time travelling!
			changeTime(poolInfo) {
				tradeStore.poolInfo = poolInfo
				let timestamp = poolInfo.timestamp || poolInfo[0].timestamp
				this.chart.setTitle({ 
					text: helpers.formatDateToHuman(timestamp),
				})
				this.chart.update({
					chart: {
						marginTop: 40
					}
				})
				this.lastTimestamp = timestamp
				this.mounted(timestamp)
			},
			async mounted(lastTimestamp) {
				this.chart.showLoading()
				//this.chart.xAxis[0].removePlotLine(1)
				this.pools = tradeStore.pools
				this.pairIdx = tradeStore.pairIdx
				this.pairVal = tradeStore.pairVal
				this.interval = tradeStore.interval

				//return;
				this.loading = true;
				/*while(this.chart.series.length) {
					this.chart.series[0].remove()
				}*/

				let pools = tradeStore.pools.map(p=>p == 'y' ? 'iearn' : p)
				let allPools = pools
				let poolIdx = pools.map(pool => allPools.indexOf(pool))
				let poolConfigs = tradeGetters.poolConfigs()


				/*console.log(contract.bal_info.map((b,i)=>b/contract.c_rates[i]))
				console.log(contract.c_rates)*/


				let fromCurrency = this.pairIdx.split('-')[0]
				let toCurrency = this.pairIdx.split('-')[1]

				if(fromCurrency > toCurrency) this.inverse = true

				/*let dx1 = 1000 * contract.coin_precisions[fromCurrency]
				let dy1 = 1000 * contract.coin_precisions[toCurrency]*/
				

				let asks = []
				let bids = []
				//console.log(poolConfig, "config", this.poolInfo)

				//let balanceSum = contract.bal_info[fromCurrency] + contract.bal_info[toCurrency]
				let balanceSum = 0;
				for(let [key, pool] of tradeStore.pools.entries()) {
					if(poolConfigs[key].N_COINS-1 < toCurrency || poolConfigs[key].N_COINS-1 < fromCurrency) continue;
					if(pool == 'y') pool = 'iearn'
					let cont = contract.contracts[pool]
					if(pool == contract.currentContract) cont = contract
					let balanceFrom = cont.bal_info[fromCurrency]
					let balanceTo = cont.bal_info[toCurrency]
					if(['tbtc' ,'ren', 'sbtc'].includes(pool)) {
						balanceFrom *= this.btcPrice
						balanceTo *= this.btcPrice
					}
					balanceSum += balanceFrom + balanceTo
				}

			 	let imax = Math.floor(100 * (1 + Math.log10(10) / Math.log10(balanceSum)))
				this.imax = imax


				let bxs = []
				let axs = []
				let ys = []
				for(let i = 0; i <= imax; i++) {
					if(lastTimestamp && this.lastTimestamp > lastTimestamp) return;
					let exp = Math.pow(balanceSum, i / 100)
					ys.push(exp)
					for(let j = 0; j < pools.length; j++) {
						if(poolConfigs[j].N_COINS-1 < toCurrency || poolConfigs[j].N_COINS-1 < fromCurrency) continue;
						if(!tradeStore.poolInfo[poolIdx[j]]) continue;
						let volume = i;
						let dx1 = exp * abis[pools[j]].coin_precisions[fromCurrency]
						let dy1 = exp * abis[pools[j]].coin_precisions[toCurrency]
						if(['tbtc', 'ren', 'sbtc'].includes(pools[j])) {
							dx1 /= this.btcPrice
							dy1 /= this.btcPrice
						}
						let dy = await calcWorker.calcPrice({...tradeStore.poolInfo[poolIdx[j]], ...poolConfigs[j]}, fromCurrency, toCurrency, BN(dx1).toFixed(0), true)
						dy = +(BN(dy).div(abis[pools[j]].coin_precisions[toCurrency]))
						let dx = await calcWorker.calcPrice({...tradeStore.poolInfo[poolIdx[j]], ...poolConfigs[j]}, toCurrency, fromCurrency, BN(dy1).toFixed(0), true)
						dx = +(BN(dx).div(abis[pools[j]].coin_precisions[fromCurrency]))

						/*let dy = +(calc.get_dy_underlying(fromCurrency, toCurrency, BN(dx1).toFixed(0), true)) / (contract.coin_precisions[toCurrency])
						let dx = +(calc.get_dy_underlying(toCurrency, fromCurrency, BN(dy1).toFixed(0), true)) / (contract.coin_precisions[fromCurrency])*/
						//console.log(+dy)
						let bidrate = dy * abis[pools[j]].coin_precisions[fromCurrency] / (dx1)
						let askrate = (dy1) / abis[pools[j]].coin_precisions[toCurrency] / dx

						//console.log(dy, dx)
						if(!bxs[j]) bxs[j] = []
						if(!axs[j]) axs[j] = []
						bxs[j].push(+bidrate)
						axs[j].push(+askrate)
					}
				}
				bxs = bxs.filter(el=>el.length)
				axs = axs.filter(el=>el.length)
				//not sure if needed
				if(bxs.length == 1) {
					bids = bxs[0].map((price, i) => [price, ys[i]])
					asks = axs[0].map((price, i) => [price, ys[i]])
				}
				else {
					const bis = bxs.map(bx => helpers.interp(bx, ys))
					const ais = axs.map(ax => helpers.interp(ax, ys))

					for(let i = 0; i < bxs.length; i++) {
						for(let j = 0; j < bxs[0].length; j++) {

							bids.push([
								+bxs[i][j],
								bis.map(f => f(bxs[i][j])).reduce((a, b) => a + b, 0)// < 0 ? 0 : bis.map(f => f(bxs[i][j])).reduce((a, b) => a + b, 0)

							])
							asks.push([
								+axs[i][j],
								ais.map(f => f(axs[i][j])).reduce((a, b) => a + b, 0)// < 0 ? 0 : ais.map(f => f(axs[i][j])).reduce((a, b) => a + b, 0)

							])
						}
					}

					bids.sort((a, b) => {
					  if(b[0] == a[0]) return b[1] - a[1]
					  else return b[0] - a[0]
					})
					asks.sort((a, b) => {
					  if(b[0] == a[0]) return a[1] - b[1]
					  else return a[0] - b[0]
					})
				}


				bids = bids.filter(b => b[0] > Math.max(Math.max(...bxs.map(xs=>Math.min(...xs))), 0.1) )
				asks = asks.filter(a => a[0] < Math.min(Math.min(...axs.map(xs=>Math.max(...xs))), 10) )
                bids = bids.reverse()


				this.chart.hideLoading()
				while(this.chart.series.length) {
					this.chart.series[0].remove()
				}
				this.chart.xAxis[0].removePlotLine(1)
				if(lastTimestamp && this.lastTimestamp > lastTimestamp) return;
			    this.$refs.highcharts.chart.addSeries({
		            name: 'Asks',
		            data: asks,
		            color: !this.inverse ? '#B70000' : '#007A00',
		        })
			    this.$refs.highcharts.chart.addSeries({
		            name: 'Bids',
		            data: bids,
		            color: !this.inverse ? '#007A00' : '#B70000',
		        })
				
			    //maybe not right - get from web3 when no this.poolInfo but this should be the same because calc is initialized with now
			    // - get from clicked point value otherwise

			    //currentValue without fees
/*				for(let [key, pool] of tradeStore.pools.entries()) {
					if(pool == 'y') pool = 'iearn'
					let cont = contract.contracts[pool]
					if(pool == contract.currentContract) cont = contract
		        	this.currentValue = +(BN(await calcWorker.calcPrice({...this.poolInfo[key], ...poolConfigs[key]}, fromCurrency, toCurrency, 
		        		BN(abis[pool].coin_precisions[fromCurrency]).toFixed(0))).div(BN(abis[pool].coin_precisions[toCurrency])))
				}*/
				//this.currentValues /= tradeStore.pools.length
				this.currentValue = (Math.max(...bxs.flat()) + Math.min(...axs.flat())) / 2
		    	this.chart.xAxis[0].addPlotLine({
		    		id: 1,
		    		value: this.currentValue,
		    		label: {
		    			text: 'Actual price ' + this.currentValue.toFixed(4)
		    		}
		    	})
		    	/*this.chart.xAxis[0].options.plotLines[0].value = this.currentValue
		    	this.chart.xAxis[0].options.plotLines[0].label.text = 'Actual price ' + this.currentValue.toFixed(4)
		    	this.chart.xAxis[0].update()*/
		    	
		    	this.setZoom();
		        this.$refs.highcharts.chart.redraw()
            	this.bbrect = this.$refs.highcharts.$el.getBoundingClientRect();
            	this.bbrect._top = this.bbrect.top + window.scrollY;
            	this.chart.hideLoading();
			    this.loading = false;
			},
			move(event) {
				if(this.loading) return;
				let x = event.pageX;
	            let y = event.pageY;
	            x = x - this.bbrect.left;
	            y = y - this.bbrect._top;
	            
	            //console.log(this.chart.hoverPoint)
				if (this.chart.crossLabel) {
					// update label
					this.chart.crossLabel.attr({
						x: x - 15,
						text: this.chart.xAxis[0].toValue(x).toFixed(4)
					});

					this.chart.hoverPoint && this.chart.crossYLabelLeft.attr({
						y: this.chart.hoverPoint.plotY + this.chart.plotTop + 25,
						text: this.chart.yAxis[0].toValue(this.chart.hoverPoint.plotY + this.chart.plotTop).toFixed(4)
					});

					this.chart.hoverPoint && this.chart.crossYLabelRight.attr({
						y: this.chart.hoverPoint.plotY + this.chart.plotTop + 25,
						text: this.chart.yAxis[0].toValue(this.chart.hoverPoint.plotY + this.chart.plotTop).toFixed(4)
					});

					if(!document.querySelector('#depth_chart .highcharts-series.highcharts-series-1').classList.contains('highcharts-series-hover'))
						this.chart.crossYLabelLeft.attr('y', -9999)
					else
						this.chart.crossYLabelRight.attr('y', -9999)	
		        }
		        else {
		            // draw label
		            this.chart.crossLabel = this.chart.renderer.text(this.chart.xAxis[0].toValue(x).toFixed(4), x - 15, this.chart.plotTop - 5).add();
		            this.chart.crossYLabelLeft = this.chart.renderer.text(this.chart.yAxis[0].toValue(y).toFixed(4), this.chart.plotLeft - 5 , y - 5)
						.attr({
							rotation: -90
						})
						.add();
		            this.chart.crossYLabelRight = this.chart.renderer.text(this.chart.yAxis[0].toValue(y).toFixed(4), this.chart.plotLeft + this.chart.plotWidth + 15 , y )
						.attr({
							rotation: -90
						})
						.add();
		        }
	    	}
		}
	}
</script>

<style scoped>
	#zoomSelect {
		margin: 1em 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	#zoomSelect div {
		max-width: 300px;
	}
	#zoomSelect button {
		margin-left: 1em;
	}
  	@media only screen and (min-device-width : 320px) and (max-device-width : 730px) {
		#zoomSelect button {
			margin-left: 0;
			margin-top: 0.5em;
		}
	}
	#linearcontainer {
		margin-left: 1em;
	}
</style>
