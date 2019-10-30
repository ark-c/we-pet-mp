export interface PickerOptions {
	mode?: string; // 选择器类型
	pickerList?: any[]; // 下拉项列表
	staticText?: string; // 静态显示的文字
	rangeKey?: string; // 对象下需要显示的字段
	region?: string[]; // mode为region时需要传的参数
}
