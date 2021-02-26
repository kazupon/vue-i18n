<template>
	<div :class="{'window white': $route.path == '/risks'}">
        <h2>
            Risks of using 
            <img :src="publicPath + 'logo.png'" class='icon'> Curve Finance
        </h2>

        <p>
            Providing liquidity on Curve doesn't come without risks. Before making a deposit, it is best to research and understand the risks involved.
        </p>

        <a href='https://www.curve.fi/stableswap-paper.pdf'>Whitepaper</a>

        <h3>Audits</h3>

        <p>
            <p>Curve smart contracts were <router-link to="/audits">Audited</router-link> by
            Trail of Bits.</p>

            <p>However, security audits don't eliminate risks completely.
            Please don’t supply your life savings, or assets you
            can’t afford to lose, to Curve, especially as a liquidity
            provider.</p>

            <p>Using Curve as an exchange user should be significantly less
            risky, but this is not advice.</p>

        </p>


        <h3>Admin keys</h3>

        <p>
            Admin key allows to pause the contract in an emergency, but only during first 2 months in existence. Also it allows to change amplification coefficient (curve parameter), admin fee (not more than half of fee which LPs take) and the fee. All the changes are timelocked for 3 days before being applied for enough notice.

            <p>Smart contracts <b>CANNOT</b> be upgraded with admin key. This limits actions in a case of emergency, but leaves users fully in control of their funds.</p>

            <p>
                Curve will be transitioning to a DAO to be fully decentralized.
            </p>
        </p>

        <h3>Permanent loss of a peg</h3>

        <p>
            If one of the stablecoins in the pool goes significantly down below the peg of 1.0 and never returns to the peg, it'll effectively mean that pool liquidity providers hold almost all their liquidity in that currency.
        </p>

        <h3>Staking risks</h3>

        <p>
            When staking you use multiple smart contract products each of which has its own risks
        </p>

        <h3>
            <a href='https://guides.curve.fi/how-to-choose-the-right-curve-pool-for-you/' rel='noopener noreferrer'>Learn more about each pool's risks</a>
        </h3>

    </div>
</template>

<script>
    export default {
        computed: {
            publicPath() {
            return process.env.BASE_URL
          },
        },
    }
</script>

<style scoped>
    h2 {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    h2 img {
        margin-left: 0.7em;
        margin-right: 0.3em;
    }

    @media only screen and (max-device-width: 470px) {
        h2 img {
            margin-left: 0;
        }
    }
    .window.white a {
        border-bottom: 1px dashed gray;
    }
    .window.white a:hover {
        border-bottom: none;
    }
</style>