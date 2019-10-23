export interface NavBarOptions {
	title?: string; 			// 标题
	color?: string; 			// 字体颜色
	backgroundColor?: string;   // 背景色
	back?: boolean;       // 自定义返回键
}

export interface NavBarInfo {
	navigationBarStyle?: any;
	navBarHeight?: number;
	navBarExtendHeight?: number;
	capsulePosition?: object;
	ios?: boolean;
}
