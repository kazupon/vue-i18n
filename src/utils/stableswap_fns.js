import Decimal from 'break_infinity.js'

let BN = (val) => new Decimal(val)

const fcopy = (n) => new BN(n.toFixed());

let calc = ({
	N_COINS,
	PRECISION_MUL,
	USE_LENDING,
	LENDING_PRECISION,
	PRECISION,
	A,
	fee,
	admin_fee,
	supply,
	virtual_price,
	timestamp,
	balances,
	rates,
}) => {

	const ZERO = BN(0);
	const ONE = BN(1);

	const FEE_DENOMINATOR = 10 ** 10;

	function _stored_rates() {
		let result = PRECISION_MUL;
		let use_lending = USE_LENDING;

	}

	function get_D(xp) {
		let S = ZERO
		for (let _x of xp)
		    S = S.plus(_x)
		if (S == 0)
		    return ZERO

		let Dprev = ZERO
		let D = fcopy(S)
		let Ann = BN(A).times(N_COINS)
		let Annsub = Ann.minus(1)
		for (let _i = 0; _i < 255; _i++) {
		    let D_P = fcopy(D);
		    for (let _x of xp) {
		    	let c1 = D_P.times(D);
		    	let c2 = _x.times(BN(N_COINS))
		    	let c3 = c2.plus(ONE)
		    	D_P = c1.div(c3)
		        //D_P = D_P.times(D).div((_x.times(N_COINS).plus(ONE)))
		    }
		    Dprev = fcopy(D)
		    let d1 = Ann.times(S);
		    let d2 = D_P.times(BN(N_COINS))
		    let d3 = d1.plus(d2);
		    let d4 = d3.times(D);

		    let d5 = Annsub.times(D);
		    let d6 = BN(N_COINS + 1).times(D_P)
		    let d7 = d5.plus(d6)
		    D = d4.div(d7);
		    if (D.gt(Dprev))
		        if ((D.minus(Dprev)).lte(BN(1)))
		            break
		    else
		        if ((Dprev.minus(D)).lte(BN(1)))
		            break
	    }
		return D
	}

	function get_y(i, j, x, _xp) {

	    //if(! ((i != j) && (i >= 0) && (j >= 0) && (i < N_COINS) && (j < N_COINS))) throw new Error('get y assert failed')

	    let D = get_D(_xp)
	    let c = fcopy(D)
	    let S_ = ZERO
	    let Ann = BN(A).times(BN(N_COINS))

	    let _x = ZERO
	    for (let _i = 0; _i < N_COINS; _i++) {
	        if (_i == i)
	            _x = x
	        else if (_i != j)
	            _x = _xp[_i]
	        else
	            continue
	        S_ = S_.plus(_x)
	        c = c.times(D)
        		.div(
        				_x.times(BN(N_COINS))
        			)
	    }
	    c = c.times(D)
	    	.div(Ann.times(N_COINS))
	    let b = S_.plus(
	    		D.div(Ann)
	    	)
	    let y_prev = ZERO
	    let y = fcopy(D)
	    for (let _i = 0; _i < 255; _i++) {
	        y_prev = fcopy(y)
	        let y1 = y.times(y)
	        let y2 = y1.plus(c)

	        let y3 = BN(2).times(y)
	        let y4 = y3.plus(b).minus(D)

	        y = y2.div(y4)

	        if (y.gt(y_prev))
	            if ((y.minus(y_prev)).lte(BN(1)))
	                break
	        else
	            if ((y_prev.minus(y)).lte(BN(1)))
	                break
        }
	    return y
	}

	function _xp(rates) {
		let result = rates.map(rate=>BN(rate))
		for(let i = 0; i < N_COINS; i++) {
			result[i] = result[i].times(BN(balances[i])).div(PRECISION);
		}
		return result;
	}

	function get_dy(i, j, dx, usefee = false) {
		let precisions = PRECISION_MUL.map(p=>BN(p));
		let currentRates = rates.map((r,i) => BN(r).times(precisions[i]))
		let xp = _xp(currentRates);
		let x = xp[i].plus(BN(dx).times(currentRates[i]).div(PRECISION))
		let y = get_y(i, j, x, xp)
		let dy = (xp[j].minus(y)).times(PRECISION).div(currentRates[j])
		let _fee = BN(fee).times(dy).div(FEE_DENOMINATOR)
		if(!usefee) _fee = ZERO
		console.log(+dy.minus(_fee))
		return dy.minus(_fee);
	}

	function get_dy_underlying(i, j, dx, usefee = false) {
		let precisions = PRECISION_MUL.map(p=>BN(p));
		let currentRates = rates.map((r,i) => BN(r).times(precisions[i]))
		let xp = _xp(currentRates);
		let x = xp[i].plus(BN(dx).times(precisions[i]));
		let y = get_y(i, j, x, xp);
		let dy = (xp[j].minus(y)).div(precisions[j])
		let _fee = BN(fee).times(dy).div(FEE_DENOMINATOR)
		if(!usefee) _fee = ZERO
		return dy.minus(_fee);
	}

/*	function get_dx_underlying(i, j, dy) {
		let precisions = PRECISION_MUL.map(p=>BN(p));
		rates = rates.map((r,i) => BN(r).times(precisions[i]))
		let xp = _xp(rates);
		let y = xp[j].minus(BN(dy)).times(precisions[j]);
		let x = get_y(j, i, y, xp);
		let dx = (x.minus(xp[i])).div(precisions[i])
		return dx;
	}*/

	return {
		get_dy_underlying,
		get_dy,
		_xp,
		//get_dx_underlying,
	}
}


export default calc