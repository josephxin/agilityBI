<template>
	<div class="matching_list">
		<common-list :title="title" types="matchingList" :data="tableData" :total="total" :tableTitle="tableTitle" :selsetShow="true"></common-list>
	</div>
</template>
<script>
	import commonList from "@/components/list/commonList"
	import {BIMsg} from '../../assets/js/tools.js'
	import {getDataMatchingList,getDataMatchingPageList} from "@/api/index.js"
	export default {
		data() {
			return {
				total:0,
				limit:5,
				dataMatchPage:1,
				title:"数据源列表",
				tableTitle: [
					{
						prop: 'name',
						label: '数据源名称'
					},
					{
						prop: 'type',
						label: '数据源类型'
					},
					{
						prop: 'hostname',
						label: '主机名称'
					},
					{
						prop: 'userName',
						label: '用户名'
					},
					{
						prop: 'describe',
						label: '描述'
					}
				],
				tableData:[]
			}
		},
		components:{
			commonList
		},
		computed: {
			dataPage(){
				return this.$store.state.dataPage
			},
			dataLimit(){
				return this.$store.state.dataLimit
			}
		},
		watch: {
			dataPage:{
				handler(newValue, oldValue) {
					this.dataMatchPage = newValue
					this.getMatchingPageAjax()
				},
				deep: true
			},
			dataLimit:{
				handler(newValue, oldValue) {
					this.limit = newValue
					this.getMatchingPageAjax()
				},
				deep: true
			},
		},
		created(){
			this.getMatchingPageAjax()
		},
		methods: {
			getMatchingPageAjax(){
				getDataMatchingPageList({
					page:this.dataMatchPage,
					limit:this.limit,
				})
				.then(data => {
					if(data.code == 200){
						this.total = data.data.totalCount //总条数
						//5, 10, 15, 20 每页的条数
//						console.log(data)
						this.tableData =[]
						data.data.list.map((item,index)=>{
							let obj = {}
							obj.id = item.id
							obj.name = item.dbName
							obj.type = item.dsType == 1 ? "oracle" : item.dsType == 2 ? "Mysql" : item.dsType == 3 ? "Sqlserver" : ""
							//类型是MySQL还是什么  1-oracle，2-Mysql 3-Sqlserver
							obj.hostname = item.dsAddr
							obj.userName = item.dbUser
							this.tableData.push(obj)
						})
					}else{
						BIMsg({
							message:data.error_type,
							type:"info"
						})
					}
//					console.log(data)
				})
				.catch(err => {
					BIMsg({
						message:err,
						type:"info"
					})
				})
			}
		},
	}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	.matching_list{
		min-height: calc(100vh - 234px);
	}
	
</style>