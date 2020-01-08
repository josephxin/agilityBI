import $api from './config/config'

//window.baseUrlResult = serverUrlWF
//window.baseUrlSwagger = serverUrlHQ
window.baseUrlResult = eolinker
window.baseUrlSwagger = eolinker
/*
 * 登录注册接口
 * */
//注册接口
const register = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/sysUser/register",
		params
	})
}
//  校验用户名是否被占用
const check = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/sysUser/check",
		params
	})
}
//登录
const login = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/sysUser/login",
		params
	})
}

/*
 * 社区接口 
 * */
//获取所有社区
const getCommunity = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/sysUser/getCommunity",
		params
	})
}
//用户保存社区
const saveCommunity = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/sysUser/saveCommunity",
		params
	})
}

/*
 * 获取首页数据接口 
 * */
//头部搜索框接口
const queryResult = (params) => {
	return $api.post({
		url: baseUrlResult + "/query/queryResult",
		params
	})
}
//获取查询的热词
const getHotWords = (params) => {
	return $api.post({
		url: baseUrlResult + "/recommend/getHotWords",
		params
	})
}
//获取推荐的查询问题
const getRecommendedQueries = (params) => {
	return $api.post({
		url: baseUrlResult + "/recommend/getRecommendedQueries",
		params
	})
}
//热点接口
const getHotQueries = (params) => {
	return $api.post({
		url: baseUrlResult + "/recommend/getHotQueries",
		params
	})
}
//收藏接口
const getCollect = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportStoreCount/list",
		params
	})
}

/*
 * 数据源接口
 * */
//数据源测试连接
const getDataAllocationRight = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/rdbmsConnectionTest",
		params
	})
}
//数据源保存
const postDataAllocationRight = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/saveRdbmsConnetionInfo",
		params
	})
}
//数据源列表查询
const getDataMatchingList = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/queryDataSourceList",
		params
	})
}

/*
 * 数据结构分析
 * */
//获取表结构接口
const getDatabaseStruct = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/getDatabaseStruct",
		params
	})
}
//存储数据库表结构选取结果接口
const saveDatabaseStruct = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/saveDatabaseStruct",
		params
	})
}
//启动外键识别任务接口
const startForeignKeyAnalysis = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/startForeignKeyAnalysis",
		params
	})
}
//外键识别任务进度查询接口
const queryForeignKeyAnalysisProgress = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/queryForeignKeyAnalysisProgress",
		params
	})
}
//终止外键识别任务接口
const cancelForeignKeyAnalysis = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/cancelForeignKeyAnalysis",
		params
	})
}

/*
 * 外键配置接口
 */
//获取数据库表结构和外键接口
const getDataForeignKey = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/getDatabaseStructAndFK",
		params
	})
}
//外键修改接口
const getDataForeignKeyUpdate = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/updateForeignKey",
		params
	})
}

/**
 * 
 *实体配置接口
 *
 */
//获取实体接口
const getDataEntity = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/queryEntityList",
		params
	})
}
//新增或者修改实体
const UpdataEntity = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/updateEntity",
		params
	})
}
//删除实体
const getDataDeleteEntity = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/deleteEntity",
		params
	})
}

/*
 * 知识图谱构建
 */
//启动图谱构建接口
const getDataRelationExtraction = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/startKGBuild",
		params
	})
}

//查询图谱构建任务进度接口
const getKGBuildProgress = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/getKGBuildProgress",
		params
	})
}

//终止图谱构建任务接口
const cancelKGBuild = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/cancelKGBuild",
		params
	})
}

/*
 * 热词配置接口
 * */
//获取热词列表
const queryHotWordList = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/queryHotWordList",
		params
	})
}
//修改热词接口
const updateHotWord = (params) => {
	return $api.post({
		url: baseUrlResult + "/config/updateHotWord",
		params
	})
}

/*
 *我的报告——列表接口 
 */
//获取指定目录下报告列表
const reportFolderList = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportFolder/list",
		params
	})
}
//删除报告-传递字符串
const reportFolderDelete = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportFolder/delete",
		params
	})
}

/*
 *我的报告——类型接口
 */
