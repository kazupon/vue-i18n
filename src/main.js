import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta'

import * as Sentry from '@sentry/browser';
import { CaptureConsole, InboundFilters, Vue as VueIntegration } from '@sentry/integrations';

import * as subscriptionStore from './components/common/subscriptionStore'
import * as helpers from './utils/helpers'

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

window.domain = ''
if(window.location.href.includes('localhost') || !window.location.href.includes('curve.fi')) window.domain = 'https://www.curve.fi'

import '../public/tvisionbase.css'
import '../public/tvision.css'
import './registerServiceWorker'

subscriptionStore.init();

Vue.config.productionTip = false

let ignoreErrors = [	
	/.*ObjectMultiplex.*/gm,	
	/.*Invalid JSON RPC.*/gm,	
	/.*MaxListenersExceededWarning.*/gm,	
	/.*Heads up!.*/gm,	
	/.*invalid number value.*/gm,	
	/.*Out of Gas.*/gm,	
	/.*invalid address.*/gm,	
	/.*property '_address' of undefined.*/gm,	
	/.*TypeError: Cannot read property 'chart' of undefined.*/gm,	
	/.*Cannot read property '0' of undefined.*/gm,
   	/.*Non-Error promise rejection captured with keys.*/gm,
]
//adding Sentry as soon as possible
// process.env.NODE_ENV == 'production' && Sentry.init({ 	
//   dsn: 'https://5494f535e0244513a301f2912f5d899f@sentry.io/4169463',
// 	 beforeSend(event, hint) {
// 		let error = hint.originalException
// 		console.log(error, event, "ERROR EVENT")
// 		if(error && error.message) {
// 			let matches = ignoreErrors.some(regex => regex.test(error))
// 			if(matches.length) {
// 				console.log("MATCH ERROR IGNORE")
// 				event.fingerprint = ['not-tracked']
// 			}
// 		}
// 		if(ignoreErrors.some(regex => regex.test(event.value))) {
// 			console.log("MATCH ERROR IGNORE")
// 			event.fingerprint = ['not-tracked']
// 		}
// 		return event
// 	 },
//   ignoreErrors: ignoreErrors,	
//   integrations: [	
//     new CaptureConsole({	
//       levels: ['error', 'debug', 'assert']	
//     }),	
//     new VueIntegration({Vue, attachProps: true})	
//   ],	
// });	

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
