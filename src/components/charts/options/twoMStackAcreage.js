const option = (OPT) => {
	//console.log("2维多序列面积图", OPT);
	if(OPT.type !== 'twoMStackAcreage') {
		console.error('数据类型错误')
		return
	}
	var twoMStackAcreage = {
		legend: {
			type: 'scroll',
			left: 'left',
			textStyle: {
				color: '#333'
			},
			itemWidth: 20,
			itemHeight: 5,
			data: OPT.data.name
			
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				z: 0 // 默认为直线，可选为：'line' | 'shadow'
			},
			padding: 15
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: "category",
			axisLabel: {
				color: "#333"
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: "#9f9f9f"
				}
			},
			data: OPT.data.handleManyNameArr,
			splitLine: {
				show: true
			}
		},
		yAxis: [{
			type: 'value',
			name: OPT.data.coordinateY,
			axisLabel: {
				color: "#333",
				formatter: function(value) {
					return value;
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: "#9f9f9f"
				}
			},
		}],
		series: twoMbarData(OPT.data.handleManyDataArr, OPT.data.name)

	};
	return twoMStackAcreage
}

var twoMbarData = (item, name) => {
	var twoMbarArr = []
	name.forEach((barItem, i) => {
		var twoMbarObj = {
			'type': 'line',
			'name': barItem,
			'stack': '总量',
            'areaStyle': {normal: {}},
			'data': []
		}
		item.forEach((dataItem, dataIndex) => {
			twoMbarObj.data.push(dataItem[i])
		})
		twoMbarArr.push(twoMbarObj)
	})
	return twoMbarArr;
}

export default option