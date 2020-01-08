import html2canvas from 'html2canvas';
import { Loading, Message } from 'element-ui'
import store from '@/store/store'
//转化时间戳(返回yyyy-MM-dd格式或者yyyy-MM-dd HH:mm:ss)
const formatTime = (time, flag) => {
	var now = new Date(time);
	var year = now.getFullYear();
	var month = now.getMonth() + 1 < 10 ?
		"0" + (now.getMonth() + 1) :
		now.getMonth() + 1;
	var date = now.getDate() < 10 ?
		"0" + now.getDate() :
		now.getDate();
	var hour = now.getHours() < 10 ?
		"0" + now.getHours() :
		now.getHours();
	var minute = now.getMinutes() < 10 ?
		"0" + now.getMinutes() :
		now.getMinutes();
	var second = now.getSeconds() < 10 ?
		"0" + now.getSeconds() :
		now.getSeconds();
	if(flag) {
		return year + "-" + month + "-" + date;
	}
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
// 将中文转换为 ASCII 码
const handleChinese = (params) => {
	const pattern = new RegExp('[\u4E00-\u9FA5]+') // 正则匹配中文字符
	let newObj = {}
	for(let i in params) {
		if(pattern.test(params[i])) {
			newObj[i] = encodeURI(params[i])
		} else {
			newObj[i] = params[i]
		}
	}
	return newObj
}

// 导出HTML为图片 兼容IE9+
const exportPng = (dataDom, fileName) => {
	const saveImage = (data, fileName) => {
		var imgUrl = data;
		if(fileName === null || fileName === undefined || fileName === "") {
			var date = new Date();
			fileName = "download_" + date.getTime();
		}
		if(!!window.ActiveXObject || "ActiveXObject" in window) {
			//IE
			if(window.atob) {
				//IE10+
				var blob = convertBase64UrlToBlob(imgUrl);
				window
					.navigator
					.msSaveBlob(blob, fileName + ".png");
			} else {
				//IE9-
				var w = window.open("about:blank", "下载图片");
				w
					.document
					.write("<img src=" + imgUrl + ">");
				w.document.title = "图片";
			}
		} else {
			//Others
			var saveA = document.createElement("a");
			saveA.setAttribute("href", imgUrl);
			saveA.setAttribute("download", fileName + ".png");
			saveA.setAttribute("hidden", "hidden");
			document
				.body
				.appendChild(saveA);
			var saveImg = document.createElement("img");
			saveImg.setAttribute("src", imgUrl);
			saveA.appendChild(saveImg);
			saveA.click();
		}
	};
	const convertBase64UrlToBlob = (urlData) => {
		//去掉url的头，并转换为byte
		var bytes = window.atob(urlData.split(",")[1]);
		//处理异常,将ascii码小于0的转换为大于0
		var ab = new ArrayBuffer(bytes.length);
		var ia = new Uint8Array(ab);
		for(var i = 0; i < bytes.length; i++) {
			ia[i] = bytes.charCodeAt(i);
		}
		return new Blob([ab], {
			type: "image/bmp"
		});
	};
	if (typeof dataDom == 'object') {//元素的数据类型是对象
  	html2canvas(dataDom).then(c => {
			let dataURL = c.toDataURL("image/png");
			saveImage(dataURL, fileName);
		});
  } else{
  	// 导出base64为图片 兼容IE9+
  	saveImage(dataDom, fileName);
  }
}

// 请求数据添加loading
const BIloading = {
	needLoadingRequestCount: 0,
	loadingInstance: null,
	startLoading() {
		this.loadingInstance = Loading.service({
			lock: true,
			text: '数据加载中……',
			background: 'rgba(255, 255, 255, 0.5)',
			target: '#layout',
			customClass: 'BI-loading'
		})
	},
	endLoading() {
		this
			.loadingInstance
			.close()
	},
	show() {
		if(this.needLoadingRequestCount === 0) {
			this.startLoading()
		}
		this.needLoadingRequestCount++
	},
	hidde() {
		if(this.needLoadingRequestCount <= 0) {
			return
		}
		this.needLoadingRequestCount--;
		if(this.needLoadingRequestCount === 0) {
			this.endLoading()
		}
	}
}
// 消息提示
const BIMsg = (opt) => {
	let option = Object.assign({}, {
		customClass: `msg_background_${store.state.themeColor}`,
		duration: 1500,
		type: 'info'
	}, opt)
	return Message(option)
}
export {
	formatTime,
	handleChinese,
	exportPng,
	BIloading,
	BIMsg
}