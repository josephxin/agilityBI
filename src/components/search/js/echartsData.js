//简单柱状图的数据处理  7  6
var bardata = (item, chartType, num) => {
	//console.log(item)
	var options = {}; //返回出去的对象
	var xAxisData = []; //在柱状图中x 轴  或者  y轴 要显示的数据，如周一，周二
	//var seriesData = [];
	// 在series 中 需要的参数 可以在增加
	var seriesObj = {
		"type": "",
		"name": "",
		"data": []
	}
	//循环数据把数据分开   
	item.data.forEach((itemData, dataIndex) => {
		seriesObj.data.push(itemData[1])
		xAxisData.push(itemData[0])
	})
	//seriesData.push(seriesObj)
	options.xAxis = xAxisData
	//在x 轴或者 y 轴显示的name
	options.xAxisName = item.dimension[0]
	options.yAxisName = item.dimension[1]
	//在柱状图中 type 是bar  不管是横着的还是竖着的
	seriesObj.type = "bar";
	seriesObj.name = item.series[0]
	options.series = seriesObj
	options.chartType = chartType
	if(num == 6) {
		//横向柱状图6
		options.shape = "y"
	} else {
		//竖向柱状图7
		options.shape = "x"
	}
	return options
};
//簇状柱状图的数据处理  10 11
var clusterBardata = (item, chartType) => {
	//console.log(item)
	var newItem = $.extend(true, {}, item);
	var options = {}; //返回出去的对象
	var xAxisData = []; //在柱状图中x 轴  或者  y轴 要显示的数据，如周一，周二
	var seriesData = [];
	// 在series 中 需要的参数 可以在增加
	//循环数据把数据分开   

	newItem.dimension.splice(0, 1) //截取数组，第一项是x轴需要拿出去
	newItem.data.forEach((spliceItem, spliceIndex) => { //截取数组，第一项是x轴需要拿出去
		xAxisData.push(spliceItem.splice(0, 1)) //顺便把截取出来的数据方到数组中 代表x轴或者y轴
	})
	//console.log(newItem)
	newItem.dimension.forEach((dimenItem, dimenIndex) => {
		var seriesObj = {
			"type": "",
			"name": "",
			"data": []
		}
		seriesObj.type = "bar";
		seriesObj.name = newItem.dimension[dimenIndex]
		newItem.data.forEach((itemData, dataIndex) => {
			seriesObj.data.push(itemData[dimenIndex])
		})
		seriesData.push(seriesObj)
	})
	options.xAxis = xAxisData
	options.seriesData = seriesData
	//在x 轴或者 y 轴显示的name
	//options.xAxisName = newItem.dimension[0]
	//options.yAxisName = newItem.dimension[1]
	//在柱状图中 type 是bar  不管是横着的还是竖着的
	options.chartType = chartType
	//console.log(options)
	return options
};
//简单饼状图数据处理  19 20 21 22    数据都是一样
var pieData = (item, chartType) => {
	var pieSeriesObj = {}
	var pieLegendData = []
	var pieSeriesData = []
	var title = '' //想写成头部
	item.data.forEach((pieItem, pieIndex) => {
		var pieObj = {
			"name": pieItem[0],
			"value": pieItem[1]
		}
		if(typeof(pieItem[0]) == "number") {
			title = item.dimension[0]
			/*pieLegendData.push(pieItem[0] + item.dimension[0])
			pieObj.name =  pieItem[0] + item.dimension[0]*/
		} else {
			/*pieObj.name =  pieItem[0]
			pieLegendData.push(pieItem[0])*/

		}
		pieLegendData.push(pieItem[0])
		pieSeriesData.push(pieObj)
	})
	pieSeriesObj.type = "pie"
	pieSeriesObj.name = item.series[0]
	pieSeriesObj.legendData = pieLegendData
	pieSeriesObj.seriesData = pieSeriesData
	pieSeriesObj.chartType = chartType
	pieSeriesObj.title = title
	//console.log(pieSeriesObj)
	var radar = radarData(item, "radar")
	return pieSeriesObj
};
//简单雷达图数据处理
var radarData = (item, chartType) => {
	var radarSeriesObj = {
		"type": "",
		"name": "",
		"indicator": [], //雷达坐标
		"data": [], //雷达图数据
		"dataName": [] //示例，多个名字时下面有示例
	}
	//循环数据把数据分开   
	item.data.forEach((itemData, dataIndex) => {
		radarSeriesObj.dataName.push(itemData[0])
		var radarValue = {
			"name": itemData[0],
			"value": itemData.slice(1, itemData.length)
		}
		radarSeriesObj.data.push(radarValue)
	})
	//循环出雷达坐标，第一项是名字，不要
	item.dimension.forEach((itemIon, itemIonIndex) => {
		if(itemIonIndex > 0) {
			var indicatorName = {
				"text": itemIon,
			}
			radarSeriesObj.indicator.push(indicatorName)
		}

	})
	radarSeriesObj.type = "radar"
	radarSeriesObj.name = item.series[0]
	radarSeriesObj.chartType = chartType
	return radarSeriesObj
};
//简单折线图数据处理
var lineData = (item, chartType) => {
	//console.log(item)
	var options = {}; //返回出去的对象
	var xAxisData = []; //在柱状图中x 轴  或者  y轴 要显示的数据，如周一，周二
	//var seriesData = [];
	// 在series 中 需要的参数 可以在增加
	var seriesObj = {
		"type": "",
		"name": "",
		"data": []
	}
	//循环数据把数据分开   
	item.data.forEach((itemData, dataIndex) => {
		seriesObj.data.push(itemData[1])
		xAxisData.push(itemData[0])
	})
	//seriesData.push(seriesObj)
	options.xAxis = xAxisData
	//在x 轴或者 y 轴显示的name
	options.xAxisName = item.dimension[0]
	options.yAxisName = item.dimension[1]
	//在柱状图中 type 是bar  不管是横着的还是竖着的
	seriesObj.type = chartType;
	seriesObj.name = item.series[0]
	options.series = seriesObj
	options.chartType = chartType

	return options
}
//折线图要是有百分号处理函数
var lineDataPercent = (item, chartType) => {
	//console.log(item)
	var options = {}; //返回出去的对象
	var xAxisData = []; //在柱状图中x 轴  或者  y轴 要显示的数据，如周一，周二
	//var seriesData = [];
	// 在series 中 需要的参数 可以在增加
	var seriesObj = {
		"type": "",
		"name": "",
		"data": []
	}
	//循环数据把数据分开   
	item.data.forEach((itemData, dataIndex) => {
		if(itemData[1] && itemData[1].toString().indexOf("%") != -1) {
			seriesObj.data.push(itemData[1].toString().split("%").join(""))
		} else {
			seriesObj.data.push(itemData[1])
		}
		xAxisData.push(itemData[0])
	})
	//seriesData.push(seriesObj)
	options.xAxis = xAxisData
	//在x 轴或者 y 轴显示的name
	options.xAxisName = item.dimension[0]
	options.yAxisName = item.dimension[1] + "(%)"
	//在柱状图中 type 是bar  不管是横着的还是竖着的
	seriesObj.type = chartType;
	seriesObj.name = item.series[0]
	options.series = seriesObj
	options.chartType = chartType

	return options
}

