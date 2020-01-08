const option = (OPT) => {
	//console.log('2维线状雷达图', OPT)
	if(OPT.type !== 'twoSradarLine') {
		console.error('数据类型错误')
		return
	}
	let twoSradarLineOption = {
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
			data: OPT.data.handleNameArr,
			formatter: function (name) {
				//console.log(name)有时他会返回数字回来
				if(name != '' && typeof(name)=='string'){
					return name.substring(0,6);
				}
			    return name
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
				formatter: function(val) {
					return val + '(' + OPT.data.coordinateX + ')'
				},
				
			},

			indicator: twoSradarIndicator(OPT.data.handleNameArr),

		},
		series: [{
			name: OPT.data.name,
			type: 'radar',
			data: twoSradarSeries(OPT.data.handleDataArr, OPT.data.name)
		}]
	};
	return twoSradarLineOption
}

var twoSradarIndicator = (item) => { //坐标轴处理
	var indicatorData = []
	item.forEach((sradarItem, i) => {
		var indicatorObj = {
			"name": sradarItem
		}
		indicatorData.push(indicatorObj)
	})
	return indicatorData
}

var twoSradarSeries = (item, name) => { //数据处理
	var seriesData = []
	var indicatorObj = {
		"name": name,
		"value": item
	}
	seriesData.push(indicatorObj)
	return seriesData
}
export default option