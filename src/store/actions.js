import { getRecommendedQueries, reportInfo, reportStoreInfo } from "@/api/index.js"

export default { //在action中可以进行异步操作。
	// 获取推荐的查询问题
	getRecommendedQueriesAction(context) {
		getRecommendedQueries({})
			.then(data => {
				//console.log('获取推荐的查询问题', data)
				if(data.data.length > 0) {
					context.commit('changeChart', data.data)
				} else {
					BIMsg({
						message: "暂无数据！"
					})
				}
			})
			.catch(err => {
				console.log(err);
			})
	},
	//获取报告表详细信息
	getReportInfo(context, reportId) {
		reportInfo({
				"id": reportId,
			})
			.then(data => {
				//console.log('获取当前报告详细信息', data)
				if(data.code == 200) {
					if(data.data) {
						var arr = JSON.parse(data.data.reportContent)
						context.commit('changeEchartsData', arr)
						context.commit('changeReportName', data.data.reportName)
					}
				}
			})
			.catch(err => {
				console.log(err);
			})
	},
	//获取收藏表详细信息
	getStoreInfo(context, reportId) {
		reportStoreInfo({
				"id": reportId,
			})
			.then(data => {
				//console.log('获取收藏报表详细信息', data)
				if(data.code == 200) {
					if(data.data) {
						var arr = JSON.parse(data.data.storeData)
						context.commit('changeEchartsData', arr)
						context.commit('changeReportName', data.data.reportName)
					}
				}
			})
			.catch(err => {
				console.log(err);
			})
	},
}