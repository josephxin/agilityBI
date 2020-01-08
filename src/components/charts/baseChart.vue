<template>
  <div ref="chart" style="height:100%; width:100%">

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    chartType: {
      type: String
    },
    windowSize: {
      type: Number
    },
    resize: {
    	type: Boolean
    },
    deleteResize: {
    	type: Boolean
    },
    time: {
      type: Number,
      default: 0
    },
    initTime: {
      type: Number,
      default: 0
    },
    options:{
    	type:Object
    }
  },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapState(["themeColor", "flagHeight", "chartTime"])
  },
  watch: {
    themeColor: {
      handler: function(val, oldVal) {
        this.myChart && this.myChart.dispose();
        this.initChart(1);
      }
    },
    chartType: {
      handler: function(val, oldVal) {
      	this.myChart && this.myChart.dispose();
        this.initChart(1);
      }
    },
    options:{
    	handler: function(val, oldVal) {
    		//console.log(val)
    		//setTimeout(() => {
		      this.myChart && this.myChart.dispose();
        	this.initChart(1);
		    //}, this.chartTime);
      }
    },
    windowSize: {
      handler: function(val, oldVal) {
		    this.myChart && this.resizeChart();
		    // 解决打开控制台时图表不重新计算大小的问题	
		    this.myChart.resize();
      }
    },
    resize: {
      handler: function(val, oldVal) {
      	//console.log('resize', val, oldVal, this.myChart)
        this.myChart && this.resizeChart();
      }
    },
    deleteResize: {
      handler: function(val, oldVal) {
        this.myChart && this.resizeChart();
      }
    },
    flagHeight: {
      handler: function(val, oldVal) {
        this.myChart && this.resizeChart();
      }
    }
  },
  methods: {
    initChart(num) {
    	//console.log(this.$refs.chart)
    	if(!this.$refs.chart){
    		return;
    	}
    	this.myChart = this.$echarts.init(this.$refs.chart, this.themeColor);
    	//console.log(this.myChart, num)
      let _this = this;
      let colors = {
        red: ["#ffcc55", "#eb5541", "#fe954f", "#cdcfd3"],
        green: ["#ffcc55", "#279e58", "#81d570", "#cdcfd3"],
        blue: ["#ffcc55", "#2790e0", "#3caff9", "#cdcfd3"]
      };
      let radarColors = {
        red: ["rgba(221,80,61,.8)", "rgba(221,80,61,.5)"],
        blue: ["rgba(82,176,252,.8)", "rgba(82,176,252,.5)"],
        green: ["rgba(80,175,84,.8)", "rgba(80,175,84,.5)"]
      };
      let opt = {
        data:_this.options,
        type: _this.chartType,
        color: colors[_this.themeColor],
        radarColor: radarColors[_this.themeColor]
      };
      import(`./options/${_this.chartType}`)
        .then(_ => {
        	//console.log(_)
          let option = _.default(opt);
          //console.log(option)
          this.myChart.setOption(option, true);
          this.myChart.on("click", params => {
            this.$emit("handleCharts", params, params.name);
          });
        })
        .catch(e => console.log(e));
    },
    resizeChart(delayTime = 300) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.myChart.resize();
      }, delayTime);
    }
  },
  mounted() {
  	//console.log(this.chartTime)
    setTimeout(() => {
      this.initChart();
    }, this.chartTime);
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>