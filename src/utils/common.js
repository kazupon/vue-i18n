import Vue from "vue";
import BigNumber from 'bignumber.js'
window.BN = BigNumber
import { contract as currentContract, infura_url } from '../contract.js'
import { chunkArr } from './helpers'
import allabis, { multicall_address, multicall_abi, ERC20_abi, cERC20_abi, yERC20_abi, synthERC20_abi } from '../allabis'
import * as gasPriceStore from '../components/common/gasPriceStore'
import Web3 from "web3";

import * as errorStore from '../components/common/errorStore'
import { notify, notifyHandler } from '../init'

var cBN = (val) => new BigNumber(val);

let requiresResetAllowance = ['0xdAC17F958D2ee523a2206206994597C13D831ec7', '0xC25a3A3b969415c80451098fa907EC722572917F', '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3', '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8']

export function approve(contract, amount, account, toContract) {
    if(!toContract) toContract = currentContract.swap_address
    return new Promise((resolve, reject) => {
                contract.methods.approve(toContract, cBN(amount).toFixed(0,1))
                .send({
                    from: account, 
                    gasPrice: gasPriceStore.state.gasPriceWei,
                    gas: 100000,
                })
                .once('transactionHash', function(hash) {
                    notifyHandler(hash)
                    resolve(true)
                })
                .on('error', err => {
                    errorStore.handleError(err)
                    reject(err)
                })
                .catch(err => {
                    errorStore.handleError(err)
                    reject(err)
                });
            });
}


export function approve_to_migrate(amount, account) {
    return new Promise(resolve => {
                currentContract.old_swap_token.methods.approve(currentContract.migration_address, amount)
                .send({
                    from: account, 
                    gasPrice: gasPriceStore.state.gasPriceWei,
                    gas: 100000,
                })
                .once('transactionHash', function(hash) {
                    notifyHandler(hash)
                    resolve(true);
                })
                .catch(err => {
                    errorStore.handleError(err)
                    reject(err)
                });
            });
}

export async function ensure_allowance_zap_out(amount, fromContract, toContract, infinite = false) {
    var default_account = currentContract.default_account
    if(!fromContract) fromContract = currentContract.swap_token;
    if(!toContract) toContract = allabis[currentContract.currentContract].deposit_address
    let allowance = cBN(await currentContract.swap_token.methods.allowance(default_account, toContract).call())
    if(!infinite) {
        if(allowance.lt(cBN(amount))) {    
            if(allowance > 0) await approve(fromContract, 0, default_account, toContract)
            await approve(fromContract, amount, default_account, toContract)
        }
    }
    else {
        if(allowance.lt(currentContract.max_allowance.div(cBN(2))) && cBN(amount).gt(0)) {
            if(allowance > 0 && requiresResetAllowance.includes(fromContract._address))
                await approve(fromContract, 0, default_account, toContract)
            await approve(fromContract, currentContract.max_allowance, default_account, toContract)
        }
    }
}

export async function ensure_allowance(amounts, plain = false, contractName, N_COINS, infinite = false) {
    var default_account = currentContract.default_account
    let cont = currentContract
    if(N_COINS === undefined) {
        N_COINS = currentContract.N_COINS
    }
    if(contractName !== undefined) {
        cont = currentContract.contracts[contractName]
    }
    var allowances = new Array(N_COINS);
    let coins = currentContract.coins;
    let swap = cont.swap_address;
    if(plain) {
        coins = cont.underlying_coins;
        swap = allabis[cont.currentContract].deposit_address;
    }
    let fromContract = coins
    let calls = []
    for (let i=0; i < N_COINS; i++) {
        calls.push([coins[i]._address, coins[i].methods.allowance(default_account, swap).encodeABI()])
    }
    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call();
    allowances = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex));
    if (!infinite) {
        // Non-infinite
        for (let i=0; i < N_COINS; i++) {
            if (cBN(allowances[i]).isLessThan(cBN(amounts[i])) && cBN(amounts[i]).gt(0)) {
                if (allowances[i] > 0 && requiresResetAllowance.includes(coins[i]._address))
                    await approve(coins[i], 0, default_account, swap);
                await approve(coins[i], amounts[i], default_account, swap);
            }
        }
    }
    else {
        // Infinite
        for (let i=0; i < N_COINS; i++) {
            if (cBN(allowances[i]).isLessThan(cont.max_allowance.div(cBN(2))) && cBN(amounts[i]).gt(0)) {
                if (allowances[i] > 0 && requiresResetAllowance.includes(coins[i]._address))
                    await approve(coins[i], 0, default_account, swap);
                await approve(coins[i], cont.max_allowance, default_account, swap);
            }
        }
    }
}

