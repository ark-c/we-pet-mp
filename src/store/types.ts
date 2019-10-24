export interface RootState {
	version?: string; // 版本号
}

export interface User {
	nickName?: string; // 用户昵称
	avatarUrl?: string; // 用户头像
	phone?: string; // 手机号
	gender?: string; // 性别
	session: string; // 临时凭证
	token?: string; // 登录token
	openId?: string; // openId
	city?: string; // 城市
	country?: string; // 国家
	language?: string; // 语言
	province?: string; // 省份
}

export interface SystemInfo {
	statusBarHeight: number; // 状态栏的高度,头条小程序不支持
	navBarHeight: number; // 导航栏高度
	capsulePosition: any; // 右上角胶囊按钮信息
	navBarExtendHeight: number; // 下方扩展4像素高度 防止下方边距太小
	ios: boolean; // 是否ios
	windowWidth: number; // 可使用窗口宽度
	[propName: string]: any;
}
