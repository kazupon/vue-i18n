import Vue from 'vue'
import RenSDK from '@renproject/ren'
import BlocknativeSdk from 'bnc-sdk'
import Web3 from 'web3'

import * as gasPriceStore from '../common/gasPriceStore'

let firebaseApp = null
let firestore = null

const blocknative = new BlocknativeSdk({
	dappId: 'c68d8ec3-9b9a-4ba5-a3eb-6232eff79030',       // [String] The API key created by step one above
	networkId: 1,
})
const sdk = new RenSDK('mainnet', {
	//logLevel: 'trace'
})
let Box
import BN from 'bignumber.js'
import { notify, notifyHandler, notifyNotification } from '../../init'
import { getters, allCurrencies, contract, gas } from '../../contract'
import allabis, { ERC20_abi } from '../../allabis'
import * as common from '../../utils/common'
import * as helpers from '../../utils/helpers'
import * as subscriptionStore from '../common/subscriptionStore'
import EventBus from '../graphs/EventBus'
import { state } from './shiftState'

import * as errorStore from '../common/errorStore'

let sigUtil = require('eth-sig-util')

import Biconomy from "@biconomy/mexa";
const biconomy = new Biconomy(contract.web3.currentProvider,{apiKey: 'KlDgWW0Dg.48cc902e-03a1-4d7b-9774-83b4e8571736', debug: true});

console.log(contract.adapterContract, "ADAPTER CONTRACT")


const txObject = () => ({
	id: '',
	timestamp: null,
	type: '',
	mintType: 0,
	burnType: 0,
	amount: '',
	from_currency: '',
	fromInput: 0,
	to_currency: '',
	pool: '',
	toInput: 0,
	minExchangeRate: 0,
	newMinExchangeRate: 0,
	slippage: 0,
	toAmount: 0,
	fromAddress: '',
	address: '',
	params: '',
	ethTxHash: '',
	ethStartBlock: null,
	ethCurrentBlock: null,
	ethConfirmations: null,
	renVMHash: '',
	gatewayAddress: '',
	confirmations: 0,
	// 0 - waiting for renVM gateway address, 1 - waiting for deposit on BTC address, 2 - got BTC transaction, waiting for confirmation
	// 3 - waiting for renVM to do it's magic and shift, 4 - got renBTC, now initiating swap, 5 - swap ready
	state: 0,
	btcTxHash: '',
	btcTxVOut: '',
	secret: '',
	secretHash: '',
	renResponse: '',
	signature: '',

	min_amount: 0,
	amounts: 0,
	lessSent: false,
	renCRVmin: null,
	stake: false,
	mintedTokens: null,
	stakeTxHash: null,

	modalConfirmed: false,
	removed: false,

	error: null,

})

let oldrenAdapter = new contract.web3.eth.Contract(allabis.ren.adapterABI, allabis.ren.oldAdapterAddress)
let renAdapter = new contract.web3.eth.Contract(allabis.ren.adapterABI, allabis.ren.adapterAddress)
let renAdapterBiconomy = new contract.web3.eth.Contract(allabis.ren.adapterABI, allabis.ren.adapterBiconomyAddress)

let oldsbtcAdapter = new contract.web3.eth.Contract(allabis.sbtc.adapterABI, allabis.sbtc.oldAdapterAddress)
let sbtcAdapter = new contract.web3.eth.Contract(allabis.sbtc.adapterABI, allabis.sbtc.adapterAddress)
let sbtcAdapterBiconomy = new contract.web3.eth.Contract(allabis.sbtc.adapterABI, allabis.sbtc.adapterBiconomyAddress)

let adapters = [oldrenAdapter, renAdapter, oldsbtcAdapter, sbtcAdapter, renAdapterBiconomy, sbtcAdapterBiconomy]

let renSwap = new contract.web3.eth.Contract(allabis.ren.swap_abi, allabis.ren.swap_address)
let sbtcSwap = new contract.web3.eth.Contract(allabis.sbtc.swap_abi, allabis.sbtc.swap_address)

let swaps = {
	ren: renSwap,
	sbtc: sbtcSwap,
}

state.address = state.default_account =  contract.default_account
state.sdk = sdk

async function init() {
	// if(contract.currentContract != 'ren') {
	// 	contract.swap = contract.contracts.ren.swap
	// 	contract.coins = contract.contracts.ren.coins
	// }
	let fees = await sdk.getFees()
	state.minersLockFee = fees.btc.lock
	state.minersReleaseFee = fees.btc.release
	state.mintFee = fees.btc.ethereum.mint
	state.burnFee = fees.btc.ethereum.burn
	state.loaded = true
	if(findFirebaseUserSignature(contract.default_account)) useFirestore()
	else loadTransactions()
}

biconomy.onEvent(biconomy.READY, () => {
	let biconomyWeb3 = new Web3(biconomy)
	adapters.push(new biconomyWeb3.eth.Contract(allabis.ren.adapterABI, allabis.ren.adapterBiconomyAddress))
	adapters.push(new biconomyWeb3.eth.Contract(allabis.sbtc.adapterABI, allabis.sbtc.adapterBiconomyAddress))

	init()
})

async function syncStores(items) {

	//sync firebase and db to localstorage
	for(let item of items) {
		localStorage.setItem('curvebtc_' + item.id, JSON.stringify(item))
	}

	//sync not synced local items to firebase and db
	// let localOnlyItems = Object.keys(localStorage)
	// 					.filter(key => key.startsWith('curvebtc_'))
	// 					.filter(key => items.find(item => 'curvebtc_' + item.id == key) == undefined)

	for(let key of Object.keys(localStorage).filter(key => key.startsWith('curvebtc_'))) {
		let data = await helpers.AES_GCM_encrypt(localStorage[key], state.aes_key)
		await fetch('https://pushservice.curve.fi/db/upserttx', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				key: key,
				password: state.password,
				transaction: data,
			})
		})
		let item = {data: data}
		firestore.collection(state.fireUser.uid).doc(key).set(item)
	}
}

