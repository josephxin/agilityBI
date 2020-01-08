import axios from "axios"
import qs from 'qs'
import CryptoJS from 'crypto-js'
import { handleChinese, BIloading, BIMsg } from '@/assets/js/tools'
import store from '../../store/store' //vuex
//import router from '../../router/index'
//console.log(store, router);// store在这里获取不到，router能获取到

window.eolinker = "https://result.eolinker.com/ZqWwDzBe66791fff39851c2858a818b455f18bc7470cabb?uri="
window.serverUrlWF = "http://222.128.15.210:8004" //潍坊的接口地址
//window.serverUrlHQ = "http://192.168.4.10:8888" //总部的内网接口地址
window.serverUrlHQ = "http://47.92.149.56:8888" //总部的阿里云接口地址

//秘钥
const secret = "ea598b9e9c5611e893a56014b3c5f1b6"
const baseUrl = serverUrlHQ
const eolinker= 'result.eolinker.com'

function get_signature(body, secret) {

	//console.log(body, typeof(body))
	body = JSON.stringify(body); //需要先转化成字符串，不然匹配不上
	var sha256 = CryptoJS.SHA256(body);
	//console.log(sha256);
	sha256 = CryptoJS.enc.Base64.stringify(sha256);
	var digest = "SHA-256=" + sha256;
	var gmt_date = new Date().toGMTString();
	var sign_string = "x-date: " + gmt_date + "\ndigest: " + digest;
	//console.log(sign_string);
	var signature = CryptoJS.HmacSHA256(sign_string, secret);
	//console.log(signature);
	signature = CryptoJS.enc.Base64.stringify(signature);
	return {
		digest,
		gmt_date,
		signature
	}
}

const instance = axios.create({
	timeout: 30000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		//"Accept": "*/*",
  	//"Authorization": "Bearer49acd21a-8f30-4497-8bfc-3ab3568c86b4"
	}
});

// 请求拦截器 
instance
	.interceptors
	.request
	.use((config) => {
		config.showLoading == 'show' && BIloading.show()
		if(config.method === 'post') {
			config.headers['Content-Type'] = "application/json; charset=UTF-8";
			//console.log(store);
			if(store.state.token) {
				if(config.url != baseUrl + '/sysUser/check' && config.url != baseUrl + '/sysUser/register' && config.url != baseUrl + '/sysUser/login' && config.url != baseUrl + '/reportStoreCount/list') {
					if (config.url.indexOf(eolinker) == -1) {
						//自定义头部
						config.headers.common["token"] = store.state.token
					}else{
						store.commit('setToken', 'Token-18_81e05b5b1c8c4d6fbd6d7c93a0fee971')
					}
				}
			}
			if(config.url.indexOf(eolinker) == -1) {
				// 加密信息
				/*let headerObj = get_signature(config.data, secret)
				config.headers.common["digest"] = headerObj.digest;
				config.headers.common["x-date"] = headerObj.gmt_date;
				config.headers.common["authorization"] = ('hmac username="fox",algorithm="hmac-sha256",headers="x-date digest",signature="' + headerObj.signature + '"');*/
			}

			return config
		}

		if(config.method === 'get') {
			let params = null
			if(config.url.indexOf('test/echo') != -1) {
				params = config.params
				let headerObj = get_signature(params, secret)
				config.headers['digest'] = headerObj.digest;
				config.headers['x-date'] = headerObj.gmt_date;
				config.headers['authorization'] = ('hmac username="fox",algorithm="hmac-sha256",headers="x-date digest",signature="' + headerObj.signature + '"');
			} else {
				// 将中文编码
				params = handleChinese(config.params)
				config.url += '?' + qs.stringify(params, {
					encode: false
				})
				config.params = {}
			}
			//console.log(config);
			return config
		}
	}, (error) => {
		return Promise.reject(error)
	})
// 添加响应拦截器
instance
	.interceptors
	.response
	.use((response) => {
		//console.log(response);
		if(response.data.code == 401) {
			BIMsg({
				type: 'error',
				message: '用户认证过期，需要重新登录！',
			})
			store.commit('setToken', '')
			store.commit('changeUserInfo', {
				userId: 0,
				userName: ''
			})
		}
		response.config.showLoading == 'show' && BIloading.hidde()
		return response
	}, (err) => {
		BIloading.hidde()
		BIMsg({
			message: err.message,
			duration: 5000
		})
		return Promise.reject(err)
	})

const xhr = {
	post(config) {
		return new Promise((resolve, reject) => {
			instance
				.post(`${config.url}`, config.params, {
					showLoading: config.showLoading || 'show'
				})
				.then(res => resolve(res.data))
				.catch(err => reject(err))
		})
	},
	get(config) {
		return new Promise((resolve, reject) => {
			instance
				.get(`${config.url}`, {
					params: config.params,
					showLoading: config.showLoading || 'show'
				})
				.then((res => resolve(res.data)))
				.catch(err => reject(err))
		})
	}
}
export default xhr