import * as http from './httpRequest';

const api: any = {
	login: 'user/get-login/v1' // 获取token
};

/**
 * 登录
 * @param jsCode
 */
export function apiLogin(jsCode: string): Promise<any> { return http.get(api.login, { jsCode }); }