export async function loadTransactions() {
	let items = await getAllItems()
	if(state.fireUser !== null && firestore !== null) {
		syncStores(items)
		let unsyncedLocal = Object.keys(localStorage)
				.filter(key => key.startsWith('curvebtc_') && items.find(item => item.id == '_' + key.split('__')[1]) == undefined)
				.map(key => JSON.parse(localStorage[key]))
				.filter(item => item.id)
		items = items.concat(unsyncedLocal)
	}
	state.transactions = Object.values(items).filter(t=>t.state).sort((a, b) => b.timestamp - a.timestamp)
	let transactions = state.transactions.filter(t => !t.removed)
	await checkForFailed(transactions)
	await checkForFailedStake(transactions.filter(t => t.stakeTxHash))
	await resumeStakeTransactions(transactions)
	//send all txs so case is handled when user goes to submit 
	let mints = transactions.filter(t => [0,3].includes(t.type) && ![14,15].includes(t.state)).map(t=>sendMint(t))
	console.log(mints, "MINTS")
	let burns = transactions.filter(t => !t.btcTxHash && t.ethTxHash && t.state && t.state != 65 && t.type == 1)
	console.log(burns, "BURNS")
	let currentBlock = await contract.web3.eth.getBlockNumber()
	let listenTransactions = transactions
								.filter(t => (!t.btcTxHash && t.ethTxHash && t.state && t.state != 65) || t.btcTxHash && t.ethTxHash && t.state && t.state != 14)
	for(let transaction of listenTransactions) {
		listenForReplacement(transaction.ethTxHash)
	}
	let stakeTransactions = transactions.filter(t => t.stakeTxHash && t.state != 17)
	for(let transaction of stakeTransactions) {
		listenForReplacementStake(transaction.stakeTxHash)
	}
	for(let transaction of transactions.filter(t => !t.btcTxHash && t.ethTxHash && t.state && t.state != 65 && t.type == 1)) {
		let receipt = await contract.web3.eth.getTransactionReceipt(transaction.ethTxHash)
		if(!receipt) continue
		transaction.ethStartBlock = +receipt.blockNumber
		transaction.confirmations = currentBlock - transaction.ethStartBlock + 1
		transaction.state = 30 + transaction.confirmations
		upsertTx(transaction)
	}
	web3.eth.subscribe('newBlockHeaders')
		.on('data', block => {
			console.log("NEW BLOCK")
			for(let transaction of state.transactions.filter(t => !t.btcTxHash && t.ethTxHash && t.state && ![65, 66].includes(t.state != 65) && t.type == 1)) {
				console.log(transaction, "TRANSACTION")
				if(transaction.state >= 62 || transaction.confirmations >= 30 || transaction.state == 30) continue;
				transaction.confirmations = block.number - transaction.ethStartBlock + 1
				transaction.ethCurrentBlock = block.number
				transaction.state = 30 + transaction.confirmations
				//upsertTx(transaction)
			}
		})
	await Promise.all([...mints, ...burns.map(t=>listenForBurn(t.id))])
}

export function refresh(transaction) {
	transaction.removed = false
	upsertTx(transaction)
	sendMint(transaction)
}

export async function useFirestore() {
	if(state.fireUser !== null) return;
	if(firestore == null) {
		const importResolves = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')]) 
		const Firebase = importResolves[0]

		let firebaseConfig = {
		    apiKey: "AIzaSyBk5JTJZmktp7QLBkf9mfzuluPprb-hKPM",
		    authDomain: "curvebtc-70420.firebaseapp.com",
		    databaseURL: "https://curvebtc-70420.firebaseio.com",
		    projectId: "curvebtc-70420",
		    storageBucket: "curvebtc-70420.appspot.com",
		    messagingSenderId: "474354572456",
		    appId: "1:474354572456:web:23dc684ead6423e0d2b69d"
		  };

		firebaseApp = Firebase.initializeApp(firebaseConfig)

		firestore = firebaseApp.firestore();
	}
	// Box = await import('3box')
	// Box = Box.default
	// if(state.box !== null) return;
	// state.box = await Box.openBox(contract.default_account, contract.web3.currentProvider)
	// state.space = await state.box.openSpace('curvebtc')
	// loadTransactions();
	// await state.space.syncDone
	let password
	let msg_signature = findFirebaseUserSignature(contract.default_account)
	console.log(msg_signature, "FIND SIGNATURE")
	if(!msg_signature) {
		// msg_signature =	await new Promise((resolve, reject) => {
		// 							web3.currentProvider.sendAsync({
		// 								method: 'eth_signTypedData',
		// 								params: [[{
		// 									type: 'string',
		// 									name: 'Message',
		// 									value: 'Sign in to store transaction data',
		// 								}], 
		// 								contract.default_account],
		// 								from: contract.default_account}, 
		// 								(err, result) => {if(err) {reject(err)} else resolve(result)
		// 							})
		// 						})
		if(localStorage.getItem('selectedWallet').toLowerCase() == 'authereum') {
			msg_signature = await contract.web3.currentProvider.signMessageWithSigningKey("Sign in to store transaction data")
			console.log(msg_signature, "SIGNATURE")
		}
		else {
			msg_signature = await new Promise((resolve, reject) => {
					web3.currentProvider.sendAsync({
					method: 'personal_sign',
					params: [contract.web3.utils.utf8ToHex("Sign in to store transaction data"), contract.default_account],
					from: contract.default_account,
				}, (err, result) => {if(err) {reject(err)} else resolve(result)})
			})
			console.log(msg_signature, "SIGNATURE")
			msg_signature = msg_signature.result
		}
	}
	state.msg_signature = msg_signature
	addFirebaseUser(contract.default_account, msg_signature)

	console.log(msg_signature, "SIGNATURE")
	password = contract.web3.utils.sha3('password' + msg_signature)
	console.log(password, "THE PASSWORD")
	state.password = password
	let aes_key = contract.web3.utils.sha3('encryption' + msg_signature)
	state.aes_key = aes_key

	try {
		let user = await firebaseApp.auth().createUserWithEmailAndPassword(`${contract.default_account}@curve.fi`, password)
	}
	catch(err) {
		console.error(err)
		console.log("SIGN IN INSTEAD", password)
		try {
			let user = await firebaseApp.auth().signInWithEmailAndPassword(`${contract.default_account}@curve.fi`, password)
		}
		catch(err) {
			console.error(err)
		}
		console.log(err.code, "ERR CODE")
		// if(err.code == 'auth/email-already-in-use') {
		// 	let user = firebaseApp.auth().signInWithEmailAndPassword(`${contract.default_account}@curve.fi`, password)
		// }
	}
	firebaseApp.auth().onAuthStateChanged(user => {
		if(user) {
			state.fireUser = user
			loadTransactions()
		}
	})
}

export async function setItem(key, item) {
	item.web3Provider = null
	// if(state.space !== null) {
	// 	return await state.space.private.set(key, JSON.stringify(item))
	// }
	localStorage.setItem(key, JSON.stringify(item))
	if(state.fireUser) {
		let data = await helpers.AES_GCM_encrypt(JSON.stringify(item), state.aes_key)
		try {
			await fetch('https://pushservice.curve.fi/db/upserttx', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					key: key,
					password: state.password,
					transaction: data,
				})
			})
		}
		catch(err) {
			console.error(err)
		}
		//fix firebase undefined error
		//not needed when data is encrypt<ed
		//if(item.params && item.params.contractCalls[0].txConfig === undefined) item.params.contractCalls[0].txConfig = null
		item = {data: data}
		firestore.collection(state.fireUser.uid).doc(key).set(item)
	}
	//return localStorage.setItem(key, JSON.stringify(item))
}

export async function removeItem(key) {
	// if(state.space !== null) {
	// 	return await state.space.private.remove(key)
	// }
	localStorage.removeItem(key)
	if(state.fireUser) {
		return firestore.collection(state.fireUser.uid).doc(key).delete(item)
	}
	//return localStorage.removeItem(key)
}