export async function ensure_underlying_allowance(i, _amount, underlying_coins = [], toContract, wrapped = false, contract) {
    if(!contract) contract = currentContract
    if(!underlying_coins.length) underlying_coins = contract.underlying_coins;
    let coins = underlying_coins
    if(wrapped) coins = contract.coins
    var default_account = currentContract.default_account
    var amount = cBN(_amount);
    var current_allowance = cBN(await coins[i].methods.allowance(default_account, contract.swap._address).call());
    if (current_allowance.gte(amount))
        return false;
    if ((cBN(_amount).isEqualTo(currentContract.max_allowance)) & (current_allowance.isGreaterThan(currentContract.max_allowance.div(cBN(2)))))
        return false;  // It does get spent slowly, but that's ok
    if ((current_allowance.isGreaterThan(cBN(0))) & (current_allowance.isLessThan(amount)) && requiresResetAllowance.includes(coins[i]._address))
        await approve(coins[i], 0, default_account, toContract);
    return await approve(coins[i], cBN(amount).toFixed(0,1), default_account, toContract);
}

export async function approveAmount(contract, amount, account, toContract, infinite = false) {
    let current_allowance = cBN(await contract.methods.allowance(account, toContract).call())
    console.log(currentContract.max_allowance)
    console.log(current_allowance.toString(), amount.toString(), current_allowance.lt(amount))
    if(!infinite) {
        if(current_allowance.lt(amount) && amount.gt(0)) {
            if(current_allowance > 0 && requiresResetAllowance.includes(contract._address)) {
                await approve(contract, 0, account, toContract)
            }
            await approve(contract, amount, account, toContract)
        }
    }
    else {
        if(current_allowance.lt(currentContract.max_allowance.div(cBN(2))) && cBN(amount).gt(0)) {
            if(current_allowance > 0 && requiresResetAllowance.includes(contract._address))
                await approve(contract, 0, account, toContract)
            await approve(contract, currentContract.max_allowance, account, toContract)
        }
    }
}

// XXX not needed anymore
// Keeping for old withdraw, to be removed whenever the chance is
export async function ensure_token_allowance() {
    var default_account = currentContract.default_account
    if (parseInt(await currentContract.swap_token.methods.allowance(default_account, currentContract.swap_address).call()) == 0)
        return new Promise(resolve => {
            currentContract.swap_token.methods.approve(currentContract.swap_address, cBN(currentContract.max_allowance).toFixed(0))
            .send({from: default_account})
            .once('transactionHash', function(hash) {
                notifyHandler(hash)
                resolve(true);
            })
            .catch(err => {
                errorStore.handleError(err)
            });
        })
    else
        return false;
}

export function init_menu() {
    $("div.top-menu-bar a").toArray().forEach(function(el) {
        if (el.href == window.location.href)
            el.classList.add('selected')
    })
    $('.poolsdropdown .dropdown a').toArray().forEach(function(el) {
        if(el.href.slice(0,-1) == window.location.origin)
            el.classList.add('selected')
    })
}

export async function ensure_stake_allowance(amount, stakeContract, infinite = false) {
    var default_account = currentContract.default_account;
    if(!stakeContract) stakeContract = currentContract.curveRewards
    let allowance = cBN(await currentContract.swap_token.methods.allowance(default_account, stakeContract._address).call());
    if(!infinite) {
        if(allowance.lt(amount)) {
            if(allowance.gt(0))
                await approve(currentContract.swap_token, 0, default_account, stakeContract._address)
            await approve(currentContract.swap_token, amount, default_account, stakeContract._address)
        }
    }
    else {
        if(allowance.lt(currentContract.max_allowance.div(cBN(2))) && cBN(amount).gt(0)) {
            if(allowance > 0 && requiresResetAllowance.includes(currentContract.swap_token._address))
                await approve(currentContract.swap_token, 0, default_account, stakeContract._address)
            await approve(currentContract.swap_token, amount, default_account, stakeContract._address)
        }
    }
}


