<template>
	<div class="business_template">
		<el-collapse v-model="activeName" accordion>
			<el-collapse-item :title="item.name" :name="i + 1" v-for="(item,i) in term" :key="i">
				<div class="li_con">
					<div v-for="(obj,index) in item.childrenlist" :key="index">
						<div class="business_template_tilte">
							<div class="tilte_background" v-if="index"></div>
							<span>{{obj.title}}</span>
							<div class="tilte_background"></div>
						</div>
						<ul>
							<li v-for="(opt,j) in obj.list" :key="j">{{opt}}</li>
						</ul>
					</div>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				activeName: '1',
				term: [{
					name: "销售成本",
					childrenlist: []
				}, {
					name: "订单转换率",
					childrenlist: []
				}, {
					name: "利润率",
					childrenlist: []
				}, {
					name: "库存周转率",
					childrenlist: []
				}, {
					name: "销售收入",
					childrenlist: [{
						title: "维度",
						list: ["品牌", "时间", "地区", "部门"]
					}, {
						title: "度量",
						list: ["收入"]
					}]
				}]
			}
		},
		components: {

		},
		computed: {

		},
		watch: {

		},
		methods: {

		},
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.business_template {
		.li_con {
			box-sizing: border-box;
			background-color: rgba(9, 74, 156, 0.4);
			.business_template_tilte {
				height: 51px;
				line-height: 51px;
				>span{
					margin-left: 50px;
				}
				.tilte_background {
					height: 1px;
					background: url(../../assets/imgs/module_blue.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			ul {
				padding: 15px 0;
				li {
					margin: 0 auto;
					width: 230px;
					height: 32px;
					line-height: 32px;
					text-align: center;
					font-size: 14px;
					color: rgba(255, 255, 255, 0.6);
					border-radius: 15px;
					cursor: pointer;
					margin-bottom: 8px;
					&:last-of-type{
						margin-bottom: 0;
					}
					&:hover {
						background-color: rgba(0, 41, 103, 0.2);
						color: #FFF;
					}
				}
			}
		}
		.el-collapse-item__header{
			padding: 0 20px;
		}
	}
	.theme-blue {
		.business_template {
			.li_con {
				margin: 0 4px;
				border-radius: 10px;
			}
		}
	}
	.theme-red {
		.business_template {
			.li_con {
				background-color: #c6402e;
				.business_template_tilte {
					.tilte_background {
						background: url(../../assets/imgs/module_red.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				ul {
					li:hover {
						background-color: rgba(254, 139, 111, 0.2);
					}
				}
			}
			.el-collapse-item__header {
				background: url(../../assets/imgs/red/bg_list_line.jpg) no-repeat left bottom;
				&.is-active{
					background: url(../../assets/imgs/red/bg_red_bar.jpg);
				}
			}
		}
	}
	
	.theme-green {
		.business_template {
			.li_con {
				background-color: #196b3a;
				.business_template_tilte {
					.tilte_background {
						background: url(../../assets/imgs/module_green.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				ul {
					li:hover {
						background-color: rgba(93, 173, 127, 0.2);
					}
				}
			}
			.el-collapse-item__header {
				background: url(../../assets/imgs/green/bg_list_line.jpg) no-repeat left bottom;
				&.is-active{
					background: url(../../assets/imgs/green/bg_green_bar.jpg);
				}
			}
		}
	}
</style>