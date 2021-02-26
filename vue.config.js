process.env.VUE_APP_VERSION = require('./package.json').version

const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

const path = require('path')

module.exports = {
	// productionSourceMap: process.env.NODE_ENV == 'production' ? false : true,
	chainWebpack: config => {
		config.plugins.delete('prefetch')
		config.module.rule('worker')
	      .test(/\.worker\.js$/i)
	      .use('worker-loader')
	      .loader('worker-loader');
 
	},
	configureWebpack: {
		plugins: [
			/*new HtmlCriticalWebpackPlugin({
		      base: path.join(path.resolve(__dirname), 'dist/'),
		      src: 'index.html',
		      dest: 'index.html',
		      inline: true,
		      minify: true,
		      extract: true,
		      width: 1400,
		      height: 1600,
		      penthouse: {
		        blockJSRequests: false,
		      }
		    })*/
		]
	},
    // options...
    devServer: {
        disableHostCheck: true
    },

    pwa: {
    	name: 'Curve Finance',
    	themeColor: '#3465a4',
    	msTileColor: '#000000',
    	appleMobileWebAppCapable: 'yes',
    	appleMobileWebAppStatusBarStyle: 'default',
	 	// configure the workbox plugin
	    workboxPluginMode: 'InjectManifest',
	    workboxOptions: {
	      // swSrc is required in InjectManifest mode.
	      swSrc: 'src/service-worker.js',
	      include: [
	      	/.*woff2\.*/,
	      	/.*png\.*/,
	      	/.*jpg\.*/,
	      	/.*svg\.*/,
	      	/.*tvisionbase.css\.*/,
	      ],
	      // ...other Workbox options...
	    },
    },
}