//多行卡片图
var cardManyData = (item, chartType) => {
	//console.log('多行卡片图', item, chartType)
	var cardObj = {}
	var cardArr = []
	var tdArr = []
	//cardObj.dataName = item.dimension
	//cardObj.data = item.data
	item.dimension.forEach((itemDis, index) => {
		var table = {
			"pops": itemDis
		}
		cardArr.push(table)
	})
	item.data.forEach((itemData, dataIndex) => {
		var tdObj = {}
		itemData.forEach((itemArr, arrIndex) => {
			tdObj[cardArr[arrIndex].pops] = itemData[arrIndex]
		})
		tdArr.push(tdObj)
	})
	cardObj.data = tdArr
	cardObj.name = cardArr
	cardObj.chartType = chartType
	cardObj.card = 2
	//card  1  单行卡片图    2  多行卡片图

	return cardObj
};
//单行卡片图
var cardSingleData = (item, chartType) => {
	//console.log('单行卡片图', item, chartType)

	var cardObj = {}
	cardObj.name = item.dimension
	cardObj.data = item.data
	cardObj.series = item.series
	cardObj.card = 1
	cardObj.chartType = chartType
	//card  1  单行卡片图   

	return cardObj
};

// 单序列数据处理
var dataHandle = (item, chartType, chartTypeArr) => {
	//console.log("单序列数据处理", item)
	var handle = {
		"handleNameArr": [], //在data中数组中的每一个第一项    可能是数字，可能是字符串
		"handleDataArr": [], //在data中数组中的每一个第二项    只能是数字
	}

	$.each(item.data, (i, itemHandle) => {
		//console.log(i,itemHandle);
		handle.handleNameArr.push(itemHandle[0])
		handle.handleDataArr.push(itemHandle[1])
	});
	//console.log(handle)
	handle.coordinateX = item.dimension[0]; // x轴坐标上的标识 比如姓名  
	handle.coordinateY = item.dimension[1]; // Y轴坐标上的标识 比如姓名
	handle.name = item.series[0] //写在series中的name
	handle.chartType = chartType
	handle.chartTypeArr = chartTypeArr
	//console.log(handle.handleNameArr)
	//console.log(handle.handleDataArr)
	return handle
}