export async function getItem(key) {
	//if(state.space !== null) return await state.space.private.get(key)
	if(state.fireUser) {
		let docRef = firestore.collection.doc(key)
		let doc = await docRef.get()
		if(doc.exists) { 
			let encrypted = doc.data().data
			return JSON.parse(await helpers.AES_GCM_decrypt(encrypted, state.aes_key))
		}
		else return localStorage.getItem(key)
	}
	return localStorage.getItem(key)
}

export async function getAllItems() {
	let storage = localStorage
	// if(state.space !== null) {
	// 	storage = await state.space.private.all();
	// }
	if(state.fireUser) {
		let data
		try {
			console.log(state.fireUser.uid, "GET ALL ITEMS UID")
			data = await firestore.collection(state.fireUser.uid).get()
			console.log(data, "INITIAL DATA")
			data = await Promise.all(data.docs.map(doc => doc.data().data).map(async encrypted => JSON.parse(await helpers.AES_GCM_decrypt(encrypted, state.aes_key))))
			console.log(data, "THE DATA")
		}
		catch(err) {
			console.error(err)
		}
		try {
			let dbdata = await fetch('https://pushservice.curve.fi/db/transactions', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					password: state.password,
				})
			})
			dbdata = (await dbdata.json()).result
			dbdata = await Promise.all(dbdata
						.filter(dbitem => data.find(d => dbitem.key == 'curvebtc_' + d.id) === undefined)
						.map(async dbitem => JSON.parse(await helpers.AES_GCM_decrypt(dbitem.transaction, state.aes_key))))
			dbdata = dbdata || []
			data = data.concat(dbdata)
		}
		catch(err) {
			console.error(err)
		}
		return data
	}
	return Object.keys(storage).filter(key => key.startsWith('curvebtc_')).map(k => JSON.parse(storage[k]))
}

export async function removeTx(transaction) {
	state.transactions = state.transactions.filter(t => t.id != transaction.id)
	transaction.removed = true;
	upsertTx(transaction)
	//don't actually delete, just hide from user
	//await removeItem('curvebtc_' + transaction.id)
}

export function upsertTx(transaction) {
	console.log("UPSERT TX", transaction)
	let key = 'curvebtc_' + transaction.id
	transaction.web3Provider = null;
	if(transaction.params && transaction.params.web3Provider)
		transaction.params.web3Provider = null;
	transaction.box = null;
	transaction.space = null
	setItem(key, transaction)
	if([0, 3].includes(transaction.type) && !transaction.ethTxHash) subscriptionStore.postTxNotification(transaction.btcTxHash)
	if(transaction.type == 1 && transaction.state < 63) subscriptionStore.postTxNotification(transaction.ethTxHash)
}

function addFirebaseUser(address, signature) {
	let firetable = JSON.parse(localStorage.getItem('firetable') || '[]')
	if(!firetable.length || (firetable[0] && ! firetable[0][address])) firetable.push({ [address]: signature })
	localStorage.setItem('firetable', JSON.stringify(firetable))
}

function findFirebaseUserSignature(address) {
	let firetable = JSON.parse(localStorage.getItem('firetable') || '[]')
	if(firetable.length) return firetable[0][address]
}

function newTx() {
	let transaction = {...txObject()}
	transaction.id = helpers.generateID()
	transaction.timestamp = Date.now()
	return transaction
}

export async function mint(data) {
	let transaction = {...newTx()}
	transaction.type = 0
	transaction.mintType = 0
	transaction.amount = data.from_currency == 0 ? data.amountAfterBTC : data.fromInput;
	transaction.to_currency = data.to_currency
	transaction.pool = contract.currentContract
	transaction.address = data.address;
	transaction.fromAddress = contract.default_account;
	transaction.fromInput = data.fromInput;
	transaction.toInput = data.toInput;
	transaction.minExchangeRate = BN(data.toInput).times(1e8).div(data.amountAfterBTC).minus(1).toFixed(0,1)
	transaction.newMinExchangeRate = BN(transaction.minExchangeRate).times(BN((10000-data.slippage)/10000)).minus(1).toFixed(0,1)
	transaction.secret = '0x' + helpers.randomBytes(32)
	transaction.secretHash = contract.web3.utils.keccak256(transaction.secret)
	//slippage is in BPS
	transaction.slippage = data.slippage
	upsertTx(transaction)
	state.transactions.unshift(transaction)
	state.showModal1 = true;

	await sendMint(transaction)
}

function initSwapMint(transaction) {
	var { id, amount, nonce, address, toInput, params, minExchangeRate, slippage, to_currency } = transaction
	// let _minWbtcAmount = BN(toInput).times(1e8).times(0.99).toFixed(0, 1)
	console.log(amount, "AMOUNT", nonce, "NONCE", address, "ADDRESS", minExchangeRate, "MIN EXCHANGE RATE", slippage, "SLIPPAGE")
	

	let contractParams = [
        {
            name: "_minExchangeRate",
            type: "uint256",
            value: minExchangeRate,
        },
        {
        	name: "slippage",
        	type: 'uint256',
        	value: slippage,
        },
        {
        	name: "_j",
        	type: 'int128',
        	value: to_currency,
        },
        {
            name: "_wbtcDestination",
            type: "address",
            value: address,
        },
        {
        	name: "msgSender",
        	type: "address",
        	value: contract.default_account,
        },
    ]

    if(transaction.pool == 'ren') contractParams = contractParams.filter((_, i) => i != 2)

	let transfer = {
	    // Send BTC from the Bitcoin blockchain to the Ethereum blockchain.
	    sendToken: RenJS.Tokens.BTC.Btc2Eth,

	    // The contract we want to interact with
	    sendTo: params && params.contractCalls[0].sendTo || allabis[transaction.pool].adapterBiconomyAddress,

	    suggestedAmount: RenJS.utils.value(amount, "btc").sats().toNumber(),

	    // The name of the function we want to call
	    contractFn: "mintThenSwap",
	    
	    nonce: params && params.nonce || RenJS.utils.randomNonce(),

	    // Arguments expected for calling `deposit`
	    contractParams: contractParams,
	    
	    // Web3 provider for submitting mint to Ethereum
	    web3Provider: web3.currentProvider,
	}

	console.log(transfer, "TRANSFER")
	console.log(transfer.sendTo, "SEND TO")

	return transfer
}

export async function deposit(data) {
	let transaction = {...newTx()}
	//type 3 is deposit
	transaction.type = 3
	transaction.mintType = 1
	transaction.amount = data.btcAmount
	transaction.fromInput = data.btcAmount
	transaction.pool = contract.currentContract
	transaction.address = data.address
	transaction.fromAddress = contract.default_account;
	transaction.amounts = data.amounts.map(amount => BN(amount).toFixed(0,1))
	transaction.min_amount = data.min_amount
	transaction.new_min_amount = data.min_amount
	transaction.stake = data.stake
	upsertTx(transaction)
	state.transactions.unshift(transaction)
	state.showModal1 = true

	await sendMint(transaction)
}

