const option = (OPT) => {
	//console.log('2维折线图数据', OPT)
	if(OPT.type !== 'twoSLine') {
		console.error('数据类型错误')
		return
	}
	let twoSLineOption = {
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
			type: 'category',
			name:OPT.data.coordinateX,
			axisLabel: {
				color: "#333",
				formatter: function(c) {
					//console.log(c)
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
			name: OPT.data.coordinateY,
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
			smooth: true,
			name: OPT.data.name
		}]
	};
	return twoSLineOption
}


export default option