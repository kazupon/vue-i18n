<template>
	<div>
	    <p class='simple-error' id='highslippage-warning' v-show='showSlippage && slippage < -0.005'>
	    	<span class='text'>
          Warning! High slippage(plus pricing):
        <span class='percent'>{{(-slippage*100).toFixed(3)}}</span>%
          <span class='tooltip'>[?]
            <span class='tooltiptext long'>
              Slippage comes from depositing too many coins not in balance, and current coin prices are additionally accounted for
            </span>
          </span>
        </span>
	    </p>
	    <p class='info-message' id='slippage-warning' v-show='showSlippage && slippage <= 0 && slippage >= -0.005'>
	    	<span class='text'>
          Slippage(plus pricing):
        </span>
        <span class='percent'>{{(-slippage*100).toFixed(3)}}</span>%
          <span class='tooltip'>[?]
            <span class='tooltiptext long'>
              Slippage comes from depositing too many coins not in balance, and current coin prices are additionally accounted for
            </span>
          </span>
	    </p>
	    <p class='success' id='bonus-window' v-show='showSlippage && slippage > 0'>
	    	Bonus(plus pricing): <span>{{(slippage*100).toFixed(3)}}</span>%
        <span class='tooltip'>[?]
          <span class='tooltiptext long'>
            Bonus comes as an advantage from current coin prices which usually appears for coins which are {{ $route.name == 'Deposit' ? 'low' : 'high'}} in balance
          </span>
        </span>
	    </p>
      <p class='simple-error' id='nobalance-warning' v-show='show_nobalance'>
      	Warning! Not enough balance for {{noBalanceText}} token in the contract
      </p>
      <p class='info-message gentle-message' id='susd-warning' v-show="currentPool == 'susdv2' && showSlippage && slippage < -0.01">
        Please add coins in a balanced proportion
      </p>
	</div>
</template>

<script>
    import { getters, contract as currentContract } from '../../contract'
    export default {
    	props: ['show_nobalance','show_nobalance_i'],
        computed: {
          ...getters,
          noBalanceText() {
          	if(!this.show_nobalance) return '';
          	let kv = Object.entries(this.currencies)[this.show_nobalance_i]
            if(!(this.show_nobalance_i == 2 && this.currentPool == 'usdt') && this.currentPool != 'susdv2') {
              return kv[1] + " (in " + kv[0] + ")";
            }
            return kv[1];
          }
        },
    }
</script>

<style scoped>

</style>