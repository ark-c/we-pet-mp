declare const uni: any;
const userInfo = {
	nickName: 'hi~ 等你很久了！', // 昵称
	phone: '', // 手机号
	avatar: '', // 头像
	gender: 'man', // 性别
	session: uni.getStorageSync('session') || '', // 临时凭证
	token: '', // 登录token
	openId: uni.getStorageSync('openId') || '', // openId
	uid: '', // 登录uid
	redirect: '' // 重定向地址
};

const user = {
	state: {
		userInfo: uni.getStorageSync('userInfo') || {
			...userInfo
		}
	},
	mutations: {

		// /**
		//  *  更新登录用户信息
		//  * @param state
		//  * @param payload
		//  * @constructor
		//  */
		// UPDATE_USER(state, payload) {
		// 	state.userInfo = Object.assign({}, state.userInfo, payload);
		// },
		//
		// /**
		//  *  清除登录信息
		//  * @param {*} state
		//  */
		// CLEAR_USER(state) {
		// 	Object.keys(userInfo).forEach(item => {
		// 		state.userInfo[item] = userInfo[item] || '';
		// 	});
		// }
	}
};

export default user;
