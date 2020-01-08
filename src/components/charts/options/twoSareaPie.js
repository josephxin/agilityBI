const option = (OPT) => {
	//console.log('2维定角南丁格尔图', OPT)
	if(OPT.type !== 'twoSareaPie') {
		console.error('数据类型错误')
		return
	}
	let twoSareaPieOption = {
		title: {
			text: OPT.data.coordinateX,
			textStyle: {
				color: '#9f9f9f',
				fontSize: 14
			}
		},
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
			},
		},
		legend: {
			type: 'scroll',
			orient: 'vertical',
			left: "left",
			top: "30",
			data: OPT.data.handleNameArr,
			formatter: function (name) {
				//console.log(name)有时他会返回数字回来
				if(name != '' && typeof(name)=='string'){
					return name.substring(0,6);
				}
			    return name
			}
		},
		calculable: true,
		series: [{
			name: OPT.data.coordinateX +':' +OPT.data.name ,
			type: 'pie',
			radius: ['30%', '90%'],
			center: ['50%', '50%'],
			roseType: 'area',
			data: twoSareaPieData(OPT.data.handleDataArr, OPT.data.handleNameArr),
			label: {
				normal: {
					show: false,
					position: 'center'
				},
			},
			lableLine: {
				normal: {
					show: false
				},
			},
		}]
	};
	return twoSareaPieOption
}
var twoSareaPieData = (item, name) => {
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