<template>
	<div :class="{'window white' : !embedded}">
		<highcharts :constructor-type="'stockChart'" :options="chartdata" ref='highcharts'></highcharts>
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

	export default {
		components: {
			highcharts: Chart,
		},
		props: ['data', 'currency', 'loaded', 'embedded'],
		data() {
			return {
				btcs: ['tbtc', 'hbtc', 'wbtc', 'renbtc', 'sbtc'],
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
		            yAxis: {
		            	opposite: false,
		            	title: {
		            		text: 'Trading Volume',
		            		style: {
		            			color: 'black'
		            		}
		            	},
		            	labels: {
			            	style: {
			            		color: 'black'
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
			        series: [{
			        	name: (self => `Trading Volume per ${self.embedded ? 'pair' : 'coin'}`)(this),
			        	lineWidth: 2,
			        	data: [],
			        	color: '#0b0a57'
			        }],
			        tooltip: {
		                valueDecimals: 5,
		                pointFormatter: (function(self) {
		                	return function() {
		                		let value = this.y.toFixed(2)
		                		if(['TBTC', 'WBTC', 'HBTC', 'renBTC', 'sBTC'].includes(self.currency)) value = this.y.toFixed(8)
			                	return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
		                	}
		                })(this)
		            },
				},
				chart: null,
			}
		},
		watch: {
			data(val) {
				if(val.length) {
					this.mounted()
				}
			},
			loaded(val) {
				this.chart.redraw(false)
			},
			currency(val) {
				this.chart.redraw(false)
			},
		},
		mounted() {
			this.chart = this.$refs.highcharts.chart;
			this.chart.showLoading()
			this.chart.setTitle({
				text: `Total trading volume per day for ${this.currency} ${this.btcs.includes(this.currency.toLowerCase()) ? 'in USD' : ''}`,
			})
		},
		
		methods: {
			async mounted() {
				this.chart.series[0].setData(this.data, false, false)
				this.chart.hideLoading()
			},
		}
	}
</script>