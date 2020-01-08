/**
 * Created by 九次方前端研发部-郭惠敏<ghm@jusfoun.com> on 2018/6/13.
 */
const option = (OPT) => {
  if (OPT.type !== 'hotWord') {
    console.error('数据类型错误')
    return
  }
  var data = [
    {
      "name": "美的格力开打专利战",
      "value": 500
    }, {
      "name": "法律纠纷",
      "value": 100
    }, {
      "name": "监管",
      "value": 100
    }, {
      "name": "内幕",
      "value": 50
    }, {
      "name": "发放高温补贴",
      "value": 200
    }, {
      "name": "格兰仕",
      "value": 300
    }, {
      "name": "格力开打专利战",
      "value": 500
    }, {
      "name": "纠纷",
      "value": 100
    }, {
      "name": "管",
      "value": 100
    }, {
      "name": "幕",
      "value": 50
    }, {
      "name": "高温补贴",
      "value": 200
    }, {
      "name": "兰仕",
      "value": 300
    }
  ];
  function chart01(data) {
    //初始化政府渠道民意热点关键词
    var itemData = [],
      arry = [],
      totalNum = 0;
    data.forEach(function (itm) {
      arry.push(itm.value);
      totalNum += parseInt(itm.value);
    });
    arry.sort(function (a, b) {
      return b - a
    }); //降序排列数组
    data.forEach(function (item, idx) {
      itemData.push({
        value: item.value,
        name: item.name,
        itemStyle: {
          normal: {
            borderColor: OPT.color[idx % 5],
            borderWidth: 1,
            color: OPT.color[idx % 5]
          }
        }
      });
    });
    var myChart = createBubble({id: 'chart01', maxVal: arry[0], data: itemData, totalNum: totalNum});
    return myChart;
  }
  function createBubble(param) {
    let option = {
      tooltip: {
        show: true
      },
      grid: {
        // left: '5px', top:'5px', right: '5px', bottom: '5px'
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          symbol: 'rRect',
          force: {
            repulsion: 120
          },
          symbolSize: function (val) {
            var width = (80 + val * 60 / param.maxVal * 0.9);
            var height = (40 + val * 30 / param.maxVal * 0.9);
            return [width, height];
          },
          roam: true,
          animation: true,
          draggable: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              color: '#fff',
              formatter: function (bdItem) {
                var pt = (100 * bdItem.value / param.totalNum).toFixed(1);
                return bdItem.name;
              }
            }
          },
          data: param.data
        }
      ]
    };
    return option;
  }
  return chart01(data);
}

export default option
