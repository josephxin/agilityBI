const option = (OPT) => {
	//console.log(OPT)
  if (OPT.type !== 'basicRadar') {
    console.error('数据类型错误')
    return
  }
  let basicRadarOption = {
    tooltip: {},
    legend: {
        data: OPT.data.dataName,
        type: 'scroll',  
        bottom: 10,
        left:10,
        right:10
    },
    radar: [
      {
        indicator: OPT.data.indicator,
      }
    ],
    series: [
      {
      	name: OPT.data.name,
        type: "radar",
        data: OPT.data.data
      }
    ]
  };
  return basicRadarOption
}

export default option
