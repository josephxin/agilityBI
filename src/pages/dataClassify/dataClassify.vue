<template>
	<div class="classify">
		<div class="ify_left">
			<banner v-for="(item,index) in arr" :key="index" :list="item"></banner>
			<div class="ify_vessel">
				<div class="ify_name">
					<p>
						增加分类
					</p>
				</div>
				<div class="left_banner">
					<div class="left_banner_add" @click="bannerAdd">
						<div class="lba_x"></div>
						<div class="lba_y"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="ify_right">
			<div class="ify_right_explain">
				<span>拖拽列表将其加入分类，或从分类中删除</span>
				<div class="ire_btn">
					<button class="test el-btn save" @click="btn_add">保存</button>
					<button class="next el-btn cancel">取消</button>
				</div>
			</div>
			<vuedraggable v-model="list" :options="{group:'people',ghostClass:'placeholder'}" @start="drag=true" @end="drag=false" class="clearfix ify_container">
				<div class="ify_file" v-for="(element,id) in list" :key="element.id">
					<ul  class="cursor-move">
						<li>{{element.name}}</li>
						<li v-for="(obj,i) in element.childer" :key="i" :title="obj.name">{{obj.name}}</li>
					</ul>
				</div>
			</vuedraggable>
		</div>
	</div>
</template>

<script>
	import banner from "@/pages/dataClassify/banner"
	import {getDataMatchingList} from "@/api/index.js"
	export default {
		components: {
			banner
		},

		data() {
			return {
				list: [{
					id: 1221,
					name: "企业信息100",
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
			bannerAdd() {
				this.arr.push({
					id: this.id++,
					name: "新增分类",
					list: []
				})
			},
			btn_add() {
				//保存按钮 ，调取接口
				//左边的轮播数组
				//this.list
//				console.log(this.arr)
				getDataMatchingList({
					userId:"123"
				}).then((data)=>{
					//console.log(data)
				})
			}
		},
		created() {

		},
		mounted() {}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.classify {
		padding: 20px 50px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		transition: .3s;
	}
	.placeholder{
		display: none;
	}
	.ify_left {
		box-sizing: border-box;
		width: 669px;
		height: calc(100vh - 230px);
		border-radius: 20px;
		margin-right: 20px;
		padding: 30px 40px;
		background: #FFF;
		overflow-y: auto;
		transition: .3s;
	}
	
	.ify_right {
		flex: 1;
		border-radius: 20px;
		background: #FFF;
		overflow-y: auto;
		height: calc(100vh - 230px);
		transition: .3s;
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
				right: 40px;
				top: 0;
				.test {
					margin-right: 20px;
				}
			}
		}
	}
	
	.ify_vessel {
		height: 302px;
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
		cursor: pointer;
	}
	
	.ify_container {
		min-height: calc(100% - 75px);
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
			border: 1px solid transparent;
			border-bottom: none;
			background: #fdf6f5;
			height: 201px;
			box-sizing: border-box;
			overflow-y: auto;
			>li {
				height: 40px;
				text-align: center;
				line-height: 40px;
				border-bottom: 1px solid transparent;
				box-sizing: border-box;
				padding: 0 10px;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
				&:first-child {
					color:#a92312;
					background: #f9dfd6;
				}
				&:nth-of-type(even){ 
					background: #fffbfa;
				}
			}
		}
	}
	
	.left_banner {
		margin: 14px 39px 0;
		.left_banner_add {
			position: relative;
			width: 141px;
			height: 200px;
			background: #fffbfa;
			border: 1px dashed #f9dfd6;
			cursor: pointer;
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
		.ify_file {
			ul {
				border-color:#fceceb;
				>li {
					border-color:#fceceb;
				}
			}
		}
	}
	
	.theme-blue {
		.ify_file {
			ul {
				background: #f5f8fd;
				border-color:#e6eff9;
				>li {
					border-color:#e6eff9;
					&:first-child {
						background: #dce8f6;
						color: #4a6c98;
					}
					&:nth-of-type(even){ 
						background: #fafcff;
					}
				}
			}
		}
		.left_banner {
			.left_banner_add {
				border-color:#4a6c98;
				background: #fafcff;
				.lba_x {
					background: #4a6c98;
				}
				.lba_y {
					background: #4a6c98;
				}
			}
		}
	}
	.theme-green {
		.ify_file{
			ul{
				background: #f6fdf8;
				border-color:#e7f9ed;
				>li{
					border-color:#e7f9ed;
					&:first-child{
						background: #e4f8e3;
						color: #017734;
					}
					&:nth-of-type(even){ 
						background: #fcfffc;
					}
				}
			}
		}
		.left_banner {
			.left_banner_add {
				border-color:#017734;
				background: #f6fdf8;
				.lba_x {
					background: #017734;
				}
				.lba_y {
					background: #017734;
				}
			}
		}
	}

</style>