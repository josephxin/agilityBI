import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import actions from './actions.js'

export default new Vuex.Store({
	modules: {},
	state: {
		chartTime: 300,
		marginLeft: 290,
		flagLeftBar: true,
		deleteResize: true,
		listState: true, //列表选中项状态管理
		
		token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '', //看是否已登录
		userId: sessionStorage.getItem('userId') ? JSON.parse(sessionStorage.getItem('userId')) : 0,
		userName: sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '',
		themeColor: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'blue', //换肤主题色
		dataMatch: {
			name: "MySQL",
			imgUrl: require("@/assets/imgs/common/MySQL.png"),
			id: "1",
			tag: "mysql"
		}, //配置项组件的更换 数据源
		uploaded: true, //配置项数据源下面的已上传的数据源的取消选中

		currFolderId: 0, //制作报告页——当前报告所属目录id
		reportActive: 0, //制作报告页——左侧报告列表下标
		reportId: sessionStorage.getItem('reportId') ? sessionStorage.getItem('reportId') : 0, //制作报告页报告id
		reportName: sessionStorage.getItem('reportName') ? sessionStorage.getItem('reportName') : '', //制作报告页报告标题
		reportList: sessionStorage.getItem('reportList') ? JSON.parse(sessionStorage.getItem('reportList')) : [], //制作报告页——左侧报告列表
		echartsData: sessionStorage.getItem('echartsData') ? JSON.parse(sessionStorage.getItem('echartsData')) : [], //返回的数据处理后放到对象中，里面是数组

		currPageSearch: '', //用于我的报告，我的收藏的本页搜索

		flagCanvasWrap: false, //控制canvas元素的显示与隐藏
		elementType: 'rect', //制作报告页元素类型
		domList: [], //制作报告页元素数组

		lineColor: '#ff0000',
		lineWidth: 2,
		lineType: 'solid',

		fontFamily: 'Arial',
		fontSize: 24,
		fontColor: '#ff0000',
		fontWeight: 'normal',
		fontStyle: 'normal',
		fontUnderline: 'none',

		flagHeight: true, //临时变量
		dataPage: 1, //分页器
		dataLimit: 10, //每页的条数
		
		mySeekSwitch:false,//我的搜索开关

		visibleSearch: true, //头部搜索框与配置流程相互切换
		configurationName: 'dataMatching', //头部配置流程当前项
		visibleSeekBtn: false, //头部的本页搜索，是否渲染
		visibleHeader: true, //模板配置页的内容区域头部是否显示
		
		// 左侧布局类型模板下标
		templateActive: 0,
		// 右侧图表组件
		activeBorder: 0,
		layoutType: 'six-left',
		chartArr: [0, 1, 2, 3, 4, 5],
		currentChartIndex: 0, // 
		visibleBtn: true, //图表中的删除和切换按钮是否可见
		visibleCollectBtn: true, //图表页中的收藏按钮是否可见

		foreignKeyList: [], //外键设置左侧的数据  现在只要是左侧用到的都是这个数组
		entityLeftList: [], //实体属性点击时给jsplumb的数据
		entityListName: [], //实体属性点击时给实体主键，实体名字，所找到的表的数据渲染在实体主键，实体字面量
		entityRightList: [], //实体属性中拖拽到jsplumb 中表的数据 变化  也是给实体主键，实体字面量 增加下拉选择的
		entityDataObj: {}, //实体属性点击时会有默认的已中的实体主键，实体名字  （点击时调用接口所获取的数据）
		commonArr: [], //jsPlumb,中选中的列的table表格的变化数组的增删
		entityUpdata: false, //更新实体
		entityId: '', //实体id

		hotWord: {}, //配置热词中所选到的东西的数组？还是对象？
		hotWordTableActive: -1, //热词数据表当前项
		hotWordEntityActive: -1, //热词实体当前项

		requests: [], // 请求对象 数组
		chart: [], // 首页的推荐问题列表
		isRouterAlive: true, //用于切换服务器环境时，刷新首页的数据
	},
	mutations: {
		changeChartTime(state, data) {
			state.chartTime = data
		},
		changeLeftBar(state, bool) {
			state.flagLeftBar = bool
		},
		changeDeleteResize(state, bool) {
			state.deleteResize = bool
		},
		changeListState(state) {
			state.listState = !state.listState
		},
		changeTheme(state, color) {
			state.themeColor = color
		},
		changeDataMatch(state, tag) {
			state.dataMatch = tag
		},
		changeUploaded(state) {
			state.uploaded = !state.uploaded
		},
		changeCurrFolderId(state, data) {
			state.currFolderId = data
			sessionStorage.setItem("currFolderId", data)
		},
		changeReportActive(state, data) {
			state.reportActive = data
		},
		changeReportId(state, id) {
			state.reportId = id
			sessionStorage.setItem("reportId", id)
		},
		changeReportName(state, name) {
			state.reportName = name
			sessionStorage.setItem("reportName", name)
		},
		changeReportList(state, data) {
			state.reportList = data
			sessionStorage.setItem("reportList", JSON.stringify(data))
		},
		changeCanvasWrap(state, bool) {
			state.flagCanvasWrap = bool
		},
		changeElementType(state, data) {
			state.elementType = data
		},
		changeDomList(state, data) {
			state.domList = data
		},
		changeEchartsData(state, data) {
			state.echartsData = data
			sessionStorage.setItem("echartsData", JSON.stringify(data));
		},

		changeHeight(state, bool) {
			state.flagHeight = bool
		},
		changeLineColor(state, data) {
			state.lineColor = data
		},
		changeLineWidth(state, data) {
			state.lineWidth = data
		},
		changeLineType(state, data) {
			state.lineType = data
		},

		changeFontFamily(state, data) {
			state.fontFamily = data
		},
		changeFontSize(state, data) {
			state.fontSize = data
		},
		changeFontWeight(state, data) {
			state.fontWeight = data
		},
		changeFontStyle(state, data) {
			state.fontStyle = data
		},
		changeFontUnderline(state, data) {
			state.fontUnderline = data
		},
		changeFontColor(state, data) {
			state.fontColor = data
		},

		changeDataPage(state, data) {
			state.dataPage = data
		},
		changeDataLimit(state, data) {
			state.dataLimit = data
		},
		changeMySeekSwitch(state, bool) {
			state.mySeekSwitch = bool
		},
		changeVisibleSearch(state, data) {
			state.visibleSearch = data
		},
		changeVisibleSeekBtn(state, data) {
			state.visibleSeekBtn = data
		},
		changeVisibleHeader(state, data) {
			state.visibleHeader = data
		},
		
		changeConfigurationName(state, data) {
			state.configurationName = data
		},
		setToken(state, str) {
			state.token = str
			sessionStorage.setItem('token', str)
		},
		delToken(state) {
			state.token = ''
			sessionStorage.removeItem('token')
		},
		// 改变用户信息
		changeUserInfo(state, data) {
			state.userId = data.userId
			state.userName = data.userName
			if(data.userId == 0) {
				sessionStorage.removeItem('userId')
				sessionStorage.removeItem('userName')
			} else {
				sessionStorage.setItem('userId', data.userId)
				sessionStorage.setItem('userName', data.userName)
			}
		},
		changeTemplateActive(state, data) {
			state.templateActive = data
		},
		changeActiveBorder(state, data) {
			state.activeBorder = data
		},
		changeLayoutType(state, data) {
			state.layoutType = data
		},
		changeChartArr(state, data) {
			state.chartArr = data
		},
		changeCurrentChartIndex(state, data) {
			state.currentChartIndex = data
		},
		changeVisibleBtn(state, data) {
			state.visibleBtn = data
		},
		changeVisibleCollectBtn(state) {
			state.visibleCollectBtn = !state.visibleCollectBtn
		},

		changeForeignKeyList(state, data) {
			state.foreignKeyList = data
		},
		changeEntityLeftList(state, data) {
			state.entityLeftList = data
		},
		changeEntityListName(state, data) {
			state.entityListName = data
		},
		changeEntityRightList(state, data) {
			state.entityRightList = data
		},
		changeEntityDataObj(state, data) {
			state.entityDataObj = data
		},
		changeCommonArr(state, data) {
			state.commonArr = data
		},
		changeEntityUpdata(state, data) {
			state.entityUpdata = data
		},
		changeEntityId(state, data) {
			state.entityId = data
		},

		changeHotWord(state, data) {
			state.hotWord = data
		},
		changeHotWordTableActive(state, data) {
			state.hotWordTableActive = data
		},
		changeHotWordEntityActive(state, data) {
			state.hotWordEntityActive = data
		},

		changeRequests(state, data) {
			state.requests = data
		},
		changeCurrPageSearch(state, data) {
			state.currPageSearch = data
		},
		changeChart(state, data) {
			state.chart = data
		},
		changeRouterAlive(state, data) {
			state.isRouterAlive = data
		},
	},
	actions: actions
})