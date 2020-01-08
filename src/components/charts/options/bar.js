const option = (OPT) => {
	//console.log("横向柱状图和竖向柱状图整合",OPT);
	if(OPT.type !== 'bar') {
		console.error('数据类型错误')
		return
	}
	var barOption = {
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
			name: OPT.data.shape == "x" ? OPT.data.xAxisName : OPT.data.yAxisName,
			type: OPT.data.shape == "x" ? 'category' : 'value',
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
			data: OPT.data.shape == "x" ? OPT.data.xAxis : '',
			splitLine: {
				show: true
			}
		},
		yAxis: [{
			type: OPT.data.shape == "x" ? 'value' : 'category',
			name: OPT.data.shape == "x" ? OPT.data.yAxisName : OPT.data.xAxisName,
			inverse: OPT.data.shape == "x" ? false : true, //是否反向坐标轴
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
			data: OPT.data.shape == "x" ? '' : OPT.data.xAxis
		}],
		series: [{
			name: OPT.data.series.name,
			type: "bar",
			barMaxWidth:60,
			data: OPT.data.series.data
		}]
	};
	return barOption
}

export default option