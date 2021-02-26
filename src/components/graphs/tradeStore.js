import Vue from 'vue'
import { contract, LENDING_PRECISION, PRECISION, changeContract, init } from '../../contract'
import Decimal from 'break_infinity.js'
import abis from '../../allabis'

let BN = val => new Decimal(val)

let state = Vue.observable({
  	pairIdx: '0-1',
  	pairVal: 'dai-usdc',
  	pool: 'compound',
  	allPools: ['compound', 'usdt', 'y', 'busd', 'susdv2', 'pax', 'tbtc', 'ren', 'sbtc'],
  	pools: ['compound', 'usdt', 'y', 'busd', 'susdv2', 'pax'],
  	interval: '30m',
	intervals: ['1m', '5m', '10m', '15m', '30m', '1h', '2h', '4h', '6h', '1d', '3d', '1w'],
  	data: [],
  	poolInfo: [],
})


export const getters = {
	poolConfigs: () => {
		return state.pools.map(pool => {
			return {
				N_COINS: abis[pool].N_COINS,
				PRECISION_MUL: abis[pool].coin_precisions.map(p=>1e18/p),
				USE_LENDING: abis[pool].USE_LENDING,
				LENDING_PRECISION,
				PRECISION,
			}
		})
	}
}

export async function updatePoolInfo() {
	state.poolInfo = []
	let calls = []
	for(let [key, pool] of state.pools.entries()) {
		if(pool == 'y') pool = 'iearn'
		let cont = contract.contracts[pool]
		if(pool == contract.currentContract) cont = contract
		calls.push(
			//A()
			[abis[pool].swap_address, '0xf446c1d0'],
			//totalSupply()
			[abis[pool].token_address, '0x18160ddd'],
			//get_virtual_price()
			[abis[pool].swap_address, '0xbb7b8b80']
		)
	}
	let aggcalls = await contract.multicall.methods.aggregate(calls).call()
	let decoded = aggcalls[1].map(hex => contract.web3.eth.abi.decodeParameter('uint256', hex))
	for(let [key, pool] of state.pools.entries()) {
		if(pool == 'y') pool = 'iearn'
		let cont = contract.contracts[pool]
		if(pool == contract.currentContract) cont = contract
		if(state.poolInfo[key] && state.poolInfo[key].timestamp) continue;
		state.poolInfo[key] = {}
		state.poolInfo[key].A = decoded[key*3];
		state.poolInfo[key].fee = cont.fee * 1e10
		state.poolInfo[key].admin_fee = cont.admin_fee * 1e10
		state.poolInfo[key].supply = decoded[key*3+1]
		state.poolInfo[key].virtual_price = decoded[key*3+2]
		state.poolInfo[key].balances = cont.balances;
		state.poolInfo[key].rates = cont.c_rates.map((r,i)=>+(BN(r).times(PRECISION).times(abis[pool].coin_precisions[i])))
		state.poolInfo[key].timestamp = (Date.now() / 1000) | 0;
	}
}



export default state