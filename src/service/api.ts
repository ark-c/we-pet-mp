import * as http from './httpRequest'

const api: any = {
	login: 'user/get-login/v1', // 获取token
	petList: 'pet/query-pet-list/v1', // 宠物信息列表
	petDetail: 'pet/get-pet-info/v1',
	petRelease: 'pet/add-pet-info/v1',
	petAssortment: '/common/get-dict/pet_assortment',
	readPet: 'user/read-pet/v1',
	sharePet: 'user/share-pet/v1',
	starPet: 'user/star-pet/v1',
	completeAdoption: 'user/update-status-complete/v1',
	deletePet: 'user/delete-status-by-author/v1',
	complaintPet: 'user/complaint-pet/v1'
}

/**
 * 登录
 * @param jsCode
 */
export function apiLogin (jsCode: string): Promise<any> { return http.get(api.login, { jsCode }) }

/**
 * 获取宠物信息
 * @param data
 */
export function apiPetList (data: object): Promise<any> { return http.post(api.petList, data) }

/**
 * 宠物详情
 * @param petId
 */
export function apiPetDetail (petId: number): Promise<any> { return http.get(api.petDetail, { petId }) }

/**
 * 新增宠物
 * @param data
 */
export function apiPetRelease (data: object): Promise<any> { return http.post(api.petRelease, data) }

/**
 * 宠物一级分类
 */
export function apiPetAssortment (): Promise<any> { return http.get(api.petAssortment) }

/**
 * 阅读宠物信息
 * @param data
 */
export function apiReadPet (data: object): Promise<any> { return http.get(api.readPet, data) }

/**
 * 分享宠物信息
 * @param petId
 */
export function apiSharePet (petId: number): Promise<any> { return http.get(api.sharePet, {petId}) }

/**
 * 关注宠物
 * @param petId
 */
export function apiStarPet (petId: number): Promise<any> { return http.get(api.starPet, {petId}) }

/**
 * 将宠物设置为已领养
 * @param petId
 */
export function apiCompleteAdoption (petId: number): Promise<any> { return http.get(api.completeAdoption, {petId}) }

/**
 * 删除宠物信息
 * @param petId
 */
export function apiDeletePet (petId:number): Promise<any> { return http.get(api.deletePet, {petId})}

/**
 * 举报宠物
 * @param petId
 */
export function apiComplaintPet (petId:number): Promise<any> { return http.get(api.complaintPet, {petId})}








