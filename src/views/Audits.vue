<template>
	<div class="window white">
	        <fieldset class=''>
	            <legend>Audits</legend>
	            <div id='auditcontainer'>
		            <div>
		                <a href='https://www.curve.fi/curve_audits/00-ToB.pdf'>
		                	<img class='icon' src="../assets/trail-of-bits.jpeg?rev=98185d4fe81a0ff9206e8b34c66e2be5">
		                	<span class='text'>Audit 31.01.2020</span>
		                </a>
		            </div>
		            <div>
		                <a href='https://www.curve.fi/curve_audits/01-ToB.pdf'>
		                	<img class='icon' src='../assets/trail-of-bits.jpeg?rev=8160e2e87988f42e44fd33495dead52c' />
		                	<span class='text'>Audit 06.03.2020</span>
		                </a>
		            </div>
	       		</div>
	        </fieldset>
	    </div>
</template>

<script>
	export default {
		metaInfo: {
	      title: 'Curve.fi :: Audits',
	      meta: [
	        {'property': 'og:title', 'content': 'curve.fi/curve_audits'},
	        {'property': 'og:url', 'content': 'https://curve.fi/curve_audits'},
	        {'property': 'og:type', 'content': 'website'},
	        {'property': 'og:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
	        {'property': 'og:image', 'content': '/curve.png'},
	        {'name': 'twitter:card', 'content': 'summary_large_image'},
	        {'name': 'twitter:title', 'content': 'curve.fi/curve_audits'},
	        {'name': 'twitter:site', 'content': '@CurveFinance'},
	        {'name': 'twitter:creator', 'content': '@CurveFinance'},
	        {'name': 'twitter:description', 'content': 'Curve is an exchange liquidity pool on Ethereum designed for extremely efficient stablecoin trading'},
	        {'name': 'twitter:url', 'content': 'https://curve.fi/curve_audits'},
	        {'name': 'twitter:image', 'content': '/curve.png'},
	      ]
	    },
	}
</script>

<style scoped>
	legend {
		text-align: center;
	}
	#auditcontainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: -10px;
	}
	#auditcontainer > div {
		margin-top: 10px;
	}
	#auditcontainer a {
		padding: 1em;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		text-align: center;
	}
	#auditcontainer a span {
		margin-top: 10px;
	}
	#auditcontainer .icon {
		width: 240px;
		height: 240px;
	}
</style>