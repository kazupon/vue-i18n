import Vue from "vue";
import * as BN from 'bignumber.js'
import allabis, { ERC20_abi, cERC20_abi, yERC20_abi, synthERC20_abi, synthetixExchanger_address, synthetixExchanger_ABI,
	multicall_abi, multicall_address, CHI_address } from './allabis'
import web3Init from './init'
import { chunkArr } from './utils/helpers'
import * as common from './utils/common.js'

var N_COINS = 2;
var coin_precisions = [1e18, 1e6];
var old_swap_address = '0x2e60CF74d81ac34eB21eEff58Db4D385920ef419';
var swap_address = '0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56';
var token_address = '0x845838DF265Dcd2c412A1Dc9e959c7d08537f8a2';
var old_token_address = '0x3740fb63ab7a09891d7c0d4299442A551D06F5fD';

export const LENDING_PRECISION = 1e18;
export const PRECISION = 1e18;

var migration_address = '0x54Ee22d5593FC76fB20EafAb66C45aAb3268B800';
export const infura_url = 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b';

const currencies = {
	compound: {
		dai: 'cDAI',
		usdc: 'cUSDC'
	},
	usdt: {
		dai: 'cDAI',
		usdc: 'cUSDC',
		usdt: 'USDT'
	},
	iearn: {
		dai: 'yDAI',
		usdc: 'yUSDC',
		usdt: 'yUSDT',
		tusd: 'yTUSD'
	},
	busd: {
		dai: 'yDAI',
		usdc: 'yUSDC',
		usdt: 'yUSDT',
		busd: 'ybUSD'
	},
	susd: {
		susd: 'ySUSD',
		ycurve: 'yCurve',
	},
	susdv2: {
		dai: 'DAI',
		usdc: 'USDC',
		usdt: 'USDT',
		susd: 'sUSD',
	},
	pax: {
		dai: 'ycDAI',
		usdc: 'ycUSDC',
		usdt: 'ycUSDT',
		pax: 'PAX',
	},
	tbtc: {
		tbtc: 'TBTC',
		wbtc: 'wBTC',
		hbtc: 'hBTC',
	},
	ren: {
		renbtc: 'renBTC',
		wbtc: 'wBTC',
	},
	sbtc: {
		renbtc: 'renBTC',
		wbtc: 'wBTC',
		sbtc: 'sBTC',
	},
}

export const allCurrencies = currencies

export const poolMenu = {
	compound: 'Compound',
	usdt: 'USDT',
	iearn: 'Y',
	busd: 'bUSD',
	susd: 'sUSD-yCurve old',
	susdv2: 'sUSD',
	pax: 'PAX',
	tbtc: 'TBTC',
	ren: 'renBTC',
	sbtc: 'sBTC',
}