function initDepositMint(transaction) {
	var { id, amount, amounts, min_amount, nonce, address, params } = transaction

	let amountsLen = transaction.pool == 'ren' ? 2 : 3

	console.log("INIT DEPOSIT MINT")

	let transfer = {
	    // Send BTC from the Bitcoin blockchain to the Ethereum blockchain.
	    sendToken: RenJS.Tokens.BTC.Btc2Eth,

	    // The contract we want to interact with
	    sendTo: params && params.contractCalls[0].sendTo || allabis[transaction.pool].adapterBiconomyAddress,

	    suggestedAmount: RenJS.utils.value(amount, "btc").sats().toNumber(),

	    // The name of the function we want to call
	    contractFn: "mintThenDeposit",
	    
	    nonce: params && params.nonce || RenJS.utils.randomNonce(),

	    // Arguments expected for calling `deposit`
	    contractParams: [
            {
                name: "_wbtcDestination",
                type: "address",
                value: contract.default_account,
            },
	        {
                name: "amounts",
                type: `uint256[${amountsLen}]`,
                value: amounts,
            },
            {
                name: "min_mint_amount",
                type: "uint256",
                value: min_amount,
            },
            {
            	name: "msgSender",
            	type: "address",
            	value: contract.default_account,
            },
	    ],
	    
	    // Web3 provider for submitting mint to Ethereum
	    web3Provider: web3.currentProvider,
	}

	console.log(transfer.sendTo, "DEPOSIT SEND TO")

	return transfer
}

export async function initMint(transaction) {
	let transfer;
	console.log(transaction.type, transaction, "INIT MINT")
	if(transaction.type == 0) transfer = initSwapMint(transaction)
	if(transaction.type == 3) transfer = initDepositMint(transaction)
	upsertTx(transfer)
	const mint = sdk.lockAndMint(transfer);
	return mint;
}

export async function sendMint(transfer) {

	let transaction = state.transactions.find(t => t.id == transfer.id)

	try {

		console.log(transfer, "SEND MINT")


		console.log(transaction.from)
		if(transaction.fromAddress && transaction.fromAddress.toLowerCase() != state.default_account.toLowerCase()) {
			return;
		}

		//transaction is ready to be sent to eth network
		if(transaction.renResponse && transaction.signature) {
			if(!transaction.ethTxHash && transaction.state != 16) {
				transaction.state = 11
				transaction.confirmations = 'Confirmed'
				upsertTx(transaction)
				if(transaction.type == 0) await mintThenSwap(transfer)
				if(transaction.type == 3) await mintThenDeposit(transaction)
			}
			else if(transaction.state != 17) {
				transaction.state = 14
				upsertTx(transaction)
			}
		}
		else {
			let mint = await initMint(transfer);


			//transaction initated, but didn't get an address, so updating
			if(!transaction.gatewayAddress) {
				transaction.params = mint.params;
				try {
					transaction.gatewayAddress = await mint.gatewayAddress()
				}
				catch(err) {
					console.error(err)
				}
				console.log("GATEWAY ADDRESS")
				transaction.state = 1
				upsertTx(transaction)
			}

			let deposit
			//transaction was submitted to btc network
			if(transaction.btcTxHash && String(transaction.btcTxVOut) !== 'undefined') {
				deposit = await mint.wait(state.confirmations, {
					txHash: transaction.btcTxHash,
					vOut: +transaction.btcTxVOut,
				})
				.on('deposit', deposit => {
					console.log('DEPOSIT SUBMITTED', deposit)
					console.log(transfer, "THE TRANSFER")
					if(deposit.utxo) {
						let confirmations = deposit.utxo.confirmations
						if(transaction.state == 2) {
							transaction.state = 3;
						}
						else
							transaction.state = 3 + confirmations

						transaction.confirmations = confirmations
						transaction.btcTxHash = deposit.utxo.txHash
						transaction.btcTxVOut = deposit.utxo.vOut
						upsertTx(transaction)
					}
				})
			}
			//transaction not submitted to btc network
			else {
				deposit = await mint.wait(state.confirmations)
								.on('deposit', deposit => {
									console.log("DEPOSIT", deposit)
									if(deposit.utxo) {
										if(transaction.state == 1) {
											transaction.state = 2
											state.showModal = false
										}
										transaction.confirmations = deposit.utxo.confirmations
										if(transaction.confirmations) transaction.state = 3 + deposit.utxo.confirmations
										transaction.btcTxHash = deposit.utxo.txHash
										transaction.btcTxVOut = deposit.utxo.vOut
										upsertTx(transaction)
									}
								})
			}

			transaction.state = 10

			let signature = await deposit.submit()
			let wasSubmitted = await mint.findTransaction(web3.currentProvider)
			if(wasSubmitted && wasSubmitted.length) transaction.state = 14;
			transaction.state = 11
			transaction.renResponse = signature.renVMResponse;
			transaction.signature = signature.signature
			transaction.utxoAmount = transaction.renResponse.autogen.amount
			upsertTx(transaction)
			if(transaction.type == 0) mintThenSwap(transaction)
			if(transaction.type == 3) mintThenDeposit(transaction)
		}
	}
	catch(err) {
		console.error(err)
		errorStore.handleError(err)
		if(err.message && err.message.includes('insufficient')) {
			transaction.error = err.message
			upsertTx(transaction)
		}
	}
}

export async function recoverRedeposit(transfer, newtxhash, newvout) {
	let transaction = state.transactions.find(t => t.id == transfer.id)
	transaction.btcTxHash = newtxhash
	let deposit = await initMint(transfer);

	let signature = await deposit.submit({
		txHash: newtxhash,
		vOut: +newvout,
	})

	transaction.state = 10
	transaction.ethTxHash = ''
	transaction.renResponse = signature.renVMResponse;
	transaction.signature = signature.signature
	transaction.utxoAmount = transaction.renResponse.autogen.amount
	upsertTx(transaction)
	if(transaction.type == 0) mintThenSwap(transaction)
	if(transaction.type == 3) mintThenDeposit(transaction)

}

export async function recoverStuck(transfer) {
	let contractParams = transfer.params.contractCalls[0].contractParams
	let encoded = web3.eth.abi.encodeParameters(
                    (contractParams || []).map(i => i.type),
                    (contractParams || []).map(i => i.value),
                );
	let adapter = renAdapterBiconomy
	if(window.location.href.includes('sbtc'))
		adapter = sbtcAdapterBiconomy
	await adapter.methods.recoverStuck(encoded, transfer.utxoAmount, transfer.renResponse.autogen.nhash, transfer.signature)
		.send({
			from: state.default_account,
			gas: 1000000,
		})
}

export async function swapNow(transaction) {
	mintThenSwap(transaction, true)
}

export async function receiveRen(transaction) {
	mintThenSwap(transaction, false, true)
}

