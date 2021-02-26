<template>
	<div class='window white'>
		<fieldset>
			<legend>Historical LP <img class='icon small' :src="publicPath + 'logo.png'"> CRV Distribution</legend>
			<div class='info-message gentle-message'>
				<a href='https://dao.curve.fi/minter/vesting'>
					Vesting UI - claim CRV
				</a>	
			</div>
			<div class='input'>
				<label for='address'>Address:</label>
				<input id='address' type='text' v-model='address'>
			</div>
			<button @click='submit'>Check</button>

			<div class='earlyCRV' v-show='crv !== null'>
				Early &nbsp; <img class='icon small' :src="publicPath + 'logo.png'"> &nbsp; CRV amount: {{ crv }}
			</div>
			<div class='datainfo'>
				<a href='https://github.com/curvefi/early-user-distribution'>Calculation script</a>
				<a href='https://github.com/curvefi/CRV-distribution-data'>Data subgraphs</a>
				<a href='https://guides.curve.fi/everything-you-need-to-know-about-crv/'>Everything known about the CRV token article</a>
			</div>
			<div class='info-message gentle-message'>
				If you find inconsistencies, please contract us on 
				<a href="https://twitter.com/CurveFinance" rel='noopener noreferrer'>#Twitter</a>,
      			<a href="https://t.me/curvefi" rel='noopener noreferrer'>@Telegram</a>,
				<a href="https://discord.gg/9uEHakc" rel='noopener noreferrer'>@Discord</a>
			</div>
		</fieldset>
	</div>
</template>

<script>
    import { getters, contract as currentContract, gas as contractGas} from '../contract'

	export default {
		data: () => ({
			address: '',

			crv: null,
		}),

		async created() {
			this.$watch(()=>currentContract.default_account, (val, oldval) => {
                if(!val || !oldval) return;
                if(val.toLowerCase() != oldval.toLowerCase()) this.mounted();
            })
            this.$watch(()=>currentContract.initializedContracts, val => {
                if(val) this.mounted();
                console.timeEnd('initswap')
            })

		},

		mounted() {
			if(currentContract.initializedContracts) this.mounted();
		},

		computed: {
			publicPath() {
                return process.env.BASE_URL
            },
		},

		methods: {
			async mounted() {
				this.address = currentContract.default_account

				if(this.address)
					this.submit()
			},
			async submit() {
				if(!this.address) return;
				let crv = await fetch('https://pushservice.curve.fi/earlyCRV/' + this.address)
				crv = await crv.json()
				crv = crv.CRV
				this.crv = crv * 151515151
			},
		},
	}
</script>

<style scoped>
	legend {
		text-align: center;
	}
	.input {
		margin-top: 1em;
		display: flex;
		align-items: center;
	}
	.input input {
		margin-left: 1em;
		width: 31em;
	}
	button {
		margin-top: 1em;
	}
	.earlyCRV {
		display: flex;
		align-items: center;
		margin-top: 1em;
	}
	.earlyCRV img {
		margin-left: 0.5em;
		margin-right: 0.5em;
	}
	.info-message a {
		color: white;
	}
	.datainfo {
		margin-top: 1em;
	}
	.datainfo a {
		display: block;
		margin-top: 1em;
	}
</style>