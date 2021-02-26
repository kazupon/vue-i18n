<template>
	<div>
		<div class='window white'>
			<div class='poolselect'>
				<input id='compoundpool' type='checkbox' value='compound' v-model='piepools'/>
				<label for='compoundpool'>Compound</label>

				<input id='usdtpool' type='checkbox' value='usdt' v-model='piepools'/>
				<label for='usdtpool'>usdt</label>

				<input id='ypool' type='checkbox' value='y' v-model='piepools'/>
				<label for='ypool'>Y</label>

				<input id='busdpool' type='checkbox' value='busd' v-model='piepools'/>
				<label for='busdpool'>bUSD</label>

				<input id='susdpool' type='checkbox' value='susd' v-model='piepools'/>
				<label for='susdpool'>sUSD</label>

				<input id='paxpool' type='checkbox' value='pax' v-model='piepools'/>
				<label for='paxpool'>PAX</label>

				<input id='tbtcpool' type='checkbox' value='tbtc' v-model='piepools'/>
				<label for='tbtcpool'>tBTC</label>

				<input id='renpool' type='checkbox' value='ren' v-model='piepools'/>
				<label for='renpool'>renBTC</label>

				<input id='sbtcpool' type='checkbox' value='sbtc' v-model='piepools'/>
				<label for='sbtcpool'>sBTC</label>

				<button @click='selectPools'>Select</button>
			</div>

			<highcharts :constructor-type="'stockChart'" :options="chartdata" ref='highcharts'></highcharts>
		</div>
		<div class='window white'>
			<select class='tvision' v-model='period'>
				<option value='day'>Day</option>
				<option value='week'>Week</option>
				<option value='month'>Month</option>
				<option value='all'>All</option>
			</select>

			<highcharts :options="piechartdata" ref='piecharts'></highcharts>
		</div>
		<div v-for='(currency, n) in currencies'>
			<volume-per-coin-stats :data = 'volumes[n]' :currency = 'currency' :loaded = 'loaded'></volume-per-coin-stats>
		</div>
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
	stockInit(Highcharts)

	Highcharts.setOptions({
		lang: {
			loading: '',
		}
	})

	import * as volumeStore from './common/volumeStore'
	import allabis from '../allabis'

	import VolumePerCoinStats from './VolumePerCoinStats.vue'

	import * as Comlink from 'comlink'

	import Worker from 'worker-loader!./graphs/worker.js';
	const worker = new Worker();
	const volumeWorker = Comlink.wrap(worker);

	export default {
		components: {
			highcharts: Chart,
			VolumePerCoinStats,
		},
		data: () => ({
			chartdata: {
				chart: {
					panning: true,
					zoomType: 'x',
			        panKey: 'ctrl',
			        type: 'column',
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
						}
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
	            		text: 'Total trading volume per day per coin',
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
                		let value = this.y.toFixed(2)
                		if(['TBTC', 'WBTC', 'HBTC', 'renBTC'].includes(this.series.name)) value = this.y.toFixed(8)
	                	return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
	                }
	            },
	            legend: {
	            	enabled: true,
	            }
			},
			piechartdata: {
				chart: {
			        plotBackgroundColor: null,
			        plotBorderWidth: null,
			        plotShadow: false,
			        type: 'pie'
			    },
			    title: {
			        text: 'Share of trading volume per coin for last week'
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
			                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			            }
			        }
			    },
			    series: [],
			    legend: {
			    	enabled: true,
			    }
			},
			piepools: ['compound', 'usdt', 'y', 'busd', 'susd', 'pax', 'tbtc', 'ren', 'sbtc'],
			currencies: ['DAI', 'USDC', 'USDT', 'TUSD', 'BUSD', 'sUSD', 'PAX', 'TBTC', 'WBTC', 'HBTC', 'renBTC', 'sBTC'],
			volumes: [],
			period: 'week',
			chart: null,
			piechart: null,
			loaded: false,
		}),
		async created() {
			this.created()
		},
		watch: {
			volumes(val) {
				if(val.length)
					this.mounted()
			},
			period(val) {
				this.loadPieChart()
			},
		},
		async mounted() {
			this.chart = this.$refs.highcharts.chart;
			this.chart.showLoading();

			this.piechart = this.$refs.piecharts.chart;
			this.piechart.showLoading()
		},
		methods: {
			async created() {
				let pools = Object.keys(allabis).filter(pool => pool != 'susd' && pool != 'y')
				await volumeStore.fetchVolumeData(pools, false, 1440)
				let data = volumeStore.state.volumeData[1440]
				data = Object.keys(data).reduce((obj, key) => {
					return {...obj, [key]: (new Array(Math.max(...Object.values(data).map(arr=>arr.length))-data[key].length).fill({})).concat(data[key])}
				}, {})

				let filteredData = Object.keys(data).filter(pool => this.piepools.includes(pool)).reduce((obj, key) => ({ ...obj, [key]: data[key]}), {})

				pools = Object.entries(filteredData)
				this.volumes = await volumeWorker.getVolumePerCoin(filteredData, pools, allabis)
			},
			async mounted() {
				while(this.chart && this.chart.series[0])
					this.chart.series[0].remove()
				for(let [i,volume] of this.volumes.entries()) {
					this.chart.addSeries({
						name: this.currencies[i],
						data: volume,
					}, false, false)
				}
				this.chart.redraw(false)
				this.loaded = true;
				this.chart.hideLoading();
				
				this.loadPieChart();
			},
			loadPieChart() {
				this.piechart.showLoading()
				this.piechart.series[0] && this.piechart.series[0].remove();
				this.piechart.update({
					title: {
						text: `Share of trading volume per coin for ${this.period != 'all' ? 'last ' + this.period : 'all time'}`
					}
				}, false)
				let periods = {
					day: 24 * 60 * 60 * 1000,
					get week() {
						return 7 * this.day
					},
					get month() {
						return 30.42 * this.day
					},
					all: Date.now(),
				}
				let interval = 1000 * 60 * 60 * 24;
				let startDayUTC = Math.floor(Date.now() / interval) * interval
				let filtered = this.volumes.map(vol=> {
					return vol.filter(data=>{
						return data[0] > startDayUTC - periods[this.period]
					})
					.map(data => data[1])
					.reduce((a, b) => {
						return (+a) + (+b)
					}, 0)
				})
				let piechartdata = []
				filtered
					.forEach((vol, i, arr) => {
						piechartdata.push({
							name: this.currencies[i],
							y: (vol / arr.reduce((a, b) => a + b, 0)) * 100
						})
					})
				let highest = piechartdata.map(data=>data.y).indexOf(Math.max(...piechartdata.map(data => data.y)))
				piechartdata[highest].sliced = true;
				piechartdata[highest].selected = true;
				this.piechart.addSeries({
					name: 'Trading Volume %',
					data: piechartdata,
				}, true, false)
				this.piechart.hideLoading()
			},
			selectPools() {
				this.created();
			}
		}
	}
</script>

<style scoped>
	select {
		box-shadow: none;
		margin-bottom: 10px;
	}
	button {
		box-shadow: none;
		margin-left: 10px;
	}
	.poolselect {
		margin-bottom: 10px;
	}
	.poolselect > label:nth-of-type(1) {
		margin-left: 0;
	}
	.poolselect > label {
		margin-left: 1em;
	}
</style>