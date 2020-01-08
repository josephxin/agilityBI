const option = (OPT) => {
	//console.log(OPT);
  if (OPT.type !== 'barYCategory') {
    console.error('数据类型错误')
    return
  }
  let barYCategoryOption = {
    grid: {
      left: "5%",
      right: "5%",
      top: "5%",
      bottom: "3%",
      containLabel: true
    },
   tooltip: {
     trigger: 'axis',
     axisPointer: { // 坐标轴指示器，坐标轴触发有效
       type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
     }
   },
    xAxis: {
      show: true,
      type: "value",
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
      }
    },
    yAxis: {
      show: true,
      type: "category",
      inverse: true, //是否反向坐标轴
      data: OPT.data.xAxis,
      nameTextStyle: {
        color: "#505050"
      },
      splitLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#333"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#9f9f9f"
        }
      }
    },
    series: [
      {
        name: OPT.data.yAxisName,
        type: "bar",
        barWidth: 5,
        itemStyle: {
          normal: {
            color: function (params) {
              let colors = OPT.color
              return colors[params.dataIndex]
            }
          }
        },
        silent: true,
        data: OPT.data.series.data
      }
    ]
  };
  return barYCategoryOption
}

export default option