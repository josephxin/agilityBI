const option = (OPT) => {
	//console.log(OPT)
	if(OPT.type !== 'pieRing') {
		console.error('数据类型错误')
		return
	}
	let pieRing = {
		tooltip: {
			trigger: 'item',
		},
		legend: {
			data: OPT.data.legendData
		},
		series: [{
			name: OPT.data.name,
			type: 'pie',
			radius: ['40%', '80%'],
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
	return pieRing
}

export default option