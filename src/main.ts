import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import NavBar from '@components/NavBar.vue'

Vue.config.productionTip = false
Vue.component('NavBar', NavBar)

new App({
	store
}).$mount()
