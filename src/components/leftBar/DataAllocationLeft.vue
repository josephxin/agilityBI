<template>
	<div class="data_allocation">
		<happy-scroll>
			<el-collapse v-model="activeNames" class="data_allocation_collapse">
				<el-collapse-item title="数据库" name="1">
					<div class="all_data" v-for="(item,index) in dataAll" :key="index">
						<!--<span class="all_data_name" :class="{'nameActive': nameActive == index}">{{item.title}}</span>-->
						<div class="all_data_select">
							<ul class="clearfix">
								<li :title="obj.name" v-for="(obj,i) in item.data" :key="i" :class="{'active': active == obj.id}" @click="getActive(obj, index)">
									<div class="ads_border">
										<img :src="obj.imgUrl" alt="" />
										<div class="ads_name" :title="obj.name">
											{{obj.name}}
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</el-collapse-item>
				<el-collapse-item name="2" class="uploaded">
					<template slot="title">
						<i class="iconfont icon-ep--"></i>
						<p>已上传的数据源</p>
					</template>
					<allocation-exist ref="allocationExist" :allocationList="allocationList"></allocation-exist>
				</el-collapse-item>
			</el-collapse>
		</happy-scroll>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { getDataMatchingList } from "@/api/index.js"
	import allocationExist from "components/leftBar/allocationExist"

	export default {
		components: {
			allocationExist
		},
		data: function() {
			return {
				activeNames: ["1", "2"], //控制折叠面板的展开
				active: 1, //数据源类型下标
				nameActive: 0, //蓝色主题下-标题下面的高亮短横杠
				allocationList: [], //数据源列表
				dataAll: [{ //数据源类型
						data: [{
								name: "MySQL",
								imgUrl: require("@/assets/imgs/common/MySQL.png"),
								id: "1",
								tag: "mysql"
							},
							/*{
								name: "MaprHadoopHive",
								imgUrl: require("@/assets/imgs/common/MaprHadoopHive.png"),
								id: "2",
								tag: "mapr"
							}, */
							{
								name: "Oracle",
								imgUrl: require("@/assets/imgs/common/oracle.png"),
								id: "3",
								tag: "mysql"
							},
							/*{
								name: "SQLServer",
								imgUrl: require("@/assets/imgs/common/SQLServer.png"),
								id: "4",
								tag: "mysql"
							},*/
							{
								name: "DB2",
								imgUrl: require("@/assets/imgs/common/SQLServer.png"),
								id: "5",
								tag: "mysql"
							}
						]
					},
					/*{
						title: "文件",
						data: [{
								name: "Excle",
								imgUrl: require("@/assets/imgs/common/excle2.png"),
								id: "5",
								tag: "execl"
							},
							{
								name: "csv",
								imgUrl: require("@/assets/imgs/common/csv.png"),
								id: "6",
								tag: "execl"
							}
						]
					},
					{
						title: "网页",
						data: [{
							name: "HTML",
							imgUrl: require("@/assets/imgs/common/web.png"),
							id: "7",
							tag: "web"
						}]
					}*/
				],
			}
		},
		computed: {
			...mapState(["dataMatch"]),
		},
		watch: {
			dataMatch: {
				handler(newValue, oldValue) {
					//console.log('左侧监听dataMatch',newValue, newValue.id)
					this.active = newValue.id
				},
				deep: true
			}
		},
		methods: {
			// 新建数据源，并且下面的数据源列表取消选中状态
			getActive(obj, index) {
				//console.log("点击按钮",obj)
				//this.nameActive = index
				this.$store.commit('changeDataMatch', obj) //右侧表单清空
				this.$store.commit('changeUploaded') //数据源列表取消选中状态
			},
			getDataSource() {
				getDataMatchingList({
					"userId": this.$root.userId
				}).then(data => {
					//console.log('获取左侧服务器、数据库列表', data)
					if(data.message == "success") {
						this.allocationList = data.data
						this.$refs.allocationExist.active = -1
					}
				}).catch(err => {
					console.log(err)
				})
			},
		},
		created() {
			this.getDataSource()
		},
		mounted() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.data_allocation {
		height: 100%;
		width: 284px;
		background-blend-mode: saturation, normal, normal;
		box-sizing: border-box;
		.uploaded {
			>div[role='tab'] {
				.el-collapse-item__header {
					line-height: 2;
					height: 110px;
					padding: 0 20px;
					text-align: center;
					i.icon-ep-- {
						display: inline-block;
						line-height: 1;
						font-size: 30px;
						margin-top: 30px;
					}
					p {
						line-height: 1;
						margin-top: 5px;
					}
					.el-collapse-item__arrow {
						line-height: 110px;
					}
				}
			}
		}
		.all_data_name {
			display: block;
			margin: auto;
			width: 273px;
			height: 43px;
			text-align: center;
			letter-spacing: 1px;
			font-weight: bold;
			font-stretch: bold;
			line-height: 43px;
			color: rgba(255, 255, 255, 0.9);
			font-size: 14px;
			user-select: none;
		}
		.all_data {
			width: 284px;
			padding-top: 3px;
			.all_data_select {
				width: 273px;
				margin: 7px auto 5px;
				ul {
					padding-top: 27px;
					padding-left: 3px;
					padding-bottom: 16px;
					li {
						float: left;
						width: 113px;
						height: 80px;
						margin-bottom: 10px;
						margin-left: 9px;
						border: 4px solid transparent;
						border-radius: 5px;
						cursor: pointer;
						-webkit-transition: border .3s;
						-moz-transition: border .3s;
						-ms-transition: border .3s;
						-o-transition: border .3s;
						transition: border .3s;
						.ads_border {
							position: relative;
							width: 111px;
							height: 78px;
							border: 1px solid;
							border-radius: 1px;
							.ads_name {
								position: absolute;
								bottom: 0;
								left: 0;
								width: 100%;
								height: 18px;
								line-height: 18px;
								font-size: 14px;
								background-color: rgba(0, 0, 0, 0.5);
								text-align: center;
								color: #FFF;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}
	
	.theme-red {
		.data_allocation {
			.data_allocation_collapse {
				>.el-collapse-item {
					>div[role='tab'] {
						.el-collapse-item__header {
							text-align: center;
							background: url(../../assets/imgs/bg_red.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
			}
			.all_data_name {
				background: url(../../assets/imgs/red/title_red.png);
			}
			.all_data_select {
				background: url(../../assets/imgs/red/content_red.png);
				background-size: 100% 100%;
				ul {
					li {
						.ads_border {
							border-color: #e08275;
						}
					}
					li:hover {
						border-color: #f2d0cc;
					}
					li.active {
						border-color: #f2d0cc
					}
				}
			}
		}
	}
	
	.theme-blue {
		.data_allocation {
			padding: 6px;
			.data_allocation_collapse {
				>.el-collapse-item {
					>div[role='tab'] {
						.el-collapse-item__header {
							text-align: center;
							background: url(../../assets/imgs/blue/report_title.png)no-repeat;
							background-size: 100% 100%;
						}
					}
				}
			}
			.el-collapse-item__header.is-active {
				background-size: 100% 100%;
			}
			.all_data_name {
				background: url(../../assets/imgs/blue/title_blue.png);
			}
			.all_data {
				.nameActive {
					background: url(../../assets/imgs/blue/title_blue_select.png)
				}
			}
			.all_data_select {
				background: url(../../assets/imgs/blue/content_blue.png);
				background-size: 100% 100%;
				ul {
					li {
						.ads_border {
							border-color: #FFF;
						}
					}
					li:hover {
						border-color: #FFF
					}
					li.active {
						border-color: #FFF
					}
				}
			}
		}
	}
	
	.theme-green {
		.data_allocation {
			.data_allocation_collapse {
				>.el-collapse-item {
					>div[role='tab'] {
						.el-collapse-item__header {
							text-align: center;
							background: url(../../assets/imgs/bg_green.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
			}
			.all_data_name {
				background: url(../../assets/imgs/green/title_green.png);
			}
			.all_data_select {
				background: url(../../assets/imgs/green/content_green.png);
				background-size: 100% 100%;
				ul {
					li {
						.ads_border {
							border-color: #619c78;
						}
					}
					li:hover {
						border-color: #c6dbce
					}
					li.active {
						border-color: #c6dbce
					}
				}
			}
		}
	}
</style>