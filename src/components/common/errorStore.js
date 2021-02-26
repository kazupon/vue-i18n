import Vue from 'vue'

import { notifyNotification } from '../../init'

export let state = Vue.observable({
	txError: null,
})

export function handleError(error) {
	if(error && error.message && error.message.length < 100)
		state.txError = error.message
	if(error && (error.name == 'EthAppPleaseEnableContractData' || error.message.includes('insufficient')))
		notifyNotification(error.message, 'error')
}