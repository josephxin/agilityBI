<template>
	<div class="collect">
		<div class="search-result">
			<div class="content">
				<div class="clearfix main_sum">
					<div class="main_echarts">

						<collect-btn :btnCollectList.sync="collectList" :btnCollectCheckList.sync="collectCheckList" :title="title" type="myReport" :btn="btn" :options="options"></collect-btn>

						<collect-content :contentCollectList="collectList" :contentCollectCheckList.sync="collectCheckList" type="myReport"></collect-content>
						<div class="clearfix">
							<pagination :total="total"></pagination>
						</div>
						<!--导出设置-对话框-->
						<!--<dialog-export @confirm-export="confirmExport"></dialog-export>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pagination from '@/components/pagination/pagination'
	import collectBtn from '@/components/buttons/collectBtn'
	import collectContent from '@/components/collectContent/collectContent'
	import dialogExport from "@/components/dialog/dialogExport";
	import { reportFolderList, reportFolderDelete, folderList } from "@/api/index.js"
	import { mapState } from "vuex";
	import { BIMsg } from '@/assets/js/tools.js'

	export default {
		components: {
			pagination,
			collectBtn,
			collectContent,
			dialogExport
		},
		data() {
			return {
				total: 0, //总数
				title: "我的报告",
				btn: [{
					name: "导出",
					iconName: "icon-zhizuo",
					className: "report_blue",
					fn: () => {
						//this.$root.exportEcharts()
						this.exportReportList()
					}
				}, {
					name: "删除",
					iconName: "icon-unie639",
					className: "report_blue",
					fn: () => {
						this.reportFolderDeleteAjax()
					}
				}, {
					name: "制作报告",
					iconName: "icon-zhizuo",
					className: "report_blue",
					fn: () => {
						this.goProduceReport()
					}
				}],
				options: [],
				currentFolder: 0, //当前选中的分类的id
				collectList: [],
				collectCheckList: [],
			}
		},
		computed: {
			//第一项  每页的条数   
			//第二项  当前的页码
			//第3项  搜索框中的名字
			...mapState(["dataLimit", "dataPage", "currPageSearch"])
		},
		watch: {
			currentFolder: {
				handler(val, olVal) {
					//console.log("监听目录id", val)
					this.reportFolderListAjax(this.currPageSearch)
				}
			},
			//用于我的报告，我的收藏的本页搜索
			currPageSearch: {
				handler(val, olVal) {
					//console.log("监听用于我的报告，我的收藏的本页搜索", val)
					this.reportFolderListAjax(val)
				},
				deep: true
			},
			dataLimit: {
				handler(val, olVal) {
					//每页的条数
					//console.log("监听每页的条数", val)
					if (this.currentFolder!=0) {
						this.reportFolderListAjax(this.currPageSearch)
					}
				},
				deep: true
			},
			dataPage: {
				handler(val, olVal) {
					//当前的页码
					//console.log("监听当前的页码", val)
					if (this.currentFolder!=0) {
						this.reportFolderListAjax(this.currPageSearch)
					}
				},
				deep: true
			}
		},
		methods: {
			//导出报告列表
			exportReportList(){
				this.collectCheckList.forEach(itemCheck => {
					this.collectList.forEach(item => {
						if (item.id==itemCheck) {
							if (item.reportUrl!='') {
								this.$exportPng(item.reportUrl, item.reportName)
							}
						}
					})
				});
			},
			//子组件导出对话框，点击确定按钮后触发本组件confirm-export事件
			confirmExport(exportFormat){
				
			},
			//跳往制作报告页
			goProduceReport(){
				//console.log(this.collectCheckList);
				//console.log(this.collectList);
				var arr = [];
				this.collectCheckList.forEach(itemCheck => {
					this.collectList.forEach(item => {
						if (item.id==itemCheck) {
							arr.push({
								folderId: item.folderId,
								reportId: item.reportId,
								reportName: item.reportName,
							});
						}
					})
				});
				//console.log(arr);
				this.$store.commit('changeReportList', arr)
				this.$router.push({
					name: 'produceReport',
					params: {
						id: '2'
					}
				})
			},
			//获取目录列表和当前选中目录
			folderListAjax() {
				folderList().then(data => {
					//console.log('报告列表页——根据用户token查询我的报告分类列表', data)
					if(data.code == 200) {
						if(data.data && data.data.length > 0) {
							//数据赋值
							this.options = data.data
							this.currentFolder = data.data[0].id
							// 目录id监听变化，调文件夹下面具体的表-接口
							//this.reportFolderListAjax(this.currPageSearch)
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取当前文件夹下面具体的表
			reportFolderListAjax(reportName) {
				reportFolderList({
						"page": this.dataPage, //当前的页码
						"size": this.dataLimit, //每页的条数
						"folderId": this.currentFolder, //当前选中分类的id
						"reportName": reportName, //搜索时需要传入的名字，可不传
					})
					.then(data => {
						//console.log('当前文件夹下面具体的表', data)
						if(data.code == 200) {
							this.collectCheckList = [] //清空选中
							this.collectList = data.data.list
							this.total = data.data.total
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//删除文件夹中报告
			reportFolderDeleteAjax() {
				this.$confirm('确定要删除这些报告吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var checkStr = this.collectCheckList.join(",")
					//console.log(checkStr);
					reportFolderDelete({
						"ids": checkStr, //报告主键id,以逗号连接：1,2,3
					}).then(data => {
						//console.log('删除文件夹中的报告', data)
						if(data.code == 200) {
							this.reportFolderListAjax(this.currPageSearch)
							BIMsg({
								message: "删除成功",
								type: 'success'
							})
						}
					}).catch(err => {
						console.log(err)
					})
				}).catch(() => {
					BIMsg({
						message: '已取消删除'
					});
				});
			}
		},
		created() {
			this.folderListAjax()
		},
		mounted() {
			this.$root.search = ''
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.collect {
		height: 100%;
	}
	
	.search-result {
		height: 100%;
		.content {
			padding-top: 12px;
			padding-bottom: 74px;
			margin: 0 50px;
		}
		.main_sum {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
		}
		.main_echarts {
			min-height: calc(100vh - 256px);
			flex: 1;
		}
	}
	
	.theme-blue {
		.med_explain {
			background: rgba(255, 255, 255, .6);
			color: $home-recommend-color;
		}
		li:hover {
			.med_explain {
				background: rgba(11, 83, 172, .6);
				color: #FFF;
			}
			.med_border {
				border: 1px solid $search-li-border!important;
			}
		}
	}
	
	.theme-red {
		.med_explain {
			background: rgba(255, 255, 255, .6);
			color: #37261f;
		}
		li:hover {
			.med_explain {
				background-color: rgba(72, 61, 54, 0.6);
				color: #FFF;
			}
			.med_border {
				border: 1px solid $configure-list-red !important;
			}
		}
	}
	
	.theme-green {
		.med_explain {
			background: rgba(255, 255, 255, .6);
			color: #1c4e1d;
		}
		li:hover {
			.med_explain {
				background-color: rgba(90, 161, 120, 0.6);
				color: #FFF;
			}
			.med_border {
				border: 1px solid $configure-list-green!important;
			}
		}
	}
</style>