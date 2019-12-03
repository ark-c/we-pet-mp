import { apiLogin } from '@/service/api';

export default {
	async created () {
		console.log('用户信息')
		// @ts-ignore
		if (this.$store.state.user.token) return
		const wxLoginRes = await uni.login()
		// console.log(wxLoginRes, '=====')
		// uni.login({
		// 	success: async (res: any) => {
		// 		if (!res.code) return
		// 		const result = await apiLogin(res.code)
		// 		// Object.assign(state, result)
		// 		// @ts-ignore
		// 		this.$store.commit('user/UPDATE_USER')
		// 		uni.setStorageSync('openId', result.openId)
		// 		uni.setStorageSync('token', result.token)
		// 		// @ts-ignore
		// 		uni.setStorageSync('userInfo', this.$store.state.user)
		// 	}
		// })
		console.log('mixins created')
		// @ts-ignore
	}
}
