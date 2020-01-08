<template>
	<div class="classify">
		<div class="ify_left">
			<data-association-left v-for="(item,index) in arr" :key="index" :list="item"></data-association-left>
		</div>
		<div class="ify_right">
			<listligature></listligature>
		</div>
	</div>
</template>

<script>
	import dataAssociationLeft from "@/components/leftBar/dataAssociationLeft"
	import listligature from "@/components/list/listligature"

	export default {
		components: {
			dataAssociationLeft,
			listligature
		},
		data() {
			return {
				list: [{
					id: 1221,
					name: "企业信息1",
					childer: [{
						id: 99,
						name: "企业名称"
					}, {
						id: 110,
						name: "企业ID"
					}, {
						id: 120,
						name: "企业名称"
					}, {
						id: 130,
						name: "企业地址"
					}]
				}, {
					id: 1231,
					name: "企业信息1",
					childer: [{
						id: 99,
						name: "企业名称"
					}, {
						id: 110,
						name: "企业ID"
					}, {
						id: 120,
						name: "企业名称"
					}, {
						id: 130,
						name: "企业地址"
					}]
				}, {
					id: 1241,
					name: "企业信息1",
					childer: [{
						id: 99,
						name: "企业名称"
					}, {
						id: 110,
						name: "企业ID"
					}, {
						id: 120,
						name: "企业名称"
					}, {
						id: 130,
						name: "企业地址"
					}]
				}, {
					id: 121,
					name: "企业信息1",
					childer: [{
						id: 99,
						name: "企业名称"
					}, {
						id: 110,
						name: "企业ID"
					}, {
						id: 120,
						name: "企业名称"
					}, {
						id: 130,
						name: "企业地址"
					}]
				}, {
					id: 11,
					name: "企业信息1",
					childer: [{
						id: 99,
						name: "企业名称"
					}, {
						id: 110,
						name: "企业ID"
					}, {
						id: 120,
						name: "企业名称"
					}, {
						id: 130,
						name: "企业地址"
					}]
				}, {
					id: 12,
					name: "投资情况1",
					childer: [{
						id: 140,
						name: "投资方名称",
					}, {
						id: 150,
						name: "被投资方名称"
					}, {
						id: 160,
						name: "经营状况"
					}, {
						id: 170,
						name: "年利润"
					}]
				}],
				arr: [{
						id: 10001,
						name: "商品类",
						list: [{
							id: 1,
							name: "企业信息1",
							childer: [{
								id: 10,
								name: "企业名称"
							}, {
								id: 11,
								name: "企业ID"
							}, {
								id: 12,
								name: "企业名称"
							}, {
								id: 13,
								name: "企业地址"
							}]
						}, {
							id: 2,
							name: "投资情况1",
							childer: [{
								id: 14,
								name: "投资方名称",
							}, {
								id: 15,
								name: "被投资方名称"
							}, {
								id: 16,
								name: "经营状况"
							}, {
								id: 17,
								name: "年利润"
							}]
						}, {
							id: 3,
							name: "投资情况2",
							childer: [{
								id: 18,
								name: "投资方名称",
							}, {
								id: 19,
								name: "被投资方名称"
							}, {
								id: 20,
								name: "经营状况"
							}, {
								id: 21,
								name: "年利润"
							}]
						}, {
							id: 4,
							name: "投资情况3",
							childer: [{
								id: 22,
								name: "投资方名称",
							}, {
								id: 23,
								name: "被投资方名称"
							}, {
								id: 24,
								name: "经营状况"
							}, {
								id: 25,
								name: "年利润"
							}]
						}]
					},
					{
						id: 10002,
						name: "工商类",
						list: [{
							id: 5,
							name: "企业信息2",
							childer: [{
								id: 26,
								name: "企业名称"
							}, {
								id: 27,
								name: "企业ID"
							}, {
								id: 28,
								name: "企业名称"
							}, {
								id: 29,
								name: "企业地址"
							}]
						}, {
							id: 6,
							name: "投资情况4",
							childer: [{
								id: 30,
								name: "投资方名称",
							}, {
								id: 31,
								name: "被投资方名称"
							}, {
								id: 32,
								name: "经营状况"
							}, {
								id: 33,
								name: "年利润"
							}]
						}, {
							id: 7,
							name: "投资情况5",
							childer: [{
								id: 34,
								name: "投资方名称",
							}, {
								id: 35,
								name: "被投资方名称"
							}, {
								id: 36,
								name: "经营状况"
							}, {
								id: 37,
								name: "年利润"
							}]
						}, {
							id: 8,
							name: "投资情况6",
							childer: [{
								id: 38,
								name: "投资方名称",
							}, {
								id: 39,
								name: "被投资方名称"
							}, {
								id: 40,
								name: "经营状况"
							}, {
								id: 41,
								name: "年利润"
							}]
						}]
					}
				],
				add: {
					name: "工商类",
					list: [{
						id: 54,
						name: "企业信息32",
						childer: [{
							id: 226,
							name: "企业名称"
						}, {
							id: 247,
							name: "企业ID"
						}, {
							id: 285,
							name: "企业名称"
						}, {
							id: 269,
							name: "企业地址"
						}]
					}, {
						id: 26,
						name: "投资情况34",
						childer: [{
							id: 303,
							name: "投资方名称",
						}, {
							id: 341,
							name: "被投资方名称"
						}, {
							id: 325,
							name: "经营状况"
						}, {
							id: 363,
							name: "年利润"
						}]
					}, {
						id: 71,
						name: "投资情况53",
						childer: [{
							id: 3474,
							name: "投资方名称",
						}, {
							id: 357,
							name: "被投资方名称"
						}, {
							id: 376,
							name: "经营状况"
						}, {
							id: 637,
							name: "年利润"
						}]
					}, {
						id: 58,
						name: "投资情况64",
						childer: [{
							id: 338,
							name: "投资方名称",
						}, {
							id: 394,
							name: "被投资方名称"
						}, {
							id: 450,
							name: "经营状况"
						}, {
							id: 461,
							name: "年利润"
						}]
					}]
				},
				activeIndex: 0,
				transLate: 0,
				mark: 0,
				id: 100003, //测试增加时所用的id
			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			btn_add() {
				//保存按钮

			}
		},
		created() {

		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.classify {
		padding: 20px 50px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	
	.ify_left {
		width: 669px;
		border-radius: 20px;
		margin-right: 25px;
		background: #FFF;
		overflow-y: auto;
		height: calc(100vh - 230px);
	}
	
	.ify_right {
		flex: 1;
		border-radius: 20px;
		background: #FFF;
		overflow-y: auto;
		height: calc(100vh - 230px);
		span {
			color: #999999;
		}
		.ify_right_explain {
			position: relative;
			height: 75px;
			line-height: 75px;
			text-indent: 41px;
			.ire_btn {
				position: absolute;
				right: 46px;
				top: 0;
				button {
					width: 100px;
					height: 32px;
					border-radius: 20px;
					color: #FFFFFF;
				}
			}
		}
	}
	
	.ify_vessel {
		height: 302px;
		margin: 30px 40px 0px;
		border: 1px solid #CCC;
		border-radius: 10px;
		background: #fafafa;
		box-sizing: border-box;
	}
	
	.ify_name {
		display: flex;
		justify-content: space-between;
		height: 44px;
		line-height: 44px;
		margin: 0 15px;
		font-weight: 700;
		font-size: 16px;
	}
	
	.iconfont {
		font-size: 14px;
		color: red;
	}
	
	.ify_container {
		min-height: calc(100% - 75px);
		/*margin: 0 40px;*/
		/*height: 100%;*/
		overflow: hidden;
		position: relative;
		span {
			width: 20px;
			height: 20px;
			z-index: 10;
			position: absolute;
			top: 50px;
			right: 0;
			background-color: gold;
			&:first-of-type {
				left: 0;
			}
		}
	}
	
	.ify_file {
		width: 141px;
		float: left;
		margin-left: 40px;
		margin-bottom: 50px;
		ul {
			border: 1px solid #CCCCCC;
			border-bottom: none;
			background: #fdf6f5;
			height: 200px;
			box-sizing: border-box;
			>li {
				height: 40px;
				text-align: center;
				line-height: 40px;
				border-bottom: 1px solid #CCCCCC;
				box-sizing: border-box;
				&:first-child {
					background: #f9dfd6;
				}
			}
		}
	}
	
	.left_banner {
		width: 100%;
		height: 256px;
		margin: 14px 39px 0;
		.left_banner_add {
			position: relative;
			width: 141px;
			height: 200px;
			background: #fffbfa;
			border: 1px dashed #f9dfd6;
			.lba_x {
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -4px;
				margin-left: -32px;
				width: 64px;
				height: 8px;
				background: #f6e1dc;
			}
			.lba_y {
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -32px;
				margin-left: -4px;
				width: 8px;
				height: 64px;
				background: #f6e1dc;
			}
		}
	}
	
	.theme-red {
		.test {
			background: #f35835;
			border: 1px solid #ca2a16!important;
		}
		.next {
			background: url(../../assets/imgs/red/next_red.png);
			background-size: 100% 100%;
			color: $red-color!important;
		}
	}
	
	.theme-blue {
		.test {
			background: url(../../assets/imgs/blue/test_blue.png);
			background-size: 100% 100%;
		}
		.next {
			background: url(../../assets/imgs/blue/next_blue.png);
			background-size: 100% 100%;
			color: $blue-color!important;
		}
	}
	
	.theme-green {
		.test {
			background: #4fb57d;
			border: 1px solid #34965e!important;
		}
		.next {
			background: url(../../assets/imgs/green/next_green.png);
			background-size: 100% 100%;
			color: $green-color!important;
		}
	}
</style>