const option = (OPT) => {
  if (OPT.type !== 'scatter') {
    console.error('数据类型错误')
    return
  }
  let scatterOption = {
    grid: {
      left: "3%",
      right: "3%",
      bottom: "2%",
      top: "10px",
      containLabel: true
    },
    xAxis: {
      axisLabel: {
        color: '#333'
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      axisLabel: {
        color: '#333'
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        symbolSize: 8,
        data: [
          [
            10.0, 3.04
          ],
          [
            8.0, 6.95
          ],
          [
            13.0, 7.58
          ],
          [
            9.0, 8.81
          ],
          [
            11.0, 8.33
          ],
          [
            14.0, 9.96
          ],
          [6.0, 7.24]
        ],
        type: "scatter",
        itemStyle: {
          emphasis: {
            color: "#f9b31d"
          }
        }
      }, {
        symbolSize: 8,
        data: [
          [
            4, 3.81
          ],
          [
            7, 4.33
          ],
          [
            9, 10.96
          ],
          [2, 7.24]
        ],
        type: "scatter",
        itemStyle: {
          emphasis: {
            color: "#f9b31d"
          }
        }
      }
    ]
  };
  return scatterOption
}

export default option