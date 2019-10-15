import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
// import  * as modules from './modules/index'
import user from './modules/user'
import { RootState } from '@/store/types';

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
	state: {
		version: 'v1.0.0'
	},
	modules: {
		user
	}
}

export default new Vuex.Store<RootState>(store)
