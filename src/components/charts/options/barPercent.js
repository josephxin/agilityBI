const option = (OPT) => {
	//console.log(OPT,"竖状百分比图");
	if(OPT.type !== 'barPercent') {
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
			name: OPT.data.xAxisName,
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
			name: OPT.data.yAxisName,
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
		series: [{
			name: OPT.data.series.name,
			type: "bar",
			label: {
				normal: {
					show: true,
					position: "top",
					color: "#505050",
					formatter: function(params) {
						return params.value + "%";
					}
				}
			},
			data: OPT.data.series.data
		}]
	};
	return barOption
}

export default option