const option = (OPT) => {
	//console.log('2维普通面积图数据', OPT)
	if(OPT.type !== 'twoSacreage') {
		console.error('数据类型错误')
		return
	}
	let twoSacreageOption = {
		legend: {
			data: OPT.data.name,
			right: '2%',
			textStyle: {
				color: '#333'
			},
			itemWidth: 20,
			itemHeight: 5,
			icon: 'bar'
		},
		grid: {
			left: '3%',
			right: '10%',
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
			type: 'category',
			name:OPT.data.coordinateX,
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
			data: OPT.data.handleNameArr
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
		series: [{
			data: OPT.data.handleDataArr,
			type: 'line',
			areaStyle: {}
		}]
	};
	return twoSacreageOption
}

export default option