<template>
	<div class="window white add-liquidity">
        <fieldset class="percentage">
            <legend>Share of liquidity (%)</legend>
            <ul>
                <li>
                    <input type="text" 
                    id="liquidity-share" 
                    name="liquidity-share" 
                    v-model='share'
                    @input='handle_change_share'
                    @focus='handle_change_share'
                    :style='shareStyles'>
                </li>
            </ul>
        </fieldset>
        <fieldset class="currencies">
            <legend>Currencies:</legend>
            <ul>
                <li v-for='(currency, i) in Object.keys(currencies)'>
                    <label :for="'currency_'+i">{{currencies[currency]}} (in {{currency | capitalize}})</label>
                    <input type="text" 
                    :id="'currency_'+i" 
                    name="from_cur" 
                    value="0.00" 
                    v-model = 'inputs[i]' 
                    :style = "inputStyles[i]"
                    @input='handle_change_amounts(i)'
                    @focus='handle_change_amounts(i)'>
                </li>
            </ul>
        </fieldset>

        <p style="text-align: center">
            <button id="remove-liquidity" @click='handle_remove_liquidity'>Withdraw</button>
            <button id="migrate-new" @click='handle_migrate_new'>Migrate from old</button>
            <Slippage v-bind="{show_nobalance, show_nobalance_i}"/>
        </p>
    </div>
</template>

<script>
	import Vue from 'vue'
    import * as common from '../utils/common.js'
    import { getters, contract as currentContract } from '../contract'
    import * as helpers from '../utils/helpers'

    import BigNumber from 'bignumber.js'
    var cBN = (val) => new BigNumber(val);

    import Slippage from './common/Slippage.vue'

    export default {
    	components: {
    		Slippage,
    	},
    	data: () => ({
    		share: '100.00',
    		shareStyles: {
    			backgroundColor: '#707070',
    			color: '#d0d0d0',
    		},
    		inputs: ['0.00', '0.00'],
    		inputStyles: [],
    		wallet_balances: [],
    		balances: [],
    		token_balance: 0,
    		token_supply: 0,
    		show_nobalance: false,
    		show_nobalance_i: 0,
    		bgColor: [],
    		amounts: [],
    	}),
        created() {
        	this.inputStyles = Array(currentContract.N_COINS).fill({
        		backgroundColor: '#707070',
        		color: '#d0d0d0',
        	})
            this.$watch(()=>currentContract.default_account, (val, oldval) => {
                if(!oldval) return;
                if(val.toLowerCase() != oldval.toLowerCase()) this.mounted();
            })
            this.$watch(()=>currentContract.initializedContracts, val => {
                if(val) this.mounted();
            })
        },
        computed: {
          ...getters,
        },
        mounted() {
            if(currentContract.initializedContracts) this.mounted();
        },
        methods: {
            async mounted() {
                await common.update_fee_info('old');
            	await this.update_balances();
            	this.handle_change_share();
            },
            async update_balances() {
			    if (currentContract.default_account) {
			        for (let i = 0; i < currentContract.N_COINS; i++)
			            Vue.set(this.wallet_balances, i, parseInt(await currentContract.coins[i].methods.balanceOf(currentContract.default_account).call()));
			        this.token_balance = parseInt(await currentContract.old_swap_token.methods.balanceOf(currentContract.default_account).call());
			    }
			    else {
			        this.token_balance = 0;
			    }
			    for (let i = 0; i < currentContract.N_COINS; i++) {
			        Vue.set(this.balances, i, parseInt(await currentContract.old_swap.methods.balances(i).call()));
			        if(!currentContract.default_account) Vue.set(this.balances, i, 0)
			    }
			    this.token_supply = parseInt(await currentContract.old_swap_token.methods.totalSupply().call());
			},
			async handle_change_amounts(i) {
			    return function() {
			        for (let j = 0; j < currentContract.N_COINS; j++) {
			            var cur = $('#currency_' + j);
			            if ((this.value > (this.balances[i] * currentContract.c_rates[i] * this.token_balance / this.token_supply)) & (j == i))
			                Vue.set(this.inputStyles, j, Object.assign(this.inputStyles[j], {backgroundColor: 'red'}))
			            else
			                Vue.set(this.inputStyles, j, Object.assign(this.inputStyles[j], {backgroundColor: 'blue'}));
			            Vue.set(this.inputStyles, j, Object.assign(this.inputStyles[j], {color: 'aqua'}))
			        }
		            this.share = '---';
		            this.shareStyles = {
		            	backgroundColor: '#707070',
		            	color: '#d0d0d0'
		            }
			    }
			},
			async handle_remove_liquidity() {
			    var deadline = Math.floor((new Date()).getTime() / 1000) + currentContract.trade_timeout;
                let min_amounts = []
			    for (let i = 0; i < currentContract.N_COINS; i++) {
			        Vue.set(this.amounts, i, cBN(Math.floor(this.inputs[i] / currentContract.c_rates[i]).toString()).toFixed(0,1)); // -> c-tokens
                    min_amounts[i] = cBN(0.97).multipliedBy(this.share/100).multipliedBy(cBN(this.balances[i]))
                    .multipliedBy(cBN(this.token_balance))
                    .div(cBN(this.token_supply))
                    .toFixed(0,1)
                }
			    var txhash;
			    if (this.share == '---') {
			        await currentContract.swap.methods.remove_liquidity_imbalance(this.amounts, deadline).send({from: currentContract.default_account, gas: 1000000});
			    }
			    else {
			        var amount = cBN(Math.floor(this.share / 100 * this.token_balance).toString()).toFixed(0,1);
			        if (this.share == 100)
			            amount = await currentContract.old_swap_token.methods.balanceOf(currentContract.default_account).call();
			        await currentContract.old_swap.methods.remove_liquidity(amount, deadline, min_amounts).send({from: currentContract.default_account, gas: 600000});
			    }
			    if(share_val != '---') {
			        for (let i = 0; i < currentContract.N_COINS; i++) {
			            this.handle_change_amounts(i)();
			        }
			    }
			    await this.update_balances();
			    common.update_fee_info('old');
			},
			handle_change_share() {
				this.shareStyles.backgroundColor = 'blue'
				this.shareStyles.color = 'aqua'
			    if (this.share == '---') {
			        this.share = 0;
			    }
			    else if ((this.share > 100) | (this.share < 0))
			        this.shareStyles.backgroundColor = 'red'

			    for (let i = 0; i < currentContract.N_COINS; i++) {
			        if ((this.share >=0) & (this.share <= 100)) {
			            Vue.set(this.inputs, i, (this.share / 100 * this.balances[i] * currentContract.c_rates[i] * this.token_balance / this.token_supply).toFixed(2))
			        }
			        else {
			            Vue.set(this.inputs, i, 0)
			        }
			        Vue.set(this.inputStyles, i, {
			        	backgroundColor: '#707070',
			        	color: '#d0d0d0'
			        })
			    }
			},
			setAllInputBackground(bgcolor) {
				for(let i = 0; i < currentContract.N_COINS; i++) {
					Vue.set(this.inputStyles, i, Object.assign(this.inputStyles[i] || {}, {backgroundColor: bgcolor}))
				}
			},
	        handle_migrate_new() {
	        	common.handle_migrate_new('old')
	        }
        },

    }
</script>

<style>
	#remove-liquidity {
		margin-right: 1em;
	}
</style>