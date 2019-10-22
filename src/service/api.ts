import * as http from './httpRequest';

const api: any = {
	login: 'common/wx/code2Session/v1' // 获取token
};

/**
 * 登录
 * @param jsCode
 */
export function apiLogin(jsCode: string): Promise<any> { return http.get(api.login, { jsCode }); }
