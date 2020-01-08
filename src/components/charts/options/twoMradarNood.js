const option = (OPT) => {
	//console.log("2维多序列面状雷达图", OPT);
	if(OPT.type !== 'twoMradarNood') {
		console.error('数据类型错误')
		return
	}
	var twoMbarOption = {
		tooltip: {
			trigger: 'item',
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
				shadowStyle: {
					shadowBlur: 0,
					shadowOffsetY: -5
				},
				z: 1
			}
		},
		legend: {
			type: 'scroll',
			orient: 'vertical',
			left: 'left',
			data: OPT.data.name,
			formatter: function(c) {
				return c.substring(0, 7);
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		radar: {
			name: {
				textStyle: {
					color: '#fff',
					backgroundColor: '#999',
					borderRadius: 3,
					padding: [3, 5]
				},
				formatter: function(c) {
					return c.substring(0, 6);
				}
			},

			indicator: twoMbarIndicator(OPT.data.handleManyNameArr),

		},
		series: twoMbarSeries(OPT.data.handleManyDataArr, OPT.data.name)
	};
	return twoMbarOption
}

var twoMbarIndicator = (item) => { //坐标轴处理
	var indicatorData = []
	item.forEach((sradarItem, i) => {
		var indicatorObj = {
			"name": sradarItem
		}
		indicatorData.push(indicatorObj)
	})
	return indicatorData
}

var twoMbarSeries = (item, name) => { //数据处理
	var seriesData = []
	// areaStyle: {normal: {}},	 显示成面积
	name.forEach((nameItem, i) => {
		var seriesObj = {
			'name': nameItem,
			'type': 'radar',
			'areaStyle': {normal: {}},
			'data': []
		}
		var dataArr = []
		item.forEach((dataItem, dataIndex) => {
			dataArr.push(dataItem[i])
		})
		//数组套数组
		seriesObj.data.push(dataArr)
		seriesData.push(seriesObj)
	})
	//console.log(seriesData)
	return seriesData
}

export default option