const option = (OPT) => {
	//console.log("2维漏斗图",OPT);
	if(OPT.type !== 'twoSfunnel') {
		console.error('数据类型错误')
		return
	}
	var funnelOption = {
		title: {},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c}"
		},
		legend: {
			data: OPT.data.handleNameArr,
			type: 'scroll',
			orient: 'vertical',
			left:'left',
			formatter: function (name) {
				if(name != '' && typeof(name)=='string'){
					return name.substring(0,6);
				}
			    return name
			}
		},
		calculable: true,
		series: [{
			name: OPT.data.coordinateX +':' +OPT.data.name,
			type: 'funnel',
			gap: 2,
			label: {
				normal: {
					show: true,
					position: 'inside'
				},
				emphasis: {
					textStyle: {
						fontSize: 20
					}
				}
			},
			labelLine: {
				normal: {
					length: 10,
					lineStyle: {
						width: 1,
						type: 'solid'
					}
				}
			},
			itemStyle: {
				normal: {
					borderColor: '#fff',
					borderWidth: 1
				}
			},
			data: funnelOptionData(OPT.data.handleDataArr, OPT.data.handleNameArr)
		}]
	};
	return funnelOption
}

var funnelOptionData = (item, name) => {
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