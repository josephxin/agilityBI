import 'echarts/map/js/china'
const option = (OPT) => {
  if (OPT.type !== 'chinaMap') {
    console.error('数据类型错误')
    return
  }
  let chinaMapOption = {
    title: {
      text: "",
      left: "center",
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "#303030"
    },
    dataRange: {
      show: false,
      x: "350px",
      y: "530px",
      splitList: [
        {
          start: 6,
          end: 6,
          label: "6级"
        }, {
          start: 5,
          end: 5,
          label: "5级"
        }, {
          start: 4,
          end: 4,
          label: "4级"
        }, {
          start: 3,
          end: 3,
          label: "3级"
        }, {
          start: 2,
          end: 2,
          label: "2级"
        }, {
          start: 1,
          end: 1,
          label: "1级"
        }
      ],
      textStyle: {
        color: "#fff"
      }
    },
    series: [
      {
        name: "商品举报数量",
        type: "map",
        mapType: "china",
        roam: false,
        itemStyle: {
          normal: {
            label: {
              show: false,
              textStyle: {
                color: "#fff"
              }
            }
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        showLegendSymbol: true,
        data: [
          {
            name: "北京",
            value: 3
          }, {
            name: "天津",
            value: 4
          }, {
            name: "上海",
            value: 1
          }, {
            name: "重庆",
            value: 3
          }, {
            name: "河北",
            value: 2
          }, {
            name: "河南",
            value: 1
          }, {
            name: "云南",
            value: 2
          }, {
            name: "辽宁",
            value: 2
          }, {
            name: "黑龙江",
            value: 1
          }, {
            name: "湖南",
            value: 1
          }, {
            name: "安徽",
            value: 1
          }, {
            name: "山东",
            value: 1
          }, {
            name: "新疆",
            value: 6
          }, {
            name: "江苏",
            value: 1
          }, {
            name: "浙江",
            value: 1
          }, {
            name: "江西",
            value: 2
          }, {
            name: "湖北",
            value: 1
          }, {
            name: "广西",
            value: 1
          }, {
            name: "甘肃",
            value: 2
          }, {
            name: "山西",
            value: 2
          }, {
            name: "内蒙古",
            value: 1
          }, {
            name: "陕西",
            value: 2
          }, {
            name: "吉林",
            value: 2
          }, {
            name: "福建",
            value: 2
          }, {
            name: "贵州",
            value: 1
          }, {
            name: "广东",
            value: 2
          }, {
            name: "青海",
            value: 3
          }, {
            name: "西藏",
            value: 1
          }, {
            name: "四川",
            value: 1
          }, {
            name: "宁夏",
            value: 1
          }, {
            name: "海南",
            value: 2
          }, {
            name: "台湾",
            value: 1
          }, {
            name: "香港",
            value: 1
          }, {
            name: "澳门",
            value: 2
          }, {
            name: "南海诸岛",
            value: 2
          }
        ]
      }
    ]
  };
  return chinaMapOption
}

export default option