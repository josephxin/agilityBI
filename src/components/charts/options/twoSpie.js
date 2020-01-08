const option = (OPT) => {
	//console.log('2维饼图数据', OPT)
	if(OPT.type !== 'twoSpie') {
		console.error('数据类型错误')
		return
	}
	let pieOption = {
//		title: {
//			text: OPT.data.coordinateX,
//			textStyle: {
//				color: '#9f9f9f',
//				fontSize: 14
//			},
//			bottom:"1%"
//		},
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
		//plain
		//scroll
		legend: {
			type: 'scroll',
			orient: 'horizontal',
			bottom:"1%",
			align:"left",
			width:'90%',
			left: 'center',
			data: OPT.data.handleNameArr,
			formatter: function (name) {
				//console.log(name)//有时他会返回数字回来
				if(name != '' && typeof(name)=='string'){
					return name.substring(0,6);
				}
			    return name
			}
		},
		startAngle: "0",
		series: [{
			name: OPT.data.coordinateX +':' +OPT.data.name,
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

			type: "pie",
			data: pieData(OPT.data.handleDataArr, OPT.data.handleNameArr),
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