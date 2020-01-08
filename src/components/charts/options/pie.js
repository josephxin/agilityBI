const option = (OPT) => {
	//console.log(OPT)
	if(OPT.type !== 'pie') {
		console.error('数据类型错误')
		return
	}
	let pieOption = {
		tooltip: {
			trigger: 'item',
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
				shadowStyle: {
					shadowBlur: 0,
					shadowOffsetY: -5
				},
				z: 1
			}
		},
		legend: {
			type: 'scroll',
			orient: 'vertical',
			left: 'left',
			data: OPT.data.legendData,
		},
		startAngle: "0",
		series: [{
			labelLine: {
				normal: {
					show: false
				}
			},
			label: {
				normal: {
					show: false,
					position: 'center'
				},
			},
			name: OPT.data.name,
			type: "pie",
			data: OPT.data.seriesData,
		}]
	};
	return pieOption
}

export default option