export function update_rates(version = 'new', contract) {
    if(!contract) contract = currentContract
    let calls = [];
    let callscoins = []
    for (let i = 0; i < allabis[contract.currentContract].N_COINS; i++) {
        let address = allabis[contract.currentContract].coins[i]
        /*
        rate: uint256 = cERC20(self.coins[i]).exchangeRateStored()
        supply_rate: uint256 = cERC20(self.coins[i]).supplyRatePerBlock()
        old_block: uint256 = cERC20(self.coins[i]).accrualBlockNumber()
        rate += rate * supply_rate * (block.number - old_block) / 10 ** 18
        */
        //for usdt pool
        if(checkTethered(contract, i)) {
            Vue.set(contract.c_rates, i, 1 / allabis[contract.currentContract].coin_precisions[i]);
        }
        else if(['iearn', 'busd', 'susd', 'pax'].includes(contract.currentContract)) {
            if(contract.currentContract == 'susd' && i == 1) {
                calls.push(['0xeDf54bC005bc2Df0Cc6A675596e843D28b16A966', '0xbb7b8b80'])
            }
            else
                //getPricePerFullShare
                calls.push([address, '0x77c7b8fc'])
            callscoins.push({pool: 'ys', i: i})
        }
        else {
            calls.push(
                //exchangeRateStored
                [address, '0x182df0f5'],
                //supplyRatePerBlock
                [address, '0xae9d70b0'],
                //accrualBlockNumber
                [address, '0x6c540baf'],
            )
            callscoins.push({pool: 'compounds', i: i})
        }
    }
    return calls;
}

export async function update_fee_info(version = 'new', contract, update = true) {
    console.time('updatefeeinfo')
    let web3 = currentContract.web3 || new Web3(infura_url)
    if(!contract) contract = currentContract
    var swap_abi_stats = allabis[contract.currentContract].swap_abi;
    var swap_address_stats = allabis[contract.currentContract].swap_address;
    var swap_token_stats = allabis[contract.currentContract].swap_token
    var swap_token_address = allabis[contract.currentContract].token_address
    var swap_stats = contract.swap;
    var swap_token_stats = contract.swap_token;
    if(version == 'old') {
        swap_abi_stats = allabis[contract.currentContract].old_swap_abi;
        swap_address_stats = allabis[contract.currentContract].old_swap_address;
        swap_stats = contract.old_swap;
        swap_token_stats = contract.old_swap_token;
        swap_token_address = allabis[contract.currentContract].token_address
    }

    var default_account = contract.default_account || '0x0000000000000000000000000000000000000000';
    let calls = [   
                    //.fee()
                    [swap_address_stats, swap_stats.methods.fee().encodeABI()],
                    //.admin_fee()
                    [swap_address_stats, swap_stats.methods.admin_fee().encodeABI()],
                    //balanceOf(default_account)
                    [swap_token_address, swap_token_stats.methods.balanceOf(default_account).encodeABI()],
                    //token_supply()
                    [swap_token_address, swap_token_stats.methods.totalSupply().encodeABI()],
                    ]
    let rates_calls = update_rates(version, contract);

    let swap = new web3.eth.Contract(swap_abi_stats, swap_address_stats);
    for (let i = 0; i < allabis[contract.currentContract].N_COINS; i++) {
        //swap.methods.balances(i)
        calls.push([swap_address_stats, swap.methods.balances(i).encodeABI()])
    }
    calls.push(...rates_calls)
    if(['susdv2','sbtc', 'iearn', 'y'].includes(contract.currentContract) && update)
        calls.push([allabis[contract.currentContract].sCurveRewards_address, contract.curveRewards.methods.balanceOf(default_account).encodeABI()])
    if(update)
        await multiInitState(calls, contract)
    return calls
    
    console.timeEnd('updatefeeinfo')
}

function checkTethered(contract, i) {
    return allabis[contract.currentContract].tethered && allabis[contract.currentContract].tethered[i] &&
        allabis[contract.currentContract].use_lending && !allabis[contract.currentContract].use_lending[i]
        || allabis[contract.currentContract].is_plain[i] || contract.currentContract == 'susdv2';
}

