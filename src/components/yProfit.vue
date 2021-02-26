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
    import yProfitMixin from './yProfitMixin'

	export default {
        mixins: [ProfitBaseMixin, ProfitMixin, yProfitMixin],
	}
</script>