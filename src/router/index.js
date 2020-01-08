import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import store from '../store/store' //vuex

const Layout = r => require(['@/pages/layout'], r)
const Index = r => require(['@/pages/index/index'], r)
const Chart = r => require(['@/pages/chart/chart'], r)
const ProduceReport = r => require(['@/pages/report/produceReport'], r)
const MySeek = r => require(['@/pages/mySeek/mySeek'], r)
const MyReport = r => require(['@/pages/report/myReport'], r)

//配置页
const DataMatching = r => require(['@/pages/configuration/dataMatching'], r)
const DataStructureAnalysis = r => require(['@/pages/configuration/dataStructureAnalysis'], r)
const ForeignKey = r => require(['@/pages/configuration/foreignKey'], r)
const DataClassify = r => require(['@/pages/dataClassify/dataClassify'], r)
const DataShow = r => require(['@/pages/configuration/dataShow'], r)
const Entity = r => require(['@/pages/configuration/entity'], r)
const RelationExtraction = r => require(['@/pages/configuration/relationExtraction'], r)
const HotWord = r => require(['@/pages/configuration/hotWord'], r)
const DataAssociation = r => require(['@/pages/configuration/dataAssociation'], r)
const BusinessMatching = r => require(['@/pages/configuration/BusinessMatching'], r)
const TemplateMatching = r => require(['@/pages/configuration/templateMatching'], r)

const Collect = r => require(['@/pages/collect/collect'], r)
const Community = r => require(['@/pages/community/index'], r)
const Help = r => require(['@/pages/help/help'], r)

const router = new Router({
	routes: [{
		path: '/',
		component: Layout,
		children: [{
			path: 'help',
			name: 'help',
			component: Help
		}, { //主页
			path: 'index',
			name: 'index',
			component: Index,
			meta: {
				requireAuth: false
			}
		}, { //问题结果页
			path: 'chart/:id',
			name: 'chart',
			component: Chart,
			meta: {
				requireAuth: false
			}
		}, { //制作报告页
			path: 'produceReport/:id',
			name: 'produceReport',
			component: ProduceReport,
			meta: {
				requireAuth: true
			}
		}, { //我的搜索页
			path: 'mySeek',
			name: 'mySeek',
			component: MySeek,
			meta: {
				requireAuth: true
			}
		}, { //我的收藏页
			path: 'collect',
			name: 'collect',
			component: Collect,
			meta: {
				requireAuth: true
			}
		}, { //我的报告页
			path: 'myReport',
			name: 'myReport',
			component: MyReport,
			meta: {
				requireAuth: true
			}
		}, { //数据源连接
			path: 'dataMatching',
			name: 'dataMatching',
			component: DataMatching,
			meta: {
				requireAuth: true
			}
		}, { //数据结构分析
			path: 'dataStructureAnalysis',
			name: 'dataStructureAnalysis',
			component: DataStructureAnalysis,
			meta: {
				requireAuth: true
			}
		}, { //外键配置审核
			path: 'foreignKey',
			name: 'foreignKey',
			component: ForeignKey,
			meta: {
				requireAuth: true
			}
			/*}, {
				path: 'dataClassify',
				name: 'dataClassify',
				component: DataClassify*/
			/*}, { //数据展示
				path: 'dataShow',
				name: 'dataShow',
				component: DataShow,
				meta: {
					requireAuth: true
				}*/
		}, { //实体配置
			path: 'entity',
			name: 'entity',
			component: Entity,
			meta: {
				requireAuth: true
			}
		}, { //知识图谱构建
			path: 'relationExtraction',
			name: 'relationExtraction',
			component: RelationExtraction,
			meta: {
				requireAuth: true
			}
		}, { //热词配置
			path: 'hotWord',
			name: 'hotWord',
			component: HotWord,
			meta: {
				requireAuth: true
			}
			/*}, {
				path: 'dataAssociation',
				name: 'dataAssociation',
				component: DataAssociation
			}, {
				path: 'businessMatching',
				name: 'businessMatching',
				component: BusinessMatching*/
		}, { //模板配置
			path: 'templateMatching',
			name: 'templateMatching',
			component: TemplateMatching,
			meta: {
				requireAuth: true
			}
		}, { //社区
			path: 'community',
			name: 'community',
			component: Community,
			meta: {
				requireAuth: true
			}
		}, {
			path: '*',
			redirect: 'index'
		}]
	}, {
		path: '*',
		redirect: '/index'
	}]
})