export const gas = {
	swap: {
		compound: {
			exchange: (i, j) => 600000,
			exchange_underlying: (i, j) => 1200000
		},
		usdt: {
			exchange: (i, j) => 600000,
			exchange_underlying: (i, j) => 1200000
		},
		iearn: {
			exchange: (i, j) => 800000,
			exchange_underlying: (i, j) => 1600000
		},
		busd: {
			exchange: (i, j) => 800000,
			exchange_underlying: (i, j) => 1600000
		},
		susd: {
			exchange: (i, j) => 600000,
			exchange_underlying: (i, j) => 1200000,
		},
		susdv2: {
			exchange: (i, j) => (i == 3 || j == 3) ? 1000000 : 300000,
			exchange_underlying: (i, j) => (i == 3 || j == 3) ? 1000000 : 300000,
		},
		pax: {
			exchange: (i, j) => 800000,
			exchange_underlying: (i, j) => 1600000
		},
		tbtc: {
			exchange: (i, j) => 300000,
			exchange_underlying: (i, j) => 300000,
		},
		ren: {
			exchange: (i, j) => 300000,
			exchange_underlying: (i, j) => 300000,
		},
		sbtc: {
			exchange: (i, j) => (i == 2 || j == 2) ? 1000000 : 300000,
			exchange_underlying: (i, j) => (i == 2 || j == 2) ? 1000000 : 300000,
		},
	},
	deposit: {
		compound: 1300000,
		usdt: 1300000,
		iearn: 1300000,
		busd: 1300000,
		susd: 1300000,
		susdv2: 600000,
		pax: 1300000,
		tbtc: 300000 * 1.5,
		ren: 300000,
		sbtc: 600000,
	},
	withdraw: {
		compound: {
			imbalance: x => 1500000,
		},
		usdt: {
			imbalance: x => 1500000,
		},
		iearn: {
			imbalance: x => (12642*x + 474068)*2.5 | 0,
		},
		busd: {
			imbalance: x => (12642*x + 474068)*2.5 | 0,
		},
		susd: {
			imbalance: x => 1000000,
		},
		susdv2: {
			imbalance: x => 600000,
		},
		pax: {
			imbalance: x => (12642*x + 474068)*2.5 | 0,
		},
		tbtc: {
			imbalance: x => 600000,
		},
		ren: {
			imbalance: x => 600000,
		},
		sbtc: {
			imbalance: x => 800000,
		},
	},
	depositzap: {
		compound: {
			deposit: x => (172664*x + 471691)*2.5 | 0,
			withdraw: 2000000 / 1.5,
			withdrawShare: 1000000,
			withdrawImbalance: x => (181733*x + 506125)*1.5 | 0,
		},
		usdt: {
			//use periodic fit here?
			deposit: x => (93795.5*x + 608935)*1.5 | 0,
			withdraw: 2000000 / 1.5,
			withdrawShare: 1000000,
			withdrawImbalance: x => (97226.5*x + 671880)*1.5 | 0,
		},
		iearn: {
			deposit: x => (225377*x + 522674)*2 | 0,
			withdraw: 3500000 / 1.4,
			withdrawShare: 3000000,
			withdrawImbalance: x => (276069*x + 516861)*2.5 | 0,
		},
		busd: {
			deposit: x => (225377*x + 522674)*2 | 0,
			withdraw: 3500000 / 1.4,
			withdrawShare: 3000000,
			withdrawImbalance: x => (276069*x + 516861)*2.5 | 0,
		},
		susdv2: {
			deposit: x => (172664*x + 471691)*1.5 | 0,
			withdraw: 800000,
			withdrawShare: 1000000,
			withdrawImbalance: x => (181733*x + 506125)*2.5 | 0,
		},
		pax: {
			deposit: x => (225377*x + 522674)*2 | 0,
			withdraw: 3500000 / 1.4,
			withdrawShare: 3000000,
			withdrawImbalance: x => (276069*x + 516861)*2.5 | 0,
		},
		//no deposit zap
		tbtc: {
			deposit: x => 300000 * 1.5,
			withdraw: 250000 * 1.5,
			withdrawShare: 250000 * 1.5,
			withdrawImbalance: x => 600000,
		},
		//no deposit zap
		ren: {
			deposit: x => 300000,
			withdraw: 250000,
			withdrawShare: 250000,
			withdrawImbalance: x => 600000,
		},
		//no deposit zap
		sbtc: {
			deposit: x => 600000,
			withdraw: 350000,
			withdrawShare: 350000,
			withdrawImbalance: x => 800000,
		},
	},
	adapter: {
		ren: {
			mintThenSwap: 600001,
			mintThenDeposit: 1100001,
			swapThenBurn: 600001,
			removeLiquidityThenBurn: 400001,
			removeLiquidityImbalanceThenBurn: 600001,
			removeLiquidityOneCoinThenBurn: 400001,
		},
		sbtc: {
			mintThenSwap: 1100001,
			mintThenDeposit: 1100001,
			swapThenBurn: 1100001,
			removeLiquidityThenBurn: 1100001,
			removeLiquidityImbalanceThenBurn: 1100001,
			removeLiquidityOneCoinThenBurn: 1100001,
		},
	}
}

