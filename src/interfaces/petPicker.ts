export interface pickerOptions {
	mode?: string; // 选择器类型
	pickerList?: any[]; // 下拉项列表
	rangeKey?: string; // 下拉显示的字段
	staticText?: string; // 静态显示的文字
	region?: string[]; // mode为region时需要传的参数
}
