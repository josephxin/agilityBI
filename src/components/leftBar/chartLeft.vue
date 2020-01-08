<template>
	<div class="chart-left">
		<happy-scroll>
			<div class="chart-title">
				<i class="iconfont icon-moban"></i>
				<p>模&nbsp;&nbsp;板</p>
			</div>
			<template-type></template-type>
		</happy-scroll>
	</div>
</template>

<script>
	import templateType from '@/components/other/templateType'
	
	export default {
		components: {
			templateType
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		watch: {
			
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.chart-left {
		height: 100%;
		.chart-title {
			box-sizing: border-box;
			padding-top: 12px;
			height: 102px;
			text-align: center;
			i {
				font-size: 32px;
				color: white;
			}
			p {
				color: white;
				font-size: 14px;
			}
		}
	}
	
	.theme-blue {
		.chart-left {
			box-sizing: border-box;
			padding: 6px;
			.chart-title {
				background: url(../../assets/imgs/blue/bg_term.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	
	.theme-red {
		.chart-left {
			.chart-title {
				background: url(../../assets/imgs/bg_red.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	
	.theme-green {
		.chart-left {
			.chart-title {
				background: url(../../assets/imgs/bg_green.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>