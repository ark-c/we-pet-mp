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
	code?: string;
}
