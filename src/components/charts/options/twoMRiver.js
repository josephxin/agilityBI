const option = (OPT) => {
	//console.log("2维多序列河流图图", OPT);
	if(OPT.type !== 'twoMRiver') {
		console.error('数据类型错误')
		return
	}
	var twoMRiver = {
		legend: {
			data: OPT.data.name,
			type: 'scroll',
			orient: 'vertical',
			left: 'left',
			formatter: function (name) {
			    return name.substring(0,6);
			}
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
		singleAxis: {
			top: 50,
			bottom: 50,
			axisTick: {},
			axisLabel: {},
			type: 'time',
			axisPointer: {
				animation: true,
				label: {
					show: true
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
					opacity: 0.2
				}
			}
		},
		series: twoMbarData(OPT.data.handleManyDataArr, OPT.data.name, OPT.data.handleManyNameArr)

	};
	return twoMRiver
}

var twoMbarData = (item, name, oneContent) => {
	var twoMbarArr = []
	var twoMbarObj = {
		'type': 'themeRiver',
		'data': []
	}
	name.forEach((barItem, i) => {
		oneContent.forEach((dataItem, dataIndex) => {
			var dataArr = []
			dataArr.push(oneContent[dataIndex], item[dataIndex][i], barItem)
			twoMbarObj.data.push(dataArr)
		})

	})
	twoMbarArr.push(twoMbarObj)
	return twoMbarArr;
}

export default option