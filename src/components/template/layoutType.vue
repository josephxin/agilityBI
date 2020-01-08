<template>
	<div class="main-content" id="main-content" style="height: 867px;">
		<!--六个元素-左布局-->
		<div class="layout-left" v-if="layoutType=='six-left'">
			<div class="content-left">
				<div class="content-left-top">
					<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="six0"></each-chart>
				</div>
				<div class="content-left-bottom">
					<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="six1"></each-chart>
					<each-chart :idx="chartArr[2]" :chartType="echartsData[2].chartType" :options="echartsData[2]" key="six2"></each-chart>
				</div>
			</div>
			<div class="content-right">
				<div>
					<each-chart :idx="chartArr[3]" :chartType="echartsData[3].chartType" :options="echartsData[3]" key="six3"></each-chart>
				</div>
				<div>
					<each-chart :idx="chartArr[4]" :chartType="echartsData[4].chartType" :options="echartsData[4]" key="six4"></each-chart>
				</div>
				<div>
					<each-chart :idx="chartArr[5]" :chartType="echartsData[5].chartType" :options="echartsData[5]" key="six5"></each-chart>
				</div>
			</div>
		</div>

		<!--六个元素-右布局-->
		<div class="layout-left row-reverse" v-if="layoutType=='six-right'">
			<div class="content-left">
				<div class="content-left-top">
					<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="six0"></each-chart>
				</div>
				<div class="content-left-bottom">
					<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="six1"></each-chart>
					<each-chart :idx="chartArr[2]" :chartType="echartsData[2].chartType" :options="echartsData[2]" key="six2"></each-chart>
				</div>
			</div>
			<div class="content-right">
				<div>
					<each-chart :idx="chartArr[3]" :chartType="echartsData[3].chartType" :options="echartsData[3]" key="six3"></each-chart>
				</div>
				<div>
					<each-chart :idx="chartArr[4]" :chartType="echartsData[4].chartType" :options="echartsData[4]" key="six4"></each-chart>
				</div>
				<div>
					<each-chart :idx="chartArr[5]" :chartType="echartsData[5].chartType" :options="echartsData[5]" key="six5"></each-chart>
				</div>
			</div>
		</div>

		<!--五个元素-->
		<div class="layout-left layout-five" v-if="layoutType=='five'">
			<div class="content-five-left">
				<div>
					<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="five1"></each-chart>
				</div>
				<div>
					<each-chart :idx="chartArr[2]" :chartType="echartsData[2].chartType" :options="echartsData[2]" key="five2"></each-chart>
				</div>
			</div>
			<div class="content-five-center">
				<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="five0"></each-chart>
			</div>
			<div class="content-five-right">
				<div>
					<each-chart :idx="chartArr[3]" :chartType="echartsData[3].chartType" :options="echartsData[3]" key="five3"></each-chart>
				</div>
				<div>
					<each-chart :idx="chartArr[4]" :chartType="echartsData[4].chartType" :options="echartsData[4]" key="five4"></each-chart>
				</div>
			</div>
		</div>

		<!--四个元素-->
		<div class="layout-left layout-four" v-if="layoutType=='four'">
			<div class="layout-four__top">
				<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="four0"></each-chart>
				<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="four1"></each-chart>
			</div>
			<div class="layout-four__bottom">
				<each-chart :idx="chartArr[2]" :chartType="echartsData[2].chartType" :options="echartsData[2]" key="four2"></each-chart>
				<each-chart :idx="chartArr[3]" :chartType="echartsData[3].chartType" :options="echartsData[3]" key="four3"></each-chart>
			</div>
		</div>

		<!--三个元素-主图在左-->
		<div class="layout-left layout-three-left" v-if="layoutType=='three-left'">
			<div class="content-left">
				<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="three-left0"></each-chart>
			</div>
			<div class="content-right">
				<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="three-left1"></each-chart>
				<each-chart :idx="chartArr[2]" :chartType="echartsData[2].chartType" :options="echartsData[2]" key="three-left2"></each-chart>
			</div>
		</div>

		<!--三个元素-主图在右-->
		<div class="layout-left layout-three-left row-reverse" v-if="layoutType=='three-right'">
			<div class="content-left">
				<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="three-right0"></each-chart>
			</div>
			<div class="content-right">
				<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="three-right1"></each-chart>
				<each-chart :idx="chartArr[2]" :chartType="echartsData[2].chartType" :options="echartsData[2]" key="three-right2"></each-chart>
			</div>
		</div>

		<!--两个元素-上下排列-->
		<div class="layout-left layout-two-v" v-if="layoutType=='two-v'">
			<div>
				<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="two-v0"></each-chart>
			</div>
			<div>
				<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="two-v1"></each-chart>
			</div>
		</div>

		<!--两个元素-左右排列-->
		<div class="layout-left layout-two-h" v-if="layoutType=='two-h'">
			<div>
				<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="two-h0"></each-chart>
			</div>
			<div>
				<each-chart :idx="chartArr[1]" :chartType="echartsData[1].chartType" :options="echartsData[1]" key="two-h1"></each-chart>
			</div>
		</div>

		<!--一个元素-->
		<div class="layout-left layout-one" v-if="layoutType=='one'">
			<each-chart :idx="chartArr[0]" :chartType="echartsData[0].chartType" :options="echartsData[0]" key="one"></each-chart>
		</div>

		<!--图表设置——对话框-->
		<el-dialog title="图表设置" :visible.sync="dialogChartSet" class="dialogChartSet" :before-close="coverPersonnelNo">
			<div class="el-dialog-content clearfix">
				<div class="transition" :class="['chart-type'+(index +1), {'active': chartTypeActive == index, 'highlight': highlightArr.indexOf(index) != -1}]" v-for="(item, index) in switchTypeObj" :key="index" @click="clickDialogChart(index, $event,item.value)" :title="item.name"></div>
			</div>
			<div slot="footer" class="dialog-footer clearfix">
				<div class="fl" :class="{'is-disabled': isDisabled}">
					<div>
						<div class="check" v-show="flagMainMap"></div>
						<div class="check-not" v-show="!flagMainMap"></div>
						<input type="checkbox" name="mainMap" id="mainMap" :disabled="isDisabled" v-model="flagMainMap" />
					</div>
					<label for="mainMap">设为主图</label>
				</div>
				<button class="fr dialog-confirm" type="button" @click="chartSetConfirmFn">确 定</button>
			</div>
		</el-dialog>

		<!--图形工具-->
		<canvas-board></canvas-board>

	</div>
