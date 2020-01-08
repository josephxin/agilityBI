const option = (OPT) => {
	//console.log('2维环形图数据', OPT)
	if(OPT.type !== 'twoSpieRing') {
		console.error('数据类型错误')
		return
	}
	let pieOption = {
		title: {
			text: OPT.data.coordinateX,
			textStyle: {
				color: '#9f9f9f',
				fontSize: 14
			},
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c}"
		},
		legend: {
			type: 'scroll',
			orient: 'vertical',
			x: 'left',
			top:"30",
			data:OPT.data.handleNameArr,
			formatter: function (name) {
				if(name != '' && typeof(name)=='string'){
					return name.substring(0,6);
				}
			    return name
			}
		},
		series: [{
			name: OPT.data.coordinateX +':' +OPT.data.name,
			type: 'pie',
			radius: ['50%', '70%'],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '16',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data:pieData(OPT.data.handleDataArr, OPT.data.handleNameArr)
		}]
	};
	return pieOption
}

var pieData = (item, name) => {
	var seriesData = []
	item.forEach((val, i) => {
		var seriesObj = {
			"value": val,
			"name": name[i]
		}
		seriesData.push(seriesObj)
	})
	return seriesData
}


export default option