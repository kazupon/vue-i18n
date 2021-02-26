export var infura_url = 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b'
export let multicall_address = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
export let multicall_abi = [{"constant":true,"inputs":[],"name":"getCurrentBlockTimestamp","outputs":[{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"name":"target","type":"address"},{"name":"callData","type":"bytes"}],"name":"calls","type":"tuple[]"}],"name":"aggregate","outputs":[{"name":"blockNumber","type":"uint256"},{"name":"returnData","type":"bytes[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLastBlockHash","outputs":[{"name":"blockHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getEthBalance","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentBlockDifficulty","outputs":[{"name":"difficulty","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentBlockGasLimit","outputs":[{"name":"gaslimit","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentBlockCoinbase","outputs":[{"name":"coinbase","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"getBlockHash","outputs":[{"name":"blockHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]
export const ERC20_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

export const cERC20_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x06fdde03"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"constant":false,"inputs":[{"name":"repayAmount","type":"uint256"}],"name":"repayBorrow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0e752702"},{"constant":true,"inputs":[],"name":"reserveFactorMantissa","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x173b9904"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"borrowBalanceCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x17bfdfbc"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x18160ddd"},{"constant":true,"inputs":[],"name":"exchangeRateStored","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x182df0f5"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"},{"constant":false,"inputs":[{"name":"borrower","type":"address"},{"name":"repayAmount","type":"uint256"}],"name":"repayBorrowBehalf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x2608f818"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x26782247"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x313ce567"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOfUnderlying","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x3af9e669"},{"constant":true,"inputs":[],"name":"getCash","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x3b1d21a2"},{"constant":false,"inputs":[{"name":"newComptroller","type":"address"}],"name":"_setComptroller","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x4576b5db"},{"constant":true,"inputs":[],"name":"totalBorrows","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x47bd3718"},{"constant":true,"inputs":[],"name":"comptroller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x5fe3b567"},{"constant":false,"inputs":[{"name":"reduceAmount","type":"uint256"}],"name":"_reduceReserves","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x601a0bf1"},{"constant":true,"inputs":[],"name":"initialExchangeRateMantissa","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x675d972c"},{"constant":true,"inputs":[],"name":"accrualBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6c540baf"},{"constant":true,"inputs":[],"name":"underlying","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6f307dc3"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x70a08231"},{"constant":false,"inputs":[],"name":"totalBorrowsCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x73acee98"},{"constant":false,"inputs":[{"name":"redeemAmount","type":"uint256"}],"name":"redeemUnderlying","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x852a12e3"},{"constant":true,"inputs":[],"name":"totalReserves","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8f840ddd"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x95d89b41"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"borrowBalanceStored","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x95dd9193"},{"constant":false,"inputs":[{"name":"mintAmount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa0712d68"},{"constant":false,"inputs":[],"name":"accrueInterest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa6afed95"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa9059cbb"},{"constant":true,"inputs":[],"name":"borrowIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xaa5af0fd"},{"constant":true,"inputs":[],"name":"supplyRatePerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xae9d70b0"},{"constant":false,"inputs":[{"name":"liquidator","type":"address"},{"name":"borrower","type":"address"},{"name":"seizeTokens","type":"uint256"}],"name":"seize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb2a02ff1"},{"constant":false,"inputs":[{"name":"newPendingAdmin","type":"address"}],"name":"_setPendingAdmin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb71d1a0c"},{"constant":false,"inputs":[],"name":"exchangeRateCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xbd6d894d"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getAccountSnapshot","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc37f68e2"},{"constant":false,"inputs":[{"name":"borrowAmount","type":"uint256"}],"name":"borrow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xc5ebeaec"},{"constant":false,"inputs":[{"name":"redeemTokens","type":"uint256"}],"name":"redeem","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xdb006a75"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xdd62ed3e"},{"constant":false,"inputs":[],"name":"_acceptAdmin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xe9c714f2"},{"constant":false,"inputs":[{"name":"newInterestRateModel","type":"address"}],"name":"_setInterestRateModel","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf2b3abbd"},{"constant":true,"inputs":[],"name":"interestRateModel","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xf3fdb15a"},{"constant":false,"inputs":[{"name":"borrower","type":"address"},{"name":"repayAmount","type":"uint256"},{"name":"cTokenCollateral","type":"address"}],"name":"liquidateBorrow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf5e3c462"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xf851a440"},{"constant":true,"inputs":[],"name":"borrowRatePerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xf8f9da28"},{"constant":false,"inputs":[{"name":"newReserveFactorMantissa","type":"uint256"}],"name":"_setReserveFactor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xfca7820b"},{"constant":true,"inputs":[],"name":"isCToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xfe9c44ae"},{"inputs":[{"name":"underlying_","type":"address"},{"name":"comptroller_","type":"address"},{"name":"interestRateModel_","type":"address"},{"name":"initialExchangeRateMantissa_","type":"uint256"},{"name":"name_","type":"string"},{"name":"symbol_","type":"string"},{"name":"decimals_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"interestAccumulated","type":"uint256"},{"indexed":false,"name":"borrowIndex","type":"uint256"},{"indexed":false,"name":"totalBorrows","type":"uint256"}],"name":"AccrueInterest","type":"event","signature":"0x875352fb3fadeb8c0be7cbbe8ff761b308fa7033470cd0287f02f3436fd76cb9"},{"anonymous":false,"inputs":[{"indexed":false,"name":"minter","type":"address"},{"indexed":false,"name":"mintAmount","type":"uint256"},{"indexed":false,"name":"mintTokens","type":"uint256"}],"name":"Mint","type":"event","signature":"0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f"},{"anonymous":false,"inputs":[{"indexed":false,"name":"redeemer","type":"address"},{"indexed":false,"name":"redeemAmount","type":"uint256"},{"indexed":false,"name":"redeemTokens","type":"uint256"}],"name":"Redeem","type":"event","signature":"0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929"},{"anonymous":false,"inputs":[{"indexed":false,"name":"borrower","type":"address"},{"indexed":false,"name":"borrowAmount","type":"uint256"},{"indexed":false,"name":"accountBorrows","type":"uint256"},{"indexed":false,"name":"totalBorrows","type":"uint256"}],"name":"Borrow","type":"event","signature":"0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80"},{"anonymous":false,"inputs":[{"indexed":false,"name":"payer","type":"address"},{"indexed":false,"name":"borrower","type":"address"},{"indexed":false,"name":"repayAmount","type":"uint256"},{"indexed":false,"name":"accountBorrows","type":"uint256"},{"indexed":false,"name":"totalBorrows","type":"uint256"}],"name":"RepayBorrow","type":"event","signature":"0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1"},{"anonymous":false,"inputs":[{"indexed":false,"name":"liquidator","type":"address"},{"indexed":false,"name":"borrower","type":"address"},{"indexed":false,"name":"repayAmount","type":"uint256"},{"indexed":false,"name":"cTokenCollateral","type":"address"},{"indexed":false,"name":"seizeTokens","type":"uint256"}],"name":"LiquidateBorrow","type":"event","signature":"0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldPendingAdmin","type":"address"},{"indexed":false,"name":"newPendingAdmin","type":"address"}],"name":"NewPendingAdmin","type":"event","signature":"0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldAdmin","type":"address"},{"indexed":false,"name":"newAdmin","type":"address"}],"name":"NewAdmin","type":"event","signature":"0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldComptroller","type":"address"},{"indexed":false,"name":"newComptroller","type":"address"}],"name":"NewComptroller","type":"event","signature":"0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldInterestRateModel","type":"address"},{"indexed":false,"name":"newInterestRateModel","type":"address"}],"name":"NewMarketInterestRateModel","type":"event","signature":"0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldReserveFactorMantissa","type":"uint256"},{"indexed":false,"name":"newReserveFactorMantissa","type":"uint256"}],"name":"NewReserveFactor","type":"event","signature":"0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"},{"indexed":false,"name":"reduceAmount","type":"uint256"},{"indexed":false,"name":"newTotalReserves","type":"uint256"}],"name":"ReservesReduced","type":"event","signature":"0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e"},{"anonymous":false,"inputs":[{"indexed":false,"name":"error","type":"uint256"},{"indexed":false,"name":"info","type":"uint256"},{"indexed":false,"name":"detail","type":"uint256"}],"name":"Failure","type":"event","signature":"0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"}]

export const yERC20_abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"aave","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aaveToken","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"approveToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"apr","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceAave","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceCompound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceCompoundInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceDydx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceFulcrum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceFulcrumInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"calcPoolValueInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"compound","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"dydx","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fulcrum","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAave","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAaveCore","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"provider","outputs":[{"internalType":"enum yUSDT.Lender","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"rebalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"recommend","outputs":[{"internalType":"enum yUSDT.Lender","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_APR","type":"address"}],"name":"set_new_APR","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_COMPOUND","type":"address"}],"name":"set_new_COMPOUND","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_new_DTOKEN","type":"uint256"}],"name":"set_new_DTOKEN","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_FULCRUM","type":"address"}],"name":"set_new_FULCRUM","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyAave","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyCompound","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyDydx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyFulcrum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

export const synthERC20_abi = [{"constant":true,"inputs":[],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_integrationProxy","type":"address"}],"name":"setIntegrationProxy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"initiationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"setSelfDestructBeneficiary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DECIMALS","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"terminateSelfDestruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_resolver","type":"address"}],"name":"setResolverAndSyncCache","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_resolver","type":"address"}],"name":"isResolverCached","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_proxy","type":"address"}],"name":"setProxy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"selfDestruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"integrationProxy","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenState","type":"address"}],"name":"setTokenState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"SELFDESTRUCT_DELAY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getResolverAddressesRequired","outputs":[{"name":"addressesRequired","type":"bytes32[24]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferAndSettle","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"selfDestructInitiated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"}],"name":"setMessageSender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initiateSelfDestruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"selfDestructBeneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"resolverAddressesRequired","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"messageSender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currencyKey","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_ADDRESSES_FROM_RESOLVER","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFromAndSettle","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenState","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FEE_ADDRESS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proxy","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setTotalSupply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"transferableSynths","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_proxy","type":"address"},{"name":"_tokenState","type":"address"},{"name":"_tokenName","type":"string"},{"name":"_tokenSymbol","type":"string"},{"name":"_owner","type":"address"},{"name":"_currencyKey","type":"bytes32"},{"name":"_totalSupply","type":"uint256"},{"name":"_resolver","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Issued","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newTokenState","type":"address"}],"name":"TokenStateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proxyAddress","type":"address"}],"name":"ProxyUpdated","type":"event"},{"anonymous":false,"inputs":[],"name":"SelfDestructTerminated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beneficiary","type":"address"}],"name":"SelfDestructed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"selfDestructDelay","type":"uint256"}],"name":"SelfDestructInitiated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newBeneficiary","type":"address"}],"name":"SelfDestructBeneficiaryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"}]

