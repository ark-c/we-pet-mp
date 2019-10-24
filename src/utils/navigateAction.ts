declare const uni: any;
/**
 * 返回
 * @param delta 返回层数
 */
export const uNavigateBack: (delta: number) => void = (delta: number) => {
	uni.navigateBack({ delta });
};

/**
 * 跳转， 小程序只能跳转非tabBar的页面
 * @param url
 */
export const uNavigateTo: (url: string) => Promise<any> = (url: string) => {
	return uni.navigateTo({ url });
};

/**
 * 重定向 小程序只能重定向非tabBar的页面
 * @param url
 */
export const uRedirectTo: (url: string) => Promise<any> = (url: string) => {
	return uni.redirectTo({ url });
};

/**
 * 重启页面
 * @param url
 */
export const uRelaunch: (url: string) => Promise<any> = (url: string) => {
	return uni.relaunch({ url });
}


export const uSwitchTab: (url: string) => void = (url: string) => {
	return uni.switchTab({ url });
};





