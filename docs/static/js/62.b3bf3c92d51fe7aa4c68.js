webpackJsonp([62],{"3N5W":function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function(a){if("bar"===a.type)return{legend:{right:"4%",textStyle:{color:"#333"},itemWidth:20,itemHeight:5,data:[]},tooltip:{trigger:"axis",axisPointer:{type:"shadow",z:0},padding:15},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{name:"x"==a.data.shape?a.data.xAxisName:a.data.yAxisName,type:"x"==a.data.shape?"category":"value",axisLabel:{color:"#333",formatter:function(a){return a.substring(0,6)}},axisTick:{show:!1},axisLine:{show:!0,lineStyle:{color:"#9f9f9f"}},data:"x"==a.data.shape?a.data.xAxis:"",splitLine:{show:!0}},yAxis:[{type:"x"==a.data.shape?"value":"category",name:"x"==a.data.shape?a.data.yAxisName:a.data.xAxisName,inverse:"x"!=a.data.shape,axisLabel:{color:"#333",formatter:function(a){return a.substring(0,6)}},axisTick:{show:!1},axisLine:{show:!0,lineStyle:{color:"#9f9f9f"}},data:"x"==a.data.shape?"":a.data.xAxis}],series:[{name:a.data.series.name,type:"bar",barMaxWidth:60,data:a.data.series.data}]};console.error("数据类型错误")}}});