//根据用户id查询我的报告分类列表
const folderList = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/folder/list",
		params
	})
}
//新增文件类
const folderAdd = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/folder/add",
		params
	})
}
//删除(包括文件夹相关内容)
const folderDelete = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/folder/delete",
		params
	})
}
//修改 传id和文件夹名称
const folderUpdate = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/folder/update",
		params
	})
}

/*
 *我的报告——详情接口
 */
//获取报告表详细信息
const reportInfo = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportInfo/info",
		params
	})
}
//根据ReportInfo对象创建报告表
const reportInfoSave = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportInfo/save",
		params
	})
}

//根据传过来的ReportInfo对象信息来更新报告表详细信息
const reportInfoUpdate = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportInfo/update",
		params
	})
}

/*
 * 
 *我的收藏接口 
 * */
//我的收藏——列表接口  获取报告收藏表列表
const reportStoreInfoList = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportStoreInfo/list",
		params
	})
}
//我的收藏——列表接口     删除报告收藏表-传递数组
const reportStoreInfoDelete = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportStoreInfo/delete",
		params
	})
}

//我的收藏—— 类型接口   查询收藏列表
const storeFolderList = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/storeFolder/list",
		params
	})
}
//我的收藏—— 类型接口      根据StoreFolder对象创建报告收藏文件夹   就是新增文件夹
const storeFolderSave = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/storeFolder/save",
		params
	})
}
//我的收藏—— 类型接口      根据传过来的StoreFolder对象信息来更新报告收藏文件夹详细信息
const storeFolderUpdate = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/storeFolder/update",
		params
	})
}
//我的收藏—— 类型接口      删除收藏夹
const storeFolderDelete = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/storeFolder/delete",
		params
	})
}

//我的收藏——详情接口  根据主键查询信息
const reportStoreInfo = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportStoreInfo/info",
		params
	})
}
//我的收藏——详情接口  保存收藏报告  
const reportStoreInfoSave = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportStoreInfo/save",
		params
	})
}

/*
 *我的搜索历史记录
 *
 */
//我的搜索    获取用户搜索历史表列表
const reportSearchHistoryList = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportSearchHistory/list",
		params
	})
}
//保存热词搜索表
const reportSearchHistorySave = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportSearchHistory/save",
		params
	})
}
//删除搜索历史记录  /reportSearchHistory/delete
const reportSearchHistoryDelete = (params) => {
	return $api.post({
		url: baseUrlSwagger + "/reportSearchHistory/delete",
		params
	})
}
//测试接口
const test = (params) => {
	return $api.post({
		url: "http://192.168.15.213:8082/api/farmReport/exportReportInfo",
		params
	})
}

export {
	// 登录、注册、社区
	register,
	check,
	login,
	getCommunity,
	saveCommunity,
	
	queryResult,
	getHotWords,
	getRecommendedQueries,
	getHotQueries,
	getCollect,
	postDataAllocationRight,
	getDataAllocationRight,
	getDataMatchingList,

	// 数据结构分析接口
	getDatabaseStruct,
	saveDatabaseStruct,
	startForeignKeyAnalysis,
	queryForeignKeyAnalysisProgress,
	cancelForeignKeyAnalysis,

	getDataForeignKey,
	getDataForeignKeyUpdate,
	getDataEntity,
	UpdataEntity,
	getDataDeleteEntity,
	getDataRelationExtraction,
	getKGBuildProgress,
	cancelKGBuild,
	queryHotWordList,
	updateHotWord,

	//我的报告列表
	reportFolderList,
	reportFolderDelete,

	//我的报告分类
	folderList,
	folderAdd,
	folderUpdate,
	folderDelete,

	//报告详情
	reportInfo,
	reportInfoSave,
	reportInfoUpdate,

	//我的收藏——列表
	reportStoreInfoList,
	reportStoreInfoDelete,

	//我的收藏—— 类型接口
	storeFolderList,
	storeFolderSave,
	storeFolderUpdate,
	storeFolderDelete,

	//我的收藏——详情接口
	reportStoreInfo,
	reportStoreInfoSave,

	//我的搜索历史记录
	reportSearchHistoryList,
	reportSearchHistorySave,
	reportSearchHistoryDelete,

	getTest,
	postTest,
	test
}