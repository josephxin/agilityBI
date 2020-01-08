<template>
	<div class="matching">
		<left-bar>
			<data-allocation-left ref="allocationList"></data-allocation-left>
		</left-bar>
		<right-content>
			<data-allocation-right></data-allocation-right>
		</right-content>
	</div>
</template>

<script>
	import leftBar from '@/components/leftBar'
	import DataAllocationLeft from "@/components/leftBar/DataAllocationLeft"
	import rightContent from '@/components/rightContent'
	import dataAllocationRight from '@/components/dataAllocationRight/dataAllocationRight'
	
	export default {
		components: {
			leftBar, DataAllocationLeft, rightContent, dataAllocationRight
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		watch: {
			
		},
		methods: {
			
		},
		created() {
			
		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.matching {
	
}
</style>