import * as common from '../utils/common.js'
import { getters, contract as currentContract } from '../contract'

import BN from 'bignumber.js'

export default {
	data: () => ({
		addliquidityTopic: '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
		removeliquidityTopic: '0xb964b72f73f5ef5bf0fdc559b2fab9a7b12a39e47817a547f1f0aee47febd602',
		removeliquidityImbalanceTopic: '0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
		earnedYFI: null,
		paidRewardsYFI: null,
		weeklyEstimateYFI: null,
		claimableADAI: null,
		yfiPrice: null,
	}),

	async mounted() {
		if(this.account && currentContract.multicall) this.getPrices()
	},

	async created() {
		this.$watch(() => this.account && currentContract.multicall, val => val && this.getPrices())
	},

	computed: {
		showEarnedYFI() {
			if(this.showinUSD == 1) return (+this.earnedYFI * this.yfiPrice).toFixed(2)
			return (+this.earnedYFI).toFixed(2)
		},

		showEarnedYFIUSD() {
			return (+this.earnedYFI * this.yfiPrice).toFixed(2)
		},

		showRewardsYFI() {
			if(this.showinUSD == 1) return (+this.paidRewardsYFI * this.yfiPrice).toFixed(2)
			return (+this.paidRewardsYFI).toFixed(2)
		},

		showRewardsYFIUSD() {
			return (+this.paidRewardsYFI * this.yfiPrice).toFixed(2)
		},

		showWeeklyYFI() {
			if(this.showinUSD == 1) return (+this.weeklyEstimateYFI * this.yfiPrice).toFixed(2)
			return (+this.weeklyEstimateYFI).toFixed(2)
		},

	},

	methods: {

		async getPrices() {
			let yfiPrice = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=yearn-finance&vs_currencies=usd')
			yfiPrice = await yfiPrice.json()
			this.yfiPrice = yfiPrice['yearn-finance'].usd

			let curveRewards = currentContract.curveRewards
			let aRewards = currentContract.aRewards
			let calls = [
				[curveRewards._address, curveRewards.methods.earned(this.account).encodeABI()],
				[curveRewards._address, curveRewards.methods.balanceOf(this.account).encodeABI()],
				[curveRewards._address, curveRewards.methods.userRewardPerTokenPaid(this.account).encodeABI()],
				[curveRewards._address, curveRewards.methods.totalSupply().encodeABI()],
				[curveRewards._address, curveRewards.methods.DURATION().encodeABI()],
				[curveRewards._address, curveRewards.methods.rewardRate().encodeABI()],
				[aRewards._address, aRewards.methods.claimable(this.account).encodeABI()],
				[curveRewards._address, curveRewards.methods.periodFinish().encodeABI()],
			]
			let now = Date.now() / 1000
			let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
			let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
			this.earnedYFI = +decoded[0] / 1e18
			let rewardLogs = await currentContract.web3.eth.getPastLogs({
				fromBlock: '0x975bfa',
				//old fromBlock: '0x932641',
				toBlock: 'latest',
				//SNX CurveRewards
				address: '0x0001fb050fe7312791bf6475b96569d83f695c9f',
				//old address: '0x13B54E8271B3e45cE71D8f4fC73eA936873a34fC',
				topics: [
					//sha3('RewardPaid(address,uint256)')
					'0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
					'0x000000000000000000000000' + this.account.slice(2),
					//'0x000000000000000000000000f3ae3bbdeb2fb7f9c32fbb1f4fbdaf1150a1c5ce',
				]
			})
			let rewards = rewardLogs.map(log=>currentContract.web3.eth.abi.decodeParameter('uint256', log.data) / 1e18).reduce((a, b) => a + b, 0)
			this.paidRewardsYFI = rewards
			let len = decoded.length
			this.weeklyEstimateYFI = (decoded[len-4] * decoded[len-3] / 1e18) * currentContract.curveStakedBalance  / decoded[3]
			if(+decoded[len-1] < now)
				this.weeklyEstimateYFI = 0
			this.claimableADAI = decoded[len-2] / 1e18
		},

	    async calculateAvailable(prices) {
		    if(this.cancel) throw new Error('cancel');
	    	let available = 0;
	    	for(let i = 0; i < prices.length; i++) {
	            let curr = Object.keys(this.ADDRESSES)[i]
	            
	            const getPricePerFullShare = await currentContract.web3.eth.call({
	                to: this.ADDRESSES[curr],
	                data: '0x77c7b8fc',
	            });

	            available += this.fromNativeCurrent(curr,
	                BN(getPricePerFullShare)
	                .multipliedBy(BN(prices[i].toString())
	                .div(1e18))
	            );
	        }
	        return available*100;
	    },

	    async checkExchangeRateBlocks(block, address, direction, type = 'deposit') {
		    let default_account = this.account
		    default_account = default_account.substr(2).toLowerCase();

		    let fromBlock = '0x'+parseInt(block-10).toString(16)
		    let toBlock = '0x'+parseInt(block).toString(16)
		    //fromBlock = this.fromBlock
		    if(direction == 1) {
		        fromBlock = '0x'+parseInt(block).toString(16)
		        toBlock = '0x'+parseInt(block+10).toString(16)
		        //toBlock = 'latest'
		    }
		    if(direction == 0) {
		        fromBlock = '0x'+parseInt(block-1).toString(16)
		        toBlock = '0x'+parseInt(block+1).toString(16)
		    }
		    let underlying_addresses = currentContract.underlying_coins.map(c=>c._address)
		    let index = underlying_addresses.indexOf(address);
		    let yaddress = Object.values(this.ADDRESSES)[index];
		    let mints;
		    if(type == 'deposit') {
		        mints = await currentContract.web3.eth.getPastLogs({
		            fromBlock: fromBlock,
		            toBlock: toBlock,
		            address: address,
		            //web3provider.utils.sha3('Transfer(address,address,uint256)')
		            topics: [
		                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
		                [],
		                '0x000000000000000000000000' + yaddress.substr(2).toLowerCase()
		            ],
		        });
		    }
		    else {
		        mints = await currentContract.web3.eth.getPastLogs({
		            fromBlock: fromBlock,
		            toBlock: toBlock,
		            address: yaddress,
		            //web3provider.utils.sha3('Transfer(address,address,uint256)')
		            topics: [
		                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
		                '0x0000000000000000000000000000000000000000000000000000000000000000'
		            ],
		        });
		    }
		    //log.data is yDAI, yUSDC, yUSDT, yTUSD
		    console.log(mints)
		    if(mints.length) {
		        let mint = mints[0]
		        if(direction == -1) mint = mints[mints.length-1]
		        console.log(mint)
		        let tr = await currentContract.web3.eth.getTransactionReceipt(mint.transactionHash)
		        if(type=='deposit') {
		            tr = tr.logs.filter(log=>log.address == yaddress && log.topics[1] == '0x0000000000000000000000000000000000000000000000000000000000000000')
		        }
		        else {
		            tr = tr.logs.filter(log=>{
		                return log.address == address && log.topics[0] == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' && log.topics[2] == '0x000000000000000000000000' + yaddress.substr(2).toLowerCase()
		            })
		        }
		        if(!tr.length) return false;
		        var sent = tr[0]

		        console.log(mint, "MINTED", sent, "SENT")

		        var exchangeRate = mint.data/sent.data
		        if(type == 'withdrawal') exchangeRate = sent.data/mint.data;
		        console.log(exchangeRate)
		        return {blockNumber: mint.blockNumber, exchangeRate: exchangeRate};
		    }
		    return false;
		},

/*		async calculateAmount(cTokens, block, type) {
		    let amount = 0;
		    for(let i = 0; i < currentContract.N_COINS; i++) {
	            let tokens = cTokens[i];
		        if(tokens == 0) continue;
		        console.log(i)
		        let usd = await this.getExchangeRate(block, currentContract.underlying_coins[i]._address, '', type)
		        if(i == 0 || i == 3) tokens /= 1e16
		        else tokens /= 1e4
		        console.log(tokens, "TOKENS", usd, "EXCHANGE RATE", tokens * usd, "USD")
		        amount += tokens * usd;
 
		    }
		    return amount;
		},*/
	}
}