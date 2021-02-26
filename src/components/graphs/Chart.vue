<template>
	<div class = 'tradeview window white'>
		<fieldset id='onesplit' v-if='exchange'>
			<legend class='text-center'>Swap using all Curve pools</legend>
			<one-split />
		</fieldset>
 		<select-component id='select_pool'/>
 		<highcharts :constructor-type="'stockChart'" :options="chartdata" ref='highcharts'></highcharts>
		<depth id='depth_chart' />
		<fieldset id='onesplit' v-if='!exchange'>
			<legend class='text-center'>Swap using all Curve pools</legend>
			<one-split />
		</fieldset>
	</div>
</template>

<script>
	import Highcharts from 'highcharts'
	import HC_exporting from 'highcharts/modules/exporting';
	import HC_exporting_data from 'highcharts/modules/export-data';
	HC_exporting(Highcharts);
	HC_exporting_data(Highcharts)

	import {Chart} from 'highcharts-vue'
	import stockInit from 'highcharts/modules/stock'
	import Depth from './Depth.vue'
	import Select from './Select.vue'
	import EventBus from './EventBus'
	import tradeStore from './tradeStore'
	import stableswap_fns from '../../utils/stableswap_fns'
	import OneSplit from './OneSplit.vue'

	import Decimal from 'break_infinity.js'

	let BN = val => new Decimal(val)

	import * as Comlink from 'comlink'

	import Worker from 'worker-loader!./worker.js';
	const worker = new Worker();
	const calcWorker = Comlink.wrap(worker);

	import * as volumeStore from '../common/volumeStore'


