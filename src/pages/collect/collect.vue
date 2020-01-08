<template>
	<div class="collect">
		<div class="search-result">
			<div class="content">
				<div class="clearfix main_sum">
					<div class="main_echarts">
						<collect-btn :btnCollectList.sync="collectList" :btnCollectCheckList.sync="collectCheckList" :title="title" type="collect" :btn="btn" :options="options"></collect-btn>
						<collect-content :contentCollectList="collectList" :contentCollectCheckList.sync="collectCheckList" type="collect"></collect-content>
						<div class="clearfix">
							<pagination :total="total"></pagination>
						</div>
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
	import { storeFolderList, reportStoreInfoList, reportStoreInfoDelete } from "@/api/index.js"
	import { mapState } from "vuex";
	import { BIMsg } from '@/assets/js/tools.js'
	export default {
		components: {
			pagination,
			collectBtn,
			collectContent
		},
		data() {
			return {
				total: 0,
				title: "我的收藏",
				btn: [{
					name: "导出",
					iconName: "icon-zhizuo",
					className: "report_blue",
					fn: () => {
						this.$root.exportEcharts()
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
				collectList: [],
				collectCheckList: [],
				options: [],
				currentFolder: 0, //当前选中的分类的id
			}
		},
		computed: {
			...mapState(["dataLimit", "dataPage", "currPageSearch"])
		},

		watch: {
			currentFolder: {
				handler(val, olVal) {
					//console.log("监听目录id", val)
					this.reportListAjax(this.currPageSearch)
				}
			},
			//用于我的报告，我的收藏的本页搜索
			currPageSearch: {
				handler(val, olVal) {
					//console.log("监听用于我的报告，我的收藏的本页搜索", val)
					this.reportListAjax(val)
				},
				deep: true
			},
			dataLimit: {
				handler(val, olVal) {
					//每页的条数
					//console.log("监听每页的条数", val)
					if(this.currentFolder != 0) {
						this.reportListAjax(this.currPageSearch)
					}
				},
				deep: true
			},
			dataPage: {
				handler(val, olVal) {
					//当前的页码
					//console.log("监听当前的页码", val)
					if(this.currentFolder != 0) {
						this.reportListAjax(this.currPageSearch)
					}
				},
				deep: true
			}
		},
		methods: {
			//调往制作报告页
			goProduceReport() {
				//console.log(this.collectCheckList);
				//console.log(this.collectList);
				var arr = [];
				this.collectCheckList.forEach(itemCheck => {
					this.collectList.forEach(item => {
						if(item.id == itemCheck) {
							arr.push({
								folderId: item.folderId,
								reportId: item.id,
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
						id: '1'
					}
				})
			},
			folderListAjax() {
				storeFolderList()
					.then(data => {
						//console.log('我的收藏目录列表', data)
						if(data.code == 200) {
							var folderList = data.data
							if(folderList.constructor == Array && folderList.length > 0) {
								this.options = folderList
								this.currentFolder = data.data[0].id
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//当前文件夹下面具体的表
			reportListAjax(reportName) {
				reportStoreInfoList({
						"page": this.dataPage, //当前的页码
						"size": this.dataLimit, //每页的条数
						"folderId": this.currentFolder, //当前选中分类的id
						"reportName": reportName, //搜索时需要传入的名字，可不传
					})
					.then(data => {
						//console.log('当前文件夹下面具体的表', data)
						if(data.code == 200) {
							var list = data.data.list
							var arr=[]
							list.forEach((item, index) => {
								var obj = {
									folderId: item.folderId,
									folderName: item.folderName,
									id: item.id,
									reportId: item.reportId,
									reportName: item.reportName,
									reportUrl: item.storeUrl,
								}
								arr.push(obj)
							})
							this.collectCheckList = [] //清空选中
							this.collectList = arr
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
					reportStoreInfoDelete({
						"ids": checkStr, //报告主键id,以逗号连接：1,2,3
					}).then(data => {
						//console.log('删除文件夹中的收藏', data)
						if(data.code == 200) {
							this.reportListAjax(this.currPageSearch)
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