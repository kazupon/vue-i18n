import Vue from 'vue'

import BN from 'bignumber.js'

export const state = Vue.observable({
	fetched: false,
	gasPriceInfo: {},
	gasPrice: 20,
	gasPriceWei: "20000000000",
	gasPriceInterval: null,
})