</template>

<script>
	import { mapState } from "vuex";
	import eachChart from '@/components/template/eachChart'
	import canvasBoard from '@/components/canvas/canvasBoard'
	//import { dataEcharts } from '@/json/common.js' // 获取本地模拟数据

	export default {
		components: {
			eachChart,
			canvasBoard,
		},
		props: {

		},
		data() {
			return {
				dialogChartSet: false,
				flagMainMap: false,
				chartTypeActive: -1,
				isDisabled: false,
				highlightArr: [],
				selectType: '',
				okSelectType:'',
				switchType: ['twoSbarY', 'twoSbar', 'twoSfunnel', 'twoSLine', 'twoSacreage', 'twoSpie', 'twoSpieRing', 'twoSareaPie', 'twoSradiusPie', 'twoSradarNood', 'twoSradarLine', 'twoMbarY', 'twoMbar', 'twoMClusterY', 'twoMCluster', 'twoSMcard', 'twoSScard', 'twoMStackAcreage', 'twoMradarLine', 'twoMradarNood', 'twoMacreage', 'twoMLine', 'twoMRiver'],
				switchTypeObj: [{
					'name':'横向柱状图',
					'value':'twoSbarY'
				},{
					'name':'竖向柱状图',
					'value':'twoSbar'
				},{
					'name':'漏斗图',
					'value':'twoSfunnel'
				},{
					'name':'折线图',
					'value':'twoSLine'
				},{
					'name':'普通面积图',
					'value':'twoSacreage'
				},{
					'name':'饼状图',
					'value':'twoSpie'
				},{
					'name':'环形图',
					'value':'twoSpieRing'
				},{
					'name':'定角南丁格尔图',
					'value':'twoSareaPie'
				},{
					'name':'不定角南丁格尔图',
					'value':'twoSradiusPie'
				},{
					'name':'面状雷达图',
					'value':'twoSradarNood'
				},{
					'name':'线状雷达图',
					'value':'twoSradarLine'
				},{
					'name':'横向堆积柱状图',
					'value':'twoMbarY'
				},{
					'name':'竖向堆积柱状图',
					'value':'twoMbar'
				},{
					'name':'横向簇状柱状图',
					'value':'twoMClusterY'
				},{
					'name':'竖向簇状柱状图',
					'value':'twoMCluster'
				},{
					'name':'多行卡片图',
					'value':'twoSMcard'
				},{
					'name':'标准卡片图',
					'value':'twoSScard'
				},{
					'name':'堆积面积图',
					'value':'twoMStackAcreage'
				},{
					'name':'多序列线状雷达图',
					'value':'twoMradarLine'
				},{
					'name':'多序列面状雷达图',
					'value':'twoMradarNood'
				},{
					'name':'多序列面积图',
					'value':'twoMacreage'
				},{
					'name':'多序列折线图',
					'value':'twoMLine'
				},{
					'name':'河流图',
					'value':'twoMRiver'
				},],

			}
		},
		/*
		 *瀑布图没有写
		 * 解释上面渲染的是什么图表   
		 * 2维单序列:	twoSbarY(横向柱状图) 6
		 * 				twoSbar(竖向柱状图) 7
		 * 				twoSfunnel(漏斗图)13
		 * 				twoSLine(折线图)14
		 * 				twoSacreage(普通面积图)15
		 * 				twoSpie(饼状图)19
		 * 				twoSpieRing(环形图)20
		 * 				twoSareaPie(定角南丁格尔图)21
		 * 				twoSradiusPie(不定角南丁格尔图)22
		 * 				twoSradarNood(面状雷达图)31
		 * 				twoSradarLine(线状雷达图)32
		 * 
		 * 2维多序列:	twoMbarY(横向堆积柱状图)	4	
		 * 				twoMbar(竖向堆积柱状图) 5
		 * 				twoMClusterY(横向簇状柱状图)10
		 * 				twoMCluster(竖向簇状柱状图)11
		 * 				twoSMcard(多行卡片图)29  //可能能够切换成柱状图
		 * 				twoSScard(标准卡片图)30 //暂时无图可以切换
		 * 				twoMStackAcreage(堆积面积图)
		 * 				twoMradarLine(线状雷达图)
		 * 				twoMradarNood(面状雷达图)
		 * 				twoMacreage 多序列面积图
		 * 				twoMLine 多序列折线图
		 * 				twoMRiver 河流图
		 * 				
		 * 				
		 * 
		 * 
		 * 				
		 * 
		 * 
		 * */
		computed: {
			...mapState(['layoutType', 'chartArr', 'currentChartIndex', 'echartsData']),
		},
		watch: {
			echartsData: {
				handler(val, olval) {
					//console.log("监听图表数组变化", val)
					this.showChart()
				},
				deep: true
			},
		},
		methods: {
			// 点击图表设置——对话框里面的图表
			clickDialogChart(index, e, item) {
				//console.log("点击图表设置——对话框里面的图表",index)
				if($(e.target).hasClass('highlight')) {
					this.chartTypeActive = index
					this.selectType = item
					//this.okSelectType = item
				}
			},
			coverPersonnelNo(){
				//点×关闭
				this.selectType = ""
				this.dialogChartSet = false
			},
			
			// 点击确定按钮 切换图表  切换成主图？
			chartSetConfirmFn() {
				this.dialogChartSet = false
				//this.selectType = this.okSelectType
				if(this.flagMainMap) { //是不是在切换陈主图的时候也要更换图表类型
					var mainChart = this.echartsData[0]
					var selectChart = this.echartsData[this.currentChartIndex]
					this.echartsData[0] = selectChart
					this.echartsData[this.currentChartIndex] = mainChart
					if(this.selectType != '') {
						this.echartsData[0].chartType = this.selectType
					}

				}
				if(this.selectType != "" && !this.flagMainMap) {
					this.echartsData[this.currentChartIndex].chartType = this.selectType
				}
			},
			showChart() {
				switch(this.echartsData.length) {
					case 1:
						this.$store.commit('changeTemplateActive', 8)
						this.$store.commit('changeLayoutType', 'one')
						this.$store.commit('changeChartArr', [0])
						break;
					case 2:
						this.$store.commit('changeTemplateActive', 6)
						this.$store.commit('changeLayoutType', 'two-v')
						this.$store.commit('changeChartArr', [0, 1])
						break;
					case 3:
						this.$store.commit('changeTemplateActive', 4)
						this.$store.commit('changeLayoutType', 'three-left')
						this.$store.commit('changeChartArr', [0, 1, 2])
						break;
					case 4:
						this.$store.commit('changeTemplateActive', 3)
						this.$store.commit('changeLayoutType', 'four')
						this.$store.commit('changeChartArr', [0, 1, 2, 3])
						break;
					case 5:
						this.$store.commit('changeTemplateActive', 2)
						this.$store.commit('changeLayoutType', 'five')
						this.$store.commit('changeChartArr', [0, 1, 2, 3, 4])
						break;
					case 6:
						this.$store.commit('changeTemplateActive', 0)
						this.$store.commit('changeLayoutType', 'six-left')
						this.$store.commit('changeChartArr', [0, 1, 2, 3, 4, 5])
						break;
					default:
						this.$store.commit('changeTemplateActive', -1) //左侧布局类型模板下标
						this.$store.commit('changeLayoutType', '')
						this.$store.commit('changeChartArr', [])
						break;
				}
			}
		},
		created() {
			// 以下代码必须写在created钩子函数中，否则跳页面回来之后报错echartsData
			this.showChart()
		},
		mounted() {
			// 获取本地模拟数据
			//this.$store.commit('changeEchartsData', dataEcharts)
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.main-content {
		position: relative;
		height: calc(100vh - 332px);
		min-height: 615px;
	}
	
	.layout-left {
		display: flex;
		height: 100%;
		.content-left {
			flex: 2;
			width: 0;
			display: flex;
			flex-direction: column;
			>div {
				margin-right: 10px;
			}
			.content-left-top {
				>div {
					position: relative;
					height: 568px;
				}
			}
			.content-left-bottom {
				margin-top: 30px;
				height: 269px;
				display: flex;
				>div {
					flex: 1;
					width: 0;
					margin-right: 30px;
					position: relative;
					&:last-of-type {
						margin-right: 0;
					}
				}
			}
		}
		.content-right {
			flex: 1;
			width: 0;
			display: flex;
			flex-direction: column;
			>div {
				margin-left: 20px;
				margin-bottom: 30px;
				flex: 1;
				height: 0;
				position: relative;
				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
	}
	
	.layout-one {
		>div {
			flex: 1;
			display: flex;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}
	
	.layout-two-v {
		flex-direction: column;
		>div {
			flex: 1;
			margin-bottom: 30px;
			&:last-of-type {
				margin-bottom: 0;
			}
		}
	}
	
	.layout-two-h {
		>div {
			flex: 1;
			margin-right: 30px;
			&:last-of-type {
				margin-right: 0;
			}
		}
	}
	
	.layout-three-left {
		>div {
			flex: 1;
			&.content-left {
				margin-right: 30px;
			}
			&.content-right {
				display: flex;
				flex-direction: column;
				>div {
					flex: 1;
					margin-bottom: 30px;
					&:last-of-type {
						margin-bottom: 0;
					}
				}
			}
		}
	}
	
	.row-reverse {
		flex-direction: row-reverse;
		>div {
			&.content-left {
				margin-right: 0;
			}
			&.content-right {
				margin-right: 30px;
			}
		}
	}
	
	.layout-four {
		flex-direction: column;
		>div {
			flex: 1;
			display: flex;
			margin-bottom: 30px;
			&:last-of-type {
				margin-bottom: 0;
			}
			>div {
				flex: 1;
				margin-right: 30px;
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
	}
	
	.layout-five {
		.content-five-left,
		.content-five-right {
			width: 0;
			flex: 1;
			display: flex;
			flex-direction: column;
			>div {
				flex: 1;
				height: 0;
				&:first-of-type {
					margin-bottom: 30px;
				}
			}
		}
		.content-five-center {
			flex: 2;
			width: 0;
			margin: 0 30px;
		}
	}
	
	//对话框
	.el-dialog-content {
		>div {
			&.chart-type1 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat 7px 7px;*/
				background: url(../../assets/imgs/common/twoSbarY.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type2 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -47px 7px;*/
				background: url(../../assets/imgs/common/twoSbar.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type3 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -101px 7px;*/
				background: url(../../assets/imgs/common/twoSfunnel.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type4 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -155px 7px;*/
				background: url(../../assets/imgs/common/twoSLine.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type5 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -209px 7px;*/
				background: url(../../assets/imgs/common/twoSacreage.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type6 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -263px 7px;*/
				background: url(../../assets/imgs/common/twoSpie.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type7 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat 7px -48px;*/
				background: url(../../assets/imgs/common/twoSpieRing.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type8 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -47px -48px;*/
				background: url(../../assets/imgs/common/twoSareaPie.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type9 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -101px -48px;*/
				background: url(../../assets/imgs/common/twoSradiusPie.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type10 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -155px -48px;*/
				background: url(../../assets/imgs/common/twoSradarNood.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type11 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -209px -48px;*/
				background: url(../../assets/imgs/common/twoSradarLine.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type12 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -263px -48px;*/
				background: url(../../assets/imgs/common/twoMbarY.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type13 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat 7px -103px;*/
				background: url(../../assets/imgs/common/twoMbar.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type14 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -47px -103px;*/
				background: url(../../assets/imgs/common/twoMClusterY.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type15 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -101px -103px;*/
				background: url(../../assets/imgs/common/twoMCluster.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type16 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -155px -103px;*/
				background: url(../../assets/imgs/common/twoSMcard.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type17 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -209px -103px;*/
				background: url(../../assets/imgs/common/twoSScard.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type18 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -263px -103px;*/
				background: url(../../assets/imgs/common/twoMStackAcreage.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type19 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat 7px -158px;*/
				background: url(../../assets/imgs/common/twoMradarLine.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type20 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -47px -158px;*/
				background: url(../../assets/imgs/common/twoMradarNood.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type21 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -101px -158px;*/
				background: url(../../assets/imgs/common/twoMacreage.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type22 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -155px -158px;*/
				background: url(../../assets/imgs/common/twoMLine.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type23 {
				/*background: url(../../assets/imgs/common/chart_type.png) no-repeat -209px -158px;*/
				background: url(../../assets/imgs/common/twoMRiver.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type24 {
				background: url(../../assets/imgs/common/chart_type.png) no-repeat -263px -158px;
			}
			&.chart-type25 {
				background: url(../../assets/imgs/common/chart_type.png) no-repeat 7px -213px;
			}
			&.chart-type26 {
				background: url(../../assets/imgs/common/chart_type.png) no-repeat -47px -213px;
			}
			&.chart-type27 {
				background: url(../../assets/imgs/common/chart_type.png) no-repeat -101px -213px;
			}
			&.chart-type28 {
				background: url(../../assets/imgs/common/chart_type.png) no-repeat -155px -213px;
			}
			&.chart-type29 {
				background: url(../../assets/imgs/common/chart_type.png) no-repeat -209px -213px;
			}
		}
	}
	
	//定版后删除
	.el-dialog-content {
		>div.highlight {
			&.chart-type1 {
				background: url(../../assets/imgs/red/twoSbarY-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type2 {
				background: url(../../assets/imgs/red/twoSbar-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type3 {
				background: url(../../assets/imgs/red/twoSfunnel-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type4 {
				background: url(../../assets/imgs/red/twoSLine-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type5 {
				background: url(../../assets/imgs/red/twoSacreage-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type6 {
				background: url(../../assets/imgs/red/twoSpie-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type7 {
				background: url(../../assets/imgs/red/twoSpieRing-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type8 {
				background: url(../../assets/imgs/red/twoSareaPie-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type9 {
				background: url(../../assets/imgs/red/twoSradiusPie-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type10 {
				background: url(../../assets/imgs/red/twoSradarNood-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type11 {
				background: url(../../assets/imgs/red/twoSradarLine-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type12 {
				background: url(../../assets/imgs/red/twoMbarY-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type13 {
				background: url(../../assets/imgs/red/twoMbar-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type14 {
				background: url(../../assets/imgs/red/twoMClusterY-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type15 {
				background: url(../../assets/imgs/red/twoMCluster-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type16 {
				background: url(../../assets/imgs/red/twoSMcard-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type17 {
				background: url(../../assets/imgs/red/twoSScard-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type18 {
				background: url(../../assets/imgs/red/twoMStackAcreage-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type19 {
				background: url(../../assets/imgs/red/twoMradarLine-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type20 {
				background: url(../../assets/imgs/red/twoMradarNood-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type21 {
				background: url(../../assets/imgs/red/twoMacreage-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type22 {
				background: url(../../assets/imgs/red/twoMLine-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type23 {
				background: url(../../assets/imgs/red/twoMRiver-red.png) no-repeat;
				background-size: 25px 25px;
				background-position: center;
			}
			&.chart-type24 {
				background: url(../../assets/imgs/red/chart_type.png) no-repeat -263px -158px;
			}
			&.chart-type25 {
				background: url(../../assets/imgs/red/chart_type.png) no-repeat 7px -213px;
			}
			&.chart-type26 {
				background: url(../../assets/imgs/red/chart_type.png) no-repeat -47px -213px;
			}
			&.chart-type27 {
				background: url(../../assets/imgs/red/chart_type.png) no-repeat -101px -213px;
			}
			&.chart-type28 {
				background: url(../../assets/imgs/red/chart_type.png) no-repeat -155px -213px;
			}
			&.chart-type29 {
				background: url(../../assets/imgs/red/chart_type.png) no-repeat -209px -213px;
			}
		}
	}
	
	//蓝色主题
	.theme-blue {
		.el-dialog-content {
			>div {
				&:hover,
				&.active {
					border-color: $configure-list-3;
				}
			}
		}
		/*.el-dialog-content {
			>div.highlight {
				&.chart-type1 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat 7px 7px;
				}
				&.chart-type2 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -47px 7px;
				}
				&.chart-type3 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -101px 7px;
				}
				&.chart-type4 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -155px 7px;
				}
				&.chart-type5 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -209px 7px;
				}
				&.chart-type6 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -263px 7px;
				}
				&.chart-type7 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat 7px -48px;
				}
				&.chart-type8 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -47px -48px;
				}
				&.chart-type9 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -101px -48px;
				}
				&.chart-type10 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -155px -48px;
				}
				&.chart-type11 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -209px -48px;
				}
				&.chart-type12 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -263px -48px;
				}
				&.chart-type13 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat 7px -103px;
				}
				&.chart-type14 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -47px -103px;
				}
				&.chart-type15 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -101px -103px;
				}
				&.chart-type16 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -155px -103px;
				}
				&.chart-type17 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -209px -103px;
				}
				&.chart-type18 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -263px -103px;
				}
				&.chart-type19 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat 7px -158px;
				}
				&.chart-type20 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -47px -158px;
				}
				&.chart-type21 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -101px -158px;
				}
				&.chart-type22 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -155px -158px;
				}
				&.chart-type23 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -209px -158px;
				}
				&.chart-type24 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -263px -158px;
				}
				&.chart-type25 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat 7px -213px;
				}
				&.chart-type26 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -47px -213px;
				}
				&.chart-type27 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -101px -213px;
				}
				&.chart-type28 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -155px -213px;
				}
				&.chart-type29 {
					background: url(../../assets/imgs/blue/chart_type.png) no-repeat -209px -213px;
				}
			}
		}*/
		.check {
			background: url(../../assets/imgs/blue/check.png) no-repeat;
		}
		.check-not {
			background: url(../../assets/imgs/blue/check_not.png) no-repeat;
		}
	}
	
	//红色主题
	.theme-red {
		.el-dialog-content {
			>div {
				&:hover,
				&.active {
					border-color: $configure-list-red-3;
				}
			}
		}
		/*.el-dialog-content {
			>div.highlight {
				&.chart-type1 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat 7px 7px;
				}
				&.chart-type2 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -47px 7px;
				}
				&.chart-type3 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -101px 7px;
				}
				&.chart-type4 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -155px 7px;
				}
				&.chart-type5 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -209px 7px;
				}
				&.chart-type6 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -263px 7px;
				}
				&.chart-type7 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat 7px -48px;
				}
				&.chart-type8 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -47px -48px;
				}
				&.chart-type9 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -101px -48px;
				}
				&.chart-type10 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -155px -48px;
				}
				&.chart-type11 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -209px -48px;
				}
				&.chart-type12 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -263px -48px;
				}
				&.chart-type13 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat 7px -103px;
				}
				&.chart-type14 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -47px -103px;
				}
				&.chart-type15 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -101px -103px;
				}
				&.chart-type16 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -155px -103px;
				}
				&.chart-type17 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -209px -103px;
				}
				&.chart-type18 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -263px -103px;
				}
				&.chart-type19 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat 7px -158px;
				}
				&.chart-type20 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -47px -158px;
				}
				&.chart-type21 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -101px -158px;
				}
				&.chart-type22 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -155px -158px;
				}
				&.chart-type23 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -209px -158px;
				}
				&.chart-type24 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -263px -158px;
				}
				&.chart-type25 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat 7px -213px;
				}
				&.chart-type26 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -47px -213px;
				}
				&.chart-type27 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -101px -213px;
				}
				&.chart-type28 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -155px -213px;
				}
				&.chart-type29 {
					background: url(../../assets/imgs/red/chart_type.png) no-repeat -209px -213px;
				}
			}
		}*/
		.check {
			background: url(../../assets/imgs/red/check.png) no-repeat;
		}
		.check-not {
			background: url(../../assets/imgs/red/check_not.png) no-repeat;
		}
	}
	
	//绿色主题
	.theme-green {
		.el-dialog-content {
			>div {
				&:hover,
				&.active {
					border-color: $configure-list-green-3;
				}
			}
		}
		/*.el-dialog-content {
			>div.highlight {
				&.chart-type1 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat 7px 7px;
				}
				&.chart-type2 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -47px 7px;
				}
				&.chart-type3 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -101px 7px;
				}
				&.chart-type4 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -155px 7px;
				}
				&.chart-type5 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -209px 7px;
				}
				&.chart-type6 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -263px 7px;
				}
				&.chart-type7 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat 7px -48px;
				}
				&.chart-type8 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -47px -48px;
				}
				&.chart-type9 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -101px -48px;
				}
				&.chart-type10 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -155px -48px;
				}
				&.chart-type11 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -209px -48px;
				}
				&.chart-type12 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -263px -48px;
				}
				&.chart-type13 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat 7px -103px;
				}
				&.chart-type14 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -47px -103px;
				}
				&.chart-type15 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -101px -103px;
				}
				&.chart-type16 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -155px -103px;
				}
				&.chart-type17 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -209px -103px;
				}
				&.chart-type18 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -263px -103px;
				}
				&.chart-type19 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat 7px -158px;
				}
				&.chart-type20 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -47px -158px;
				}
				&.chart-type21 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -101px -158px;
				}
				&.chart-type22 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -155px -158px;
				}
				&.chart-type23 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -209px -158px;
				}
				&.chart-type24 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -263px -158px;
				}
				&.chart-type25 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat 7px -213px;
				}
				&.chart-type26 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -47px -213px;
				}
				&.chart-type27 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -101px -213px;
				}
				&.chart-type28 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -155px -213px;
				}
				&.chart-type29 {
					background: url(../../assets/imgs/green/chart_type.png) no-repeat -209px -213px;
				}
			}
		}*/
		.check {
			background: url(../../assets/imgs/green/check.png) no-repeat;
		}
		.check-not {
			background: url(../../assets/imgs/green/check_not.png) no-repeat;
		}
	}
	
	// 对话框-图表设置
	.dialogChartSet {
		.el-dialog-content {
			padding: 14px 24px 5px 25px;
			background-color: #f8f8f8;
			border-radius: 3px;
			>div {
				box-sizing: border-box;
				float: left;
				margin-right: 8px;
				margin-bottom: 9px;
				width: 46px;
				height: 46px;
				border: 4px solid transparent;
				border-radius: 3px;
				cursor: not-allowed;
				&.highlight {
					cursor: pointer;
				}
				&:nth-of-type(6n) {
					margin-right: 0;
				}
			}
		}
		.dialog-footer {
			height: 32px;
			>.fl {
				&.is-disabled {
					input,
					label {
						cursor: not-allowed;
						color: #c0c4cc;
					}
				}
				>div {
					float: left;
					margin-top: 10px;
					position: relative;
					width: 14px;
					height: 14px;
					div {
						height: 100%;
					}
					input {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
						cursor: pointer;
					}
				}
				>label {
					float: left;
					padding-left: 10px;
					line-height: 32px;
					font-size: 14px;
					color: #303030;
					cursor: pointer;
				}
			}
		}
	}
</style>