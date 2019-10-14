import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import  * as modules from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		...modules
	},
	getters
})
