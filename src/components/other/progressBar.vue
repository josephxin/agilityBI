<template>
	<div class="re_begin">
		<div class="re_percent">
			<span>{{progress}}</span>
			<i class="iconfont icon-baifenbi "></i>
		</div>
		<span class="re_begin_plan">{{moduleName}}</span>
		<div class="progress_my">
			<div class="progress_my_bar">
				<div class="pmb_backgfound transition" :style="{'width':progress + '%'}"></div>
			</div>
		</div>
		<button class="begin_cancel el-btn cancel" @click="btn_cancel">取消</button>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props: {
			moduleName: {
				type: String
			},
			progress: {
				type: [String, Number]
			}
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
			// 取消按钮
			btn_cancel() {
				this.$emit("cancel-event");
			},
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.re_begin {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 123px;
		position: relative;
	}
	
	.re_percent {
		user-select: none;
		>span {
			font-size: 68px;
		}
		>i {
			font-size: 24px;
			font-weight: 700;
		}
	}
	
	.re_begin_plan {
		margin-bottom: 50px;
		user-select: none;
	}
	
	.begin_cancel {
		margin-top: 100px;
	}
	
	.progress_my {
		width: 690px;
		height: 15px;
		border-radius: 10px;
		padding: 3px 5px;
		box-sizing: border-box;
		.progress_my_bar {
			height: 7px;
			border-radius: 7px;
			overflow: hidden;
			background-size: 22px 22px;
			background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent));
			background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
			background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
			background-image: linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
		}
		.pmb_backgfound {
			height: 100%;
			border-radius: 7px;
		}
	}
	
	.theme-blue {
		.re_percent {
			>span {
				color: $configure-list;
			}
			>i {
				color: $configure-list;
			}
		}
		.re_begin_plan {
			color: $configure-list;
		}
		.progress_my {
			border: 1px solid $configure-list-2;
			background: $configure-list-1;
			.progress_my_bar {
				background-color: $configure-list-5;
			}
			.pmb_backgfound {
				background: $configure-list;
			}
		}
	}
	.theme-red {
		.re_percent {
			>span {
				color: $configure-list-red;
			}
			>i {
				color: $configure-list-red;
			}
		}
		.re_begin_plan {
			color: $configure-list-red;
		}
		.progress_my {
			border: 1px solid #fceceb;
			background: #fdf6f5;
			.progress_my_bar {
				background-color: #f4c7b9;
			}
			.pmb_backgfound {
				background: #ef5534;
			}
		}
	}
	
	.theme-green {
		.re_percent {
			>span {
				color: $configure-list-green;
			}
			>i {
				color: $configure-list-green;
			}
		}
		.re_begin_plan {
			color: $configure-list-green;
		}
		.progress_my {
			border: 1px solid $configure-list-green-2;
			background: $configure-list-green-1;
			.progress_my_bar {
				background-color: $configure-list-green-5;
			}
			.pmb_backgfound {
				background: $configure-list-green;
			}
		}
	}
</style>