/*	Highcharts.seriesTypes.column.prototype.pointAttribs = (function(func) {
	    return function(point, state) {
	      var attribs = func.apply(this, arguments);
	      
	      var candleSeries = this.chart.series[0]; // Probably you'll need to change the index
	      var candlePoint = candleSeries.points.filter(function(p) { return p.index == point.index; })[0];
	      if(!candlePoint) return attribs;
	      var color = (candlePoint.open < candlePoint.close) ? '#007A00' : '#B70000'; // Replace with your colors
	      attribs.fill = state == 'hover' ? Highcharts.Color(color).brighten(0.3).get() : color;
	      
	      return attribs;
	    };
	}(Highcharts.seriesTypes.column.prototype.pointAttribs));*/

	Highcharts.setOptions({
		lang: {
			loading: '',
			rangeSelectorZoom: '',
		}
	})

	import { contract, allCurrencies, LENDING_PRECISION, PRECISION, changeContract } from '../../contract'

	import abis from '../../allabis'

	stockInit(Highcharts)

	export default {
		components: {
			highcharts: Chart,
			Depth,
			SelectComponent: Select,
			OneSplit,
		},
		data() {
			return {
				loading: true,	
					chartdata: {
						plotOptions: {
							candlestick: {
								color: '#B70000',
								upColor: '#007A00',
							},
							series: {
								point: {
									events: {
										click: (function(self) {
											return function(e) {
												let nearest = self.chart.pointer.findNearestKDPoint(self.chart.series, false, e)

												let index = nearest.dataGroup ? nearest.dataGroup.start : nearest.index
												let poolDataPoint = self.data.map(p=>p.filter(v=>v.timestamp))
																	.map(p=>p[index])
																	.filter(p=>p)
												EventBus.$emit('changeTime', poolDataPoint)
											}
										})(this)
									}
								}
							}
						},
						navigator: {
							series: {
								lineColor: '#a6cdf1',
								color: '#f8fbfe'
							}
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
						rangeSelector: {
							selected: 4,
							allButtonsEnabled: true,
							buttonTheme: {
						        visibility: 'hidden',
						    },
						    labelStyle: {
						        //visibility: 'hidden'
						    },
				            inputPosition: {
				            	x: 0,
								align:'left',
					        },
						 	buttons: [{
		                        type: 'minute',
		                        count: 100,
		                        text: '1m',
		                        dataGrouping: {
				                    forced: true,
				                    units: [['minute', [1]]]
				                }
		                    }, 
		                    {
		                        type: 'minute',
		                        count: 500,
		                        text: '5m',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['minute', [5]]]
				                }
		                    },
		                    {
		                        type: 'minute',
		                        count: 1000,
		                        text: '10m',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['minute', [10]]]
				                }
		                    },
		                    {
		                    	type: 'minute',
		                    	count: 1500,
		                    	text: '15m',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['minute', [15]]]
				                }
		                    },
		                    {
		                        type: 'minute',
		                        count: 3000,
		                        text: '30m',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['minute', [30]]]
				                }
		                    }, 
		                    {
		                        type: 'hour',
		                        count: 500,
		                        text: '1h',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['hour', [1]]]
				                }
		                    }, 
		                    {
		                        type: 'hour',
		                        count: 1000,
		                        text: '2h',
		                        dataGrouping: {
				                    forced: true,
				                    units: [['hour', [2]]]
				                }
		                    },
		                    {
		                        type: 'hour',
		                        count: 2000,
		                        text: '4h',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['hour', [4]]]
				                }
		                    },
		                    {
		                        type: 'hour',
		                        count: 3000,
		                        text: '6h',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['hour', [6]]]
				                }
		                    },
		                    {
		                        type: 'day',
		                        count: 30,
		                        text: '1d',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['day', [1]]]
				                }
		                    },
		                    {
		                        type: 'day',
		                        count: 90,
		                        text: '3d',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['day', [3]]]
				                }
		                    },
		                    {
		                    	type: 'week',
		                    	count: 10,
		                    	text: '1w',
		                        dataGrouping: {
			                 	   forced: true,
				                    units: [['week', [1]]]
				                }
		                    }
		                    ]
						},
						chart: {
							height: 600,
							panning: true,
							zoomType: 'x',
					        panKey: 'ctrl',
					        events: {
					        	click: (function(self) {
					        		return function(e) {
					        			let nearest = self.chart.pointer.findNearestKDPoint(self.chart.series, false, e)
					        			//console.log(nearest)
					        			let index = nearest.dataGroup ? nearest.dataGroup.start : nearest.index
					        			//console.log(self.data[nearest.sindex])
					        			let poolDataPoint = self.data.map(p=>p.filter(v=>v.timestamp))
																	.map(p=>p[index])
																	.filter(p=>p)
										EventBus.$emit('changeTime', poolDataPoint)
										//console.log(+get_dy_underlying, "price at point", index)
										//console.log(self.data[index].prices["0-1"])
					        		}
					        	})(this),
					        	load() {
					        		this.redraw();
					        	},
					        	render() {
					        		if(this.plotWidth < 480) {
					        			this.rangeSelector.maxLabel.translate(0, 25)
					        			this.rangeSelector.maxDateBox.translate(37, 25)
					        		}
					        		else {
					        			this.rangeSelector.maxLabel.translate(141, 0)
					        			this.rangeSelector.maxDateBox.translate(164, 0)
					        		}
					        	}
					        }
						},
						title: {
							text: '',
						},
						yAxis: [{
								labels: {
				                align: 'right',
					                x: -3
					            },
					            title: {
					                text: 'OHLC'
					            },
					            height: '60%',
					            lineWidth: 2,
					            resize: {
					                enabled: true
					            }
					        }, 
					        {
					            labels: {
					                align: 'right',
					                x: -3
					            },
					            title: {
					                text: 'Volume'
					            },
					            top: '65%',
					            height: '35%',
					            offset: 0,
					            lineWidth: 2
					        }],
					  	tooltip: {
					  		split: true,
					  		borderColor: '#a6cdf1',
					  	},
					  	series: [
						  	{
						  		type: 'candlestick',
					            name: this.pairVal,
					            data: [],
						  	},
						  	{
						  		type: 'column',
					            name: 'Volume',
					            data: [],
					            yAxis: 1,
						  	}
					  	],
			    	},
				  	pair: {
				  		
				  	},
				  	pool: '',
				  	pools: [],
				  	interval: null,
				  	chart: null,
				  	data: [],
				  	poolConfigs: null,
				  	fromCurrency: null,
				  	toCurrency: null,
				  	inverse: false,
				  	ohlcData: [],
				  	exchange: false,
				  	btcPrices: [],
		  }
		},
		created() {
			this.exchange = this.$route.name == 'Exchange'
			//EventBus.$on('selected', this.selectPool);
			EventBus.$on('updateCharts', this.loadData)
		},
		watch: {
			selectChange() {
				this.watchLoadedContracts();
				contract.allInitContracts.size >= tradeStore.pools.length && this.mounted()
			}
		},
		mounted() {
			this.chart = this.$refs.highcharts.chart;
/*			this.$watch(()=>contract.initializedContracts, val => {
                if(val) this.mounted();
            })*/
            this.watchLoadedContracts();
            if(contract.allInitContracts.size >= tradeStore.pools.length) this.mounted()
		},
		beforeDestroy() {
			EventBus.$off('selected', this.selectPool)
		},
		computed: {
			selectChange() {
				return tradeStore.pairIdx, tradeStore.pools.join(), tradeStore.interval, Date.now();
			}
		},
		methods: {
			watchLoadedContracts() {
				let unwatch = this.$watch(() => contract.allInitContracts.size, val => {
					if(val >= tradeStore.pools.length) {
						this.mounted()
						unwatch()
					}
				})
			},
			async loadData() {
				let jsonInterval = this.interval;
				let intervalIndex = tradeStore.intervals.indexOf(jsonInterval)
				if(intervalIndex >= tradeStore.intervals.indexOf('30m')) jsonInterval = '30m'
				if(intervalIndex >= tradeStore.intervals.indexOf('1d')) jsonInterval = '1440m'
				let urls = tradeStore.pools.map(pool=>{
					let fetchpool = pool == 'iearn' ? 'y' : pool == 'susdv2' ? 'susd' : pool == 'ren' ? 'ren2' : pool == 'sbtc' ? 'rens' : pool
					return fetch(`${window.domain}/raw-stats/${fetchpool}-${jsonInterval}.json`)
				});
				if(tradeStore.pools.includes('tbtc') || tradeStore.pools.includes('ren') || tradeStore.pools.includes('sbtc'))
					urls.push(
						fetch(`
						https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1589587198&to=${(Date.now() / 1000) | 0}`
					))
				let requests = await Promise.all(urls)
				if(tradeStore.pools.includes('tbtc') || tradeStore.pools.includes('ren') || tradeStore.pools.includes('sbtc')) {
					this.btcPrices = await requests[requests.length - 1].json()
					requests = requests.slice(0, -1)
				}
				let data = []
				for(let res of requests) {
					let json = await res.json()
					if(res.url.includes('tbtc') || res.url.includes('ren') || res.url.includes('sbtc')) {
						json = json.map(d => {
							d.volume = Object.fromEntries(Object.entries(d.volume).map(([k, v]) => 
								[k, v.map(vol => vol * volumeStore.findClosestPrice(d.timestamp, this.btcPrices.prices))]))
							return d;
						})
					}
					if(json.length != 1000 && requests.length > 1) {
						if(res.url.includes('pax')) json = json.slice(10)
						let fill = new Array(1000-json.length).fill({})
						json = fill.concat(json)
					}
					data.push(json)
				}
				this.data = data
			},
			async loadRecentData(timestamp) {
				await this.loadData();
				let newData = this.data.map(json => json.filter(data => data.timestamp > timestamp))
				
				let [ohlc, volume] = await this.processData(newData)

			    ohlc.map(point => this.chart.series[0].addPoint(point, false))
				volume.map(point=>this.chart.series[1].addPoint(point, false))

		        this.chart.redraw()
			},
			async processData(data) {
				this.ohlcData = []
				let ohlc = []
			    let volume = []
				try {
					let lastPriceCalls = this.pools.map(pool=> {
						let amount = 1
						let get_method = 'get_dy_underlying'
						if(['tbtc', 'ren', 'sbtc'].includes(pool)) {
							amount = 1/1e4
							get_method = 'get_dy'
						}
						return [
							abis[pool].swap_address, 
							window[pool].swap.methods[get_method](this.fromCurrency, 
								this.toCurrency, BN(amount).times(abis[pool].coin_precisions[this.fromCurrency]).toFixed(0)).encodeABI()
						]
					})
					let aggcalls = await contract.multicall.methods.aggregate(lastPriceCalls).call()
					let lastPrices = aggcalls[1].map(hex => web3.eth.abi.decodeParameter('uint256', hex))
					let length = data[0].length;
					let chunkSize = 70
					for(let l = length-1; l > 0; l-= chunkSize) {
						for(let i = l; i > l-chunkSize && i > 0; i--) {
							this.ohlcData[i] = {}
							this.ohlcData[i].timestamp = data[0][i].timestamp
							this.ohlcData[i].prices = {}
							this.ohlcData[i].prices[this.pairIdx] = []
							this.ohlcData[i].volume = {}
							this.ohlcData[i].volume[this.pairIdx] = []
							for(let j = 0; j < data.length; j++) {
								if(this.poolConfigs[j].N_COINS-1 < this.toCurrency) continue;
								let v = data[j][i]
								if(Object.keys(v).length === 0 && v.constructor === Object) continue;
								if(v === undefined) continue;
								let amount = 1
								if(['tbtc', 'ren', 'sbtc'].includes(this.pools[j])) amount = 1/1e8
								//console.log(v, poolConfigs[j], poolConfigs, i, j, fromCurrency, toCurrency, "CALC CONFIG")
								let get_dy_underlying = await calcWorker.calcPrice(
									{...v, ...this.poolConfigs[j]}, this.fromCurrency, this.toCurrency, amount * abis[this.pools[j]].coin_precisions[this.fromCurrency])
								let calcprice = +(BN(get_dy_underlying).div(amount * abis[this.pools[j]].coin_precisions[this.toCurrency]))
								if(calcprice == 0) continue;
								if(this.inverse) calcprice = 1 / calcprice
								if(v.prices[this.pairIdx]) {
									if(this.inverse) v.prices[this.pairIdx] = v.prices[this.pairIdx].map(price => 1/price)
									v.prices[this.pairIdx].push(calcprice)
								}
								else {
									v.prices[this.pairIdx] = [calcprice]
									v.volume[this.pairIdx] = [0]
								}
								if(i == length-1) {
									let dx = BN(abis[this.pools[j]].coin_precisions[this.fromCurrency]).toFixed(0)
									let amount = 1
									if(['tbtc', 'ren', 'sbtc'].includes(this.pools[j])) amount = 1/1e4;
									let lastPrice = +(BN(lastPrices[j])).div(amount * abis[this.pools[j]].coin_precisions[this.toCurrency])
									if(this.inverse) lastPrice = 1/lastPrice
									this.ohlcData[i].prices[this.pairIdx].push(lastPrice)
								}
								this.ohlcData[i].prices[this.pairIdx].push(...v.prices[this.pairIdx])
								this.ohlcData[i].volume[this.pairIdx][j] = v.volume[this.pairIdx].map((v,k)=>{
									if(k == 0) return v / abis[this.pools[j]].coin_precisions[this.fromCurrency]
									return v / abis[this.pools[j]].coin_precisions[this.toCurrency]
								})
							}
						}

					    let dataLength = this.ohlcData.length
					        // set the allowed units for data grouping
			    		for (let i = l; i > l-chunkSize && i > 0; i--) {
					    	let len = this.ohlcData[i].prices[this.pairIdx].length-1

					    	if(!this.ohlcData[i].timestamp) continue;
					    	let ohlcPoint = [
					            this.ohlcData[i].timestamp*1000, // the date
					            this.ohlcData[i].prices[this.pairIdx][0], // open
					            Math.max(...this.ohlcData[i].prices[this.pairIdx]), // high
					            Math.min(...this.ohlcData[i].prices[this.pairIdx]), // low
					            this.ohlcData[i].prices[this.pairIdx][len] // close
					        ]
					        ohlc.unshift(ohlcPoint);
					        let volumeData = this.ohlcData[i].volume[this.pairIdx].map(vs=>vs[0])
					        if(this.inverse) volumeData = this.ohlcData[i].volume[this.pairIdx].map(vs=>vs[1])
					        let volumePoint = [
					            this.ohlcData[i].timestamp*1000, // the date
					            volumeData.reduce((a, b) => a + b, 0) // the volume
					        ]
					        volume.unshift(volumePoint);
					    }

					    this.chart.hideLoading();
					    this.$refs.highcharts.chart.series[0].setData(ohlc)
			    		this.$refs.highcharts.chart.series[1].setData(volume)
					}
				}
				catch(err) {
					console.error(err)
				}


			    return [ohlc, volume]
			},
			async mounted() {
				this.chart.showLoading();
				this.pools = tradeStore.pools.map(p=>p == 'y' ? 'iearn' : p);
				this.pairIdx = tradeStore.pairIdx
				this.pairVal = tradeStore.pairVal
				this.interval = tradeStore.interval;
/*				while(this.chart.series.length) {
					this.chart.series[0].remove()
				}*/

				//return;
				//move this to selectPool method
				await this.loadData()

				this.poolConfigs = this.pools.map(pool => {
					return {
						N_COINS: abis[pool].N_COINS,
						PRECISION_MUL: abis[pool].coin_precisions.map(p=>1e18/p),
						USE_LENDING: abis[pool].USE_LENDING,
						LENDING_PRECISION,
						PRECISION,
					}
				})
				let fromCurrency = this.fromCurrency = tradeStore.pairIdx.split('-')[0]
				let toCurrency = this.toCurrency = tradeStore.pairIdx.split('-')[1]
				this.inverse = false;
				if(fromCurrency > toCurrency) {
					this.inverse = true;
					[this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency]
					this.pairIdx = `${this.fromCurrency}-${this.toCurrency}`
				}

				let [ohlc, volume] = await this.processData(this.data)

			    // split the data set into ohlc and volume

			    
		        console.log(this.$refs.highcharts.chart)
		        this.chart.setTitle({text: this.pairVal.toUpperCase()})
/*		        this.chart.update({
		        	rangeSelector: {
		        		buttons: this.chartdata.rangeSelector.buttons.map(b=> {
		        			let cb = {...b}
		        			cb.count /= jsonInterval.slice(0,-1) / 2
		        			return cb;
		        		})
		        	}
		        })*/
		        //highcharts doesn't select the defined range, doing it again manually
		        this.chart.rangeSelector.clickButton(tradeStore.intervals.indexOf(this.interval), true)
		        this.chart.redraw();
		        this.chart.hideLoading();
			    this.loading = false;


				setInterval(async () => {
					this.loadRecentData(this.data[0][this.data[0].length-1].timestamp)
					EventBus.$emit('updateDepth')
				}, this.interval.slice(0, -1) * 60000)
			}
		}
	}
</script>

<style scoped>
	#select_pool {
		margin-bottom: 10px;
	}
	#onesplit {
		margin-top: 30px;
		margin-bottom: 1em;
	}
</style>