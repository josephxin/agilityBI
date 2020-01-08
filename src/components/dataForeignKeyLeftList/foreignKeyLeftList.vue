<template>
	<div class="foreignKeyLeftList">
		<el-collapse class="collapse-server" v-model="activeServer" accordion>
			<el-collapse-item v-for="(item, index) in foreignKeyList" :key="index" :name="index+1">
				<template slot="title">
					<p :title="item.host + '服务器'">{{item.host}} 服务器</p>
				</template>
				<el-collapse class="collapse-database" v-model="activeDatabase" accordion>
					<el-collapse-item v-for="(baseItem, index) in item.database" :key="index" :name="index+1">
						<template slot="title">
							<p class="database-title" :title="baseItem.databaseName"><i class="iconfont icon-shuju"></i>{{baseItem.databaseName}}</p>
						</template>
						<el-collapse class="collapse-table" v-model="activeTable" accordion>
							<el-collapse-item v-for="(tableItem, index) in baseItem.table" :key="index" :name="index+1" jtk-node-type="table" class="drag-li" :data="JSON.stringify(tableItem)">
								<template slot="title">
									<p class="table-title" :title="tableItem.tableName"><i class="iconfont icon-shujubiao"></i>{{tableItem.tableName}}</p>
								</template>
								<ul class="column-list">
									<li v-for="(columnItem, index) in tableItem.column" :key="index" class="column">
										<span>{{columnItem.columnName}}</span>
										<i :class="[columnItem.hasIn ? 'hasIn':'', columnItem.hasOut ? 'hasOut':'']"></i>
									</li>
								</ul>
							</el-collapse-item>
						</el-collapse>
					</el-collapse-item>
				</el-collapse>
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

		},
		data() {
			return {
				activeServer: [1],
				activeDatabase: [],
				activeTable: [],
			}
		},
		computed: {
			...mapState(["hotWordTableActive", "foreignKeyList"]),
		},
		watch: {

		},
		methods: {
			getHotWord(data, index) {
				//console.log(data);
				this.$store.commit("changeHotWordTableActive", index)
				this.$store.commit("changeHotWordEntityActive", -1)
				this.$store.commit("changeHotWord", data)
			},
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.collapse-database {
		.el-collapse-item__header {
			.database-title {
				i {
					float: left;
					margin-right: 10px;
					font-size: 22px;
				}
			}
		}
	}
	
	.collapse-table {
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
			padding: 8px 0;
			li {
				height: 34px;
				line-height: 34px;
				padding: 0 20px;
				color: rgba(255, 255, 255, .5);
				i {
					float: right;
					width: 15px;
					height: 11px;
					margin-top: 12px;
					&.hasIn {
						background: url(../../assets/imgs/hasIn.png) no-repeat;
						background-size: 100% 100%;
					}
					&.hasOut {
						background: url(../../assets/imgs/hasOut.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				span {
					float: left;
					margin-left: 57px;
					width: 150px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	
	.theme-red {
		.collapse-database {
			.item {
				background: url(../../assets/imgs/red/bg_list_line.jpg) no-repeat left bottom;
				&:hover,
				&.is_active {
					background-color: $bg-active-red;
				}
			}
		}
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
		}
	}
	
	.theme-green {
		.collapse-database {
			.item {
				background: url(../../assets/imgs/green/bg_list_line.jpg) no-repeat left bottom;
				&:hover,
				&.is_active {
					background-color: $bg-active-green;
				}
			}
		}
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
		}
	}
</style>