export async function mintThenSwap({ id, amount, params, utxoAmount, renResponse, signature }, swapNow = false, receiveRen = false) {
	let transaction = state.transactions.find(t => t.id == id);
	if(transaction.state == 14 && transaction.ethTxHash) {
		let txreceipt = await contract.web3.eth.getTransactionReceipt(transaction.ethTxHash)
		if(txreceipt && txreceipt.status !== false) return
	}
	//if(transaction.state == 16 && (!swapNow || !receiveRen)) return
	let exchangeAmount = BN(utxoAmount).times(10000 - state.mintFee).div(10000)
	let get_dy = BN(await swaps[transaction.pool].methods.get_dy(0, transaction.to_currency, exchangeAmount.toFixed(0, 1)).call())
	let exchangeRateNow = get_dy.times(1e8).div(exchangeAmount)
	if(BN(transaction.amount).times(1e8).minus(utxoAmount).gt(10)) {
		transaction.newMinExchangeRate = BN(transaction.minExchangeRate).minus(1).toFixed(0,1)
	}
	//rates changed, ask user if they still want to swap
		//handle the case where they only want to mint
	if(exchangeRateNow.lt(BN(transaction.newMinExchangeRate)) && !swapNow && !receiveRen) {
		transaction.state = 13
		return;
	}
	if(swapNow) {
		transaction.newMinExchangeRate = BN(exchangeRateNow).times(BN((10000-transaction.slippage)/10000)).minus(1).toFixed(0,1)
	}
	if(receiveRen) {
		//make the rate impossibly high so the check for exchange always fails
		transaction.newMinExchangeRate = BN(1000000000000).toFixed(0,1)
	}
	//set new min exchange rate when user clicks on "exchange rates expired, want to swap again? and not popup automatically on that case"

	let args = [
			params.contractCalls[0].contractParams[0].value,
			transaction.newMinExchangeRate,
			params.contractCalls[0].contractParams[1].value,
			params.contractCalls[0].contractParams[2].value,
			params.contractCalls[0].contractParams[3].value,
			utxoAmount,
			renResponse.autogen.nhash,
			signature,
	]

	let adapterContract = adapters.filter(adapter => adapter._address.toLowerCase() == params.contractCalls[0].sendTo.toLowerCase())

	console.log(params.contractCalls[0].sendTo, "SEND TO")
	if([oldrenAdapter._address.toLowerCase(), renAdapter._address.toLowerCase(), renAdapterBiconomy._address.toLowerCase()]
		.includes(params.contractCalls[0].sendTo.toLowerCase())) {
		args = [
			params.contractCalls[0].contractParams[0].value,
			transaction.newMinExchangeRate,
			params.contractCalls[0].contractParams[1].value,
			params.contractCalls[0].contractParams[2].value,
			utxoAmount,
			renResponse.autogen.nhash,
			signature,
		]
	}
	//meta tx biconomy enabled adapters -> adapterContract = [adapter, BiconomyAdapter]
	let txs = []
	txs.push(adapterContract[0].methods.mintThenSwap(...args))
	console.log(adapters, "ADAPTERS")
	console.log(adapterContract, "ADAPTER CONTRACT")
	// if(adapterContract.length == 2) {
	// 	let nonce = await adapterContract[1].methods.getNonce(state.default_account).call()
	// 	let chainID = await adapterContract[1].methods.getChainID().call()

	// 	let functionSignature = adapterContract[1].methods.mintThenSwap(
	// 		...args
	// 	).encodeABI()

	// 	let message = 'Please sign this message to send the free meta transaction'
	// 	let messageToSign = `${message}${nonce}${chainID}`

	// 	let metaSignature = await web3.eth.personal.sign(messageToSign, state.default_account)

	// 	let {r, s, v} = helpers.getSignatureParameters(metaSignature)

	//     txs.unshift(
	//     	adapterContract[1].methods
	//     		.executeMetaTransaction(state.default_account, functionSignature, message, `${messageToSign.length}`, r, s, v),
	// 	)
	// }

	//refactor
	let txhash
	// try {
	// 	throw new Error('Normal flow')
	// 	txhash = await new Promise((resolve, reject) => {
	// 		return txs[0].send({
	// 			from: state.default_account,
	// 			gasPrice: gasPriceStore.state.gasPriceWei,
	// 			gas: gas.adapter[transaction.pool].mintThenSwap,
	// 		})
	// 		.once('transactionHash', hash => {
	// 			notifyHandler(hash)
	// 			transaction.state = 12
	// 			upsertTx(transaction)
	// 			resolve(hash)
	// 		})
	// 		.once('receipt', () => {
	// 			//this.transactions = this.transactions.filter(t => t.id != id)
	// 			transaction.state = 14
	// 			transaction.ethTxHash = receipt.transactionHash
	// 			upsertTx(transaction)
	// 		})
	// 		.on('error', err => {
	// 			console.error(err)
	// 			errorStore.handleError(err)
	// 			if(![14, 17].includes(transaction.state)) {
	// 				transaction.state = 16;
	// 				upsertTx(transaction)
	// 			}
	// 			reject(err)
	// 		})
	// 		.catch(err => {
	// 			console.error(err)
	// 			errorStore.handleError(err)
	// 			reject(err)
	// 		})
	// 	})
	// }
	// catch(err) {
		try {
			//errorStore.handleError(err)
			//biconomy returned an error - rate limit? retry with normal web3 adapter contract
			//if(adapterContract.length == 2) {
				txhash = await new Promise((resolve, reject) => {
					return adapterContract[0].methods.mintThenSwap(...args).send({
						from: state.default_account,
						gasPrice: gasPriceStore.state.gasPriceWei,
						gas: gas.adapter[transaction.pool].mintThenSwap,
					})
					.once('transactionHash', hash => {
						notifyHandler(hash)
						transaction.state = 12
						upsertTx(transaction)
						resolve(hash)
					})
					.once('receipt', () => {
						//this.transactions = this.transactions.filter(t => t.id != id)
						transaction.state = 14
						transaction.ethTxHash = receipt.transactionHash
						upsertTx(transaction)
					})
					.on('error', err => {
						console.error(err)
						errorStore.handleError(err)
						if(![14, 17].includes(transaction.state)) {
							transaction.state = 16;
							upsertTx(transaction)
						}
						reject(err)
					})
					.catch(err => {
						console.error(err)
						errorStore.handleError(err)
						reject(err)
					})
				})
			//}
		}
		catch(err) {
			console.error(err)
			errorStore.handleError(err)
		}
	//}

	subscriptionStore.removeTxNotification(transaction.btcTxHash)

	transaction.state = 12
	transaction.ethTxHash = txhash

	upsertTx(transaction)
}

export async function depositNow(transaction) {
	mintThenDeposit(transaction, true)
}

export async function receiveRenDeposit(transaction) {
	mintThenDeposit(transaction, false, true)
}

function calcFee() {
	let N_COINS = 2
	return getters.fee() * N_COINS / (4 * (N_COINS -1))
}

