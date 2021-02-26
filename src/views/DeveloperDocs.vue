<template>
	<div class='window white'>
		<fieldset class='devdialog donations'>
			<legend>Developer Docs</legend>
		 	<a href = "https://github.com/curvefi/curve-vue/blob/master/src/docs/README.md#how-to-integrate-curve-smart-contracts">
				<img class='icon' :src="publicPath + 'curveIcons/curve-registry.svg'"> <span class='text'>Pool Docs</span>
			</a>
			<a href = "https://github.com/curvefi/curve-pool-registry/blob/b17/doc/notebook/playbook.ipynb">
				<img class='icon' :src="publicPath + 'curveIcons/curve-registry.svg'"> <span class='text'>Curve Registry Docs</span>
			</a>
			<a href = "https://github.com/curvefi/curve-vue/blob/master/src/docs/README.md#calculating-volume-balances-and-prices">
				<img class='icon' :src="publicPath + 'curveIcons/curve-registry.svg'"> <span class='text'>Stats Docs</span>
			</a>
		</fieldset>
		</div>
</template>

<script>
	export default {
		data: () => ({

		}),

		computed: {
			publicPath() {
				return process.env.BASE_URL
			},
		},
	}
</script>

<style scoped>
	legend {
		text-align: center;
	}
	.devdialog a {
		display: flex;
		align-items: center;
		padding: 0.1em;
	}
	.devdialog a img {
		margin-right: 10px;
	}
	.devdialog div {
		display: block;
		margin-top: 10px;
	}
	.devdialog a:hover {
	    background-color: blue;
    	color: white;
	}
</style>