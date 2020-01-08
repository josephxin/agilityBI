<template>
	<el-collapse class="collapse" v-model="activeNames" @change="handleChange">
		<el-collapse-item v-for="(item, index) in echartsList" :key="index" :name="index+1">
			<template slot="title">
				<p :title="item.title">{{item.title}}</p>
			</template>
			<div class="item">
				<div class="chart-container">
					<img :src="item.src" />
				</div>
				<div class="replace-charts">
					<button class="replace-btn" @click="changeEcharts()">更换图表</button>
				</div>
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
	export default {
		components: {

		},
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
		computed: {

		},
		watch: {

		},
		methods: {
			handleChange(val) {
				//console.log(val, typeof val);
			},
			changeEcharts() {

			},
			getEchartsData(params, name) {
				//console.log(params, name);
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.theme-blue{
		.collapse{
			.item {
				margin: 10px 14px;
			}
		}
	}
	.theme-red {
		.collapse{
			.el-collapse-item__header {
				background: url(../../assets/imgs/red/bg_list_line.jpg) no-repeat left bottom;
				&.is-active{
					background: url(../../assets/imgs/red/bg_red_bar.jpg);
				}
			}
			.el-collapse-item__wrap{
				background-color: #c7402e;
			}
			.item {
				margin: 20px 14px;
			}
		}
	}
	.theme-green{
		.collapse{
			.el-collapse-item__header {
				background: url(../../assets/imgs/green/bg_list_line.jpg) no-repeat left bottom;
				&.is-active{
					background: url(../../assets/imgs/green/bg_green_bar.jpg);
				}
			}
			.el-collapse-item__wrap{
				background-color: #176636;
			}
			.item {
				margin: 20px 14px;
			}
		}
	}
	.collapse {
		.el-collapse-item__header {
			padding: 0 14px 1px;
		}
		.item {
			position: relative;
			height: 136px;
			background-color: white;
			border-radius: 9px;
			overflow: hidden;
			&:hover {
				.replace-charts {
					display: block;
				}
			}
			.chart-container {
				width: 100%;
				height: 100%;
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
					background-color: #1b57a2;
					color: white;
					font-size: 12px;
					cursor: pointer;
				}
			}
		}
	}
</style>