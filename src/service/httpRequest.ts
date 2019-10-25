// import config from '../config'
import { exceptionHandler } from './exceptionHandler';

declare const uni: any;
declare const process: any;

const whiteCodeList: Array<number> = [1]; // code 白名单
const exceptionCode: Array<number> = [100001, 100006, 100105, 900211, 500501]; // 特殊处理的code错误码
let httpCount: number = 0; // 请求次数

interface HttpOptions {
	method?: string; // 请求方法
	url?: string; // 请求地址
	intercept?: boolean; // 是否开启统一错误处理
	localUrl?: boolean;     // 是否本地url，false: 根据配置文件 url会被重写, true: url保持原样不变
	header?: any;          // 头信息
	observe?: 'body' | 'events' | 'response';  // 是否开启返回头信息
	responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';  // 响应类型
	withCredentials?: boolean;	// 是否携带cookie信息
	isEncrypt?: boolean;  		// 是否加密传输数据
	reportProgress?: boolean;  // 是否开启进度条
	fileName?: string;  		// 文件名
	loading?: boolean; // 是否开启loading
	cache?: boolean; // 是否开启缓存
	data?: any; // 传送数据
}

/**
 * 格式化url
 * @param url
 * @return string
 */
const formatUrl = (url: string) => {
	let baseUrl: string = '';
	url = url.replace(/\/\//g, '/');
	if (process.env) { // TODO
		baseUrl = 'http://api.catcatdogdog.net:8081';
		if (baseUrl.endsWith('/')) { // 判断是否作为结尾
			baseUrl = baseUrl.substring(0, baseUrl.length - 1);
		}
	}
	if (url && !url.startsWith('/')) { // 判断当前字符串是否以 "/" 作为开头
		baseUrl += '/';
	}
	baseUrl += url;
	console.log(baseUrl, 'baseUrl');
	return baseUrl;
};

/**
 * 获取头信息
 */
const getHeaders = (options: HttpOptions) => {
	const defaultHeaders: any = {
		'content-type': 'application/json',
		'X-Auth-Token': uni.getStorageSync('xAuthToken') || ''
	};
	if (options && options.header && typeof options.header === 'object') {
		const header = options.header;
		for (const key in header) {
			if (key && header.hasOwnProperty(key)) {
				defaultHeaders[key] = header[key];
			}
		}
	}
	return defaultHeaders;
};

/**
 * 处理请求结果
 * @param result
 * @return string
 */
const handleResponse = (result: any) => {
	if (Number(result.data.code) === 0) {
		return 'success';
	}
	if (whiteCodeList.includes(result.data.code)) {
		return 'reject';
	}
	if (exceptionCode.includes(result.data.code)) {
		exceptionHandler(result.data.code);
		return '';
	}
	if (result.data.code) {
		let errMsg = result.data.msg || result.data.errmsg || result.data.message;
		if (errMsg) {
			uni.showToast({
				title: errMsg,
				icon: 'none',
				duration: 2000
			});
		}
		return '';
	}

};

const request = (method: string, url: string, params: any, options: HttpOptions) => {
	url = /^https?/.test(url) ? url : formatUrl(url);
	options = Object.assign({
		method: 'get',      // 请求方法类型
		url: '',            // 请求地址
		header: {},        // 头信息
		data: {},         // 参数
		isEncrypt: false,  	// 是否加密传输数据
		loading: true,		// 是否开启loading状态
		intercept: true     // 是否拦截
		// responseType: 'json'	// 响应格式: 可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' 支付宝小程序不支持
	}, options, { method, url });
	return new Promise((resolve, reject) => {
		const sendOptions: HttpOptions = {
			method: options.method,
			url: options.url,
			header: getHeaders(options.header)
		};

		const contentType = options.header['Content-Type'];
		if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
			// sendOptions.data = qs.encode(params)
		} else {
			sendOptions.data = params;
		}

		if (options.loading) {
			uni.showLoading({ title: '加载中', mask: true });
			httpCount += 1;
		}

		uni.request({
			...sendOptions,
			success: (res: any) => {
				if (options.loading) {
					httpCount = (httpCount - 1) >= 0 ? (httpCount - 1) : 0;
					if (httpCount === 0) {
						uni.hideLoading();
					}
				}
				if (!options.intercept) {
					return resolve(res);
				}
				let handleRes = handleResponse(res); // 处理结果
				if (!handleRes) return;
				if (handleRes === 'success') return resolve(res.data.data);
				if (handleRes === 'reject') return reject(res.data);
			},
			fail: (error: Error) => {
				if (options.loading) {
					httpCount = (httpCount - 1) >= 0 ? (httpCount - 1) : 0;
					if (httpCount === 0) {
						uni.hideLoading();
					}
				}
				if (!options.intercept) {
					return reject(error);
				}
				uni.showToast({
					title: '网络请求错误...'
				});
				return reject(error);
			}
		});
	});
};

/**
 * get方法
 * @param url 接口地址
 * @param params 参数 [可选]
 * @param options 参数 [可选]
 * @returns {Promise}
 */
export const get = (url: string, params: object = {}, options: HttpOptions = {}) => request('get', url, params, options);

/**
 * post请求
 * @param url 接口地址
 * @param params 参数 [可选]
 * @param options 参数 [可选]
 * @returns {Promise}
 */
export const post = (url: string, params: object = {}, options: HttpOptions = {}) => request('post', url, params, options);

/**
 * patch请求
 * @param url 接口地址
 * @param params 参数 [可选]
 * @param options 参数 [可选]
 * @returns {Promise}
 */
export const patch = (url: string, params: object = {}, options: HttpOptions = {}) => request('patch', url, params, options);

/**
 * put请求
 * @param url 接口地址
 * @param params 参数 [可选]
 * @param options 参数 [可选]
 * @returns {Promise}
 */
export const put = (url: string, params: object = {}, options: HttpOptions = {}) => request('put', url, params, options);

/**
 * delete请求
 * @param url 接口地址
 * @param params 参数 [可选]
 * @param options 参数 [可选]
 * @returns {Promise}
 */
export const del = (url: string, params: object = {}, options: HttpOptions = {}) => request('delete', url, params, options);
