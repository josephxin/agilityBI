const option = (OPT) => {
	//console.log("2维多序列竖向百分比堆积柱状图", OPT);
	if(OPT.type !== 'twoMbarP') {
		console.error('数据类型错误')
		return
	}
	var twoMbarOption
	return twoMbarOption
}

var twoMbarData = (item, name) => {
	var twoMbarArr = []
	name.forEach((barItem, i) => {
		var twoMbarObj = {
			'type': 'bar',
			'name': barItem,
			'data': []
		}
		item.forEach((dataItem, dataIndex) => {
			twoMbarObj.data.push(dataItem[i])
		})
		twoMbarArr.push(twoMbarObj)
	})
	return twoMbarArr
}

export default option