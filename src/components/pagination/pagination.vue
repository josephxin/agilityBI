<template>
	<el-pagination v-if="total>0" background layout="sizes, prev, pager, next" :total="total||1" :page-size="dataLimit" :page-sizes="[5, 10, 15, 20]"  :current-page="dataPage" prev-text="上一页" next-text="下一页" @size-change="handleSizeChange" @current-change="handleCurrentChange">
	</el-pagination>
</template>
<script>
	import { mapState } from "vuex";
	
	export default {
		props: {
			total: {
				type: Number
			}
		},
		data: function() {
			return {
				currentPage: 1
			};
		},
		computed: {
			...mapState(['dataPage', 'dataLimit']),
		},
		methods: {
			handleSizeChange(val) {
				//console.log(`每页 ${val} 条`);
				this.$store.commit("changeDataLimit", val)
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);    
				this.$store.commit("changeDataPage", val)
			}
		},
		mounted() {
			//默认第一页，每页10条数据
			this.$store.commit("changeDataPage", 1)
			this.$store.commit("changeDataLimit", 10)
		},
		//只有切换路由时才会执行，刷新页面不会执行
		beforeDestroy() {
			
		}
	};
</script>

<style scoped style lang="scss">

</style>