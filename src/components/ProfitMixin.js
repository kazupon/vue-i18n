import * as common from '../utils/common.js'
import { getters, contract as currentContract, allCurrencies } from '../contract'
import { makeCancelable, interpolate } from '../utils/helpers'

import allabis, { yERC20_abi } from '../allabis'

import BN from 'bignumber.js'

export default {
	data: () => ({
		addliquidityTopic: '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
		removeliquidityTopic: '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
		removeliquidityImbalanceTopic: '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',
		depositArr: [],
		withdrawArr: [],

		getStakedBalance: -1,
		getStakedBalanceUSD: -1,
		stakedTokens: -1,

		dailyAPY: null,
	}),
	computed: {
		fromBlock() {
			if(this.currentPool == 'compound') return '0x91c86f'
			if(this.currentPool == 'usdt') return '0x904a9c'
			if(this.currentPool == 'susdv2') return '0x9729a6'
			return '0x909964'
		},
		decodeParameters() {
			return [`uint256[${this.N_COINS}]`,`uint256[${this.N_COINS}]`, 'uint256', 'uint256']
		},
		decodeParametersWithdrawal() {
			return [`uint256[${this.N_COINS}]`,`uint256[${this.N_COINS}]`, 'uint256']
		},
		decodeParametersWithdrawal1() {
			return [`uint256[${this.N_COINS}]`,`uint256[${this.N_COINS}]`, 'uint256', 'uint256']
		},
		decodeParametersWithdrawalOne() {
			return [`uint256`, `uint256`]
		}
	},
	methods: {
		async mounted() {
			try {
				this.account = this.$route.params.address || currentContract.default_account
		        common.update_fee_info();
		        this.BN = currentContract.web3.utils.toBN
		        this.CURVE = currentContract.swap_address;
		        this.CURVE_TOKEN = currentContract.token_address;


				let subdomain = this.currentPool
				if(subdomain == 'iearn') subdomain = 'y'
				if(subdomain == 'susdv2') subdomain = 'susd'
				if(subdomain == 'ren') subdomain = 'ren2'
				if(subdomain == 'sbtc') subdomain = 'rens'
				if(['ren', 'rens'].includes(subdomain)) {
					await this.getBTCPrice()
				}
	        	let reqs = await Promise.all([
	        		fetch(`${window.domain}/raw-stats/${subdomain}-1440m.json`),
	        		fetch(`${window.domain}/raw-stats/${subdomain}-5m.json`),
	        		fetch(`${window.domain}/raw-stats/apys.json`),
        		]);
	        	let res = await Promise.all(reqs.map(req => req.json()));
	        	this.priceData = res[0]
	        	this.priceData5m = res[1]
	        	this.dailyAPY = res[2].apy.day[subdomain] * 100 / 365
	        	for(let [i, symbol] of Object.values(allCurrencies[this.currentPool]).entries()) {
	        		this.ADDRESSES[symbol] = allabis[this.currentPool].coins[i]
	        	}
			    let [available, availableUSD, stakedBalanceUSD, stakedBalance] = await this.getAvailableAmount()
			    if(['susdv2', 'sbtc', 'y', 'iearn'].includes(this.currentPool)) {
			    	this.getStakedBalance = stakedBalance
			    	this.getStakedBalanceUSD = stakedBalanceUSD
			    	this.stakedTokens = currentContract.curveStakedBalance
			    }
			    this.deposits = await this.getDeposits();
			    this.withdrawals = await this.getWithdrawals();
			    //this.available = await this.getAvailableBalance()
			    this.available = available
			    this.availableUSD = availableUSD;
			    this.profit = (available + this.getStakedBalance) + this.withdrawals - this.deposits
			    this.profitUSD = availableUSD + this.withdrawalsUSD - this.depositsUSD;
			}
			catch(err) {
				console.error(err);
				this.clearCache();
			}
	    },

	    async getAvailableAmount() {
	    	if(!this.$route.params.address) {
	    		let totalShare = currentContract.totalShare
	    		let usdShare = currentContract.usdShare
	    		if(!['tbtc', 'ren', 'sbtc'].includes(this.currentPool)) this.btcPrice = 1
	    		console.log(currentContract.curveStakedBalance, currentContract.virtual_price, this.btcPrice)
	    		if(['y', 'iearn'].includes(this.currentPool)) {
	    			let vault = '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c'
	    			let vaultContract = new currentContract.web3.eth.Contract(yERC20_abi, '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c')
	    			let calls = [
	    				[vaultContract._address, vaultContract.methods.balanceOf(currentContract.default_account).encodeABI()],
	    				[vaultContract._address, vaultContract.methods.getPricePerFullShare().encodeABI()],
	    			]
	    			let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
	    			let [balanceOf, rate] = aggcalls[1].map(hex => +currentContract.web3.eth.abi.decodeParameter('uint256', hex))

	    			if(balanceOf > 0)
	    				this.isInVault = true

	    			totalShare += this.getAvailableTransfer(+balanceOf * +rate, this.priceData[this.priceData.length - 1]) / 1e18
	    			usdShare += (+balanceOf * +rate / 1e36) * currentContract.virtual_price
	    		}
	    		return [totalShare * 100, usdShare * this.btcPrice || 0,
    				currentContract.curveStakedBalance * currentContract.virtual_price * this.btcPrice / 1e18, currentContract.totalStake * 100]
	    	}
	    	return this.calcAvailable();
	    },


	    async calcAvailable() {
	    	let calls = [
	    		[this.CURVE_TOKEN, '0x70a08231000000000000000000000000' + this.account.slice(2)],
	    	]
	    	if(['susdv2', 'sbtc', 'y', 'iearn'].includes(currentContract.currentContract))
	    		calls.push([currentContract.curveRewards._address, '0x70a08231000000000000000000000000' + this.account.slice(2)])
	    	let aggcalls = await currentContract.multicall.methods.aggregate(calls).call();
	    	let [tokenBalance, stakedBalance] = aggcalls[1].map(hex => +currentContract.web3.eth.abi.decodeParameter('uint256', hex))
	    	let totalStake = 0
		    if(['susdv2', 'sbtc'].includes(this.currentPool)) {
		    	stakedBalance = await currentContract.web3.eth.call({
			        to: currentContract.curveRewards._address,
			        data: '0x70a08231000000000000000000000000' + this.account.slice(2),
			    });

		    	totalStake = currentContract.bal_info.map((bal, i) => {
		    		return bal * stakedBalance / currentContract.totalSupply
		    	}).reduce((a, b) => a + b, 0)
		    }

		    tokenBalance = +tokenBalance
		    stakedBalance = +stakedBalance

		    let totalShare = currentContract.bal_info.map((bal, i) => {
	    		return bal * tokenBalance / currentContract.totalSupply
	    	}).reduce((a, b) => a + b, 0)

	    	let usdShare = tokenBalance * currentContract.virtual_price / 1e18
	    	let usdStake = stakedBalance * currentContract.virtual_price / 1e18

	    	if(['tbtc', 'ren', 'sbtc'].includes(this.currentPool)) {
	    		usdShare *= this.btcPrice
	    		usdStake *= this.btcPrice
	    	}

	    	return [totalShare * 100, usdShare || 0, usdStake, totalStake * 100]
	    },

	    async getAvailableBalance() {
	    	let available = 0;
	        let promises = [];
	        for(let curr of Object.keys(this.ADDRESSES)) {
	            promises.push(this.getAvailable(curr))
	        }
	        let prices = await Promise.all(promises);
	        
	        return await this.calculateAvailable(prices);
	    },

	    async calculateAvailable(prices) {
	    	let available = 0;
	    	for(let i = 0; i < prices.length; i++) {
	            let curr = Object.keys(this.ADDRESSES)[i]
	             if(['DAI','USDC','USDT','sUSD'].includes(curr)) {
	                available += this.fromNativeCurrent(curr, prices[i])
	            }
	            else {
	            	//exchangeRateCurrent
		            const exchangeRate = await currentContract.web3.eth.call({
		                to: this.ADDRESSES[curr],
		                data: '0xbd6d894d',
		            });
		            available += this.fromNativeCurrent(curr,


		                BN(exchangeRate)
		                .times(BN(prices[i]))
		                .div(BN(1e8))
		            );
	        	}
	        }
	        return available
	    },

	    convertValues(curr, exchangeRate, value) {
		    if(curr == 'cDAI') exchangeRate*=1e8
		    if(curr == 'cUSDC') exchangeRate*=1e20
		    return BN(exchangeRate).times(BN(value))
		},

		fromNativeCurrent(curr, value) {
		    if(curr == 'cDAI') return value.div(BN(1e10)).div(BN(1e16));
		    if(curr == 'cUSDC') {
		        return +value.div(BN(1e14));
		    }
			if(curr == 'DAI' || curr == 'PAX') {
				return +value.div(BN(1e16))
			}
			if(curr == 'USDC' || curr == 'USDT') {
				return +value.div(BN(1e4))
			}
			if(curr == 'sUSD') {
				return +value.div(BN(1e16));
			}
			const decimals = ['yUSDC', 'yUSDT'].includes(curr) ? 6 : 18;
		    if (decimals === 18) {
		        return Number(currentContract.web3.utils.fromWei(value.toString(0)));
		    }
		    return +value / 10 ** decimals;
		},
		async convertValuesCurrent(curr) {
		    const usdPool = await currentContract.web3.eth.call({
		        to: ADDRESSES[curr],
		        data: '0x7137ef99',
		    });
		    const tokensSupply = await currentContract.web3.eth.call({
		        to: ADDRESSES[curr],
		        data: '0x18160ddd',
		    });
		    return value => {
		        return this.fromNativeCurrent(
		            curr,
		            BN(usdPool)
		                .times(BN(value))
		                .div(BN(tokensSupply))
		                .times(BN(100))
		        );
		    };
		},
		findClosest(timestamp) {
		    let dates = this.priceData.find(d=>d.timestamp - timestamp > 0);
		    //check if timestamp was before recording, this is only for when timestamp > latest recorded, get latest recorded
		    if(timestamp < this.priceData[0].timestamp) {
		    	this.notinpricedata = true
		    	this.showinUSD = 3;
		    	return this.priceData[0];
		    }
		    if(dates === undefined) return this.priceData[this.priceData.length-1]
		    return dates;
		},
		async getClosestBTCPrice(timestamp) {
			while(true) {
				try {
					let req = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${timestamp}&to=${(Date.now() / 1000) | 0}`)
					let res = await req.json()
					if(res.length) return res[0][1]
					await helpers.setTimeoutPromise(300)
					timestamp -= 1000
				}
				catch(err) {
					console.error(err)
					throw err
					break;
				}
			}
		},
		async interpolatePoint(timestamp, priceData) {
			let point = {};
			if(priceData && timestamp > priceData[priceData.length-1].timestamp) {
				return {
					...priceData[priceData.length-1],
					btcPrice: this.btcPrice,
				}
			}
			if(!priceData) priceData = this.priceData
			if(timestamp > priceData[priceData.length-1].timestamp) {
				return this.interpolatePoint(timestamp, this.priceData5m)
			}
			let prev = priceData.find(p=>timestamp - p.timestamp > 0 && p.virtual_price > 0)
			let next = priceData.find(p=>p.timestamp - timestamp > 0 && p.virtual_price > 0)
			if(prev === undefined) prev = priceData[0]
			if(next === undefined) next = priceData[this.priceData.length-1]
			if(prev.timestamp == next.timestamp) point = next;

			if(Object.keys(point).length === 0 && point.constructor === Object) {
				// let point = {
				// 	// virtual_price,
				// 	// balances: [],
				// 	// rates: [],
				// 	// supply: [],
				// }

				let interpolator = interpolate(timestamp, prev.timestamp, next.timestamp)
				point.virtual_price = interpolator(prev.virtual_price, next.virtual_price)
				point.balances = prev.balances.map((b, i) => interpolator(b, next.balances[i]))
				point.rates = prev.rates.map((r, i) => interpolator(r, next.rates[i]))
				point.supply = interpolator(prev.supply, next.supply);
			}
			if(['tbtc', 'ren', 'sbtc'].includes(this.currentPool)) {
				point.btcPrice = this.btcPrice
				// //instead of this better to make a request to coinpaprika but which API allows querying 
				// try {
				// 	point.btcPrice = await this.getClosestBTCPrice(timestamp)
				// }
				// catch(err) {
				// 	console.error(err)
				// 	point.btcPrice = interpolator(prev.btcPrice, next.btcPrice)
				// }
			}
			return point

		},
	    fromNative(curr, value) {
		    return value.div(BN(1e16))
		},
	    async checkExchangeRateBlocks(block, address, direction) {
		    let fromBlock = '0x'+parseInt(block-100).toString(16)
		    let toBlock = '0x'+parseInt(block).toString(16)
		    if(direction == 1) {
		        fromBlock = '0x'+parseInt(block).toString(16)
		        toBlock = '0x'+parseInt(block+100).toString(16)
		    }
		    if(direction == 0) {
		        fromBlock = '0x'+parseInt(block-1).toString(16)
		        toBlock = '0x'+parseInt(block+1).toString(16)
		    }
		    let mints = await currentContract.web3.eth.getPastLogs({
		        fromBlock: fromBlock,
		        toBlock: toBlock,
		        address: address,
		        //currentContract.web3.utils.sha3('Mint(address,uint256,uint256)')
		        topics: [
		            '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
		        ],
		    });
		    if(mints.length) {
		        let mint = mints[0]
		        let mintevent = currentContract.web3.eth.abi.decodeParameters(['address','uint256','uint256'], mint.data)
		        let exchangeRate;
		        if(mintevent[1] == 0 || mintevent[2] == 0) return -1
		        exchangeRate = BN(mintevent[1]).div(BN(mintevent[2]));
		        if(address == currentContract.coins[1]._address) {
		            exchangeRate = BN(mintevent[1]).times(BN(1e12)).div(BN(mintevent[2]))
		        }
		        if(direction == 0) return exchangeRate
		        return {blockNumber: mint.blockNumber, exchangeRate: exchangeRate};
		    }
		    return false;
		},
	    async getExchangeRate(blockNumber, address, value, type) {
	    	if(currentContract.currentContract == 'pax' && address.toLowerCase() == currentContract.coins[3]._address.toLowerCase()) {
	    		return 1
	    	}
		    let exchangeRate = await this.checkExchangeRateBlocks(blockNumber, address, 0);
		    let exchangeRatePast, exchangeRateFuture;
		    let currentBlock = await currentContract.web3.eth.getBlockNumber();
		    let pastCurrentBlock = false;
		    if(exchangeRate === false) {
		        let i = blockNumber;
		        let j = blockNumber;
		        while((exchangeRatePast = await this.checkExchangeRateBlocks(i, address, -1, type)) === false) {
		            i-=100;
		        }
		        while((exchangeRateFuture = await this.checkExchangeRateBlocks(j, address, 1, type)) === false) {
		            if(j > currentBlock) {
		                pastCurrentBlock = true;
		                break;
		            }
		            j+=100;
		        }

		        while(pastCurrentBlock) {
		            let i = blockNumber - 200;
		            let j = blockNumber - 100;
		            while((exchangeRatePast = await this.checkExchangeRateBlocks(i, address, -1, type)) === false) {
		                i-=200;
		            }
		            while((exchangeRateFuture = await this.checkExchangeRateBlocks(j, address, -1, type)) === false) {
		                if(j > currentBlock) {
		                    pastCurrentBlock = true;
		                    break;
		                }
		                j-=100;
		            }
		            if(exchangeRatePast.blockNumber && exchangeRateFuture.blockNumber) pastCurrentBlock = false;
		        }

		        if(exchangeRatePast.blockNumber == exchangeRateFuture.blockNumber) {
		            return exchangeRatePast.exchangeRate;
		        }

		        if(BN.isBigNumber(exchangeRateFuture.exchangeRate)) {
		        	exchangeRateFuture.exchangeRate = exchangeRateFuture.exchangeRate
		        	exchangeRatePast.exchangeRate = exchangeRatePast.exchangeRate
		        }
	        	if(exchangeRatePast.exchangeRate === undefined || exchangeRateFuture.exchangeRate === undefined) return -1;
	        	exchangeRate = interpolate(blockNumber, exchangeRatePast.blockNumber, exchangeRateFuture.blockNumber)( 
	        		exchangeRatePast.exchangeRate, exchangeRateFuture.exchangeRate)
		        // exchangeRate = (blockNumber - exchangeRatePast.blockNumber)*(exchangeRateFuture.exchangeRate-(exchangeRatePast.exchangeRate))
		        // exchangeRate = exchangeRate / ((exchangeRateFuture.blockNumber - exchangeRatePast.blockNumber))
		        // exchangeRate = exchangeRate + (exchangeRatePast.exchangeRate)
		    }
			if(exchangeRate.exchangeRate) exchangeRate = exchangeRate.exchangeRate
		    return exchangeRate || 0;
		},

		async calculateAmount(cTokens, block, type) {
			if(this.cancel) throw new Error('cancel');
		    let amount = 0;
		    for(let i = 0; i < currentContract.N_COINS; i++) {
		            const tokens = BN(cTokens[i]);
		            if(tokens == 0) continue;
		            const tokenIndex = Object.values(this.ADDRESSES)[i]
		            let curr = Object.keys(this.ADDRESSES)[i]
		            let address = currentContract.coins[i]._address
		          	if(['iearn','busd','pax'].includes(currentContract.currentContract)) address = currentContract.underlying_coins[i]._address
		            let exchangeRate = await this.getExchangeRate(block, address, '', type)
		        	if(exchangeRate == -1) continue;
		            let usd;
		          	if(currentContract.currentContract == 'usdt' && i ==2) {
		            	usd = BN(tokens).div(BN(1e4)).toNumber();
		          	}
		          	if(['iearn','busd', 'pax'].includes(currentContract.currentContract)) {
		          		if(i == 0 || i == 3) tokens /= 1e16;
		          		else tokens /= 1e4
		          		usd = tokens * exchangeRate
		          	}
		          	else if(currentContract.currentContract == 'susdv2' || (currentContract.currentContract == 'pax' && i == 3)) {
		            	usd = this.fromNativeCurrent(curr, BN(exchangeRate).times(BN(tokens)))	
		          	}
		          	else {
		            	usd = this.fromNative(curr, BN(exchangeRate).times(BN(tokens)))
		          	}
		            amount += usd;
		    }
		    return amount;
		},

	    async getDeposits() {
		    let default_account = this.account
		    default_account = default_account.substr(2).toLowerCase();

		    let depositUsdSum = 0;
		    this.depositsUSD = 0;
		    this.depositsBTC = 0
		    let allDepositsUSD = 0

		    let fromBlock = this.fromBlock;
		    if(localStorage.getItem(this.currentPool + 'dversion') == this.version 
	    		&& localStorage.getItem(this.currentPool + 'lastDepositBlock') 
	    		&& localStorage.getItem(this.currentPool + 'dlastAddress') == default_account
	    		&& currentContract.default_account) {
		        let block = +localStorage.getItem(this.currentPool + 'lastDepositBlock')
		        fromBlock = '0x'+parseInt(block+1).toString(16)
		        depositUsdSum += +localStorage.getItem(this.currentPool + 'lastDeposits')
		        this.depositsUSD = allDepositsUSD = +localStorage.getItem(this.currentPool + 'lastDepositsUSD')
		        if(['ren', 'sbtc'].includes(this.currentPool)) {
		        	this.depositsBTC = this.depositsUSD
		        	this.depositsUSD = this.depositsUSD * this.btcPrice
		        }
		    }
		    const poolTokensReceivings = await currentContract.web3.eth.getPastLogs({
		        fromBlock: fromBlock,
		        toBlock: 'latest',
		        address: this.CURVE_TOKEN,
		        topics: [
		            this.TRANSFER_TOPIC,
		            [],
		            '0x000000000000000000000000' + default_account,
		        ],
		    });

		    console.log(poolTokensReceivings)

		    var lastBlock = poolTokensReceivings.length && poolTokensReceivings[poolTokensReceivings.length-1].blockNumber || fromBlock

		    const txs = poolTokensReceivings.map(e => e.transactionHash);
		    console.time('timer')
		    for (const hash of txs) {
		    	if(this.cancel) throw new Error('cancel');
		        const receipt = await currentContract.web3.eth.getTransactionReceipt(hash);
		        //old susd contract
		        let timestamp = (await currentContract.web3.eth.getBlock(receipt.blockNumber)).timestamp;
		        console.log(timestamp)
		        let addliquidity = receipt.logs.filter(log=>log.topics[0] == this.addliquidityTopic)
		        let removeliquidity = receipt.logs.filter(log=>log.topics[0] == this.removeliquidityTopic)
		        let removeliquidityImbalance = receipt.logs.filter(log=>log.topics[0] == this.removeliquidityImbalanceTopic)
		        console.log(addliquidity)
	            let poolInfoPoint = await this.interpolatePoint(timestamp)
	            let transfer = receipt.logs
	            					.filter(log=>log.address == this.CURVE_TOKEN 
	            						&& log.topics[0] == this.TRANSFER_TOPIC
	            						&& log.topics[1] != '0x000000000000000000000000' + default_account
	            						&& log.topics[2] == '0x000000000000000000000000' + default_account)
				if(!transfer.length) continue
	            let transferTokens = +transfer[0].data
	            console.log(transferTokens / 1e18, poolInfoPoint.virtual_price, transferTokens * poolInfoPoint.virtual_price / 1e36)
	            if(addliquidity.length == 0 && [
	            	"0x000000000000000000000000dcb6a51ea3ca5d3fd898fd6564757c7aaec3ca92",
	             	"0x00000000000000000000000013c1542a468319688b89e323fe9a3be3a90ebb27",
	             	"0x0000000000000000000000000001fb050fe7312791bf6475b96569d83f695c9f",
	             	"0x0000000000000000000000005dbcf33d8c2e976c6b560249878e6f1491bca25c",
	             ].includes(transfer[0].topics[1])) continue;
	            let depositsUSD = transferTokens * poolInfoPoint.virtual_price / 1e36
	        	allDepositsUSD += depositsUSD
	            if(['tbtc', 'ren', 'sbtc'].includes(this.currentPool)) {
	            	this.depositsUSD += depositsUSD * poolInfoPoint.btcPrice
	            	this.depositsBTC += depositsUSD
	            }
	            else
	            	this.depositsUSD += depositsUSD
	            console.log(transferTokens)
		        if(addliquidity.length) {
		            let cTokens = (currentContract.web3.eth.abi.decodeParameters(this.decodeParameters, addliquidity[0].data))[0]
		            console.log(cTokens, "add liquidity cTokens")
		            let usd = await this.calculateAmount(cTokens, receipt.blockNumber, 'deposit')
		            this.depositArr.push([poolInfoPoint, usd / 100 ])
		            depositUsdSum += usd
		        }
		        else {
		            console.log(transfer)
		            console.log(transferTokens, "transfer tokens")
		            let usd = this.getAvailableTransfer(transferTokens, poolInfoPoint)
		            this.depositArr.push([poolInfoPoint, usd])
		            depositUsdSum += usd * 100
		        }
		    }
		    console.timeEnd('timer')
		    !this.cancel && localStorage.setItem(this.currentPool + 'lastDepositBlock', lastBlock);
		    !this.cancel && localStorage.setItem(this.currentPool + 'dlastAddress', default_account)
		    !this.cancel && localStorage.setItem(this.currentPool + 'lastDeposits', depositUsdSum);
		    !this.cancel && localStorage.setItem(this.currentPool + 'lastDepositsUSD', allDepositsUSD);
		    !this.cancel && localStorage.setItem(this.currentPool + 'dversion', this.version);
		    return depositUsdSum;

		},

		async getWithdrawals(address) {
		    let default_account = this.account
		    default_account = default_account.substr(2).toLowerCase();
		    let withdrawals = 0;
		    this.withdrawalsUSD = 0;
		    this.withdrawalsBTC = 0;
		    let allWithdrawalsUSD = 0
		    let fromBlock = this.fromBlock;
		    if(localStorage.getItem(this.currentPool + 'wversion') == this.version 
		    	&& localStorage.getItem(this.currentPool + 'lastWithdrawalBlock')
			 	&& localStorage.getItem(this.currentPool + 'wlastAddress') == default_account
			 	&& currentContract.default_account) {

			        let block = +localStorage.getItem(this.currentPool + 'lastWithdrawalBlock')
			        fromBlock = '0x'+parseInt(block+1).toString(16)
			        withdrawals += +localStorage.getItem(this.currentPool + 'lastWithdrawals')
			        this.withdrawalsUSD = allWithdrawalsUSD = +localStorage.getItem(this.currentPool + 'lastWithdrawalsUSD')
			        if(['ren', 'sbtc'].includes(this.currentPool)) {
			        	this.withdrawalsBTC = this.withdrawalsUSD
			        	this.withdrawalsUSD = this.withdrawalsUSD * this.btcPrice
			        }
		    }
		    const logs = await currentContract.web3.eth.getPastLogs({
		        fromBlock: fromBlock,
		        toBlock: 'latest',
		        address: currentContract.token_address,
		        topics: [
		            this.TRANSFER_TOPIC,
		            '0x000000000000000000000000' + default_account,
		        ],
		    });

		    console.log(fromBlock, "block")

		    var lastBlock = logs.length && logs[logs.length-1].blockNumber || fromBlock


		    for(let log of logs) {
		    	if(this.cancel) throw new Error('cancel');
		    	console.log(log)
		        const receipt = await currentContract.web3.eth.getTransactionReceipt(log.transactionHash);
		        let timestamp = (await currentContract.web3.eth.getBlock(receipt.blockNumber)).timestamp;
		        console.log(timestamp)
	            let poolInfoPoint = await this.interpolatePoint(timestamp)
		        let removeliquidity = receipt.logs.filter(log=>log.topics[0] == this.removeliquidityTopic)
		        let removeliquidityImbalance = receipt.logs.filter(log=>log.topics[0] == this.removeliquidityImbalanceTopic)
		        let removeliquidityOne = []
		        if(this.removeliquidityOneTopic) removeliquidityOne = receipt.logs.filter(log=>log.topics[0] == this.removeliquidityOneTopic)
	            let transfer = receipt.logs
	        					.filter(log=>log.topics[0] == this.TRANSFER_TOPIC 
    								&& log.topics[1] == '0x000000000000000000000000' + default_account
    								&& log.topics[2] != '0x000000000000000000000000' + default_account
    								&& log.address.toLowerCase() == currentContract.token_address.toLowerCase())
	        	if(!transfer.length) continue
	            let transferTokens = +transfer[transfer.length-1].data
	            console.log(transferTokens / 1e18, poolInfoPoint.virtual_price, transferTokens * poolInfoPoint.virtual_price / 1e36)
	            console.log(transfer)
	            console.log("WITHDRAWALS")
            	if(removeliquidity.length == 0 && 
            		removeliquidityImbalance.length == 0 && 
            		removeliquidityOne.length == 0 && 
            		[
            			"0x000000000000000000000000dcb6a51ea3ca5d3fd898fd6564757c7aaec3ca92", 
            			"0x00000000000000000000000013c1542a468319688b89e323fe9a3be3a90ebb27",
            			"0x0000000000000000000000000001fb050fe7312791bf6475b96569d83f695c9f",
            			"0x0000000000000000000000005dbcf33d8c2e976c6b560249878e6f1491bca25c",
        			].includes(transfer[0].topics[2])) continue;
            	let withdrawalsUSD = transferTokens * poolInfoPoint.virtual_price / 1e36
            	allWithdrawalsUSD += withdrawalsUSD
            	if(['tbtc', 'ren', 'sbtc'].includes(this.currentPool)) {
            		this.withdrawalsUSD += withdrawalsUSD * poolInfoPoint.btcPrice
            		this.withdrawalsBTC += withdrawalsUSD
            	}
	            else
	            	this.withdrawalsUSD += withdrawalsUSD
		        if(removeliquidity.length) {
		            let cTokens = (currentContract.web3.eth.abi.decodeParameters(this.decodeParametersWithdrawal, removeliquidity[0].data))[0]
		        	console.log(removeliquidity)
		            console.log(cTokens, "withdraw cTokens")
		            let usd = await this.calculateAmount(cTokens, log.blockNumber)
		            this.withdrawArr.push([poolInfoPoint, usd / 100])
		            withdrawals += usd
		            continue;
		        }

		        if(removeliquidityImbalance.length) {
		        	let decodeParameters = this.decodeParametersWithdrawal
		        	if(['compound','usdt'].includes(this.currentPool)) {
		        		decodeParameters = this.decodeParametersWithdrawal1
		        	}
		            let decoded = currentContract.web3.eth.abi.decodeParameters(decodeParameters, removeliquidityImbalance[0].data)
		        	console.log(removeliquidityImbalance)
		            console.log(decoded, 'remove imbalance tokens')
		            let usd = await this.calculateAmount(decoded[0], log.blockNumber, 'withdrawal')
		            this.withdrawArr.push([poolInfoPoint, usd / 100])
		            withdrawals += usd
		            continue;
		        }

		       	if(removeliquidityOne.length) {
		       		let decoded = currentContract.web3.eth.abi.decodeParameters(this.decodeParametersWithdrawalOne, removeliquidityOne[0].data)
		       		console.log(decoded, 'remove liquidity one')
		       		let usd = this.getAvailableTransfer(decoded[0], poolInfoPoint)
		            this.withdrawArr.push([poolInfoPoint, usd])
		            withdrawals += usd * 100
		       	}

		        if(removeliquidity.length == 0 && removeliquidityImbalance.length == 0 && removeliquidityOne.length == 0) {
		            console.log(transferTokens, "transfer")
		            let usd = this.getAvailableTransfer(transferTokens, poolInfoPoint)
		            this.withdrawArr.push([poolInfoPoint, usd])
		            withdrawals += usd * 100
		        }


		    }
		    !this.cancel && localStorage.setItem(this.currentPool + 'lastWithdrawalBlock', lastBlock);
		    !this.cancel && localStorage.setItem(this.currentPool + 'lastWithdrawals', withdrawals);
		    !this.cancel && localStorage.setItem(this.currentPool + 'lastWithdrawalsUSD', allWithdrawalsUSD);
		    !this.cancel && localStorage.setItem(this.currentPool + 'wlastAddress', default_account);
		    !this.cancel && localStorage.setItem(this.currentPool + 'wversion', this.version);
		    console.log("WITHDRAWALS", withdrawals)
		    return withdrawals;
		},

		getAvailableTransfer(amount, poolInfoPoint) {
			return poolInfoPoint.balances
					.map((balance, i) => {
						return balance * poolInfoPoint.rates[i] / allabis[this.currentPool].coin_precisions[i] * amount / poolInfoPoint.supply / 1e18
					})
					.reduce((a, b) => a + b, 0)
		},

		async getAvailable(curr, amount, balance, supply) {
		    if(this.cancel) throw new Error('cancel');
		    let default_account = this.account
		    default_account = default_account.substr(2).toLowerCase();
		    const tokenAddress = this.ADDRESSES[curr];
		    //balanceOf method
		    //balance
		    const balanceOfCurveContract = await currentContract.web3.eth.call({
		        to: tokenAddress,
		        data: '0x70a08231000000000000000000000000' + this.CURVE.substr(2),
		    });
		    //amount
		    const poolTokensBalance = await currentContract.web3.eth.call({
		        to: this.CURVE_TOKEN,
		        data: '0x70a08231000000000000000000000000' + default_account,
		    });
		    //totalSupply
		    const poolTokensSupply = await currentContract.web3.eth.call({
		        to: this.CURVE_TOKEN,
		        data: '0x18160ddd',
		    });

		    const get_virtual_price = await currentContract.web3.eth.call({
		    	to: this.CURVE,
		    	data: '0xbb7b8b80'
		    })

		    return BN(balanceOfCurveContract)
		        .times(BN(poolTokensBalance))
		        .div(BN(poolTokensSupply));
		},
	},

}