const option = (OPT) => {
	console.log('2维瀑布图数据', OPT)
	if(OPT.type !== 'twoSfalls') {
		console.error('数据类型错误')
		return
	}
	let twoSfallsOption = {
		legend: {
			right: '4%',
			textStyle: {
				color: '#333'
			},
			itemWidth: 20,
			itemHeight: 5,
			data: []
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				z: 0
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
			name: "",
			type: "category",
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
				}
			},
			data: OPT.data.handleNameArr,
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
		series: [{
			name: '辅助',
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(0,0,0,0)',
					color: 'rgba(0,0,0,0)'
				},
				emphasis: {
					barBorderColor: 'rgba(0,0,0,0)',
					color: 'rgba(0,0,0,0)'
				}
			},
			data: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 6]
		},{
			name: OPT.data.name,
			stack: '总量',
			type: "bar",
			data: OPT.data.handleDataArr
		}]
	};
	return twoSfallsOption
}

export default option