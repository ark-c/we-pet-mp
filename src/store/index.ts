import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store: StoreOptions<any> = {
	modules: {
		user
	}
}

export default new Vuex.Store<any>(store)
