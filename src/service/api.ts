import * as http from './httpRequest';

const api: any = {
	login: 'user/get-login/v1', // 获取token
	petList: '/pet/query-pet-list/v1' // 宠物信息列表
};

/**
 * 登录
 * @param jsCode
 */
export function apiLogin(jsCode: string): Promise<any> { return http.get(api.login, { jsCode }); }

/**
 * 获取宠物信息
 * @param data
 */
export function apiPetList(data: object): Promise<any> { return http.post(api.petList, data); }