//多序列数据处理
var dataHandleMany = (item, chartType, chartTypeArr) => {
	//console.log("多序列数据处理", item)
	var newItem = $.extend(true, {}, item);
	var handleMany = {
		"handleManyNameArr": [], //在data中数组中的每一个第一项    可能是数字，可能是字符串
		"handleManyDataArr": [], //在data中数组中的每一个第二项    只能是数字
	}

	newItem.data.forEach((spliceItem, spliceIndex) => { //截取数组，第一项是x轴需要拿出去
		handleMany.handleManyNameArr.push(spliceItem.splice(0, 1).join('')) //顺便把截取出来的数据方到数组中 代表x轴或者y轴
		handleMany.handleManyDataArr.push(spliceItem)
	})
	handleMany.name = newItem.series
	handleMany.chartType = chartType
	handleMany.chartTypeArr = chartTypeArr
	handleMany.coordinateX = newItem.dimension[0]
	handleMany.coordinateY = newItem.dimension[1] //先这样写  后期不知道怎么处理啊

	return handleMany
}

var handleEchartsData = function(dataModule, that) {
	var echartsData = [] //原来的数据
	var cardEchartsArr = [] //卡片图的数据
	dataModule.forEach((item, i) => {
		/*第二个元素的取值： { "1":"面状地图", "2":"点状地图", "3":"热力图地图", "4":"横向堆积柱状图", "5":"竖向堆积柱状图", "6":"横向柱状图", "7":"竖向柱状图", "8":"横向百分比堆积柱状图", "9":"竖向百分比堆积柱状图", "10":"横向簇状柱状图", "11":"竖向簇状柱状图", "12":"瀑布图", "13":"漏斗图", "14":"折线图", "15":"普通面积图", "16":"堆积面积图", "17":"折线柱状混合图", "18":"河流图", "19":"饼状图", "20":"环形图", "21":"定角南丁格尔图", "22":"不定角南丁格尔图", "23":"散点图", "24":"关系图", "25":"箱形树状图", "26":"条形树状图", "27":"桑基图", "28":"旭日图", "29":"多行卡片图", "30":"标准卡片图", "31":"面状雷达图", "32":"线状雷达图" }*/
		//console.log(item)

		//找不到维度的,匹配到维度但是匹配不到特征的直接按照item.feature[1] 来写 且不能切换

		if(item.dimension.length == 2) {
			//2维数据   长度是几就是几维
			if(item.series.length == 1) {
				//单序列   1是单序列  2或者大于一？是多序列 
				if(item.feature[0] == "占比") {
					//"占比":[ "19",   "20",    "21",     "22",     "31",        "32",     "6",   "7",    "10","11",   "13",    "29",    "30"],
					//			pie  pieRing   areaPie   radiusPie   radarNood   radarLine  barY   bar     暂时不要        funnel   Mcard    Scard
					//代表能切换的图表  twoSbar   two (2维)  S (单序列)   bar(竖向柱状图)  barY(横向柱状图)  barYP(横向百分比柱状图)   
					var typeArr = ["twoSpie", "twoSpieRing", "twoSareaPie", "twoSradiusPie", "twoSradarNood", "twoSradarLine", "twoSbarY", "twoSbar", "twoSfunnel"]
					switch(item.feature[1]) {
						case 6:
							//横向柱状图
							echartsData.push(dataHandle(item, "twoSbarY", typeArr))
							break;
						case 7:
							//竖向柱状图
							echartsData.push(dataHandle(item, "twoSbar", typeArr))
							break;
						case 10:
							//横向簇状柱状图
							break;
						case 11:
							//竖向簇状柱状图
							break;
						case 13:
							//漏斗图
							echartsData.push(dataHandle(item, "twoSfunnel", typeArr))
							break;
						case 19:
							//饼状图
							echartsData.push(dataHandle(item, "twoSpie", typeArr))
							break;
						case 20:
							//环形图
							echartsData.push(dataHandle(item, "twoSpieRing", typeArr))
							break;
						case 21:
							//定角南丁格尔图
							echartsData.push(dataHandle(item, "twoSareaPie", typeArr))
							break;
						case 22:
							//不定角南丁格尔图
							echartsData.push(dataHandle(item, "twoSradiusPie", typeArr))
							break;
						case 29:
							//多行卡片图
							//var card = dataHandle(item, "twoSMcard", typeArr)
							//现在不能更换。。。。
							echartsData.push(cardManyData(item, ""))
							break;
						case 30:
							//标准卡片图
							//dataHandle(item, "twoSScard", typeArr)
							break;
						case 31:
							//面状雷达图
							echartsData.push(dataHandle(item, "twoSradarNood", typeArr))
							break;
						case 32:
							//线状雷达图
							echartsData.push(dataHandle(item, "twoSradarLine", typeArr))
							break;
					}
				} else if(item.feature[0] == "趋势") {
					//"趋势":["7","11","14","15","16","12"],  想要支持的
					//["7","14","15","12"]  、、实际写的
					/*{  "7":"竖向柱状图", "11":"竖向簇状柱状图", "12":"瀑布图", "14":"折线图", "15":"普通面积图", "16":"堆积面积图"*/

					var trendArr = ["twoSbar", "twoSLine", "twoSacreage"]
					switch(item.feature[1]) {
						case 7:
							//竖向柱状图
							echartsData.push(dataHandle(item, "twoSbar", trendArr))
							break;
						case 11:
							//竖向簇状柱状图  单序列无法生成多序列的数据
							break;
						case 12:
							//瀑布图
							//echartsData.push(dataHandle(item, "twoSfalls", trendArr))
							break;
						case 14:
							//折线图
							echartsData.push(dataHandle(item, "twoSLine", trendArr))
							break;
						case 15:
							//普通面积图
							echartsData.push(dataHandle(item, "twoSacreage", trendArr))
							break;
						case 16:
							//堆积面积图  无法切换
							break;
					}
				} else if(item.feature[0] == "指标") {
					// 10 和11 暂时没有
					//"指标":["31","32","6","7","10","11","13","29","30","19","20","21","22"],
					var normArr = ["twoSpie", "twoSpieRing", "twoSareaPie", "twoSradiusPie", "twoSradarNood", "twoSradarLine", "twoSbarY", "twoSbar", "twoSfunnel"]
					switch(item.feature[1]) {
						case 6:
							//横向柱状图
							echartsData.push(dataHandle(item, "twoSbarY", normArr))
							break;
						case 7:
							//竖向柱状图
							echartsData.push(dataHandle(item, "twoSbar", normArr))
							break;
						case 10:
							//横向簇状柱状图
							break;
						case 11:
							//竖向簇状柱状图
							break;
						case 13:
							//漏斗图
							echartsData.push(dataHandle(item, "twoSfunnel", normArr))
							break;
						case 19:
							//饼状图
							echartsData.push(dataHandle(item, "twoSpie", normArr))
							break;
						case 20:
							//环形图
							echartsData.push(dataHandle(item, "twoSpieRing", normArr))
							break;
						case 21:
							//定角南丁格尔图
							echartsData.push(dataHandle(item, "twoSareaPie", normArr))
							break;
						case 22:
							//不定角南丁格尔图
							echartsData.push(dataHandle(item, "twoSradiusPie", normArr))
							break;
						case 29:
							//多行卡片图
							//var card = dataHandle(item, "twoSMcard", typeArr)
							echartsData.push(cardManyData(item, ""))
							break;
						case 30:
							//标准卡片图
							//dataHandle(item, "twoSScard", typeArr)
							break;
						case 31:
							//面状雷达图
							echartsData.push(dataHandle(item, "twoSradarNood", normArr))
							break;
						case 32:
							//线状雷达图
							echartsData.push(dataHandle(item, "twoSradarLine", normArr))
							break;
					}
				} else if(item.feature[0] == "位置") {
					//"位置":["1","2","3"]
				}

			} else if(item.series.length == 2) {
				//多序列
				/*{ "4":"横向堆积柱状图", "5":"竖向堆积柱状图", "8":"横向百分比堆积柱状图", "9":"竖向百分比堆积柱状图", "10":"横向簇状柱状图", "11":"竖向簇状柱状图","31":"面状雷达图", "32":"线状雷达图" }*/

				if(item.feature[0] == "占比") {
					//["8","9","31","32","4","5","10","11"]
					var typeManyArr = ['twoMbarY', 'twoMbar', 'twoMbarPY', 'twoMbarP', 'twoMClusterY', 'twoMCluster', 'twoMradarNood', "twoMradarLine"]
					switch(item.feature[1]) {
						case 4:
							//横向堆积柱状图  js创建了  数据处理没有写
							//twoMbarY
							echartsData.push(dataHandleMany(item, "twoMbarY", typeManyArr))
							break;
						case 5:
							//竖向堆积柱状图
							//twoMbar
							echartsData.push(dataHandleMany(item, "twoMbar", typeManyArr))
							break;
						case 8:
							//横向百分比堆积柱状图
							//twoMbarPY
							//echartsData.push(dataHandleMany(item, "twoMbarPY", typeManyArr))
							break;
						case 9:
							//竖向百分比堆积柱状图
							//twoMbarP
							//echartsData.push(dataHandleMany(item, "twoMbarP", typeManyArr))
							break;
						case 10:
							//横向簇状柱状图
							//twoMClusterY
							echartsData.push(dataHandleMany(item, "twoMClusterY", typeManyArr))
							break;
						case 11:
							//竖向簇状柱状图
							//twoMCluster
							echartsData.push(dataHandleMany(item, "twoMCluster", typeManyArr))
							break;
						case 31:
							//面状雷达图
							//twoMradarNood
							echartsData.push(dataHandleMany(item, "twoMradarNood", typeManyArr))
							break;
						case 32:
							//线状雷达图
							//twoMradarLine
							echartsData.push(dataHandleMany(item, "twoMradarLine", typeManyArr))
							break;
					}
				} else if(item.feature[0] == "趋势") {
					// "5","11","14","15","16","18"
					/*{ "5":"竖向堆积柱状图", "11":"竖向簇状柱状图","14":"折线图", "15":"普通面积图", "16":"堆积面积图", "18":"河流图",  }*/
					var trendManyArr = ['twoMbar', 'twoMCluster', 'twoMStackAcreage', 'twoMRiver', 'twoMLine', 'twoMacreage']
					switch(item.feature[1]) {
						case 5:
							//竖向堆积柱状图twoMbar
							echartsData.push(dataHandleMany(item, "twoMbar", typeManyArr))
							break;
						case 11:
							//竖向簇状柱状图
							//twoMCluster
							echartsData.push(dataHandleMany(item, "twoMCluster", trendManyArr))
							break;
						case 14:
							//折线图  //多序列折线图 要和单序列折线图分开写？ 还是不分开来写？
							//twoMLine
							//
							echartsData.push(dataHandleMany(item, "twoMLine", trendManyArr))
							//echartsData.push(dataHandleMany(item, "twoMradarLine", trendManyArr))
							break;
						case 15:
							//普通面积图  
							//twoMacreage
							echartsData.push(dataHandleMany(item, "twoMacreage", trendManyArr))
							break;
						case 16:
							//堆积面积图
							//twoMStackAcreage
							echartsData.push(dataHandleMany(item, "twoMStackAcreage", trendManyArr))
						case 18:
							//河流图  是什么样的
							//twoMRiver
							echartsData.push(dataHandleMany(item, "twoMRiver", trendManyArr))
							break;
					}
				} else if(item.feature[0] == "指标") {
					var typeManyArr = ['twoMbarY', 'twoMbar', 'twoMbarPY', 'twoMbarP', 'twoMClusterY', 'twoMCluster', 'twoMradarNood', "twoMradarLine"]
					switch(item.feature[1]) {
						case 4:
							//横向堆积柱状图
							//twoMbarY
							echartsData.push(dataHandleMany(item, "twoMbarY", typeManyArr))
							break;
						case 5:
							//竖向堆积柱状图
							//twoMbar
							echartsData.push(dataHandleMany(item, "twoMbar", typeManyArr))
							break;
						case 8:
							//横向百分比堆积柱状图
							//twoMbarPY
							//echartsData.push(dataHandleMany(item, "twoMbarPY", typeManyArr))
							break;
						case 9:
							//竖向百分比堆积柱状图
							//twoMbarP
							//echartsData.push(dataHandleMany(item, "twoMbarP", typeManyArr))
							break;
						case 10:
							//横向簇状柱状图
							//twoMClusterY
							echartsData.push(dataHandleMany(item, "twoMClusterY", typeManyArr))
							break;
						case 11:
							//竖向簇状柱状图
							//twoMCluster
							echartsData.push(dataHandleMany(item, "twoMCluster", typeManyArr))
							break;
						case 31:
							//面状雷达图
							//twoMradarNood   多序列的面状雷达图和线状雷达图   
							echartsData.push(dataHandleMany(item, "twoMradarNood", typeManyArr))
							break;
						case 32:
							//线状雷达图
							//twoMradarLine
							echartsData.push(dataHandleMany(item, "twoMradarLine", typeManyArr))
							break;
					}
				}

			}
		} else if(item.dimension.length == 3) {
			//3维

		} else {
			//4维   5维  不需要切换 还是用以前的
			switch(item.feature[1]) {
				case 1:
					//面状地图
					break;
				case 2:
					//点状地图
					break;
				case 3:
					//热力图地图
					break;
				case 4:
					//横向堆积柱状图
					break;
				case 5:
					//竖向堆积柱状图
					break;
				case 6:
					//横向柱状图6
					var opY = bardata(item, "bar", 6)
					echartsData.push(opY)
					break;
				case 7:
					//竖向柱状图
					var op = bardata(item, "bar", 7)
					echartsData.push(op)
					break;
				case 8:
					//横向百分比堆积柱状图
					break;
				case 9:
					//竖向百分比堆积柱状图
					break;
				case 10:
					//横向簇状柱状图

					break;
				case 11:
					//竖向簇状柱状图
					var clusterBar = clusterBardata(item, "barCluster")
					echartsData.push(clusterBar)
					break;
				case 12:
					//瀑布图
					break;
				case 13:
					//漏斗图
					break;
				case 14:
					//折线图  简单折线图和简单柱状图的数据结构是一样的可以用一个
					var flag = false
					var line;
					$.each(item.data, (dataIndex, itemData) => {
						//console.log(itemData)
						if(itemData[1] && itemData[1].toString().indexOf("%") != -1) {
							flag = true
							return false;
						}
					})
					if(flag) { //有百分比
						line = lineDataPercent(item, "line")
					} else {
						line = lineData(item, "line")
					}
					echartsData.push(line)
					break;
				case 15:
					//普通面积图
					break;
				case 16:
					//堆积面积图
					break;
				case 17:
					//折线柱状混合图
					break;
				case 18:
					//河流图
					break;
				case 19:
					//饼状图
					//console.log(item)
					var pie = pieData(item, "pie")
					echartsData.push(pie)
					break;
				case 20:
					//环形图
					var pieRing = pieData(item, "pieRing")
					echartsData.push(pieRing)
					break;
				case 21:
					//定角南丁格尔图 ?
					var nightingale = pieData(item, "nightingale")
					echartsData.push(nightingale)
					break;
				case 22:
					//不定角南丁格尔图 ？
					var nightingale = pieData(item, "nightingale")
					echartsData.push(nightingale)
					break;
				case 23:
					//散点图
					break;
				case 24:
					//关系图
					break;
				case 25:
					//箱形树状图
					break;
				case 26:
					//条形树状图
					break;
				case 27:
					//桑基图
					break;
				case 28:
					//旭日图
					break;
				case 29:
					//多行卡片图
					//card  1  单行卡片图    2  多行卡片图
					var cardEchartsObj = cardManyData(item, "")
					cardEchartsArr.push(cardEchartsObj)
					//echartsData.push(cardEchartsObj)
					break;
				case 30:
					//标准卡片图
					var cardEchartsSingleObj = cardSingleData(item, "")
					cardEchartsArr.push(cardEchartsSingleObj)
					//echartsData.push(cardEchartsSingleObj)
					break;
				case 31:
					//面状雷达图
					break;
				case 32:
					//线状雷达图
					var radarSeriesObj = radarData(item, "basicRadar")
					echartsData.push(radarSeriesObj)
					break;
			}
		}
	})
	//只想让卡片在最后
	if(cardEchartsArr.length > 0) {
		echartsData = echartsData.concat(cardEchartsArr);
	}

	return echartsData;
}

export {
	handleEchartsData
}