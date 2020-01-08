// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

import html2canvas from 'html2canvas';
Vue.prototype.$h2c = html2canvas

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 导出功能
import { exportPng } from '@/assets/js/tools.js'
Object.defineProperty(Vue.prototype, '$exportPng', {
	value: exportPng
});
import '@/assets/js/jspdf.min.js'

import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store/store' //vuex
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: '',
	loading: '',
	attempt: 2,
	//throttleWait: 2000
})

// 滚动条
//import elementResizeDetectorMaker from 'element-resize-detector'
import HappyScroll from 'vue-happy-scroll'
Vue.use(HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

//元素拖拽
import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

//元素拖拽到不同的地方
import VueDraggable from 'vuedraggable'
Vue.component('vuedraggable', VueDraggable)

//通用样式
import './assets/css/iconfont.css'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
// variables.scss是在build目录下utils.js文件里引入的

// echarts 主题注册
import themeRed from '@/components/charts/theme/theme-red'
import themeGreen from '@/components/charts/theme/theme-green'
import themeBlue from '@/components/charts/theme/theme-blue'
echarts.registerTheme('red', themeRed)
echarts.registerTheme('green', themeGreen)
echarts.registerTheme('blue', themeBlue)

Vue.config.productionTip = false
/*自定义指令*/
Vue.directive('focus', {
	inserted(el, binding) { //el为原生元素
		//console.log(el);
		el.querySelector('input').focus()
	}
})
Vue.directive('set-focus', {
	inserted(el, binding) { //el为原生元素
		el.querySelector('input').focus()
	},
	update(el, binding, vnode, oldVnode) {
		el.querySelector('input').focus()
	}
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	data() {
		return {
			headNav: sessionStorage.getItem('headNav') ?
				JSON.parse(sessionStorage.getItem('headNav')) : 0,
			configureActive: sessionStorage.getItem('configureActive') ?
				JSON.parse(sessionStorage.getItem('configureActive')) : -1,
			myActive: sessionStorage.getItem('myActive') ?
				JSON.parse(sessionStorage.getItem('myActive')) : -1,
			skinActive: localStorage.getItem('skinActive') ?
				JSON.parse(localStorage.getItem('skinActive')) : 1,
			search: '',
			dialogExportSet: false, //导出设置-对话框
			dialogCollect: false, //收藏-对话框
			dialogEditResource: false, //编辑资源库-对话框
			dialogLoginFormVisible: false, //登录对话框
			btnDisable: false, //对话框中的确定按钮是否可用，默认可用
			toolkit: null, //jsPlumb 实例对象
		}
	},
	computed: {
		userId() {
			return this.$store.state.userId;
		},
		reportName() {
			return this.$store.state.reportName;
		},
	},
	watch: {
		'$route': function(to, from) {
			document.body.scrollTop = 0 //IE
			document.documentElement.scrollTop = 0 //W3C
		}
	},
	methods: {
		exportEcharts() {
			$('.draggable').addClass('not-border')
			$('.draggable[class*="rect"]').removeClass('not-border')
			$('.draggable[class*="ellipse"]').removeClass('not-border')
			this.dialogExportSet = true
			this.btnDisable = false
		},
		confirmExport(exportFormat) {
			document.querySelector('.btn-wrap').style.display = 'none'
			var dom = document.querySelector('#content')
			var contentHeight = $('#content').outerHeight() 
			var contentWidth = $('#content').outerWidth() 
			setTimeout(() => {
				switch(exportFormat) {
					case 'word文档':
						this.$message({
							message: '暂不支持导出为word文档'
						})
						break;
					case 'png图片':
						this.$exportPng(dom, this.reportName)
						break;
					case 'PDF文件':
						//var pdf = new jsPDF('landscape', 'pt', 'a4');
						//content
						//原生获取有单位 jq 获取没有单位
						//var ht = Number(contentHeight.substring(0,contentHeight.indexOf("px")))
						//var wt = Number(contentWidth.substring(0,contentWidth.indexOf("px")))
						//console.log(contentHeight,contentWidth)   //[wt,ht]
						var pdf = new jsPDF('landscape', 'pt', [contentWidth,contentHeight]);
						
						// 设置打印比例 越大打印越小
						//pdf.internal.scaleFactor = 2.4;
						pdf.internal.scaleFactor = 1;
						var options = {
							pagesplit: true, //设置是否自动分页
							"background": '#FFFFFF', //如果导出的pdf为黑色背景， 需要将导出的html模块内容背景 设置成白色。
						};
						pdf.addHTML(dom, 15, 15, options, ()=> {
							pdf.save(this.reportName);
						});
						break;
				}
			}, 10)

			setTimeout(() => {
				document.querySelector('.btn-wrap').style.display = 'block'
				this.dialogExportSet = false
			}, 20)
		},
	},
	components: {
		App
	},
	template: '<App/>',
	mounted() {
		
	}
})