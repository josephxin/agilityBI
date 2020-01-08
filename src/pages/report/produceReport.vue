<template>
	<div class="produceReport">
		<left-bar>
			<produce-report-left></produce-report-left>
		</left-bar>
		<right-content>
			<echarts-right :buttons="buttons" />
		</right-content>

		<!--保存——对话框-->
		<dialog-collect dialogTitle="保存" :list="folderList" :newFolderId="newFolderId" :flagDelete="flagDelete" :flagUpdate="flagUpdate" @add-event="addFolder" @delete-event="deleteFolder" @update-event="updateFolder" @save-report="saveReport" @update-report="updateReport"></dialog-collect>
		<!--导出设置-对话框-->
		<dialog-export @confirm-export="confirmExport"></dialog-export>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import leftBar from '@/components/leftBar'
	import produceReportLeft from '@/components/leftBar/produceReportLeft'
	import rightContent from '@/components/rightContent'
	import echartsRight from '@/components/content/echartsRight'
	import dialogCollect from '@/components/dialog/dialogCollect'
	import dialogExport from "@/components/dialog/dialogExport";
	import { folderList, folderAdd, folderDelete, folderUpdate, reportInfoSave, reportInfoDelete, reportInfoUpdate } from "@/api/index.js"

	export default {
		components: {
			leftBar,
			produceReportLeft,
			rightContent,
			echartsRight,
			dialogCollect,
			dialogExport,
		},
		data() {
			return {
				folderList: [],
				newFolderId: 0,
				flagDelete: true,
				flagUpdate: true,
				buttons: [{
						name: '保存',
						iconName: 'icon-7',
						fn: () => {
							this.$root.dialogCollect = true
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
				routeId: '0',
			}
		},
		computed: {
			...mapState(['reportList', 'reportActive']),
		},
		methods: {
			//子组件导出对话框，点击确定按钮后触发本组件confirm-export事件
			confirmExport(exportFormat) {
				this.$root.confirmExport(exportFormat)
			},
			//新增目录
			addFolder(name) {
				folderAdd({
						name: name
					})
					.then(data => {
						//console.log('新增目录', data)
						if(data.code == 200) {
							this.newFolderId = data.data.id
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			//删除(包括文件夹相关内容)
			deleteFolder(id) {
				folderDelete({
						id: id
					})
					.then(data => {
						//console.log('删除(包括文件夹相关内容)', data)
						if(data.code == 200) {
							this.flagDelete = !this.flagDelete
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			//修改目录 传id和文件夹名称
			updateFolder(obj) {
				folderUpdate({
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
			//根据ReportInfo对象创建报告表 不填id
			saveReport(obj) {
				//console.log('保存报告的参数', obj)
				reportInfoSave({
						"folderid": obj.folderid,
						"foldername": obj.foldername,
						"reportName": obj.reportName,
						"reportContent": obj.reportContent,
						"reportUrl": obj.reportUrl
					})
					.then(data => {
						//console.log('保存报告', data)
						if(data.code == 200) {
							this.$message({
								type: 'success',
								duration: 1000,
								message: '报告保存成功!'
							});
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			//根据传过来的ReportInfo对象信息来更新报告表详细信息
			updateReport(obj) {
				//console.log('修改报告的参数', obj)
				reportInfoUpdate({
						"id": obj.id,
						"reportName": obj.reportName,
						"reportContent": obj.reportContent,
						"reportUrl": obj.reportUrl
					})
					.then(data => {
						//console.log('修改报告', data)
						if(data.code == 200) {
							this.$message({
								type: 'success',
								duration: 1000,
								message: '报告修改成功!'
							});
							var reportName = data.data.reportName
							this.$store.commit('changeReportName', reportName)
							this.reportList[this.reportActive].reportName = reportName
							this.$store.commit('changeReportList', this.reportList)
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
		},
		created() {
			// 根据用户id查询我的报告分类列表
			folderList()
				.then(data => {
					//console.log('制作报告页——根据用户token查询我的报告分类列表', data)
					if(data.code == 200) {
						var folderList = data.data
						if(folderList.constructor == Array && folderList.length > 0) {
							this.folderList = folderList
						}
					}
				})
				.catch(err => {
					console.log(err);
				})
		},
		mounted() {
			//console.log(this.$route.params);
			this.routeId = this.$route.params.id
			if(this.reportList.length > 0) {
				if(this.routeId == '0' || this.routeId == '3') {
					// 调接口
					this.$parent.$refs.search.getAjax(this.reportList[0].reportName, true, 0)
				} else if(this.routeId == '1' || this.routeId == '2') {
					this.$store.commit('changeReportActive', 0)
					this.$store.commit('changeReportId', this.reportList[0].reportId)
					
					if(this.routeId == '1') {
						// 调接口
						this.$store.dispatch('getStoreInfo', this.reportList[0].reportId)
						this.$store.commit('changeCurrFolderId', 0)
					} else if(this.routeId == '2') {
						// 调接口
						this.$store.dispatch('getReportInfo', this.reportList[0].reportId)
						this.$store.commit('changeCurrFolderId', this.reportList[0].folderId)
					}
				}
			}
			
			// 显示图表中的删除和切换按钮
			this.$store.commit('changeVisibleBtn', true)
			//模板配置页的内容区域头部——显示
			this.$store.commit('changeVisibleHeader', true)
		},
		//只有切换路由时才会执行，刷新页面不会执行
		beforeDestroy() {
			// 离开页面时清空制作报告页元素数组
			this.$store.commit('changeDomList', [])
			// 离开制作报告页面时左侧报告列表下标变为0
			this.$store.commit('changeReportActive', 0)
			// 离开页面时关闭对话框
			this.$root.dialogCollect = false
			this.$root.dialogExportSet = false
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.produceReport {}
</style>