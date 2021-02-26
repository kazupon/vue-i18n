<template>
	<div>
		<div class='window white'>
			<div class='chartoptions'>
				<input id='showbars' type='checkbox' v-model='showbars'>
				<label for='showbars'>Show bars</label>

				<input id='showline' type='checkbox' v-model='showline'>
				<label for='showline'>Show line</label>
			</div>
			<highcharts :constructor-type="'stockChart'" :options="chartdata" ref='highcharts'></highcharts>
		</div>

		<div class='window white'>
			<highcharts :constructor-type="'stockChart'" :options='coinchartdata' ref='coincharts'></highcharts>
		</div>

		<div class='window white'>
			<highcharts :options="piechartdata" ref='piecharts'></highcharts>
		</div>

		<div class='window white'>
			<highcharts :options="piechartdatacoins" ref='piecoinscharts'></highcharts>
		</div>

		<div class='window white' v-show='totalDeposits > 0'>
			<highcharts :options="mypiechartdata" ref='mypiecharts'></highcharts>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	import Highcharts from 'highcharts'
	import HC_exporting from 'highcharts/modules/exporting';
	import HC_exporting_data from 'highcharts/modules/export-data';
	HC_exporting(Highcharts);
	HC_exporting_data(Highcharts)

	import {Chart} from 'highcharts-vue'
	import stockInit from 'highcharts/modules/stock'
	stockInit(Highcharts)

	Highcharts.setOptions({
		lang: {
			loading: '',
		}
	})

	import * as volumeStore from './common/volumeStore'
	import allabis from '../allabis'
	import * as helpers from '../utils/helpers'

	import { contract } from '../contract'

	import * as priceStore from './common/priceStore'

	export default {
		components: {
			highcharts: Chart,
		},
		data() {
			return {
				chartdata: {
				chart: {
					panning: true,
					zoomType: 'x',
			        panKey: 'ctrl',
			        type: 'column',
			        height: 600,
				},
		        title: {
		        	text: 'Total USD Deposits', 
		        },
                rangeSelector: {
		            selected: 1
		        },
		        plotOptions: {
					series: {
						dataGrouping: {
						  forced: true,
						  units: [
						    ['day', [1]]
						  ]
						},
						point: {
							events: {
								click: (function(self) {
									return function() {
										let index = this.dataGroup ? this.dataGroup.start : this.index
										console.log(this, index, "INDEX")
									}
								})(this)
							}
						},
					},
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: false
						}
					},
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
	            yAxis: {
	            	opposite: false,
	            	title: {
	            		text: 'Total deposits',
	            		style: {
	            			color: 'black'
	            		},
	            	},
            		stackLabels: {
			            enabled: false,
			            style: {
			                fontWeight: 'bold',
			                color: ( // theme
			                    Highcharts.defaultOptions.title.style &&
			                    Highcharts.defaultOptions.title.style.color
			                ) || 'gray'
			            }
			        },
	            	tickPixelInterval: 10,
	            },
	            xAxis: {
	            	labels: {	
		            	style: {
		            		color: 'black'
		            	}
	            	},
	            },
		        series: [],
		        tooltip: {
	                valueDecimals: 5,
	                pointFormatter() {
	                	return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${this.y.toFixed(2)}</b><br/>`
	                },
	            },
	            legend: {
	            	enabled: true,
	            },
			},
			piechartdata: {
				chart: {
			        plotBackgroundColor: null,
			        plotBorderWidth: null,
			        plotShadow: false,
			        type: 'pie'
			    },
			    title: {
			        text: 'Pool USD % holdings'
			    },
			    tooltip: {
			        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			    },
			    accessibility: {
			        point: {
			            valueSuffix: '%'
			        }
			    },
			    plotOptions: {
			        pie: {
			            allowPointSelect: true,
			            cursor: 'pointer',
			            dataLabels: {
			                enabled: true,
			                formatter: (function(self) {
			                	return function(point) { 
			                		return `<b>${this.key}</b>: 
			                		${helpers.formatNumber(self.allPools[this.key], 0)}$
			                		(${this.percentage.toFixed(2)}%)`
			                	}
			                })(this),
			            }
			        }
			    },
			    series: [],
			},
			piechartdatacoins: {
				chart: {
			        plotBackgroundColor: null,
			        plotBorderWidth: null,
			        plotShadow: false,
			        type: 'pie'
			    },
			    title: {
			        text: 'Pool coin % holdings'
			    },
			    tooltip: {
			        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			    },
			    accessibility: {
			        point: {
			            valueSuffix: '%'
			        }
			    },
			    plotOptions: {
			        pie: {
			            allowPointSelect: true,
			            cursor: 'pointer',
			            dataLabels: {
			                enabled: true,
			                formatter: (function(self) {
			                	return function(point) { 
			                		return `<b>${this.key}</b>: 
			                		${helpers.formatNumber(self.allCoins[this.key], 0)}$
			                		(${this.percentage.toFixed(2)}%)`
			                	}
			                })(this),
			            }
			        }
			    },
			    series: [],
			},
			mypiechartdata: {
				chart: {
			        plotBackgroundColor: null,
			        plotBorderWidth: null,
			        plotShadow: false,
			        type: 'pie'
			    },
			    title: {
			        text: 'My USD % holdings'
			    },
			    tooltip: {
			        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			    },
			    accessibility: {
			        point: {
			            valueSuffix: '%'
			        }
			    },
			    plotOptions: {
			        pie: {
			            allowPointSelect: true,
			            cursor: 'pointer',
			            dataLabels: {
			                enabled: true,
			                formatter: (function(self) {
			                	return function(point) { 
			                		return `<b>${this.key}</b>: 
			                		${helpers.formatNumber(self.balances[this.key == 'susd' ? 'susdv2' : this.key],0)}$
			                		(${this.percentage.toFixed(2)}%)`
			                	}
			                })(this),
			                filter: {
			                    property: 'percentage',
			                    operator: '>',
			                    value: 0
			                },
			            }
			        }
			    },
			    series: [],
			},
			coinchartdata: {
				chart: {
					panning: true,
					zoomType: 'x',
			        panKey: 'ctrl',
			        type: 'column',
			        height: 600,
				},
		        title: {
		        	text: 'Coin USD Deposits', 
		        },
                rangeSelector: {
		            selected: 1
		        },
		        plotOptions: {
					series: {
						dataGrouping: {
						  forced: true,
						  units: [
						    ['day', [1]]
						  ]
						},
						point: {
							events: {
								click: (function(self) {
									return function() {
										let index = this.dataGroup ? this.dataGroup.start : this.index
										console.log(this, index, "INDEX")
									}
								})(this)
							}
						},
					},
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: false
						}
					},
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
	            yAxis: {
	            	opposite: false,
	            	title: {
	            		text: 'Total coin deposits',
	            		style: {
	            			color: 'black'
	            		},
	            	},
            		stackLabels: {
			            enabled: false,
			            style: {
			                fontWeight: 'bold',
			                color: ( // theme
			                    Highcharts.defaultOptions.title.style &&
			                    Highcharts.defaultOptions.title.style.color
			                ) || 'gray'
			            }
			        },
	            	tickPixelInterval: 10,
	            },
	            xAxis: {
	            	labels: {	
		            	style: {
		            		color: 'black'
		            	}
	            	},
	            },
		        series: [],
		        tooltip: {
	                valueDecimals: 5,
	                pointFormatter() {
	                	return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${this.y.toFixed(2)}</b><br/>`
	                },
	            },
	            legend: {
	            	enabled: true,
	            },
			},
			chart: null,
			piechart: null,
			piecoinschart: null,
			mypiechart: null,
			coinchart: null,
			showbars: true,
			showline: true,
			allPools: null,
			allCoins: null,
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
			totalDeposits: 0,
		}
		},

		watch: {
			showbars(val) {
				if(val == false && !this.showline) return;
				let toggle = 'show'
				if(!val) {
					toggle = 'hide'
				}
				for(let i = 0; i < this.chart.series.length - 2; i++) {
					this.chart.series[i][toggle]()
				}
			},
			showline(val) {
				if(val == false && !this.showbars) return
				let toggle = 'show'
				if(!val) toggle = 'hide'
				this.chart.series[this.chart.series.length - 2][toggle]()
			},
		},

		created() {
			this.$watch(() => contract.multicall && contract.default_account, (val, oldval) => {
				if(val && val.toLowerCase() == oldval && oldval.toLowerCase()) return;
				if(val) this.showBalances()
			}, {
				immediate: true,
			})
		},

		async mounted() {
			this.chart = this.$refs.highcharts.chart;
			this.piechart = this.$refs.piecharts.chart;
			this.piecoinschart = this.$refs.piecoinscharts.chart;
			this.mypiechart = this.$refs.mypiecharts.chart;
			this.coinchart = this.$refs.coincharts.chart;
			this
			this.chart.showLoading()
			this.piechart.showLoading()
			this.mypiechart.showLoading()
			this.coinchart.showLoading()
			let pools = Object.keys(allabis).filter(pool => pool != 'susd' && pool != 'y' && pool != 'tbtc')
			await volumeStore.fetchVolumeData(pools, true, 1440)
			let data = volumeStore.state.volumeData[1440]
			let btcPrices = await helpers.retry(fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1589587198&to=${(Date.now() / 1000) | 0}`))
			btcPrices = await btcPrices.json()
			for(let btcPool of ['ren', 'sbtc']) {
				data[btcPool] = data[btcPool].map(d => {
					d.balances = d.balances.map(bal => bal * volumeStore.findClosestPrice(d.timestamp, btcPrices.prices))
					return d;
				})
			}
			data = Object.keys(data).reduce((obj, key) => {
				return {...obj, [key]: (new Array(Math.max(...Object.values(data).map(arr=>arr.length))-data[key].length).fill({})).concat(data[key])}
			}, {})

			console.log(data, "THE DATA")

			let volumes = {}


			for(let [pool, points] of Object.entries(data)) {
				volumes[pool] = []
				for(let point of points) {
					if(!point.timestamp) continue
					let coinBalances = point.balances.map((bal, i) => {
						return bal * point.rates[i] / 1e18 / allabis[pool == 'susd' ? 'susdv2' : pool].coin_precisions[i]
					})
					volumes[pool].push([
						point.timestamp * 1000,
						coinBalances.reduce((a, b) => a + b, 0)
					])
				}
			}



			for(let [pool, volume] of Object.entries(volumes)) {
				if(pool == 'tbtc') continue
				this.chart.addSeries({
					type: 'column',
					name: pool,
					data: volume,
				}, false, false)
			}

			let coins = ['DAI', 'USDC', 'USDT', 'TUSD', 'BUSD', 'SUSD', 'PAX', 'renBTC', 'WBTC', 'sBTC']
			let coinbalances = coins.reduce((a,b)=> (a[b]=[],a),{});


			for(let [pool, points] of Object.entries(data)) {
				if(pool == 'tbtc') continue
				for(let point of points) {
					if(!point.timestamp) continue
					let coinBalances = point.balances.map((bal, i) => {
						return bal * point.rates[i] / 1e18 / allabis[pool == 'susd' ? 'susdv2' : pool].coin_precisions[i]
					})
					for(let [i, balance] of coinBalances.entries()) {
						if(pool == 'busd' && i == 3) i = 4
						if(pool == 'susd' && i == 3) i = 5
						if(pool == 'pax' && i == 3) i = 6
						if(['ren', 'sbtc'].includes(pool)) i += 7
						let hasPoint = coinbalances[coins[i]].find(p => p[0] == point.timestamp*1000)
						if(hasPoint !== undefined) {
							hasPoint[1] += balance
						}
						else
							coinbalances[coins[i]].push([point.timestamp*1000, balance])
					}
				}
			}

			for(let [coin, balance] of Object.entries(coinbalances)) {
				balance.sort((a,b) => a[0] - b[0])
				this.coinchart.addSeries({
					type: 'column',
					name: coin,
					data: balance,
				}, false, false)
			}


			this.chart.hideLoading()
			this.chart.redraw()

			this.coinchart.hideLoading()
			this.coinchart.redraw()

			let balances = Object.keys(volumes).reduce((obj, key) => {
				return {...obj, [key]: (new Array(Math.max(...Object.values(volumes).map(arr=>arr.length))-volumes[key].length).fill({})).concat(volumes[key])}
			}, {})


			let line = []

			for(let [i, balance] of balances.compound.entries()) {
				let v = Object.values(balances).map(v => v[i]).filter(v=>v[0])
				line.push([v[0][0], v.map(v=>v[1]).reduce((a, b) => a + b, 0)])
			}

			this.chart.addSeries({
				type: 'line',
				name: `Total USD Deposits`,
				data: line,
			})

			this.allPools = Object.fromEntries(Object.entries(volumes).filter(([p, v]) => p != 'tbtc')
									.map(([p, v]) => [p, volumes[p][volumes[p].length-1][1]]))

			let latestDeposits = Object.keys(volumes).filter(p => p != 'tbtc').map(p => volumes[p][volumes[p].length-1][1])

			let poolHoldings = latestDeposits.reduce((a, b) => a + b, 0)

			let poolPercentages = latestDeposits.map(poolDeposits => (poolDeposits / poolHoldings) * 100)

			poolPercentages = poolPercentages.map((percentage, i) => ({
				name: Object.keys(volumes).filter(p => p != 'tbtc')[i],
				y: poolPercentages[i],
			}))


			let highest = poolPercentages.map(data=>data.y).indexOf(Math.max(...poolPercentages.map(data => data.y)))
			poolPercentages[highest].sliced = true;
			poolPercentages[highest].selected = true;

			this.piechart.addSeries({
				name: 'Pool %',
				data: poolPercentages,
			}, true, false)

			this.piechart.hideLoading()

			this.allCoins = Object.fromEntries(Object.entries(coinbalances).filter(([p, v]) => p != 'tbtc')
									.map(([p, v]) => [p, coinbalances[p][coinbalances[p].length-1][1]]))

			latestDeposits = Object.keys(coinbalances).filter(p => !['tbtc','hbtc'].includes(p.toLowerCase())).map(p => coinbalances[p][coinbalances[p].length-1][1])

			poolHoldings = latestDeposits.reduce((a, b) => a + b, 0)

			poolPercentages = latestDeposits.map(poolDeposits => (poolDeposits / poolHoldings) * 100)

			poolPercentages = poolPercentages.map((percentage, i) => ({
				name: Object.keys(coinbalances).filter(p => !['hbtc','tbtc'].includes(p))[i],
				y: poolPercentages[i],
			}))


			highest = poolPercentages.map(data=>data.y).indexOf(Math.max(...poolPercentages.map(data => data.y)))
			poolPercentages[highest].sliced = true;
			poolPercentages[highest].selected = true;

			this.piecoinschart.addSeries({
				name: 'Coin %',
				data: poolPercentages,
			}, true, false)

			this.piecoinschart.hideLoading()

			this.chart.update({
				title: {
					text: `Total USD Deposits ${helpers.formatNumber(line[line.length-1][1], 0)}$`
				},
			})



		
		},

		methods: {
			async showBalances() {
				let pools = ['compound','usdt','y','busd','susdv2','pax','ren', 'sbtc']
				if(!contract.default_account) return;
				contract.contracts.compound = contract;
				let calls = pools.flatMap(k => {
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
				let btcPrice = await helpers.retry(priceStore.getBTCPrice())
				//this.balances = []
				helpers.chunkArr(decoded, 2).slice(0,pools.length).map((v, i) => {
					let key = pools[i]
					Vue.set(this.balances, key, +v[0] * (+v[1]) / 1e36);
					if(['tbtc', 'ren', 'sbtc'].includes(key)) Vue.set(this.balances, key, this.balances[key] * btcPrice)
				})
				let len = decoded.length
				Vue.set(this.balances, 'susdv2', this.balances.susdv2 + (+decoded[len-3] * decoded[9]) / 1e36)
				Vue.set(this.balances, 'sbtc', this.balances.sbtc + ((+decoded[len-2] * decoded[15]) / 1e36) * btcPrice)
				Vue.set(this.balances, 'y', this.balances.y + (+decoded[len-1] * decoded[5]) / 1e36)

				let deposits = Object.fromEntries(Object.entries(this.balances).map(([k, v]) => [k, v > 0 ? v : 0]))
				this.totalDeposits = Object.values(deposits).reduce((a, b) => a + b, 0)
				if(this.totalDeposits > 0) {
					let depositPercentages = Object.keys(deposits).map((pool, i) => ({
						name: pool == 'susdv2' ? 'susd' : pool,
						y: deposits[pool] / this.totalDeposits,
					}))

					let highest = depositPercentages.map(data=>data.y).indexOf(Math.max(...depositPercentages.map(data => data.y)))
					depositPercentages[highest].sliced = true;
					depositPercentages[highest].selected = true;

					this.mypiechart.addSeries({
						name: 'My pool %',
						data: depositPercentages,
					}, true, false)
				}

				this.mypiechart.hideLoading()

			},
		},
	}
</script>

<style scoped>
	.chartoptions label:nth-of-type(2) {
		margin-left: 1em;
	}
	.chartoptions {
		margin-bottom: 1em;
	}
</style>