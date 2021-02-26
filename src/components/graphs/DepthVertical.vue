<template>
	<div class='bigdiv'>
		<div @mousemove = 'move' ref='chartcontainer'>
			<highcharts :options='depthchart' ref='highcharts' class='depthchart'></highcharts>
		</div>
	</div>
</template>

<script>
	import Highcharts from 'highcharts'
	console.log(Highcharts.PlotLineOrBand)
	Highcharts.PlotLineOrBand.prototype.update = function (newOptions){
        var plotBand = this;
        Highcharts.extend(plotBand.options, newOptions);
        if (plotBand.svgElem) {
            plotBand.svgElem.destroy();
            plotBand.svgElem = undefined;
            plotBand.render();
        }
    }


	import {Chart} from 'highcharts-vue'

	import stableswap_fns from '../../utils/stableswap_fns'

	import { contract } from '../../contract'

	import BN from 'bignumber.js'


	export default {
		components: {
			highcharts: Chart,
		},
		data: () => ({
		loading: true,
		chart: null,
	    	depthchart: {
	    		chart: {
	    			type: 'areaspline',
	    			zoomType: 'x',
	    			marginTop: 20,
	    			marginLeft: 20,
	    			marginRight: 20,
	    		},
	    		title: {
	    			text: ''
	    		},
	    		xAxis: {
	    			type: 'logarithmic',
	    			/*crosshair: {
	    				color: 'gray',
	    				width: 1.5,
	    			},*/
	    			minPadding: 0,
	    			maxPadding: 0,
	    			 plotLines: [{
			            color: '#888',
			            value: 1,
			            width: 1,
			            label: {
			                text: 'Actual price',
			                rotation: -90
			            }
			        }],
	    			title: {
	    				text: 'Price'
	    			},
	    			labels: {
	    				y: 10,
	    				rotation: 90
	    			},
	    		},
	    		yAxis: [{
	    			type: 'logarithmic',
	    			/*crosshair: {
	    				color: 'gray',
	    				width: 1.5,
	    			},*/
	    			min: 1,
			        lineWidth: 1,
			        gridLineWidth: 1,
			        title: null,
			        tickWidth: 1,
			        tickLength: 5,
			        tickPosition: 'inside',
			        labels: {
			            align: 'left',
			            x: 8,
			            rotation: 90
			        },
			    }, {
			    	type: 'logarithmic',
			    	/*crosshair: {
			    		color: 'gray',
			    		width: 1.5,
			    	},*/
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
			            x: -8,
			            rotation: 90
			        },
			    }],
			    legend: {
			        enabled: false
			    },
			    plotOptions: {
			        area: {
			            fillOpacity: 0.2,
			            step: 'center',
			        },
			        series: {
			            marker: {
			                states: {
			                    hover: {
			                        //enabled: false
			                    }
			                }
			            },
			            point: {
			                events: {

			                }
			            }
			        }
			    },
			    tooltip: {
			    	//enabled: false,
			        headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
			        valueDecimals: 2
			    },
			    series: [],
	    	},
	    	bbrect: null,
		}),
		created() {
			this.$watch(()=>contract.initializedContracts, val => {
                if(val) this.mounted();
            })
		},
		mounted() {
		},
		methods: {

			async mounted() {
				this.chart = this.$refs.highcharts.chart

				let A = await contract.swap.methods.A().call();
				let fee = await contract.fee
				let admin_fee = await contract.admin_fee
				let supply = await contract.swap_token.methods.totalSupply().call()
				let virtual_price = await contract.swap.methods.get_virtual_price().call()
				let timestamp = (Date.now() / 1000) | 0;

				let N_COINS = 2;
				let PRECISION_MUL = [1, 1000000000000]
				let COIN_PRECISIONS = [1e18, 1e6]
				let USE_LENDING = [true, true]
				let LENDING_PRECISION = 10 ** 18
				const PRECISION = 10 ** 18

				let compound = {
					N_COINS,
					PRECISION_MUL,
					USE_LENDING,
					LENDING_PRECISION,
					PRECISION,
				}

				let balances = []
				let rates = []
				for(let i = 0; i < 2; i++) {
					balances[i] = await contract.swap.methods.balances(i).call();
					balances[i] = await contract.swap.methods.balances(i).call();
					var rate = parseInt(await contract.coins[i].methods.exchangeRateStored().call()) / 1e18 / contract.coin_precisions[i];
		            var supply_rate = parseInt(await contract.coins[i].methods.supplyRatePerBlock().call());
		            var old_block = parseInt(await contract.coins[i].methods.accrualBlockNumber().call());
		            var block = await web3.eth.getBlockNumber();
		            rates[i] = rate * (1 + supply_rate * (block - old_block) / 1e18);
				}
				rates[0] = rates[0] * 1e36
				rates[1] = rates[1] * 1e24;


				/*console.log(contract.bal_info.map((b,i)=>b/contract.c_rates[i]))
				console.log(contract.c_rates)*/
				let now = {
					A,
					fee,
					admin_fee,
					supply,
					virtual_price,
					balances,
					rates,
					timestamp,
				}



				let dx1 = 100 * 1e18
				let dy1 = 100 * 1e6
				
				let data = require('../../jsons/compound-30m.json');

				let asks = []
				let bids = []
				let calc = stableswap_fns({
					...now,
					...compound,
				});

				for(let i = 1; i < 100; i++) {
					let volume = i;
					let dy = +(calc.get_dy_underlying(0, 1, BN(dx1).times(i).toFixed(0), true)) / (1e6)
					let dx = +(calc.get_dy_underlying(1, 0, BN(dy1).times(i).toFixed(0), true)) / (1e18)
					//console.log(+dy)
					let bidrate = dy / (dx1 * i) * 1e18
					let askrate = (dy1 * i) / 1e6 / dx
					//console.log(+bidrate)
					//console.log(+askrate)
					bids.push([+bidrate, i])
					asks.push([+askrate, i])
				}
				//console.log(asks, bids)
			    this.$refs.highcharts.chart.addSeries({
		            name: 'Asks',
		            data: asks,
		            color: '#B70000',
		        })
			    this.$refs.highcharts.chart.addSeries({
		            name: 'Bids',
		            data: bids,
		            color: '#007A00',
		        })

		        let currentValue = +((calc.get_dy_underlying(0, 1, BN(1e18).toFixed(0), true)).div(BN(1e6)))
				this.$refs.highcharts.chart.series[0].xAxis.plotLinesAndBands[0]
							.update({
								value: currentValue,
								label: {
									text: 'Actual price ' + currentValue.toFixed(4)
								}
							})

		        this.$refs.highcharts.chart.redraw()
            	this.bbrect = this.$refs.highcharts.$el.getBoundingClientRect();
            	this.bbrect._top = this.bbrect.top + window.scrollY;
			    this.loading = false;
			},
			move(event) {
				if(!this.chart) return;
				let x = event.pageX;
	            let y = event.pageY;
	            x = x - this.bbrect.left;
	            y = y - this.bbrect._top;
	            //console.log(this.chart.plotLeft, this.chart.plotWidth, this.chart.plotTop, this.chart.plotHeight, "VALS")
	            var path = ['M', this.chart.plotLeft, x,
	                'L', this.chart.plotLeft + this.chart.plotWidth, x,
	                'M', this.chart.plotWidth + 2*this.chart.plotLeft - y, this.chart.plotTop,
	                'L', this.chart.plotWidth + 2*this.chart.plotLeft - y, this.chart.plotTop + this.chart.plotHeight];
	            var isOnPlot = function(x, y, chart) {
	            		return (
	                	x > chart.plotLeft &&
	                  x < chart.plotLeft + chart.plotWidth &&
	                  y > chart.plotTop &&
	                  y < chart.plotTop + chart.plotHeight
	                ) ? true : false
	            }
	            var isOnPlot = () => true
	            console.log(this.chart.pointer.findNearestKDPoint(this.chart.series, false, {clientX: 0, clientY: 0}))
	            let event1 = JSON.parse(JSON.stringify(event));
	            event1.y = this.chart.plotWidth + 2*this.chart.plotLeft - y
	            let ne = this.chart.pointer.normalize(event1);
	            console.log(this.chart.pointer.findNearestKDPoint(this.chart.series, false, ne))
	            console.log(this.chart.pointer.findNearestKDPoint(this.chart.series, true, ne))
	            console.log(this.chart.pointer.findNearestKDPoint(this.chart.series, true, {...ne,chartX:1, chartY:2}))
	            this.chart.pointer.findNearestKDPoint(this.chart.series, false, {...this.chart.series.normalize(event), chartX: 100, chartY: 100}).select(true, false)
	            this.chart.series[0].data[100].select()
		        if (this.chart.crossLines) {
	        		if (isOnPlot(x, y, this.chart)) {
		            	// update lines
		              this.chart.crossLines.attr({
		                  d: path
		              });
		            } 
		            else {
		            	this.chart.crossLines.attr('d', '')
		            }
		        } 
		        else {
		            // draw lines
		            this.chart.crossLines = this.chart.renderer.path(path).attr({
		                'stroke-width': 1,
		                stroke: 'green',
		                zIndex: 10
		            }).add();
		        }
				if (this.chart.crossLabel) {
		    		if(isOnPlot(x, y, this.chart)) {
						// update label
						this.chart.crossLabel.attr({
							x: this.chart.plotWidth - y,
							text: this.chart.xAxis[0].toValue(this.chart.plotWidth - y).toFixed(4)
						});

						this.chart.crossYLabelLeft.attr({
							y: x,
							text: this.chart.yAxis[0].toValue(x).toFixed(4),
							color: 'red'
						});

						this.chart.crossYLabelRight.attr({
							y: x,
							text: this.chart.yAxis[0].toValue(x).toFixed(4)
						});

						if(document.querySelector('.highcharts-series.highcharts-series-0').getAttribute('opacity') == 1)
							this.chart.crossYLabelLeft.attr('y', -9999)
						else
							this.chart.crossYLabelRight.attr('y', -9999)
						

					} 
					else {
						this.chart.crossLabel.attr('x', -9999)
						this.chart.crossYLabelLeft.attr('y', -9999)
						this.chart.crossYLabelRight.attr('y', -9999)
					}
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
	.depthchart {
		position: absolute;
		top: 50%;
		transform: translateY(-50%) rotate(270deg);
	}
	.bigdiv {
		position: relative;
		height: 1000px;
	}
</style>