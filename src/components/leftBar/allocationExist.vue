<template>
	<div class="allocation_exist">
		<el-collapse class="collapse-server" v-model="activeServer" accordion>
			<el-collapse-item v-for="(item, index) in allocationList" :key="index" :name="index+1">
				<template slot="title">
					<p :title="item.host + '服务器'">{{item.host}} 服务器</p>
				</template>
				<ul class="column-list">
					<li v-for="(baseItem, index) in item.databases" :key="index" :class="{'active':active == index}" @click="selects(baseItem, index, item)">
						<i class="iconfont icon-shuju"></i>
						<span :title="baseItem.databaseName">{{baseItem.databaseName}}</span>
					</li>
				</ul>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	
	export default {
		components: {

		},
		props: {
			allocationList: [Array]
		},
		data() {
			return {
				active: -1,
				activeServer: [1],
				data: [{
					name: "MySQL",
					imgUrl: require("@/assets/imgs/common/MySQL.png"),
					id: "1",
					tag: "mysql"
				}, {
					name: "MaprHadoopHive",
					imgUrl: require("@/assets/imgs/common/MaprHadoopHive.png"),
					id: "2",
					tag: "mapr"
				}, {
					name: "Oracle",
					imgUrl: require("@/assets/imgs/common/oracle.png"),
					id: "3",
					tag: "mysql"
				}, {
					name: "SQLServer",
					imgUrl: require("@/assets/imgs/common/SQLServer.png"),
					id: "4",
					tag: "mysql"
				}, {
					name: "DB2",
					imgUrl: require("@/assets/imgs/common/SQLServer.png"),
					id: "5",
					tag: "mysql"
				}]
			}
		},
		computed: {
			...mapState(["uploaded"]),
		},
		watch: {
			uploaded: {
				handler(val, oldVal) {
					//console.log(val);
					this.active = -1
				}
			}
		},
		methods: {
			selects(item, index, parents) {
				//console.log(item, index, parents);
				this.active = index
				var sourceObj = {};
				for(var i = 0; i < this.data.length; i++) {
					var dataName = this.data[i]
					if(dataName.name == item.sourceName) {
						sourceObj = dataName
						break;
					}
				}
				var databaseObj = {
					"databaseId": item.databaseId,
					"databaseName": item.databaseName,
					"passWord": item.passWord,
					"port": item.port,
					"type": item.type,
					"userName": item.userName,
					"host": parents.host,
					"sourceName": item.sourceName
				}
				var resultObj = Object.assign({}, sourceObj, databaseObj)
				//console.log(resultObj);
				this.$store.commit('changeDataMatch', resultObj)
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.allocation_exist {
		.collapse-server {
			.el-collapse-item__header {
				.table-title {
					i {
						float: left;
						margin-left: 30px;
						margin-right: 10px;
						font-size: 16px;
					}
				}
			}
			.column-list {
				li {
					height: 50px;
					line-height: 50px;
					padding: 0 20px;
					cursor: pointer;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					i {
						float: left;
						margin-right: 10px;
						font-size: 22px;
					}
				}
			}
		}
	}
	
	.theme-blue {
		.allocation_exist {
			margin-top: 7px;
			border-radius: 13px;
			background: url(../../assets/imgs/blue/bg_term_list.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	
	.theme-red {
		.allocation_exist {
			.collapse-server {
				>.el-collapse-item {
					>div[role='tab'] {
						>.el-collapse-item__header {
							&.is-active {
								background: url(../../assets/imgs/red/bg_red_bar.jpg);
							}
						}
					}
				}
				.column-list {
					li {
						&:hover,
						&.active {
							background-color: $bg-active-red;
						}
					}
				}
			}
		}
	}
	
	.theme-green {
		.allocation_exist {
			.collapse-server {
				>.el-collapse-item {
					>div[role='tab'] {
						>.el-collapse-item__header {
							&.is-active {
								background: url(../../assets/imgs/green/bg_green_bar.jpg);
							}
						}
					}
				}
				.column-list {
					li {
						&:hover,
						&.active {
							background-color: $bg-active-green;
						}
					}
				}
			}
		}
	}
</style>