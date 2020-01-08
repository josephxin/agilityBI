<template>
	<div class="matching_list">
		<common-list :title="title" types="AssociationList" :data="tableData" :total="total" :tableTitle="tableTitle" :selsetShow="false"></common-list>
	</div>
</template>
<script>
	import commonList from "@/components/list/commonList"
	export default {
		data() {
			return {
				total:200,
				title:"数据源关联列表",
				tableData1:[],
				tableTitle: [
					{
						prop: 'name',
						label: '数据源关联名称'
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
				tableData:[{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            hostname: '196.168.12.20',
		            userName:"王小虎",
		            describe:"暂无",
		          }]
			}
		},
		components:{
			commonList
		},
		computed: {
			
		},
		watch: {

		},
		methods: {
		
		},
	}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	.matching_list{
		min-height: calc(100vh - 234px);
	}
	
</style>