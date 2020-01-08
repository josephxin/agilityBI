<template>
	<div class="data-structure-analysis">
		<section v-show="!showProgress">
			<header>
				<div class="fl">
					<p class="fl">请从数据源中选择导入数据库列表</p>
					<el-input class="fl" v-model.trim="search" @keyup.enter.native="searchTableName" placeholder="输入需要搜索的表名关键字">
						<i slot="suffix" class="el-input__icon el-icon-search" @click="searchTableName"></i>
					</el-input>
				</div>
				<btn class="fr" :item="{name: '导入', className: 'save'}" @click.native="exportFn"></btn>
			</header>

			<el-table class="myTable" ref="myTable" :data="filterTableData" align="left" stripe @selection-change="selectionChange">
				<el-table-column type="selection" align="center">
				</el-table-column>
				<el-table-column v-for="(item,index) in tableTitle" :key="index" :prop="item.prop" :label="item.label">
				</el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table class="myTableItem" :data="props.row.column" align="left" stripe header-cell-class-name="header-cell-class-name" cell-class-name="cell-class-name">
							<el-table-column v-for="(item,index) in tableContentTitle" :key="index" :prop="item.prop" :label="item.label">
							</el-table-column>
							<el-table-column prop="isNull" label="不能为null">
								<template slot-scope="props">
									<i class="el-icon-check" v-if="props.row.isNull==false"></i>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<template slot="empty" slot-scope="scope">
					<i class="no_data"></i>
					<i class="no_bor"></i>
					<span>暂无数据源，请添加...</span>
				</template>
			</el-table>
		</section>
		<progress-bar v-show="showProgress" module-name="外键自动识别进度" :progress="progress" @cancel-event="endTask"></progress-bar>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import btn from "@/components/buttons/btn"
	import progressBar from "@/components/other/progressBar"
	import { dataStructureAnalysis } from '@/json/common.js' // 获取本地模拟数据

	import {
		getDatabaseStruct,
		saveDatabaseStruct,
		startForeignKeyAnalysis,
		queryForeignKeyAnalysisProgress,
		cancelForeignKeyAnalysis
	} from "@/api/index.js"

	export default {
		components: {
			btn,
			progressBar,
		},
		data() {
			return {
				showProgress: false,
				progress: 0,
				missionId: '',
				search: '',
				queryString: '',
				selectTables: [],
				tableTitle: [{
						prop: 'tableName',
						label: '表名'
					},
					{
						prop: 'comment',
						label: '表备注'
					},
					{
						prop: 'dbName',
						label: '数据源数据库'
					},
					{
						prop: 'host',
						label: '数据源服务器'
					},
				],
				tableContentTitle: [{
						prop: 'columnName',
						label: '属性名'
					},
					{
						prop: 'dataType',
						label: '类型'
					},
					{
						prop: 'comment',
						label: '属性备注'
					},
					{
						prop: 'length',
						label: '长度'
					},
					{
						prop: 'decimalPoint',
						label: '小数点'
					},
				],
				tableData: [],
			}
		},
		computed: {
			filterTableData() {
				return this.tableData.filter((item) => {
					return item.tableName.toLowerCase().indexOf(this.queryString.toLowerCase()) != -1
				})
			}
		},
		watch: {
			// 监听过滤后的表格数据的变化，为了给复选框选中
			filterTableData: {
				handler(newValue, oldValue) {
					setTimeout(() => {
						newValue.forEach((item, index) => {
							if(item.selected) {
								// 根据每一行的selected属性选中复选框
								this.$refs.myTable.toggleRowSelection(item)
							}
						})
					})
				}
			}
		},
		methods: {
			searchTableName() {
				//console.log('搜索表名关键字', this.search);
				if(this.search == '') {
					this.$message({
						type: 'info',
						duration: 1000,
						message: '请输入表名关键字'
					});
				}
				this.queryString=this.search
			},
			selectionChange(selectTables) {
				//console.log(selectTables);
				this.selectTables = selectTables
			},
			// 点击导入按钮
			exportFn() {
				//console.log('导入');
				var selectTableIds = []
				this.selectTables.forEach((item, index) => {
					selectTableIds.push(item.tableId)
				})
				//console.log(selectTableIds);
				// 存储数据库表结构选取结果接口
				saveDatabaseStruct({
					userId: this.$root.userId,
					selectTableIds: selectTableIds,
				}).then(data => {
					//console.log('存储数据库表结构选取结果接口', data)
					if(data.message == "success") {
						if(data.data.status == true) {
							// 启动外键识别任务接口
							this.startTask()
						}
					}
				}).catch(err => {
					this.$message({
						type: 'error',
						duration: 1000,
						message: err
					});
				})
			},
			// 启动外键识别任务接口
			startTask() {
				startForeignKeyAnalysis({
					userId: this.$root.userId,
				}).then(data => {
					console.log('启动外键识别任务接口', data)
					if(data.message == 'success') {
						if(data.data.status) {
							this.missionId = data.data.missionId
							this.showProgress = true
							// 外键识别任务进度查询接口
							this.queryTask()
						}
					} else {
						this.$message({
							type: 'error',
							duration: 1000,
							message: data.message
						});
					}
				}).catch(err => {
					this.$message({
						type: 'error',
						duration: 1000,
						message: err
					});
				})
			},
			// 外键识别任务进度查询接口
			queryTask() {
				queryForeignKeyAnalysisProgress({
					"userId": this.$root.userId,
					"missionId": this.missionId
				}).then(data => {
					console.log("外键识别任务进度查询接口", data)
					if(data.message == 'success') {
						if(data.data.process != -2 && data.data.process != -1) {
							this.progress = data.data.process
							if(this.progress >= 100) {
								this.progress = 100
								this.$message({
									type: 'success',
									duration: 1000,
									message: '数据结构分析成功！'
								});
								// 跳转页面
								this.$router.push({
									name: 'foreignKey'
								});
							}else{
								setTimeout(()=>{
									this.queryTask()
								}, 2000)
							}
						} else {
							this.$message({
								type: 'error',
								duration: 1000,
								message: data.data.process == -2 ? '任务id不存在' : '任务已取消'
							});
							this.progress = 0
						}
					} else {
						this.$message({
							type: 'error',
							duration: 1000,
							message: data.message
						});
						this.progress = 0
					}
				}).catch(err => {
					this.$message({
						type: 'error',
						duration: 1000,
						message: err
					});
					clearInterval(this.timer)
					this.progress = 0
				})
			},
			// 子组件触发的事件函数，终止外键识别任务接口
			endTask() {
				cancelForeignKeyAnalysis({
					"userId": this.$root.userId,
					"missionId": this.missionId
				}).then(data => {
					console.log("终止外键识别任务接口", data)
					if(data.message == 'success') {
						if(data.data.status) {
							this.showProgress = false
							this.$message({
								type: 'success',
								duration: 1000,
								message: '成功终止外键识别任务'
							});
						}
					} else {
						this.$message({
							type: 'error',
							duration: 1000,
							message: data.message
						});
					}
				}).catch(err => {
					this.$message({
						type: 'error',
						duration: 1000,
						message: err
					});
				})
			},
		},
		created() {
			//获取表结构接口
			getDatabaseStruct({
				userId: this.$root.userId,
			}).then(data => {
				console.log('获取表结构数据',data)
				//data=JSON.parse(data)
				if(data.message == "success") {
					this.tableData = data.data
				}
			}).catch(err => {
				console.log(err)
			})
		},
		mounted() {
			// 获取本地模拟数据
			//this.tableData = dataStructureAnalysis
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.data-structure-analysis {
		margin: 21px 50px;
		min-height: calc(100vh - 190px - 42px);
		background-color: white;
		border-radius: 5px;
		color: #333;
		section {
			width: 1027px;
			margin: 0 auto;
			padding: 78px 0 66px;
			>header {
				height: 26px;
				margin-bottom: 24px;
				>div {
					>p {
						margin-right: 10px;
						line-height: 26px;
					}
					.el-input {
						width: 363px;
						.el-input__inner {
							height: 26px;
							line-height: 24px;
							border: 1px solid #e6e6e6;
							background-color: #f2f4f5;
						}
						.el-input__icon {
							line-height: 26px;
							cursor: pointer;
						}
					}
				}
				>button {
					margin-top: -3px;
				}
			}
		}
		.myTable {
			border: 1px solid #ebeef5;
			border-bottom: none;
		}
		
		.el-icon-check {
			font-size: 20px;
		}
		.el-table__expanded-cell[class*=cell] {
			padding: 12px 30px;
		}
	}
	
	.theme-blue {
		.data-structure-analysis {
			.el-input__icon {
				color: $configure-list;
			}
			.header-cell-class-name {
				background-color: $configure-list-2;
				border-bottom: 1px solid $configure-list-2 !important;
				>div {
					color: #777777;
				}
			}
			.cell-class-name {
				border-bottom: 1px solid $configure-list-2 !important;
			}
			.myTableItem {
				border: 1px solid $configure-list-3;
				&.el-table--striped .el-table__body tr.el-table__row--striped td {
					background: $configure-list-1 !important;
				}
			}
			.el-icon-check {
				color: $configure-list;
			}
		}
	}
	
	.theme-red {
		.data-structure-analysis {
			.el-input__icon {
				color: $configure-list-red;
			}
			.header-cell-class-name {
				background-color: $configure-list-red-2;
				border-bottom: 1px solid $configure-list-red-2 !important;
				>div {
					color: #777777;
				}
			}
			.cell-class-name {
				border-bottom: 1px solid $configure-list-red-2 !important;
			}
			.myTableItem {
				border: 1px solid $configure-list-red-2;
				&.el-table--striped .el-table__body tr.el-table__row--striped td {
					background: $configure-list-red-1 !important;
				}
			}
			.el-icon-check {
				color: $configure-list-red;
			}
		}
	}
	
	.theme-green {
		.data-structure-analysis {
			.el-input__icon {
				color: $configure-list-green;
			}
			.header-cell-class-name {
				background-color: $configure-list-green-2;
				border-bottom: 1px solid $configure-list-green-2 !important;
				>div {
					color: #777777;
				}
			}
			.cell-class-name {
				border-bottom: 1px solid $configure-list-green-2 !important;
			}
			.myTableItem {
				border: 1px solid $configure-list-green-3;
				&.el-table--striped .el-table__body tr.el-table__row--striped td {
					background: $configure-list-green-1 !important;
				}
			}
			.el-icon-check {
				color: $configure-list-green;
			}
		}
	}
</style>