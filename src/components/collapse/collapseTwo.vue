<template>
	<el-collapse v-model="activeNames" @change="handleChange">
		<el-collapse-item v-for="(item, index) in echartsList" :key="index" :name="index+1">
			<template slot="title">
				<p :title="item.title">{{item.title}}</p>
			</template>
			<div class="item" v-for="(obj, i) in item.data" :key="i">
				<div class="chart-container">
					<img :src="'static/imgs/'+obj.img+'.jpg'" />
				</div>
				<div class="replace-charts">
					<button class="replace-btn" @click="changeEcharts(obj.option)">更换图表</button>
				</div>
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
	export default {
		data() {
			return {
				activeNames: [1],
			}
		},
		props: {
			echartsList: {
				type: Array
			}
		},
		components: {

		},
		computed: {

		},
		watch: {

		},
		methods: {
			handleChange(val) {
				//console.log(val, typeof val);
			},
			changeEcharts(obj) {
				//console.log(obj);
				//this.$store.commit('changeEcharts', obj)
			},
			getEchartsData(params, name) {
				//console.log(params, name);
			}
		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.item {
		position: relative;
		margin-bottom: 20px;
		height: 136px;
		border-radius: 9px;
		overflow: hidden;
		&:last-of-type {
			margin-bottom: 0;
		}
		&:hover {
			.replace-charts {
				display: block;
			}
		}
		.chart-container {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border: 8px solid rgba(255, 255, 255, .4);
			>img {
				width: 100%;
				height: 100%;
			}
		}
		.replace-charts {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(255, 255, 255, .8);
			text-align: center;
			.replace-btn {
				margin-top: 61px;
				height: 24px;
				line-height: 24px;
				padding-left: 33px;
				padding-right: 11px;
				border-radius: 12px;
				background: url(../../assets/imgs/blue/replace_chart.png) no-repeat 12px;
				color: white;
				font-size: 12px;
				cursor: pointer;
			}
		}
	}
	
	.theme-blue {
		.item {
			.chart-container {
				border: 8px solid white;
			}
			.replace-charts {
				.replace-btn {
					background-color: #1b57a2;
				}
			}
		}
	}
	.theme-red {
		.item {
			.replace-charts {
				.replace-btn {
					border: 1px solid #7b7b7b;
					background-color: #9e9e9e;
				}
			}
		}
	}
	.theme-green {
		.item {
			.replace-charts {
				.replace-btn {
					border: 1px solid #1e7541;
					background-color: #3fa46c;
				}
			}
		}
	}
</style>