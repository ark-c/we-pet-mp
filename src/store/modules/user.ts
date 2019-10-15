import { GetterTree, Module, MutationTree } from 'vuex';
import { ProfileState, RootState, User } from '../types';

declare const uni: any;

const namespaced: boolean = true;
const userInfo: User = {
	nickName: 'we-pet', // 昵称
	phone: '', // 手机号
	avatarUrl: '', // 头像
	gender: 'man', // 性别
	session: uni.getStorageSync('session') || '', // 临时凭证
	token: '', // 登录token
	openId: uni.getStorageSync('openId') || '' // openId
};
const cacheUserInfo: any = uni.getStorageSync('userInfo') || {};
const state: User = {
	...userInfo,
	...cacheUserInfo
};

const getters: GetterTree<User, RootState> = {
	user(state): User {
		return state;
	}
};

const mutations: MutationTree<User> = {
	/**
	 * 更新登录用户信息
	 * @param state
	 * @param payLoad
	 * @constructor
	 */
	UPDATE_USER(state, payLoad: User) {
		state = Object.assign({}, state, payLoad);
	},

	/**
	 *  清除登录信息
	 * @param {*} state
	 */
	CLEAR_USER(state) {
		Object.keys(userInfo).forEach(item => {
			// @ts-ignore
			state.userInfo[item] = userInfo[item] || '';
		});
	}

};

const user: Module<User, RootState> = {
	namespaced,
	state,
	getters,
	mutations
};

export default user;
