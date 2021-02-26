<template>
	<fieldset>
		<legend>Daily APY % <span class='tooltip'>[?]<span class='tooltiptext long'>Pool APY % + Lending APY % (on annual basis)</span></span></legend>
		<highcharts :constructor-type="'stockChart'" :options="chartdata" ref='highcharts'></highcharts>
    	<p v-show='volume && volume[0] != -1'>
    		<span>Daily USD trading volume:</span> 
    		<span :class="{'loading line': !volume}">
    			<span v-show='volume && volume[0] != -1'> {{ (volume && volume[0] || 0) | formatNumber(0) }}$</span>	
    		</span>
    		<div v-show="['tbtc', 'ren', 'sbtc'].includes(pool)">
	    		<span>Daily ₿ trading volume:</span>
	    		<span>
	    			<span v-show='volume && volume[1] != -1'> {{ (volume && volume[1] || 0) | formatNumber(8) }} ₿ </span>
	    		</span>
    		</div>
    	</p>
	</fieldset>
</template>

<script>
	import Web3 from 'web3'
	import Highcharts from 'highcharts'
	import HC_exporting from 'highcharts/modules/exporting';
	import HC_exporting_data from 'highcharts/modules/export-data';
	HC_exporting(Highcharts);
	HC_exporting_data(Highcharts)

	import {Chart} from 'highcharts-vue'
	import stockInit from 'highcharts/modules/stock'

	import { contract } from '../../contract'

	import * as helpers from '../../utils/helpers'
	import abis, { multicall_abi, multicall_address, infura_url } from '@/allabis'
	import * as volumeStore from '@/components/common/volumeStore'

	stockInit(Highcharts)

	Highcharts.setOptions({
		lang: {
			loading: '',
		}
	})

	let web3 = new Web3(infura_url)

	export default {
		props: {
			data: Array,
			volume: {
				type: Array,
			},
			pool: String,
		},
		components: {
			highcharts: Chart,
		},
		data(){
			return {
			chartdata: {
				chart: {
					panning: true,
					zoomType: 'x',
			        panKey: 'ctrl',
			        height: 600,
				},
                rangeSelector: {
		            selected: 1
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
	            yAxis: [
		            {
		            	id: 'apyAxis',
		            	opposite: false,
		            	type: 'logarithmic',
		            	min: 0.1,
	        			title: {
	        				text: 'Daily APY [%]',
	        				style: {
	        					color: 'black'
	        				},
	        				margin: 10,
	        			},
		            	labels: {
		            		align: 'right',
		            		x: -30,
		            		formatter() {
		            			return (Math.floor(this.value * 100) / 100).toFixed(2);
		            		},
			            	style: {
			            		color: 'black'
			            	},
		            	},
		            	tickPixelInterval: 10,
		            	height: '60%',
		            },
		            {
		            	id: 'volumeAxis',
		            	//type: 'logarithmic',
		            	opposite: false,
		            	title: {
		            		text: 'Trading Volume',
		            		style: {
		            			color: 'black'
		            		},
		            		margin: 10,
		            	},
		            	labels: {
		            		style: {
		            			color: 'black',
		            		},
		            		align: 'right',
		            		x: -30,
		            	},
		            	top: '65%',
		            	height: '35%',
			            offset: 0,
		            }
	            ],
	            xAxis: {
	            	labels: {
		            	style: {
		            		color: 'black'
		            	}
	            	}
	            },
		        series: [/*{
		        	name: 'Daily APY',
		        	lineWidth: 2,
		        	data: [],
		        	color: '#0b0a57'
		        }*/],
		        tooltip: {
		        	split: true,
	                valueDecimals: 3,
	                pointFormatter: (function(self) { 
	                	return function() {
	                		let value = Math.floor(this.y * 100) / 100 + '%';
		                	if(this.series.name == 'Daily APY') return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
	                		if(this.series.name == 'SNX APY') return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
                			if(this.series.name == 'SNX+REN APY') return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
                			if(this.series.name == 'YFI APY') return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
                			if(this.series.name == 'Total APY') return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
		                	if(this.series.name == 'Lending APY') return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${value}</b><br/>`
		                	if(this.series.name === 'Trading Volume') {
		                		let val = this.y.toFixed(2)
		                		if(['tbtc', 'ren', 'sbtc'].includes(self.pool)) val = this.y.toFixed(8)
		                		return `<span style="color:${this.color}">●</span> ${this.series.name} : <b>${val}</b><br/>`
		                	}
		                }
		        	})(this),
	            },
	            legend: {
	            	enabled: true,
	            },
			},
			chart: null,
		}
		},
		computed: {
			volumeData() {
				if(['tbtc', 'ren', 'sbtc'].includes(this.pool)) return helpers.formatNumber(this.volume, 8)
				return helpers.formatNumber(this.volume, 0)
			}
		},
		watch: {
			'data.length'(val) {
				this.mounted()
			}
		},
		mounted() {	
			this.chart = this.$refs.highcharts.chart;
	        this.chart.showLoading();
		},
		methods: {
			loaded() {
				this.loading = false;
			},
			findClosestPrice(timestamp, data) {
				let price = data.find(([time, price]) => time / 1000 > timestamp)
				if(price === undefined) return data[data.length-1][1]
				return price[1]
			},
			async mounted() {
				while(this.chart.series.length) {
					this.chart.series[0].remove()
				}
		        let chartData = [];
		        for(let i = 1; i < this.data.length; i++) {
		        	var el = this.data[i];
		        	let daylen = el.timestamp - this.data[i-1].timestamp
		        	let profit = ((el.virtual_price / 1e18) / (this.data[i-1].virtual_price / 1e18)) ** (365 * 86400 / daylen) - 1
		        	chartData.push([
		        		el.timestamp * 1000,
		        		profit * 100,
		        	])
		        }


		        this.chart.addSeries({
		        	name: 'Daily APY',
		        	lineWidth: 2,
		        	data: chartData,
		        	color: '#0b0a57'
		        }, false, false)
		        if(this.pool == 'susdv2') {
		        	let startTime = this.data[0].timestamp
		        	let endTime = this.data[this.data.length - 1].timestamp
		        	let SNXprices = await fetch(`https://api.coingecko.com/api/v3/coins/havven/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`)
		        	SNXprices = (await SNXprices.json()).prices

		        	let curveRewards = new web3.eth.Contract(abis.susdv2.sCurveRewards_abi, abis.susdv2.sCurveRewards_address)
		        	let multicall = new web3.eth.Contract(multicall_abi, multicall_address)

		        	let calls = [
						[curveRewards._address, curveRewards.methods.DURATION().encodeABI()],
						[curveRewards._address, curveRewards.methods.rewardRate().encodeABI()],
						[curveRewards._address, curveRewards.methods.periodFinish().encodeABI()],
					]

					let aggcalls = await multicall.methods.aggregate(calls).call()
					let decoded = aggcalls[1].map(hex => web3.eth.abi.decodeParameter('uint256', hex))

		        	let SNXapys = []
		        	for(let i = 1; i < this.data.length; i++) {
		        		let timestamp = this.data[i].timestamp
		        		let total_supply = this.data[i].supply
		        		let virtual_price = this.data[i].virtual_price
		        		let SNXprice = this.findClosestPrice(this.data[i].timestamp, SNXprices)
		        		let reward = 64000
		        		if(timestamp > 1590705735 && timestamp < 1594256015) reward = 48000
		        		if(timestamp > 1594256015) reward = decoded[0] * decoded[1] / 1e18
		        		if(+decoded[2] < timestamp)
		        			reward = 0.000001
		        		let SNXapy = 356 * reward / 7 * SNXprice / (0.98 * total_supply * virtual_price / 1e36) * 100
		        		SNXapys.push([timestamp * 1000, SNXapy])
		        	}

		        	this.chart.addSeries({
		        		name: 'SNX APY',
		        		lineWidth: 2,
		        		data: SNXapys,
		        		color: '#f45b5b',
		        	})

		        	let totalAPYs = chartData.map(([timestamp, apy], i) => [timestamp, apy + SNXapys[i][1]])

		        	this.chart.addSeries({
		        		name: 'Total APY',
		        		lineWidth: 2,
		        		data: totalAPYs,
		        		color: '#8085e9',
		        	})
		    	}

		    	let now = Date.now() / 1000

		    	if(this.pool == 'sbtc') {
		        	let startTime = this.data[0].timestamp
		        	let endTime = this.data[this.data.length - 1].timestamp
		        	let pricereqs = await Promise.all([
		        		fetch(`https://api.coingecko.com/api/v3/coins/havven/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`),
		        		fetch(`https://api.coingecko.com/api/v3/coins/republic-protocol/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`),
		        		fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
		        		])
		        	let prices = await Promise.all(pricereqs.map(req => req.json()))
		        	console.log(prices, "PRICES")
		        	let SNXprices = prices[0].prices
		        	let RENprices = prices[1].prices
		        	let btcPrice = prices[2].bitcoin.usd

		        	let curveRewards = new web3.eth.Contract(abis.sbtc.sCurveRewards_abi, abis.sbtc.sCurveRewards_address)
		        	let sbtcPeriodFinish = await curveRewards.methods.periodFinish().call()

		        	let SNXapys = []
		        	for(let i = 1; i < this.data.length; i++) {
		        		let timestamp = this.data[i].timestamp
		        		let total_supply = this.data[i].supply
		        		let virtual_price = this.data[i].virtual_price
		        		let SNXprice = this.findClosestPrice(this.data[i].timestamp, SNXprices)
		        		let RENprice = this.findClosestPrice(this.data[i].timestamp, RENprices)
		        		let SNXreward = 10000
		        		let RENreward = 25000
		        		if(+sbtcPeriodFinish < timestamp) {
		        			SNXreward = 0.000001
		        			RENreward = 0.000001
		        		}
		        		let SNXapy = 356 * (SNXreward * SNXprice + RENreward * RENprice) / 7  / (0.98 * btcPrice * total_supply * virtual_price / 1e36) * 100
		        		SNXapys.push([timestamp * 1000, SNXapy])
		        	}

		        	this.chart.addSeries({
		        		name: 'SNX+REN APY',
		        		lineWidth: 2,
		        		data: SNXapys,
		        		color: '#f45b5b',
		        	})

		        	let totalAPYs = chartData.map(([timestamp, apy], i) => [timestamp, apy + SNXapys[i][1]])

		        	this.chart.addSeries({
		        		name: 'Total APY',
		        		lineWidth: 2,
		        		data: totalAPYs,
		        		color: '#8085e9',
		        	})
		    	}

		    	if(['y', 'iearn'].includes(this.pool)) {
		    		//YFI token deployed
		        	let startTime = 1594972885
		        	let endTime = this.data[this.data.length - 1].timestamp
		        	let SNXprices = await fetch(`https://api.coingecko.com/api/v3/coins/yearn-finance/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`)
		        	console.log(`https://api.coingecko.com/api/v3/coins/yearn-finance/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`)
		        	SNXprices = (await SNXprices.json()).prices
		        	let curveRewards = new web3.eth.Contract(abis.iearn.sCurveRewards_abi, abis.iearn.sCurveRewards_address)
		        	let multicall = new web3.eth.Contract(multicall_abi, multicall_address)

		        	let calls = [
						[curveRewards._address, curveRewards.methods.DURATION().encodeABI()],
						[curveRewards._address, curveRewards.methods.rewardRate().encodeABI()],
						[curveRewards._address, curveRewards.methods.periodFinish().encodeABI()],
					]

					let aggcalls = await multicall.methods.aggregate(calls).call()
					let decoded = aggcalls[1].map(hex => web3.eth.abi.decodeParameter('uint256', hex))

		        	let SNXapys = []
		        	for(let i = 1; i < this.data.length; i++) {
		        		let timestamp = this.data[i].timestamp
		        		let total_supply = this.data[i].supply
		        		let virtual_price = this.data[i].virtual_price
		        		console.log(SNXprices, "SNX PRICES")
		        		let SNXprice = this.findClosestPrice(this.data[i].timestamp, SNXprices)
		        		let reward = decoded[0] * decoded[1] / 1e18
		        		if(+decoded[2] < timestamp)
		        			reward = 0.000001
		        		//before YFI
		        		if(timestamp < 1594972885) reward = 0
		        		let SNXapy = 356 * reward / 7 * SNXprice / (0.98 * total_supply * virtual_price / 1e36) * 100
		        		SNXapys.push([timestamp * 1000, SNXapy])
		        	}

		        	this.chart.addSeries({
		        		name: 'YFI APY',
		        		lineWidth: 2,
		        		data: SNXapys,
		        		color: '#f45b5b',
		        	})

		        	let totalAPYs = chartData.map(([timestamp, apy], i) => [timestamp, apy + SNXapys[i][1]])

		        	this.chart.addSeries({
		        		name: 'Total APY',
		        		lineWidth: 2,
		        		data: totalAPYs,
		        		color: '#8085e9',
		        	})
		    	}



		        if(['susd'].includes(this.pool)) {
		        	this.chart.yAxis[0].update({
		        		type: 'linear'
		        	})
		        }

		        await volumeStore.getDailyVolume(this.pool, false, 1440)

		        let volumeSeries = volumeStore.state.allVolume[this.pool == 'susdv2' ? 'susd' : this.pool]

		        this.chart.addSeries({
		        	type: 'column',
		        	name: 'Trading Volume',
		        	data: volumeSeries,
		        	color: '#0b0a57',
		        	yAxis: 'volumeAxis',
		        }, false, false)

		        this.chart.redraw(false)

		        let lendingrates;
		        let lendingAxis = 'apyAxis'
		        if(!['susdv2', 'tbtc', 'ren', 'sbtc'].includes(this.pool))    	
	    			lendingrates = await volumeStore.getLendingAPY(this.pool, false, 1440)
		        else {
		        	lendingrates = volumeSeries.map(data => [data[0], 0])
		        	lendingAxis = 'lendingAxis'
		        	this.chart.addAxis({
		            	id: 'lendingAxis',
		            	opposite: false,
		            	type: 'linear',
		            	title: {
		            		text: 'Lending rates',
		            		style: {
		            			color: 'black'
		            		},
		            	},
		            	labels: {
		            		x: 40,
		            		style: {
		            			color: 'black',
		            		},
		            	},
		            	tickPixelInterval: 10,
		            	top: '65%',
		            	height: '5%',
		            })
		            this.chart.yAxis[1].update({
		            	top: '70%',
		            	height: '30%',
		            })

		        }


	    		this.chart.addSeries({
	    			name: 'Lending APY',
	    			data: lendingrates,
	    			yAxis: lendingAxis,
	    			color: '#7bb5ec',
	    		})

		        if(!['susdv2', 'tbtc', 'ren', 'sbtc', 'y', 'iearn'].includes(this.pool)) {
		        	let totalAPYs = chartData.map(([timestamp, apy], i) => [timestamp, apy + lendingrates[i][1]])

		        	this.chart.addSeries({
		        		name: 'Total APY',
		        		lineWidth: 2,
		        		data: totalAPYs,
		        		color: '#8085e9',
		        	})
		        }

		        this.chart.redraw();
		        this.chart.hideLoading();

		        this.loading = false;
			},
		}
	}
</script>