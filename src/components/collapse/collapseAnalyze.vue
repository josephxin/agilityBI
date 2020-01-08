<template>
	<el-collapse class="collapse" v-model="activeNames" accordion>
		<el-collapse-item v-for="(item, index) in echartsList" :key="index" :name="index+1">
			<template slot="title">
				<p :title="item.title">{{item.title}}</p>
			</template>
			<div class="item">
				<analyze-template></analyze-template>
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
	import analyzeTemplate from '@/components/other/analyzeTemplate'

	export default {
		components: {
			analyzeTemplate
		},
		data() {
			return {
				activeNames: [1],
				active: 0,
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
			changeEcharts(id) {
				//console.log(id)
				this.active = id
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.collapse {
		.el-collapse-item__header {
			padding: 0 20px 1px;
		}
	}
	
	.theme-blue {
		.collapse {
			.item {
				margin: 10px 14px;
			}
		}
	}
	
	.theme-red {
		.collapse {
			.el-collapse-item__header {
				background: url(../../assets/imgs/red/bg_list_line.jpg) no-repeat left bottom;
				&.is-active {
					background: url(../../assets/imgs/red/bg_red_bar.jpg);
				}
			}
			.el-collapse-item__wrap {
				background-color: $bg-active-red;
			}
			.item {
				margin: 20px;
			}
		}
	}
	
	.theme-green {
		.collapse {
			.el-collapse-item__header {
				background: url(../../assets/imgs/green/bg_list_line.jpg) no-repeat left bottom;
				&.is-active {
					background: url(../../assets/imgs/green/bg_green_bar.jpg);
				}
			}
			.el-collapse-item__wrap {
				background-color: $bg-active-green;
			}
			.item {
				margin: 20px;
			}
		}
	}
</style>