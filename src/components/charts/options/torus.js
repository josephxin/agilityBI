const option = (OPT) => {
  if (OPT.type !== 'torus') {
    console.error('数据类型错误')
    return
  }
  let torusOption = {
    legend: {
      data: [
        "股票资产", "债权资产", "其他"
      ],
      top: "center",
      right: "2%",
      orient: "vertical",
      itemWidth: 10,
      itemHeight: 5,
      textStyle: {
        color: "#000"
      }
    },
    tooltip: {
      show: true,
      trigger: "item"
    },
    series: [
      {
        type: "pie",
        radius: [ "45%", "60%"],
        clockwise: true,
        data: [
          {
            value: 65,
            name: "股票资产",
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: "",
                textStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#23bd68"
                }
              }
            }
          }, {
            value: 45,
            name: "债权资产",
            tooltip: {
              show: true
            },
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: "32%",
                textStyle: {
                  fontSize: 40,
                  lineHeight: 28,
                  fontWeight: "bold",
                  color: "#ff8400"
                }
              }
            }
          }, {
            value: 12,
            name: "其他",
            tooltip: {
              show: true
            },
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: "增长收益",
                textStyle: {
                  fontSize: 14,
                  color: "#666"
                }
              }
            }
          }
        ]
      }
    ]
  };
  return torusOption
}

export default option