export async function multiInitState(calls, contract, initContracts = false) {
    let web3 = currentContract.web3 || new Web3(infura_url)
    let multicall = new web3.eth.Contract(multicall_abi, multicall_address)
    var default_account = currentContract.default_account;
    let aggcalls;
    try {
        aggcalls = await multicall.methods.aggregate(calls).call()
    }
    catch(err) {
        console.error(err)
        aggcalls = await multicall.methods.aggregate(calls.slice(1)).call()
        aggcalls[1] = [web3.eth.abi.encodeParameter('uint256', cBN(1e18).toFixed(0)), ...aggcalls[1]] 
    }
    var block = +aggcalls[0]
    //initContracts && contract.currentContract == 'compound' && i == 0 || 
    let decoded = aggcalls[1].map((hex, i) =>
        (i >= aggcalls[1].length-allabis[contract.currentContract].N_COINS*2) ? web3.eth.abi.decodeParameter('address', hex) : web3.eth.abi.decodeParameter('uint256', hex)
    )
    contract.oldBalance = 0
    if(initContracts) {
        contract.virtual_price = decoded[0] / 1e18;
        contract.A = decoded[1] / 1e18;
        contract.future_A = +decoded[2];
        contract.admin_actions_deadline = +decoded[3];
        decoded = decoded.slice(4);
    }
    if(initContracts && contract.currentContract == 'compound') {
        contract.oldBalance = decoded[0];
        decoded = decoded.slice(1);
    }
    if(initContracts && contract.currentContract == 'susdv2') {
        contract.oldBalance = decoded[0];
        contract.curveStakedBalance = decoded[1]
        decoded = decoded.slice(2);
    }
    if(initContracts && ['sbtc', 'iearn', 'y'].includes(contract.currentContract)) {
        contract.curveStakedBalance = decoded[0]
        decoded = decoded.slice(1);
    }
    if(initContracts && ['tbtc', 'ren', 'sbtc'].includes(contract.currentContract)) {
        contract.initial_A = +decoded[0];
        contract.initial_A_time = +decoded[1];
        contract.future_A_time = +decoded[2];
        decoded = decoded.slice(3)
    }
    contract.fee = decoded[0] / 1e10;
    contract.admin_fee = decoded[1] / 1e10;
    var token_balance = decoded[2]
    var token_supply = decoded[3]
    contract.totalBalance = token_balance
    contract.totalSupply = token_supply
    let ratesDecoded = decoded.slice(4+allabis[contract.currentContract].N_COINS)
    if(initContracts) {
        let contractsDecoded = decoded.slice(-allabis[contract.currentContract].N_COINS*2)
        chunkArr(contractsDecoded, 2).map((v, i) => {
            var addr = v[0];
            var underlying_addr = v[1];
            let coin_abi = cERC20_abi
            var underlying_addr = v[1];
            let underlying_abi = ERC20_abi
            if(contract.currentContract == 'susdv2' && i == 3 || contract.currentContract == 'sbtc' && i == 2) {
                coin_abi = synthERC20_abi
                underlying_abi = synthERC20_abi
            }
            if(['iearn', 'busd', 'susd', 'pax'].includes(contract.currentContract)) coin_abi = yERC20_abi
            contract.coins.push(new web3.eth.Contract(coin_abi, addr));
            contract.underlying_coins.push(new web3.eth.Contract(underlying_abi, underlying_addr));
        })
        window[contract.currentContract].coins = contract.coins
        window[contract.currentContract].underlying_coins = contract.underlying_coins
        ratesDecoded = decoded.slice(4+allabis[contract.currentContract].N_COINS, decoded.length-allabis[contract.currentContract].N_COINS*2)
    }


    if(['iearn', 'busd', 'susd', 'pax'].includes(contract.currentContract)) {
        ratesDecoded.map((v, i) => {
            if(checkTethered(contract, i)) {
                Vue.set(contract.c_rates, i, 1 / allabis[contract.currentContract].coin_precisions[i]);
            }
            else {
                let rate = v / 1e18 / allabis[contract.currentContract].coin_precisions[i]
                if(contract.currentContract == 'susd' && i == 1) rate =  v / 1e36
                Vue.set(contract.c_rates, i, rate)
            }
        })
    }
    else {
        chunkArr(ratesDecoded ,3).map((v, i) => {
            if(checkTethered(contract, i) || contract.currentContract == 'susdv2') {
                Vue.set(contract.c_rates, i, 1 / allabis[contract.currentContract].coin_precisions[i]);
            }
            else {            
                let rate = +v[0] / 1e18 / allabis[contract.currentContract].coin_precisions[i]
                let supply_rate = +v[1]
                let old_block = +v[2]
                Vue.set(contract.c_rates, i, rate * (1 + supply_rate * (block - old_block) / 1e18))
            }
        })
    }

    let balances = []
    currentContract.total = 0;

    let balancesDecoded = decoded.slice(4, 4+allabis[contract.currentContract].N_COINS)
    balancesDecoded.forEach((balance, i) => {
        Vue.set(contract.balances, i, +balance)
        balances[i] = +balance;
        Vue.set(contract.bal_info, i, balances[i] * contract.c_rates[i]);
        contract.total += balances[i] * contract.c_rates[i];
    })

    if(!initContracts && ['susdv2', 'sbtc', 'iearn', 'y'].includes(contract.currentContract))
        contract.curveStakedBalance = decoded[decoded.length-1]

    if (default_account) {
        if (token_balance > 0) {
            contract.totalShare = 0;
            for (let i=0; i < contract.N_COINS; i++) {
                var val = balances[i] * contract.c_rates[i] * token_balance / token_supply;
                contract.totalShare += val;
                Vue.set(contract.l_info, i, val)
            }
            contract.usdShare = token_balance * contract.virtual_price / 1e18;
            contract.showShares = true;
        }
        else {
            contract.totalShare = 0;
            contract.usdShare = 0
            contract.showShares = false;
            //no need to set other values as v-show check is done based on totalShare
        }

        contract.totalStake = 0;
        if(contract.curveStakedBalance > 0) {
            for (let i=0; i < contract.N_COINS; i++) {
                var val = balances[i] * contract.c_rates[i] * contract.curveStakedBalance / token_supply;
                Vue.set(contract.staked_info, i, val)
                contract.totalStake += val;
            }
            contract.usdStake = contract.curveStakedBalance * contract.virtual_price / 1e18;
        }
    }
}

