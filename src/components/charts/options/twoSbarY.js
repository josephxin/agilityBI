const option = (OPT) => {
	//console.log("2维barY横向柱状数据",OPT);
	if(OPT.type !== 'twoSbarY') {
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
			name: OPT.data.coordinateY,
			type: 'value',
			axisLabel: {
				color: "#333",
				
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

		},
		yAxis: [{
			type: 'category',
			name: OPT.data.coordinateX,
			axisLabel: {
				color: "#333",
				formatter: function(value) {
					return value.substring(0,6);
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
			splitLine: {
				show: true
			},
			data: OPT.data.handleNameArr
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