let initState = () => ({
	deposit_zap: null,
	balances: [],
	wallet_balances: [],
	underlying_coins: [],
	c_rates: [],
	bal_info: [],
	total: 0,
	l_info: [],
	totalShare: 0,
	showShares: false,
	totalSupply: 0,
	totalBalance: 0,
	usdShare: null,
	swapbtc: false,
})

const state = Vue.observable({
	web3: null,
	multicall: null,
	walletName: null,
	allInitContracts: new Set(),
	contracts: {
		compound: {
			currentContract: 'compound',
			...initState(),
		},
		usdt: {
			currentContract: 'usdt',
			...initState(),
		},
		iearn: {
			currentContract: 'iearn',
			aRewards: null,
			...initState(),
		},
		busd: {
			currentContract: 'busd',
			...initState(),
		},
		susdv2: {
			currentContract: 'susdv2',
			...initState(),
			initial_A: null,
			initial_A_time: null,
			future_A_time: null,
			usdStake: null,
			curveRewards: null,
			snxExchanger: null,
		},
		pax: {
			currentContract: 'pax',
			...initState(),
		},
		tbtc: {
			currentContract: 'tbtc',
			...initState(),
		},
		ren: {
			currentContract: 'ren',
			adapterContract: null,
			...initState(),
		},
		sbtc: {
			currentContract: 'sbtc',

			...initState(),
		},
	},
	swapbtc: false,
	adapterContract: null,
	currentContract: 'compound',
	currencies: currencies.compound,
	N_COINS: N_COINS,
	coin_precisions: coin_precisions,
	wrapped_precisions: [],
	swap_address: swap_address,
	old_swap_address: old_swap_address,
	token_address: token_address,
	old_token_address: old_token_address,
	migration_address: migration_address,
	infura_url: infura_url,

	coins: new Array(N_COINS),
	underlying_coins: new Array(N_COINS),
	swap: null,
	old_swap: null,
	swap_token: null,
	old_swap_token: null,

	totalBalance: null,
	totalSupply: null,
	oldBalance: null,

	ERC20Contract: null,
	balances: new Array(N_COINS),
	wallet_balances: new Array(N_COINS),
	fee: 0,
	admin_fee: 0,
	trade_timeout: 1800,
	max_allowance: BN(2).pow(BN(256)).minus(BN(1)),
	coins: [],
	underlying_coins: [],
	c_rates: [],
	bal_info: [],
	total: 0,
	l_info: [],
	totalShare: 0,
	showShares: false,

	staked_info: [],
	totalStake: -1,

	virtual_price: null,
	A: null,
	initial_A: null,
	initial_A_time: null,
	future_A: null,
	future_A_time: null,
	admin_actions_deadline: null,

	slippage: 0,
	showSlippage: false,
	showNoBalance: false,
	showNoBalanceCoin: '',

	initializedContracts: false,

	default_account: '',

	error: false,
	curveRewards: null,
	curveStakedBalance: null,

	usdShare: null,
	usdStake: null,

	curveRewards: null,
	snxExchanger: null,

	chi: null,

	aRewards: null,

})

export let contract = state

export const getters = {
	default_account: () => state.default_account || '0x0000000000000000000000000000000000000000',
	walletName: () => state.walletName,
	currentPool: () => state.currentContract,
	oldBalance: () => state.oldBalance,
	bal_info: () => state.bal_info,
	balTotal: () => state.total,
	l_info: () => state.l_info,
	totalShare: () => state.totalShare,
	totalShare: () => state.totalShare,
	totalBalance: () => state.totalBalance / 1e18,
	totalSupply: () => state.totalSupply / 1e18,
	currencies: () => state.currencies,
	fee: () => state.fee * 100,
	admin_fee: () => state.admin_fee * 100,
	A: () => state.A,
	initial_A: () => state.initial_A,
	initial_A_time: () => state.initial_A_time,
	future_A: () => state.future_A,
	future_A_time: () => state.future_A_time,
	admin_actions_deadline: () => state.admin_actions_deadline, 
	initializedContracts: () => state.initializedContracts,
	showSlippage: () => state.showSlippage,
	slippage: () => state.slippage,
	N_COINS: () => state.N_COINS,
	error: () => state.error,
	showShares: () => state.showShares,

	staked_info: () => state.staked_info,
	totalStake: () => state.totalStake,

	usdShare: () => state.usdShare,
	usdStake: () => state.usdStake,
}


