<template src='./ProfitTemplate.tmp'></template>

<script>
	import Vue from 'vue'
    import * as common from '../utils/common.js'
    import { getters, contract as currentContract } from '../contract'
    import * as helpers from '../utils/helpers'
    import Web3 from "web3";

    import BigNumber from 'bignumber.js'

    import ProfitBaseMixin from './ProfitBaseMixin'
    import ProfitMixin from './ProfitMixin'

	export default {
        mixins: [ProfitBaseMixin, ProfitMixin],
	}
</script>

<style>
    #profit-info label[for='showinUSD']:before {
        width: auto;
        margin-right: 0.3em;
    }
</style>