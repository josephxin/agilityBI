const option = (OPT) => {
	//console.log('2维多序列普通面积图数据', OPT)
	if(OPT.type !== 'twoMacreage') {
		console.error('数据类型错误')
		return
	}
	let twoMacreageOption = {
		legend: {
			type: 'scroll',
			orient: 'vertical',
			left: 'left',
			data: OPT.data.name,
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				z: 0
			}
		},
		xAxis: {
			name:OPT.data.coordinateX,
			type: 'category',
			boundaryGap: false,
			axisLabel: {
				color: "#333",
				formatter: function(c) {
					return c.substring(0, 6);
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: "#9f9f9f"
				},
				splitLine: {
					show: true,
					color: "#9f9f9f"
				}
			},
			data: OPT.data.handleManyNameArr
		},
		yAxis: {
			type: 'value',
			name:OPT.data.coordinateY,
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
			splitLine: {
				show: true,
				color: "#9f9f9f"
			}
		},
		series: twoMLineData(OPT.data.handleManyDataArr,OPT.data.name)
	};
	return twoMacreageOption
}
var twoMLineData = (item, name) => {
	var twoMbarArr = []
	name.forEach((barItem, i) => {
		var twoMbarObj = {
			'type': 'line',
			'name': barItem,
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