var xAxisData = ['食品', '衣着', '居住', '家庭设备', '医疗保健'];
const option = (OPT) => {
  let data=[
    {
      seriesName:'2010',
      value:[350, 320, 250, 400, 300]
    },
    {
      seriesName:'2011',
      value:[350, 320, 250, 400, 300]
    },
    {
      seriesName:'2012',
      value:[350, 320, 250, 400, 300]
    },
    {
      seriesName:'2013',
      value:[350, 320, 250, 400, 300]
    }
  ]
  if (OPT.type !== 'bar') {
    console.error('数据类型错误')
    return
  }
  var barOption = {
    legend: {
      right: '4%',
      textStyle: {
        color: '#333'
      },
      itemWidth: 20,
      itemHeight: 5,
      data: ['2010', '2011', '2012', '2013']
    },
    // color:['#49d3f5','#ffd552','#ff902e','#90d96c','#24b282'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        // shadowStyle:{       color:'rgba(62,181,121,0.3)',   },
        z: 0
      },
      padding: 15
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      name: '',
      type: 'category',
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
      },
      data: xAxisData,
      splitLine: {
        show: true
      }
    },
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: "#333",
          formatter: function (value) {
            return value;
          }
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
      }
    ],
    series: [
      {
        name: "",
        type: 'bar',
        data: [350, 320, 250, 400, 300]
      }
    ]
  };
  return barOption
}

export default option