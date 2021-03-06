import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { User } from '../types'
import { apiLogin } from '@/service/api'

const cacheUserInfo: User = uni.getStorageSync('userInfo') || {}
const userInfo: User = {
	nickName: 'we-pet', // 昵称
	phone: '', // 手机号
	avatarUrl: '../../static/logo.png', // 头像
	gender: 'man', // 性别
	token: uni.getStorageSync('token') || '', // 登录token
	openId: uni.getStorageSync('openId') || '', // openId
	...cacheUserInfo
}

const namespaced: boolean = true
const state: User = { ...userInfo }
const getters: GetterTree<User, any> = {
	user (state): User {
		return state
	}
}

const actions: ActionTree<User, any> = {
	userLogin ({commit}) {
		commit('USER_LOGIN')
	}
}
const mutations: MutationTree<User> = {
	/**
	 * 更新登录用户信息
	 * @param state
	 * @param payLoad
	 * @constructor
	 */
	UPDATE_USER (state, payLoad: User) {
		Object.assign(state, payLoad)
		uni.setStorageSync('userInfo', state)
	},

	/**
	 * 清除登录信息
	 * @param {*} state
	 */
	CLEAR_USER (state) {
		Object.keys(userInfo).forEach(item => {
			// @ts-ignore
			state[item] = userInfo[item] || ''
		})
	},

	/**
	 * 登录
	 */
	USER_LOGIN (state) {
		console.log('用户信息')
		if (state.token) return
		uni.login({
			success: async (res: any) => {
				if (!res.code) return
				const result = await apiLogin(res.code)
				Object.assign(state, result)
				uni.setStorageSync('openId', result.openId)
				uni.setStorageSync('token', result.token)
				uni.setStorageSync('userInfo', state)
			}
		})
	}
}

const user: Module<User, any> = {
	namespaced,
	state,
	getters,
	actions,
	mutations
}

export default user
