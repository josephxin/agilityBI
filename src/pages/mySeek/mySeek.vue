<template>
	<div class="collect">
		<div class="search-result">
			<div class="content">
				<div class="clearfix main_sum">
					<div class="main_echarts">

						<collect-btn :btnCollectList.sync="collectList" :btnCollectCheckList.sync="collectCheckList" :title="title" type="mySeek" :btn="btn"></collect-btn>

						<collect-content :contentCollectList="collectList" :contentCollectCheckList.sync="collectCheckList" type="mySeek"></collect-content>
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
	import { mapState } from "vuex";
	import { BIMsg } from '@/assets/js/tools.js'
	import { reportSearchHistoryList, reportSearchHistorySave, reportSearchHistoryDelete } from "@/api/index.js"
	
	export default {
		components: {
			pagination,
			collectBtn,
			collectContent
		},
		data() {
			return {
				total: 200,
				title: "我的搜索",
				btn: [{
					name: "删除",
					iconName: "icon-unie639",
					className: "report_blue",
					fn: () => {
						this.reportSearchHistoryDeleteAjax()
					}
				}],
				collectList: [],
				collectCheckList: [],
			}
		},
		computed: {
			//第一项当前的页码
			//第二项 每页的条数
			...mapState(['dataPage', 'dataLimit'])
		},
		methods: {
			reportSearchHistoryListAjax() {
				//console.log('当前的页码', this.dataPage)
				//console.log('每页的条数', this.dataLimit)
				reportSearchHistoryList({
					"page": this.dataPage,
					"size": this.dataLimit
				}).then(data => {
					//console.log('获取历史搜索列表', data)
					if(data.code == 200) {
						this.total = data.data.total
						let arr = data.data.list
						let listArr = []
						arr.forEach((item, i) => {
							let obj = {
								'createDate': item.createDate,
								'id': item.id,
								'searchCount': item.searchCount,
								'reportUrl': item.searchImg,
								'reportName': item.searchName,
								'userId': item.userId
							}
							listArr.push(obj)
						})
						this.collectCheckList = [];
						this.collectList = listArr
					}

				}).catch(err => {
					console.log(err)
				})
			},
			//删除
			reportSearchHistoryDeleteAjax() {
				this.$confirm('确定要删除这些报告吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var checkStr = this.collectCheckList.join(",")
					//console.log(checkStr);
					reportSearchHistoryDelete({
						'ids': checkStr,
					}).then(data => {
						//console.log('删除搜索记录', data)
						if(data.code == 200) {
							this.reportSearchHistoryListAjax()
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
		watch: {
			dataLimit: {
				handler(val, olVal) {
					//每页的条数
					this.reportSearchHistoryListAjax()
				},
				deep: true
			},
			dataPage: {
				handler(val, olVal) {
					//当前的页码
					this.reportSearchHistoryListAjax()
				},
				deep: true
			}
		},
		created() {
			this.reportSearchHistoryListAjax()
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