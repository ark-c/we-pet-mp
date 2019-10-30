// 查询宠物信息列表参数
export interface PetParaDto {
	page?: number; // 页码
	rows?: number; // 行数
	petRace?: string | null; // 宠物种族一级分类
	petAssortment?: string | null; // 宠物品种二级分类
	petProvince?: string | null; // 所在省
	petCity?: string | null; // 所在市
	petDistrict?: string | null; // 所在区
}

// 宠物信息列表每项返回参数
export interface PetItemInfo {
	petId: number; // 宠物信息id
	adoptionStatus: string; // 宠物是否被领养状态
	createAvatarUrl?: string; // 创建人头像url
	createTimeFormat?: string; // 创建时间
	createUser?: string; // 宠物发布人
	effectiveStatus?: number; // 数据是正常显示还是被删除
	petAge?: string; // 宠物年龄区间
	petAssortmentName?: string; // 二级宠物品种
	petRaceName?: string; // 一级宠物品种
	petProvince?: string; // 所在地-省
	petCity?: string; // 所在地-市
	petDistrict?: string; // 所在地-区
	petImages?: string[]; // 宠物图片列表
	petIntroduction?: string; // 宠物介绍
	petNikeName?: string; // 宠物昵称
	readSum: number; // 阅读数量
	shareSum: number; // 分享数量
	starSum: number; // 关注数量
	[propName: string]: any;
}

// 宠物发布提交信息
export interface PetReleaseInfo {
	petSex?: number; // 宠物性别
}