export async function mintThenDeposit({ id, amounts, min_amount, params, utxoAmount, renResponse, signature }, depositNow = false, receiveRen = false) {
	//handle change calc_token_amount like in mintThenSwap
	let transaction = state.transactions.find(t => t.id == id);
	if(transaction.state == 14 && transaction.ethTxHash) {
		let txreceipt = await contract.web3.eth.getTransactionReceipt(transaction.ethTxHash)
		if(txreceipt && txreceipt.status !== false) return
	}
	//if(transaction.state == 16 && (!swapNow || !receiveRen)) return
	let renAmount = BN(utxoAmount).times(10000 - state.mintFee).div(10000)
	if(BN(transaction.amounts[0]).lt(utxoAmount)) {
		transaction.lessSent = true
	}
	let actualAmounts = transaction.amounts.slice()
	actualAmounts[0] = BN(utxoAmount).toFixed(0,1)
	console.log(utxoAmount, "UTXO AMOUNT")
	console.log(actualAmounts, "ACTUAL AMOUNTS")
	console.log(renAmount, "REN AMOUNT")
	//transaction.amounts[0] = renAmount.toFixed(0,1)
	console.log(transaction.amounts, "AMOUNTS TO CALC FROM")
	let calc_token_amount = await swaps[transaction.pool].methods.calc_token_amount(actualAmounts, true).call()
	transaction.renCRVmin = (calc_token_amount / 1e18).toFixed(2);
	console.log(calc_token_amount, "CALC TOKEN AMOUNT")
	if(+calc_token_amount  < +transaction.new_min_amount && !depositNow && !receiveRen) {
		transaction.state = 13
		return;
	}
	if(depositNow) {
		calc_token_amount = BN(calc_token_amount).times(BN(1).minus(BN(calcFee())))
		calc_token_amount = calc_token_amount.times(0.99).toFixed(0,1)
		transaction.new_min_amount = calc_token_amount
	}
	if(receiveRen) {
		//make the new_min_mint_amount parameter in contract 0 so it always fails and mints renBTC
		transaction.new_min_amount = 0
	}

	let adapterContract = adapters.filter(adapter => adapter._address.toLowerCase() == params.contractCalls[0].sendTo.toLowerCase())

	console.log(params.contractCalls[0].contractParams[0].value,
			utxoAmount,
			params.contractCalls[0].contractParams[1].value,
			params.contractCalls[0].contractParams[2].value,
			transaction.new_min_amount,
			renResponse.autogen.nhash,
			signature, "PARAMS")

	let args = [
					params.contractCalls[0].contractParams[0].value,
					utxoAmount,
					params.contractCalls[0].contractParams[1].value,
					params.contractCalls[0].contractParams[2].value,
					transaction.new_min_amount,
					renResponse.autogen.nhash,
					signature,
				]

	let txs = []
	txs.push(adapterContract[0].methods.mintThenDeposit(...args))
	// if(adapterContract.length == 2) {
	// 	let nonce = await adapterContract[1].methods.getNonce(state.default_account).call()
	// 	let chainID = await adapterContract[1].methods.getChainID().call()

	// 	let functionSignature = adapterContract[1].methods.mintThenDeposit(
	// 		...args
	// 	).encodeABI()

	// 	let message = 'Please sign this message to send the free meta transaction'
	// 	let messageToSign = `${message}${nonce}${chainID}`

	// 	let metaSignature = await web3.eth.personal.sign(messageToSign, state.default_account)

	// 	let {r, s, v} = helpers.getSignatureParameters(metaSignature)

	//     txs.unshift(
	//     	adapterContract[1].methods
	//     		.executeMetaTransaction(state.default_account, functionSignature, message, `${messageToSign.length}`, r, s, v),
	// 	)
	// }

	//refactor

	let receipt
	let dismissWaitStake
	// try {
	// 	throw new Error('Normal flow')
	// 	receipt = await new Promise((resolve, reject) => {
	// 		return txs[0].send({
	// 			from: state.default_account,
	// 			gasPrice: gasPriceStore.state.gasPriceWei,
	// 			gas: gas.adapter[transaction.pool].mintThenDeposit,
	// 		})
	// 		.once('transactionHash', hash => {
	// 			subscriptionStore.removeTxNotification(transaction.btcTxHash)

	// 			transaction.state = 12
	// 			transaction.ethTxHash = hash

	// 			upsertTx(transaction)

	// 			notifyHandler(hash)
	// 			if(transaction.stake) {
	// 				var { dismiss } = notifyNotification('Please wait for deposit transaction to confirm in order to stake')
	// 				dismissWaitStake = dismiss
	// 			}
	// 			//resolve(hash)
	// 		})
	// 		.on('receipt', receipt => {
	// 			//this.transactions = this.transactions.filter(t => t.id != id)
	// 			transaction.state = 14
	// 			transaction.ethTxHash = receipt.transactionHash
	// 			upsertTx(transaction)
	// 			resolve(receipt)
	// 		})
	// 		.on('error', err => {
	// 			if(![14, 17].includes(transaction.state)) {
	// 				transaction.state = 16;
	// 				upsertTx(transaction)
	// 			}
	// 			reject(err)
	// 		})
	// 		.catch(err => reject(err))
	// 	})
	// }
	// catch(err) {
	// 	errorStore.handleError(err)
	// 	console.error(err)
		try {
			//biconomy returned an error - rate limit? retry with normal web3 adapter contract
			//if(adapterContract.length == 2) {
				receipt = await new Promise((resolve, reject) => {
					return adapterContract[0].methods.mintThenDeposit(...args).send({
						from: state.default_account,
						gasPrice: gasPriceStore.state.gasPriceWei,
						gas: gas.adapter[transaction.pool].mintThenDeposit,
					})
					.once('transactionHash', hash => {
						subscriptionStore.removeTxNotification(transaction.btcTxHash)

						transaction.state = 12
						transaction.ethTxHash = hash

						upsertTx(transaction)

						notifyHandler(hash)
						if(transaction.stake) {
							var { dismiss } = notifyNotification('Please wait for deposit transaction to confirm in order to stake')
							dismissWaitStake = dismiss
						}
						//resolve(hash)
					})
					.on('receipt', receipt => {
						//this.transactions = this.transactions.filter(t => t.id != id)
						transaction.state = 14
						transaction.ethTxHash = receipt.transactionHash
						upsertTx(transaction)
						resolve(receipt)
					})
					.on('error', err => {
						if(![14, 17].includes(transaction.state)) {
							transaction.state = 16;
							upsertTx(transaction)
						}
						reject(err)
					})
					.catch(err => reject(err))
				})
			//}
		}
		catch(err) {
			errorStore.handleError(err)
			console.error(err)
		}
	//}

	common.update_fee_info()

	if(transaction.stake) {
		stakeTokens(transaction, receipt, dismissWaitStake)
	}

	common.update_fee_info()
 
	// subscriptionStore.removeTxNotification(transaction.btcTxHash)

	// transaction.state = 12
	// transaction.ethTxHash = txhash

	upsertTx(transaction)
}

