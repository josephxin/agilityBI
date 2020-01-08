<template>
	<div class="matching_list">
		<common-list :title="title" types="businessList" :data="tableData" :total="total" :tableTitle="tableTitle" :selsetShow="false"></common-list>
	</div>
</template>
<script>
	import commonList from "@/components/list/commonList"
	export default {
		data() {
			return {
				total:200,
				title:"业务术语列表",
				tableData1:[],
				tableTitle: [
					{
						prop: 'name',
						label: '业务术语名称'
					},
					{
						prop: 'type',
						label: '属性'
					},
					{
						prop: 'describe',
						label: '描述'
					}
				],
				tableData:[{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
		            describe:"暂无",
		          },{
		            name: '104-mysql-teles',
		            type: '国税局',
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