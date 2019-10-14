// import store from '@/store'
// import { apiExcCode } from '../code'

/**
 * @param code number
 */
export const exceptionHandler = (code: number) => {
	// switch (code) {
	// 	case apiExcCode.needLogin.code || apiExcCode.neddLoginAno.code:  // 需要登录
	// 		uni.showModal({
	// 			title: '提示',
	// 			content: apiExcCode.needLogin.message,
	// 			showCancel: false,
	// 			confirmText: '好的',
	// 			success: function (res) {
	// 				if (res.confirm) {
	// 					uni.removeStorageSync('token')
	// 					uni.removeStorageSync('uid')
	// 					uni.removeStorageSync('userInfo')
	// 					store.commit('CLEAR_USER')
	// 					uni.reLaunch({
	// 						url: '/pages/user/login'
	// 					})
	// 				}
	// 			}
	// 		})
	// 		break
	// 	case apiExcCode.orderClose.code: // 订单已关闭
	// 		uni.showModal({
	// 			title: '提示',
	// 			content: apiExcCode.orderClose.message,
	// 			showCancel: false,
	// 			confirmText: '返回',
	// 			success: function (res) {
	// 				if (res.confirm) {
	// 					uni.switchTab({
	// 						url: '/pages/user/index'
	// 					})
	// 				}
	// 			}
	// 		})
	// 		break
	// 	case apiExcCode.exceedMax.code: // 超过绑定最大数量
	// 		uni.showModal({
	// 			title: '提示',
	// 			content: apiExcCode.exceedMax.message,
	// 			showCancel: false,
	// 			confirmText: '返回',
	// 			success: function (res) {
	// 				if (res.confirm) {
	// 					uni.switchTab({
	// 						url: '/pages/user/index'
	// 					})
	// 				}
	// 			}
	// 		})
	// 		break
	// 	case apiExcCode.sessionKeyFail.code: // sessionKey失效
	// 		uni.showModal({
	// 			title: '提示',
	// 			content: apiExcCode.sessionKeyFail.message,
	// 			showCancel: false,
	// 			confirmText: '重试',
	// 			success: function (res) {
	// 				uni.clearStorageSync()
	// 				store.commit('CLEAR_USER')
	// 			}
	// 		})
	// 		break
	// 	default:
	// 		break
	// }
}