var compound = {
N_COINS: 2,
coin_precisions: [1e18, 1e6],
wrapped_precisions: [1e8, 1e8],
use_lending: [true, true],
is_plain: [false, false],
old_swap_address: '0x2e60CF74d81ac34eB21eEff58Db4D385920ef419',
swap_address: '0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56',
token_address: '0x845838DF265Dcd2c412A1Dc9e959c7d08537f8a2',
old_token_address: '0x3740fb63ab7a09891d7c0d4299442A551D06F5fD',
migration_address: '0x54Ee22d5593FC76fB20EafAb66C45aAb3268B800',
infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
underlying_coins: [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',],
coins: [
        '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
        '0x39AA39c021dfbaE8faC545936693aC917d5E7563',],
deposit_address: '0xeB21209ae4C2c9FF2a86ACA31E123764A3B6Bc06',
deposit_abi: [
 {
  "outputs": [],
  "inputs": [
   {
    "type": "address[2]",
    "name": "_coins"
   },
   {
    "type": "address[2]",
    "name": "_underlying_coins"
   },
   {
    "type": "address",
    "name": "_curve"
   },
   {
    "type": "address",
    "name": "_token"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "constructor"
 },
 {
  "name": "add_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "uamounts"
   },
   {
    "type": "uint256",
    "name": "min_mint_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 117283
 },
 {
  "name": "remove_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_amount"
   },
   {
    "type": "uint256[2]",
    "name": "min_uamounts"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 83606
 },
 {
  "name": "remove_liquidity_imbalance",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "uamounts"
   },
   {
    "type": "uint256",
    "name": "max_burn_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 96829
 },
 {
  "name": "calc_withdraw_one_coin",
  "outputs": [
   {
    "type": "uint256",
    "name": ""
   }
  ],
  "inputs": [
   {
    "type": "uint256",
    "name": "_token_amount"
   },
   {
    "type": "int128",
    "name": "i"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2945630
 },
 {
  "name": "remove_liquidity_one_coin",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_token_amount"
   },
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "uint256",
    "name": "min_uamount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function"
 },
 {
  "name": "remove_liquidity_one_coin",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_token_amount"
   },
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "uint256",
    "name": "min_uamount"
   },
   {
    "type": "bool",
    "name": "donate_dust"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function"
 },
 {
  "name": "withdraw_donated_dust",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 63973
 },
 {
  "name": "coins",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1680
 },
 {
  "name": "underlying_coins",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1710
 },
 {
  "name": "curve",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1541
 },
 {
  "name": "token",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1571
 }
],

migration_abi: [
 {
  "outputs": [],
  "inputs": [
   {
    "type": "address",
    "name": "_old"
   },
   {
    "type": "address",
    "name": "_old_token"
   },
   {
    "type": "address",
    "name": "_new"
   },
   {
    "type": "address",
    "name": "_new_token"
   },
   {
    "type": "address[2]",
    "name": "_coins"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "constructor"
 },
 {
  "name": "migrate",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 106812
 },
 {
  "name": "coins",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1380
 }
],

swap_abi: [
 {
  "name": "TokenExchange",
  "inputs": [
   {
    "type": "address",
    "name": "buyer",
    "indexed": true
   },
   {
    "type": "int128",
    "name": "sold_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_sold",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "bought_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_bought",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "TokenExchangeUnderlying",
  "inputs": [
   {
    "type": "address",
    "name": "buyer",
    "indexed": true
   },
   {
    "type": "int128",
    "name": "sold_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_sold",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "bought_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_bought",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "AddLiquidity",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256[2]",
    "name": "fees",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "invariant",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "RemoveLiquidity",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256[2]",
    "name": "fees",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "RemoveLiquidityImbalance",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256[2]",
    "name": "fees",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "invariant",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "CommitNewAdmin",
  "inputs": [
   {
    "type": "uint256",
    "name": "deadline",
    "indexed": true,
    "unit": "sec"
   },
   {
    "type": "address",
    "name": "admin",
    "indexed": true
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "NewAdmin",
  "inputs": [
   {
    "type": "address",
    "name": "admin",
    "indexed": true
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "CommitNewParameters",
  "inputs": [
   {
    "type": "uint256",
    "name": "deadline",
    "indexed": true,
    "unit": "sec"
   },
   {
    "type": "uint256",
    "name": "A",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "fee",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "admin_fee",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "NewParameters",
  "inputs": [
   {
    "type": "uint256",
    "name": "A",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "fee",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "admin_fee",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "outputs": [],
  "inputs": [
   {
    "type": "address[2]",
    "name": "_coins"
   },
   {
    "type": "address[2]",
    "name": "_underlying_coins"
   },
   {
    "type": "address",
    "name": "_pool_token"
   },
   {
    "type": "uint256",
    "name": "_A"
   },
   {
    "type": "uint256",
    "name": "_fee"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "constructor"
 },
 {
  "name": "get_virtual_price",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1084167
 },
 {
  "name": "calc_token_amount",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "bool",
    "name": "deposit"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 4239939
 },
 {
  "name": "add_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "uint256",
    "name": "min_mint_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 6479997
 },
 {
  "name": "get_dy",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2543681
 },
 {
  "name": "get_dx",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dy"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2543687
 },
 {
  "name": "get_dy_underlying",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2543506
 },
 {
  "name": "get_dx_underlying",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dy"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2543512
 },
 {
  "name": "exchange",
  "outputs": [],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   },
   {
    "type": "uint256",
    "name": "min_dy"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 5184573
 },
 {
  "name": "exchange_underlying",
  "outputs": [],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   },
   {
    "type": "uint256",
    "name": "min_dy"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 5200817
 },
 {
  "name": "remove_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_amount"
   },
   {
    "type": "uint256[2]",
    "name": "min_amounts"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 153898
 },
 {
  "name": "remove_liquidity_imbalance",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "uint256",
    "name": "max_burn_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 6479708
 },
 {
  "name": "commit_new_parameters",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "amplification"
   },
   {
    "type": "uint256",
    "name": "new_fee"
   },
   {
    "type": "uint256",
    "name": "new_admin_fee"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 146105
 },
 {
  "name": "apply_new_parameters",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 133512
 },
 {
  "name": "revert_new_parameters",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 21835
 },
 {
  "name": "commit_transfer_ownership",
  "outputs": [],
  "inputs": [
   {
    "type": "address",
    "name": "_owner"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 74512
 },
 {
  "name": "apply_transfer_ownership",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 60568
 },
 {
  "name": "revert_transfer_ownership",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 21925
 },
 {
  "name": "withdraw_admin_fees",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 12831
 },
 {
  "name": "kill_me",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 37878
 },
 {
  "name": "unkill_me",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 22015
 },
 {
  "name": "coins",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2190
 },
 {
  "name": "underlying_coins",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2220
 },
 {
  "name": "balances",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2250
 },
 {
  "name": "A",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2081
 },
 {
  "name": "fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2111
 },
 {
  "name": "admin_fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2141
 },
 {
  "name": "owner",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2171
 },
 {
  "name": "admin_actions_deadline",
  "outputs": [
   {
    "type": "uint256",
    "unit": "sec",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2201
 },
 {
  "name": "transfer_ownership_deadline",
  "outputs": [
   {
    "type": "uint256",
    "unit": "sec",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2231
 },
 {
  "name": "future_A",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2261
 },
 {
  "name": "future_fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2291
 },
 {
  "name": "future_admin_fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2321
 },
 {
  "name": "future_owner",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2351
 }
],



old_swap_abi: [
 {
  "name": "TokenExchange",
  "inputs": [
   {
    "type": "address",
    "name": "buyer",
    "indexed": true
   },
   {
    "type": "int128",
    "name": "sold_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_sold",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "bought_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_bought",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "TokenExchangeUnderlying",
  "inputs": [
   {
    "type": "address",
    "name": "buyer",
    "indexed": true
   },
   {
    "type": "int128",
    "name": "sold_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_sold",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "bought_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_bought",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "AddLiquidity",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "invariant",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "RemoveLiquidity",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256[2]",
    "name": "fees",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "invariant",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "CommitNewAdmin",
  "inputs": [
   {
    "type": "uint256",
    "name": "deadline",
    "indexed": true,
    "unit": "sec"
   },
   {
    "type": "address",
    "name": "admin",
    "indexed": true
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "NewAdmin",
  "inputs": [
   {
    "type": "address",
    "name": "admin",
    "indexed": true
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "CommitNewParameters",
  "inputs": [
   {
    "type": "uint256",
    "name": "deadline",
    "indexed": true,
    "unit": "sec"
   },
   {
    "type": "int128",
    "name": "A",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "fee",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "admin_fee",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "NewParameters",
  "inputs": [
   {
    "type": "int128",
    "name": "A",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "fee",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "admin_fee",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "outputs": [],
  "inputs": [
   {
    "type": "address[2]",
    "name": "_coins"
   },
   {
    "type": "address[2]",
    "name": "_underlying_coins"
   },
   {
    "type": "address",
    "name": "_pool_token"
   },
   {
    "type": "int128",
    "name": "_A"
   },
   {
    "type": "int128",
    "name": "_fee"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "constructor"
 },
 {
  "name": "get_virtual_price",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1083195
 },
 {
  "name": "add_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "uint256",
    "unit": "sec",
    "name": "deadline"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 2266965
 },
 {
  "name": "get_dy",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2540055
 },
 {
  "name": "get_dy_underlying",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2540024
 },
 {
  "name": "exchange",
  "outputs": [],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   },
   {
    "type": "uint256",
    "name": "min_dy"
   },
   {
    "type": "uint256",
    "unit": "sec",
    "name": "deadline"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 1000000
 },
 {
  "name": "exchange_underlying",
  "outputs": [],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   },
   {
    "type": "uint256",
    "name": "min_dy"
   },
   {
    "type": "uint256",
    "unit": "sec",
    "name": "deadline"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 1000000
 },
 {
  "name": "remove_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_amount"
   },
   {
    "type": "uint256",
    "unit": "sec",
    "name": "deadline"
   },
   {
    "type": "uint256[2]",
    "name": "min_amounts"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 1220465
 },
 {
  "name": "remove_liquidity_imbalance",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "uint256",
    "unit": "sec",
    "name": "deadline"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 2346381
 },
 {
  "name": "commit_new_parameters",
  "outputs": [],
  "inputs": [
   {
    "type": "int128",
    "name": "amplification"
   },
   {
    "type": "int128",
    "name": "new_fee"
   },
   {
    "type": "int128",
    "name": "new_admin_fee"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 146017
 },
 {
  "name": "apply_new_parameters",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 133362
 },
 {
  "name": "revert_new_parameters",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 21685
 },
 {
  "name": "commit_transfer_ownership",
  "outputs": [],
  "inputs": [
   {
    "type": "address",
    "name": "_owner"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 74362
 },
 {
  "name": "apply_transfer_ownership",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 60418
 },
 {
  "name": "revert_transfer_ownership",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 21775
 },
 {
  "name": "withdraw_admin_fees",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 12403
 },
 {
  "name": "coins",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2040
 },
 {
  "name": "underlying_coins",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2070
 },
 {
  "name": "balances",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2100
 },
 {
  "name": "A",
  "outputs": [
   {
    "type": "int128",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1931
 },
 {
  "name": "fee",
  "outputs": [
   {
    "type": "int128",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1961
 },
 {
  "name": "admin_fee",
  "outputs": [
   {
    "type": "int128",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1991
 },
 {
  "name": "owner",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2021
 },
 {
  "name": "admin_actions_deadline",
  "outputs": [
   {
    "type": "uint256",
    "unit": "sec",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2051
 },
 {
  "name": "transfer_ownership_deadline",
  "outputs": [
   {
    "type": "uint256",
    "unit": "sec",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2081
 },
 {
  "name": "future_A",
  "outputs": [
   {
    "type": "int128",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2111
 },
 {
  "name": "future_fee",
  "outputs": [
   {
    "type": "int128",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2141
 },
 {
  "name": "future_admin_fee",
  "outputs": [
   {
    "type": "int128",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2171
 },
 {
  "name": "future_owner",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2201
 }
],



}

var usdt = {
  N_COINS: 3,
  coin_precisions: [1e18, 1e6, 1e6],
  wrapped_precisions: [1e8, 1e8, 1e6],
  use_lending: [true, true, false],
  tethered: [false, false, true],
  is_plain: [false, false, true],
  swap_address: '0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C',
  token_address: '0x9fC689CCaDa600B6DF723D9E47D84d76664a1F23',
  infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
  underlying_coins: [
          '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          '0xdAC17F958D2ee523a2206206994597C13D831ec7'],
  coins: [
        '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
        '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7'],
  deposit_address: '0xac795D2c97e60DF6a99ff1c814727302fD747a80',
  deposit_abi: [
 {
  "outputs": [],
  "inputs": [
   {
    "type": "address[3]",
    "name": "_coins"
   },
   {
    "type": "address[3]",
    "name": "_underlying_coins"
   },
   {
    "type": "address",
    "name": "_curve"
   },
   {
    "type": "address",
    "name": "_token"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "constructor"
 },
 {
  "name": "add_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[3]",
    "name": "uamounts"
   },
   {
    "type": "uint256",
    "name": "min_mint_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 141657
 },
 {
  "name": "remove_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_amount"
   },
   {
    "type": "uint256[3]",
    "name": "min_uamounts"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 92544
 },
 {
  "name": "remove_liquidity_imbalance",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[3]",
    "name": "uamounts"
   },
   {
    "type": "uint256",
    "name": "max_burn_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 110959
 },
 {
  "name": "calc_withdraw_one_coin",
  "outputs": [
   {
    "type": "uint256",
    "name": ""
   }
  ],
  "inputs": [
   {
    "type": "uint256",
    "name": "_token_amount"
   },
   {
    "type": "int128",
    "name": "i"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 3413700
 },
 {
  "name": "remove_liquidity_one_coin",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_token_amount"
   },
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "uint256",
    "name": "min_uamount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function"
 },
 {
  "name": "remove_liquidity_one_coin",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_token_amount"
   },
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "uint256",
    "name": "min_uamount"
   },
   {
    "type": "bool",
    "name": "donate_dust"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function"
 },
 {
  "name": "withdraw_donated_dust",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 63973
 },
 {
  "name": "coins",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1680
 },
 {
  "name": "underlying_coins",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1710
 },
 {
  "name": "curve",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1541
 },
 {
  "name": "token",
  "outputs": [
   {
    "type": "address",
    "name": ""
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1571
 }
],
  swap_abi: [
   {
    "name": "TokenExchange",
    "inputs": [
     {
      "type": "address",
      "name": "buyer",
      "indexed": true
     },
     {
      "type": "int128",
      "name": "sold_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_sold",
      "indexed": false
     },
     {
      "type": "int128",
      "name": "bought_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_bought",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "TokenExchangeUnderlying",
    "inputs": [
     {
      "type": "address",
      "name": "buyer",
      "indexed": true
     },
     {
      "type": "int128",
      "name": "sold_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_sold",
      "indexed": false
     },
     {
      "type": "int128",
      "name": "bought_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_bought",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "AddLiquidity",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[3]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[3]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "invariant",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "RemoveLiquidity",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[3]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[3]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "RemoveLiquidityImbalance",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[3]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[3]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "invariant",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "CommitNewAdmin",
    "inputs": [
     {
      "type": "uint256",
      "name": "deadline",
      "indexed": true,
      "unit": "sec"
     },
     {
      "type": "address",
      "name": "admin",
      "indexed": true
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "NewAdmin",
    "inputs": [
     {
      "type": "address",
      "name": "admin",
      "indexed": true
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "CommitNewParameters",
    "inputs": [
     {
      "type": "uint256",
      "name": "deadline",
      "indexed": true,
      "unit": "sec"
     },
     {
      "type": "uint256",
      "name": "A",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "fee",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "admin_fee",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "NewParameters",
    "inputs": [
     {
      "type": "uint256",
      "name": "A",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "fee",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "admin_fee",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "outputs": [],
    "inputs": [
     {
      "type": "address[3]",
      "name": "_coins"
     },
     {
      "type": "address[3]",
      "name": "_underlying_coins"
     },
     {
      "type": "address",
      "name": "_pool_token"
     },
     {
      "type": "uint256",
      "name": "_A"
     },
     {
      "type": "uint256",
      "name": "_fee"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "constructor"
   },
   {
    "name": "get_virtual_price",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1327351
   },
   {
    "name": "calc_token_amount",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "uint256[3]",
      "name": "amounts"
     },
     {
      "type": "bool",
      "name": "deposit"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 5171741
   },
   {
    "name": "add_liquidity",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256[3]",
      "name": "amounts"
     },
     {
      "type": "uint256",
      "name": "min_mint_amount"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 7905846
   },
   {
    "name": "get_dy",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3016651
   },
   {
    "name": "get_dx",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dy"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3016657
   },
   {
    "name": "get_dy_underlying",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3016494
   },
   {
    "name": "get_dx_underlying",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dy"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3016500
   },
   {
    "name": "exchange",
    "outputs": [],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     },
     {
      "type": "uint256",
      "name": "min_dy"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 6109460
   },
   {
    "name": "exchange_underlying",
    "outputs": [],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     },
     {
      "type": "uint256",
      "name": "min_dy"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 6125699
   },
   {
    "name": "remove_liquidity",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256",
      "name": "_amount"
     },
     {
      "type": "uint256[3]",
      "name": "min_amounts"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 197574
   },
   {
    "name": "remove_liquidity_imbalance",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256[3]",
      "name": "amounts"
     },
     {
      "type": "uint256",
      "name": "max_burn_amount"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 7905313
   },
   {
    "name": "commit_new_parameters",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256",
      "name": "amplification"
     },
     {
      "type": "uint256",
      "name": "new_fee"
     },
     {
      "type": "uint256",
      "name": "new_admin_fee"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 145897
   },
   {
    "name": "apply_new_parameters",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 133512
   },
   {
    "name": "revert_new_parameters",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21835
   },
   {
    "name": "commit_transfer_ownership",
    "outputs": [],
    "inputs": [
     {
      "type": "address",
      "name": "_owner"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 74512
   },
   {
    "name": "apply_transfer_ownership",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 60568
   },
   {
    "name": "revert_transfer_ownership",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21925
   },
   {
    "name": "withdraw_admin_fees",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 18169
   },
   {
    "name": "kill_me",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 37878
   },
   {
    "name": "unkill_me",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 22015
   },
   {
    "name": "coins",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2190
   },
   {
    "name": "underlying_coins",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2220
   },
   {
    "name": "balances",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2250
   },
   {
    "name": "A",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2081
   },
   {
    "name": "fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2111
   },
   {
    "name": "admin_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2141
   },
   {
    "name": "owner",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2171
   },
   {
    "name": "admin_actions_deadline",
    "outputs": [
     {
      "type": "uint256",
      "unit": "sec",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2201
   },
   {
    "name": "transfer_ownership_deadline",
    "outputs": [
     {
      "type": "uint256",
      "unit": "sec",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2231
   },
   {
    "name": "future_A",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2261
   },
   {
    "name": "future_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2291
   },
   {
    "name": "future_admin_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2321
   },
   {
    "name": "future_owner",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2351
   }
  ],
}

var iearn = {
  N_COINS: 4,
  coin_precisions: [1e18, 1e6, 1e6, 1e18],
  wrapped_precisions: [1e18, 1e6, 1e6, 1e18],
  use_lending: [true, true, true, true],
  tethered: [false, false, true, false],
  is_plain: [false, false, false, false],
  swap_address: '0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51',
  token_address: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
  underlying_coins: [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x0000000000085d4780B73119b644AE5ecd22b376'],
  coins: [
        '0x16de59092dAE5CcF4A1E6439D611fd0653f0Bd01',
        '0xd6aD7a6750A7593E092a9B218d66C0A814a3436e',
        '0x83f798e925BcD4017Eb265844FDDAbb448f1707D',
        '0x73a052500105205d34Daf004eAb301916DA8190f'],
  deposit_address: '0xbBC81d23Ea2c3ec7e56D39296F0cbB648873a5d3',
  deposit_abi: [
	 {
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address[4]",
	    "name": "_coins"
	   },
	   {
	    "type": "address[4]",
	    "name": "_underlying_coins"
	   },
	   {
	    "type": "address",
	    "name": "_curve"
	   },
	   {
	    "type": "address",
	    "name": "_token"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "constructor"
	 },
	 {
	  "name": "add_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "min_mint_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 164560
	 },
	 {
	  "name": "remove_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_amount"
	   },
	   {
	    "type": "uint256[4]",
	    "name": "min_uamounts"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 99521
	 },
	 {
	  "name": "remove_liquidity_imbalance",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "max_burn_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 120148
	 },
	 {
	  "name": "calc_withdraw_one_coin",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3881601
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   },
	   {
	    "type": "bool",
	    "name": "donate_dust"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "withdraw_donated_dust",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 63973
	 },
	 {
	  "name": "coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1680
	 },
	 {
	  "name": "underlying_coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1710
	 },
	 {
	  "name": "curve",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1541
	 },
	 {
	  "name": "token",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1571
	 }
	],
  swap_abi: [
   {
    "name": "TokenExchange",
    "inputs": [
     {
      "type": "address",
      "name": "buyer",
      "indexed": true
     },
     {
      "type": "int128",
      "name": "sold_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_sold",
      "indexed": false
     },
     {
      "type": "int128",
      "name": "bought_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_bought",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "TokenExchangeUnderlying",
    "inputs": [
     {
      "type": "address",
      "name": "buyer",
      "indexed": true
     },
     {
      "type": "int128",
      "name": "sold_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_sold",
      "indexed": false
     },
     {
      "type": "int128",
      "name": "bought_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_bought",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "AddLiquidity",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[4]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[4]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "invariant",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "RemoveLiquidity",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[4]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[4]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "RemoveLiquidityImbalance",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[4]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[4]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "invariant",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "CommitNewAdmin",
    "inputs": [
     {
      "type": "uint256",
      "name": "deadline",
      "indexed": true,
      "unit": "sec"
     },
     {
      "type": "address",
      "name": "admin",
      "indexed": true
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "NewAdmin",
    "inputs": [
     {
      "type": "address",
      "name": "admin",
      "indexed": true
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "CommitNewParameters",
    "inputs": [
     {
      "type": "uint256",
      "name": "deadline",
      "indexed": true,
      "unit": "sec"
     },
     {
      "type": "uint256",
      "name": "A",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "fee",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "admin_fee",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "NewParameters",
    "inputs": [
     {
      "type": "uint256",
      "name": "A",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "fee",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "admin_fee",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "outputs": [],
    "inputs": [
     {
      "type": "address[4]",
      "name": "_coins"
     },
     {
      "type": "address[4]",
      "name": "_underlying_coins"
     },
     {
      "type": "address",
      "name": "_pool_token"
     },
     {
      "type": "uint256",
      "name": "_A"
     },
     {
      "type": "uint256",
      "name": "_fee"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "constructor"
   },
   {
    "name": "get_virtual_price",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1535185
   },
   {
    "name": "calc_token_amount",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "uint256[4]",
      "name": "amounts"
     },
     {
      "type": "bool",
      "name": "deposit"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 6067881
   },
   {
    "name": "add_liquidity",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256[4]",
      "name": "amounts"
     },
     {
      "type": "uint256",
      "name": "min_mint_amount"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 9327083
   },
   {
    "name": "get_dy",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454227
   },
   {
    "name": "get_dx",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dy"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454232
   },
   {
    "name": "get_dy_underlying",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454087
   },
   {
    "name": "get_dx_underlying",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dy"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454093
   },
   {
    "name": "exchange",
    "outputs": [],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     },
     {
      "type": "uint256",
      "name": "min_dy"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 7030208
   },
   {
    "name": "exchange_underlying",
    "outputs": [],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     },
     {
      "type": "uint256",
      "name": "min_dy"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 7046149
   },
   {
    "name": "remove_liquidity",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256",
      "name": "_amount"
     },
     {
      "type": "uint256[4]",
      "name": "min_amounts"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 240409
   },
   {
    "name": "remove_liquidity_imbalance",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256[4]",
      "name": "amounts"
     },
     {
      "type": "uint256",
      "name": "max_burn_amount"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 9326310
   },
   {
    "name": "commit_new_parameters",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256",
      "name": "amplification"
     },
     {
      "type": "uint256",
      "name": "new_fee"
     },
     {
      "type": "uint256",
      "name": "new_admin_fee"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 145867
   },
   {
    "name": "apply_new_parameters",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 133482
   },
   {
    "name": "revert_new_parameters",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21805
   },
   {
    "name": "commit_transfer_ownership",
    "outputs": [],
    "inputs": [
     {
      "type": "address",
      "name": "_owner"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 74482
   },
   {
    "name": "apply_transfer_ownership",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 60538
   },
   {
    "name": "revert_transfer_ownership",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21895
   },
   {
    "name": "withdraw_admin_fees",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 22667
   },
   {
    "name": "kill_me",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 37848
   },
   {
    "name": "unkill_me",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21985
   },
   {
    "name": "coins",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2160
   },
   {
    "name": "underlying_coins",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2190
   },
   {
    "name": "balances",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2220
   },
   {
    "name": "A",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2051
   },
   {
    "name": "fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2081
   },
   {
    "name": "admin_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2111
   },
   {
    "name": "owner",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2141
   },
   {
    "name": "admin_actions_deadline",
    "outputs": [
     {
      "type": "uint256",
      "unit": "sec",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2171
   },
   {
    "name": "transfer_ownership_deadline",
    "outputs": [
     {
      "type": "uint256",
      "unit": "sec",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2201
   },
   {
    "name": "future_A",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2231
   },
   {
    "name": "future_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2261
   },
   {
    "name": "future_admin_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2291
   },
   {
    "name": "future_owner",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2321
   }
  ],
  sCurveRewards_abi: [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"y","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"yfi","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],
  sCurveRewards_address: '0x0001FB050Fe7312791bF6475b96569D83F695C9f',
  aRewards_abi: [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"adai","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_claimer","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"seize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"yfi","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],
  aRewards_address: '0xcc9efea3ac5df6ad6a656235ef955fbfef65b862',
}

var busd = {
  N_COINS: 4,
  coin_precisions: [1e18, 1e6, 1e6, 1e18],
  wrapped_precisions: [1e18, 1e6, 1e6, 1e18],
  use_lending: [true, true, true, true],
  tethered: [false, false, true, false],
  is_plain: [false, false, false, false],
  swap_address: '0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27',
  token_address: '0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B',
  infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
  underlying_coins: [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x4Fabb145d64652a948d72533023f6E7A623C7C53'],
  coins: [
        '0xC2cB1040220768554cf699b0d863A3cd4324ce32',
        '0x26EA744E5B887E5205727f55dFBE8685e3b21951',
        '0xE6354ed5bC4b393a5Aad09f21c46E101e692d447',
        '0x04bC0Ab673d88aE9dbC9DA2380cB6B79C4BCa9aE'],
  deposit_address: '0xb6c057591E073249F2D9D88Ba59a46CFC9B59EdB',
  deposit_abi: [
	 {
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address[4]",
	    "name": "_coins"
	   },
	   {
	    "type": "address[4]",
	    "name": "_underlying_coins"
	   },
	   {
	    "type": "address",
	    "name": "_curve"
	   },
	   {
	    "type": "address",
	    "name": "_token"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "constructor"
	 },
	 {
	  "name": "add_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "min_mint_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 164560
	 },
	 {
	  "name": "remove_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_amount"
	   },
	   {
	    "type": "uint256[4]",
	    "name": "min_uamounts"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 99521
	 },
	 {
	  "name": "remove_liquidity_imbalance",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "max_burn_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 120148
	 },
	 {
	  "name": "calc_withdraw_one_coin",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3881601
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   },
	   {
	    "type": "bool",
	    "name": "donate_dust"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "withdraw_donated_dust",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 63973
	 },
	 {
	  "name": "coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1680
	 },
	 {
	  "name": "underlying_coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1710
	 },
	 {
	  "name": "curve",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1541
	 },
	 {
	  "name": "token",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1571
	 }
	],
  swap_abi: [
   {
    "name": "TokenExchange",
    "inputs": [
     {
      "type": "address",
      "name": "buyer",
      "indexed": true
     },
     {
      "type": "int128",
      "name": "sold_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_sold",
      "indexed": false
     },
     {
      "type": "int128",
      "name": "bought_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_bought",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "TokenExchangeUnderlying",
    "inputs": [
     {
      "type": "address",
      "name": "buyer",
      "indexed": true
     },
     {
      "type": "int128",
      "name": "sold_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_sold",
      "indexed": false
     },
     {
      "type": "int128",
      "name": "bought_id",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "tokens_bought",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "AddLiquidity",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[4]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[4]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "invariant",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "RemoveLiquidity",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[4]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[4]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "RemoveLiquidityImbalance",
    "inputs": [
     {
      "type": "address",
      "name": "provider",
      "indexed": true
     },
     {
      "type": "uint256[4]",
      "name": "token_amounts",
      "indexed": false
     },
     {
      "type": "uint256[4]",
      "name": "fees",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "invariant",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "token_supply",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "CommitNewAdmin",
    "inputs": [
     {
      "type": "uint256",
      "name": "deadline",
      "indexed": true,
      "unit": "sec"
     },
     {
      "type": "address",
      "name": "admin",
      "indexed": true
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "NewAdmin",
    "inputs": [
     {
      "type": "address",
      "name": "admin",
      "indexed": true
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "CommitNewParameters",
    "inputs": [
     {
      "type": "uint256",
      "name": "deadline",
      "indexed": true,
      "unit": "sec"
     },
     {
      "type": "uint256",
      "name": "A",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "fee",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "admin_fee",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "name": "NewParameters",
    "inputs": [
     {
      "type": "uint256",
      "name": "A",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "fee",
      "indexed": false
     },
     {
      "type": "uint256",
      "name": "admin_fee",
      "indexed": false
     }
    ],
    "anonymous": false,
    "type": "event"
   },
   {
    "outputs": [],
    "inputs": [
     {
      "type": "address[4]",
      "name": "_coins"
     },
     {
      "type": "address[4]",
      "name": "_underlying_coins"
     },
     {
      "type": "address",
      "name": "_pool_token"
     },
     {
      "type": "uint256",
      "name": "_A"
     },
     {
      "type": "uint256",
      "name": "_fee"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "constructor"
   },
   {
    "name": "get_virtual_price",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1535185
   },
   {
    "name": "calc_token_amount",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "uint256[4]",
      "name": "amounts"
     },
     {
      "type": "bool",
      "name": "deposit"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 6067881
   },
   {
    "name": "add_liquidity",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256[4]",
      "name": "amounts"
     },
     {
      "type": "uint256",
      "name": "min_mint_amount"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 9327083
   },
   {
    "name": "get_dy",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454227
   },
   {
    "name": "get_dx",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dy"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454232
   },
   {
    "name": "get_dy_underlying",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454087
   },
   {
    "name": "get_dx_underlying",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dy"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 3454093
   },
   {
    "name": "exchange",
    "outputs": [],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     },
     {
      "type": "uint256",
      "name": "min_dy"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 7030208
   },
   {
    "name": "exchange_underlying",
    "outputs": [],
    "inputs": [
     {
      "type": "int128",
      "name": "i"
     },
     {
      "type": "int128",
      "name": "j"
     },
     {
      "type": "uint256",
      "name": "dx"
     },
     {
      "type": "uint256",
      "name": "min_dy"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 7046149
   },
   {
    "name": "remove_liquidity",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256",
      "name": "_amount"
     },
     {
      "type": "uint256[4]",
      "name": "min_amounts"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 240409
   },
   {
    "name": "remove_liquidity_imbalance",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256[4]",
      "name": "amounts"
     },
     {
      "type": "uint256",
      "name": "max_burn_amount"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 9326310
   },
   {
    "name": "commit_new_parameters",
    "outputs": [],
    "inputs": [
     {
      "type": "uint256",
      "name": "amplification"
     },
     {
      "type": "uint256",
      "name": "new_fee"
     },
     {
      "type": "uint256",
      "name": "new_admin_fee"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 145867
   },
   {
    "name": "apply_new_parameters",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 133482
   },
   {
    "name": "revert_new_parameters",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21805
   },
   {
    "name": "commit_transfer_ownership",
    "outputs": [],
    "inputs": [
     {
      "type": "address",
      "name": "_owner"
     }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 74482
   },
   {
    "name": "apply_transfer_ownership",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 60538
   },
   {
    "name": "revert_transfer_ownership",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21895
   },
   {
    "name": "withdraw_admin_fees",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 22667
   },
   {
    "name": "kill_me",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 37848
   },
   {
    "name": "unkill_me",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 21985
   },
   {
    "name": "coins",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2160
   },
   {
    "name": "underlying_coins",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2190
   },
   {
    "name": "balances",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [
     {
      "type": "int128",
      "name": "arg0"
     }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2220
   },
   {
    "name": "A",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2051
   },
   {
    "name": "fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2081
   },
   {
    "name": "admin_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2111
   },
   {
    "name": "owner",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2141
   },
   {
    "name": "admin_actions_deadline",
    "outputs": [
     {
      "type": "uint256",
      "unit": "sec",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2171
   },
   {
    "name": "transfer_ownership_deadline",
    "outputs": [
     {
      "type": "uint256",
      "unit": "sec",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2201
   },
   {
    "name": "future_A",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2231
   },
   {
    "name": "future_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2261
   },
   {
    "name": "future_admin_fee",
    "outputs": [
     {
      "type": "uint256",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2291
   },
   {
    "name": "future_owner",
    "outputs": [
     {
      "type": "address",
      "name": "out"
     }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2321
   }
  ],
}


var susd = {
  swap_abi: [
 {
  "name": "TokenExchange",
  "inputs": [
   {
    "type": "address",
    "name": "buyer",
    "indexed": true
   },
   {
    "type": "int128",
    "name": "sold_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_sold",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "bought_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_bought",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "TokenExchangeUnderlying",
  "inputs": [
   {
    "type": "address",
    "name": "buyer",
    "indexed": true
   },
   {
    "type": "int128",
    "name": "sold_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_sold",
    "indexed": false
   },
   {
    "type": "int128",
    "name": "bought_id",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "tokens_bought",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "AddLiquidity",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256[2]",
    "name": "fees",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "invariant",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "RemoveLiquidity",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256[2]",
    "name": "fees",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "RemoveLiquidityImbalance",
  "inputs": [
   {
    "type": "address",
    "name": "provider",
    "indexed": true
   },
   {
    "type": "uint256[2]",
    "name": "token_amounts",
    "indexed": false
   },
   {
    "type": "uint256[2]",
    "name": "fees",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "invariant",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "token_supply",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "CommitNewAdmin",
  "inputs": [
   {
    "type": "uint256",
    "name": "deadline",
    "indexed": true,
    "unit": "sec"
   },
   {
    "type": "address",
    "name": "admin",
    "indexed": true
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "NewAdmin",
  "inputs": [
   {
    "type": "address",
    "name": "admin",
    "indexed": true
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "CommitNewParameters",
  "inputs": [
   {
    "type": "uint256",
    "name": "deadline",
    "indexed": true,
    "unit": "sec"
   },
   {
    "type": "uint256",
    "name": "A",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "fee",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "admin_fee",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "name": "NewParameters",
  "inputs": [
   {
    "type": "uint256",
    "name": "A",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "fee",
    "indexed": false
   },
   {
    "type": "uint256",
    "name": "admin_fee",
    "indexed": false
   }
  ],
  "anonymous": false,
  "type": "event"
 },
 {
  "outputs": [],
  "inputs": [
   {
    "type": "address[2]",
    "name": "_coins"
   },
   {
    "type": "address[2]",
    "name": "_underlying_coins"
   },
   {
    "type": "address[2]",
    "name": "_coins_rates"
   },
   {
    "type": "address",
    "name": "_pool_token"
   },
   {
    "type": "uint256",
    "name": "_A"
   },
   {
    "type": "uint256",
    "name": "_fee"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "constructor"
 },
 {
  "name": "get_virtual_price",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 1074737
 },
 {
  "name": "calc_token_amount",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "bool",
    "name": "deposit"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 4230269
 },
 {
  "name": "add_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "uint256",
    "name": "min_mint_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 6486149
 },
 {
  "name": "get_dy",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2534191
 },
 {
  "name": "get_dx",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dy"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2534197
 },
 {
  "name": "get_dy_underlying",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2534016
 },
 {
  "name": "get_dx_underlying",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dy"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2534022
 },
 {
  "name": "exchange",
  "outputs": [],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   },
   {
    "type": "uint256",
    "name": "min_dy"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 5190905
 },
 {
  "name": "exchange_underlying",
  "outputs": [],
  "inputs": [
   {
    "type": "int128",
    "name": "i"
   },
   {
    "type": "int128",
    "name": "j"
   },
   {
    "type": "uint256",
    "name": "dx"
   },
   {
    "type": "uint256",
    "name": "min_dy"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 5210654
 },
 {
  "name": "remove_liquidity",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "_amount"
   },
   {
    "type": "uint256[2]",
    "name": "min_amounts"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 153868
 },
 {
  "name": "remove_liquidity_imbalance",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   },
   {
    "type": "uint256",
    "name": "max_burn_amount"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 6485860
 },
 {
  "name": "donate_dust",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256[2]",
    "name": "amounts"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 138626
 },
 {
  "name": "commit_new_parameters",
  "outputs": [],
  "inputs": [
   {
    "type": "uint256",
    "name": "amplification"
   },
   {
    "type": "uint256",
    "name": "new_fee"
   },
   {
    "type": "uint256",
    "name": "new_admin_fee"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 146105
 },
 {
  "name": "apply_new_parameters",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 133512
 },
 {
  "name": "revert_new_parameters",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 21835
 },
 {
  "name": "commit_transfer_ownership",
  "outputs": [],
  "inputs": [
   {
    "type": "address",
    "name": "_owner"
   }
  ],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 74512
 },
 {
  "name": "apply_transfer_ownership",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 60568
 },
 {
  "name": "revert_transfer_ownership",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 21925
 },
 {
  "name": "withdraw_admin_fees",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 12831
 },
 {
  "name": "kill_me",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 37878
 },
 {
  "name": "unkill_me",
  "outputs": [],
  "inputs": [],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 22015
 },
 {
  "name": "coins",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2190
 },
 {
  "name": "coins_rates",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2220
 },
 {
  "name": "underlying_coins",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2250
 },
 {
  "name": "balances",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [
   {
    "type": "int128",
    "name": "arg0"
   }
  ],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2280
 },
 {
  "name": "A",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2111
 },
 {
  "name": "fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2141
 },
 {
  "name": "admin_fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2171
 },
 {
  "name": "owner",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2201
 },
 {
  "name": "admin_actions_deadline",
  "outputs": [
   {
    "type": "uint256",
    "unit": "sec",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2231
 },
 {
  "name": "transfer_ownership_deadline",
  "outputs": [
   {
    "type": "uint256",
    "unit": "sec",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2261
 },
 {
  "name": "future_A",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2291
 },
 {
  "name": "future_fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2321
 },
 {
  "name": "future_admin_fee",
  "outputs": [
   {
    "type": "uint256",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2351
 },
 {
  "name": "future_owner",
  "outputs": [
   {
    "type": "address",
    "name": "out"
   }
  ],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 2381
 }
],

  swap_address: '0xeDf54bC005bc2Df0Cc6A675596e843D28b16A966',
  token_address: '0x2b645a6A426f22fB7954dC15E583e3737B8d1434',
  N_COINS: 2, 
  tethered: [false, false],
  use_lending: [true, true],
  is_plain: [false, false],
  coin_precisions: [1e18, 1e18],
  underlying_coins: [
    '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
    '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8'],
  coins: [
    '0xF61718057901F84C4eEC4339EF8f0D86D2B45600',
    '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8'],

}

var susdv2 = {
	swap_abi: [
	 {
	  "name": "TokenExchange",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "buyer",
	    "indexed": true
	   },
	   {
	    "type": "int128",
	    "name": "sold_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_sold",
	    "indexed": false
	   },
	   {
	    "type": "int128",
	    "name": "bought_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_bought",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "TokenExchangeUnderlying",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "buyer",
	    "indexed": true
	   },
	   {
	    "type": "int128",
	    "name": "sold_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_sold",
	    "indexed": false
	   },
	   {
	    "type": "int128",
	    "name": "bought_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_bought",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "AddLiquidity",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[4]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[4]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "invariant",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RemoveLiquidity",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[4]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[4]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RemoveLiquidityImbalance",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[4]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[4]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "invariant",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "CommitNewAdmin",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "deadline",
	    "indexed": true,
	    "unit": "sec"
	   },
	   {
	    "type": "address",
	    "name": "admin",
	    "indexed": true
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "NewAdmin",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "admin",
	    "indexed": true
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "CommitNewParameters",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "deadline",
	    "indexed": true,
	    "unit": "sec"
	   },
	   {
	    "type": "uint256",
	    "name": "A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "fee",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "admin_fee",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "NewParameters",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "fee",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "admin_fee",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address[4]",
	    "name": "_coins"
	   },
	   {
	    "type": "address[4]",
	    "name": "_underlying_coins"
	   },
	   {
	    "type": "address",
	    "name": "_pool_token"
	   },
	   {
	    "type": "uint256",
	    "name": "_A"
	   },
	   {
	    "type": "uint256",
	    "name": "_fee"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "constructor"
	 },
	 {
	  "name": "get_virtual_price",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1570535
	 },
	 {
	  "name": "calc_token_amount",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "amounts"
	   },
	   {
	    "type": "bool",
	    "name": "deposit"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 6103471
	 },
	 {
	  "name": "add_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "amounts"
	   },
	   {
	    "type": "uint256",
	    "name": "min_mint_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 9331701
	 },
	 {
	  "name": "get_dy",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3489637
	 },
	 {
	  "name": "get_dy_underlying",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3489467
	 },
	 {
	  "name": "exchange",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   },
	   {
	    "type": "uint256",
	    "name": "min_dy"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 7034253
	 },
	 {
	  "name": "exchange_underlying",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   },
	   {
	    "type": "uint256",
	    "name": "min_dy"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 7050488
	 },
	 {
	  "name": "remove_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_amount"
	   },
	   {
	    "type": "uint256[4]",
	    "name": "min_amounts"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 241191
	 },
	 {
	  "name": "remove_liquidity_imbalance",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "amounts"
	   },
	   {
	    "type": "uint256",
	    "name": "max_burn_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 9330864
	 },
	 {
	  "name": "commit_new_parameters",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "amplification"
	   },
	   {
	    "type": "uint256",
	    "name": "new_fee"
	   },
	   {
	    "type": "uint256",
	    "name": "new_admin_fee"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 146045
	 },
	 {
	  "name": "apply_new_parameters",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 133452
	 },
	 {
	  "name": "revert_new_parameters",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 21775
	 },
	 {
	  "name": "commit_transfer_ownership",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address",
	    "name": "_owner"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 74452
	 },
	 {
	  "name": "apply_transfer_ownership",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 60508
	 },
	 {
	  "name": "revert_transfer_ownership",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 21865
	 },
	 {
	  "name": "withdraw_admin_fees",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 23448
	 },
	 {
	  "name": "kill_me",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 37818
	 },
	 {
	  "name": "unkill_me",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 21955
	 },
	 {
	  "name": "coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2130
	 },
	 {
	  "name": "underlying_coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2160
	 },
	 {
	  "name": "balances",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2190
	 },
	 {
	  "name": "A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2021
	 },
	 {
	  "name": "fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2051
	 },
	 {
	  "name": "admin_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2081
	 },
	 {
	  "name": "owner",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2111
	 },
	 {
	  "name": "admin_actions_deadline",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2141
	 },
	 {
	  "name": "transfer_ownership_deadline",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2171
	 },
	 {
	  "name": "future_A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2201
	 },
	 {
	  "name": "future_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2231
	 },
	 {
	  "name": "future_admin_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2261
	 },
	 {
	  "name": "future_owner",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2291
	 }
	],
	deposit_abi: [
	 {
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address[4]",
	    "name": "_coins"
	   },
	   {
	    "type": "address[4]",
	    "name": "_underlying_coins"
	   },
	   {
	    "type": "address",
	    "name": "_curve"
	   },
	   {
	    "type": "address",
	    "name": "_token"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "constructor"
	 },
	 {
	  "name": "add_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "min_mint_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 166032
	 },
	 {
	  "name": "remove_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_amount"
	   },
	   {
	    "type": "uint256[4]",
	    "name": "min_uamounts"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 101481
	 },
	 {
	  "name": "remove_liquidity_imbalance",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "max_burn_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 125088
	 },
	 {
	  "name": "calc_withdraw_one_coin",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3881771
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   },
	   {
	    "type": "bool",
	    "name": "donate_dust"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "withdraw_donated_dust",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 63973
	 },
	 {
	  "name": "coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1680
	 },
	 {
	  "name": "underlying_coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1710
	 },
	 {
	  "name": "curve",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1541
	 },
	 {
	  "name": "token",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1571
	 }
	],
	N_COINS: 4,
	coin_precisions: [1e18, 1e6, 1e6, 1e18],
	wrapped_precisions: [1e18, 1e6, 1e6, 1e18],
	tethered: [false, false, true, false],
	use_lending: [false, false, false, false],
	is_plain: [true, true, true, true],
	swap_address: '0xA5407eAE9Ba41422680e2e00537571bcC53efBfD',
	token_address: '0xC25a3A3b969415c80451098fa907EC722572917F',
	infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
	deposit_address: '0xFCBa3E75865d2d561BE8D220616520c171F12851',
	underlying_coins: [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',],
	coins: [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',],

    sCurveRewards_abi: [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"snx","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"uni","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],

    sCurveRewards_address: '0xdcb6a51ea3ca5d3fd898fd6564757c7aaec3ca92',
}

var pax = {
	swap_abi: [
	 {
	  "name": "TokenExchange",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "buyer",
	    "indexed": true
	   },
	   {
	    "type": "int128",
	    "name": "sold_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_sold",
	    "indexed": false
	   },
	   {
	    "type": "int128",
	    "name": "bought_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_bought",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "TokenExchangeUnderlying",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "buyer",
	    "indexed": true
	   },
	   {
	    "type": "int128",
	    "name": "sold_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_sold",
	    "indexed": false
	   },
	   {
	    "type": "int128",
	    "name": "bought_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_bought",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "AddLiquidity",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[4]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[4]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "invariant",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RemoveLiquidity",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[4]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[4]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RemoveLiquidityImbalance",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[4]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[4]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "invariant",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "CommitNewAdmin",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "deadline",
	    "indexed": true,
	    "unit": "sec"
	   },
	   {
	    "type": "address",
	    "name": "admin",
	    "indexed": true
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "NewAdmin",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "admin",
	    "indexed": true
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "CommitNewFee",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "deadline",
	    "indexed": true,
	    "unit": "sec"
	   },
	   {
	    "type": "uint256",
	    "name": "fee",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "admin_fee",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "NewFee",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "fee",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "admin_fee",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RampA",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "old_A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "new_A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "initial_time",
	    "indexed": false,
	    "unit": "sec"
	   },
	   {
	    "type": "uint256",
	    "name": "future_time",
	    "indexed": false,
	    "unit": "sec"
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "StopRampA",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "t",
	    "indexed": false,
	    "unit": "sec"
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address[4]",
	    "name": "_coins"
	   },
	   {
	    "type": "address[4]",
	    "name": "_underlying_coins"
	   },
	   {
	    "type": "address",
	    "name": "_pool_token"
	   },
	   {
	    "type": "uint256",
	    "name": "_A"
	   },
	   {
	    "type": "uint256",
	    "name": "_fee"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "constructor"
	 },
	 {
	  "name": "A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 5227
	 },
	 {
	  "name": "get_virtual_price",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1333259
	 },
	 {
	  "name": "calc_token_amount",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "amounts"
	   },
	   {
	    "type": "bool",
	    "name": "deposit"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 5242977
	 },
	 {
	  "name": "add_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "amounts"
	   },
	   {
	    "type": "uint256",
	    "name": "min_mint_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 8088077
	 },
	 {
	  "name": "get_dy",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3048740
	 },
	 {
	  "name": "get_dy_underlying",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3048570
	 },
	 {
	  "name": "exchange",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   },
	   {
	    "type": "uint256",
	    "name": "min_dy"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 6218629
	 },
	 {
	  "name": "exchange_underlying",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   },
	   {
	    "type": "uint256",
	    "name": "min_dy"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 6238369
	 },
	 {
	  "name": "remove_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_amount"
	   },
	   {
	    "type": "uint256[4]",
	    "name": "min_amounts"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 241221
	 },
	 {
	  "name": "remove_liquidity_imbalance",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "amounts"
	   },
	   {
	    "type": "uint256",
	    "name": "max_burn_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 8087316
	 },
	 {
	  "name": "ramp_A",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_future_A"
	   },
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": "_future_time"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 151847
	 },
	 {
	  "name": "stop_ramp_A",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 148607
	 },
	 {
	  "name": "commit_new_fee",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "new_fee"
	   },
	   {
	    "type": "uint256",
	    "name": "new_admin_fee"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 110431
	 },
	 {
	  "name": "apply_new_fee",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 97130
	 },
	 {
	  "name": "revert_new_parameters",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 21865
	 },
	 {
	  "name": "commit_transfer_ownership",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address",
	    "name": "_owner"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 74542
	 },
	 {
	  "name": "apply_transfer_ownership",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 60598
	 },
	 {
	  "name": "revert_transfer_ownership",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 21955
	 },
	 {
	  "name": "withdraw_admin_fees",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 23538
	 },
	 {
	  "name": "kill_me",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 37908
	 },
	 {
	  "name": "unkill_me",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 22045
	 },
	 {
	  "name": "coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2220
	 },
	 {
	  "name": "underlying_coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2250
	 },
	 {
	  "name": "balances",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2280
	 },
	 {
	  "name": "fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2111
	 },
	 {
	  "name": "admin_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2141
	 },
	 {
	  "name": "owner",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2171
	 },
	 {
	  "name": "initial_A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2201
	 },
	 {
	  "name": "future_A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2231
	 },
	 {
	  "name": "initial_A_time",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2261
	 },
	 {
	  "name": "future_A_time",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2291
	 },
	 {
	  "name": "admin_actions_deadline",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2321
	 },
	 {
	  "name": "transfer_ownership_deadline",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2351
	 },
	 {
	  "name": "future_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2381
	 },
	 {
	  "name": "future_admin_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2411
	 },
	 {
	  "name": "future_owner",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2441
	 }
	],
	deposit_abi: [
	 {
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address[4]",
	    "name": "_coins"
	   },
	   {
	    "type": "address[4]",
	    "name": "_underlying_coins"
	   },
	   {
	    "type": "address",
	    "name": "_curve"
	   },
	   {
	    "type": "address",
	    "name": "_token"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "constructor"
	 },
	 {
	  "name": "add_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "min_mint_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 165036
	 },
	 {
	  "name": "remove_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_amount"
	   },
	   {
	    "type": "uint256[4]",
	    "name": "min_uamounts"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 100343
	 },
	 {
	  "name": "remove_liquidity_imbalance",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[4]",
	    "name": "uamounts"
	   },
	   {
	    "type": "uint256",
	    "name": "max_burn_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 121298
	 },
	 {
	  "name": "calc_withdraw_one_coin",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 3881771
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_uamount"
	   },
	   {
	    "type": "bool",
	    "name": "donate_dust"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function"
	 },
	 {
	  "name": "withdraw_donated_dust",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 63973
	 },
	 {
	  "name": "coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1680
	 },
	 {
	  "name": "underlying_coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1710
	 },
	 {
	  "name": "curve",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1541
	 },
	 {
	  "name": "token",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1571
	 }
	],
	N_COINS: 4,
	coin_precisions: [1e18, 1e6, 1e6, 1e18],
	wrapped_precisions: [1e18, 1e6, 1e6, 1e18],
	tethered: [false, false, true, false],
	use_lending: [true, true, true, false],
	is_plain: [false, false, false, true],
	swap_address: '0x06364f10B501e868329afBc005b3492902d6C763',
	token_address: '0xD905e2eaeBe188fc92179b6350807D8bd91Db0D8',
	infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
	deposit_address: '0xA50cCc70b6a011CffDdf45057E39679379187287',
	underlying_coins: [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x8E870D67F660D95d5be530380D0eC0bd388289E1',],
	coins: [
        '0x99d1Fa417f94dcD62BfE781a1213c092a47041Bc',
        '0x9777d7E2b60bB01759D0E2f8be2095df444cb07E',
        '0x1bE5d71F2dA660BFdee8012dDc58D024448A0A59',
        '0x8E870D67F660D95d5be530380D0eC0bd388289E1',],
}


var tbtc = {
	swap_abi: [
	 {
	  "name": "TokenExchange",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "buyer",
	    "indexed": true
	   },
	   {
	    "type": "int128",
	    "name": "sold_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_sold",
	    "indexed": false
	   },
	   {
	    "type": "int128",
	    "name": "bought_id",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "tokens_bought",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "AddLiquidity",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[3]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[3]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "invariant",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RemoveLiquidity",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[3]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[3]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RemoveLiquidityOne",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256",
	    "name": "token_amount",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "coin_amount",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RemoveLiquidityImbalance",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "provider",
	    "indexed": true
	   },
	   {
	    "type": "uint256[3]",
	    "name": "token_amounts",
	    "indexed": false
	   },
	   {
	    "type": "uint256[3]",
	    "name": "fees",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "invariant",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "token_supply",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "CommitNewAdmin",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "deadline",
	    "indexed": true,
	    "unit": "sec"
	   },
	   {
	    "type": "address",
	    "name": "admin",
	    "indexed": true
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "NewAdmin",
	  "inputs": [
	   {
	    "type": "address",
	    "name": "admin",
	    "indexed": true
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "CommitNewFee",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "deadline",
	    "indexed": true,
	    "unit": "sec"
	   },
	   {
	    "type": "uint256",
	    "name": "fee",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "admin_fee",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "NewFee",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "fee",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "admin_fee",
	    "indexed": false
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "RampA",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "old_A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "new_A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "initial_time",
	    "indexed": false,
	    "unit": "sec"
	   },
	   {
	    "type": "uint256",
	    "name": "future_time",
	    "indexed": false,
	    "unit": "sec"
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "name": "StopRampA",
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "A",
	    "indexed": false
	   },
	   {
	    "type": "uint256",
	    "name": "t",
	    "indexed": false,
	    "unit": "sec"
	   }
	  ],
	  "anonymous": false,
	  "type": "event"
	 },
	 {
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address[3]",
	    "name": "_coins"
	   },
	   {
	    "type": "address",
	    "name": "_pool_token"
	   },
	   {
	    "type": "uint256",
	    "name": "_A"
	   },
	   {
	    "type": "uint256",
	    "name": "_fee"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "constructor"
	 },
	 {
	  "name": "A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 5227
	 },
	 {
	  "name": "get_virtual_price",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1138429
	 },
	 {
	  "name": "calc_token_amount",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256[3]",
	    "name": "amounts"
	   },
	   {
	    "type": "bool",
	    "name": "deposit"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2261505
	 },
	 {
	  "name": "add_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[3]",
	    "name": "amounts"
	   },
	   {
	    "type": "uint256",
	    "name": "min_mint_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 3581596
	 },
	 {
	  "name": "get_dy",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2675669
	 },
	 {
	  "name": "exchange",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "int128",
	    "name": "j"
	   },
	   {
	    "type": "uint256",
	    "name": "dx"
	   },
	   {
	    "type": "uint256",
	    "name": "min_dy"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 5490309
	 },
	 {
	  "name": "remove_liquidity",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_amount"
	   },
	   {
	    "type": "uint256[3]",
	    "name": "min_amounts"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 196792
	 },
	 {
	  "name": "remove_liquidity_imbalance",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256[3]",
	    "name": "amounts"
	   },
	   {
	    "type": "uint256",
	    "name": "max_burn_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 3581047
	 },
	 {
	  "name": "calc_withdraw_one_coin",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 1084
	 },
	 {
	  "name": "remove_liquidity_one_coin",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_token_amount"
	   },
	   {
	    "type": "int128",
	    "name": "i"
	   },
	   {
	    "type": "uint256",
	    "name": "min_amount"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 4023404
	 },
	 {
	  "name": "ramp_A",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "_future_A"
	   },
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": "_future_time"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 151847
	 },
	 {
	  "name": "stop_ramp_A",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 148607
	 },
	 {
	  "name": "commit_new_fee",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "uint256",
	    "name": "new_fee"
	   },
	   {
	    "type": "uint256",
	    "name": "new_admin_fee"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 110431
	 },
	 {
	  "name": "apply_new_fee",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 97130
	 },
	 {
	  "name": "revert_new_parameters",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 21865
	 },
	 {
	  "name": "commit_transfer_ownership",
	  "outputs": [],
	  "inputs": [
	   {
	    "type": "address",
	    "name": "_owner"
	   }
	  ],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 74542
	 },
	 {
	  "name": "apply_transfer_ownership",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 60598
	 },
	 {
	  "name": "revert_transfer_ownership",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 21955
	 },
	 {
	  "name": "withdraw_admin_fees",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 17475
	 },
	 {
	  "name": "kill_me",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 37908
	 },
	 {
	  "name": "unkill_me",
	  "outputs": [],
	  "inputs": [],
	  "constant": false,
	  "payable": false,
	  "type": "function",
	  "gas": 22045
	 },
	 {
	  "name": "coins",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2220
	 },
	 {
	  "name": "balances",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [
	   {
	    "type": "int128",
	    "name": "arg0"
	   }
	  ],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2250
	 },
	 {
	  "name": "fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2081
	 },
	 {
	  "name": "admin_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2111
	 },
	 {
	  "name": "owner",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2141
	 },
	 {
	  "name": "initial_A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2171
	 },
	 {
	  "name": "future_A",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2201
	 },
	 {
	  "name": "initial_A_time",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2231
	 },
	 {
	  "name": "future_A_time",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2261
	 },
	 {
	  "name": "admin_actions_deadline",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2291
	 },
	 {
	  "name": "transfer_ownership_deadline",
	  "outputs": [
	   {
	    "type": "uint256",
	    "unit": "sec",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2321
	 },
	 {
	  "name": "future_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2351
	 },
	 {
	  "name": "future_admin_fee",
	  "outputs": [
	   {
	    "type": "uint256",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2381
	 },
	 {
	  "name": "future_owner",
	  "outputs": [
	   {
	    "type": "address",
	    "name": ""
	   }
	  ],
	  "inputs": [],
	  "constant": true,
	  "payable": false,
	  "type": "function",
	  "gas": 2411
	 }
	],
	N_COINS: 3,
	coin_precisions: [1e18, 1e8, 1e18],
	wrapped_precisions: [1e18, 1e8, 1e18],
	tethered: [false, false, false],
	use_lending: [false, false, false],
	is_plain: [true, true, true],
	swap_address: '0x9726e9314eF1b96E45f40056bEd61A088897313E',
	token_address: '0x1f2a662FB513441f06b8dB91ebD9a1466462b275',
	infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
	//no deposit zap
	underlying_coins: [
		//tbtc
        '0x1bBE271d15Bb64dF0bc6CD28Df9Ff322F2eBD847',
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        '0x0316EB71485b0Ab14103307bf65a021042c6d380',
        ],
	coins: [
		//tbtc
        '0x1bBE271d15Bb64dF0bc6CD28Df9Ff322F2eBD847',
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        '0x0316EB71485b0Ab14103307bf65a021042c6d380',
        ],
}

var ren = {
	swap_abi: [{"name":"TokenExchange","inputs":[{"type":"address","name":"buyer","indexed":true},{"type":"int128","name":"sold_id","indexed":false},{"type":"uint256","name":"tokens_sold","indexed":false},{"type":"int128","name":"bought_id","indexed":false},{"type":"uint256","name":"tokens_bought","indexed":false}],"anonymous":false,"type":"event"},{"name":"AddLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256[2]","name":"token_amounts","indexed":false},{"type":"uint256[2]","name":"fees","indexed":false},{"type":"uint256","name":"invariant","indexed":false},{"type":"uint256","name":"token_supply","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidity","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256[2]","name":"token_amounts","indexed":false},{"type":"uint256[2]","name":"fees","indexed":false},{"type":"uint256","name":"token_supply","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidityOne","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"token_amount","indexed":false},{"type":"uint256","name":"coin_amount","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidityImbalance","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256[2]","name":"token_amounts","indexed":false},{"type":"uint256[2]","name":"fees","indexed":false},{"type":"uint256","name":"invariant","indexed":false},{"type":"uint256","name":"token_supply","indexed":false}],"anonymous":false,"type":"event"},{"name":"CommitNewAdmin","inputs":[{"type":"uint256","name":"deadline","indexed":true,"unit":"sec"},{"type":"address","name":"admin","indexed":true}],"anonymous":false,"type":"event"},{"name":"NewAdmin","inputs":[{"type":"address","name":"admin","indexed":true}],"anonymous":false,"type":"event"},{"name":"CommitNewFee","inputs":[{"type":"uint256","name":"deadline","indexed":true,"unit":"sec"},{"type":"uint256","name":"fee","indexed":false},{"type":"uint256","name":"admin_fee","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewFee","inputs":[{"type":"uint256","name":"fee","indexed":false},{"type":"uint256","name":"admin_fee","indexed":false}],"anonymous":false,"type":"event"},{"name":"RampA","inputs":[{"type":"uint256","name":"old_A","indexed":false},{"type":"uint256","name":"new_A","indexed":false},{"type":"uint256","name":"initial_time","indexed":false,"unit":"sec"},{"type":"uint256","name":"future_time","indexed":false,"unit":"sec"}],"anonymous":false,"type":"event"},{"name":"StopRampA","inputs":[{"type":"uint256","name":"A","indexed":false},{"type":"uint256","name":"t","indexed":false,"unit":"sec"}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[{"type":"address[2]","name":"_coins"},{"type":"address","name":"_pool_token"},{"type":"uint256","name":"_A"},{"type":"uint256","name":"_fee"}],"constant":false,"payable":false,"type":"constructor"},{"name":"A","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":5227},{"name":"get_virtual_price","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":967716},{"name":"calc_token_amount","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256[2]","name":"amounts"},{"type":"bool","name":"deposit"}],"constant":true,"payable":false,"type":"function","gas":3810860},{"name":"add_liquidity","outputs":[],"inputs":[{"type":"uint256[2]","name":"amounts"},{"type":"uint256","name":"min_mint_amount"}],"constant":false,"payable":false,"type":"function","gas":5858197},{"name":"get_dy","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"i"},{"type":"int128","name":"j"},{"type":"uint256","name":"dx"}],"constant":true,"payable":false,"type":"function","gas":2327087},{"name":"get_dy_underlying","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"i"},{"type":"int128","name":"j"},{"type":"uint256","name":"dx"}],"constant":true,"payable":false,"type":"function","gas":2326882},{"name":"exchange","outputs":[],"inputs":[{"type":"int128","name":"i"},{"type":"int128","name":"j"},{"type":"uint256","name":"dx"},{"type":"uint256","name":"min_dy"}],"constant":false,"payable":false,"type":"function","gas":4783971},{"name":"remove_liquidity","outputs":[],"inputs":[{"type":"uint256","name":"_amount"},{"type":"uint256[2]","name":"min_amounts"}],"constant":false,"payable":false,"type":"function","gas":153460},{"name":"remove_liquidity_imbalance","outputs":[],"inputs":[{"type":"uint256[2]","name":"amounts"},{"type":"uint256","name":"max_burn_amount"}],"constant":false,"payable":false,"type":"function","gas":5857985},{"name":"calc_withdraw_one_coin","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"_token_amount"},{"type":"int128","name":"i"}],"constant":true,"payable":false,"type":"function","gas":10920},{"name":"remove_liquidity_one_coin","outputs":[],"inputs":[{"type":"uint256","name":"_token_amount"},{"type":"int128","name":"i"},{"type":"uint256","name":"min_amount"}],"constant":false,"payable":false,"type":"function","gas":3677379},{"name":"ramp_A","outputs":[],"inputs":[{"type":"uint256","name":"_future_A"},{"type":"uint256","unit":"sec","name":"_future_time"}],"constant":false,"payable":false,"type":"function","gas":151937},{"name":"stop_ramp_A","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":148697},{"name":"commit_new_fee","outputs":[],"inputs":[{"type":"uint256","name":"new_fee"},{"type":"uint256","name":"new_admin_fee"}],"constant":false,"payable":false,"type":"function","gas":110521},{"name":"apply_new_fee","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":97220},{"name":"revert_new_parameters","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":21955},{"name":"commit_transfer_ownership","outputs":[],"inputs":[{"type":"address","name":"_owner"}],"constant":false,"payable":false,"type":"function","gas":74632},{"name":"apply_transfer_ownership","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":60688},{"name":"revert_transfer_ownership","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":22045},{"name":"withdraw_admin_fees","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":12424},{"name":"kill_me","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":37998},{"name":"unkill_me","outputs":[],"inputs":[],"constant":false,"payable":false,"type":"function","gas":22135},{"name":"coins","outputs":[{"type":"address","name":""}],"inputs":[{"type":"int128","name":"arg0"}],"constant":true,"payable":false,"type":"function","gas":2310},{"name":"balances","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"arg0"}],"constant":true,"payable":false,"type":"function","gas":2340},{"name":"fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2171},{"name":"admin_fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2201},{"name":"owner","outputs":[{"type":"address","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2231},{"name":"initial_A","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2261},{"name":"future_A","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2291},{"name":"initial_A_time","outputs":[{"type":"uint256","unit":"sec","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2321},{"name":"future_A_time","outputs":[{"type":"uint256","unit":"sec","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2351},{"name":"admin_actions_deadline","outputs":[{"type":"uint256","unit":"sec","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2381},{"name":"transfer_ownership_deadline","outputs":[{"type":"uint256","unit":"sec","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2411},{"name":"future_fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2441},{"name":"future_admin_fee","outputs":[{"type":"uint256","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2471},{"name":"future_owner","outputs":[{"type":"address","name":""}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":2501}],
	N_COINS: 2,
	coin_precisions: [1e8, 1e8],
	wrapped_precisions: [1e8, 1e8],
	tethered: [false, false],
	use_lending: [false, false],
	is_plain: [true, true],
	swap_address: '0x93054188d876f558f4a66B2EF1d97d16eDf0895B',
	token_address: '0x49849C98ae39Fff122806C06791Fa73784FB3675',
	infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
	underlying_coins: [
		'0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
		'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
	],
	coins: [
		'0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
		'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
	],
	adapterABI: [{"inputs":[{"internalType":"contract ICurveExchange","name":"_exchange","type":"address"},{"internalType":"contract IGatewayRegistry","name":"_registry","type":"address"},{"internalType":"contract IERC20","name":"_wbtc","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"burnAmount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"mintedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"curveAmount","type":"uint256"}],"name":"DepositMintedCurve","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"renAmount","type":"uint256"}],"name":"ReceiveRen","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"mintedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wbtcAmount","type":"uint256"}],"name":"SwapReceived","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"chi","outputs":[{"internalType":"contract IFreeFromUpTo","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exchange","outputs":[{"internalType":"contract ICurveExchange","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"string","name":"message","type":"string"},{"internalType":"string","name":"length","type":"string"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256[2]","name":"_amounts","type":"uint256[2]"},{"internalType":"uint256","name":"_min_mint_amount","type":"uint256"},{"internalType":"uint256","name":"_new_min_mint_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintNoDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_newMinExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_slippage","type":"uint256"},{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintNoSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256[2]","name":"_amounts","type":"uint256[2]"},{"internalType":"uint256","name":"_min_mint_amount","type":"uint256"},{"internalType":"uint256","name":"_new_min_mint_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintThenDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_newMinExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_slippage","type":"uint256"},{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintThenSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"encoded","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"recoverStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IGatewayRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256[2]","name":"amounts","type":"uint256[2]"},{"internalType":"uint256","name":"max_burn_amount","type":"uint256"}],"name":"removeLiquidityImbalanceThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"_token_amounts","type":"uint256"},{"internalType":"uint256","name":"min_amount","type":"uint256"}],"name":"removeLiquidityOneCoinThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[2]","name":"min_amounts","type":"uint256[2]"}],"name":"removeLiquidityThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_minRenbtcAmount","type":"uint256"}],"name":"swapThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"message","type":"string"},{"internalType":"string","name":"length","type":"string"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"chainID","type":"uint256"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"stateMutability":"payable","type":"receive"}],
	oldAdapterAddress: '0x9fe350DfA5F66bC086243F21A8F0932514316627',
	adapterBiconomyAddress: '0x73aB2Bd10aD10F7174a1AD5AFAe3ce3D991C5047',
	adapterAddress: '0x26D9980571e77FfB0349f9c801DD7ca9951Fb656',
}


var sbtc = {
	swap_abi: [{"name": "TokenExchange", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "int128", "name": "sold_id", "indexed": false}, {"type": "uint256", "name": "tokens_sold", "indexed": false}, {"type": "int128", "name": "bought_id", "indexed": false}, {"type": "uint256", "name": "tokens_bought", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256[3]", "name": "token_amounts", "indexed": false}, {"type": "uint256[3]", "name": "fees", "indexed": false}, {"type": "uint256", "name": "invariant", "indexed": false}, {"type": "uint256", "name": "token_supply", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256[3]", "name": "token_amounts", "indexed": false}, {"type": "uint256[3]", "name": "fees", "indexed": false}, {"type": "uint256", "name": "token_supply", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidityOne", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": false}, {"type": "uint256", "name": "coin_amount", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidityImbalance", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256[3]", "name": "token_amounts", "indexed": false}, {"type": "uint256[3]", "name": "fees", "indexed": false}, {"type": "uint256", "name": "invariant", "indexed": false}, {"type": "uint256", "name": "token_supply", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "CommitNewAdmin", "inputs": [{"type": "uint256", "name": "deadline", "indexed": true, "unit": "sec"}, {"type": "address", "name": "admin", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "NewAdmin", "inputs": [{"type": "address", "name": "admin", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "CommitNewFee", "inputs": [{"type": "uint256", "name": "deadline", "indexed": true, "unit": "sec"}, {"type": "uint256", "name": "fee", "indexed": false}, {"type": "uint256", "name": "admin_fee", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "NewFee", "inputs": [{"type": "uint256", "name": "fee", "indexed": false}, {"type": "uint256", "name": "admin_fee", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "RampA", "inputs": [{"type": "uint256", "name": "old_A", "indexed": false}, {"type": "uint256", "name": "new_A", "indexed": false}, {"type": "uint256", "name": "initial_time", "indexed": false, "unit": "sec"}, {"type": "uint256", "name": "future_time", "indexed": false, "unit": "sec"}], "anonymous": false, "type": "event"}, {"name": "StopRampA", "inputs": [{"type": "uint256", "name": "A", "indexed": false}, {"type": "uint256", "name": "t", "indexed": false, "unit": "sec"}], "anonymous": false, "type": "event"}, {"outputs": [], "inputs": [{"type": "address[3]", "name": "_coins"}, {"type": "address", "name": "_pool_token"}, {"type": "uint256", "name": "_A"}, {"type": "uint256", "name": "_fee"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "A", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 5227}, {"name": "get_virtual_price", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1150488}, {"name": "calc_token_amount", "outputs": [{"type": "uint256", "name": ""}], "inputs": [{"type": "uint256[3]", "name": "amounts"}, {"type": "bool", "name": "deposit"}], "constant": true, "payable": false, "type": "function", "gas": 4526955}, {"name": "add_liquidity", "outputs": [], "inputs": [{"type": "uint256[3]", "name": "amounts"}, {"type": "uint256", "name": "min_mint_amount"}], "constant": false, "payable": false, "type": "function", "gas": 6972762}, {"name": "get_dy", "outputs": [{"type": "uint256", "name": ""}], "inputs": [{"type": "int128", "name": "i"}, {"type": "int128", "name": "j"}, {"type": "uint256", "name": "dx"}], "constant": true, "payable": false, "type": "function", "gas": 2687932}, {"name": "get_dy_underlying", "outputs": [{"type": "uint256", "name": ""}], "inputs": [{"type": "int128", "name": "i"}, {"type": "int128", "name": "j"}, {"type": "uint256", "name": "dx"}], "constant": true, "payable": false, "type": "function", "gas": 2687745}, {"name": "exchange", "outputs": [], "inputs": [{"type": "int128", "name": "i"}, {"type": "int128", "name": "j"}, {"type": "uint256", "name": "dx"}, {"type": "uint256", "name": "min_dy"}], "constant": false, "payable": false, "type": "function", "gas": 5499133}, {"name": "remove_liquidity", "outputs": [], "inputs": [{"type": "uint256", "name": "_amount"}, {"type": "uint256[3]", "name": "min_amounts"}], "constant": false, "payable": false, "type": "function", "gas": 196975}, {"name": "remove_liquidity_imbalance", "outputs": [], "inputs": [{"type": "uint256[3]", "name": "amounts"}, {"type": "uint256", "name": "max_burn_amount"}], "constant": false, "payable": false, "type": "function", "gas": 6972281}, {"name": "calc_withdraw_one_coin", "outputs": [{"type": "uint256", "name": ""}], "inputs": [{"type": "uint256", "name": "_token_amount"}, {"type": "int128", "name": "i"}], "constant": true, "payable": false, "type": "function", "gas": 15405}, {"name": "remove_liquidity_one_coin", "outputs": [], "inputs": [{"type": "uint256", "name": "_token_amount"}, {"type": "int128", "name": "i"}, {"type": "uint256", "name": "min_amount"}], "constant": false, "payable": false, "type": "function", "gas": 4044074}, {"name": "ramp_A", "outputs": [], "inputs": [{"type": "uint256", "name": "_future_A"}, {"type": "uint256", "unit": "sec", "name": "_future_time"}], "constant": false, "payable": false, "type": "function", "gas": 151937}, {"name": "stop_ramp_A", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 148697}, {"name": "commit_new_fee", "outputs": [], "inputs": [{"type": "uint256", "name": "new_fee"}, {"type": "uint256", "name": "new_admin_fee"}], "constant": false, "payable": false, "type": "function", "gas": 110521}, {"name": "apply_new_fee", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 97220}, {"name": "revert_new_parameters", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 21955}, {"name": "commit_transfer_ownership", "outputs": [], "inputs": [{"type": "address", "name": "_owner"}], "constant": false, "payable": false, "type": "function", "gas": 74632}, {"name": "apply_transfer_ownership", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 60688}, {"name": "revert_transfer_ownership", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 22045}, {"name": "withdraw_admin_fees", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 17565}, {"name": "kill_me", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 37998}, {"name": "unkill_me", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 22135}, {"name": "coins", "outputs": [{"type": "address", "name": ""}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2310}, {"name": "balances", "outputs": [{"type": "uint256", "name": ""}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2340}, {"name": "fee", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2171}, {"name": "admin_fee", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2201}, {"name": "owner", "outputs": [{"type": "address", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2231}, {"name": "initial_A", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2261}, {"name": "future_A", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2291}, {"name": "initial_A_time", "outputs": [{"type": "uint256", "unit": "sec", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2321}, {"name": "future_A_time", "outputs": [{"type": "uint256", "unit": "sec", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2351}, {"name": "admin_actions_deadline", "outputs": [{"type": "uint256", "unit": "sec", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2381}, {"name": "transfer_ownership_deadline", "outputs": [{"type": "uint256", "unit": "sec", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2411}, {"name": "future_fee", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2441}, {"name": "future_admin_fee", "outputs": [{"type": "uint256", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2471}, {"name": "future_owner", "outputs": [{"type": "address", "name": ""}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2501}],
	N_COINS: 3,
	coin_precisions: [1e8, 1e8, 1e18],
	wrapped_precisions: [1e8, 1e8, 1e18],
	tethered: [false, false, false],
	use_lending: [false, false, false],
	is_plain: [true, true, true],
	swap_address: '0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714',
	token_address: '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3',
	infura_url: 'https://mainnet.infura.io/v3/c334bb4b45a444979057f0fb8a0c9d1b',
	underlying_coins: [
		'0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
		'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
		'0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',
	],
	coins: [
		'0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
		'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
		'0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',	
	],
	adapterABI: [{"inputs":[{"internalType":"contract ICurveExchange","name":"_exchange","type":"address"},{"internalType":"address","name":"_curveTokenAddress","type":"address"},{"internalType":"contract IGatewayRegistry","name":"_registry","type":"address"},{"internalType":"contract IERC20[3]","name":"_coins","type":"address[3]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"burnAmount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"mintedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"curveAmount","type":"uint256"},{"indexed":false,"internalType":"uint256[3]","name":"amounts","type":"uint256[3]"}],"name":"DepositMintedCurve","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"renAmount","type":"uint256"}],"name":"ReceiveRen","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"mintedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"erc20BTCAmount","type":"uint256"},{"indexed":false,"internalType":"int128","name":"j","type":"int128"}],"name":"SwapReceived","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"chi","outputs":[{"internalType":"contract IFreeFromUpTo","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exchange","outputs":[{"internalType":"contract ICurveExchange","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"string","name":"message","type":"string"},{"internalType":"string","name":"length","type":"string"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256[3]","name":"_amounts","type":"uint256[3]"},{"internalType":"uint256","name":"_min_mint_amount","type":"uint256"},{"internalType":"uint256","name":"_new_min_mint_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintThenDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_newMinExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_slippage","type":"uint256"},{"internalType":"int128","name":"_j","type":"int128"},{"internalType":"address payable","name":"_coinDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintThenSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"encoded","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"recoverStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IGatewayRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"address","name":"_coinDestination","type":"address"},{"internalType":"uint256[3]","name":"amounts","type":"uint256[3]"},{"internalType":"uint256","name":"max_burn_amount","type":"uint256"}],"name":"removeLiquidityImbalanceThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"_token_amounts","type":"uint256"},{"internalType":"uint256","name":"min_amount","type":"uint256"},{"internalType":"uint8","name":"_i","type":"uint8"}],"name":"removeLiquidityOneCoinThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"address","name":"_coinDestination","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[3]","name":"min_amounts","type":"uint256[3]"}],"name":"removeLiquidityThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_minRenbtcAmount","type":"uint256"},{"internalType":"uint8","name":"_i","type":"uint8"}],"name":"swapThenBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"message","type":"string"},{"internalType":"string","name":"length","type":"string"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"chainID","type":"uint256"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"stateMutability":"payable","type":"receive"}],
	oldAdapterAddress: '0x104c1E66c67c385E6095FFcC6227D75c761DC019',
	adapterBiconomyAddress: '0xAEade605D01FE9a8e9C4B3AA0130A90d62167029',
	adapterAddress: '0x02B3F51AC9202aA19be63d61A8C681579D6E3a51',

	sCurveRewards_abi: [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"}],"name":"setRewardsDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],

	sCurveRewards_address: '0x13C1542A468319688B89E323fe9A3Be3A90EBb27',
}


export let iearnAPR_abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"APR","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNI","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNIAPR","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNIROI","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"aave","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"aaveUni","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"aToken","type":"address"}],"name":"addAToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"aToken","type":"address"}],"name":"addAUniToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"cToken","type":"address"}],"name":"addCToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"dToken","type":"uint256"}],"name":"addDToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"iToken","type":"address"}],"name":"addIToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"created","type":"uint256"}],"name":"addPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"yToken","type":"address"}],"name":"addYToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compound","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"dydx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"fulcrum","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getAPROptions","outputs":[{"internalType":"uint256","name":"_uniswap","type":"uint256"},{"internalType":"uint256","name":"_compound","type":"uint256"},{"internalType":"uint256","name":"_unicompound","type":"uint256"},{"internalType":"uint256","name":"_fulcrum","type":"uint256"},{"internalType":"uint256","name":"_unifulcrum","type":"uint256"},{"internalType":"uint256","name":"_aave","type":"uint256"},{"internalType":"uint256","name":"_uniaave","type":"uint256"},{"internalType":"uint256","name":"_dydx","type":"uint256"},{"internalType":"uint256","name":"_ddex","type":"uint256"},{"internalType":"uint256","name":"_lendf","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_supply","type":"uint256"}],"name":"getAPROptionsAdjusted","outputs":[{"internalType":"uint256","name":"_uniswap","type":"uint256"},{"internalType":"uint256","name":"_compound","type":"uint256"},{"internalType":"uint256","name":"_unicompound","type":"uint256"},{"internalType":"uint256","name":"_fulcrum","type":"uint256"},{"internalType":"uint256","name":"_unifulcrum","type":"uint256"},{"internalType":"uint256","name":"_aave","type":"uint256"},{"internalType":"uint256","name":"_uniaave","type":"uint256"},{"internalType":"uint256","name":"_dydx","type":"uint256"},{"internalType":"uint256","name":"_ddex","type":"uint256"},{"internalType":"uint256","name":"_lendf","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getAPROptionsInc","outputs":[{"internalType":"uint256","name":"_uniswap","type":"uint256"},{"internalType":"uint256","name":"_compound","type":"uint256"},{"internalType":"uint256","name":"_unicompound","type":"uint256"},{"internalType":"uint256","name":"_fulcrum","type":"uint256"},{"internalType":"uint256","name":"_unifulcrum","type":"uint256"},{"internalType":"uint256","name":"_aave","type":"uint256"},{"internalType":"uint256","name":"_uniaave","type":"uint256"},{"internalType":"uint256","name":"_dydx","type":"uint256"},{"internalType":"uint256","name":"_ddex","type":"uint256"},{"internalType":"uint256","name":"_lendf","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"inCaseETHGetsStuck","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"_TokenAddress","type":"address"}],"name":"inCaseTokenGetsStuck","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pools","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"recommend","outputs":[{"internalType":"string","name":"choice","type":"string"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_APR","type":"address"}],"name":"set_new_APR","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_UNI","type":"address"}],"name":"set_new_UNI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_UNIAPR","type":"address"}],"name":"set_new_UNIAPR","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_UNIROI","type":"address"}],"name":"set_new_UNIROI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"viewPool","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"unipool","type":"address"},{"internalType":"uint256","name":"created","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"yTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

export let iearnAPR_address = '0x4100FB8d05e37a897ACB686AAc833DD7e49aa591'

export let onesplit_address = '0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E'

export let onesplit_abi = [{"inputs":[{"internalType":"contract IOneSplit","name":"impl","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newImpl","type":"address"}],"name":"ImplementationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_AAVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_BANCOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_BDAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CHAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_BINANCE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_USDT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_Y","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_FULCRUM","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_IEARN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_KYBER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_OASIS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_SMART_TOKEN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_UNISWAP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_BANCOR_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_OASIS_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_UNISWAP_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_MULTI_PATH_ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract IERC20","name":"fromToken","type":"address"},{"internalType":"contract IERC20","name":"toToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"parts","type":"uint256"},{"internalType":"uint256","name":"disableFlags","type":"uint256"}],"name":"getExpectedReturn","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"},{"internalType":"uint256[]","name":"distribution","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"fromToken","type":"address"},{"internalType":"contract IERC20","name":"toToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256","name":"parts","type":"uint256"},{"internalType":"uint256","name":"disableFlags","type":"uint256"}],"name":"goodSwap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oneSplitImpl","outputs":[{"internalType":"contract IOneSplit","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IOneSplit","name":"impl","type":"address"}],"name":"setNewImpl","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"fromToken","type":"address"},{"internalType":"contract IERC20","name":"toToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"distribution","type":"uint256[]"},{"internalType":"uint256","name":"disableFlags","type":"uint256"}],"name":"swap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

export let registry_abi = [
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "name": "deadline",
    "type": "uint256"
   },
   {
    "indexed": true,
    "name": "admin",
    "type": "address"
   }
  ],
  "name": "CommitNewAdmin",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "name": "admin",
    "type": "address"
   }
  ],
  "name": "NewAdmin",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "name": "buyer",
    "type": "address"
   },
   {
    "indexed": true,
    "name": "pool",
    "type": "address"
   },
   {
    "indexed": false,
    "name": "token_sold",
    "type": "address"
   },
   {
    "indexed": false,
    "name": "token_bought",
    "type": "address"
   },
   {
    "indexed": false,
    "name": "amount_sold",
    "type": "uint256"
   },
   {
    "indexed": false,
    "name": "amount_bought",
    "type": "uint256"
   }
  ],
  "name": "TokenExchange",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "name": "pool",
    "type": "address"
   },
   {
    "indexed": false,
    "name": "rate_method_id",
    "type": "bytes"
   }
  ],
  "name": "PoolAdded",
  "type": "event"
 },
 {
  "anonymous": false,
  "inputs": [
   {
    "indexed": true,
    "name": "pool",
    "type": "address"
   }
  ],
  "name": "PoolRemoved",
  "type": "event"
 },
 {
  "constant": false,
  "inputs": [
   {
    "name": "_returns_none",
    "type": "address[4]"
   }
  ],
  "outputs": [],
  "payable": false,
  "type": "constructor",
  "name": "constructor"
 },
 {
  "constant": true,
  "inputs": [
   {
    "name": "_from",
    "type": "address"
   },
   {
    "name": "_to",
    "type": "address"
   }
  ],
  "name": "find_pool_for_coins",
  "outputs": [
   {
    "name": "",
    "type": "address"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "inputs": [
   {
    "name": "_from",
    "type": "address"
   },
   {
    "name": "_to",
    "type": "address"
   },
   {
    "name": "i",
    "type": "uint256"
   }
  ],
  "name": "find_pool_for_coins",
  "outputs": [
   {
    "name": "",
    "type": "address"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 35452,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   }
  ],
  "name": "get_pool_coins",
  "outputs": [
   {
    "components": [
     {
      "name": "coins",
      "type": "address[8]"
     },
     {
      "name": "underlying_coins",
      "type": "address[8]"
     },
     {
      "name": "decimals",
      "type": "uint256[8]"
     }
    ],
    "name": "",
    "type": "tuple"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 58032,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   }
  ],
  "name": "get_pool_info",
  "outputs": [
   {
    "components": [
     {
      "name": "balances",
      "type": "uint256[8]"
     },
     {
      "name": "underlying_balances",
      "type": "uint256[8]"
     },
     {
      "name": "decimals",
      "type": "uint256[8]"
     },
     {
      "name": "lp_token",
      "type": "address"
     },
     {
      "name": "A",
      "type": "uint256"
     },
     {
      "name": "fee",
      "type": "uint256"
     }
    ],
    "name": "",
    "type": "tuple"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 44706,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   }
  ],
  "name": "get_pool_rates",
  "outputs": [
   {
    "name": "",
    "type": "uint256[8]"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 6943,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   },
   {
    "name": "_from",
    "type": "address"
   },
   {
    "name": "_to",
    "type": "address"
   }
  ],
  "name": "estimate_gas_used",
  "outputs": [
   {
    "name": "",
    "type": "uint256"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 44966,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   },
   {
    "name": "_from",
    "type": "address"
   },
   {
    "name": "_to",
    "type": "address"
   },
   {
    "name": "_amount",
    "type": "uint256"
   }
  ],
  "name": "get_exchange_amount",
  "outputs": [
   {
    "name": "",
    "type": "uint256"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 133643,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   },
   {
    "name": "_from",
    "type": "address"
   },
   {
    "name": "_to",
    "type": "address"
   },
   {
    "name": "_amount",
    "type": "uint256"
   },
   {
    "name": "_expected",
    "type": "uint256"
   }
  ],
  "name": "exchange",
  "outputs": [
   {
    "name": "",
    "type": "bool"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   },
   {
    "name": "_n_coins",
    "type": "int128"
   },
   {
    "name": "_lp_token",
    "type": "address"
   },
   {
    "name": "_decimals",
    "type": "uint256[8]"
   },
   {
    "name": "_rate_method_id",
    "type": "bytes"
   }
  ],
  "name": "add_pool",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   },
   {
    "name": "_n_coins",
    "type": "int128"
   },
   {
    "name": "_lp_token",
    "type": "address"
   },
   {
    "name": "_decimals",
    "type": "uint256[8]"
   },
   {
    "name": "_rate_method_id",
    "type": "bytes"
   },
   {
    "name": "_use_underlying",
    "type": "bool"
   }
  ],
  "name": "add_pool",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   },
   {
    "name": "_n_coins",
    "type": "int128"
   },
   {
    "name": "_lp_token",
    "type": "address"
   },
   {
    "name": "_decimals",
    "type": "uint256[8]"
   },
   {
    "name": "_rate_method_id",
    "type": "bytes"
   },
   {
    "name": "_use_underlying",
    "type": "bool"
   },
   {
    "name": "_use_rates",
    "type": "bool[8]"
   }
  ],
  "name": "add_pool",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 317792223380,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   }
  ],
  "name": "remove_pool",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 36698,
  "inputs": [
   {
    "name": "_addr",
    "type": "address"
   },
   {
    "name": "_is_returns_none",
    "type": "bool"
   }
  ],
  "name": "set_returns_none",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 355926,
  "inputs": [
   {
    "name": "_addr",
    "type": "address[10]"
   },
   {
    "name": "_amount",
    "type": "uint256[10]"
   }
  ],
  "name": "set_gas_estimates",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 36761,
  "inputs": [
   {
    "name": "_pool",
    "type": "address"
   },
   {
    "name": "_estimator",
    "type": "address"
   }
  ],
  "name": "set_gas_estimate_contract",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 74242,
  "inputs": [
   {
    "name": "_new_admin",
    "type": "address"
   }
  ],
  "name": "commit_transfer_ownership",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 60380,
  "inputs": [],
  "name": "apply_transfer_ownership",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 21655,
  "inputs": [],
  "name": "revert_transfer_ownership",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": false,
  "gas": 4644,
  "inputs": [
   {
    "name": "_token",
    "type": "address"
   }
  ],
  "name": "claim_token_balance",
  "outputs": [],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 1661,
  "inputs": [],
  "name": "admin",
  "outputs": [
   {
    "name": "",
    "type": "address"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 1890,
  "inputs": [
   {
    "name": "arg0",
    "type": "int128"
   }
  ],
  "name": "pool_list",
  "outputs": [
   {
    "name": "",
    "type": "address"
   }
  ],
  "payable": false,
  "type": "function"
 },
 {
  "constant": true,
  "gas": 1721,
  "inputs": [],
  "name": "pool_count",
  "outputs": [
   {
    "name": "",
    "type": "uint256"
   }
  ],
  "payable": false,
  "type": "function"
 }
]

export let synthetixExchanger_address = '0x7Dfe5aa8fc36c0Ae788a3a71062728bFc3036216'

export let synthetixExchanger_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_resolver","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"constant":true,"inputs":[],"name":"MAX_ADDRESSES_FROM_RESOLVER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"bytes32","name":"currencyKey","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"refunded","type":"uint256"}],"name":"calculateAmountAfterSettlement","outputs":[{"internalType":"uint256","name":"amountAfterSettlement","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"bytes32","name":"sourceCurrencyKey","type":"bytes32"},{"internalType":"uint256","name":"sourceAmount","type":"uint256"},{"internalType":"bytes32","name":"destinationCurrencyKey","type":"bytes32"},{"internalType":"address","name":"destinationAddress","type":"address"}],"name":"exchange","outputs":[{"internalType":"uint256","name":"amountReceived","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"exchangeForAddress","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"bytes32","name":"sourceCurrencyKey","type":"bytes32"},{"internalType":"uint256","name":"sourceAmount","type":"uint256"},{"internalType":"bytes32","name":"destinationCurrencyKey","type":"bytes32"}],"name":"exchangeOnBehalf","outputs":[{"internalType":"uint256","name":"amountReceived","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"sourceCurrencyKey","type":"bytes32"},{"internalType":"bytes32","name":"destinationCurrencyKey","type":"bytes32"}],"name":"feeRateForExchange","outputs":[{"internalType":"uint256","name":"exchangeFeeRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"sourceAmount","type":"uint256"},{"internalType":"bytes32","name":"sourceCurrencyKey","type":"bytes32"},{"internalType":"bytes32","name":"destinationCurrencyKey","type":"bytes32"}],"name":"getAmountsForExchange","outputs":[{"internalType":"uint256","name":"amountReceived","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"exchangeFeeRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getResolverAddressesRequired","outputs":[{"internalType":"bytes32[24]","name":"addressesRequired","type":"bytes32[24]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"currencyKey","type":"bytes32"}],"name":"hasWaitingPeriodOrSettlementOwing","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract AddressResolver","name":"_resolver","type":"address"}],"name":"isResolverCached","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"currencyKey","type":"bytes32"}],"name":"maxSecsLeftInWaitingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resolver","outputs":[{"internalType":"contract AddressResolver","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"resolverAddressesRequired","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract AddressResolver","name":"_resolver","type":"address"}],"name":"setResolverAndSyncCache","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_waitingPeriodSecs","type":"uint256"}],"name":"setWaitingPeriodSecs","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"bytes32","name":"currencyKey","type":"bytes32"}],"name":"settle","outputs":[{"internalType":"uint256","name":"reclaimed","type":"uint256"},{"internalType":"uint256","name":"refunded","type":"uint256"},{"internalType":"uint256","name":"numEntriesSettled","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"currencyKey","type":"bytes32"}],"name":"settlementOwing","outputs":[{"internalType":"uint256","name":"reclaimAmount","type":"uint256"},{"internalType":"uint256","name":"rebateAmount","type":"uint256"},{"internalType":"uint256","name":"numEntries","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"waitingPeriodSecs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

export let registry_address = '0x6FF57Ec11498E67B0195bE1A93C2E56fCAd4Fa00'

export let adapterABI = [{"inputs":[{"internalType":"contract ICurveExchange","name":"_exchange","type":"address"},{"internalType":"contract IGatewayRegistry","name":"_registry","type":"address"},{"internalType":"contract IERC20","name":"_wbtc","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"burnAmount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"mintedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"curveAmount","type":"uint256"}],"name":"DepositMintedCurve","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"renAmount","type":"uint256"}],"name":"ReceiveRen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldRelayHub","type":"address"},{"indexed":true,"internalType":"address","name":"newRelayHub","type":"address"}],"name":"RelayHubChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"mintedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wbtcAmount","type":"uint256"}],"name":"SwapReceived","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"acceptRelayedCall","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"exchange","outputs":[{"internalType":"contract ICurveExchange","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getHubAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256[2]","name":"_amounts","type":"uint256[2]"},{"internalType":"uint256","name":"_min_mint_amount","type":"uint256"},{"internalType":"uint256","name":"_new_min_mint_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintNoDeposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_minExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_newMinExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_slippage","type":"uint256"},{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintNoSwap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256[2]","name":"_amounts","type":"uint256[2]"},{"internalType":"uint256","name":"_min_mint_amount","type":"uint256"},{"internalType":"uint256","name":"_new_min_mint_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintThenDeposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_minExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_newMinExchangeRate","type":"uint256"},{"internalType":"uint256","name":"_slippage","type":"uint256"},{"internalType":"address payable","name":"_wbtcDestination","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_nHash","type":"bytes32"},{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"mintThenSwap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"context","type":"bytes"},{"internalType":"bool","name":"success","type":"bool"},{"internalType":"uint256","name":"actualCharge","type":"uint256"},{"internalType":"bytes32","name":"preRetVal","type":"bytes32"}],"name":"postRelayedCall","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"context","type":"bytes"}],"name":"preRelayedCall","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"internalType":"contract IGatewayRegistry","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"relayHubVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256[2]","name":"amounts","type":"uint256[2]"},{"internalType":"uint256","name":"max_burn_amount","type":"uint256"}],"name":"removeLiquidityImbalanceThenBurn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"_token_amounts","type":"uint256"},{"internalType":"uint256","name":"min_amount","type":"uint256"}],"name":"removeLiquidityOneCoinThenBurn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[2]","name":"min_amounts","type":"uint256[2]"}],"name":"removeLiquidityThenBurn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"_btcDestination","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_minRenbtcAmount","type":"uint256"}],"name":"swapThenBurn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

export let adapterAddress = '0x9fe350DfA5F66bC086243F21A8F0932514316627'

export let sbtcRewards_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"}],"name":"setRewardsDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

export let sbtcRewards_address = '0x13C1542A468319688B89E323fe9A3Be3A90EBb27'

export let balancer_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"amt","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LOG_CALL","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"tokenOut","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmountOut","type":"uint256"}],"name":"LOG_EXIT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"tokenIn","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmountIn","type":"uint256"}],"name":"LOG_JOIN","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"tokenIn","type":"address"},{"indexed":true,"internalType":"address","name":"tokenOut","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmountOut","type":"uint256"}],"name":"LOG_SWAP","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"amt","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"BONE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BPOW_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"EXIT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INIT_POOL_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_BOUND_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_BPOW_BASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_IN_RATIO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_OUT_RATIO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_TOTAL_WEIGHT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_WEIGHT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIN_BALANCE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIN_BOUND_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIN_BPOW_BASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIN_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIN_WEIGHT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"whom","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"denorm","type":"uint256"}],"name":"bind","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenWeightIn","type":"uint256"},{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"tokenWeightOut","type":"uint256"},{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcInGivenOut","outputs":[{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenWeightIn","type":"uint256"},{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"tokenWeightOut","type":"uint256"},{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcOutGivenIn","outputs":[{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"tokenWeightOut","type":"uint256"},{"internalType":"uint256","name":"poolSupply","type":"uint256"},{"internalType":"uint256","name":"totalWeight","type":"uint256"},{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcPoolInGivenSingleOut","outputs":[{"internalType":"uint256","name":"poolAmountIn","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenWeightIn","type":"uint256"},{"internalType":"uint256","name":"poolSupply","type":"uint256"},{"internalType":"uint256","name":"totalWeight","type":"uint256"},{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcPoolOutGivenSingleIn","outputs":[{"internalType":"uint256","name":"poolAmountOut","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenWeightIn","type":"uint256"},{"internalType":"uint256","name":"poolSupply","type":"uint256"},{"internalType":"uint256","name":"totalWeight","type":"uint256"},{"internalType":"uint256","name":"poolAmountOut","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcSingleInGivenPoolOut","outputs":[{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"tokenWeightOut","type":"uint256"},{"internalType":"uint256","name":"poolSupply","type":"uint256"},{"internalType":"uint256","name":"totalWeight","type":"uint256"},{"internalType":"uint256","name":"poolAmountIn","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcSingleOutGivenPoolIn","outputs":[{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenWeightIn","type":"uint256"},{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"tokenWeightOut","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcSpotPrice","outputs":[{"internalType":"uint256","name":"spotPrice","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"decreaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"poolAmountIn","type":"uint256"},{"internalType":"uint256[]","name":"minAmountsOut","type":"uint256[]"}],"name":"exitPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"internalType":"uint256","name":"maxPoolAmountIn","type":"uint256"}],"name":"exitswapExternAmountOut","outputs":[{"internalType":"uint256","name":"poolAmountIn","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"poolAmountIn","type":"uint256"},{"internalType":"uint256","name":"minAmountOut","type":"uint256"}],"name":"exitswapPoolAmountIn","outputs":[{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getColor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getController","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentTokens","outputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getDenormalizedWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFinalTokens","outputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getNormalizedWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"}],"name":"getSpotPrice","outputs":[{"internalType":"uint256","name":"spotPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"}],"name":"getSpotPriceSansFee","outputs":[{"internalType":"uint256","name":"spotPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSwapFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalDenormalizedWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"gulp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"increaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"t","type":"address"}],"name":"isBound","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isFinalized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isPublicSwap","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"poolAmountOut","type":"uint256"},{"internalType":"uint256[]","name":"maxAmountsIn","type":"uint256[]"}],"name":"joinPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"internalType":"uint256","name":"minPoolAmountOut","type":"uint256"}],"name":"joinswapExternAmountIn","outputs":[{"internalType":"uint256","name":"poolAmountOut","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"poolAmountOut","type":"uint256"},{"internalType":"uint256","name":"maxAmountIn","type":"uint256"}],"name":"joinswapPoolAmountOut","outputs":[{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"denorm","type":"uint256"}],"name":"rebind","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"}],"name":"setController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"public_","type":"bool"}],"name":"setPublicSwap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"minAmountOut","type":"uint256"},{"internalType":"uint256","name":"maxPrice","type":"uint256"}],"name":"swapExactAmountIn","outputs":[{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"internalType":"uint256","name":"spotPriceAfter","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"maxAmountIn","type":"uint256"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"internalType":"uint256","name":"maxPrice","type":"uint256"}],"name":"swapExactAmountOut","outputs":[{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"internalType":"uint256","name":"spotPriceAfter","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"unbind","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

export let balancer_address = '0x330416C863f2acCE7aF9C9314B422d24c672534a'

export let CHI_address = '0x0000000000004946c0e9F43F4Dee607b0eF1fA1c'

export default {compound, usdt, iearn, y: iearn, busd, susd, susdv2, pax, tbtc, ren, sbtc,}
