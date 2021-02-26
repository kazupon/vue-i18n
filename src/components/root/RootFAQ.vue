<template>

	<div class="window white">
        <h2>Curve FAQ</h2>
        <h3>What is Curve?</h3>
        <a href='https://www.curve.fi/stableswap-paper.pdf'>Whitepaper</a>
        <p>
            Curve is an exchange liquidity pool on Ethereum (like <a
             href="https://uniswap.exchange/">Uniswap</a>)
            designed for (1) extremely efficient stablecoin trading (2) low
            risk, supplemental fee income for liquidity providers, without an
            opportunity cost.</p>

            <p>Curve allows users (and smart contracts like
            <a href="http://1inch.exchange/">1inch</a>,
            <a href="https://paraswap.io/">Paraswap</a>, <a href="https://swap.totle.com/">Totle</a> and <a href="https://dex.ag/">Dex.ag</a>)
            to trade between DAI and USDC with a bespoke low slippage, low fee algorithm
            designed specifically for stablecoins and earn fees. Behind the scenes, the
            liquidity pool is also supplied to the <a href="https://compound.finance/">Compound</a> protocol
            or <a href="https://iearn.finance/">iearn.finance</a>
            where it generates even more income for liquidity providers.

            <div>
                <router-link to='/integrations'>Integrations</router-link>
            </div>

            <div>
                <a href='https://guides.curve.fi' rel='noopener noreferrer'>Guides</a>
            </div>

            <p>
                <a href='https://medium.com/@crypto.tutorials/curve-fi-how-does-it-work-b673a8fe16cc' rel='noopener noreferrer'>Getting started tutorial</a>
            </p>

            <p>
                <a href='https://www.youtube.com/watch?v=fGxTwm-rf1s' rel='noopener noreferrer'>How to use Curve Y pool video</a>
            </p>

            <p>
                <a href='https://www.youtube.com/watch?v=1SN7zKlb5pk' rel='noopener noreferrer'>How Curve.fi works</a>
            </p>

            <p>
                <a href='https://www.youtube.com/watch?v=4zxgQZclYPo' rel='noopener noreferrer'>How to deposit BTC to sBTC pool</a>
            </p>

            <p>
                <a href='https://www.youtube.com/watch?v=8Z0PmN0F0vQ' rel='noopener noreferrer'>Deposit BTC into Curve pools</a>
            </p>
        </p>

        <h3>Has Curve been audited?</h3>
        <p>Curve smart contracts were <router-link to="/audits">Audited</router-link> by
        Trail of Bits.</p>
        <p>However, security audits don't eliminate risks completely.
        Please don’t supply your life savings, or assets you
        can’t afford to lose, to Curve, especially as a liquidity
        provider.</p>

        <p>Using Curve as an exchange user should be significantly less
        risky, but this is not advice.</p>

        <h3>
            <router-link to="/bugbounty">Bug bounty</router-link>
        </h3>

        <h3>Source code git</h3>
        <p>
  			<a href="https://github.com/curvefi/curve-contract">Smart contracts</a>
        </p>
        <p>
		 	<a href="https://github.com/pengiundev/curve-vue">Frontend</a>
		</p>
        <p>
            <a href='https://github.com/curvefi/curve-pool-registry/blob/b17/doc/notebook/playbook.ipynb'>Curve pool registry</a>
        </p>

        <h3>How do I trade on Curve?</h3>
        <p>Before trading, you’ll have to approve Curve to interact with
        your stablecoin balance, similar to most DeFi applications.</p>

        <p>On the exchange page, select the asset you would like to convert (e.g.
        USDC), and the quantity (e.g. 1,000) - the exchange rate, and
        quantity that you will receive (including and all slippage and fees)
        will be displayed. The exchange rate might surprise you - that’s the
        power of Curve.</p>

        <h3>Fees</h3>
        <p>
            Currently the fee on all pools is 0.04% which all goes to liquidity providers. There is no admin fee.
        </p>
        <p>
            In the future, fees and pool parameters will be decided by a DAO.
        </p>


        <h3>How do I provide liquidity to Curve?</h3>

        <p>Curve uses <a href="https://compound.finance/ctokens">cTokens</a>,
        or <a href="https://docs.iearn.finance/curve">Ytokens</a>
        assets for lending while market making, as the
        liquidity pool - this ensures that assets are always being put to
        work.</p>

        <p>
            You can deposit plain stablecoins - DAI/USDC/USDT/TUSD/BUSD/sUSD 
            which will get converted underneath to cTokens for compound pool or yTokens for 
            <router-link to='/pax'>pax</router-link>, <router-link to='/y'>y</router-link>, <router-link to='/busd'>busd</router-link> pools
            or you can click the "Deposit wrapped" option to
            deposit cTokens or yTokens if you have them.
        </p>

        <p>
            You can also deposit Bitcoin ERC20s - renBTC, WBTC, sBTC in the <router-link to='/ren'>ren</router-link> and <router-link to='sbtc'>pools</router-link>
        </p>

        <h3>What's "Use maximum amount of coins available"?</h3>
        <p>This means using all USDC and DAI in your wallet. This way is
        recommended only if you have much less coins than currently in
        liquidity pool.</p>

        <h3>What's "Infinite approval - trust this contract forever"?</h3>
        <p>This means that you preapprove the contract to to be able to spend any amount of your coins when you interact with it.
        This means that you won't be asked every time to appove the amount of coins you want to transfer to the contract.
        </p>

        <h3>How to withdraw liquidity I provided?</h3>
        <p>Go to the withdraw page. If you want
        to withdraw some percentage of your liquidity (the preferred way),
        type that percentage in the top field.
        You can, however, withdraw in a form of individual coins (USDC,
        DAI, ...), having the exchange happening for you, if you type amounts in
        lower fields. You'll get charge with the exchange fee in the latter
        case.</p>

        <a href='https://curve-dev.vercel.app' class='devserver'>Development environment</a>
    </div>

</template>

<style scoped>
    .window.white a {
        border-bottom: 1px dashed gray;
    }
    .window.white a:hover {
        border-bottom: none;
    }
    .window.white .devserver {
        font-size: 0.8em;
        border-bottom: none;
        opacity: 0.2;
    }
</style>