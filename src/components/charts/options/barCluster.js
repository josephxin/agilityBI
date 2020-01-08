const option = (OPT) => {
	//console.log(OPT,"竖状簇状图");
	if(OPT.type !== 'barCluster') {
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
		// color:['#49d3f5','#ffd552','#ff902e','#90d96c','#24b282'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow
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
			type: 'category',
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
			data: OPT.data.xAxis,
			splitLine: {
				show: true
			}
		},
		yAxis: [{
			type: 'value',
			name: "",
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
			}
		}],
		series: OPT.data.seriesData
	};
	return barOption
}

export default option