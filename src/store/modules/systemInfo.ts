import { GetterTree, MutationTree, Module } from 'vuex'
import { SystemInfo } from '../types'

// state
const state: SystemInfo = { // 默认值是iphone7机型的
	statusBarHeight: 20,
	navBarHeight: 64,
	capsulePosition: {
		bottom: 58,
		height: 32,
		left: 278,
		right: 365,
		top: 26,
		width: 87
	},
	navBarExtendHeight: 4,
	ios: true,
	windowWidth: 375
}

const namespaced: boolean = true

// getter
const getters: GetterTree<SystemInfo, any> = {
	systemInfo: (state: SystemInfo) => state
}

// mutations
const mutations: MutationTree<SystemInfo> = {
	UPDATE_SYSTEM_INFO (state: SystemInfo) {
		Object.assign(state, getSystemInfo())
		uni.setStorageSync('systemInfo', state)
		return state
	}
}

const system: Module<SystemInfo, any> = {
	namespaced,
	state,
	getters,
	mutations
}

export default system

/**
 * 获取手机系统信息
 */
function getSystemInfo () {
	let systemInfo: any = uni.getSystemInfoSync()
	let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1)
	let rect: any = uni.getMenuButtonBoundingClientRect ? uni.getMenuButtonBoundingClientRect() : null
	uni.getMenuButtonBoundingClientRect()

	let navBarHeight: any = ''
	if (!systemInfo.statusBarHeight) {
		systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
		navBarHeight = (function () {
			let gap = rect.top - systemInfo.statusBarHeight
			return 2 * gap + rect.height
		})()

		systemInfo.statusBarHeight = 0
		systemInfo.navBarExtendHeight = 0 //下方扩展4像素高度 防止下方边距太小
	} else {
		navBarHeight = (function () {
			let gap = rect.top - systemInfo.statusBarHeight
			return systemInfo.statusBarHeight + 2 * gap + rect.height
		})()
		if (ios) {
			systemInfo.navBarExtendHeight = 4 //下方扩展4像素高度 防止下方边距太小
		} else {
			systemInfo.navBarExtendHeight = 0
		}
	}
	systemInfo.navBarHeight = navBarHeight //导航栏高度不包括statusBarHeight
	systemInfo.capsulePosition = rect //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
	systemInfo.ios = ios //是否ios
	return systemInfo
}
