import * as helpers from '../../utils/helpers'

export let state = {
	btcPrice: null,
}

export async function getBTCPrice() {
	let req = await helpers.retry(fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`), 300);
    let res = await req.json();
    state.btcPrice = res.bitcoin.usd;
    return res.bitcoin.usd
}