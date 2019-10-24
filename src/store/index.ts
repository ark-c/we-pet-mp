import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import user from './modules/user'
import system from '@/store/modules/systemInfo'

Vue.use(Vuex)

const store: StoreOptions<any> = {
	modules: {
		user,
		system
	}
}

export default new Vuex.Store<any>(store)
