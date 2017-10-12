import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import mk_app_stock_list from './apps/mk-app-stock-list/index.js'
import mk_app_stock_type_card_test from './apps/mk-app-stock-type-card/apps/mk-app-stock-type-card-test/index.js'
import mk_app_stock_type_card from './apps/mk-app-stock-type-card/index.js'

const apps = {
		
	[mk_app_stock_list.name]: mk_app_stock_list,	
	[mk_app_stock_type_card_test.name]: mk_app_stock_type_card_test,	
	[mk_app_stock_type_card.name]: mk_app_stock_type_card,
}

apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	
start()