export async function handle_migrate_new(page) {
    var default_account = currentContract.default_account
    let migration = new web3.eth.Contract(allabis.compound.migration_abi, currentContract.migration_address);
    let old_balance = await currentContract.old_swap_token.methods.balanceOf(default_account).call();
    var allowance = parseInt(await currentContract.old_swap_token.methods.allowance(default_account, currentContract.migration_address).call());
    if(allowance < old_balance) {
        if (allowance > 0)
            await approve_to_migrate(0, default_account);
        await approve_to_migrate(old_balance, default_account);
    }
    await migration.methods.migrate().send({
        from: default_account,
        gasPrice: gasPriceStore.state.gasPriceWei,
        gas: 1500000,
    })
    .once('transactionHash', hash => {
        notifyHandler(hash)
    })
    .catch(err => {
        errorStore.handleError(err)
    });

    await update_balances();
    update_fee_info(page);
}

export async function calc_slippage(values, deposit, zap_values, to_currency) {
    //var real_values = [...$("[id^=currency_]")].map((x,i) => +($(x).val()));
    values = values.map(v => v || 0)
    let slippage = 0;
    var real_values = Array(currentContract.N_COINS).fill(0)
    let calls = [
        [currentContract.swap._address ,currentContract.swap.methods.get_virtual_price().encodeABI()],
    ]
    if(to_currency !== undefined) {
        let precision = allabis[currentContract.currentContract].coin_precisions[to_currency]
        real_values[to_currency] = zap_values[to_currency].div(precision)
        zap_values[to_currency] = zap_values[to_currency].times(1e18/precision)
        var Sr = zap_values[to_currency]
        zap_values[to_currency] = zap_values[to_currency].div(1e18).div(currentContract.c_rates[to_currency]).toFixed(0);
        calls.push([currentContract.swap._address, currentContract.swap.methods.calc_token_amount(zap_values, to_currency).encodeABI()])

    }
    else {
        real_values = values.map(v=>+v);
        var Sr = real_values.reduce((a,b) => a+b, 0);

        var values = real_values.map((x,i) => cBN(Math.floor(x / currentContract.c_rates[i]).toString()).toFixed(0,1));
        calls.push([currentContract.swap._address, currentContract.swap.methods.calc_token_amount(values, deposit).encodeABI()])
    }
    calls.push(...[...Array(currentContract.N_COINS).keys()].map(i => [currentContract.swap._address, currentContract.swap.methods.balances(i).encodeABI()]))
    let aggcalls = await currentContract.multicall.methods.aggregate(calls).call();
    let decoded = aggcalls[1].map(hex => currentContract.web3.eth.abi.decodeParameter('uint256', hex))
    let [virtual_price, token_amount, ...balances] = decoded
    let Sv = +virtual_price * (+token_amount) / 1e36;
    for(let i = 0; i < currentContract.N_COINS; i++) {
        let coin_balance = +balances[i] * currentContract.c_rates[i];
        if(!deposit) {
            if(coin_balance < real_values[i]) {
                currentContract.showNoBalance = true;
                currentContract.noBalanceCoin = i;
            }
            else
                currentContract.showNoBalance = false;
        }
    }
    if (deposit)
        slippage = Sv / Sr
    else if(to_currency === undefined) {
        slippage = Sr / Sv;
    }
    else
        slippage = Sr / (Sv * 1e18)
    slippage = slippage - 1;
    slippage = slippage || 0
    console.log(slippage)
    currentContract.slippage = slippage;
    currentContract.showSlippage = true;
}

export async function setTimeout(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout))
}
