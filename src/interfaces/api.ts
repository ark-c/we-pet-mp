// 查询宠物信息列表参数
export interface PetParaDto {
	page?: number; // 页码
	rows?: number; // 行数
	petAssortment?: string; // 宠物品种
	petProvince?: string; // 所在省
	petCity?: string; // 所在市
	petDistrict?: string; // 所在区
}
