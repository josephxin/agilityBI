const option = (OPT) => {
	//console.log("2维竖向柱状图数据",OPT);
	if(OPT.type !== 'twoSbar') {
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
			name: OPT.data.coordinateX,
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
			name: OPT.data.name,
			type: "bar",
			barMaxWidth:60,
			data: OPT.data.handleDataArr
		}]
	};
	return barOption
}

export default option