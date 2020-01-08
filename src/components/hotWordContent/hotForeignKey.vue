<template>
	<div class="hot_foreign">
		<el-collapse class="collapse-server" v-model="activeServer" accordion>
			<el-collapse-item v-for="(item, index) in foreignKeyList" :key="index" :name="index+1">
				<template slot="title">
					<p :title="item.host + '服务器'">{{item.host}} 服务器</p>
				</template>
				<el-collapse class="collapse-database" v-model="activeDatabase" accordion>
					<el-collapse-item v-for="(baseItem, index) in item.database" :key="index" :name="index+1">
						<template slot="title">
							<p :title="baseItem.databaseName"><i class="iconfont icon-shuju"></i>{{baseItem.databaseName}}</p>
						</template>
						<div class="item" v-for="(tableItem, index) in baseItem.table" :key="index" :title="tableItem.tableName" :class="{'is_active' : hotWordTableActive == index}" @click="getHotWord(tableItem, index)">
							<i class="iconfont icon-shujubiao"></i>{{tableItem.tableName}}
						</div>
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
			>p {
				i {
					float: left;
					margin-right: 10px;
					font-size: 22px;
				}
			}
		}
		.item {
			height: 50px;
			line-height: 50px;
			padding: 0 20px 1px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			cursor: pointer;
			i {
				float: left;
				margin-left: 30px;
				margin-right: 10px;
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