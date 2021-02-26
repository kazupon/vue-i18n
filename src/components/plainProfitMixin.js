import * as common from '../utils/common.js'
import { getters, contract as currentContract } from '../contract'
import allabis, { balancer_ABI, balancer_address } from '../allabis'

import BigNumber from 'bignumber.js'

export default {
	data: () => ({
		addliquidityTopic: '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
		removeliquidityTopic: '0xb964b72f73f5ef5bf0fdc559b2fab9a7b12a39e47817a547f1f0aee47febd602',
		removeliquidityImbalanceTopic: '0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
		removeliquidityOneTopic: '0x9e96dd3b997a2a257eec4df9bb6eaf626e206df5f543bd963682d143300be310',
		earnedSNX: null,
		earnedREN: null,
		paidRewardsSNX: null,
		paidRewardsREN: null,
		profitTotalStake: null,
		weeklyEstimateSNX: null,
		weeklyEstimateREN: null,
		weeklyEstimateBPT: null,
		snxPrice: null,
		renPrice: null,
		BPTPrice: null,
		btcPrices: [],
	}),

	async mounted() {
		if(this.account && currentContract.multicall) this.getPrices()
	},

	async created() {
		this.$watch(() => this.account && currentContract.multicall, val => val && this.getPrices())
	},

	computed: {
		totalShare() {
			return getters.totalShare();
		},

		showEarnedSNX() {
			if(this.showinUSD == 1) return (+this.earnedSNX * this.snxPrice).toFixed(2)
			return (+this.earnedSNX).toFixed(2)
		},

		showEarnedSNXUSD() {
			return (+this.earnedSNX * this.snxPrice).toFixed(2)
		},

		showEarnedREN() {
			if(this.showinUSD == 1) return (+this.earnedREN * this.renPrice).toFixed(2)
			return (+this.earnedREN).toFixed(2)
		},

		showEarnedRENUSD() {
			return (+this.earnedREN * this.renPrice).toFixed(2)
		},

		showRewardsSNX() {
			if(this.showinUSD == 1) return (+this.paidRewardsSNX * this.snxPrice).toFixed(3)
			return (+this.paidRewardsSNX).toFixed(2)
		},

		showRewardsSNXUSD() {
			return (+this.paidRewardsSNX * this.snxPrice).toFixed(3)
		},

		showRewardsREN() {
			if(this.showinUSD == 1) return (+this.paidRewardsREN * this.renPrice).toFixed(3)
			return (+this.paidRewardsREN).toFixed(2)
		},

		showRewardsRENUSD() {
			return (+this.paidRewardsREN * this.renPrice).toFixed(3)
		},

		showWeeklySNX() {
			if(this.showinUSD == 1) return (+this.weeklyEstimateSNX * this.snxPrice).toFixed(3)
			return (+this.weeklyEstimateSNX).toFixed(2)
		},

		showWeeklyREN() {
			if(this.showinUSD == 1) return (+this.weeklyEstimateREN * this.snxPrice).toFixed(3)
			return (+this.weeklyEstimateREN).toFixed(2)
		},

		showWeeklyBPT() {
			if(this.showinUSD == 1) return (+this.weeklyEstimateBPT * this.BPTPrice).toFixed(2)
			return (+this.weeklyEstimateBPT).toFixed(4)
		},
	},

	methods: {

		async getPrices() {
			if(['susdv2', 'sbtc'].includes(currentContract.currentContract)) this.getSNXRewards()
			if(['tbtc', 'ren', 'sbtc'].includes(currentContract.currentContract)) this.getBTCPrice()
		},

		async getBTCPrice() {
			let req = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
        	let res = await req.json();
        	this.btcPrice = res.bitcoin.usd
		},

		async getSNXRewards() {
			let requests = await Promise.all([
				fetch('https://api.coingecko.com/api/v3/simple/price?ids=havven,republic-protocol&vs_currencies=usd'),
			])
			let prices = await Promise.all(requests.map(request => request.json()));
			this.snxPrice = prices[0].havven.usd;
			this.renPrice = prices[0]['republic-protocol'].usd

			let curveRewards = currentContract.curveRewards
			let calls = [
				[curveRewards._address, curveRewards.methods.earned(this.account).encodeABI()],
				[curveRewards._address, curveRewards.methods.balanceOf(this.account).encodeABI()],
				[curveRewards._address, curveRewards.methods.userRewardPerTokenPaid(this.account).encodeABI()],
				[curveRewards._address, curveRewards.methods.totalSupply().encodeABI()],
			]
			if(currentContract.currentContract == 'sbtc') {
                let balancerPool = new currentContract.web3.eth.Contract(balancer_ABI, balancer_address)
				calls.push(
					[balancerPool._address, balancerPool.methods.totalSupply().encodeABI()],
                    [balancerPool._address, balancerPool.methods.getBalance('0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f').encodeABI()],
                    [balancerPool._address, balancerPool.methods.getBalance('0x408e41876cccdc0f92210600ef50372656052a38').encodeABI()],
                )
			}
			calls.push([curveRewards._address, curveRewards.methods.DURATION().encodeABI()],
					[curveRewards._address, curveRewards.methods.rewardRate().encodeABI()],
					[curveRewards._address, curveRewards.methods.periodFinish().encodeABI()],
			)
			let aggcalls = await currentContract.multicall.methods.aggregate(calls).call()
			let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
			let now = Date.now() / 1000
			let periodFinish = decoded[decoded.length-1]
			if(currentContract.currentContract == 'susdv2') {
				this.earnedSNX = +decoded[0] / 1e18
				let rewardLogs = await currentContract.web3.eth.getPastLogs({
					fromBlock: '0x975bfa',
					//old fromBlock: '0x932641',
					toBlock: 'latest',
					//SNX CurveRewards
					address: '0xdcb6a51ea3ca5d3fd898fd6564757c7aaec3ca92',
					//old address: '0x13B54E8271B3e45cE71D8f4fC73eA936873a34fC',
					topics: [
						//sha3('RewardPaid(address,uint256)')
						'0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
						'0x000000000000000000000000' + this.account.slice(2),
						//'0x000000000000000000000000f3ae3bbdeb2fb7f9c32fbb1f4fbdaf1150a1c5ce',
					]
				})
				let rewards = rewardLogs.map(log=>currentContract.web3.eth.abi.decodeParameter('uint256', log.data) / 1e18).reduce((a, b) => a + b, 0)
				this.paidRewardsSNX = rewards
				let len = decoded.length
				this.weeklyEstimateSNX = (decoded[len-3] * decoded[len-2] / 1e18) * currentContract.curveStakedBalance  / decoded[3]
			}
			if(currentContract.currentContract == 'sbtc') {
				this.earnedSNX = decoded[0] * decoded[5] / decoded[4] / 1e18
				this.earnedREN = decoded[0] * decoded[6] / decoded[4] / 1e18
				let SNXBPT = decoded[5] / decoded[4]
				let RENBPT = decoded[6] / decoded[4]
				this.BPTPrice = (decoded[5] / decoded[4]) * this.snxPrice + (decoded[6] / decoded[4]) * this.renPrice
				this.weeklyEstimateBPT = 10 / decoded[3] * (currentContract.curveStakedBalance)

				let rewardLogs = await currentContract.web3.eth.getPastLogs({
					fromBlock: '0x9d010d',
					//old fromBlock: '0x932641',
					toBlock: 'latest',
					//SNX CurveRewards
					address: '0x13c1542a468319688b89e323fe9a3be3a90ebb27',
					//old address: '0x13B54E8271B3e45cE71D8f4fC73eA936873a34fC',
					topics: [
						//sha3('RewardPaid(address,uint256)')
						'0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
						'0x000000000000000000000000' + this.account.slice(2),
						//'0x000000000000000000000000f3ae3bbdeb2fb7f9c32fbb1f4fbdaf1150a1c5ce',
					]
				})
				let rewards = rewardLogs.map(log=>currentContract.web3.eth.abi.decodeParameter('uint256', log.data) / 1e18).reduce((a, b) => a + b, 0)
				
				this.paidRewardsSNX = rewards * decoded[4] / decoded[3]
				this.paidRewardsREN = rewards * decoded[5] / decoded[3]
			}
			if(+periodFinish < now) {
				this.weeklyEstimateSNX = 0
				this.weeklyEstimateBPT = 0
			}
			this.profitTotalStake = +decoded[1] / 1e18
		},

		async getExchangeRate() {
			return 1;
		},

	    async checkExchangeRateBlocks(block, address, direction, type = 'deposit') {
		    return 1;
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