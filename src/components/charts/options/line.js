const option = (OPT) => {
	//console.log(OPT)
	if(OPT.type !== 'line') {
		console.error('数据类型错误')
		return
	}
	let lineOption = {
		legend: {
			data: [],
			right: '4%',
			textStyle: {
				color: '#333'
			},
			itemWidth: 20,
			itemHeight: 5,
			icon: 'bar'
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
				},
				splitLine: {
					show: true,
					color: "#9f9f9f"
				}
			},
			data: OPT.data.xAxis
		},
		yAxis: {
			type: 'value',
			name: OPT.data.yAxisName,
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
			data: OPT.data.series.data,
			type: 'line',
			smooth: true,
			name: OPT.data.series.name
		}]
	};
	return lineOption
}

export default option