export async function stakeTokens(transaction, receipt, dismissWaitStake) {
	//DepositMintedCurve
	let tokens
	if(dismissWaitStake) dismissWaitStake()
	if(!transaction.mintedTokens) {
		let mintData
		try {
			mintData = Object.values(receipt.events)
					.filter(event => event.raw.topics[0] == '0x0882f81e7e1d407c41100a8a53cd546a2f6ffff18d00dc1268ee70f1640932cc')[0].raw.data
		}
		catch(err) {
			console.error(err)
			mintData = Object.values(receipt.logs)
					.filter(event => event.topics[0] == '0x0882f81e7e1d407c41100a8a53cd546a2f6ffff18d00dc1268ee70f1640932cc')[0].data
		}
		tokens = BN(contract.web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256'], mintData)[1])
		transaction.mintedTokens = tokens
		upsertTx(transaction)
	}
	else {
		tokens = transaction.mintedTokens
	}
	tokens = BN(tokens)
    await helpers.setTimeoutPromise(100)
	let waitingMessage = `Please approve staking ${tokens.div(BN(1e18)).toFixed(8)} of your sCurve tokens`
    var { dismiss } = notifyNotification(waitingMessage)
	await common.ensure_stake_allowance(tokens);
    dismiss()
    waitingMessage = 'Please confirm stake transaction'
    var { dismiss: dismissConfirmStake } = notifyNotification(waitingMessage)
    await contract.curveRewards.methods.stake(tokens.toFixed(0,1)).send({
        from: state.default_account,
        gasPrice: gasPriceStore.state.gasPriceWei,
        gas: 400000,
    })
    .once('transactionHash', hash => {
        transaction.stakeTxHash = hash
        upsertTx(transaction)
        listenForReplacementStake(hash)
    	dismissConfirmStake()
        var { dismiss } = notifyNotification('Waiting for stake transaction to confirm: no further action needed')
        dismiss()
        notifyHandler(hash)


    })
    .on('receipt', receipt => {
    	transaction.state = 17
    	upsertTx(transaction)
    })
    .on('error', err => {
    	console.error(err)
    	errorStore.handleError(err)
    	notifyNotification('Staking failed, please stake manually')
    	dismiss()
    })
}

export async function burnSwap(data) {
	let precisions = 1e8
	if(data.from_currency == 2) precisions = 1e18

	await common.approveAmount(contract.coins[data.from_currency], 
		BN(data.fromInput).times(precisions), 
		state.default_account, contract.adapterContract._address, data.inf_approval)
    await helpers.setTimeoutPromise(100)

    console.log(contract.adapterContract._address, "THE ADDRESS")


	let args = [
		RenJS.utils.BTC.addressToHex(data.address),
		BN(data.fromInput).times(BN(precisions)).toFixed(0, 1),
		BN(data.toInputOriginal).times(0.97).toFixed(0, 1),
		data.from_currency,
	]

	if(contract.currentContract == 'ren') args = args.slice(0,-1)

	console.log(args, "THE ARGS")

	let tx = contract.adapterContract.methods.swapThenBurn(
			...args
		).send({
			from: state.default_account,
			gasPrice: gasPriceStore.state.gasPriceWei,
			gas: gas.adapter[contract.currentContract].swapThenBurn,
		})
	burn(tx, data.address, null, 0, data)
}

export async function removeLiquidityThenBurn(data) {
	await common.ensure_allowance_zap_out(data.amount, undefined, contract.adapterContract._address)

    await helpers.setTimeoutPromise(100)

	let args = [
		RenJS.utils.BTC.addressToHex(data.address),
		data.coinDestination,
		BN(data.amount).toFixed(0, 1),
		data.min_amounts,
	]

	if(contract.currentContract == 'ren') args = args.filter((_, i) => i != 1)

	let tx = contract.adapterContract.methods.removeLiquidityThenBurn(
		...args
	).send({
		from: state.default_account,
		gasPrice: gasPriceStore.state.gasPriceWei,
		gas: gas.adapter[contract.currentContract].removeLiquidityThenBurn,
	})

	burn(tx, data.address, data.renBTCAmount, 1, data)
}


export async function removeLiquidityImbalanceThenBurn(data) {
	await common.ensure_allowance_zap_out(data.max_burn_amount, undefined, contract.adapterContract._address)
    await helpers.setTimeoutPromise(100)

	let args = [
		RenJS.utils.BTC.addressToHex(data.address),
		data.coinDestination,
		data.amounts.map(amount => BN(amount).toFixed(0,1)),
		BN(data.max_burn_amount).toFixed(0, 1),
	]

	console.log(state.default_account, "DEFAULT ACCOUNT")

	if(contract.currentContract == 'ren') args = args.filter((_, i) => i != 1)

	let tx = contract.adapterContract.methods.removeLiquidityImbalanceThenBurn(
		...args
	).send({
		from: state.default_account,
		gasPrice: gasPriceStore.state.gasPriceWei,
		gas: gas.adapter[contract.currentContract].removeLiquidityImbalanceThenBurn,
	})

	burn(tx, data.address, data.renBTCAmount, 2, data)
}

export async function removeLiquidityOneCoinThenBurn(data) {
	await common.ensure_allowance_zap_out(data.token_amounts, undefined, contract.adapterContract._address)
    await helpers.setTimeoutPromise(100)

	let args = [
		RenJS.utils.BTC.addressToHex(data.address),
		BN(data.token_amounts).toFixed(0,1),
		BN(data.min_amount).toFixed(0, 1),
		0,
	]

	if(contract.currentContract == 'ren') args = args.slice(0, -1)

	let tx = contract.adapterContract.methods.removeLiquidityOneCoinThenBurn(
		...args
	).send({
		from: state.default_account,
		gasPrice: gasPriceStore.state.gasPriceWei,
		gas: gas.adapter[contract.currentContract].removeLiquidityOneCoinThenBurn,
	})

	burn(tx, data.address, data.renBTCAmount, 3, data)
}


export async function burn(burn, address, renBTCAmount, burnType, data) {
	let id = helpers.generateID();
	let txhash = await new Promise(async (resolve, reject) => {
		await burn
		.once('transactionHash', hash => {
			data.dismiss()
			notifyHandler(hash)
			resolve(hash)
		})
		.once('receipt', receipt => {
			let transaction = state.transactions.find(t => t.id == id)
			listenForBurn(transaction.id)
			let startBlockNumber = receipt.blockNumber
			if(transaction.confirmations > 0) return;
			transaction.confirmations = 1
			transaction.state = 31;
			transaction.ethStartBlock = startBlockNumber
			upsertTx(transaction)
			// let subscription = web3.eth.subscribe('newBlockHeaders')
			// 	.on('data', block => {
			// 		if(transaction.confirmations >= 30) {
			// 			return
			// 			//subscription.unsubcribe()
			// 		}
			// 		transaction.confirmations = block.number - transaction.ethStartBlock + 1
			// 		transaction.ethCurrentBlock = block.number
			// 		transaction.state = 30 + transaction.confirmations
			// 		console.log("NEW TX RECEIPT", transaction)
			// 		upsertTx(transaction)
			// 	})
		})
		.on('error', (err, receipt) => {
			errorStore.handleError(err)
			data.dismiss()
			txFailed(receipt.transactionHash)
		})
		.catch(err => {
			errorStore.handleError(err)
			reject(err)
		})
	})
	listenForReplacement(txhash)
	state.transactions.unshift({
		id: id,
		fromInput: renBTCAmount,
		fromAddress: contract.default_account,
		timestamp: Date.now(),
		pool: contract.currentContract,
		type: 1,
		burnType: burnType,
		from_currency: data.from_currency,
		gatewayAddress: address,
		confirmations: 'Started',
		state: 30,
		ethTxHash: txhash,
	})
	let tx = state.transactions[0]
	upsertTx(tx)
}

async function checkForFailed(transactions) {
	transactions = transactions.filter(t => t.ethTxHash && ![14, 15, 17, 65].includes(t.state))
	let receipts = await Promise.all(transactions.map(t => contract.web3.eth.getTransactionReceipt(t.ethTxHash)))
	receipts = receipts.filter(receipt => receipt && receipt.blockNumber !== null)
	for(let receipt of receipts) {
		if(receipt == null) {
			transaction.state = 16
		}
		else if(receipt.status === false) {
			txFailed(receipt.transactionHash)
		}
		else {
			let transaction = state.transactions.find(t => t.ethTxHash == receipt.transactionHash)
			if([0,3].includes(transaction)) transaction.state = 14
			else transaction.state = 61
			upsertTx(transaction)
		}
	}
}

async function resumeStakeTransactions(transactions) {
	transactions = transactions.filter(t => t.stake && t.ethTxHash && !t.mintedTokens && t.state == 14)
	let receipts = await Promise.all(transactions.map(t => contract.web3.eth.getTransactionReceipt(t.ethTxHash)))
	receipts = receipts.filter(receipt => receipt && receipt.blockNumber !== null)
	for(let receipt of receipts) {
		let transaction = state.transactions.find(t => t.ethTxHash == receipt.transactionHash)
		if(receipt == null) {
			transaction.state = 16
		}
		else if(receipt.status === false) {
			transaction.state = 14
		}
		else {
			stakeTokens(transaction, receipt)
		}
		upsertTx(transaction)
	}
}

async function checkForFailedStake(transactions) {
	transactions = transactions.filter(t => t.stakeTxHash && t.state != 17)
	let receipts = await Promise.all(transactions.map(t => contract.web3.eth.getTransactionReceipt(t.stakeTxHash)))
	receipts = receipts.filter(receipt => receipt && receipt.blockNumber !== null)
	for(let receipt of receipts) {
		let transaction = state.transactions.find(t => t.stakeTxHash == receipt.transactionHash)
		if(receipt == null) {
			transaction.state = 16
		}
		else if(receipt.status === false) {
			transaction.state = 14
		}
		else {
			transaction.state = 17
		}
		upsertTx(transaction)
	}
}

async function txFailed(txhash) {
	let transaction = state.transactions.find(t => t.ethTxHash == txhash)
	transaction.state = 66
	upsertTx(transaction)
}

export async function resubmit(transaction) {
	if(transaction.type == 0) mintThenSwap(transaction)
	if(transaction.type == 3 && transaction.mintedTokens) stakeTokens(transaction)
	if(transaction.type == 3 && !transaction.mintedTokens) mintThenDeposit(transaction)
	if(transaction.type == 1 && transaction.burnType == 1) removeLiquidityThenBurn(transaction)
	if(transaction.type == 1 && transaction.burnType == 2) removeLiquidityImbalanceThenBurn(transaction)
	if(transaction.type == 1 && transaction.burnType == 3) removeLiquidityOneCoinThenBurn(transaction)
}

export async function listenForReplacement(txhash) {
	let { emitter } = blocknative.transaction(txhash)
	emitter.on('txSpeedUp', async transaction => {
		console.log("SPEED UP", transaction)
		console.log(transaction.originalHash, "ORIGINAL HASH", transaction.hash, "NEW HASH")
		notifyHandler(transaction.hash)
		let tx = state.transactions.find(t => t.ethTxHash == transaction.originalHash)
		// await removeTx(tx)
		// tx.removed = false
		tx.ethTxHash = transaction.hash
		tx.ethStartBlock = +transaction.blockNumber
		if(tx.type == 1) tx.state = 30
		else tx.state = 12
		tx.confirmations = 0
		resumeStakeTransactions([tx])
		console.log(tx.confirmations, "THE SPEED UP CONFIRMATIONS")
		upsertTx(tx)
		state.transactions.unshift(tx)
	})
	emitter.on('txConfirmed', async transaction => {
		console.log('TRANSACTION CONFIRMED', transaction)
		let tx = state.transactions.find(t => t.ethTxHash == transaction.hash)
		tx.ethStartBlock = +transaction.blockNumber
		tx.confirmations = 1
		if(tx.type == 1) tx.state = 31
		else tx.state = 14
		upsertTx(tx)
	})
	emitter.on('txFailed', transaction => txFailed(transaction.hash))
}

export function listenForReplacementStake(txhash) {
	let { emitter } = blocknative.transaction(txhash)
	emitter.on('txSpeedUp', async transaction => {
		notifyHandler(transaction.hash)
		let tx = state.transactions.find(t => t.stakeTxHash == transaction.originalHash)
		tx.stakeTxHash = transaction.hash
		upsertTx(tx)
	})
	emitter.on('txConfirmed', async transaction => {
		common.update_fee_info()
		let tx = state.transactions.find(t => t.stakeTxHash == transaction.hash)
		tx.state = 17
		upsertTx(tx)
	})
}

export async function listenForBurn(id) {

	let tx = state.transactions.find(t => t.id == id)
	if(tx.state == 66) return;
	console.log(tx.state, "TX STATE")
	console.log(tx.ethTxHash, "TX HASH")
	let burn = await sdk.burnAndRelease({
	 	sendToken: RenJS.Tokens.BTC.Eth2Btc,

	    // The web3 provider to talk to Ethereum
	    web3Provider: web3.currentProvider,

	    // The transaction hash of our contract call
	    ethereumTxHash: tx.ethTxHash,
	}).readFromEthereum()
	if(tx.confirmations >= 30) {
		tx.state = 61
		upsertTx(tx)
	}
	let promiEvent = await burn.submit()
	.on('txHash', hash => {
		let tx = state.transactions.find(t => t.id == id)
		console.log(hash, 'txHash event from ren')
		subscriptionStore.removeTxNotification(tx.ethTxHash)
		tx.renVMHash = hash
		//tx.state = 62
		upsertTx(tx)
	})
	.on('status', status => {
		console.log(status, "NEW STATUS")
		let tx = state.transactions.find(t => t.id == id)
		if(status == 'confirming' && tx.state >= 61) {
			tx.confirmations = "Confirming"
			tx.state = 62
			upsertTx(tx)
		}
		if(status == 'pending') {
			tx.confirmations = "Pending"
			tx.state = 63
			upsertTx(tx)
		}
		if(status == 'executing') {
			tx.confirmations = "Executing"
			tx.state = 64
			upsertTx(tx)
		}
		console.log(status)
	})
	console.log("BURN SUBMITTED")
	tx.state = 65
	tx.confirmations = "Done"
	upsertTx(tx)

	// setInterval(async () => {
	// 	console.log("BURN LOG")
	// 	let res = await burn.queryTx()
	// 	console.log(res, "BURN RES")
	// 	if(res.txStatus.toLowerCase() == 'confirming') tx.state = 12
	// 	if(res.txStatus.toLowerCase() == 'done' || res.txStatus.toLowerCase() == 'confirmed') tx.state = 13
	// 	tx.confirmations = res.txStatus
	// 	this.upsertTx(tx)
	// }, 1000)
}