import Vue from 'vue'
import * as helpers from '../../utils/helpers'
export let state = Vue.observable({
	subscription: null,
})

export function setSubscription(subscription) {
	state.subscription = subscription
}

export async function init() {
	let swregistration = await navigator.serviceWorker.ready
	let subscription = await swregistration.pushManager.getSubscription()
	console.log(subscription, "SUBSCRIPTION")
	if(subscription !== null) {
	  await updateSubscriptionServer(subscription)
	  state.subscription = subscription
	  console.log(state.subscription, "SUBSCRIPTION")
	}
}

export async function subscribeNotifications() {
	let swregistration = await navigator.serviceWorker.ready
	let response = await fetch('https://pushservice.curve.fi/vapidPublicKey');
    let vapidPublicKey = await response.text();
    // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
    // urlBase64ToUint8Array() is defined in /tools.js
    let convertedVapidKey = helpers.urlBase64ToUint8Array(vapidPublicKey);

    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
    // send notifications that don't have a visible effect for the user).
    let subscription = await swregistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });

    await registerSubscription(subscription)
    state.subscription = subscription
}

export async function unsubscribeNotifications() {
	let swregistration = await navigator.serviceWorker.ready
	let subscription = await swregistration.pushManager.getSubscription()
	await subscription.unsubscribe()
	await fetch('https://pushservice.curve.fi/removeSubscription', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			subscription: subscription,
		})
	})
	state.subscription = null
}

export async function updateSubscriptionServer(newSubscription) {
	if(state.subscription === null && !newSubscription) registerSubscription(newSubscription)
	await fetch('https://pushservice.curve.fi/updateSubscription', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			oldSubscription: state.subscription,
			newSubscription: newSubscription, 
		})
	})
	state.subscription = newSubscription
}

export async function registerSubscription(subscription) {
	await fetch('https://pushservice.curve.fi/register', {
		method: 'post',
		headers: {
		  'Content-type': 'application/json'
		},
		body: JSON.stringify({
		  subscription: subscription
		}),
	});
}

export async function postTxNotification(txHash) {
	let subscription = state.subscription
	console.log(subscription)
	if(subscription === null) return;
	return fetch('https://pushservice.curve.fi/addtx', 
		{
		    method: 'POST', 
		    headers: {
		      'Content-type': 'application/json'
		      // 'Content-Type': 'application/x-www-form-urlencoded',
		    },
		    body: JSON.stringify({ subscription, txHash: txHash})
		})
}


export async function removeTxNotification(txHash) {
	let subscription = state.subscription
	console.log(subscription)
	if(subscription === null) return;
	return fetch('https://pushservice.curve.fi/removetx',
		{
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ subscription, txHash, txHash })
		})
}