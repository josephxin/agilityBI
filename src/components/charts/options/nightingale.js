const option = (OPT) => {
	//console.log(OPT)
	if(OPT.type !== 'nightingale') {
		console.error('数据类型错误')
		return
	}
	let nightingaleOption = {
		title: {
			text: OPT.data.title,
			textStyle: {
				color: '#9f9f9f',
				fontSize:14
			}
		},
		tooltip: {
			trigger: 'item',
		},
		legend: {
			type: 'scroll',
			orient: 'vertical',
			left: "left",
			top:"30",
			data: OPT.data.legendData
		},
		calculable: true,
		series: [{
			name: OPT.data.name,
			type: 'pie',
			radius: [20, 110],
			center: ['50%', '50%'],
			roseType: 'area',
			data: OPT.data.seriesData,
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
		}]
	};
	return nightingaleOption
}

export default option