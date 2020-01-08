<template>
	<div class="chart">
		<echarts-right :buttons="buttons2" />

		<!--添加收藏——对话框-->
		<dialog-collect dialogTitle="添加收藏" :list="storeFolderList" :newFolderId="newStoreFolderId" :flagDelete="flagDelete" :flagUpdate="flagUpdate" @add-event="addStoreFolder" @delete-event="deleteStoreFolder" @update-event="updateStoreFolder" @save-report="saveReport"></dialog-collect>
		<!--导出设置-对话框-->
		<dialog-export @confirm-export="confirmExport"></dialog-export>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import echartsRight from '@/components/content/echartsRight'
	import dialogCollect from '@/components/dialog/dialogCollect'
	import dialogExport from "@/components/dialog/dialogExport";
	import { BIMsg } from '@/assets/js/tools.js'
	import { storeFolderList, storeFolderDelete, storeFolderSave, storeFolderUpdate, reportStoreInfoSave, reportSearchHistorySave, test } from "@/api/index.js"
	import axios from "axios"

	export default {
		components: {
			echartsRight,
			dialogCollect,
			dialogExport,
		},
		data() {
			return {
				storeFolderList: [],
				newStoreFolderId: 0,
				flagDelete: true,
				flagUpdate: true,
				buttons: [{
						name: "制作报告",
						iconName: "icon-zhizuo",
						fn: () => {
							this.goProduceReport()
						}
					},
					{
						name: '收藏',
						iconName: 'icon-shoucang3',
						fn: () => {
							this.collectReport()
						}
					},
					{
						name: '导出',
						iconName: 'icon-daochu',
						fn: () => {
							this.$root.exportEcharts()
						}
					},
				],
				buttons2: [],
				routeId: '0',
			}
		},
		computed: {
			...mapState(["flagHeight", "currFolderId", "reportId", "reportName", "mySeekSwitch", "visibleCollectBtn", 'token']),
		},
		watch: {
			mySeekSwitch: {
				handler(val) {
					//console.log(val)
					if(val && this.token != '') {
						setTimeout(() => {
							this.reportSearchHistorySaveAjax()
						}, 1500)
					}
				}
			},
			visibleCollectBtn: {
				handler(val) {
					//console.log(val)
					this.buttons2 = this.buttons
				}
			},
		},
		methods: {
			//跳往制作报告页
			goProduceReport() {
				if(this.routeId == '0' || this.routeId == '3') {
					var arr = [{
						reportName: this.reportName
					}]
				} else if(this.routeId == '1' || this.routeId == '2') {
					var arr = [{
						folderId: this.currFolderId,
						reportId: this.reportId,
						reportName: this.reportName
					}]
				}
				this.$store.commit('changeReportList', arr)

				this.$router.push({
					name: 'produceReport',
					params: {
						id: this.routeId
					}
				})
			},
			//子组件导出对话框，点击确定按钮后触发本组件confirm-export事件
			confirmExport(exportFormat) {
				this.$root.confirmExport(exportFormat)
			},
			collectReport() {
				if(this.token != '') {
					this.$root.dialogCollect = true
				} else {
					BIMsg({
						message: "请先登录",
						type: 'warning'
					})
				}
			},
			//新增目录
			addStoreFolder(name) {
				//console.log(name)
				storeFolderSave({
						name: name
					})
					.then(data => {
						//console.log("新增目录的返回数据", data)
						if(data.code == 200) {
							//需要id
							this.newStoreFolderId = data.data.id
						}

					}).catch(err => {
						console.log(err)
					})
			},
			//删除我的收藏目录
			deleteStoreFolder(id) {
				storeFolderDelete({
					id: id
				}).then(data => {
					if(data.code == 200) {
						//console.log(data)
						this.flagDelete = !this.flagDelete
					}

				}).catch(err => {
					console.log(err)
				})
			},
			//修改接口
			updateStoreFolder(obj) {
				storeFolderUpdate({
						id: obj.id,
						name: obj.name
					})
					.then(data => {
						//console.log('修改目录 传id和文件夹名称', data)
						if(data.code == 200) {
							this.flagUpdate = !this.flagUpdate
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			//根据ReportInfo对象创建报告表
			saveReport(obj) {
				//console.log('添加收藏的参数', obj)
				reportStoreInfoSave({
						"folderId": obj.folderid,
						"folderName": obj.foldername,
						"reportName": obj.reportName,
						"storeData": obj.reportContent,
						"storeUrl": obj.reportUrl
					})
					.then(data => {
						//console.log('添加收藏', data)
						if(data.code == 200) {
							BIMsg({
								type: 'success',
								duration: 1000,
								message: '添加收藏成功!'
							});
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			heightToggle() {
				//console.log(this.flagHeight);
				if(this.flagHeight) {
					document.getElementById('main-content').style.height = ''
				} else {
					document.getElementById('main-content').style.height = '867px'
				}
				this.$store.commit('changeHeight', !this.flagHeight)
			},
			//记录本人的搜索历史
			reportSearchHistorySaveAjax(name) {
				var dataDom = document.querySelector('#main-content')
				this.$h2c(dataDom).then(c => {
					let reportUrl = c.toDataURL("image/png");
					reportSearchHistorySave({
						'searchImg': reportUrl,
						'searchName': this.reportName,
					}).then(data => {
						//console.log('我的搜索历史记录', data)
					}).catch(err => {
						console.log(err)
					})
				});
			},
			exportData() {
				axios({
						method: "post",
						url: "http://172.16.113.24:8082/api/farmReport/exportReportInfo",
						data: {},
						responseType: "blob",
						headers: {
							"Accept": "*/*",
							"Authorization": "Bearerbe3bfe8f-1841-4725-8c32-142b3dff25f7",
						}
					})
					.then(res => {
						console.log(res);

					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		created() {
			//获取收藏的list
			if(this.token != '') {
				storeFolderList()
					.then(data => {
						//console.log('添加收藏获取到的list', data)
						if(data.code == 200) {
							var folderList = data.data
							if(folderList.constructor == Array && folderList.length > 0) {
								this.storeFolderList = folderList
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			//console.log(this.$route.params)
			this.routeId = this.$route.params.id
			switch(this.routeId) {
				case '1':
					// 调接口，获取收藏的报告信息
					this.$store.dispatch('getStoreInfo', this.reportId)
					break;
				case '2':
					// 调接口，获取制作的报告信息
					this.$store.dispatch('getReportInfo', this.reportId)
					break;
				case '3':
					// 调接口，获取搜索的报告信息
					this.$parent.$refs.search.getAjax(this.reportName, true)
					break;
			}
			// 从首页和我的搜索页进来时显示收藏按钮，从我的收藏页和我的报告页进来时隐藏收藏按钮
			if(this.routeId == '0' || this.routeId == '3') {
				this.buttons2 = this.buttons
			} else if(this.routeId == '1' || this.routeId == '2') {
				var arr = Object.assign([], this.buttons)
				arr.splice(1, 1)
				this.buttons2 = arr
				//console.log(this.buttons, arr, this.buttons==arr)
			}
			// 隐藏图表中的删除和切换按钮
			this.$store.commit('changeVisibleBtn', false)
			//模板配置页的内容区域头部——显示
			this.$store.commit('changeVisibleHeader', true)

			//测试接口
			//this.exportData();
			/*test({})
				.then(data => {
					console.log('测试接口', data)

				})
				.catch(err => {
					console.log(err)
				})*/
		},
		beforeDestroy() {
			// 离开页面时关闭对话框
			this.$root.dialogCollect = false
			this.$root.dialogExportSet = false
			this.$store.commit('changeListState')
		}
	}
</script>

<style scoped="scoped" lang="scss" rel="stylesheet/scss">

</style>