export async function init(contract, refresh = false) {
	state.multicall = state.multicall || new web3.eth.Contract(multicall_abi, multicall_address)
	console.time('init')
	//contract = contracts.compound for example
	if(state.initializedContracts && contract.currentContract == state.currentContract && !refresh) return Promise.resolve();
	if(contract && (contract.currentContract == state.currentContract || state.contracts[contract.currentContract].initializedContracts) && !refresh) return Promise.resolve();
	if(!contract) contract = state
	try {
        let networkId = await state.web3.eth.net.getId();
        if(networkId != 1) {
            this.error = 'Error: wrong network type. Please switch to mainnet';
        }
    }
    catch(err) {
        console.error(err);
        this.error = 'There was an error connecting. Please refresh page';
    }

	if(['ren', 'sbtc'].includes(contract.currentContract))
		state.chi = state.chi || new web3.eth.Contract(ERC20_abi, CHI_address)

    let calls  = [
    	//get_virtual_price
    	[allabis[contract.currentContract].swap_address, '0xbb7b8b80'],
    	//A
    	[allabis[contract.currentContract].swap_address, '0xf446c1d0'],
    	//future_A
        [allabis[contract.currentContract].swap_address, '0xb4b577ad'],
        //admin_actions_deadline
        [allabis[contract.currentContract].swap_address, '0x405e28f8'],
    ];
    
    if(contract.currentContract == 'compound') {
	    state.old_swap = new state.web3.eth.Contract(allabis.compound.old_swap_abi, old_swap_address);
	    state.old_swap_token = new state.web3.eth.Contract(ERC20_abi, old_token_address);
    	calls.push([state.old_swap_token._address, state.old_swap_token.methods.balanceOf(state.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
    }
    if(['ren', 'sbtc'].includes(contract.currentContract)) {
    	state.adapterContract = new state.web3.eth.Contract(allabis[contract.currentContract].adapterABI, allabis[contract.currentContract].adapterBiconomyAddress)
    }
    if(contract.currentContract == 'susdv2') {
    	//balanceOf(address)
    	let default_account = state.default_account || '0x0000000000000000000000000000000000000000'
    	calls.push([allabis.susd.token_address, '0x70a08231000000000000000000000000'+default_account.slice(2)])

		contract.curveRewards = new state.web3.eth.Contract(allabis.susdv2.sCurveRewards_abi, allabis.susdv2.sCurveRewards_address)
		calls.push([contract.curveRewards._address, contract.curveRewards.methods.balanceOf(state.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
    	
    	contract.snxExchanger = new state.web3.eth.Contract(synthetixExchanger_ABI, synthetixExchanger_address)
    }
    if(contract.currentContract == 'sbtc') {

    	contract.curveRewards = new state.web3.eth.Contract(allabis.sbtc.sCurveRewards_abi, allabis.sbtc.sCurveRewards_address)
		calls.push([contract.curveRewards._address, contract.curveRewards.methods.balanceOf(state.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])

    	contract.snxExchanger = new state.web3.eth.Contract(synthetixExchanger_ABI, synthetixExchanger_address)
    }
    if(['iearn','y'].includes(contract.currentContract)) {
    	contract.aRewards = new state.web3.eth.Contract(allabis.iearn.aRewards_abi, allabis.iearn.aRewards_address)
    	contract.curveRewards = new state.web3.eth.Contract(allabis.iearn.sCurveRewards_abi, allabis.iearn.sCurveRewards_address)
		calls.push([contract.curveRewards._address, contract.curveRewards.methods.balanceOf(state.default_account || '0x0000000000000000000000000000000000000000').encodeABI()])
    }
    if(['tbtc', 'ren', 'sbtc'].includes(contract.currentContract)) {
    	//initial_A
    	calls.push([allabis[contract.currentContract].swap_address, '0x5409491a'])
    	//initial_A_time
    	calls.push([allabis[contract.currentContract].swap_address, '0x2081066c'])
    	//future_A_time
    	calls.push([allabis[contract.currentContract].swap_address, '0x14052288'])
    }
    if(!['susd', 'tbtc', 'ren', 'sbtc'].includes(contract.currentContract))
    	state.deposit_zap = new state.web3.eth.Contract(allabis[state.currentContract].deposit_abi, allabis[state.currentContract].deposit_address)
    contract.swap = new state.web3.eth.Contract(allabis[contract.currentContract].swap_abi, allabis[contract.currentContract].swap_address);
    contract.swap_token = new state.web3.eth.Contract(ERC20_abi, allabis[contract.currentContract].token_address);
    window[contract.currentContract] = {};
    window[contract.currentContract].swap = contract.swap
    window[contract.currentContract].swap_token = contract.swap_token
    window[contract.currentContract].deposit_zap = contract.deposit_zap
    window[contract.currentContract].rewards = contract.curveRewards
    window[contract.currentContract].aRewards = contract.aRewards
    contract.coins = []
    contract.underlying_coins = []
    if(window.location.href.includes('withdraw_old')) 
      calls.push(...(await common.update_fee_info('old', contract, false)))
  	else 
      calls.push(...(await common.update_fee_info('new', contract, false)));
    for (let i = 0; i < allabis[contract.currentContract].N_COINS; i++) {
	  	let coinsCall = contract.swap.methods.coins(i).encodeABI()
	  	let underlyingCoinsCall = ['tbtc', 'ren', 'sbtc'].includes(contract.currentContract) ?
	  								contract.swap.methods.coins(i).encodeABI()
	  								: contract.swap.methods.underlying_coins(i).encodeABI();
    	calls.push([contract.swap._address, coinsCall])
    	calls.push([contract.swap._address, underlyingCoinsCall])
    }
    await common.multiInitState(calls, contract, true)
  	contract.initializedContracts = true;
  	console.timeEnd('init')
  	state.allInitContracts = new Set(state.allInitContracts.add(contract.currentContract))
  	console.log([...state.allInitContracts])
}

export const allState = Vue.observable({
	swap: {},
	underlying_coins: {},
})

export async function getAllUnderlying() {
	for([key, contract] of Object.entries(allabis)) {
		if(key == 'susd') continue;
		allState.swap[key] = new state.web3.eth.Contract(contract.swap_abi, contract.swap_address);
        allState.underlying_coins[key] = [];
		for(let i = 0; i < contract.N_COINS; i++) {
			var addr = await allState.swap[key].methods.coins(i).call();
	        var underlying_addr = await allState.swap[key].swap.methods.underlying_coins(i).call();
	        allState.underlying_coins[key][i] = new state.web3.eth.Contract(ERC20_abi, underlying_addr);
		}
	}
}

export async function changeContract(pool) {
	//re-init contract with different pool
	if(!(pool in allabis)) return;
	state.initializedContracts = false;
	state.currentContract = pool;
	state.currencies = currencies[pool]
	state.N_COINS = allabis[pool].N_COINS;
	state.coin_precisions = allabis[pool].coin_precisions;
	state.wrapped_precisions = allabis[pool].wrapped_precisions;
	state.swap_address = allabis[pool].swap_address;
	state.old_swap_address = allabis[pool].old_swap_address;
	state.token_address = allabis[pool].token_address;
	state.old_token_address = allabis[pool].old_token_address;
	state.migration_address = allabis[pool].migration_address;
	state.coins = new Array(allabis[pool].coins);
	state.underlying_coins = new Array(allabis[pool].underlying_coins);
	state.balances = new Array(allabis[pool].balances);
	state.wallet_balances = new Array(allabis[pool].wallet_balances);
	state.bal_info = []
	state.l_info = []
	state.total = 0
	state.totalShare = 0
	await web3Init();
}

export function setCurrencies(pool) {
	contract.currencies = currencies[pool]
}

export async function initusdt() {
	await init(state.contracts.usdt)
}