/* 路由拦截器 */
router.beforeEach((to, from, next) => {
	//console.log(from, to)
	let app = router.app
	//console.log(to.matched.some(r => r.meta.requireAuth));
	// 跳转到这些页面时，如果未登录，给提示
	if(to.matched.some(r => r.meta.requireAuth)) { //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
		if(store.state.token) {
			next();
		} else {
			// 提示去登陆
			app.$message({
				type: 'warning',
				showClose: true,
				duration: 1000,
				message: '请先登录！'
			});
			return;
		}
	} else {
		next();
	}

	// 判断当跳转到问题结果页、制作报告页、或者模板配置页时，如果为此页面刷新则过800毫秒渲染图表，如果是其他页面跳转过来的则过300毫秒渲染图表
	if(to.name == 'chart' || to.name == 'produceReport' || to.name == 'templateMatching') {
		if(from.name == null) {
			store.commit('changeChartTime', 800)
		} else {
			store.commit('changeChartTime', 300)
		}
	}

	// 刷新页面或者切换到其他页面时
	if(to.name != from.name) {
		// 控制左侧侧边栏的显示与隐藏
		store.commit('changeLeftBar', true)
		// 控制制作报告页右侧元素容器的显示与隐藏
		store.commit('changeCanvasWrap', false)
	}
	// 跳到首页，清空输入框内容
	if(to.name == 'index') {
		store.commit('changeListState')
		app.search = ''
	}

	switch(to.name) {
		case 'index': //主页
			app.headNav = 0
			sessionStorage.setItem('headNav', 0)
			break;
		case 'help': //帮助页面
			app.headNav = 3
			sessionStorage.setItem('headNav', 3)
			break;
		case 'community': //社区页
			app.headNav = 4
			sessionStorage.setItem('headNav', 4)
			break;
	}

	if(to.name == 'collect' || to.name == 'myReport' || to.name == 'mySeek') {
		app.headNav = 2
		sessionStorage.setItem('headNav', 2)
		switch(to.name) {
			case 'collect':
				app.myActive = 0
				sessionStorage.setItem('myActive', 0)
				break;
			case 'myReport':
				app.myActive = 1
				sessionStorage.setItem('myActive', 1)
				break;
			case 'mySeek':
				app.myActive = 2
				sessionStorage.setItem('myActive', 2)
				break;
		}
	} else {
		app.myActive = -1
		sessionStorage.removeItem('myActive')
	}

	if(to.name == "myReport" || to.name == "collect") {
		store.commit('changeVisibleSeekBtn', true)
	} else {
		store.commit('changeVisibleSeekBtn', false)
	}
	if(to.name == 'chart' || to.name == 'produceReport') {
		app.headNav = -1
		sessionStorage.setItem('headNav', -1)
	}
	if(to.name == 'dataMatching' || to.name == 'dataStructureAnalysis' || to.name == 'foreignKey' || to.name == 'entity' || to.name == 'relationExtraction' || to.name == 'hotWord' || to.name == 'templateMatching') {
		app.headNav = 1
		sessionStorage.setItem('headNav', 1)
		store.commit('changeConfigurationName', to.name)
		//控制头部搜索框与配置流程组件相互切换
		store.commit('changeVisibleSearch', false)

		switch(to.name) {
			case 'dataMatching':
				app.configureActive = 0
				sessionStorage.setItem('configureActive', 0)
				break;
			case 'dataStructureAnalysis':
				app.configureActive = 1
				sessionStorage.setItem('configureActive', 1)
				break;
			case 'foreignKey':
				app.configureActive = 2
				sessionStorage.setItem('configureActive', 2)
				break;
			case 'entity':
				app.configureActive = 3
				sessionStorage.setItem('configureActive', 3)
				break;
			case 'relationExtraction':
				app.configureActive = 4
				sessionStorage.setItem('configureActive', 4)
				break;
			case 'hotWord':
				app.configureActive = 5
				sessionStorage.setItem('configureActive', 5)
				break;
			case 'templateMatching':
				app.configureActive = 6
				sessionStorage.setItem('configureActive', 6)
				break;
		}
	} else {
		app.configureActive = -1
		sessionStorage.removeItem('configureActive')
		store.commit('changeVisibleSearch', true)
	}

	next()
})

export default router